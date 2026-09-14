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

  const categories = useStoreCategories();

  const categoriesMenu = useMemo(() => {
    if (!categories || categories.length === 0) {
      return [
        { id: 'category-earthing-parts', categoryKey: 'Earthing Parts', title: 'Earthing Parts', icon: Zap, color: '#011B47' },
        { id: 'category-spices-agro', categoryKey: 'Spices & Agro Commodities', title: 'Spices & Agro Commodities', icon: Flame, color: '#011B47' },
        { id: 'category-hardware-items', categoryKey: 'Hardware & Sanitary Items', title: 'Hardware & Sanitary Items', icon: Wrench, color: '#011B47' }
      ];
    }
    return categories.map(cat => ({
      id: `category-${cat.id}`,
      categoryKey: cat.name,
      title: cat.name,
      badge: cat.businessRole || 'Manufacturer',
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
        <div className="container">
          <div className="jrp-header-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '88px' }}>
            
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

              {/* Product Categories Clean Dropdown */}
              <div 
                style={{ position: 'relative' }}
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

                {/* Simple, Clean & Minimal Dropdown Menu */}
                {dropdownOpen && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '230px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '14px',
                      border: '1.5px solid #E2E8F0',
                      boxShadow: '0 14px 34px rgba(0, 33, 71, 0.12)',
                      padding: '6px',
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px',
                      zIndex: 10000
                    }}
                  >
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
                            padding: '10px 14px',
                            borderRadius: '10px',
                            textDecoration: 'none',
                            color: isCurrentActive ? '#002147' : '#334155',
                            backgroundColor: isCurrentActive ? '#F1F5F9' : 'transparent',
                            fontWeight: isCurrentActive ? 800 : 600,
                            fontSize: '14.5px',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#F8FAFC';
                            e.currentTarget.style.color = item.color;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = isCurrentActive ? '#F1F5F9' : 'transparent';
                            e.currentTarget.style.color = isCurrentActive ? '#002147' : '#334155';
                          }}
                        >
                          <Icon size={17} style={{ color: item.color, flexShrink: 0 }} />
                          <span style={{ flex: 1 }}>{item.title}</span>
                        </a>
                      );
                    })}
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
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 9998,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
          onClick={() => setMobileOpen(false)}
        >
          <div 
            style={{
              width: '85%',
              maxWidth: '360px',
              backgroundColor: '#FFFFFF',
              height: '100%',
              padding: '24px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '14px' }}>
              <img src={logoImg} alt="Logo" style={{ height: '48px', objectFit: 'contain' }} />
              <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}>
                <X size={24} />
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
                  padding: '10px 12px',
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
                  padding: '10px 12px',
                  borderRadius: '10px',
                  backgroundColor: activePage === 'about' ? '#FFFBEB' : 'transparent'
                }}
              >
                About Us
              </a>

              {/* Mobile Categories Accordion */}
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '14px', overflow: 'hidden' }}>
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
                  padding: '10px 12px',
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
                  padding: '10px 12px',
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
