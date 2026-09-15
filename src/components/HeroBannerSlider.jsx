import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import heroBgVideo from '../assets/hero-bg.mp4';
import heroPoster from '../assets/hero-poster.jpg';

export default function HeroBannerSlider({ onOpenQuote, onNavigate }) {
  return (
    <section 
      className="jrp-hero-section" 
      style={{ 
        position: 'relative', 
        minHeight: '580px', 
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden', 
        background: '#07172C',
        marginTop: 0,
        clear: 'both',
        padding: '78px 0 82px'
      }}
    >
      {/* Background Video — Fast-Loading Web MP4 with Instant Poster */}
      <video 
        className="hero-video-bg" 
        autoPlay 
        loop 
        muted 
        playsInline
        preload="metadata"
        poster={heroPoster}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          opacity: 1,
          filter: 'brightness(1.24) contrast(1.08) saturate(1.20)',
          zIndex: 1 
        }}
      >
        <source src={heroBgVideo} type="video/mp4" />
      </video>

      {/* Clean Subtle Lighter Gradient Overlay with Radiant Glow */}
      <div 
        className="hero-video-overlay" 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(180deg, rgba(10, 34, 64, 0.22) 0%, rgba(7, 23, 44, 0.38) 50%, rgba(5, 17, 34, 0.65) 100%)', 
          zIndex: 2 
        }}
      ></div>

      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <div style={{ maxWidth: '820px' }}>
          
          {/* Top Tagline Badge */}
          <motion.div 
            className="hero-badge-wrap"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '18px' }}
          >
            <span 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                background: 'rgba(0, 14, 38, 0.9)', 
                backdropFilter: 'blur(10px)', 
                padding: '6px 18px', 
                borderRadius: '100px', 
                fontSize: '12.5px', 
                fontWeight: 800, 
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                letterSpacing: '0.6px',
                textTransform: 'uppercase'
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFFFFF', display: 'inline-block', boxShadow: '0 0 10px rgba(255,255,255,0.8)' }}></span>
              <span>Precision Manufacturing & Global Merchant Exports</span>
            </span>
          </motion.div>

          {/* Main Hero Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ 
              fontFamily: 'var(--font-h)', 
              fontSize: 'clamp(32px, 4.8vw, 48px)', 
              fontWeight: 900, 
              color: '#ffffff', 
              lineHeight: 1.18, 
              marginBottom: '16px', 
              letterSpacing: '-0.5px',
              textShadow: '0 4px 24px rgba(0,0,0,0.6)' 
            }}
          >
            <span className="hero-h1-desktop">
              Earthing Parts Exporter & Hot Line Clamps • Premier Indian Spices Exporter
            </span>
            <span className="hero-h1-mobile">
              Manufacturer & Global Merchant Exporter
            </span>
          </motion.h1>

          {/* Subtitle / Paragraph */}
          <motion.p 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ 
              fontSize: 'clamp(15px, 1.7vw, 17px)', 
              color: 'rgba(255,255,255,0.92)', 
              lineHeight: 1.62, 
              marginBottom: '32px', 
              maxWidth: '720px', 
              textShadow: '0 2px 10px rgba(0,0,0,0.45)' 
            }}
          >
            <span className="hero-desc-desktop">
              Marvex International is India's premier earthing parts exporter, hot line clamp manufacturer, and leading Indian spices exporter delivering UL-tested grounding rods, hotline tap clamps, sanitary hardware, and 100% Sortex-cleaned whole & ground spices worldwide.
            </span>
            <span className="hero-desc-mobile">
              Precision Manufacturer of Earthing & Sanitary Hardware and Premier Merchant Exporter of 100% Sortex-Cleaned Indian Spices Worldwide.
            </span>
          </motion.p>

          {/* CTA Action Buttons */}
          <motion.div 
            className="hero-cta-wrapper"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}
          >
            <button 
              onClick={() => onNavigate ? onNavigate('contact') : null}
              className="hero-cta-btn"
              style={{ 
                padding: '15px 32px', 
                fontSize: '15.5px', 
                fontWeight: 800,
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '10px', 
                background: '#FFFFFF',
                color: '#011B47',
                border: '2px solid #FFFFFF',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 255, 255, 0.25)',
                borderRadius: '100px',
                cursor: 'pointer',
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
              <span>Request Quote / CIF Price</span>
              <ArrowRight size={18} />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
