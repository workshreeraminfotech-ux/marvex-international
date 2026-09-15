import React from 'react';
import { motion } from 'framer-motion';
import { SearchCheck, ShieldCheck, PackageCheck, Ship, ArrowRight } from 'lucide-react';

export default function WorkProcess() {
  const steps = [
    {
      num: '01',
      title: 'Sourcing & Selection',
      desc: 'Procuring pure, high-grade agricultural commodities directly from audited Indian farm networks.',
      icon: SearchCheck
    },
    {
      num: '02',
      title: 'Quality Assurance',
      desc: 'Multi-stage laboratory testing, cleaning, and grading ensuring 100% international compliance.',
      icon: ShieldCheck
    },
    {
      num: '03',
      title: 'Export Packaging',
      desc: 'Hygienic, moisture-resistant, food-grade eco packaging preserving natural aroma & shelf life.',
      icon: PackageCheck
    },
    {
      num: '04',
      title: 'Global Delivery',
      desc: 'Seamless customs documentation, port dispatch, and real-time ocean freight logistics support.',
      icon: Ship
    },
  ];

  return (
    <section style={{ padding: '64px 0', background: '#FFFFFF', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }} id="process">
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="eyebrow">
            EXPORT WORKFLOW
          </span>
          <h2 style={{ fontSize: '38px', fontWeight: 900, color: 'var(--navy)', marginTop: '12px', marginBottom: '14px', fontFamily: 'var(--font-h)' }}>
            Our Export Journey: <span style={{ color: 'var(--gold)' }}>From Source to Overseas Port</span>
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--gray)', maxWidth: '620px', margin: '0 auto', lineHeight: 1.6 }}>
            We ensure the smooth journey of your agro commodities from trusted Indian origins to global destination ports with zero compromise on quality and speed.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -6, boxShadow: '0 16px 36px rgba(1, 27, 71, 0.12)' }}
                style={{
                  background: '#F8FAFC',
                  borderRadius: '20px',
                  padding: '32px 24px',
                  border: '1.5px solid var(--border)',
                  boxShadow: '0 6px 20px rgba(1, 27, 71, 0.05)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Step Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '14px', 
                    background: '#011B47', 
                    color: '#FFFFFF', 
                    border: '1px solid #011B47',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: '0 6px 16px rgba(1, 27, 71, 0.25)'
                  }}>
                    <Icon size={24} />
                  </div>
                  <span style={{ fontSize: '24px', fontWeight: 900, color: '#011B47', opacity: 0.95, fontFamily: 'var(--font-h)' }}>
                    {step.num}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy)', marginBottom: '10px' }}>
                  {step.title}
                </h3>

                {/* Text */}
                <p style={{ fontSize: '14px', color: 'var(--gray)', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
