import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Ship, Building2, ShieldCheck } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

export default function CounterSection() {
  const stats = [
    {
      end: 100,
      suffix: '%',
      title: 'Purity & Quality Assurance',
      icon: ShieldCheck,
      desc: 'Lab tested, graded & 100% natural produce'
    },
    {
      end: 100,
      suffix: '%',
      title: 'Export-Ready Standards',
      icon: Ship,
      desc: 'Hygienic, moisture-proof container packaging'
    },
    {
      end: 100,
      suffix: '%',
      title: 'Direct Farm Sourcing',
      icon: Building2,
      desc: 'Ethically procured from premier Indian farms'
    },
    {
      end: 24,
      suffix: '/7',
      title: 'Dedicated Export Desk',
      icon: Globe2,
      desc: 'Prompt CIF & FOB global trade support'
    }
  ];

  return (
    <section className="counter-stats-redesign-section">
      <div className="container">
        <div className="counter-stats-grid">
          {stats.map((st, idx) => {
            const Icon = st.icon;
            return (
              <motion.div
                key={idx}
                className="counter-card-v2"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
              >
                <div className="counter-card-header">
                  <div className="counter-icon-wrap">
                    <Icon size={24} />
                  </div>
                  <h2 className="counter-num-val">
                    <AnimatedCounter end={st.end} suffix={st.suffix} />
                  </h2>
                </div>
                <h3>{st.title}</h3>
                <p>{st.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

