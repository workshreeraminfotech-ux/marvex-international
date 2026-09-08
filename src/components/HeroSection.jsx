import React from 'react';
import { ArrowRight, CheckCircle2, Globe2 } from 'lucide-react';
import heroBgVideo from '../assets/hero-bg.mp4';

export default function HeroSection() {
  return (
    <section className="jrp-hero-section" id="hero">
      {/* Background Video */}
      <video 
        className="hero-video-bg" 
        autoPlay 
        loop 
        muted 
        playsInline 
      >
        <source src={heroBgVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="hero-video-overlay"></div>

      <div className="container">
        <div className="jrp-hero-content-wrapper">
          <div className="jrp-hero-badge">
            <Globe2 size={14} />
            <span>World-Class Maritime Agro Exports</span>
          </div>

          <div className="jrp-hero-content">
            <h1>
              Global Agro, <br />
              <span>Rooted in Quality</span>
            </h1>

            <p className="jrp-hero-description">
              Choose Marvex International for agro commodities, whole spices, and food products that meet the highest international standards. Delivering trust, exporting excellence worldwide.
            </p>

            <ul className="jrp-hero-list">
              <li>
                <CheckCircle2 size={18} />
                <span>Harvesting Trust, Shipping Excellence</span>
              </li>
              <li>
                <CheckCircle2 size={18} />
                <span>From India's Finest Farms to Global Ports</span>
              </li>
            </ul>

            <div className="jrp-hero-actions">
              <a href="#about" className="btn-primary" style={{ padding: '16px 36px', fontSize: '16px' }}>
                <span>View More</span>
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
