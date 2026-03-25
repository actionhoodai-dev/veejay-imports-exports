"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const catSnap = await getDocs(collection(db, 'categories'));
        const fetchedCats = catSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        fetchedCats.sort((a: any, b: any) => (a.name || "").localeCompare(b.name || ""));
        setCategories(fetchedCats);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

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
        <li><Link href="/about" className="nav-link" prefetch={false} onClick={() => setMenuOpen(false)}>About Us</Link></li>
        
        {/* Products with Dropdown */}
        <li className="nav-item-dropdown">
          <Link href="/products" className="nav-link" onClick={() => setMenuOpen(false)}>
            Products <i className="fas fa-chevron-down" style={{ fontSize: '0.7rem', marginLeft: '3px' }}></i>
          </Link>
          <div className="dropdown-menu">
            <Link href="/products?category=All" className="dropdown-item" onClick={() => setMenuOpen(false)}>All Products</Link>
            {categories.map(cat => (
              <Link 
                key={cat.id} 
                href={`/products?category=${encodeURIComponent(cat.name)}`} 
                className="dropdown-item"
                onClick={() => setMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
          </div>
          
          {/* Mobile Categories View */}
          <div className="mobile-categories">
            <div className="mobile-categories-title">Categories</div>
            <Link href="/products?category=All" className="mobile-category-link" onClick={() => setMenuOpen(false)}>All Products</Link>
            {categories.map(cat => (
              <Link 
                key={cat.id} 
                href={`/products?category=${encodeURIComponent(cat.name)}`} 
                className="mobile-category-link"
                onClick={() => setMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </li>

        <li><Link href="/global" className="nav-link" prefetch={false} onClick={() => setMenuOpen(false)}>Global Reach</Link></li>
        <li><Link href="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact</Link></li>
        <li><Link href="/products" className="nav-link portfolio-btn" onClick={() => setMenuOpen(false)}>Portfolio</Link></li>
      </ul>

      <div className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`} style={{ fontSize: '1.5rem', color: '#FFFFFF' }}></i>
      </div>
    </header>
  );
}
