"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Contact() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const catSnap = await getDocs(collection(db, 'categories'));
        setCategories(catSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    }
    fetchCategories();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Trade Inquiry Sent Successfully.");
  };

  return (
    <main>
      <section className="hero-internal">
          <div className="hero-bg">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop" alt="Contact Us Hero" />
          </div>
          <div className="hero-overlay"></div>
          <div className="hero-content">
              <span>GET IN TOUCH</span>
              <h1>Contact Us</h1>
              <p>Ready to start your global trade? We're here to help.</p>
          </div>
      </section>

      <section id="contact-page" className="pattern-bg">
          <div className="grid-2">
              <div className="contact-details">
                  <div className="section-title" style={{ textAlign: "left" }}>
                      <span>DIRECT INQUIRY</span>
                      <h2>Let's Discuss Business</h2>
                  </div>
                  <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>Our trade specialists are available to discuss bulk orders, customization requirements, and long-term supply chain partnerships.</p>
                  
                  <div style={{ marginBottom: "2rem", display: "flex", alignItems: "flex-start", gap: "15px" }}>
                      <div style={{ background: "var(--secondary)", padding: "15px", borderRadius: "50%", color: "var(--accent)" }}>
                          <i className="fas fa-envelope"></i>
                      </div>
                      <div>
                          <h3 style={{ color: "var(--accent)", marginBottom: "0.2rem", fontSize: "1.1rem" }}>Email Us</h3>
                          <p style={{ fontSize: "0.9rem" }}><a href="mailto:veejay.exims@gmail.com" style={{ color: "var(--text-muted)", textDecoration: "none" }}>veejay.exims@gmail.com</a></p>
                          <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", opacity: 0.6 }}>(Expected response time: 2-4 hours)</p>
                      </div>
                  </div>

                  <div style={{ marginBottom: "2rem", display: "flex", alignItems: "flex-start", gap: "15px" }}>
                      <div style={{ background: "var(--secondary)", padding: "15px", borderRadius: "50%", color: "var(--accent)" }}>
                          <i className="fas fa-phone"></i>
                      </div>
                      <div>
                          <h3 style={{ color: "var(--accent)", marginBottom: "0.2rem", fontSize: "1.1rem" }}>Call Us</h3>
                          <p style={{ fontSize: "0.9rem" }}><a href="tel:+919500065395" style={{ color: "var(--text-muted)", textDecoration: "none" }}>+91 95000 65395</a></p>
                          <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", opacity: 0.6 }}>(Mon-Sat, 9:00 AM - 7:00 PM IST)</p>
                      </div>
                  </div>

                  <div style={{ marginBottom: "2rem", display: "flex", alignItems: "flex-start", gap: "15px" }}>
                      <div style={{ background: "var(--secondary)", padding: "15px", borderRadius: "50%", color: "var(--accent)" }}>
                          <i className="fas fa-location-dot"></i>
                      </div>
                      <div>
                          <h3 style={{ color: "var(--accent)", marginBottom: "0.2rem", fontSize: "1.1rem" }}>Visit Headquarters</h3>
                          <p style={{ fontSize: "0.9rem" }}><a href="https://maps.app.goo.gl/wM2oGg2hsc1mXG4u7" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)", textDecoration: "none" }}>1105, Vijayaragavan Nagar, Jagir Ammapalayam,<br/>Salem, Tamil Nadu 636302, India.</a></p>
                      </div>
                  </div>
              </div>
              <div className="contact-form-container">
                  <form onSubmit={handleSubmit} className="contact-form">
                      <h4 style={{ marginBottom: "1rem", color: "var(--accent)" }}>Trade Inquiry Form</h4>
                      <div className="form-grid">
                          <input type="text" placeholder="First Name" required style={{ padding: "1.2rem", background: "#FFFFFF", border: "1px solid rgba(15, 23, 42, 0.1)", color: "var(--text-main)", borderRadius: "4px" }} />
                          <input type="text" placeholder="Last Name" required style={{ padding: "1.2rem", background: "#FFFFFF", border: "1px solid rgba(15, 23, 42, 0.1)", color: "var(--text-main)", borderRadius: "4px" }} />
                      </div>
                      <input type="email" placeholder="Business Email Address" required style={{ padding: "1.2rem", background: "#FFFFFF", border: "1px solid rgba(15, 23, 42, 0.1)", color: "var(--text-main)", borderRadius: "4px" }} />
                      <div className="form-grid">
                          <input type="text" placeholder="Company Name" style={{ padding: "1.2rem", background: "#FFFFFF", border: "1px solid rgba(15, 23, 42, 0.1)", color: "var(--text-main)", borderRadius: "4px" }} />
                          <select required style={{ padding: "1.2rem", background: "#FFFFFF", border: "1px solid rgba(15, 23, 42, 0.1)", color: "var(--text-main)", borderRadius: "4px" }}>
                              <option value="">Interested In...</option>
                              {categories.map(cat => (
                                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                              ))}
                              <option value="other">Other</option>
                          </select>
                      </div>
                      <textarea placeholder="Describe your volume requirements and destination country..." rows={6} style={{ padding: "1.2rem", background: "#FFFFFF", border: "1px solid rgba(15, 23, 42, 0.1)", color: "var(--text-main)", borderRadius: "4px" }}></textarea>
                      <button type="submit" className="btn btn-primary" style={{ border: "none", padding: "1.2rem" }}>Send Trade Inquiry</button>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center", opacity: 0.6 }}>By clicking submit, you agree to our data privacy policy for trade communications.</p>
                  </form>
              </div>
          </div>
      </section>

      <section id="faq" style={{ background: "var(--secondary)" }}>
          <div className="section-title">
              <span>COMMON QUESTIONS</span>
              <h2>Business FAQ</h2>
          </div>
          <div style={{ maxWidth: "900px", margin: "0 auto" }} className="form-grid">
              <div>
                  <h4 style={{ color: "var(--accent)", marginBottom: "1rem" }}>What is the minimum order quantity (MOQ)?</h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>For textiles, our MOQ starts at 50 units per design. For organic spices, we handle LCL shipments starting from 500kg up to full container loads (FCL).</p>
              </div>
              <div>
                  <h4 style={{ color: "var(--accent)", marginBottom: "1rem" }}>Do you provide private labeling?</h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>Yes, we offer comprehensive white-labeling and customized branding services for international retailers for both our textile and spice divisions.</p>
              </div>
              <div>
                  <h4 style={{ color: "var(--accent)", marginBottom: "1rem" }}>Are your spices organic certified?</h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>Absolutely. All our spices are sourced from NPOP/NOP certified organic farm clusters and undergo independent lab testing before export.</p>
              </div>
              <div>
                  <h4 style={{ color: "var(--accent)", marginBottom: "1rem" }}>How do you handle shipping to Europe/USA?</h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>We have specialized trade routes and customs agents in North America and the EU to ensure seamless DDP or CIF deliveries with full documentation support.</p>
              </div>
          </div>
      </section>
      <section id="location-map" style={{ padding: 0, height: "450px", overflow: "hidden" }}>
          <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.228534704303!2d78.1237742!3d11.6782095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf16b3f097a27%3A0xb66aed3f4c1e0967!2sVeejay%20Import%20and%20Export!5e0!3m2!1sen!2sin!4v1774272320913!5m2!1sen!2sin" 
             width="100%" 
             height="100%" 
             style={{ border: 0 }} 
             allowFullScreen 
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
      </section>
    </main>
  );
}
