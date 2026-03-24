"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const q = query(collection(db, 'products'));
        const snapshot = await getDocs(q);
        const fetchedProducts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Client-side Sort alphabetically or by something available safely
        fetchedProducts.sort((a: any, b: any) => (a.title || "").localeCompare(b.title || ""));
        
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <main>
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

      <section id="catalog" className="pattern-bg">
          <div className="section-title">
              <span>EXPLORE BY CATEGORY</span>
              <h2>Export Quality Catalog</h2>
          </div>
          <div className="products-wrapper">
              {!loading && products.map(prod => (
                  <div className="product-card" key={prod.id}>
                    {prod.imageUrl ? (
                      <div className="product-img">
                          <img src={prod.imageUrl} alt={prod.title} />
                      </div>
                    ) : (
                      <div className="product-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', height: '100%' }}>
                          <i className="fas fa-box" style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.2)' }}></i>
                      </div>
                    )}
                    <div className="product-info">
                        <h3>{prod.title}</h3>
                        <p>{prod.shortDesc || ''}</p>
                        <Link href={`/view-product?id=${prod.id}`} className="btn btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem", marginTop: "10px" }}>
                            View Details
                        </Link>
                    </div>
                  </div>
              ))}

              {loading && <p style={{ textAlign: "center", width: "100%", color: "var(--text-main)" }}>Loading live products catalog...</p>}
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
    </main>
  );
}
