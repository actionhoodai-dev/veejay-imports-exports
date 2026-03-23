"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-col">
          <div className="logo" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/assets/logo.png" alt="VEEJAY EXPORTS AND IMPORTS" style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#FFFFFF', padding: '4px', objectFit: 'contain' }} />
            <span style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '1rem', letterSpacing: '1px' }}>VEEJAY EXPORTS & IMPORTS</span>
          </div>
          <p style={{ color: '#FFFFFF', fontSize: '0.9rem', opacity: 0.9 }}>
            Global trade experts specializing in Indian luxury textiles and organic produce. Forever the Finest.
          </p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/global">Global Reach</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Products</h4>
          <ul>
            <li><Link href="/products">Silk Sarees</Link></li>
            <li><Link href="/products">Black Pepper</Link></li>
            <li><Link href="/products">Green Cardamom</Link></li>
            <li><Link href="/products">Turmeric</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Connect with Us</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>
              <i className="fas fa-envelope" style={{ color: '#FFFFFF', marginRight: '10px', width: '20px' }}></i>
              veejay.exims@gmail.com
            </li>
            <li style={{ marginBottom: '10px', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>
              <i className="fas fa-phone" style={{ color: '#FFFFFF', marginRight: '10px', width: '20px' }}></i>
              +91 95000 65395
            </li>
            <li style={{ marginBottom: '10px', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)' }}>
              <i className="fas fa-location-dot" style={{ color: '#FFFFFF', marginRight: '10px', width: '20px' }}></i>
              Salem, Tamilnadu 636302.
            </li>
            <li style={{ marginTop: '15px' }}>
              <div style={{ display: 'flex', gap: '15px', fontSize: '1.2rem' }}>
                <a href="#" style={{ color: '#FFFFFF' }}><i className="fab fa-facebook-f"></i></a>
                <a href="#" style={{ color: '#FFFFFF' }}><i className="fab fa-instagram"></i></a>
                <a href="#" style={{ color: '#FFFFFF' }}><i className="fab fa-linkedin-in"></i></a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="copy-right">
        &copy; {new Date().getFullYear()} Veejay Exports and Imports. All Rights Reserved. | Designed by Actionhood AI
      </div>
      <a href="https://wa.me/919500065395" className="whatsapp-btn" target="_blank" rel="noreferrer">
        <i className="fab fa-whatsapp"></i>
      </a>
    </footer>
  );
}
