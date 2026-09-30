import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Factory, Award, Users } from 'lucide-react';

export default function WhyMarvex({ onNavigate }) {
  const features = [
    {
      id: 'quality',
      title: 'Commitment to Quality & Excellence',
      icon: ShieldCheck
    },
    {
      id: 'mfg',
      title: 'Leading Manufacturer & Exporter of Brass Products & Accessories',
      icon: Factory
    },
    {
      id: 'expertise',
      title: 'Unmatched Expertise',
      icon: Award
    },
    {
      id: 'customer',
      title: 'Customer Centric Approach',
      icon: Users
    }
  ];

  return (
    <section 
      className="why-marvex-section"
      style={{
        background: '#F8FAFC',
        padding: '56px 0 62px',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
        position: 'relative'
      }}
    >
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Main Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-h)',
              fontSize: 'clamp(32px, 4.5vw, 46px)',
              fontWeight: 900,
              color: '#011B47',
              letterSpacing: '-0.5px',
              margin: 0,
              lineHeight: 1.15
            }}
          >
            Why Marvex?
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              width: '56px',
              height: '3.5px',
              background: 'linear-gradient(90deg, #011B47, #FACC15)',
              margin: '12px auto 0',
              borderRadius: '2px'
            }}
          />
        </div>

        {/* 4 Feature Badges Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '28px 20px',
            alignItems: 'start',
            justifyContent: 'center'
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
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '8px 12px',
                  borderRadius: '16px',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Circular Icon Container */}
                <div
                  style={{
                    width: '88px',
                    height: '88px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0A2540 0%, #011B47 100%)',
                    border: '3px solid #E2E8F0',
                    boxShadow: '0 10px 25px rgba(1, 27, 71, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#F8FAFC',
                    marginBottom: '18px',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#011B47';
                    e.currentTarget.style.color = '#FACC15';
                    e.currentTarget.style.borderColor = '#FACC15';
                    e.currentTarget.style.boxShadow = '0 14px 30px rgba(1, 27, 71, 0.28)';
                    e.currentTarget.style.transform = 'scale(1.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #0A2540 0%, #011B47 100%)';
                    e.currentTarget.style.color = '#F8FAFC';
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(1, 27, 71, 0.15)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Icon size={38} strokeWidth={1.85} />
                </div>

                {/* Feature Title */}
                <h3
                  style={{
                    fontSize: '16.5px',
                    fontWeight: 800,
                    color: '#011B47',
                    lineHeight: 1.35,
                    margin: 0,
                    maxWidth: '220px',
                    fontFamily: 'var(--font-h)'
                  }}
                >
                  {item.title}
                </h3>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
