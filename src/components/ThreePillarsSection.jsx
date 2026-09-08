import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, Flame, Wrench, ArrowRight, CheckCircle2, 
  Sparkles, Factory, Ship, ShieldCheck 
} from 'lucide-react';

export default function ThreePillarsSection({ onNavigate, onOpenQuote }) {
  const pillars = [
    {
      id: 'earthing',
      categoryKey: 'Earthing Parts',
      badge: 'Manufacturer & Exporter',
      badgeType: 'mfg',
      title: 'Electrical Earthing & Grounding Solutions',
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Custom-manufactured copper bonded earth rods, brass earthing clamps, lightning arresters & grounding accessories engineered to IEC/UL standards.',
      keyItems: [
        'Copper Bonded & Pure Solid Earth Rods',
        'Heavy-Duty Brass Ground Clamps & Couplers',
        'Chemical Earth Electrodes & Earth Pits',
        'Lightning Protection Air Terminals & Tapes'
      ],
      ctaText: 'Explore Earthing Range'
    },
    {
      id: 'spices',
      categoryKey: 'Spices & Agro Commodities',
      badge: 'Merchant Exporter',
      badgeType: 'merchant',
      title: 'Indian Spices & Agro Commodities',
      icon: Flame,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Direct procurement of 100% Sortex-cleaned whole spices, ground powders, and oil seeds from India\'s top fertile farm mandis with worldwide maritime shipping.',
      keyItems: [
        'Cumin, Coriander, Fennel & Mustard Seeds',
        'Pure Turmeric, Red Chilli & Spice Powders',
        'Whole Bold Cardamom, Cloves & Black Pepper',
        'Natural & Hulled Sesame Seeds (Sortex 99.9%)'
      ],
      ctaText: 'Explore Agro & Spices'
    },
    {
      id: 'hardware-sanitary',
      categoryKey: 'Hardware & Sanitary Items',
      badge: 'Manufacturer & Exporter',
      badgeType: 'mfg',
      title: 'Hardware & Sanitary Items',
      icon: Wrench,
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'In-house precision manufacturing of food-grade stainless steel & quartz kitchen sinks, designer ceramic wash basins, brass mixer taps, luxury rain showers, and bath fittings.',
      keyItems: [
        'Stainless Steel (SS 304) & Quartz Kitchen Sinks',
        'Designer Ceramic Countertop & Wall Wash Basins',
        'Kitchen Sink Mixers, Basin Taps & Pillar Cocks',
        'Overhead Ultra-Slim Rain Showers & Hand Showers',
        'Sanitary Brass Angle Valves, Drains & Bath Accessories'
      ],
      ctaText: 'Explore Sanitary & Hardware'
    }
  ];

  return (
    <section className="three-pillars-section py-50" style={{ background: '#F8FAFC', padding: '64px 0 76px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }} id="business-verticals">
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto 48px' }}>
          <span className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={14} style={{ color: 'var(--navy)' }} />
            <span>OUR 3 CORE BUSINESS VERTICALS</span>
          </span>

          <h2 style={{ fontFamily: 'var(--font-h)', fontSize: 'clamp(28px, 4.2vw, 40px)', fontWeight: 900, color: 'var(--navy)', lineHeight: 1.2, margin: '14px 0 16px' }}>
            What We Do: Complete Manufacturing & Merchant Export Solutions
          </h2>

          <p style={{ fontSize: '16px', color: 'var(--gray)', lineHeight: 1.6, margin: '0 auto', maxWidth: '720px' }}>
            A versatile Indian export company delivering precision-manufactured engineering parts alongside ethically procured agricultural commodities under one trusted roof.
          </p>
        </div>

        {/* 3 Large Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isMfg = pillar.badgeType === 'mfg';

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.12 }}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1.5px solid var(--border)',
                  boxShadow: '0 8px 30px rgba(1, 27, 71, 0.07)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#011B47';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(1, 27, 71, 0.14)';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  const img = e.currentTarget.querySelector('.pillar-img');
                  if (img) img.style.transform = 'scale(1.06)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(1, 27, 71, 0.07)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  const img = e.currentTarget.querySelector('.pillar-img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                {/* Photo Banner with Role Badge */}
                <div style={{ position: 'relative', height: '210px', overflow: 'hidden', background: '#011B47' }}>
                  <img 
                    src={pillar.image} 
                    alt={pillar.title}
                    className="pillar-img"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.45s ease'
                    }} 
                  />
                  
                  {/* Floating Role Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    background: '#011B47',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#FFFFFF',
                    padding: '6px 14px',
                    borderRadius: '100px',
                    fontSize: '11.5px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                  }}>
                    {isMfg ? <Factory size={13} /> : <Ship size={13} />}
                    <span>{pillar.badge}</span>
                  </div>

                  {/* Icon Circle in bottom right of photo */}
                  <div style={{
                    position: 'absolute',
                    bottom: '14px',
                    right: '14px',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    color: '#011B47',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.25)'
                  }}>
                    <Icon size={22} />
                  </div>
                </div>

                {/* Card Content Body */}
                <div style={{ padding: '26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy)', marginBottom: '10px', lineHeight: 1.3 }}>
                    {pillar.title}
                  </h3>

                  <p style={{ fontSize: '14px', color: 'var(--gray)', lineHeight: 1.6, marginBottom: '22px' }}>
                    {pillar.shortDesc}
                  </p>

                  {/* Key Offerings List */}
                  <div style={{ marginTop: 'auto', paddingTop: '18px', borderTop: '1px solid #F1F5F9', marginBottom: '22px' }}>
                    <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#011B47', fontWeight: 800, marginBottom: '10px' }}>
                      Key Product Offerings:
                    </h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {pillar.keyItems.map((item, kIdx) => (
                        <li key={kIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#1E293B', fontWeight: 600 }}>
                          <CheckCircle2 size={15} style={{ color: '#011B47', flexShrink: 0, marginTop: '2px' }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => onNavigate ? onNavigate('products', pillar.categoryKey) : null}
                      className="btn btn-primary"
                      style={{ flex: 1, padding: '11px 16px', fontSize: '13.5px', justifyContent: 'center', borderRadius: '10px' }}
                    >
                      <span>{pillar.ctaText}</span>
                      <ArrowRight size={14} />
                    </button>

                    <button
                      onClick={() => onOpenQuote ? onOpenQuote(pillar.title) : null}
                      className="btn btn-outline"
                      style={{ padding: '11px 16px', fontSize: '13.5px', justifyContent: 'center', borderRadius: '10px' }}
                      title="Request Instant RFQ"
                    >
                      <span>Quote</span>
                    </button>
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
