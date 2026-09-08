import React from 'react';
import { Phone, Mail, Instagram, Linkedin, Facebook, MessageCircle } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="container">
        <div className="announcement-left">
          <a href="tel:+918200712955" className="announcement-item">
            <Phone size={14} color="var(--gold-light)" />
            <span>+91 8200712955</span>
          </a>
          <a href="mailto:info@marvexinternational.com" className="announcement-item">
            <Mail size={14} color="var(--gold-light)" />
            <span>info@marvexinternational.com</span>
          </a>
        </div>

        <div className="announcement-center-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(29, 78, 216, 0.2)', border: '1px solid rgba(96, 165, 250, 0.4)', padding: '3px 12px', borderRadius: '100px', fontSize: '12px', color: '#BFDBFE', fontWeight: 600 }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#60A5FA', animation: 'pulse 1.5s infinite' }}></span>
          <span>🚢 <strong>Maritime Export:</strong> Certified Global Cargo Vessel Dispatches Operating 24/7! 🌐</span>
        </div>

        <div className="announcement-right">
          <span style={{ fontSize: '12px', opacity: 0.8, fontWeight: 600 }}>Connect:</span>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Facebook">
              <Facebook size={14} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram">
              <Instagram size={14} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">
              <Linkedin size={14} />
            </a>
            <a href="https://api.whatsapp.com/send?phone=918200712955&text=Hi%20Marvex%20International!%20I%20would%20like%20to%20enquire%20about%20your%20export%20commodities." target="_blank" rel="noopener noreferrer" className="social-icon" title="Business WhatsApp">
              <MessageCircle size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
