import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Menu, X, ArrowRight, MapPin, Mail, Phone, ChevronDown, 
  Zap, Flame, Wrench, ChevronRight, Factory, Ship,
  Layers, Tag, Award, Truck, Box, Cpu, Sun, Compass, Shield, Package, Globe, Sparkles
} from 'lucide-react';
import logoImg from '../assets/logo.png';
import { useStoreCategories } from '../utils/useStore';

const ICON_MAP = {
  Zap, Flame, Wrench, Shield, Package, Globe, Layers, Sparkles, Factory, Ship, Sun, Cpu, Box, Award, Truck, Tag, Compass
};

function getCategoryIcon(iconName) {
  if (!iconName) return Layers;
  if (typeof iconName !== 'string') return iconName;
  return ICON_MAP[iconName] || Layers;
}

export default function Navbar({ activePage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(true);
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const categories = useStoreCategories();

  const categoriesMenu = useMemo(() => {
    if (!categories || categories.length === 0) {
      return [
        { 
          id: 'category-earthing-parts', 
          categoryKey: 'Earthing Parts', 
          title: 'Earthing Parts', 
          badge: 'Manufacturer & Exporter',
          desc: 'UL 467 standard copper earth rods, brass ground clamps & earthing hardware',
          subcategories: ['Copper Earth Rods', 'Brass Clamps', 'Lightning Protection'],
          icon: Zap, 
          color: '#011B47' 
        },
        { 
          id: 'category-spices-agro', 
          categoryKey: 'Spices & Agro Commodities', 
          title: 'Spices & Agro Commodities', 
          badge: 'Merchant Exporter',
          desc: '100% Sortex cleaned Indian whole spices, ground powders & oilseeds',
          subcategories: ['Whole Spices', 'Ground Powders', 'Oilseeds & Grains'],
          icon: Flame, 
          color: '#011B47' 
        },
        { 
          id: 'category-hardware-items', 
          categoryKey: 'Hardware & Sanitary Items', 
          title: 'Hardware & Sanitary Items', 
          badge: 'Manufacturer & Exporter',
          desc: 'SS kitchen sinks, designer wash basins, mixer taps & sanitary fittings',
          subcategories: ['Kitchen Sinks', 'Wash Basins', 'Taps & Faucets'],
          icon: Wrench, 
          color: '#011B47' 
        }
      ];
    }
    return categories.map(cat => ({
      id: `category-${cat.id}`,
      categoryKey: cat.name,
      title: cat.name,
      badge: cat.businessRole || 'Manufacturer & Exporter',
      desc: cat.eyebrow || cat.desc || '',
      subcategories: Array.isArray(cat.subcategories) ? cat.subcategories.slice(0, 3) : [],
      icon: getCategoryIcon(cat.icon),
      color: '#011B47'
    }));
  }, [categories]);

  const handleNav = (id, categoryKey = null) => {
    if (onNavigate) {
      if (categoryKey) {
        onNavigate(id, categoryKey);
      } else {
        onNavigate(id);
      }
    }
    setDropdownOpen(false);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      const heroEl = document.getElementById('home') || document.querySelector('.hero-redesign-section') || document.querySelector('.hero-section') || document.querySelector('.jrp-hero');
      if (heroEl && id === 'home') {
        heroEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (onNavigate) onNavigate('home');
    setDropdownOpen(false);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      const heroEl = document.getElementById('home') || document.querySelector('.hero-redesign-section') || document.querySelector('.hero-section') || document.querySelector('.jrp-hero');
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  const isCategoryActive = activePage === 'products' || 
    activePage.startsWith('category-') || 
    activePage === 'products-indian-spices' ||
    activePage === 'products-agro-commodities' ||
    activePage === 'products-machinery' ||
    activePage === 'products-pipes';

  return (
    <>
      <header className="jrp-header" style={{ position: 'sticky', top: 0, zIndex: 9999, background: '#FFFFFF', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        <div className="container" style={{ position: 'relative' }}>
          <div className="jrp-header-inner" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '88px' }}>
            
            {/* Logo */}
            <a href="#" onClick={handleLogoClick} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', cursor: 'pointer' }} title="Marvex International — Go to Home">
              <img 
                src={logoImg} 
                alt="Marvex International" 
                className="jrp-header-logo-img" 
                style={{ 
                  height: '62px', 
                  maxHeight: '64px',
                  width: 'auto', 
                  objectFit: 'contain',
                  filter: 'contrast(1.05)',
                  display: 'block'
                }} 
              />
            </a>

            {/* Desktop Navigation Menu */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="d-none-mobile">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handleNav('home'); }}
                style={{ fontWeight: 700, fontSize: '17px', color: activePage === 'home' ? 'var(--gold)' : 'var(--navy)', textDecoration: 'none', transition: 'color 0.2s' }}
              >
                Home
              </a>

              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handleNav('about'); }}
                style={{ fontWeight: 700, fontSize: '17px', color: activePage === 'about' ? 'var(--gold)' : 'var(--navy)', textDecoration: 'none', transition: 'color 0.2s' }}
              >
                About Us
              </a>

              {/* Product Categories Modern Mega-Grid Dropdown */}
              <div 
                style={{ position: 'static' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={(e) => { 
                    e.preventDefault(); 
                    handleNav('products'); 
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '17px',
                    color: isCategoryActive ? 'var(--gold)' : 'var(--navy)',
                    padding: '16px 0',
                    transition: 'color 0.2s'
                  }}
                  aria-expanded={dropdownOpen}
                >
                  <span>Product Categories</span>
                  <ChevronDown 
                    size={16} 
                    style={{ 
                      transition: 'transform 0.25s ease', 
                      transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      color: isCategoryActive ? 'var(--gold)' : 'var(--navy)'
                    }} 
                  />
                </button>

                {/* Rich Multi-Column Mega Grid Dropdown Menu - Perfectly Centered in Header */}
                {dropdownOpen && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '84px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: categoriesMenu.length >= 6 ? '920px' : (categoriesMenu.length >= 2 ? '680px' : '360px'),
                      maxWidth: 'calc(100% - 16px)',
                      maxHeight: 'calc(85vh - 90px)',
                      overflowY: 'auto',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '20px',
                      border: '1.5px solid #E2E8F0',
                      boxShadow: '0 25px 60px rgba(1, 27, 71, 0.18), 0 4px 16px rgba(0,0,0,0.06)',
                      padding: '16px',
                      boxSizing: 'border-box',
                      zIndex: 10000
                    }}
                  >
                    {/* Header Header Info */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', marginBottom: '10px', borderBottom: '1px solid #F1F5F9' }}>
                      <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                        Product Verticals ({categoriesMenu.length})
                      </span>
                      <span style={{ fontSize: '11px', color: '#059669', fontWeight: 700, background: '#ECFDF5', padding: '2px 8px', borderRadius: '4px' }}>
                        Export Standard Compliant
                      </span>
                    </div>

                    {/* Responsive Multi-Column Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: categoriesMenu.length >= 6 ? 'repeat(3, 1fr)' : (categoriesMenu.length >= 2 ? 'repeat(2, 1fr)' : '1fr'),
                      gap: '8px'
                    }}>
                      {categoriesMenu.map((item) => {
                        const Icon = item.icon;
                        const isCurrentActive = activePage === item.id;
                        return (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNav(item.id, item.categoryKey);
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              padding: '10px 12px',
                              borderRadius: '12px',
                              textDecoration: 'none',
                              color: isCurrentActive ? '#011B47' : '#334155',
                              backgroundColor: isCurrentActive ? '#F1F5F9' : '#FFFFFF',
                              border: isCurrentActive ? '1.5px solid #011B47' : '1px solid #E2E8F0',
                              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                              cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#F8FAFC';
                              e.currentTarget.style.borderColor = '#011B47';
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.boxShadow = '0 6px 14px rgba(1, 27, 71, 0.08)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = isCurrentActive ? '#F1F5F9' : '#FFFFFF';
                              e.currentTarget.style.borderColor = isCurrentActive ? '#011B47' : '#E2E8F0';
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          >
                            <div style={{
                              width: '34px',
                              height: '34px',
                              borderRadius: '8px',
                              background: '#011B47',
                              color: '#FACC15',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              <Icon size={17} />
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                                <span style={{
                                  fontWeight: 800,
                                  fontSize: '13.5px',
                                  color: '#011B47',
                                  lineHeight: 1.25,
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}>
                                  {item.title}
                                </span>
                                <ChevronRight size={13} style={{ color: '#94A3B8', flexShrink: 0 }} />
                              </div>

                              {item.badge && (
                                <span style={{
                                  display: 'inline-block',
                                  fontSize: '10px',
                                  fontWeight: 700,
                                  color: item.badge.includes('Merchant') ? '#B45309' : '#047857',
                                  background: item.badge.includes('Merchant') ? '#FEF3C7' : '#ECFDF5',
                                  padding: '1px 5px',
                                  borderRadius: '3px',
                                  marginTop: '2px'
                                }}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          </a>
                        );
                      })}
                    </div>

                    {/* Bottom Action Footer Bar */}
                    <div style={{
                      marginTop: '12px',
                      padding: '10px 14px',
                      background: '#F8FAFC',
                      borderRadius: '10px',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 600 }}>
                        ISO 9001, UL 467 & APEDA Certified Export Supply
                      </span>
                      <a
                        href="#products"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNav('products');
                        }}
                        style={{
                          fontSize: '13px',
                          fontWeight: 800,
                          color: '#011B47',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>View All Products</span>
                        <ArrowRight size={13} style={{ color: 'var(--gold)' }} />
                      </a>
                    </div>

                  </div>
                )}
              </div>

              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handleNav('blog'); }}
                style={{ fontWeight: 700, fontSize: '17px', color: activePage === 'blog' ? 'var(--gold)' : 'var(--navy)', textDecoration: 'none', transition: 'color 0.2s' }}
              >
                Blogs
              </a>

              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handleNav('contact'); }}
                style={{ fontWeight: 700, fontSize: '17px', color: activePage === 'contact' ? 'var(--gold)' : 'var(--navy)', textDecoration: 'none', transition: 'color 0.2s' }}
              >
                Contact Us
              </a>
            </nav>

            {/* Header Right Action CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={() => handleNav('contact')}
                className="btn btn-primary d-none-mobile"
                style={{
                  padding: '12px 24px',
                  borderRadius: '100px',
                  fontWeight: 800,
                  fontSize: '14.5px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>Request Quotation</span>
                <ArrowRight size={15} />
              </button>

              {/* Mobile Hamburger Toggle Button (Hidden on PC/Desktop) */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="mobile-hamburger-btn"
                style={{
                  background: 'none',
                  border: '1.5px solid var(--border)',
                  borderRadius: '12px',
                  padding: '10px',
                  color: 'var(--navy)',
                  cursor: 'pointer',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label="Toggle Navigation Menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      {mobileOpen && (
        <div 
          className="jrp-offcanvas-overlay"
          onClick={() => setMobileOpen(false)}
        >
          <div 
            className="jrp-offcanvas"
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '16px', marginBottom: '8px' }}>
              <img src={logoImg} alt="Marvex International" style={{ height: '42px', objectFit: 'contain' }} />
              <button 
                onClick={() => setMobileOpen(false)} 
                style={{ 
                  background: '#F1F5F9', 
                  border: 'none', 
                  color: '#1E293B', 
                  cursor: 'pointer',
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s'
                }}
                aria-label="Close Navigation"
              >
                <X size={22} />
              </button>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handleNav('home'); }}
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: activePage === 'home' ? 'var(--gold-deep)' : 'var(--navy)',
                  textDecoration: 'none',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: activePage === 'home' ? '#FFFBEB' : 'transparent'
                }}
              >
                Home
              </a>

              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handleNav('about'); }}
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: activePage === 'about' ? 'var(--gold-deep)' : 'var(--navy)',
                  textDecoration: 'none',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: activePage === 'about' ? '#FFFBEB' : 'transparent'
                }}
              >
                About Us
              </a>

              {/* Mobile Categories Accordion */}
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
                <div 
                  onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)} 
                  style={{ 
                    padding: '12px 14px', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    cursor: 'pointer', 
                    backgroundColor: '#F8FAFC',
                    fontWeight: 800,
                    fontSize: '15px',
                    color: 'var(--navy)'
                  }}
                >
                  <span>Product Categories</span>
                  <ChevronDown size={16} style={{ transform: mobileCategoriesOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                </div>

                {mobileCategoriesOpen && (
                  <div style={{ padding: '6px', display: 'flex', flexDirection: 'column', gap: '2px', backgroundColor: '#FFFFFF' }}>
                    {categoriesMenu.map(item => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNav(item.id, item.categoryKey);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 12px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            color: '#334155',
                            fontSize: '14px',
                            fontWeight: 700
                          }}
                        >
                          <Icon size={16} style={{ color: item.color }} />
                          <span>{item.title}</span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handleNav('blog'); }}
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: activePage === 'blog' ? 'var(--gold-deep)' : 'var(--navy)',
                  textDecoration: 'none',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: activePage === 'blog' ? '#FFFBEB' : 'transparent'
                }}
              >
                Blogs
              </a>

              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handleNav('contact'); }}
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: activePage === 'contact' ? 'var(--gold-deep)' : 'var(--navy)',
                  textDecoration: 'none',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: activePage === 'contact' ? '#FFFBEB' : 'transparent'
                }}
              >
                Contact Us
              </a>
            </nav>

            <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
              <button
                onClick={() => handleNav('contact')}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
              >
                <span>Request Quotation</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
