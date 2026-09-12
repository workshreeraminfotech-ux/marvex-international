import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, ArrowRight, X, Sparkles } from 'lucide-react';
import { useStoreBlogs } from '../utils/useStore';

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [activeArticle, setActiveArticle] = useState(null);

  const blogsList = useStoreBlogs();

  const filtered = (Array.isArray(blogsList) ? blogsList : []).filter(b => {
    if (!b) return false;
    const title = String(b.title || '').toLowerCase();
    const cat = String(b.cat || b.category || '').toLowerCase();
    const excerpt = String(b.excerpt || '').toLowerCase();
    const s = search.toLowerCase();
    return title.includes(s) || cat.includes(s) || excerpt.includes(s);
  });

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '80px' }}>
      
      <section style={{
        position: 'relative',
        color: '#FFFFFF',
        padding: '75px 0 65px',
        overflow: 'hidden',
        backgroundColor: '#1C1917'
      }}>
        {/* Background Image */}
        <img 
          src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1920&q=80" 
          alt="Priya Impex Agro Blog Background" 
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 0
          }}
        />
        {/* Ocean Maritime Dark Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10, 34, 64, 0.78) 0%, rgba(7, 23, 44, 0.90) 100%)',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: '1.5px solid #6E737D',
              color: '#CBD2DC',
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              padding: '6px 20px',
              borderRadius: '100px',
              marginBottom: '20px',
              backdropFilter: 'blur(6px)'
            }}>
              <Sparkles size={14} style={{ color: '#CBD2DC' }} />
              Knowledge Hub & Export Insights
            </span>

            <h1 style={{
              fontFamily: 'var(--font-h, Outfit, sans-serif)',
              fontSize: 'clamp(32px, 5vw, 54px)',
              fontWeight: 900,
              marginBottom: '20px',
              lineHeight: 1.15,
              color: '#FFFFFF'
            }}>
              Spice Product Guides & <br />
              <span style={{ color: '#CBD2DC' }}>Market Insights</span>
            </h1>

            <p style={{ fontSize: '17px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6, maxWidth: '680px', margin: '0 auto', fontWeight: 500 }}>
              Expert articles on Indian spice quality parameters, curcumin testing, ASTA color ratings, purity standards, and global commodity exports.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="py-60">
        <div className="container">
          
          {/* Header Controls */}
          <div style={{ marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{ fontFamily: 'var(--font-h, Outfit, sans-serif)', fontSize: 24, fontWeight: 800, color: 'var(--navy)' }}>
              All Articles <span style={{ color: 'var(--gray)', fontWeight: 500, fontSize: 16 }}>({filtered.length})</span>
            </h2>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid var(--border)',
              borderRadius: '14px',
              padding: '10px 18px',
              maxWidth: '360px',
              width: '100%'
            }}>
              <Search size={18} style={{ color: 'var(--gold)' }} />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '14px', fontWeight: 500, color: 'var(--navy)' }}
              />
            </div>
          </div>

          {/* Featured Post (Index 0) */}
          {filtered.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setActiveArticle(filtered[0])}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                border: '1.5px solid var(--border)',
                overflow: 'hidden',
                boxShadow: '0 12px 35px rgba(200, 148, 10, 0.08)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                marginBottom: '40px',
                cursor: 'pointer'
              }}
            >
              <div style={{ height: '320px', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
                <img
                  src={filtered[0].image}
                  alt={filtered[0].title}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
              </div>

              <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: 'var(--gold-deep)',
                  backgroundColor: 'var(--gold-pale)',
                  padding: '4px 14px',
                  borderRadius: '100px',
                  alignSelf: 'flex-start',
                  marginBottom: '14px'
                }}>
                  {filtered[0].cat}
                </span>

                <h2 style={{
                  fontFamily: 'var(--font-h, Outfit, sans-serif)',
                  fontSize: '24px',
                  fontWeight: 800,
                  color: 'var(--navy)',
                  marginBottom: '12px',
                  lineHeight: 1.3
                }}>
                  {filtered[0].title}
                </h2>

                <p style={{ color: 'var(--gray)', fontSize: '14.5px', marginBottom: '20px', lineHeight: 1.6 }}>
                  {filtered[0].excerpt}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <span style={{ fontSize: '12.5px', color: 'var(--gray)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} /> {filtered[0].date} · {filtered[0].read}
                  </span>

                  <button
                    className="btn btn-primary"
                    style={{
                      padding: '10px 20px',
                      fontSize: '13px',
                      display: 'inline-flex'
                    }}
                  >
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Grid of Remaining Articles */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '28px'
          }}>
            {filtered.slice(1).map((b, idx) => (
              <motion.div
                key={b.id || idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.1 }}
                onClick={() => setActiveArticle(b)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1.5px solid var(--border)',
                  overflow: 'hidden',
                  boxShadow: '0 8px 30px rgba(200, 148, 10, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
                }}
                whileHover={{ y: -5, boxShadow: '0 16px 36px rgba(200, 148, 10, 0.2)', borderColor: 'var(--gold)' }}
              >
                <div style={{
                  height: '210px',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px',
                  borderBottom: '1px solid var(--border)'
                }}>
                  <img
                    src={b.image}
                    alt={b.title}
                    loading="lazy"
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                </div>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: 'var(--gold-deep)',
                    backgroundColor: 'var(--gold-pale)',
                    padding: '3px 10px',
                    borderRadius: '100px',
                    alignSelf: 'flex-start',
                    marginBottom: '10px'
                  }}>
                    {b.cat}
                  </span>

                  <h3 style={{
                    fontFamily: 'var(--font-h, Outfit, sans-serif)',
                    fontSize: '18px',
                    fontWeight: 800,
                    color: 'var(--navy)',
                    marginBottom: '10px',
                    lineHeight: 1.35
                  }}>
                    {b.title}
                  </h3>

                  <p style={{
                    fontSize: '13.5px',
                    color: '#475569',
                    lineHeight: 1.55,
                    marginBottom: '20px',
                    flex: 1,
                    fontWeight: 500,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {b.excerpt}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', borderTop: '1px solid #F1F5F9', paddingTop: '14px' }}>
                    <span style={{ fontSize: '12px', color: '#8C96A0', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} /> {b.date}
                    </span>

                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#002147', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      Read <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '60px 20px',
              textAlign: 'center',
              border: '1.5px dashed var(--border)',
              marginTop: '20px'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>
                No blog articles found
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--gray)', margin: 0 }}>
                {blogsList.length === 0 ? 'No articles published yet.' : 'Try adjusting your search query.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(7, 23, 46, 0.82)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }} onClick={() => setActiveArticle(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              width: '100%',
              maxWidth: 720,
              maxHeight: '88vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              boxShadow: '0 20px 50px rgba(0, 33, 71, 0.25)'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveArticle(null)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                backgroundColor: '#F1F5F9',
                border: 'none',
                borderRadius: '50%',
                width: 34,
                height: 34,
                color: '#002147',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              <X size={18} />
            </button>

            {/* Header Image — Uncropped contain */}
            <div style={{
              height: 230,
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
              borderBottom: '1px solid #F1F5F9',
              flexShrink: 0
            }}>
              <img src={activeArticle.image} alt={activeArticle.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </div>

            {/* Content Body */}
            <div style={{ padding: '30px 36px', overflowY: 'auto' }}>
              <span style={{
                fontSize: 11,
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#002147',
                backgroundColor: '#F1F5F9',
                padding: '4px 12px',
                borderRadius: 100,
                display: 'inline-block',
                marginBottom: 12
              }}>
                {activeArticle.cat}
              </span>

              <h2 style={{
                fontFamily: 'var(--font-h, Outfit, sans-serif)',
                fontSize: 22,
                fontWeight: 800,
                color: '#002147',
                marginBottom: 10,
                lineHeight: 1.3
              }}>
                {activeArticle.title}
              </h2>

              <p style={{ fontSize: 13, color: '#8C96A0', fontWeight: 600, marginBottom: 20 }}>
                <Clock size={13} style={{ display: 'inline', marginRight: 4 }} />
                {activeArticle.date} · {activeArticle.read}
              </p>

              <div style={{ fontSize: 14.5, color: '#334155', lineHeight: 1.75, whiteSpace: 'pre-line' }}>
                {activeArticle.body}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
