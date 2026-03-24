"use client";
import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

function ProductContent() {
  const searchParams = useSearchParams();
  const prodId = searchParams?.get('id');

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProduct() {
      if (!prodId) {
        setError("Product Not Found");
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, 'products', prodId);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          setError("Product Not Found");
        } else {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Error Loading Details");
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [prodId]);

  if (loading) {
    return <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>Loading live products catalogue...</div>;
  }

  if (error || !product) {
    return (
      <main>
        <section className="hero-internal">
            <div className="hero-bg">
                <img src="/assets/hero_hq.png" alt="Error" />
            </div>
            <div className="hero-overlay"></div>
            <div className="hero-content" style={{ paddingTop: "5rem" }}>
                <span>404</span>
                <h1>{error || 'Product Not Found'}</h1>
                <Link href="/products" className="btn btn-primary" style={{ marginTop: "20px", display: "inline-block" }}>Back to Catalog</Link>
            </div>
        </section>
      </main>
    );
  }

  const isRich = product.richDesc && product.richDesc.trim().length > 100;

  return (
    <main>
      {/* Dynamic Hero */}
      <section className="hero-internal">
          <div className="hero-bg">
              <img src={product.imageUrl || '/assets/hero_hq.png'} alt={product.title} />
          </div>
          <div className="hero-overlay"></div>
          <div className="hero-content" style={{ paddingTop: "5rem" }}>
              <span>{(product.category || 'PRODUCTS').toUpperCase()}</span>
              <h1>{product.title}</h1>
              <p>{product.shortDesc || ''}</p>
          </div>
      </section>

      {/* Dynamic Content Section */}
      <section className="pattern-bg" style={{ padding: "4rem 10%" }}>
          {isRich ? (
            <div className="grid-2">
                <div className="about-img">
                    <img src={product.imageUrl || ''} alt={product.title} style={{ borderRadius: "8px", boxShadow: "0 20px 40px rgba(0,0,0,0.3)", width: "100%" }} />
                </div>
                <div className="about-content">
                    <div className="section-title" style={{ textAlign: "left" }}>
                        <span>PREMIUM QUALITY</span>
                        <h2>Product Overview</h2>
                    </div>
                    <p style={{ color: "#111111", marginBottom: "2.5rem", whiteSpace: "pre-line", fontWeight: 500 }}>{product.richDesc}</p>
                    <Link href="/contact" className="btn btn-primary">Bulk Order Inquiry</Link>
                </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
                <img src={product.imageUrl || ''} alt={product.title} style={{ width: "100%", maxWidth: "500px", borderRadius: "8px", marginBottom: "2rem", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }} />
                <p style={{ color: "#111111", fontSize: "1.1rem", fontWeight: 500, lineHeight: 1.8, whiteSpace: "pre-line", marginBottom: "3rem" }}>
                  {product.richDesc || product.shortDesc || ''}
                </p>
                <Link href="/contact" className="btn btn-primary" style={{ padding: "1rem 2.5rem" }}>Bulk Order Inquiry</Link>
            </div>
          )}
      </section>
    </main>
  );
}

export default function ViewProduct() {
  return (
    <Suspense fallback={<div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>Loading product view...</div>}>
      <ProductContent />
    </Suspense>
  );
}
