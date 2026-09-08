import React from 'react';
import { motion } from 'framer-motion';
import { 
  Package, ShieldCheck, Ship, FileText, CheckCircle2, Sparkles 
} from 'lucide-react';

export default function ExportCapabilitiesSection() {
  const capabilities = [
    {
      icon: Package,
      badge: 'Packaging Solutions',
      title: 'Custom & Bulk Export Packaging',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      desc: 'Hygienic, food-grade packaging designed to prevent moisture absorption and retain fresh aroma during long sea transits.',
      features: [
        '5kg to 50kg Multi-Wall Paper & Jute Bags',
        'High-Barrier Vacuum & HDPE Poly Bags',
        'Private Label OEM Printing & Custom Branding',
        'Palletized & Shrink-Wrapped Container Stuffing'
      ]
    },
    {
      icon: ShieldCheck,
      badge: 'Quality & Lab Testing',
      title: 'Strict Quality Control & Lab Analysis',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=80',
      desc: 'Rigorous multi-point testing protocols ensuring 100% compliance with international importing country standards.',
      features: [
        'Aflatoxin, Moisture & Foreign Matter Testing',
        'High Essential Oil & Curcumin Percentage Grading',
        'Sortex Cleaned & Double-Machine Sifted',
        'SGS / Geo-Chem Third-Party Inspection Available'
      ]
    },
    {
      icon: Ship,
      badge: 'Port Logistics',
      title: 'Direct Maritime Port Dispatch',
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
      desc: 'Strategic proximity to major Indian western ports ensuring rapid vessel turnaround and dependable shipping schedules.',
      features: [
        'Mundra, Kandla & Pipavav Port Connectivity',
        'FCL (Full Container) & LCL Cargo Handling',
        'Temperature & Moisture Controlled Ocean Transit',
        'Real-Time Vessel Tracking & Logistics Updates'
      ]
    },
    {
      icon: FileText,
      badge: 'Global Compliance',
      title: 'Complete Export Documentation',
      image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
      desc: 'Flawless customs paperwork and certified international trade documentation for seamless destination port clearance.',
      features: [
        'Bill of Lading (BL) & Commercial Invoice',
        'Certificate of Origin (COO) & Phytosanitary Cert',
        'FSSAI, APEDA, Spice Board & Halal Compliant',
        'Flexible Incoterms: CIF, FOB, CFR & Ex-Works'
      ]
    }
  ];

  return (
    <section className="export-capabilities-section py-50" style={{ background: '#FFFFFF', padding: '64px 0 72px' }} id="export-capabilities">
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
          <span className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={14} style={{ color: 'var(--navy)' }} />
            <span>GLOBAL EXPORT INFRASTRUCTURE & CAPABILITIES</span>
          </span>

          <h2 style={{ fontFamily: 'var(--font-h)', fontSize: 'clamp(28px, 4.2vw, 40px)', fontWeight: 900, color: 'var(--navy)', lineHeight: 1.2, margin: '14px 0 16px' }}>
            End-to-End Export Capabilities for International Importers
          </h2>

          <p style={{ fontSize: '16px', color: 'var(--gray)', lineHeight: 1.6, margin: '0 auto' }}>
            From farm-gate sourcing and precision grading to custom private-label packing and overseas maritime freight, Marvex International delivers complete supply chain certainty.
          </p>
        </div>

        {/* 4 Cards Grid with Images */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '26px' }}>
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1.5px solid var(--border)',
                  boxShadow: '0 4px 20px rgba(1, 27, 71, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#011B47';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(1, 27, 71, 0.12)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  const img = e.currentTarget.querySelector('.cap-card-img');
                  if (img) img.style.transform = 'scale(1.06)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(1, 27, 71, 0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  const img = e.currentTarget.querySelector('.cap-card-img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                {/* Photo Banner with Category Badge */}
                <div style={{ position: 'relative', height: '180px', overflow: 'hidden', background: '#F1F5F9' }}>
                  <img 
                    src={cap.image} 
                    alt={cap.title}
                    className="cap-card-img"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.4s ease'
                    }} 
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(1, 27, 71, 0.9)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFFFFF',
                    padding: '5px 12px',
                    borderRadius: '100px',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                  }}>
                    <Icon size={13} />
                    <span>{cap.badge}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Title & Desc */}
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy)', marginBottom: '10px', lineHeight: 1.3 }}>
                    {cap.title}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--gray)', lineHeight: 1.55, marginBottom: '20px' }}>
                    {cap.desc}
                  </p>

                  {/* Bullet Points */}
                  <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #F1F5F9' }}>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                      {cap.features.map((feat, fIdx) => (
                        <li key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#1E293B', fontWeight: 600 }}>
                          <CheckCircle2 size={15} style={{ color: '#011B47', flexShrink: 0, marginTop: '2px' }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
