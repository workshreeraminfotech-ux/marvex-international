import React from 'react';
import { Facebook, Instagram, Linkedin, ChevronRight, Mail, MapPin, Phone } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function FooterSection({ onNavigate }) {
  return (
    <footer className="footer-redesign-section">
      <div className="container">
        <div className="footer-top-grid">
          {/* Col 1: Brand & Bio */}
          <div className="footer-col-brand">
            <div 
              className="footer-logo-wrap" 
              onClick={() => { if (onNavigate) onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ background: '#FFFFFF', padding: '10px 18px', borderRadius: '14px', display: 'inline-block', marginBottom: '16px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
            >
              <img src={logoImg} alt="Marvex International" style={{ height: '48px', width: 'auto', objectFit: 'contain', display: 'block' }} />
            </div>
            <p className="footer-bio-text">
              Marvex International is a trusted Indian manufacturer of electrical earthing systems & hardware sanitary items, and a premier merchant exporter of 100% sortex-cleaned Indian spices and agricultural commodities worldwide.
            </p>
            <div className="footer-social-row">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
                <Facebook size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul className="footer-links-list">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }}>
                  <ChevronRight size={14} className="link-arrow" /> Home
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('about'); }}>
                  <ChevronRight size={14} className="link-arrow" /> About Us
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('products'); }}>
                  <ChevronRight size={14} className="link-arrow" /> All Products
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('blog'); }}>
                  <ChevronRight size={14} className="link-arrow" /> Blogs
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('contact'); }}>
                  <ChevronRight size={14} className="link-arrow" /> Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Product Categories */}
          <div className="footer-col">
            <h3>Our Business Lines</h3>
            <ul className="footer-links-list">
              <li>
                <a href="#earthing" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('category-earthing-parts'); }}>
                  <ChevronRight size={14} className="link-arrow" /> Earthing Parts (Mfg)
                </a>
              </li>
              <li>
                <a href="#spices-agro" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('category-spices-agro'); }}>
                  <ChevronRight size={14} className="link-arrow" /> Spices & Agro (Merchant)
                </a>
              </li>
              <li>
                <a href="#hardware-sanitary" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('category-hardware-items'); }}>
                  <ChevronRight size={14} className="link-arrow" /> Hardware & Sanitary (Mfg)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="footer-col">
            <h3>Contact Us</h3>
            <div className="footer-contact-list">
              <div className="footer-contact-item" style={{ alignItems: 'flex-start' }}>
                <MapPin size={18} className="contact-icon" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>Gujarat, India • Global Export Desk</span>
              </div>
              <a href="tel:+918200712955" className="footer-contact-item item-link">
                <Phone size={18} className="contact-icon" />
                <span>+91 8200712955</span>
              </a>
              <a href="mailto:info@marvexinternational.com" className="footer-contact-item item-link">
                <Mail size={18} className="contact-icon" />
                <span>info@marvexinternational.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom copyright bar */}
        <div className="footer-bottom-bar">
          <p>
            © {new Date().getFullYear()} Marvex International. All Rights Reserved. •{' '}
            <a 
              href="#admin" 
              onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('admin'); }}
              style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}
              onMouseOver={(e) => e.currentTarget.style.color = '#FFFFFF'}
              onMouseOut={(e) => e.currentTarget.style.color = '#94A3B8'}
            >
              Admin Portal
            </a>
          </p>
          <div className="footer-bottom-right">
            <span>
              Developed by{' '}
              <a 
                href="https://www.matrixtechx.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: '#38BDF8', fontWeight: 800, textDecoration: 'none', transition: 'color 0.2s ease' }}
                onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
              >
                MatrixTechX
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
