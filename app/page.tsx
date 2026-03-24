"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

import { motion, animate } from 'framer-motion';

function Counter({ end }: { end: number }) {
  const [count, setCount] = useState(0);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    const controls = animate(0, end, {
      duration: 2,
      onUpdate(value) { setCount(Math.floor(value)); }
    });
    return () => controls.stop();
  }, [end]);

  return <>{count}</>;
}

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const optimizeCloudinaryUrl = (url?: string) => {
    if (!url || !url.includes('cloudinary.com')) return url || '';
    return url.replace('/upload/', '/upload/f_auto,q_auto,w_500,c_scale/');
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const q = query(collection(db, 'products'));
        const snapshot = await getDocs(q);
        const fetchedProducts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(fetchedProducts.slice(0, 6));

        const catSnap = await getDocs(collection(db, 'categories'));
        setCategories(catSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="hero" id="home" style={{ overflow: 'hidden', position: 'relative' }}>
          <motion.div 
            className="hero-bg"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
              {/* Splendid new Ship Hero explicitly requested */}
              <img src="/assets/new_hero_hq.png" alt="Majestic Container Ship Navigating Oceans" />
          </motion.div>
          <div className="hero-overlay"></div>

          <div className="hero-content" style={{ zIndex: 2, position: 'relative' }}>
              <motion.div 
                className="hero-brand"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                  <img src="/assets/logo.png" alt="VEEJAY Logo" className="hero-logo" />
                  <div className="hero-business-name">Veejay Exports and Imports</div>
                  <div className="hero-slogan">Forever the Finest</div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Across the Globe
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                We bring the finest traditional sarees and the purest organic spices from the heart of India to over 59 countries worldwide. Excellence in quality, reliability in trade.
              </motion.p>
              <motion.div 
                className="hero-btns"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                  <Link href="/products" className="btn btn-primary">Explore Catalogue</Link>
                  <Link href="/contact" className="btn btn-outline">Request Quote</Link>
              </motion.div>
          </div>
      </section>

      {/* Stats Section */}
      <div className="stats">
          <div className="stat-item">
              <h3><Counter end={59} />+</h3>
              <p>Countries Covered</p>
          </div>
          <div className="stat-item">
              <h3><Counter end={500} />+</h3>
              <p>Annual Containers</p>
          </div>
          <div className="stat-item">
              <h3><Counter end={15} />+</h3>
              <p>Years of Legacy</p>
          </div>
          <div className="stat-item">
              <h3><Counter end={100} />%</h3>
              <p>Organic Certified</p>
          </div>
      </div>

      {/* About Section */}
      <section id="about" className="pattern-bg">
          <div className="grid-2">
              <motion.div 
                className="about-img"
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                  <img src="/assets/heritage.png" alt="Our Heritage Office" />
              </motion.div>
              <motion.div 
                className="about-content"
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                  <div className="section-title" style={{ textAlign: "left" }}>
                      <span>OUR STORY</span>
                      <h2>Connecting Tradition <br /> with Global Markets</h2>
                  </div>
                  <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>Veejay Import & Export was founded with a singular vision: to share the rich heritage of Indian textiles and the authentic flavors of Indian spices with the world.</p>
                  <p style={{ color: "var(--text-muted)" }}>Our rigorous quality control and deep understanding of international trade laws have made us a trusted partner for businesses in over 59 countries.</p>
              </motion.div>
          </div>
      </section>

      {/* Products Section */}
      <section id="products">
          <div className="section-title">
              <span>OUR EXCLUSIVE RANGE</span>
              <h2>Export Quality Products</h2>
          </div>
          <div className="products-wrapper" id="productsGrid">
              
              {/* Render dynamic Firebase products First */}
              {!loading && products.map((prod, index) => (
                  <motion.div 
                    className="product-card" 
                    key={prod.id}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    {prod.imageUrl ? (
                      <div className="product-img">
                          <img src={optimizeCloudinaryUrl(prod.imageUrl)} alt={prod.title} />
                      </div>
                    ) : ''}
                    <div className="product-info">
                        <h3>{prod.title}</h3>
                        <p>{prod.shortDesc || ''}</p>
                        <Link href={`/view-product?id=${prod.id}`} className="btn btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem", marginTop: "10px" }}>
                            View Details
                        </Link>
                    </div>
                  </motion.div>
              ))}
              
              {/* Optionally load static products as fallback to make sure something is visible instantly or if offline */}
              {loading && <p style={{ textAlign: "center", width: "100%", color: "var(--text-main)" }}>Loading live products catalogue...</p>}
              
          </div>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Link href="/products" className="btn btn-outline">View All Products</Link>
          </div>
      </section>

      {/* Global Reach */}
      <section className="global-reach pattern-bg" id="global">
          <div className="grid-2">
              <div>
                  <div className="section-title" style={{ textAlign: "left" }}>
                      <span>GLOBAL FOOTPRINT</span>
                      <h2>Serving 59+ Nations</h2>
                  </div>
                  <p style={{ color: "var(--text-muted)", marginBottom: "30px" }}>Our logarithmic network spans across North America, Europe, Asia, and Gulf countries. We ensure timely delivery with professional logistics handling and real-time tracking.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                      <div style={{ padding: "15px", borderLeft: "3px solid var(--accent)", background: "rgba(197, 160, 89, 0.05)" }}>
                          <h4 style={{ color: "var(--accent)" }}>America</h4>
                          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>USA, Canada, Mexico</p>
                      </div>
                      <div style={{ padding: "15px", borderLeft: "3px solid var(--accent)", background: "rgba(197, 160, 89, 0.05)" }}>
                          <h4 style={{ color: "var(--accent)" }}>Europe</h4>
                          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>UK, Germany, France</p>
                      </div>
                  </div>
              </div>
              <div className="map-container" style={{ textAlign: "center" }}>
                  <i className="fas fa-map-marked-alt" style={{ fontSize: "10rem", color: "var(--accent)", opacity: 0.2 }}></i>
                  <p style={{ marginTop: "20px", fontWeight: 600 }}>Worldwide Network</p>
                  <Link href="/global" className="btn btn-outline" style={{ marginTop: "20px" }}>View Full Network</Link>
              </div>
          </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" style={{ background: "var(--primary)" }}>
          <div className="section-title">
              <span>VISUAL JOURNEY</span>
              <h2 style={{ color: "white" }}>Our Excellence in Focus</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "15px", padding: "0 5%" }}>
              <div style={{ overflow: "hidden", borderRadius: "8px", aspectRatio: "4/3" }}>
                  <img src="/assets/gallery1.png" alt="Warehouse" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} className="hover:scale-110" />
              </div>
              <div style={{ overflow: "hidden", borderRadius: "8px", aspectRatio: "4/3" }}>
                  <img src="/assets/gallery2.png" alt="Spice Showroom" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} className="hover:scale-110" />
              </div>
              <div style={{ overflow: "hidden", borderRadius: "8px", aspectRatio: "4/3" }}>
                  <img src="/assets/gallery3.png" alt="Logistics Port" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} className="hover:scale-110" />
              </div>
              <div style={{ overflow: "hidden", borderRadius: "8px", aspectRatio: "4/3" }}>
                  <img src="/assets/gallery4.png" alt="Artisan Weavers" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} className="hover:scale-110" />
              </div>
          </div>
          <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "40px", fontStyle: "italic" }}>From the hearts of our weavers to the global ports of the world.</p>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ background: "var(--secondary)" }}>
          <div className="grid-2">
              <div className="contact-info">
                  <div className="section-title" style={{ textAlign: "left" }}>
                      <span style={{ color: "var(--accent)" }}>OUR STANDARDS</span>
                      <h2 style={{ color: "var(--text-main)" }}>Our Excellence in Focus</h2>
                  </div>
                  <p style={{ color: "var(--text-muted)", marginBottom: "30px" }}>Direct inquiries for bulk orders and international partnerships.</p>
                  <div style={{ marginBottom: "20px" }}>
                      <i className="fas fa-envelope" style={{ color: "var(--accent)", marginRight: "15px" }}></i> veejay.exims@gmail.com
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                      <i className="fas fa-phone" style={{ color: "var(--accent)", marginRight: "15px" }}></i> +91 95000 65395
                  </div>
                  <div>
                      <i className="fas fa-location-dot" style={{ color: "var(--accent)", marginRight: "15px" }}></i> 1105, Vijayaragavan Nagar, Jagir Ammapalayam, salem Tamilnadu 636302.
                  </div>
              </div>
              <div>
                  <form id="tradeForm" className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Inquiry Sent! We will respond shortly.')}}>
                      <div className="form-grid">
                          <input type="text" placeholder="Your Name" style={{ padding: "1rem", background: "#FFFFFF", border: "1px solid rgba(15, 23, 42, 0.1)", color: "var(--text-main)", borderRadius: "4px" }} />
                          <input type="email" placeholder="Your Email" style={{ padding: "1rem", background: "#FFFFFF", border: "1px solid rgba(15, 23, 42, 0.1)", color: "var(--text-main)", borderRadius: "4px" }} />
                      </div>
                      <select style={{ padding: "1rem", background: "#FFFFFF", border: "1px solid rgba(15, 23, 42, 0.1)", color: "var(--text-main)", borderRadius: "4px" }}>
                          <option value="">Interested In...</option>
                          {categories.map(cat => (
                              <option key={cat.id} value={cat.name}>{cat.name}</option>
                          ))}
                          <option value="other">Other</option>
                      </select>
                      <textarea placeholder="Your Message" rows={5} style={{ padding: "1rem", background: "#FFFFFF", border: "1px solid rgba(15, 23, 42, 0.1)", color: "var(--text-main)", borderRadius: "4px" }}></textarea>
                      <button type="submit" className="btn btn-primary" style={{ border: "none" }}>Send Inquiry</button>
                  </form>
              </div>
          </div>
      </section>
    </main>
  );
}
