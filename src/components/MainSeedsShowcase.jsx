import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, MapPin, Sparkles, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStoreProducts } from '../utils/useStore';

export default function MainSeedsShowcase({ onSelectProduct, onOpenQuote, onNavigate }) {
  const storeProds = useStoreProducts();
  const allProducts = Array.isArray(storeProds) ? storeProds : [];
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // All seed products & seed spices
  const seedProducts = allProducts.filter(p => {
    if (!p) return false;
    const title = String(p.title || '').toLowerCase();
    const cat = String(p.category || p.cat || '').toLowerCase();
    const id = String(p.id || '').toLowerCase();
    return (
      cat.includes('seed') || 
      title.includes('seed') || 
      title.includes('cumin') || 
      title.includes('coriander') || 
      title.includes('fennel') || 
      title.includes('pepper') || 
      title.includes('cardamom') || 
      id.includes('seeds') ||
      id.includes('cumin') ||
      id.includes('coriander') ||
      id.includes('fennel')
    );
  });

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const cardEl = scrollContainerRef.current.querySelector('.seeds-showcase-card');
      const scrollAmount = cardEl ? cardEl.offsetWidth + 18 : 310;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Automatic Horizontal Scrolling
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const cardEl = scrollContainerRef.current.querySelector('.seeds-showcase-card');
        const scrollAmount = cardEl ? cardEl.offsetWidth + 18 : 310;

        // If reached end, scroll smoothly back to start, else scroll next card
        if (scrollLeft + clientWidth >= scrollWidth - 25) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section 
      className="main-seeds-showcase-section" 
      style={{ 
        background: 'var(--cream)', 
        color: 'var(--navy)',
        padding: '54px 0',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
        borderTop: '1px solid var(--border)'
      }}
    >
      <div className="container">
        
        {/* Centered Header Section */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px' }}>
          
          {/* Eyebrow Badge */}
          <span className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Sparkles size={14} style={{ color: 'var(--gold)' }} />
            <span>OUR SIGNATURE COMMODITIES • 100% SORTEX CLEANED</span>
          </span>

          {/* Centered Main Title */}
          <h2 style={{ fontFamily: 'var(--font-h)', fontSize: 'clamp(28px, 4.2vw, 42px)', fontWeight: 900, color: 'var(--navy)', lineHeight: 1.2, margin: '0 0 14px' }}>
            Our Main Export Products — <span style={{ color: 'var(--gold)' }}>Premium Seeds</span>
          </h2>

          {/* Centered Subtitle */}
          <p style={{ fontSize: '15.5px', color: '#57534E', lineHeight: 1.6, margin: '0 auto', maxWidth: '640px' }}>
            Specialized farm sourcing from Unjha (Gujarat) & major Mandis with guaranteed high essential oil, sortex grading & international export packing.
          </p>
        </div>

        {/* Horizontal Auto-Scrolling Track */}
        <div
          ref={scrollContainerRef}
          className="seeds-horizontal-scroll-track"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: '24px',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            padding: '12px 4px 16px',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {seedProducts.map((item, idx) => (
            <div
              key={item.id || idx}
              className="seeds-showcase-card"
              style={{
                flex: '0 0 300px',
                width: '300px',
                minWidth: '300px',
                maxWidth: '300px',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(1, 27, 71, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                border: '1.5px solid var(--border)',
                background: '#FFFFFF',
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease'
              }}
            >
              {/* Product Image Box */}
              <div
                style={{
                  height: '210px',
                  minHeight: '210px',
                  maxHeight: '210px',
                  background: '#F8FAFC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px',
                  position: 'relative',
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--border)'
                }}
                onClick={() => onSelectProduct ? onSelectProduct(item) : null}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    maxWidth: '85%',
                    maxHeight: '85%',
                    objectFit: 'contain',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>

              {/* Product Info Body */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3 
                    style={{ 
                      fontSize: '17px', 
                      fontWeight: 800, 
                      color: 'var(--navy)', 
                      marginBottom: '8px', 
                      lineHeight: 1.3, 
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                    onClick={() => onSelectProduct ? onSelectProduct(item) : null}
                    title={item.title}
                  >
                    {item.title}
                  </h3>

                  <p style={{ 
                    fontSize: '13.5px', 
                    color: 'var(--gray)', 
                    lineHeight: 1.5, 
                    marginBottom: '18px', 
                    height: '40px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    fontWeight: 500 
                  }}>
                    {item.desc || item.description || 'Premium quality export grade seeds sourced directly from authentic origin farms.'}
                  </p>
                </div>

                {/* Actions */}
                <div style={{ marginTop: 'auto' }}>
                  <button
                    onClick={() => onOpenQuote ? onOpenQuote(item.title) : null}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '10px 16px', fontSize: '13.5px', fontWeight: 700, justifyContent: 'center', borderRadius: '8px' }}
                  >
                    <span>Request Quote</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
