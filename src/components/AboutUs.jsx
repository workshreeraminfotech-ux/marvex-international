import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import aboutUsImg from '../assets/about-us.png';

export default function AboutUs({ onNavigate }) {
  return (
    <section className="about-section py-50" id="about" style={{ backgroundColor: '#FFFFFF', padding: '54px 0' }}>
      <div className="container">
        <div className="about-grid-wrapper">
          
          {/* Photo Column (Left on Laptop, Appears right after Intro on Phone) */}
          <motion.div
            className="about-image-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ position: 'relative', width: '100%' }}
          >
            {/* Floating Experience Badge */}
            <div style={{
              position: 'absolute',
              top: '-18px',
              left: '18px',
              background: '#011B47',
              color: '#FFFFFF',
              padding: '14px 22px',
              borderRadius: '18px',
              boxShadow: '0 16px 36px rgba(1, 27, 71, 0.4)',
              border: '2px solid #FFFFFF',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backdropFilter: 'blur(8px)',
              maxWidth: 'calc(100% - 36px)'
            }}>
              <span style={{ fontSize: '28px', fontWeight: 900, fontFamily: 'var(--font-h, Outfit, sans-serif)', color: '#FFFFFF', lineHeight: 1 }}>
                Global
              </span>
              <span style={{ fontSize: '12px', fontWeight: 800, lineHeight: 1.3, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Excellence in<br />Commodity Exports
              </span>
            </div>

            {/* Main About Us Photo Frame */}
            <div style={{
              position: 'relative',
              borderRadius: '26px',
              overflow: 'hidden',
              border: '2px solid var(--border)',
              boxShadow: '0 18px 40px rgba(1, 27, 71, 0.12)',
              backgroundColor: '#FFFFFF',
              marginTop: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}>
              <img
                src={aboutUsImg}
                alt="Marvex International Team & Global Operations"
                style={{
                  width: '100%',
                  height: '480px',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          </motion.div>

          {/* Content Column (Right on Laptop, Flow on Phone) */}
          <motion.div
            className="about-content-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Header Block (Title) */}
            <div className="about-header-block">
              <span className="eyebrow" style={{ marginBottom: '14px' }}>
                ABOUT MARVEX INTERNATIONAL
              </span>

              <h2 style={{ fontSize: 'clamp(28px, 3.8vw, 38px)', fontWeight: 900, color: 'var(--navy)', lineHeight: 1.2, margin: '12px 0 16px', fontFamily: 'var(--font-h, Outfit, sans-serif)' }}>
                Manufacturing Precision, <span style={{ color: 'var(--navy)' }}>Exporting Worldwide Trust</span>
              </h2>
            </div>

            {/* Paragraphs Block */}
            <div className="about-paragraphs-block">
              <p style={{ fontSize: '16px', color: '#1E293B', lineHeight: 1.65, marginBottom: '16px', fontWeight: 600 }}>
                <strong>Marvex International</strong> is a diversified Indian enterprise operating as an in-house <strong>Manufacturer & Exporter of Electrical Earthing Parts and Hardware & Sanitary Items</strong>, alongside being a premier <strong>Merchant Exporter of 100% pure Indian Spices and Agro Commodities</strong> based in Gujarat, India.
              </p>

              <p style={{ fontSize: '15px', color: 'var(--gray)', lineHeight: 1.65, marginBottom: '28px' }}>
                Whether you require high-conductivity UL-standard copper earth rods, premium hardware & sanitary solutions, or sortex-cleaned whole cumin and turmeric containers, our streamlined operations guarantee strict laboratory testing, export-grade seaworthy packaging, and fast maritime container dispatch.
              </p>
            </div>

            {/* Action CTA */}
            <div className="about-cta-block" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => onNavigate ? onNavigate('products') : null}
                className="btn btn-primary" 
                style={{ padding: '13px 32px', fontSize: '14.5px', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: 'none' }}
              >
                <span>Explore Products Catalog</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
