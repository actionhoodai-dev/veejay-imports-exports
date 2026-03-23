export const metadata = { title: "Global Reach | Veejay Exports and Imports" };

export default function Global() {
  return (
    <main>
      <section className="hero-internal">
          <div className="hero-bg">
              <img src="https://images.unsplash.com/photo-1521295121781-8bf5f6a25f7d?w=1600&auto=format&fit=crop" alt="Veejay Global Trading World Map Network" />
          </div>
          <div className="hero-overlay"></div>
          <div className="hero-content">
              <span>OUR FOOTPRINT</span>
              <h1>Global Reach</h1>
              <p>Serving over 59 countries with Indian excellence.</p>
          </div>
      </section>

      <section id="network" className="pattern-bg">
          <div className="section-title">
              <span>INTERNATIONAL NETWORK</span>
              <h2>Our Global Trading Destinations</h2>
          </div>
          <div className="grid-2">
              <div className="destination-list" style={{ color: "var(--text-muted)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div style={{ marginBottom: "2rem" }}>
                      <h3 style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>North America</h3>
                      <p>USA, Canada, Mexico, Panama</p>
                  </div>
                  <div style={{ marginBottom: "2rem" }}>
                      <h3 style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>Europe</h3>
                      <p>UK, France, Germany, Netherlands, Italy, Spain, Switzerland, Belgium</p>
                  </div>
                  <div style={{ marginBottom: "2rem" }}>
                      <h3 style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>Middle East (Gulf)</h3>
                      <p>UAE, Saudi Arabia, Qatar, Oman, Kuwait, Bahrain, Jordan</p>
                  </div>
                  <div style={{ marginBottom: "2rem" }}>
                      <h3 style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>Asia Pacific</h3>
                      <p>Singapore, Malaysia, Australia, Japan, South Korea, New Zealand, Indonesia</p>
                  </div>
                  <div style={{ marginBottom: "2rem" }}>
                      <h3 style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>Africa</h3>
                      <p>South Africa, Egypt, Kenya, Nigeria, Mauritius</p>
                  </div>
                  <div style={{ marginBottom: "2rem" }}>
                      <h3 style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>South America</h3>
                      <p>Brazil, Argentina, Chile, Colombia</p>
                  </div>
              </div>
              <div className="map-illustration" style={{ textAlign: "center", background: "rgba(197, 160, 89, 0.05)", padding: "4rem", borderRadius: "10px" }}>
                  <i className="fas fa-globe-americas" style={{ fontSize: "15rem", color: "var(--accent)", opacity: 0.2 }}></i>
                  <p style={{ marginTop: "20px", fontSize: "1.5rem", fontWeight: 600 }}>59+ Countries</p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Bridging the gap between Indian heritage and global demand since 2010.</p>
              </div>
          </div>
      </section>

      <section id="compliance" style={{ background: "var(--secondary)", color: "var(--text-main)" }}>
          <div className="grid-2" style={{ gap: "50px" }}>
              <div>
                  <div className="section-title" style={{ textAlign: "left" }}>
                      <span style={{ color: "var(--accent)" }}>REGULATORY EXCELLENCE</span>
                      <h2 style={{ color: "var(--text-main)" }}>Trade Compliance & Standards</h2>
                  </div>
                  <p style={{ marginBottom: "20px", opacity: 0.8 }}>Navigating international trade requires more than just logistics; it requires rigorous adherence to global standards. Veejay Exports and Imports maintains a dedicated compliance cell to ensure every shipment meets the specific regulatory requirements of the destination country.</p>
                  <ul style={{ listStyle: "none" }}>
                      <li style={{ marginBottom: "15px" }}><i className="fas fa-check-circle" style={{ color: "var(--accent)", marginRight: "15px" }}></i> Customs Tariff Classifications</li>
                      <li style={{ marginBottom: "15px" }}><i className="fas fa-check-circle" style={{ color: "var(--accent)", marginRight: "15px" }}></i> Phytosanitary Certification for Spices</li>
                      <li style={{ marginBottom: "15px" }}><i className="fas fa-check-circle" style={{ color: "var(--accent)", marginRight: "15px" }}></i> Free Trade Agreement (FTA) Documentation</li>
                      <li style={{ marginBottom: "15px" }}><i className="fas fa-check-circle" style={{ color: "var(--accent)", marginRight: "15px" }}></i> FDA / EFSA Compliance Advisory</li>
                  </ul>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", alignContent: "center" }}>
                  <div style={{ textAlign: "center", border: "1px solid rgba(197, 160, 89, 0.3)", padding: "20px", borderRadius: "4px" }}>
                      <h4 style={{ color: "var(--accent)" }}>500+</h4>
                      <p style={{ fontSize: "0.8rem" }}>Annual Audits</p>
                  </div>
                  <div style={{ textAlign: "center", border: "1px solid rgba(197, 160, 89, 0.3)", padding: "20px", borderRadius: "4px" }}>
                      <h4 style={{ color: "var(--accent)" }}>100%</h4>
                      <p style={{ fontSize: "0.8rem" }}>Clearance Rate</p>
                  </div>
                  <div style={{ textAlign: "center", border: "1px solid rgba(197, 160, 89, 0.3)", padding: "20px", borderRadius: "4px" }}>
                      <h4 style={{ color: "var(--accent)" }}>24/7</h4>
                      <p style={{ fontSize: "0.8rem" }}>Tracing Support</p>
                  </div>
                  <div style={{ textAlign: "center", border: "1px solid rgba(197, 160, 89, 0.3)", padding: "20px", borderRadius: "4px" }}>
                      <h4 style={{ color: "var(--accent)" }}>98%</h4>
                      <p style={{ fontSize: "0.8rem" }}>On-time delivery</p>
                  </div>
              </div>
          </div>
      </section>

      <section id="logistics" style={{ background: "var(--secondary)" }}>
          <div className="section-title">
              <span>LOGISTICS INFRASTRUCTURE</span>
              <h2>Integrated Supply Chain Solutions</h2>
          </div>
          <p style={{ textAlign: "center", color: "var(--text-muted)", maxWidth: "800px", margin: "0 auto 50px" }}>We leverage advanced logistics partnerships to provide seamless door-to-door delivery across continents. Our multi-modal approach ensures the fastest and most cost-effective routes for your cargo.</p>
          <div className="products-wrapper">
               <div className="product-card" style={{ padding: "2.5rem" }}>
                  <i className="fas fa-ship" style={{ fontSize: "2.5rem", color: "var(--accent)", marginBottom: "1rem" }}></i>
                  <h3>Sea Freight (LCL/FCL)</h3>
                  <p>Bulk shipments handled with care in temperature-controlled containers to preserve the volatile oils in our organic spices.</p>
              </div>
              <div className="product-card" style={{ padding: "2.5rem" }}>
                  <i className="fas fa-plane" style={{ fontSize: "2.5rem", color: "var(--accent)", marginBottom: "1rem" }}></i>
                  <h3>Priority Air Cargo</h3>
                  <p>Express turnaround for high-value silk textiles and urgent sample shipments, ensuring zero transit moisture damage.</p>
              </div>
              <div className="product-card" style={{ padding: "2.5rem" }}>
                  <i className="fas fa-warehouse" style={{ fontSize: "2.5rem", color: "var(--accent)", marginBottom: "1rem" }}></i>
                  <h3>Regional Hubs</h3>
                  <p>Strategically located warehousing near major ports ensuring rapid dispatch and simplified last-mile delivery.</p>
              </div>
          </div>
      </section>
    </main>
  );
}
