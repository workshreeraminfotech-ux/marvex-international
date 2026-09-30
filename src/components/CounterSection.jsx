import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Globe2 } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

export default function CounterSection() {
  const stats = [
    {
      end: 30,
      suffix: '+',
      title: 'Years of Experience',
      icon: Award
    },
    {
      end: 500,
      suffix: '+',
      title: 'Happy Customers',
      icon: Users
    },
    {
      end: 40,
      suffix: '+',
      title: 'Countries Exported',
      icon: Globe2
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
                {st.desc && <p>{st.desc}</p>}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

