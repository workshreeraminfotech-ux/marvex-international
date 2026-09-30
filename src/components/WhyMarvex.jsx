import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Factory, Sparkles, Users } from 'lucide-react';

export default function WhyMarvex({ onNavigate }) {
  const features = [
    {
      id: 'quality',
      title: 'Commitment to Quality & Excellence',
      icon: ShieldCheck,
      desc: 'UL 467, ISO 9001 & APEDA certified export quality with strict multi-stage lab inspections.'
    },
    {
      id: 'mfg',
      title: 'Leading Manufacturer & Exporter of Precision Parts',
      icon: Factory,
      desc: 'In-house precision CNC brass turning, copper earth rod bonding, and sortex spice processing.'
    },
    {
      id: 'expertise',
      title: 'Unmatched Global Expertise',
      icon: Sparkles,
      desc: 'Decades of combined engineering excellence and seamless maritime port cargo logistics.'
    },
    {
      id: 'customer',
      title: 'Customer Centric Approach',
      icon: Users,
      desc: 'Dedicated FOB/CIF support, tailored custom technical drawings, and prompt global delivery.'
    }
  ];

  return (
    <section 
      className="why-marvex-section"
      style={{
        background: '#F8FAFC',
        padding: '60px 0 68px',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
        position: 'relative'
      }}
    >
      <div className="container">
        
        {/* Main Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '46px' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-h)',
              fontSize: 'clamp(32px, 4.4vw, 44px)',
              fontWeight: 900,
              color: '#011B47',
              letterSpacing: '-0.5px',
              margin: 0,
              lineHeight: 1.2
            }}
          >
            Why Marvex?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: '15.5px',
              color: '#64748B',
              margin: '8px auto 0',
              maxWidth: '620px',
              lineHeight: 1.6
            }}
          >
            Your trusted global manufacturing & merchant export partner delivering precision, reliability, and certified purity worldwide.
          </motion.p>
        </div>

        {/* 4 Feature Badges Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '28px',
            alignItems: 'start'
          }}
        >
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '16px 12px',
                  borderRadius: '18px',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Circular Icon Container */}
                <div
                  style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #E8EFF8 0%, #D8E4F2 100%)',
                    border: '2px solid #CBD5E1',
                    boxShadow: '0 8px 20px rgba(1, 27, 71, 0.08), inset 0 2px 4px rgba(255,255,255,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#011B47',
                    marginBottom: '18px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#011B47';
                    e.currentTarget.style.color = '#FACC15';
                    e.currentTarget.style.borderColor = '#011B47';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(1, 27, 71, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #E8EFF8 0%, #D8E4F2 100%)';
                    e.currentTarget.style.color = '#011B47';
                    e.currentTarget.style.borderColor = '#CBD5E1';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(1, 27, 71, 0.08), inset 0 2px 4px rgba(255,255,255,0.8)';
                  }}
                >
                  <Icon size={36} strokeWidth={1.9} />
                </div>

                {/* Feature Title */}
                <h3
                  style={{
                    fontSize: '16.5px',
                    fontWeight: 800,
                    color: '#011B47',
                    lineHeight: 1.35,
                    margin: '0 0 8px',
                    maxWidth: '220px'
                  }}
                >
                  {item.title}
                </h3>

                {/* Short Description */}
                <p
                  style={{
                    fontSize: '13px',
                    color: '#64748B',
                    lineHeight: 1.5,
                    margin: 0,
                    maxWidth: '230px'
                  }}
                >
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
