export const metadata = { title: "About Us | Veejay Exports and Imports" };

export default function About() {
  return (
    <main>
      <section className="hero-internal">
          <div className="hero-bg">
              <img src="/assets/about_bg.png" alt="Veejay Global Trade Aviation" />
          </div>
          <div className="hero-overlay"></div>
          <div className="hero-content">
              <span>DISCOVER OUR LEGACY</span>
              <h1>Our Story</h1>
              <p>A decade of excellence in connecting Indian traditions with the world.</p>
          </div>
      </section>

      <section id="story" className="pattern-bg">
          <div className="grid-2">
              <div className="about-content">
                  <div className="section-title" style={{ textAlign: "left" }}>
                      <span>OUR JOURNEY</span>
                      <h2>A Tradition of Trust & Excellence</h2>
                  </div>
                  <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>Veejay Exports and Imports was established in 2016 with a foundational commitment to bridging the gap between India's legendary craftsmanship and the global marketplace. Our founders, with deep roots in textile manufacturing and organic agriculture, recognized the need for a reliable, quality-focused export partner that respects both the artisan and the buyer.</p>
                  <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>Over the past 10 years, we have transitioned from a localized trading firm into a diversified global powerhouse. We specialize in the sourcing, quality assurance, and distribution of high-grade Silk Sarees and high-potency Organic Spices. Our success is built on the pillars of transparency, long-term relationships, and an unwavering refusal to compromise on standards.</p>
                  <p style={{ color: "var(--text-muted)" }}>Today, we operate from our heritage head office in Salem, Tamil Nadu, coordinating a supply chain that reaches the remotest weaving clusters and organic spice farms across India, delivering excellence to over 59 nations.</p>
              </div>
              <div className="about-img">
                  <img src="/assets/heritage.png" alt="Our Heritage Office" />
              </div>
          </div>
      </section>

      <section id="mission-vision" style={{ background: "var(--secondary)", color: "var(--text-main)" }}>
          <div className="grid-2">
              <div style={{ padding: "3rem", background: "rgba(255,255,255,0.05)", borderRadius: "8px" }}>
                  <h3 style={{ color: "var(--accent)", marginBottom: "1rem", fontSize: "1.8rem" }}>Our Mission</h3>
                  <p style={{ lineHeight: 1.8, opacity: 0.8 }}>To preserve and promote Indian heritage by delivering authentic, ethically sourced textiles and organic agricultural products to the global market, ensuring fair value to our producers and superior quality to our international partners.</p>
              </div>
              <div style={{ padding: "3rem", background: "rgba(255,255,255,0.05)", borderRadius: "8px" }}>
                  <h3 style={{ color: "var(--accent)", marginBottom: "1rem", fontSize: "1.8rem" }}>Our Vision</h3>
                  <p style={{ lineHeight: 1.8, opacity: 0.8 }}>To become the world's most trusted trade bridge for Indian goods, recognized for our commitment to sustainability, innovation in logistics, and the celebration of traditional craftsmanship in every shipment.</p>
              </div>
          </div>
      </section>

      <section id="process" className="pattern-bg">
          <div className="section-title">
              <span>HOW WE WORK</span>
              <h2>Our Quality Assurance Process</h2>
          </div>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
              <div style={{ padding: "2.5rem", background: "var(--secondary)", border: "1px solid rgba(197, 160, 89, 0.2)", borderRadius: "4px" }}>
                  <div style={{ fontSize: "2.5rem", color: "var(--accent)", marginBottom: "1.5rem" }}>01.</div>
                  <h4 style={{ marginBottom: "1rem" }}>Direct Sourcing</h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>We eliminate middlemen by working directly with Silk Mark certified weavers and organic farmers clusters. This ensures 100% authenticity and better pricing.</p>
              </div>
              <div style={{ padding: "2.5rem", background: "var(--secondary)", border: "1px solid rgba(197, 160, 89, 0.2)", borderRadius: "4px" }}>
                  <div style={{ fontSize: "2.5rem", color: "var(--accent)", marginBottom: "1.5rem" }}>02.</div>
                  <h4 style={{ marginBottom: "1rem" }}>Multi-Stage QC</h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Every batch of spices undergoes laboratory testing for curcumin and moisture levels. Every saree is manually inspected for zari purity and weave consistency.</p>
              </div>
              <div style={{ padding: "2.5rem", background: "var(--secondary)", border: "1px solid rgba(197, 160, 89, 0.2)", borderRadius: "4px" }}>
                  <div style={{ fontSize: "2.5rem", color: "var(--accent)", marginBottom: "1.5rem" }}>03.</div>
                  <h4 style={{ marginBottom: "1rem" }}>Precision Packaging</h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Our textiles are vacuum-packed to prevent moisture entry, while spices reach you in food-grade, multi-layered industrial packaging that preserves aroma for years.</p>
              </div>
          </div>
      </section>

      <section id="values" style={{ background: "var(--secondary)", textAlign: "center" }}>
          <div className="section-title">
              <span>WHY CHOOSE US</span>
              <h2>Our Core Values</h2>
          </div>
          <div className="products-wrapper">
              <div className="product-card" style={{ padding: "2rem", textAlign: "center" }}>
                  <i className="fas fa-award" style={{ fontSize: "3rem", color: "var(--accent)", marginBottom: "1rem" }}></i>
                  <h3>Quality First</h3>
                  <p>No compromises. We source only the best-in-class products certified by national standards.</p>
              </div>
              <div className="product-card" style={{ padding: "2rem", textAlign: "center" }}>
                  <i className="fas fa-handshake" style={{ fontSize: "3rem", color: "var(--accent)", marginBottom: "1rem" }}></i>
                  <h3>Integrity</h3>
                  <p>Transparent trade practices and ethical sourcing are the foundation of our business.</p>
              </div>
              <div className="product-card" style={{ padding: "2rem", textAlign: "center" }}>
                  <i className="fas fa-leaf" style={{ fontSize: "3rem", color: "var(--accent)", marginBottom: "1rem" }}></i>
                  <h3>Eco-Conscious</h3>
                  <p>Promoting organic farming and zero-dye textile processes to protect our planet.</p>
              </div>
          </div>
      </section>
    </main>
  );
}
