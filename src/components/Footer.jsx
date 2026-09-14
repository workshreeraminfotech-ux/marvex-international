import React from 'react';
import { Instagram, Linkedin, Facebook, MessageCircle } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { useStoreCategories } from '../utils/useStore';

export default function Footer() {
  const categories = useStoreCategories();
  return (
    <footer className="footer" style={{ background: '#0A2240', color: '#fff', padding: '60px 0 20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          <div className="footer-brand">
            <div style={{ background: '#FFFFFF', padding: '10px 18px', borderRadius: '14px', display: 'inline-block', marginBottom: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
              <img src={logoImg} alt="Marvex International Logo" style={{ height: '48px', width: 'auto', objectFit: 'contain', display: 'block' }} />
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.75)', margin: '16px 0 20px', lineHeight: 1.6 }}>
              Marvex International is a premier Indian exporter of high-grade agro commodities, spices, seeds, and food commodities. Delivering trust and exporting excellence across the globe.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Facebook">
                <Facebook size={15} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram">
                <Instagram size={15} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">
                <Linkedin size={15} />
              </a>
              <a href="https://api.whatsapp.com/send?phone=918200712955&text=Hi%20Marvex%20International!" target="_blank" rel="noopener noreferrer" className="social-icon" title="Business WhatsApp">
                <MessageCircle size={14} />
              </a>
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '20px' }}>Quick Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li><a href="#about" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>About Us</a></li>
              <li><a href="#products" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>Products</a></li>
              <li><a href="#blog" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>Blog</a></li>
              <li><a href="#faq" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>FAQ</a></li>
              <li><a href="#contact" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '20px' }}>Product Categories</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              {categories.map(c => (
                <li key={c.id || c.name}>
                  <a href="#products" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>{c.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '20px' }}>Connect Desk</h4>
            <div className="footer-contact">
              <strong>Phone / WhatsApp:</strong> +91 8200712955
            </div>
            <div className="footer-contact">
              <strong>Email:</strong> info@marvexinternational.com
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.4 }}>
              <strong>Address:</strong> Gujarat, India • Global Export Hub
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Marvex International. All Rights Reserved.</p>
          <p>
            Developed by{' '}
            <a 
              href="https://www.matrixtechx.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#38BDF8', fontWeight: 800, textDecoration: 'none' }}
              onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              MatrixTechX
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
