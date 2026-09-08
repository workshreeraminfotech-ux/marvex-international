import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Package, Mail, FileText, 
  LogOut, Plus, Search, Trash2, Edit3, CheckCircle2, 
  ExternalLink, Download, Upload, RefreshCw, Eye, 
  Phone, MessageSquare, Zap, Flame, Wrench, Shield,
  Globe, AlertCircle, Sparkles, Filter, X, ArrowRight,
  Cloud, Wifi, Check, Copy
} from 'lucide-react';
import { 
  getProducts, saveProduct, deleteProduct, resetProductsToDefault,
  getEnquiries, updateEnquiryStatus, deleteEnquiry,
  getBlogs, saveBlog, deleteBlog,
  checkAdminAuth, adminLogin, adminLogout
} from '../utils/adminStore';
import { 
  isFirebaseConfigured, 
  getActiveFirebaseConfig, 
  saveCustomFirebaseConfig, 
  clearCustomFirebaseConfig 
} from '../firebase/config';
import { seedInitialDataToFirestore } from '../firebase/firestoreSync';
import { useStoreProducts, useStoreEnquiries, useStoreBlogs } from '../utils/useStore';
import logoImg from '../assets/logo.png';

const CATEGORIES = [
  'Earthing Parts',
  'Spices & Agro Commodities',
  'Hardware & Sanitary Items'
];

const SUBCATEGORY_PRESETS = {
  'Earthing Parts': ['Earth Rods & Conductors', 'Earth Clamps & Couplers', 'Chemical Electrodes & Compounds', 'Lightning Protection'],
  'Spices & Agro Commodities': ['Seed Spices', 'Whole Spices', 'Ground Spices', 'Oilseeds & Grains'],
  'Hardware & Sanitary Items': ['Kitchen Sinks', 'Wash Basins & Ceramics', 'Taps & Faucets', 'Showers & Bath Sets', 'Sanitary Fittings & Accessories']
};

export default function AdminPage({ onNavigate }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => checkAdminAuth());
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'products' | 'inquiries' | 'blogs'

  // Dynamic Store Data
  const products = useStoreProducts();
  const inquiries = useStoreEnquiries();
  const blogs = useStoreBlogs();

  // Products Filter & Search
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [productSearch, setProductSearch] = useState('');

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    id: '',
    title: '',
    category: 'Earthing Parts',
    subcategory: 'Earth Rods & Conductors',
    businessType: 'Manufacturer & Exporter',
    hsCode: '',
    origin: 'Gujarat, India',
    packaging: '',
    specs: '',
    description: '',
    image: '',
    isFeatured: false
  });

  // Inquiry Filter & Search
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('All');
  const [inquirySearch, setInquirySearch] = useState('');

  // Blog Modal State
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [blogForm, setBlogForm] = useState({
    id: '',
    title: '',
    category: 'Global Trade',
    author: 'Marvex Export Desk',
    readTime: '4 min read',
    image: '',
    excerpt: '',
    content: ''
  });

  // Firebase Cloud Modal State
  const [isFirebaseModalOpen, setIsFirebaseModalOpen] = useState(false);
  const fbConnected = isFirebaseConfigured();
  const [fbConfigText, setFbConfigText] = useState(() => {
    const cfg = getActiveFirebaseConfig();
    return cfg ? JSON.stringify(cfg, null, 2) : '';
  });
  const [isPushingCloud, setIsPushingCloud] = useState(false);

  // Success Notification banner
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const res = adminLogin(loginPass, rememberMe);
    if (res.success) {
      setIsAuthenticated(true);
      showToast('Welcome to Marvex International Admin Portal');
    } else {
      setLoginError(res.error || 'Invalid passcode');
    }
  };

  // Logout handler
  const handleLogout = () => {
    adminLogout();
    setIsAuthenticated(false);
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return (products || []).filter(p => {
      const matchCat = productCategoryFilter === 'All' || p.category === productCategoryFilter;
      const q = productSearch.trim().toLowerCase();
      const matchSearch = !q || 
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.hsCode && p.hsCode.toLowerCase().includes(q)) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [products, productCategoryFilter, productSearch]);

  // Filtered Inquiries
  const filteredInquiries = useMemo(() => {
    return (inquiries || []).filter(item => {
      const matchStatus = inquiryStatusFilter === 'All' || item.status === inquiryStatusFilter;
      const q = inquirySearch.trim().toLowerCase();
      const matchSearch = !q || 
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.email && item.email.toLowerCase().includes(q)) ||
        (item.product && item.product.toLowerCase().includes(q)) ||
        (item.country && item.country.toLowerCase().includes(q));
      return matchStatus && matchSearch;
    });
  }, [inquiries, inquiryStatusFilter, inquirySearch]);

  // Image file upload handler
  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Please select an image smaller than 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setProductForm(prev => ({ ...prev, image: uploadEvent.target.result }));
    };
    reader.readAsDataURL(file);
  };

  // Open Add Product Modal
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      id: '',
      title: '',
      category: 'Earthing Parts',
      subcategory: 'Earth Rods & Conductors',
      businessType: 'Manufacturer & Exporter',
      origin: 'Gujarat, India',
      description: '',
      image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80',
      isFeatured: false
    });
    setIsProductModalOpen(true);
  };

  // Open Edit Product Modal
  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      id: prod.id,
      title: prod.title || '',
      category: prod.category || 'Earthing Parts',
      subcategory: prod.subcategory || '',
      businessType: prod.businessType || (prod.category === 'Spices & Agro Commodities' ? 'Merchant Exporter' : 'Manufacturer & Exporter'),
      origin: prod.origin || 'Gujarat, India',
      description: prod.description || prod.desc || '',
      image: prod.image || '',
      isFeatured: Boolean(prod.isFeatured)
    });
    setIsProductModalOpen(true);
  };

  // Save Product
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.title.trim()) return;

    const payload = {
      ...productForm,
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`
    };

    const ok = saveProduct(payload);
    if (ok) {
      setIsProductModalOpen(false);
      showToast(editingProduct ? 'Product updated successfully!' : 'New product published successfully!');
    }
  };

  // Delete Product
  const handleDeleteProduct = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProduct(id);
      showToast(`Product "${title}" deleted.`);
    }
  };

  // Export Inquiries to CSV
  const handleExportInquiriesCSV = () => {
    if (!inquiries || inquiries.length === 0) {
      alert('No inquiries to export.');
      return;
    }
    const headers = ['Date', 'Buyer Name', 'Email', 'Phone', 'Country', 'Required Product', 'Quantity', 'Port', 'Status', 'Message'];
    const rows = inquiries.map(i => [
      `"${new Date(i.createdAt).toLocaleString()}"`,
      `"${i.name || ''}"`,
      `"${i.email || ''}"`,
      `"${i.phone || ''}"`,
      `"${i.country || ''}"`,
      `"${i.product || ''}"`,
      `"${i.quantity || ''}"`,
      `"${i.destinationPort || ''}"`,
      `"${i.status || 'New'}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `marvex_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Inquiries exported to CSV successfully!');
  };



  // Reset to Factory Default
  const handleResetToDefault = () => {
    if (window.confirm('⚠️ Reset all products to default catalog? Any custom products added will be removed.')) {
      resetProductsToDefault();
      showToast('Catalog reset to default specifications.');
    }
  };

  // =========================================================================
  // 1. LOGIN SCREEN (If not authenticated)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #07172C 0%, #011B47 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            width: '100%',
            maxWidth: '440px',
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '40px 32px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
            border: '1.5px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Logo & Header */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <img 
              src={logoImg} 
              alt="Marvex International" 
              style={{ height: '54px', margin: '0 auto 16px', objectFit: 'contain' }} 
            />
            <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#011B47', marginBottom: '6px' }}>
              Admin Management Portal
            </h1>
            <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>
              Authorized executive access for Marvex International
            </p>
          </div>

          {loginError && (
            <div style={{
              background: '#FEE2E2',
              color: '#991B1B',
              padding: '10px 16px',
              borderRadius: '12px',
              fontSize: '13.5px',
              fontWeight: 600,
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <AlertCircle size={16} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Master Admin Passcode
              </label>
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter admin passcode"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: '1.5px solid #CBD5E1',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#011B47'}
                onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#475569', cursor: 'pointer', fontWeight: 600 }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Stay logged in on this browser</span>
              </label>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                background: '#011B47',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 8px 20px rgba(1, 27, 71, 0.3)',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span>Access Admin Dashboard</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #E2E8F0', textAlign: 'center' }}>
            <button
              onClick={() => onNavigate && onNavigate('home')}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748B',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              ← Return to Public Website
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // =========================================================================
  // 2. MAIN ADMIN DASHBOARD (When authenticated)
  // =========================================================================
  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', display: 'flex', flexDirection: 'column' }}>
      
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: 99999,
              background: '#011B47',
              color: '#FFFFFF',
              padding: '14px 24px',
              borderRadius: '14px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '14px',
              fontWeight: 700,
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            <CheckCircle2 size={18} style={{ color: '#FACC15' }} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Admin Navigation Bar */}
      <header style={{
        background: '#011B47',
        color: '#FFFFFF',
        padding: '0 24px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: '#FFFFFF', padding: '6px 14px', borderRadius: '10px', display: 'flex', alignItems: 'center' }}>
            <img src={logoImg} alt="Logo" style={{ height: '36px', objectFit: 'contain' }} />
          </div>
          <span style={{ fontSize: '14px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Shield size={16} style={{ color: '#FACC15' }} /> Management Console
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Firebase Realtime Connection Badge */}
          <button
            onClick={() => setIsFirebaseModalOpen(true)}
            style={{
              background: fbConnected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.18)',
              border: fbConnected ? '1px solid #10B981' : '1px solid #F59E0B',
              color: fbConnected ? '#34D399' : '#FBBF24',
              padding: '7px 14px',
              borderRadius: '8px',
              fontSize: '12.5px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
            title="Click to view Firebase Realtime cloud sync setup"
          >
            {fbConnected ? (
              <>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 8px #10B981' }}></span>
                <Cloud size={14} />
                <span>Cloud Live Synced</span>
              </>
            ) : (
              <>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }}></span>
                <Wifi size={14} />
                <span>Connect Firebase</span>
              </>
            )}
          </button>

          <button
            onClick={() => onNavigate && onNavigate('home')}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#FFFFFF',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            <ExternalLink size={14} />
            <span>View Live Website</span>
          </button>

          <button
            onClick={handleLogout}
            style={{
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#FCA5A5',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.35)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace with Sidebar */}
      <div style={{ display: 'flex', flex: 1 }}>
        
        {/* Sidebar Navigation */}
        <aside style={{
          width: '240px',
          background: '#07172C',
          padding: '24px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          borderRight: '1px solid #1E293B'
        }}>
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { id: 'products', label: 'Products Manager', icon: Package, count: products.length },
            { id: 'inquiries', label: 'Inquiries & RFQs', icon: Mail, count: inquiries.filter(i => i.status === 'New').length, badgeColor: '#EF4444' },
            { id: 'blogs', label: 'Blog Posts', icon: FileText, count: blogs.length }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: isActive ? '#011B47' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  fontSize: '14px',
                  fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={(e) => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseOut={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
              >
                <Icon size={18} style={{ color: isActive ? '#FACC15' : '#64748B' }} />
                <span style={{ flex: 1 }}>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span style={{
                    background: tab.badgeColor || '#334155',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '100px'
                  }}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Viewport */}
        <main style={{ flex: 1, padding: '32px 36px', overflowY: 'auto' }}>
          
          {/* =============================================================== */}
          {/* 2.1 OVERVIEW TAB */}
          {/* =============================================================== */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ marginBottom: '28px' }}>
                <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#011B47', marginBottom: '6px' }}>
                  Executive Overview
                </h2>
                <p style={{ fontSize: '14.5px', color: '#64748B', margin: 0 }}>
                  Real-time catalog analytics and export lead inbox
                </p>
              </div>

              {/* 4 Key Stat Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '36px' }}>
                
                <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '18px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Total Products</span>
                    <Package size={20} style={{ color: '#011B47' }} />
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: 900, color: '#011B47', lineHeight: 1 }}>
                    {products.length}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#10B981', fontWeight: 700, marginTop: '8px' }}>
                    3 Core Business Verticals
                  </div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '18px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Earthing Parts (Mfg)</span>
                    <Zap size={20} style={{ color: '#011B47' }} />
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: 900, color: '#011B47', lineHeight: 1 }}>
                    {products.filter(p => p.category === 'Earthing Parts').length}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '8px' }}>
                    UL & IEC Grounding Rods
                  </div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '18px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Spices & Agro (Merchant)</span>
                    <Flame size={20} style={{ color: '#011B47' }} />
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: 900, color: '#011B47', lineHeight: 1 }}>
                    {products.filter(p => p.category === 'Spices & Agro Commodities').length}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '8px' }}>
                    100% Sortex Pure Spices
                  </div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '18px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Hardware & Sanitary (Mfg)</span>
                    <Wrench size={20} style={{ color: '#011B47' }} />
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: 900, color: '#011B47', lineHeight: 1 }}>
                    {products.filter(p => p.category === 'Hardware & Sanitary Items').length}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '8px' }}>
                    Sinks, Basins, Taps, Showers
                  </div>
                </div>

              </div>

              {/* Quick Actions Strip */}
              <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '18px', border: '1px solid #E2E8F0', marginBottom: '36px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#011B47', marginBottom: '16px' }}>
                  Quick Management Actions
                </h3>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => { setActiveTab('products'); handleOpenAddProduct(); }}
                    style={{
                      padding: '12px 22px',
                      background: '#011B47',
                      color: '#FFFFFF',
                      borderRadius: '10px',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Plus size={16} />
                    <span>Add New Product</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('inquiries')}
                    style={{
                      padding: '12px 22px',
                      background: '#F8FAFC',
                      color: '#011B47',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Mail size={16} />
                    <span>View Client Inquiries ({inquiries.length})</span>
                  </button>
                </div>
              </div>

              {/* Recent Inquiries Snippet */}
              <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#011B47', margin: 0 }}>
                    Recent Buyer Inquiries & Quotes
                  </h3>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    style={{ background: 'none', border: 'none', color: '#011B47', fontWeight: 800, fontSize: '13px', cursor: 'pointer' }}
                  >
                    View All →
                  </button>
                </div>

                {inquiries.length === 0 ? (
                  <p style={{ fontSize: '14px', color: '#94A3B8', margin: 0, padding: '20px 0', textAlign: 'center' }}>
                    No client inquiries recorded yet. Inquiries sent from QuoteModal and Contact form will automatically appear here.
                  </p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1.5px solid #E2E8F0', textAlign: 'left', color: '#64748B' }}>
                          <th style={{ padding: '10px 12px' }}>Date</th>
                          <th style={{ padding: '10px 12px' }}>Buyer Name</th>
                          <th style={{ padding: '10px 12px' }}>Required Commodity</th>
                          <th style={{ padding: '10px 12px' }}>Target Quantity</th>
                          <th style={{ padding: '10px 12px' }}>Status</th>
                          <th style={{ padding: '10px 12px' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inquiries.slice(0, 5).map(item => (
                          <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                            <td style={{ padding: '12px', color: '#64748B' }}>{new Date(item.createdAt).toLocaleDateString()}</td>
                            <td style={{ padding: '12px', fontWeight: 700, color: '#011B47' }}>{item.name}</td>
                            <td style={{ padding: '12px', color: '#1E293B' }}>{item.product}</td>
                            <td style={{ padding: '12px', color: '#64748B' }}>{item.quantity}</td>
                            <td style={{ padding: '12px' }}>
                              <span style={{
                                padding: '4px 10px',
                                borderRadius: '100px',
                                fontSize: '11.5px',
                                fontWeight: 800,
                                background: item.status === 'New' ? '#FEE2E2' : '#DEF7EC',
                                color: item.status === 'New' ? '#991B1B' : '#03543F'
                              }}>
                                {item.status}
                              </span>
                            </td>
                            <td style={{ padding: '12px' }}>
                              <button
                                onClick={() => setActiveTab('inquiries')}
                                style={{ background: '#F1F5F9', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', color: '#011B47' }}
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* =============================================================== */}
          {/* 2.2 PRODUCTS MANAGER TAB */}
          {/* =============================================================== */}
          {activeTab === 'products' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#011B47', margin: 0 }}>
                    Product Catalog Management
                  </h2>
                  <p style={{ fontSize: '14px', color: '#64748B', margin: '4px 0 0' }}>
                    Add, edit, and organize specifications for all 3 business verticals
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={handleOpenAddProduct}
                    style={{
                      padding: '12px 22px',
                      background: '#011B47',
                      color: '#FFFFFF',
                      borderRadius: '10px',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Plus size={16} />
                    <span>Add New Product</span>
                  </button>

                  <button
                    onClick={handleResetToDefault}
                    title="Reset to original default catalog"
                    style={{
                      padding: '12px 16px',
                      background: '#FFFFFF',
                      color: '#64748B',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <RefreshCw size={14} />
                    <span>Reset Defaults</span>
                  </button>
                </div>
              </div>

              {/* Filters & Search Toolbar */}
              <div style={{ background: '#FFFFFF', padding: '18px 24px', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                {/* Search */}
                <div style={{ flex: 1, minWidth: '240px', display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFC', border: '1.5px solid #E2E8F0', padding: '10px 16px', borderRadius: '10px' }}>
                  <Search size={16} style={{ color: '#64748B' }} />
                  <input
                    type="text"
                    placeholder="Search by title, HS code, or subcategory..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '14px' }}
                  />
                  {productSearch && (
                    <button onClick={() => setProductSearch('')} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94A3B8' }}>✕</button>
                  )}
                </div>

                {/* Vertical Category Filter Pills */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['All', ...CATEGORIES].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setProductCategoryFilter(cat)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '100px',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        border: productCategoryFilter === cat ? '1.5px solid #011B47' : '1px solid #CBD5E1',
                        background: productCategoryFilter === cat ? '#011B47' : '#FFFFFF',
                        color: productCategoryFilter === cat ? '#FFFFFF' : '#475569',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products Table */}
              <div style={{ background: '#FFFFFF', borderRadius: '18px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '1.5px solid #E2E8F0', textAlign: 'left', color: '#64748B' }}>
                      <th style={{ padding: '14px 18px', width: '70px' }}>Image</th>
                      <th style={{ padding: '14px 18px' }}>Product Title</th>
                      <th style={{ padding: '14px 18px' }}>Category & Role</th>
                      <th style={{ padding: '14px 18px' }}>Subcategory / HS Code</th>
                      <th style={{ padding: '14px 18px' }}>Origin</th>
                      <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(prod => (
                      <tr key={prod.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '12px 18px' }}>
                          <img 
                            src={prod.image} 
                            alt={prod.title} 
                            style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'contain', border: '1px solid #E2E8F0', background: '#FFFFFF' }} 
                          />
                        </td>
                        <td style={{ padding: '12px 18px', fontWeight: 800, color: '#011B47' }}>
                          <div>{prod.title}</div>
                          {prod.isFeatured && (
                            <span style={{ fontSize: '11px', color: '#D97706', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                              ★ Featured
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '12px 18px' }}>
                          <div style={{ fontWeight: 700, color: '#1E293B' }}>{prod.category}</div>
                          <span style={{ fontSize: '11.5px', background: '#F1F5F9', color: '#011B47', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                            {prod.businessType}
                          </span>
                        </td>
                        <td style={{ padding: '12px 18px', color: '#64748B' }}>
                          <div>{prod.subcategory}</div>
                          <div style={{ fontSize: '12px', fontFamily: 'monospace' }}>{prod.hsCode || '—'}</div>
                        </td>
                        <td style={{ padding: '12px 18px', color: '#64748B', fontSize: '12.5px' }}>
                          {prod.origin}
                        </td>
                        <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '8px' }}>
                            <button
                              onClick={() => handleOpenEditProduct(prod)}
                              style={{ padding: '6px 12px', background: '#F1F5F9', color: '#011B47', border: 'none', borderRadius: '6px', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                            >
                              <Edit3 size={13} />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id, prod.title)}
                              style={{ padding: '6px 10px', background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '6px', fontSize: '12.5px', cursor: 'pointer' }}
                              title="Delete Product"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* 2.3 INQUIRIES & RFQs TAB */}
          {/* =============================================================== */}
          {activeTab === 'inquiries' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#011B47', margin: 0 }}>
                    Client Quotes & RFQ Inquiries
                  </h2>
                  <p style={{ fontSize: '14px', color: '#64748B', margin: '4px 0 0' }}>
                    Leads and quotation requests submitted from public website
                  </p>
                </div>

                <button
                  onClick={handleExportInquiriesCSV}
                  style={{
                    padding: '12px 20px',
                    background: '#011B47',
                    color: '#FFFFFF',
                    borderRadius: '10px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Download size={16} />
                  <span>Export to CSV</span>
                </button>
              </div>

              {/* Status Filter Tabs */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                {['All', 'New', 'In Progress', 'Closed'].map(status => (
                  <button
                    key={status}
                    onClick={() => setInquiryStatusFilter(status)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '100px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: inquiryStatusFilter === status ? '1.5px solid #011B47' : '1px solid #CBD5E1',
                      background: inquiryStatusFilter === status ? '#011B47' : '#FFFFFF',
                      color: inquiryStatusFilter === status ? '#FFFFFF' : '#475569'
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {filteredInquiries.length === 0 ? (
                <div style={{ background: '#FFFFFF', padding: '60px 20px', borderRadius: '18px', textAlign: 'center', border: '1.5px dashed #CBD5E1' }}>
                  <Mail size={36} style={{ color: '#94A3B8', margin: '0 auto 12px' }} />
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#011B47', marginBottom: '6px' }}>No inquiries matching this filter</h3>
                  <p style={{ fontSize: '13.5px', color: '#64748B' }}>When buyers submit quotes on the website, they will appear here instantly.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {filteredInquiries.map(item => (
                    <div key={item.id} style={{ background: '#FFFFFF', borderRadius: '16px', padding: '22px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#011B47', margin: 0 }}>
                              {item.name}
                            </h3>
                            <span style={{
                              padding: '3px 10px',
                              borderRadius: '100px',
                              fontSize: '11px',
                              fontWeight: 800,
                              background: item.status === 'New' ? '#FEE2E2' : item.status === 'In Progress' ? '#FEF3C7' : '#DEF7EC',
                              color: item.status === 'New' ? '#991B1B' : item.status === 'In Progress' ? '#92400E' : '#03543F'
                            }}>
                              {item.status}
                            </span>
                          </div>
                          <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '3px' }}>
                            Received on {new Date(item.createdAt).toLocaleString()} • Source: {item.source}
                          </div>
                        </div>

                        {/* Status update controls */}
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <select
                            value={item.status}
                            onChange={(e) => updateEnquiryStatus(item.id, e.target.value)}
                            style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12.5px', fontWeight: 700 }}
                          >
                            <option value="New">Mark: New</option>
                            <option value="In Progress">Mark: In Progress</option>
                            <option value="Closed">Mark: Closed</option>
                          </select>

                          <button
                            onClick={() => deleteEnquiry(item.id)}
                            style={{ padding: '6px 10px', background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                            title="Delete Inquiry"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Inquiry Details Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', background: '#F8FAFC', padding: '16px', borderRadius: '12px', marginBottom: '14px' }}>
                        <div>
                          <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Required Commodity</span>
                          <div style={{ fontSize: '14px', fontWeight: 800, color: '#011B47' }}>{item.product}</div>
                        </div>
                        <div>
                          <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Quantity / Volume</span>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B' }}>{item.quantity}</div>
                        </div>
                        <div>
                          <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Email</span>
                          <div style={{ fontSize: '13.5px', color: '#011B47' }}>{item.email || '—'}</div>
                        </div>
                        <div>
                          <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Phone / WhatsApp</span>
                          <div style={{ fontSize: '13.5px', color: '#011B47' }}>{item.phone || '—'}</div>
                        </div>
                      </div>

                      {item.message && (
                        <div style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.5, background: '#FFFFFF', padding: '12px', border: '1px solid #E2E8F0', borderRadius: '8px', marginBottom: '14px' }}>
                          <strong>Message:</strong> {item.message}
                        </div>
                      )}

                      {/* Direct Reply Actions */}
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {item.phone && (
                          <a
                            href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(item.name)},%20thank%20you%20for%20contacting%20Marvex%20International%20regarding%20${encodeURIComponent(item.product)}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '8px 16px',
                              background: '#25D366',
                              color: '#FFFFFF',
                              borderRadius: '8px',
                              fontSize: '12.5px',
                              fontWeight: 700,
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <MessageSquare size={14} />
                            <span>Reply via WhatsApp</span>
                          </a>
                        )}

                        {item.email && (
                          <a
                            href={`mailto:${item.email}?subject=Quotation%20for%20${encodeURIComponent(item.product)}%20-%20Marvex%20International`}
                            style={{
                              padding: '8px 16px',
                              background: '#011B47',
                              color: '#FFFFFF',
                              borderRadius: '8px',
                              fontSize: '12.5px',
                              fontWeight: 700,
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <Mail size={14} />
                            <span>Send Email Quote</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* =============================================================== */}
          {/* 2.4 BLOGS TAB */}
          {/* =============================================================== */}
          {activeTab === 'blogs' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#011B47', margin: 0 }}>
                    Blog & Export Articles
                  </h2>
                  <p style={{ fontSize: '14px', color: '#64748B', margin: '4px 0 0' }}>
                    Publish market updates and engineering guides
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {blogs.map(blog => (
                  <div key={blog.id} style={{ background: '#FFFFFF', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                    <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                    <div style={{ padding: '18px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, background: '#F1F5F9', color: '#011B47', padding: '3px 8px', borderRadius: '4px' }}>
                        {blog.category}
                      </span>
                      <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#011B47', margin: '8px 0', lineHeight: 1.3 }}>
                        {blog.title}
                      </h3>
                      <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, marginBottom: '14px' }}>
                        {blog.excerpt}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '12px' }}>
                        <span style={{ fontSize: '12px', color: '#94A3B8' }}>{blog.date}</span>
                        <button
                          onClick={() => deleteBlog(blog.id)}
                          style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}



        </main>
      </div>

      {/* ===================================================================== */}
      {/* 3. ADD / EDIT PRODUCT MODAL */}
      {/* ===================================================================== */}
      {isProductModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backdropFilter: 'blur(4px)'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              width: '100%',
              maxWidth: '680px',
              maxHeight: '90vh',
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              overflowY: 'auto',
              border: '1.5px solid #E2E8F0'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #E2E8F0', paddingBottom: '14px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#011B47', margin: 0 }}>
                {editingProduct ? 'Edit Product Item' : 'Add New Product to Catalog'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Title */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Copper Bonded Earth Rods (UL Listed) or SS 304 Kitchen Sink"
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              {/* Category & Business Role */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>
                    Category Vertical *
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => {
                      const cat = e.target.value;
                      const defaultRole = cat === 'Spices & Agro Commodities' ? 'Merchant Exporter' : 'Manufacturer & Exporter';
                      const defaultSub = SUBCATEGORY_PRESETS[cat] ? SUBCATEGORY_PRESETS[cat][0] : 'General';
                      setProductForm({ ...productForm, category: cat, businessType: defaultRole, subcategory: defaultSub });
                    }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>
                    Business Role Badge *
                  </label>
                  <select
                    value={productForm.businessType}
                    onChange={(e) => setProductForm({ ...productForm, businessType: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                  >
                    <option value="Manufacturer & Exporter">Manufacturer & Exporter</option>
                    <option value="Merchant Exporter">Merchant Exporter</option>
                  </select>
                </div>
              </div>

              {/* Subcategory & Origin */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>
                    Subcategory
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kitchen Sinks, Earth Rods, Whole Spices"
                    value={productForm.subcategory}
                    onChange={(e) => setProductForm({ ...productForm, subcategory: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>
                    Origin / Manufacturing Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Gujarat, India (In-House Manufactured)"
                    value={productForm.origin}
                    onChange={(e) => setProductForm({ ...productForm, origin: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Product Photo Upload & URL */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>
                  Product Photo (Upload from Device or Paste Link) *
                </label>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <label style={{
                      padding: '11px 18px',
                      background: '#011B47',
                      color: '#FFFFFF',
                      borderRadius: '8px',
                      fontSize: '13.5px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(1, 27, 71, 0.2)'
                    }}>
                      <Upload size={16} />
                      <span>Upload Photo from Device</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        style={{ display: 'none' }} 
                      />
                    </label>
                    <span style={{ fontSize: '12.5px', color: '#64748B' }}>PNG, JPG, WEBP formats</span>
                  </div>

                  <input
                    type="text"
                    placeholder="Or paste direct photo image link (https://...)"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '13.5px', boxSizing: 'border-box' }}
                  />

                  {productForm.image && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#F8FAFC', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0' }}>
                      <img 
                        src={productForm.image} 
                        alt="Preview" 
                        style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'contain', background: '#FFFFFF', border: '1px solid #CBD5E1' }} 
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={15} /> Photo Ready
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748B' }}>Image attached and will be displayed on product card</div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setProductForm({ ...productForm, image: '' })}
                        style={{ background: '#FEE2E2', border: 'none', color: '#DC2626', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: 800 }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>
                  Product Description / Details
                </label>
                <textarea
                  rows={3}
                  placeholder="Overview of product features, dimensions, quality standards..."
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value, desc: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              {/* Featured Checkbox */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={productForm.isFeatured}
                  onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                />
                <label htmlFor="featured-check" style={{ fontSize: '13.5px', fontWeight: 700, color: '#1E293B', cursor: 'pointer' }}>
                  Feature this product on Homepage Showcase
                </label>
              </div>

              {/* Modal Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  style={{ padding: '12px 20px', background: '#F1F5F9', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', color: '#475569' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '12px 26px', background: '#011B47', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', color: '#FFFFFF' }}
                >
                  {editingProduct ? 'Update Product' : 'Publish Product'}
                </button>
              </div>

            </form>
          </motion.div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 4. FIREBASE CLOUD REALTIME SYNC MODAL */}
      {/* ===================================================================== */}
      {isFirebaseModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backdropFilter: 'blur(5px)'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              width: '100%',
              maxWidth: '620px',
              maxHeight: '90vh',
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '30px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
              overflowY: 'auto',
              border: '1.5px solid #E2E8F0'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #E2E8F0', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#011B47', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FACC15' }}>
                  <Cloud size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#011B47', margin: 0 }}>
                    Firebase Cloud Realtime Sync
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0' }}>
                    Sync catalog & inquiries across all browsers and devices instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsFirebaseModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Current Status Box */}
            <div style={{
              background: fbConnected ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)',
              border: fbConnected ? '1.5px solid #10B981' : '1.5px solid #F59E0B',
              borderRadius: '14px',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: fbConnected ? '#10B981' : '#F59E0B' }}></span>
                <span style={{ fontSize: '14px', fontWeight: 800, color: fbConnected ? '#065F46' : '#92400E' }}>
                  {fbConnected ? 'Firebase Realtime Cloud Active' : 'Offline / Local Persistence Mode'}
                </span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#475569', margin: 0 }}>
                {fbConnected 
                  ? 'All changes made in this admin panel are automatically synced to Firestore and broadcasted live to all users across every browser and device in real time!' 
                  : 'Currently operating in fast local memory mode. Connect Firebase to broadcast product additions, deletions, and customer inquiries across all devices in real-time.'}
              </p>
            </div>

            {/* Push Catalog to Firestore Button if connected */}
            {fbConnected && (
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#011B47', marginBottom: '4px' }}>
                  Sync Complete Catalog to Cloud
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '12px' }}>
                  Ensure all current local products are uploaded to your Firestore collection.
                </div>
                <button
                  type="button"
                  disabled={isPushingCloud}
                  onClick={async () => {
                    setIsPushingCloud(true);
                    await seedInitialDataToFirestore();
                    setIsPushingCloud(false);
                    showToast('Catalog uploaded to Firebase Firestore successfully!');
                  }}
                  style={{
                    padding: '10px 18px',
                    background: '#011B47',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <RefreshCw size={14} className={isPushingCloud ? 'spin' : ''} />
                  <span>{isPushingCloud ? 'Syncing...' : 'Upload Local Products to Firebase'}</span>
                </button>
              </div>
            )}

            {/* Config Form / Paste */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>
                Firebase Configuration Object (from Firebase Console)
              </label>
              <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 8px' }}>
                Paste the <code>firebaseConfig</code> JSON object below, or configure via <code>.env</code> file:
              </p>
              <textarea
                rows={7}
                placeholder={`{\n  "apiKey": "AIzaSy...",\n  "authDomain": "marvex.firebaseapp.com",\n  "projectId": "marvex-export",\n  "storageBucket": "marvex.appspot.com",\n  "messagingSenderId": "123456789",\n  "appId": "1:123456:web:abcd"\n}`}
                value={fbConfigText}
                onChange={(e) => setFbConfigText(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1.5px solid #CBD5E1',
                  fontFamily: 'monospace',
                  fontSize: '12.5px',
                  boxSizing: 'border-box',
                  background: '#F8FAFC'
                }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
              <div>
                {fbConnected && (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Disconnect Firebase cloud sync and return to local storage mode?')) {
                        clearCustomFirebaseConfig();
                      }
                    }}
                    style={{ background: 'none', border: 'none', color: '#DC2626', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                  >
                    Disconnect Firebase
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsFirebaseModalOpen(false)}
                  style={{ padding: '10px 18px', background: '#F1F5F9', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', color: '#475569' }}
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    try {
                      let parsed;
                      const trimmed = fbConfigText.trim();
                      if (trimmed.startsWith('{')) {
                        parsed = JSON.parse(trimmed);
                      } else {
                        // Extract key-value pairs if pasted as JS object
                        const jsonified = trimmed
                          .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ')
                          .replace(/'/g, '"');
                        parsed = JSON.parse(jsonified);
                      }

                      if (!parsed.projectId || !parsed.apiKey) {
                        alert('Invalid Firebase configuration. Must contain at least apiKey and projectId.');
                        return;
                      }

                      saveCustomFirebaseConfig(parsed);
                      showToast('Firebase configuration saved! Syncing live.');
                      setIsFirebaseModalOpen(false);
                    } catch (err) {
                      alert('Could not parse JSON. Please check formatting.\n\nError: ' + err.message);
                    }
                  }}
                  style={{ padding: '10px 22px', background: '#011B47', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', color: '#FFFFFF' }}
                >
                  Save & Connect Cloud
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}

    </div>
  );
}
