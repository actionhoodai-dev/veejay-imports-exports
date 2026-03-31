"use client";
import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { db } from '../../lib/firebase';
import { collection, query, getDocs } from 'firebase/firestore';

function ProductsList() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(true);

  const optimizeCloudinaryUrl = (url?: string) => {
    if (!url || !url.includes('cloudinary.com')) return url || '';
    return url.replace('/upload/', '/upload/f_auto,q_auto,w_500,c_scale/');
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch products
        const prodSnap = await getDocs(query(collection(db, 'products')));
        let fetchedProducts: any[] = prodSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Expanded Priority Sorting logic
        const priorityOrder = [
          'Spices', 
          'Rice', 
          'Cereals', 
          'Pulses', 
          'Dhall', 
          'Food', 
          'Vegetables', 
          'Fruits', 
          'Grains'
        ];
        
        fetchedProducts.sort((a, b) => {
          const aTitle = (a.title || "").toLowerCase();
          const bTitle = (b.title || "").toLowerCase();
          const aCat = (a.category || "").toLowerCase();
          const bCat = (b.category || "").toLowerCase();
          
          // Absolute Priority: Turmeric
          const aIsTurmeric = aTitle.includes('turmeric');
          const bIsTurmeric = bTitle.includes('turmeric');
          
          if (aIsTurmeric && !bIsTurmeric) return -1;
          if (!aIsTurmeric && bIsTurmeric) return 1;

          // Secondary Priority: Category Order
          const aIndex = priorityOrder.findIndex(p => aCat.includes(p.toLowerCase()) || aTitle.includes(p.toLowerCase()));
          const bIndex = priorityOrder.findIndex(p => bCat.includes(p.toLowerCase()) || bTitle.includes(p.toLowerCase()));

          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          
          return aTitle.localeCompare(bTitle);
        });

        setProducts(fetchedProducts);

        // Fetch categories
        const catSnap = await getDocs(collection(db, 'categories'));
        const fetchedCats = catSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        fetchedCats.sort((a: any, b: any) => (a.name || "").localeCompare(b.name || ""));
        setCategories(fetchedCats);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Update selection if URL changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <>
      <section className="hero-internal">
          <div className="hero-bg">
              <img src="/assets/warehouse.png" alt="Veejay Logistics Warehouse Products" />
          </div>
          <div className="hero-overlay"></div>
          <div className="hero-content">
              <span>EXQUISITE COLLECTION</span>
              <h1>Our Products</h1>
              <p>From fine silk to artisanal spices, we export only the absolute best.</p>
          </div>
      </section>

      <section id="catalog" className="catalog-section pattern-bg">
          <div className="section-title">
              <span>EXPLORE OUR RANGE</span>
              <h2>Export Quality Catalogue</h2>
          </div>

          <div className="category-tabs" style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginBottom: '50px' }}>
              <button 
                onClick={() => setSelectedCategory('All')}
                className={`btn ${selectedCategory === 'All' ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem', minWidth: '120px', marginLeft: 0 }}
              >
                  All Products
              </button>
              {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`btn ${selectedCategory === cat.name ? 'btn-primary' : 'btn-outline'}`}
                    style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem', minWidth: '120px', marginLeft: 0 }}
                  >
                      {cat.name}
                  </button>
              ))}
          </div>

          <div className="products-wrapper">
              {!loading && filteredProducts.map(prod => (
                  <div className="product-card" key={prod.id}>
                    {prod.imageUrl ? (
                      <div className="product-img">
                          <img src={optimizeCloudinaryUrl(prod.imageUrl)} alt={prod.title} />
                      </div>
                    ) : (
                      <div className="product-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', height: '100%' }}>
                          <i className="fas fa-box" style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.2)' }}></i>
                      </div>
                    )}
                    <div className="product-info">
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>{prod.category}</span>
                        <h3>{prod.title}</h3>
                        <p>{prod.shortDesc || ''}</p>
                        <Link href={`/view-product?id=${prod.id}`} className="btn btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem", marginTop: "10px" }}>
                            View Details
                        </Link>
                    </div>
                  </div>
              ))}

              {!loading && filteredProducts.length === 0 && (
                  <p style={{ textAlign: "center", width: "100%", color: "var(--text-main)", padding: "50px 0" }}>No products found in this category.</p>
              )}

              {loading && <p style={{ textAlign: "center", width: "100%", color: "var(--text-main)" }}>Loading live products catalogue...</p>}
          </div>
      </section>

      <section id="standards" style={{ background: "var(--secondary)", color: "var(--text-main)" }}>
          <div className="section-title">
              <span style={{ color: "var(--accent)" }}>UNCOMPROMISING STANDARDS</span>
              <h2 style={{ color: "var(--text-main)" }}>Our Quality Benchmarks</h2>
          </div>
          <div className="grid-2">
              <div style={{ background: "rgba(255,255,255,0.05)", padding: "3rem", borderRadius: "8px" }}>
                  <h3 style={{ color: "var(--accent)", marginBottom: "1.5rem" }}>Textile Purity</h3>
                  <p style={{ opacity: 0.8, lineHeight: 1.8, marginBottom: "20px" }}>Every saree in our collection is Silk Mark certified, representing the highest hallmark of 100% pure natural silk. Our premium weaves undergo rigorous 'burn tests' and zari purity checks before dispatch.</p>
                  <ul style={{ listStyle: "none", opacity: 0.8 }}>
                      <li style={{ marginBottom: "10px" }}><i className="fas fa-check-circle" style={{ color: "var(--accent)", marginRight: "10px" }}></i> 100% Pure Natural Silk</li>
                      <li style={{ marginBottom: "10px" }}><i className="fas fa-check-circle" style={{ color: "var(--accent)", marginRight: "10px" }}></i> Traditional Handloom Authenticity</li>
                      <li style={{ marginBottom: "10px" }}><i className="fas fa-check-circle" style={{ color: "var(--accent)", marginRight: "10px" }}></i> Verified Gold & Silver Zari Content</li>
                  </ul>
              </div>
              <div style={{ background: "rgba(255,255,255,0.05)", padding: "3rem", borderRadius: "8px" }}>
                  <h3 style={{ color: "var(--accent)", marginBottom: "1.5rem" }}>Spice Potency</h3>
                  <p style={{ opacity: 0.8, lineHeight: 1.8, marginBottom: "20px" }}>We specialize in 'Source-Direct' spices. Our turmeric is laboratory-tested for a high curcumin value of 5%+, while our black pepper and cardamom pods are graded for size and volatile oil content.</p>
                  <ul style={{ listStyle: "none", opacity: 0.8 }}>
                      <li style={{ marginBottom: "10px" }}><i className="fas fa-check-circle" style={{ color: "var(--accent)", marginRight: "10px" }}></i> Lab-Certified Curcumin Levels</li>
                      <li style={{ marginBottom: "10px" }}><i className="fas fa-check-circle" style={{ color: "var(--accent)", marginRight: "10px" }}></i> Pesticide-Free / Organic Grades</li>
                      <li style={{ marginBottom: "10px" }}><i className="fas fa-check-circle" style={{ color: "var(--accent)", marginRight: "10px" }}></i> Moisture Control & Vacuum Packaging</li>
                  </ul>
              </div>
          </div>
      </section>

      <section style={{ background: "var(--secondary)", textAlign: "center" }}>
          <div className="section-title">
              <span>START A PARTNERSHIP</span>
              <h2>Bulk Export Inquiries</h2>
          </div>
          <p style={{ color: "var(--text-muted)", maxWidth: "800px", margin: "0 auto 30px" }}>We cater specifically to international retail chains, boutique owners, and spice wholesalers looking for consistent, high-grade Indian products. Lead times vary from 14-45 days depending on the volume and customization required.</p>
          <Link href="/contact" className="btn btn-primary">Request a Wholesale Quote</Link>
      </section>
    </>
  );
}

export default function Products() {
  return (
    <main>
      <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading Catalogue...</div>}>
        <ProductsList />
      </Suspense>
    </main>
  );
}
