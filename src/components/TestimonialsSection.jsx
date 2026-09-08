import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

const testimonials = [
  {
    name: 'Rajesh Patel',
    role: 'Import Director',
    location: 'Kuala Lumpur, Malaysia',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    stars: 5,
    text: 'Marvex International has been our trusted agro supplier. Their recent container dispatch arrived in perfect condition with 100% purity and fast customs clearance.'
  },
  {
    name: 'Sofia Martinez',
    role: 'Procurement Head',
    location: 'Valencia, Spain',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    stars: 5,
    text: 'Their strict quality control and direct export management give us complete confidence in every ocean container of spices & agro commodities we receive.'
  },
  {
    name: 'Ahmed Al-Mansoor',
    role: 'CEO & Founder',
    location: 'Riyadh, Saudi Arabia',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    stars: 5,
    text: 'From whole spices to ground powders and seeds, every single dispatch from Marvex International meets top international standards. Their professionalism and vessel freight speed are unmatched.'
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const activeTesti = testimonials[currentIndex];

  return (
    <section className="testimonial-redesign-section" id="testimonials">
      <div className="container">
        <div className="testimonial-grid">
          {/* Left Testimonial Carousel Card */}
          <div>
            <div className="section-title left-align" style={{ marginBottom: '32px' }}>
              <span className="eyebrow">CLIENT TESTIMONIALS</span>
              <h2>
                Growing Strong, <span>Nourishing Futures</span>
              </h2>
            </div>

            <motion.div
              key={currentIndex}
              className="testimonial-card-v2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="testi-card-header">
                <div className="testimonial-user-info">
                  <img src={activeTesti.img} alt={activeTesti.name} />
                  <div>
                    <h3>{activeTesti.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="testi-user-role">{activeTesti.role}</span>
                      <span className="testi-user-loc">• {activeTesti.location}</span>
                    </div>
                  </div>
                </div>
                <Quote size={42} className="testi-quote-icon" />
              </div>

              <div className="stars-wrap" style={{ margin: '18px 0 16px' }}>
                {Array.from({ length: activeTesti.stars }).map((_, i) => (
                  <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>

              <p className="testi-text-quote">
                "{activeTesti.text}"
              </p>
            </motion.div>

            <div className="testi-controls">
              <button
                onClick={handlePrev}
                className="testi-btn-prev"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={handleNext}
                className="testi-btn-next"
                aria-label="Next Testimonial"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          {/* Right Image + Animated Stat Badge */}
          <div style={{ position: 'relative' }}>
            <div className="testi-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
                alt="Testimonials Showcase — Marvex International"
              />
            </div>

            <div className="testimonial-count-badge-v2">
              <div className="badge-icon-circle">
                🌿
              </div>
              <div>
                <h3 className="badge-stat-num">
                  <AnimatedCounter end={100} suffix="%" />
                </h3>
                <p className="badge-stat-label">Pure Quality Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
