import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStoreBlogs } from '../utils/useStore';

export default function Blog({ onNavigate }) {
  const blogsList = useStoreBlogs();
  const posts = (Array.isArray(blogsList) ? blogsList : []).slice(0, 3);

  return (
    <section className="py-80 bg-light" id="blog">
      <div className="container">
        <div className="section-title text-center">
          <span className="eyebrow">Latest Insights & Market Reports</span>
          <h2>Agro & Spice Export <span style={{ color: 'var(--gold)' }}>Blog</span></h2>
          <p className="section-desc">Stay updated with crop updates, quality benchmarks, and product sourcing guides from Marvex International experts.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {posts.map((post, idx) => (
            <div key={post.id || idx} style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1.5px solid var(--border)', overflow: 'hidden', boxShadow: '0 8px 24px rgba(200, 148, 10, 0.05)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '200px', backgroundColor: '#FFFFFF', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={post.image} alt={post.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                <span style={{ position: 'absolute', bottom: 12, right: 12, backgroundColor: 'linear-gradient(135deg, #C8940A 0%, #D4AF37 100%)', background: 'var(--gold)', color: '#1C1917', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '100px' }}>
                  {post.date}
                </span>
              </div>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-h, Outfit, sans-serif)', fontSize: '18px', fontWeight: 800, color: 'var(--navy)', marginBottom: '10px', lineHeight: 1.3 }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--gray)', marginBottom: '16px', flex: 1, lineHeight: 1.5 }}>
                  {post.excerpt}
                </p>
                <a href="#blog" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('blog'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: 'var(--gold-deep)' }}>
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
