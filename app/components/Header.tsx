"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) return null;

  return (
    <header id="header" className="styled-header">
      <div className="logo">
        <Link href="/">
          <img src="/assets/logo.png" style={{ height: '40px', width: '40px', borderRadius: '50%' }} alt="VEEJAY EXPORTS AND IMPORTS" />
        </Link>
      </div>
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li><Link href="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link href="/about" className="nav-link" onClick={() => setMenuOpen(false)}>About Us</Link></li>
        <li><Link href="/products" className="nav-link" onClick={() => setMenuOpen(false)}>Products</Link></li>
        <li><Link href="/global" className="nav-link" onClick={() => setMenuOpen(false)}>Global Reach</Link></li>
        <li><Link href="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact</Link></li>
        <li><Link href="/products" className="nav-link portfolio-btn" onClick={() => setMenuOpen(false)}>Portfolio</Link></li>
      </ul>
      <div className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`} style={{ fontSize: '1.5rem', color: '#FFFFFF' }}></i>
      </div>
    </header>
  );
}
