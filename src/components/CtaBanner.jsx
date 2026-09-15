import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Globe2, Sparkles } from 'lucide-react';

export default function CtaBanner({ onOpenQuote, onNavigate }) {
  return (
    <section className="cta-banner-redesign-section">
      <div className="container">
        <motion.div
          className="cta-banner-card"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="cta-banner-grid">
            {/* Left Image Showcase */}
            <div className="cta-banner-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
                alt="Connect with Marvex International"
              />
              <div className="cta-image-floating-tag">
                <Sparkles size={15} color="#FFFFFF" />
                <span>Delivering Trust, Exporting Excellence</span>
              </div>
            </div>

            {/* Right Content & Actions */}
            <div className="cta-banner-content">
              <h2 className="cta-banner-title" style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.25, marginBottom: '16px' }}>
                Connect With Us Today for <span style={{ color: '#FACC15', display: 'inline', fontWeight: 900, textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>Bulk Maritime Vessel Exports</span>
              </h2>

              <p className="cta-banner-desc" style={{ fontSize: '15.5px', color: 'rgba(255, 255, 255, 0.95)', lineHeight: 1.65, marginBottom: '28px' }}>
                Partner with Marvex International for precision earthing parts, hardware & sanitary items, and 100% sortex-cleaned Indian spices delivered to your destination port with guaranteed quality and complete export documentation.
              </p>

              <div className="cta-actions-row" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                <button 
                  onClick={() => onOpenQuote ? onOpenQuote() : (onNavigate && onNavigate('contact'))} 
                  style={{ 
                    padding: '14px 30px', 
                    fontSize: '15px', 
                    fontWeight: 800,
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    background: '#FFFFFF',
                    color: '#011B47',
                    border: '2px solid #FFFFFF',
                    borderRadius: '100px',
                    cursor: 'pointer',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.35)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#011B47';
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#FFFFFF';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.color = '#011B47';
                    e.currentTarget.style.borderColor = '#FFFFFF';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span>Request Container Quote</span>
                  <ArrowRight size={17} />
                </button>

                <button
                  onClick={() => onNavigate && onNavigate('contact')}
                  style={{ 
                    padding: '14px 26px', 
                    fontSize: '14.5px', 
                    fontWeight: 700,
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    borderRadius: '100px', 
                    color: '#FFFFFF', 
                    border: '1.5px solid rgba(255,255,255,0.4)', 
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    cursor: 'pointer',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                    e.currentTarget.style.borderColor = '#FFFFFF';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Globe2 size={16} />
                  <span>Contact Export Desk</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
