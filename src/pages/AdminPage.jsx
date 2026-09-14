import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Package, Mail, FileText, 
  LogOut, Plus, Search, Trash2, Edit3, CheckCircle2, 
  ExternalLink, Download, Upload, RefreshCw, Eye, 
  Phone, MessageSquare, Zap, Flame, Wrench, Shield,
  Globe, AlertCircle, Sparkles, Filter, X, ArrowRight,
  Cloud, Wifi, Check, Copy, Layers, Tag, Award, Truck, Box, Cpu, Sun, Factory, Ship, FolderPlus, Compass
} from 'lucide-react';
import { 
  getProducts, saveProduct, deleteProduct, deleteAllProducts,
  getEnquiries, updateEnquiryStatus, deleteEnquiry,
  getBlogs, saveBlog, deleteBlog, deleteAllBlogs,
  getCategories, saveCategory, deleteCategory, addSubcategory, editSubcategory, deleteSubcategory,
  checkAdminAuth, adminLogin, adminLogout
} from '../utils/adminStore';
import { 
  isFirebaseConfigured, 
  getActiveFirebaseConfig, 
  saveCustomFirebaseConfig, 
  clearCustomFirebaseConfig 
} from '../firebase/config';
import { seedInitialDataToFirestore, pushAllLocalProductsToCloud } from '../firebase/firestoreSync';
import { useStoreProducts, useStoreEnquiries, useStoreBlogs, useStoreCategories } from '../utils/useStore';
import logoImg from '../assets/logo.png';

const ICON_MAP = {
  Zap, Flame, Wrench, Shield, Package, Globe, Layers, Sparkles, Factory, Ship, Sun, Cpu, Box, Award, Truck, Tag, Compass
};

export function getCategoryIcon(iconName) {
  if (!iconName) return Layers;
  return ICON_MAP[iconName] || Layers;
}

export default function AdminPage({ onNavigate }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => checkAdminAuth());
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'categories' | 'products' | 'inquiries' | 'blogs'

  // Dynamic Store Data
  const categories = useStoreCategories();
  const products = useStoreProducts();
  const inquiries = useStoreEnquiries();
  const blogs = useStoreBlogs();

  // Category State
  const [categorySearch, setCategorySearch] = useState('');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    id: '',
    name: '',
    businessRole: 'Manufacturer & Exporter',
    eyebrow: '',
    desc: '',
    bgImg: '',
    icon: 'Layers',
    subcategories: []
  });
  const [tempSubcatInput, setTempSubcatInput] = useState('');

  // Subcategory Edit Modal State
  const [isSubcatEditModalOpen, setIsSubcatEditModalOpen] = useState(false);
  const [editingSubcatInfo, setEditingSubcatInfo] = useState({ categoryId: '', oldName: '', newName: '' });
  const [inlineSubcatInputs, setInlineSubcatInputs] = useState({});

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
  const [editingBlog, setEditingBlog] = useState(null);
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
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!productForm.title.trim()) return;

    const payload = {
      ...productForm,
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`
    };

    const ok = await saveProduct(payload);
    if (ok) {
      setIsProductModalOpen(false);
      showToast(editingProduct ? 'Product updated successfully & synced live!' : 'New product published & synced live!');
    }
  };

  // Delete Product
  const handleDeleteProduct = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProduct(id);
      showToast(`Product "${title}" deleted.`);
    }
  };

  // Delete All Products
  const handleDeleteAllProducts = () => {
    if (window.confirm('⚠️ Are you sure you want to delete ALL products? This action cannot be undone.')) {
      deleteAllProducts();
      showToast('All products deleted successfully.');
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

  // Delete All Blogs
  const handleDeleteAllBlogs = () => {
    if (window.confirm('⚠️ Are you sure you want to delete ALL blog posts?')) {
      deleteAllBlogs();
      showToast('All blogs deleted successfully.');
    }
  };

  // Open Add Blog Modal
  const handleOpenAddBlog = () => {
    setEditingBlog(null);
    setBlogForm({
      id: '',
      title: '',
      category: 'Global Trade',
      author: 'Marvex Export Desk',
      readTime: '4 min read',
      image: '',
      excerpt: '',
      content: ''
    });
    setIsBlogModalOpen(true);
  };

  // Open Edit Blog Modal
  const handleOpenEditBlog = (blog) => {
    setEditingBlog(blog);
    setBlogForm({
      id: blog.id,
      title: blog.title || '',
      category: blog.category || 'Global Trade',
      author: blog.author || 'Marvex Export Desk',
      readTime: blog.readTime || '4 min read',
      image: blog.image || '',
      excerpt: blog.excerpt || '',
      content: blog.content || ''
    });
    setIsBlogModalOpen(true);
  };

  // Save Blog handler
  const handleSaveBlog = (e) => {
    e.preventDefault();
    if (!blogForm.title.trim()) return;
    const payload = {
      ...blogForm,
      id: editingBlog ? editingBlog.id : `blog-${Date.now()}`
    };
    const ok = saveBlog(payload);
    if (ok) {
      setIsBlogModalOpen(false);
      showToast(editingBlog ? 'Blog post updated & synced live!' : 'Blog post published & synced live!');
    }
  };

  // Blog image upload handler
  const handleBlogImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Please select an image smaller than 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setBlogForm(prev => ({ ...prev, image: uploadEvent.target.result }));
    };
    reader.readAsDataURL(file);
  };

  // ==========================================
  // --- CATEGORY & SUBCATEGORY HANDLERS ---
  // ==========================================
  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm({
      id: '',
      name: '',
      businessRole: 'Manufacturer & Exporter',
      eyebrow: 'UL / IEC Standard Compliant • In-House Manufacturing',
      desc: '',
      bgImg: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=1920&q=80',
      icon: 'Layers',
      subcategories: []
    });
    setTempSubcatInput('');
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (cat) => {
    setEditingCategory(cat);
    setCategoryForm({
      id: cat.id,
      name: cat.name || cat.title || '',
      businessRole: cat.businessRole || 'Manufacturer & Exporter',
      eyebrow: cat.eyebrow || '',
      desc: cat.desc || cat.description || '',
      bgImg: cat.bgImg || cat.image || '',
      icon: cat.icon || 'Layers',
      subcategories: Array.isArray(cat.subcategories) ? [...cat.subcategories] : []
    });
    setTempSubcatInput('');
    setIsCategoryModalOpen(true);
  };

  const handleCategoryImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Please select an image smaller than 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setCategoryForm(prev => ({ ...prev, bgImg: uploadEvent.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddSubcatTag = (e) => {
    if (e) e.preventDefault();
    const val = tempSubcatInput.trim();
    if (!val) return;
    if (!categoryForm.subcategories.includes(val)) {
      setCategoryForm(prev => ({
        ...prev,
        subcategories: [...prev.subcategories, val]
      }));
    }
    setTempSubcatInput('');
  };

  const handleRemoveSubcatTag = (subcatToRemove) => {
    setCategoryForm(prev => ({
      ...prev,
      subcategories: prev.subcategories.filter(s => s !== subcatToRemove)
    }));
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!categoryForm.name.trim()) {
      alert('Please enter category title/name.');
      return;
    }
    const catId = editingCategory 
      ? editingCategory.id 
      : (categoryForm.id || categoryForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    
    // Add pending subcategory tag if user typed but didn't click add
    let currentSubcats = [...categoryForm.subcategories];
    if (tempSubcatInput.trim() && !currentSubcats.includes(tempSubcatInput.trim())) {
      currentSubcats.push(tempSubcatInput.trim());
    }

    const payload = {
      ...categoryForm,
      id: catId,
      name: categoryForm.name.trim(),
      title: categoryForm.name.trim(),
      subcategories: currentSubcats
    };

    const ok = saveCategory(payload);
    if (ok) {
      setIsCategoryModalOpen(false);
      showToast(editingCategory ? 'Category updated & synced live!' : 'New category created & synced live!');
    }
  };

  const handleDeleteCategory = (cat) => {
    const associatedProds = products.filter(p => (p.category === cat.name || p.cat === cat.name));
    const confirmMsg = associatedProds.length > 0 
      ? `Are you sure you want to delete category "${cat.name}"? It currently has ${associatedProds.length} product(s) associated.`
      : `Are you sure you want to delete category "${cat.name}"?`;
    if (window.confirm(confirmMsg)) {
      deleteCategory(cat.id);
      showToast(`Category "${cat.name}" deleted.`);
    }
  };

  const handleQuickAddSubcategory = (categoryId) => {
    const text = (inlineSubcatInputs[categoryId] || '').trim();
    if (!text) return;
    addSubcategory(categoryId, text);
    setInlineSubcatInputs(prev => ({ ...prev, [categoryId]: '' }));
    showToast(`Subcategory "${text}" added!`);
  };

  const handleOpenEditSubcat = (categoryId, subcatName) => {
    setEditingSubcatInfo({ categoryId, oldName: subcatName, newName: subcatName });
    setIsSubcatEditModalOpen(true);
  };

  const handleSaveSubcatEdit = (e) => {
    e.preventDefault();
    if (!editingSubcatInfo.newName.trim()) return;
    editSubcategory(editingSubcatInfo.categoryId, editingSubcatInfo.oldName, editingSubcatInfo.newName.trim());
    setIsSubcatEditModalOpen(false);
    showToast(`Subcategory updated to "${editingSubcatInfo.newName.trim()}"!`);
  };

  const handleDeleteSubcategory = (categoryId, subcatName) => {
    if (window.confirm(`Are you sure you want to delete subcategory "${subcatName}"?`)) {
      deleteSubcategory(categoryId, subcatName);
      showToast(`Subcategory "${subcatName}" deleted.`);
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
            { id: 'categories', label: 'Categories & Subcats', icon: Layers, count: categories.length },
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
          {/* 2.2 CATEGORIES & SUBCATEGORIES TAB */}
          {/* =============================================================== */}
          {activeTab === 'categories' && (
            <div>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#011B47', margin: 0 }}>
                    Category & Subcategory Management
                  </h2>
                  <p style={{ fontSize: '14px', color: '#64748B', margin: '4px 0 0' }}>
                    Create, modify, and delete product categories and subcategories live across the website
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={handleOpenAddCategory}
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
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(1, 27, 71, 0.2)'
                    }}
                  >
                    <Plus size={16} />
                    <span>Add New Category</span>
                  </button>
                </div>
              </div>

              {/* Stats Summary Bar */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: '14px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(1, 27, 71, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#011B47' }}>
                    <Layers size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Active Categories</div>
                    <div style={{ fontSize: '22px', fontWeight: 900, color: '#011B47' }}>{categories.length}</div>
                  </div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: '14px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                    <Tag size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Total Subcategories</div>
                    <div style={{ fontSize: '22px', fontWeight: 900, color: '#011B47' }}>
                      {categories.reduce((acc, c) => acc + (c.subcategories?.length || 0), 0)}
                    </div>
                  </div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: '14px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
                    <Package size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Products in Catalog</div>
                    <div style={{ fontSize: '22px', fontWeight: 900, color: '#011B47' }}>{products.length}</div>
                  </div>
                </div>
              </div>

              {/* Search Toolbar */}
              <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Search size={18} style={{ color: '#64748B' }} />
                <input
                  type="text"
                  placeholder="Search categories or subcategories..."
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '14px' }}
                />
                {categorySearch && (
                  <button onClick={() => setCategorySearch('')} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94A3B8' }}>✕</button>
                )}
              </div>

              {/* Categories Cards List */}
              {(() => {
                const q = categorySearch.trim().toLowerCase();
                const filteredCategories = categories.filter(c => {
                  if (!q) return true;
                  const nameMatch = (c.name || '').toLowerCase().includes(q);
                  const descMatch = (c.desc || '').toLowerCase().includes(q);
                  const subMatch = (c.subcategories || []).some(s => s.toLowerCase().includes(q));
                  return nameMatch || descMatch || subMatch;
                });

                if (filteredCategories.length === 0) {
                  return (
                    <div style={{ background: '#FFFFFF', borderRadius: '18px', border: '1px solid #E2E8F0', padding: '48px 24px', textAlign: 'center' }}>
                      <div style={{ maxWidth: '360px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
                          <Layers size={24} />
                        </div>
                        <div style={{ fontWeight: 800, color: '#011B47', fontSize: '16px' }}>No Categories Found</div>
                        <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
                          {categorySearch ? `No categories match "${categorySearch}"` : 'Get started by creating your first product category.'}
                        </p>
                        <button
                          onClick={handleOpenAddCategory}
                          style={{ marginTop: '8px', padding: '9px 18px', background: '#011B47', color: '#FFFFFF', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                        >
                          <Plus size={14} /> Add Category
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {filteredCategories.map((cat, idx) => {
                      const CatIcon = getCategoryIcon(cat.icon);
                      const catProducts = products.filter(p => (p.category === cat.name || p.cat === cat.name));
                      const subcats = Array.isArray(cat.subcategories) ? cat.subcategories : [];

                      return (
                        <div 
                          key={cat.id || idx}
                          style={{
                            background: '#FFFFFF',
                            borderRadius: '18px',
                            border: '1.5px solid #E2E8F0',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                            overflow: 'hidden',
                            transition: 'border-color 0.2s'
                          }}
                        >
                          {/* Card Header Top */}
                          <div style={{
                            padding: '20px 24px',
                            background: '#FAFCFF',
                            borderBottom: '1px solid #E2E8F0',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '14px'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                              <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '12px',
                                background: '#011B47',
                                color: '#FACC15',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}>
                                <CatIcon size={22} />
                              </div>
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                  <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#011B47', margin: 0 }}>
                                    {cat.name}
                                  </h3>
                                  <span style={{
                                    fontSize: '11.5px',
                                    fontWeight: 800,
                                    background: '#011B47',
                                    color: '#FFFFFF',
                                    padding: '3px 10px',
                                    borderRadius: '6px'
                                  }}>
                                    {cat.businessRole || 'Manufacturer & Exporter'}
                                  </span>
                                  <span style={{
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    color: '#059669',
                                    background: '#ECFDF5',
                                    padding: '3px 10px',
                                    borderRadius: '6px',
                                    border: '1px solid #A7F3D0'
                                  }}>
                                    {catProducts.length} Product{catProducts.length === 1 ? '' : 's'}
                                  </span>
                                </div>
                                {cat.eyebrow && (
                                  <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '3px', fontWeight: 600 }}>
                                    {cat.eyebrow}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Category Actions */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <button
                                onClick={() => handleOpenEditCategory(cat)}
                                style={{
                                  padding: '8px 14px',
                                  background: '#F1F5F9',
                                  color: '#011B47',
                                  border: '1px solid #CBD5E1',
                                  borderRadius: '8px',
                                  fontSize: '13px',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px'
                                }}
                              >
                                <Edit3 size={14} />
                                <span>Edit Category</span>
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(cat)}
                                style={{
                                  padding: '8px 12px',
                                  background: '#FEF2F2',
                                  color: '#DC2626',
                                  border: '1px solid #FCA5A5',
                                  borderRadius: '8px',
                                  fontSize: '13px',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                                title="Delete Category"
                              >
                                <Trash2 size={14} />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>

                          {/* Card Content & Subcategories */}
                          <div style={{ padding: '20px 24px' }}>
                            {cat.desc && (
                              <p style={{ fontSize: '13.5px', color: '#475569', margin: '0 0 16px', lineHeight: 1.5 }}>
                                {cat.desc}
                              </p>
                            )}

                            {/* Subcategories Subsection */}
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <div style={{ fontSize: '13px', fontWeight: 800, color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <Tag size={15} style={{ color: '#011B47' }} />
                                  <span>Subcategories ({subcats.length})</span>
                                </div>
                                <span style={{ fontSize: '12px', color: '#64748B' }}>
                                  Click pencil to rename or trash to remove subcategory
                                </span>
                              </div>

                              {/* Subcategory Pills Grid */}
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                                {subcats.length === 0 ? (
                                  <div style={{ fontSize: '13px', color: '#94A3B8', fontStyle: 'italic', padding: '6px 0' }}>
                                    No subcategories created yet for this category. Add one below!
                                  </div>
                                ) : (
                                  subcats.map((subcat, sIdx) => {
                                    const subcatCount = catProducts.filter(p => p.subcategory === subcat).length;
                                    return (
                                      <div
                                        key={sIdx}
                                        style={{
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          gap: '6px',
                                          background: '#F8FAFC',
                                          border: '1.5px solid #CBD5E1',
                                          borderRadius: '8px',
                                          padding: '6px 10px',
                                          fontSize: '13px',
                                          fontWeight: 700,
                                          color: '#011B47'
                                        }}
                                      >
                                        <span>{subcat}</span>
                                        <span style={{
                                          fontSize: '11px',
                                          background: subcatCount > 0 ? '#011B47' : '#E2E8F0',
                                          color: subcatCount > 0 ? '#FFFFFF' : '#64748B',
                                          padding: '1px 6px',
                                          borderRadius: '100px',
                                          fontWeight: 800
                                        }}>
                                          {subcatCount}
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() => handleOpenEditSubcat(cat.id, subcat)}
                                          style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: '2px 3px', display: 'flex', alignItems: 'center' }}
                                          title="Rename Subcategory"
                                        >
                                          <Edit3 size={12} />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => handleDeleteSubcategory(cat.id, subcat)}
                                          style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', padding: '2px 3px', display: 'flex', alignItems: 'center' }}
                                          title="Delete Subcategory"
                                        >
                                          <X size={13} />
                                        </button>
                                      </div>
                                    );
                                  })
                                )}
                              </div>

                              {/* Quick Inline Add Subcategory */}
                              <div style={{ display: 'flex', gap: '8px', maxWidth: '420px' }}>
                                <input
                                  type="text"
                                  placeholder="Add new subcategory (e.g. Earth Clamps, Ground Spices)..."
                                  value={inlineSubcatInputs[cat.id] || ''}
                                  onChange={(e) => setInlineSubcatInputs({ ...inlineSubcatInputs, [cat.id]: e.target.value })}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      handleQuickAddSubcategory(cat.id);
                                    }
                                  }}
                                  style={{
                                    flex: 1,
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    border: '1.5px solid #CBD5E1',
                                    fontSize: '13px',
                                    outline: 'none'
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => handleQuickAddSubcategory(cat.id)}
                                  style={{
                                    padding: '8px 14px',
                                    background: '#011B47',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '13px',
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                  }}
                                >
                                  <Plus size={14} />
                                  <span>Add</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          )}

          {/* =============================================================== */}
          {/* 2.3 PRODUCTS MANAGER TAB */}
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

                  {products.length > 0 && (
                    <button
                      onClick={handleDeleteAllProducts}
                      title="Delete all products from catalog"
                      style={{
                        padding: '12px 16px',
                        background: '#FEF2F2',
                        color: '#DC2626',
                        borderRadius: '10px',
                        border: '1.5px solid #FCA5A5',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Trash2 size={14} />
                      <span>Delete All</span>
                    </button>
                  )}
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
                  {['All', ...categories.map(c => c.name)].map(cat => (
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
                      <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ padding: '48px 24px', textAlign: 'center' }}>
                          <div style={{ maxWidth: '380px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
                              <Package size={24} />
                            </div>
                            <div style={{ fontWeight: 800, color: '#011B47', fontSize: '16px' }}>
                              {products.length === 0 ? 'No Products in Catalog' : 'No Matching Products'}
                            </div>
                            <p style={{ fontSize: '13px', color: '#64748B', margin: 0, lineHeight: 1.4 }}>
                              {products.length === 0 
                                ? 'No products have been added yet.' 
                                : 'Try changing your search query or category filter.'}
                            </p>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                              <button
                                onClick={handleOpenAddProduct}
                                style={{ padding: '8px 16px', background: '#011B47', color: '#FFFFFF', borderRadius: '8px', border: 'none', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                              >
                                <Plus size={14} /> Add Product
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map(prod => (
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
                      ))
                    )}
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#011B47', margin: 0 }}>
                    Blog & Export Articles
                  </h2>
                  <p style={{ fontSize: '14px', color: '#64748B', margin: '4px 0 0' }}>
                    Publish market updates and engineering guides
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={handleOpenAddBlog}
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
                    <span>Add Blog Post</span>
                  </button>

                  {blogs.length > 0 && (
                    <button
                      onClick={handleDeleteAllBlogs}
                      style={{
                        padding: '10px 16px',
                        background: '#FEF2F2',
                        color: '#DC2626',
                        borderRadius: '10px',
                        border: '1.5px solid #FCA5A5',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Trash2 size={14} />
                      <span>Delete All</span>
                    </button>
                  )}
                </div>
              </div>

              {blogs.length === 0 ? (
                <div style={{ background: '#FFFFFF', borderRadius: '18px', border: '1px solid #E2E8F0', padding: '48px 24px', textAlign: 'center' }}>
                  <div style={{ maxWidth: '360px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
                      <FileText size={24} />
                    </div>
                    <div style={{ fontWeight: 800, color: '#011B47', fontSize: '16px' }}>No Blog Articles</div>
                    <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
                      Add a new blog post to get started.
                    </p>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                      <button
                        onClick={handleOpenAddBlog}
                        style={{ padding: '8px 16px', background: '#011B47', color: '#FFFFFF', borderRadius: '8px', border: 'none', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        <Plus size={14} /> Add Blog Post
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                  {blogs.map(blog => (
                    <div key={blog.id} style={{ background: '#FFFFFF', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
                      <img src={blog.image || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80'} alt={blog.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
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
                          <span style={{ fontSize: '12px', color: '#94A3B8' }}>{blog.date || 'Draft'}</span>
                          <div style={{ display: 'inline-flex', gap: '8px' }}>
                            <button
                              onClick={() => handleOpenEditBlog(blog)}
                              style={{ background: '#F1F5F9', color: '#011B47', border: 'none', padding: '5px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                            >
                              <Edit3 size={12} /> Edit
                            </button>
                            <button
                              onClick={() => { if(window.confirm(`Delete "${blog.title}"?`)) { deleteBlog(blog.id); showToast('Blog deleted.'); } }}
                              style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', padding: '5px 8px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}
                              title="Delete Blog"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}



        </main>
      </div>

      {/* ===================================================================== */}
      {/* 5. ADD / EDIT BLOG MODAL */}
      {/* ===================================================================== */}
      {isBlogModalOpen && (
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
              maxWidth: '700px',
              maxHeight: '92vh',
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
                {editingBlog ? 'Edit Blog Post' : 'Publish New Blog Post'}
              </h3>
              <button
                onClick={() => setIsBlogModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Blog Title */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>Blog Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Top 5 Spice Export Markets in 2025"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              {/* Category & Author */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>Category</label>
                  <select
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                  >
                    {['Global Trade', 'Spice Export', 'Earthing Standards', 'Product Spotlight', 'Market Insights', 'Compliance & Certifications'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>Author</label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Read Time */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>Read Time</label>
                <input
                  type="text"
                  placeholder="e.g. 4 min read"
                  value={blogForm.readTime}
                  onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              {/* Blog Cover Image */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>Cover Photo (Upload or Paste URL)</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <label style={{ padding: '10px 16px', background: '#011B47', color: '#FFFFFF', borderRadius: '8px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <Upload size={15} />
                      <span>Upload Photo</span>
                      <input type="file" accept="image/*" onChange={handleBlogImageUpload} style={{ display: 'none' }} />
                    </label>
                    <span style={{ fontSize: '12px', color: '#64748B' }}>PNG, JPG, WEBP</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Or paste direct image URL (https://...)"
                    value={blogForm.image}
                    onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '13.5px', boxSizing: 'border-box' }}
                  />
                  {blogForm.image && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#F8FAFC', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0' }}>
                      <img src={blogForm.image} alt="Preview" style={{ width: '56px', height: '40px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #CBD5E1' }} />
                      <div style={{ flex: 1, fontSize: '12.5px', fontWeight: 700, color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={14} /> Cover Photo Ready
                      </div>
                      <button type="button" onClick={() => setBlogForm({ ...blogForm, image: '' })} style={{ background: '#FEE2E2', border: 'none', color: '#DC2626', padding: '5px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: 700 }}>Remove</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>Excerpt / Short Summary</label>
                <textarea
                  rows={2}
                  placeholder="A brief 1-2 sentence summary of the article..."
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              {/* Full Content */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>Full Article Content</label>
                <textarea
                  rows={6}
                  placeholder="Write the full blog article content here..."
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box', lineHeight: 1.6 }}
                />
              </div>

              {/* Modal Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  style={{ padding: '12px 20px', background: '#F1F5F9', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', color: '#475569' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '12px 26px', background: '#011B47', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', color: '#FFFFFF' }}
                >
                  {editingBlog ? 'Update Blog Post' : 'Publish Blog Post'}
                </button>
              </div>

            </form>
          </motion.div>
        </div>
      )}



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
                      const catName = e.target.value;
                      const catObj = categories.find(c => c.name === catName);
                      const defaultRole = catObj?.businessRole || (catName === 'Spices & Agro Commodities' ? 'Merchant Exporter' : 'Manufacturer & Exporter');
                      const defaultSub = (catObj?.subcategories && catObj.subcategories.length > 0) ? catObj.subcategories[0] : 'General';
                      setProductForm({ ...productForm, category: catName, businessType: defaultRole, subcategory: defaultSub });
                    }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                  >
                    {categories.map(c => (
                      <option key={c.id || c.name} value={c.name}>{c.name}</option>
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
                    <option value="Custom / OEM Supplier">Custom / OEM Supplier</option>
                  </select>
                </div>
              </div>

              {/* Subcategory */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 800, color: '#1E293B' }}>
                    Subcategory
                  </label>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>Select preset or type custom</span>
                </div>
                {(() => {
                  const currentCatObj = categories.find(c => c.name === productForm.category);
                  const subcats = currentCatObj?.subcategories || [];
                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {subcats.length > 0 && (
                        <select
                          value={subcats.includes(productForm.subcategory) ? productForm.subcategory : ''}
                          onChange={(e) => {
                            if (e.target.value) {
                              setProductForm({ ...productForm, subcategory: e.target.value });
                            }
                          }}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '13.5px', background: '#F8FAFC' }}
                        >
                          <option value="">— Select from preset subcategories —</option>
                          {subcats.map(sub => (
                            <option key={sub} value={sub}>{sub}</option>
                          ))}
                        </select>
                      )}
                      <input
                        type="text"
                        placeholder="Or enter custom subcategory name..."
                        value={productForm.subcategory}
                        onChange={(e) => setProductForm({ ...productForm, subcategory: e.target.value })}
                        style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                      />
                    </div>
                  );
                })()}
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
                    await pushAllLocalProductsToCloud();
                    setIsPushingCloud(false);
                    showToast('All products synced to Firebase Firestore successfully!');
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

      {/* ===================================================================== */}
      {/* 6. ADD / EDIT CATEGORY MODAL */}
      {/* ===================================================================== */}
      {isCategoryModalOpen && (
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
              maxHeight: '92vh',
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              overflowY: 'auto',
              border: '1.5px solid #E2E8F0'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #E2E8F0', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#011B47', color: '#FACC15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Layers size={20} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#011B47', margin: 0 }}>
                  {editingCategory ? 'Edit Product Category' : 'Create New Product Category'}
                </h3>
              </div>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Category Name & Business Role */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Solar & Renewable Equipment"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>
                    Business Role Badge *
                  </label>
                  <select
                    value={categoryForm.businessRole}
                    onChange={(e) => setCategoryForm({ ...categoryForm, businessRole: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                  >
                    <option value="Manufacturer & Exporter">Manufacturer & Exporter</option>
                    <option value="Merchant Exporter">Merchant Exporter</option>
                    <option value="Custom / OEM Supplier">Custom / OEM Supplier</option>
                    <option value="Direct Producer & Exporter">Direct Producer & Exporter</option>
                  </select>
                </div>
              </div>

              {/* Eyebrow / Tagline */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>
                  Tagline / Eyebrow Header
                </label>
                <input
                  type="text"
                  placeholder="e.g. UL 467 & IEC 62305 Standard Compliant • In-House Manufacturing"
                  value={categoryForm.eyebrow}
                  onChange={(e) => setCategoryForm({ ...categoryForm, eyebrow: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>
                  Category Banner Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Detailed description of this commodity vertical for catalog pages..."
                  value={categoryForm.desc}
                  onChange={(e) => setCategoryForm({ ...categoryForm, desc: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box', lineHeight: 1.5 }}
                />
              </div>

              {/* Icon Selection */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>
                  Select Category Icon
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(68px, 1fr))', gap: '8px' }}>
                  {[
                    { name: 'Zap', label: 'Zap' },
                    { name: 'Flame', label: 'Flame' },
                    { name: 'Wrench', label: 'Wrench' },
                    { name: 'Shield', label: 'Shield' },
                    { name: 'Package', label: 'Package' },
                    { name: 'Globe', label: 'Globe' },
                    { name: 'Layers', label: 'Layers' },
                    { name: 'Sparkles', label: 'Sparkles' },
                    { name: 'Factory', label: 'Factory' },
                    { name: 'Ship', label: 'Ship' },
                    { name: 'Sun', label: 'Sun' },
                    { name: 'Cpu', label: 'Cpu' },
                    { name: 'Box', label: 'Box' },
                    { name: 'Award', label: 'Award' },
                    { name: 'Truck', label: 'Truck' },
                    { name: 'Compass', label: 'Compass' }
                  ].map(item => {
                    const IconComponent = getCategoryIcon(item.name);
                    const isSelected = categoryForm.icon === item.name;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setCategoryForm({ ...categoryForm, icon: item.name })}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '8px 4px',
                          borderRadius: '8px',
                          border: isSelected ? '2px solid #011B47' : '1px solid #E2E8F0',
                          background: isSelected ? '#011B47' : '#F8FAFC',
                          color: isSelected ? '#FACC15' : '#475569',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <IconComponent size={18} />
                        <span style={{ fontSize: '10.5px', fontWeight: 700, color: isSelected ? '#FFFFFF' : '#64748B' }}>
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cover Photo */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>
                  Hero Cover Background Photo (Upload or Paste URL)
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <label style={{ padding: '10px 16px', background: '#011B47', color: '#FFFFFF', borderRadius: '8px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <Upload size={15} />
                      <span>Upload Photo</span>
                      <input type="file" accept="image/*" onChange={handleCategoryImageUpload} style={{ display: 'none' }} />
                    </label>
                    <span style={{ fontSize: '12px', color: '#64748B' }}>PNG, JPG, WEBP (High Resolution)</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Or paste direct image URL (https://...)"
                    value={categoryForm.bgImg}
                    onChange={(e) => setCategoryForm({ ...categoryForm, bgImg: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '13.5px', boxSizing: 'border-box' }}
                  />
                  {categoryForm.bgImg && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#F8FAFC', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0' }}>
                      <img src={categoryForm.bgImg} alt="Preview" style={{ width: '70px', height: '44px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #CBD5E1' }} />
                      <div style={{ flex: 1, fontSize: '12.5px', fontWeight: 700, color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={14} /> Background Image Ready
                      </div>
                      <button type="button" onClick={() => setCategoryForm({ ...categoryForm, bgImg: '' })} style={{ background: '#FEE2E2', border: 'none', color: '#DC2626', padding: '5px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: 700 }}>Remove</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Subcategories Tag Builder */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>
                  Subcategories
                </label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    placeholder="Type subcategory name (e.g. Copper Clamps, Ground Spices)..."
                    value={tempSubcatInput}
                    onChange={(e) => setTempSubcatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSubcatTag();
                      }
                    }}
                    style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '13.5px', boxSizing: 'border-box' }}
                  />
                  <button
                    type="button"
                    onClick={handleAddSubcatTag}
                    style={{ padding: '10px 16px', background: '#011B47', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Plus size={15} /> Add
                  </button>
                </div>

                {categoryForm.subcategories && categoryForm.subcategories.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    {categoryForm.subcategories.map((sub, idx) => (
                      <span
                        key={idx}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: '#FFFFFF',
                          border: '1px solid #CBD5E1',
                          padding: '5px 10px',
                          borderRadius: '6px',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          color: '#011B47'
                        }}
                      >
                        <span>{sub}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSubcatTag(sub)}
                          style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                        >
                          <X size={13} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  style={{ padding: '12px 20px', background: '#F1F5F9', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', color: '#475569' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '12px 26px', background: '#011B47', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', color: '#FFFFFF' }}
                >
                  {editingCategory ? 'Update Category' : 'Create Category'}
                </button>
              </div>

            </form>
          </motion.div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 7. EDIT SUBCATEGORY MODAL */}
      {/* ===================================================================== */}
      {isSubcatEditModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          zIndex: 99999,
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
              maxWidth: '460px',
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              border: '1.5px solid #E2E8F0'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#011B47', margin: 0 }}>
                Rename Subcategory
              </h3>
              <button
                onClick={() => setIsSubcatEditModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveSubcatEdit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 800, color: '#64748B', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Current Name:
                </label>
                <div style={{ padding: '8px 12px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13.5px', fontWeight: 700, color: '#011B47' }}>
                  {editingSubcatInfo.oldName}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>
                  New Subcategory Name *
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={editingSubcatInfo.newName}
                  onChange={(e) => setEditingSubcatInfo({ ...editingSubcatInfo, newName: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px', borderTop: '1px solid #E2E8F0', paddingTop: '14px' }}>
                <button
                  type="button"
                  onClick={() => setIsSubcatEditModalOpen(false)}
                  style={{ padding: '10px 18px', background: '#F1F5F9', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', color: '#475569' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 22px', background: '#011B47', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', color: '#FFFFFF' }}
                >
                  Save Rename
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}

