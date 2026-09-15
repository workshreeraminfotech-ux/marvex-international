import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ArrowRight, Sparkles, Filter, CheckCircle2, 
  Zap, Flame, Wrench, Factory, Ship, LayoutGrid, Layers, Tag,
  Award, Truck, Box, Cpu, Sun, Compass, Shield, Package, Globe
} from 'lucide-react';
import { useStoreProducts, useStoreCategories } from '../utils/useStore';
import { normalizeProduct } from '../utils/adminStore';

const ICON_MAP = {
  Zap, Flame, Wrench, Shield, Package, Globe, Layers, Sparkles, Factory, Ship, Sun, Cpu, Box, Award, Truck, Tag, Compass
};

function getCategoryIcon(iconName) {
  if (!iconName) return Layers;
  if (typeof iconName !== 'string') return iconName;
  return ICON_MAP[iconName] || Layers;
}

export default function ProductsPage({ initialCategory = 'Earthing Parts', onSelectProduct, onOpenQuote }) {
  const categories = useStoreCategories();
  const productsList = useStoreProducts();

  const getValidCategory = (cat) => {
    if (!categories || categories.length === 0) return 'Earthing Parts';
    if (!cat || cat === 'All') return categories[0].name;
    const exact = categories.find(c => c.name.toLowerCase() === String(cat).toLowerCase() || c.id === cat);
    if (exact) return exact.name;
    const lower = String(cat).toLowerCase();
    const fuzzy = categories.find(c => lower.includes(c.name.toLowerCase()) || c.name.toLowerCase().includes(lower));
    if (fuzzy) return fuzzy.name;
    return categories[0].name;
  };

  const [activeTab, setActiveTab] = useState(() => getValidCategory(initialCategory));
  const [activeSubcategory, setActiveSubcategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Sync if initialCategory prop changes from navbar click
  useEffect(() => {
    if (initialCategory) {
      setActiveTab(getValidCategory(initialCategory));
      setActiveSubcategory('All');
    }
  }, [initialCategory, categories]);

  const currentMeta = useMemo(() => {
    const found = categories.find(c => c.name.toLowerCase() === activeTab.toLowerCase());
    if (found) return found;
    if (categories.length > 0) return categories[0];
    return {
      name: 'Earthing Parts',
      title: 'Electrical Earthing & Grounding Systems',
      businessRole: 'Manufacturer & Exporter',
      eyebrow: 'UL 467 & IEC 62305 Standard Compliant • In-House Manufacturing',
      desc: 'High-conductivity molecularly bonded copper earth rods (254 microns), pure solid copper rods, heavy-duty brass ground clamps, and grounding systems.',
      bgImg: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=1920&q=80',
      icon: 'Zap',
      badges: ['In-House Manufacturer', 'UL / IEC Standard Compliant', '254 Micron Molecular Copper Coating', 'Custom Technical Drawings'],
      subcategories: ['Earth Rods & Conductors', 'Earth Clamps & Couplers', 'Chemical Electrodes & Compounds', 'Lightning Protection']
    };
  }, [activeTab, categories]);

  const HeaderIcon = getCategoryIcon(currentMeta.icon);

  // Subcategories array for pills
  const subcategoryPills = useMemo(() => {
    const subs = Array.isArray(currentMeta.subcategories) ? currentMeta.subcategories : [];
    return [`All ${currentMeta.name || ''}`, ...subs];
  }, [currentMeta]);

  // Filter logic safely with strict category isolation
  const filteredProducts = useMemo(() => {
    const list = Array.isArray(productsList) ? productsList : [];
    const q = searchTerm.trim().toLowerCase();

    return list.filter(product => {
      if (!product) return false;
      const normalized = normalizeProduct(product);
      if (!normalized) return false;

      const prodCat = normalized.category || 'Indian Spices';
      const prodSubCat = normalized.subcategory || '';
      const title = String(normalized.title || normalized.name || '');
      const desc = String(normalized.description || normalized.desc || '');
      const hs = String(normalized.hsCode || '');

      // Strict Category match (no loose substring bleed)
      const matchesCategory = prodCat.toLowerCase() === activeTab.toLowerCase();
      if (!matchesCategory) return false;

      // Subcategory filter match if active
      let matchesSubcategory = true;
      if (activeSubcategory && activeSubcategory !== 'All' && !activeSubcategory.startsWith('All ')) {
        matchesSubcategory = prodSubCat.toLowerCase() === activeSubcategory.toLowerCase();
      }

      // Search match inside the selected category
      const matchesSearch = q === '' || 
        title.toLowerCase().includes(q) || 
        desc.toLowerCase().includes(q) ||
        hs.toLowerCase().includes(q) ||
        prodSubCat.toLowerCase().includes(q);
      
      return matchesSubcategory && matchesSearch;
    });
  }, [activeTab, activeSubcategory, searchTerm, productsList]);

  // Exact Counts for master tabs
  const categoryCounts = useMemo(() => {
    const counts = {};
    categories.forEach(c => {
      counts[c.name] = 0;
    });

    (productsList || []).forEach(p => {
      if (!p) return;
      const normalized = normalizeProduct(p);
      const cat = normalized ? normalized.category : '';
      if (counts[cat] !== undefined) {
        counts[cat]++;
      }
    });
    return counts;
  }, [productsList, categories]);

  const handleTabChange = (cat) => {
    setActiveTab(cat);
    setActiveSubcategory('All');
    setSearchTerm('');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* Dynamic Hero Section */}
      <section style={{
        position: 'relative',
        color: '#FFFFFF',
        padding: '75px 0 65px',
        overflow: 'hidden',
        backgroundColor: '#1C1917'
      }}>
        {/* Background Image */}
        <img 
          src={currentMeta.bgImg} 
          alt="Category Catalogue Background" 
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 0,
            filter: 'brightness(0.95) contrast(1.05)'
          }}
        />
        {/* Ocean Maritime Radiant Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(1, 27, 71, 0.75) 0%, rgba(0, 14, 38, 0.88) 100%)',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}
          >
            {currentMeta.eyebrow && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(1, 27, 71, 0.65)',
                border: '1.5px solid rgba(255, 255, 255, 0.3)',
                color: '#FFFFFF',
                fontSize: '12.5px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                padding: '8px 24px',
                borderRadius: '100px',
                marginBottom: '20px',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)'
              }}>
                <HeaderIcon size={16} style={{ color: '#FFFFFF' }} />
                {currentMeta.eyebrow}
              </span>
            )}

            <h1 style={{
              fontFamily: 'var(--font-h, Outfit, sans-serif)',
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 900,
              lineHeight: 1.2,
              marginBottom: '18px',
              letterSpacing: '-0.5px',
              color: '#FFFFFF'
            }}>
              {currentMeta.name || currentMeta.title}
              {currentMeta.businessRole && (
                <span style={{
                  display: 'block',
                  fontSize: 'clamp(18px, 2.5vw, 24px)',
                  fontWeight: 700,
                  marginTop: '8px',
                  color: '#FFFFFF',
                  opacity: 0.95,
                  letterSpacing: '0.2px'
                }}>
                  ({currentMeta.businessRole})
                </span>
              )}
            </h1>

            <p style={{
              fontSize: '16.5px',
              color: 'rgba(255, 255, 255, 0.92)',
              lineHeight: 1.65,
              maxWidth: '740px',
              margin: '0 auto 10px',
              fontWeight: 500
            }}>
              {currentMeta.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Catalog Content */}
      <div className="container" style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
        
        {/* Search & Category Filter Controls */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: '0 20px 50px rgba(10, 34, 64, 0.08)',
          border: '1.5px solid var(--border)',
          marginBottom: '36px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {/* Search Input Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#F8FAFC',
              border: '1.5px solid var(--border)',
              borderRadius: '16px',
              padding: '12px 20px'
            }}>
              <Search size={20} style={{ color: 'var(--navy)', flexShrink: 0 }} />
              <input
                type="text"
                placeholder={`Search in ${activeTab} or all products (e.g. Turmeric, Black Pepper, Cumin, Garam Masala, Saffron...)`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  width: '100%',
                  fontSize: '15px',
                  fontWeight: 500,
                  color: 'var(--navy)'
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    border: 'none',
                    background: 'var(--gold-pale)',
                    color: 'var(--navy)',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Master Category Tabs (Indian Spices Verticals & Commodities) */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Filter size={15} style={{ color: 'var(--navy)' }} />
                <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  Select Category:
                </span>
              </div>
              <div style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}>
                {categories.map((c) => {
                  const cat = c.name;
                  const isActive = activeTab === cat;
                  const count = categoryCounts[cat] || 0;
                  const TabIcon = getCategoryIcon(c.icon);

                  return (
                    <button
                      key={c.id || cat}
                      onClick={() => handleTabChange(cat)}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '100px',
                        fontSize: '14px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        border: isActive ? '1.5px solid var(--navy)' : '1.5px solid var(--border)',
                        background: isActive ? 'var(--navy)' : '#FFFFFF',
                        color: isActive ? '#FFFFFF' : 'var(--navy)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.25s ease',
                        boxShadow: isActive ? '0 6px 18px rgba(1, 27, 71, 0.25)' : 'none'
                      }}
                    >
                      <TabIcon size={16} />
                      <span>{cat}</span>
                      <span style={{
                        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'var(--gold-pale)',
                        color: isActive ? '#FFFFFF' : 'var(--navy)',
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '100px',
                        fontWeight: 800
                      }}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subcategories Filter Pills */}
            {subcategoryPills && subcategoryPills.length > 0 && (
              <div style={{ paddingTop: '14px', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '5px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                  <Tag size={13} style={{ color: 'var(--gold-deep)' }} /> Sub-Types:
                </span>
                {subcategoryPills.map((subcat) => {
                  const isSubActive = activeSubcategory === subcat || (subcat.startsWith('All ') && activeSubcategory === 'All');
                  return (
                    <button
                      key={subcat}
                      onClick={() => setActiveSubcategory(subcat.startsWith('All ') ? 'All' : subcat)}
                      style={{
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        border: isSubActive ? '1.5px solid var(--navy)' : '1px solid #CBD5E1',
                        backgroundColor: isSubActive ? 'var(--navy)' : '#F8FAFC',
                        color: isSubActive ? '#FFFFFF' : '#475569',
                        transition: 'all 0.2s ease',
                        boxShadow: isSubActive ? '0 4px 12px rgba(0, 33, 71, 0.15)' : 'none'
                      }}
                    >
                      {subcat}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Counter Info & Reset Filter */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '26px',
          padding: '0 4px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <p style={{ fontSize: '14.5px', color: 'var(--gray)', fontWeight: 600, margin: 0 }}>
            Showing <strong style={{ color: 'var(--navy)' }}>{filteredProducts.length}</strong> products
            <span> in <strong style={{ color: 'var(--gold-deep)' }}>{activeTab}</strong></span>
            {searchTerm && <span> (Matching "<em>{searchTerm}</em>")</span>}
          </p>

          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--gold-deep)',
                fontSize: '13.5px',
                fontWeight: 800,
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '28px'
          }}
        >
          <AnimatePresence>
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id || idx}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: (idx % 6) * 0.04 }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  border: '1.5px solid var(--border)',
                  boxShadow: '0 8px 30px rgba(10, 34, 64, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                  cursor: 'pointer'
                }}
                whileHover={{ y: -6, boxShadow: '0 18px 40px rgba(200, 148, 10, 0.18)', borderColor: 'var(--gold)' }}
                onClick={() => onSelectProduct ? onSelectProduct(product) : null}
              >
                {/* Product Image — Object-Fit Contain (Uncropped) */}
                <div style={{
                  position: 'relative',
                  height: '240px',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px',
                  borderBottom: '1px solid var(--border)'
                }}>
                  <img
                    src={product.image}
                    alt={product.title}
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

                  {/* Category & Business Role Badge */}
                  <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                    <span style={{
                      backgroundColor: '#011B47',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '4px 11px',
                      borderRadius: '100px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.18)'
                    }}>
                      {product.businessType || (product.category === 'Spices & Agro Commodities' ? 'Merchant Exporter' : 'Manufacturer & Exporter')}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div style={{
                  padding: '22px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-h, Outfit, sans-serif)',
                    fontSize: '18.5px',
                    fontWeight: 800,
                    color: 'var(--navy)',
                    marginBottom: '8px',
                    lineHeight: 1.3
                  }}>
                    {product.title}
                  </h3>

                  <p style={{
                    fontSize: '13.5px',
                    color: 'var(--gray)',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                    flex: 1,
                    fontWeight: 500
                  }}>
                    {product.description || product.desc}
                  </p>

                  {/* Action Buttons */}
                  <div style={{ marginTop: 'auto' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenQuote) onOpenQuote(product.title);
                      }}
                      className="btn btn-primary"
                      style={{
                        width: '100%',
                        padding: '11px 16px',
                        fontSize: '13.5px',
                        justifyContent: 'center'
                      }}
                    >
                      <span>Request Quote</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '60px 20px',
            textAlign: 'center',
            border: '1.5px dashed var(--border)',
            marginTop: '20px'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>
              No products found in this category
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--gray)', marginBottom: '20px' }}>
              Try adjusting your search keyword or selecting another spice category tab.
            </p>
            <button
              onClick={() => { setActiveTab('Indian Spices'); setActiveSubcategory('All'); setSearchTerm(''); }}
              className="btn btn-primary"
              style={{
                padding: '10px 24px',
                fontSize: '14px'
              }}
            >
              Explore Indian Spices
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
