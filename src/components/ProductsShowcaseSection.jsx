import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Wheat, Cog, Cylinder, Sparkles } from 'lucide-react';
import { useStoreProducts } from '../utils/useStore';
import { normalizeProduct } from '../utils/adminStore';

export default function ProductsShowcaseSection({ onSelectProduct, onOpenQuote, onNavigate }) {
  const storeProds = useStoreProducts();
  const allProducts = Array.isArray(storeProds) ? storeProds : [];

  // Curate 4 to 6 flagship products (1-2 from each vertical) for a clean, non-cluttered preview
  const featuredProducts = useMemo(() => {
    const normalized = allProducts.map(normalizeProduct).filter(Boolean);
    
    const spices = normalized.filter(p => p.category === 'Indian Spices');
    const agro = normalized.filter(p => p.category === 'Agro Commodities');
    const machinery = normalized.filter(p => p.category === 'Machinery');
    const pipes = normalized.filter(p => p.category === 'Pipes');

    const curated = [
      // 1-2 Spices
      spices[0] || normalized[0],
      spices[1] || normalized[1],
      // 1-2 Agro Commodities
      agro[0] || normalized[2],
      agro[1] || normalized[3],
      // 1 Machinery
      machinery[0] || normalized[4],
      // 1 Pipes
      pipes[0] || normalized[5]
    ].filter(Boolean);

    return curated.slice(0, 6);
  }, [allProducts]);

  const getCategoryIcon = (cat) => {
    if (cat === 'Indian Spices') return <Flame size={13} style={{ color: '#EA580C' }} />;
    if (cat === 'Agro Commodities') return <Wheat size={13} style={{ color: '#16A34A' }} />;
    if (cat === 'Machinery') return <Cog size={13} style={{ color: '#0284C7' }} />;
    if (cat === 'Pipes') return <Cylinder size={13} style={{ color: '#6366F1' }} />;
    return <Sparkles size={13} style={{ color: 'var(--gold-deep)' }} />;
  };

  const getCategoryBadgeStyle = (cat) => {
    if (cat === 'Indian Spices') return { bg: '#FFF7ED', color: '#C2410C', border: '#FFEDD5' };
    if (cat === 'Agro Commodities') return { bg: '#F0FDF4', color: '#15803D', border: '#DCFCE7' };
    if (cat === 'Machinery') return { bg: '#F0F9FF', color: '#0369A1', border: '#E0F2FE' };
    if (cat === 'Pipes') return { bg: '#EEF2FF', color: '#4338CA', border: '#E0E7FF' };
    return { bg: 'var(--gold-pale)', color: 'var(--gold-deep)', border: 'var(--gold-light)' };
  };

  return (
    <section className="py-50" id="products-section" style={{ background: '#FFFFFF', padding: '60px 0 70px' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div className="section-title">
            <span className="eyebrow" style={{ letterSpacing: '1.8px' }}>
              GLOBAL EXPORT PORTFOLIO
            </span>
            <h2 style={{ color: 'var(--navy)', marginTop: '12px', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900 }}>
              Our Featured <span style={{ color: 'var(--gold)' }}>Export Commodities</span>
            </h2>
            <p style={{ marginTop: '12px', color: 'var(--gray)', maxWidth: '640px', margin: '12px auto 0', fontSize: '15px', lineHeight: 1.6 }}>
              A curated selection of our certified export verticals — quality tested, sortex graded, and container packed for worldwide delivery.
            </p>
          </div>
        </div>

        {/* Clean 6-Product Flagship Grid (Without category filter buttons) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
          {featuredProducts.map((item, idx) => {
            const badge = getCategoryBadgeStyle(item.category);
            return (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: (idx % 3) * 0.08 }}
                style={{ 
                  background: '#FFFFFF', 
                  borderRadius: '22px', 
                  overflow: 'hidden', 
                  border: '1.5px solid var(--border)', 
                  boxShadow: '0 8px 26px rgba(10, 34, 64, 0.05)', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
                }}
                whileHover={{ y: -6, boxShadow: '0 18px 36px rgba(200, 148, 10, 0.18)', borderColor: 'var(--gold)' }}
              >
                {/* Product Image — Object-Fit Contain (Uncropped) */}
                <div 
                  style={{ 
                    height: '230px', 
                    backgroundColor: '#FFFFFF', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    padding: '20px',
                    borderBottom: '1px solid var(--border)',
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                  onClick={() => onSelectProduct ? onSelectProduct(item) : null}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      transition: 'transform 0.4s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />

                  {/* Category Pill Tag */}
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: badge.bg,
                    color: badge.color,
                    border: `1px solid ${badge.border}`,
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: '100px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {getCategoryIcon(item.category)}
                    {item.category}
                  </span>
                </div>

                {/* Product Body */}
                <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {item.subcategory && (
                    <span style={{ fontSize: '11.5px', fontWeight: 800, color: 'var(--gold-deep)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '6px' }}>
                      {item.subcategory}
                    </span>
                  )}

                  <h3 
                    style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px', lineHeight: 1.3, cursor: 'pointer' }}
                    onClick={() => onSelectProduct ? onSelectProduct(item) : null}
                  >
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '13.5px', color: 'var(--gray)', lineHeight: 1.55, marginBottom: '20px', flex: 1, fontWeight: 500 }}>
                    {item.desc || item.description}
                  </p>

                  {/* Action Buttons */}
                  <div style={{ marginTop: 'auto' }}>
                    <button
                      onClick={() => onOpenQuote ? onOpenQuote(item.title) : null}
                      className="btn btn-primary"
                      style={{ width: '100%', padding: '11px 16px', fontSize: '13.5px', justifyContent: 'center' }}
                    >
                      <span>Request Quote</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Products CTA Link */}
        <div style={{ textAlign: 'center', marginTop: '44px' }}>
          <button
            onClick={() => onNavigate ? onNavigate('products') : null}
            className="btn btn-primary"
            style={{ padding: '14px 34px', fontSize: '15px', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '100px', boxShadow: '0 8px 24px rgba(0, 33, 71, 0.2)' }}
          >
            <span>Explore Complete Multi-Category Catalog</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}
