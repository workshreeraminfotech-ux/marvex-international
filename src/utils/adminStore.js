// Centralized Dynamic Data & Admin Store for Marvex International
// Hybrid architecture: Instant Local UI responsiveness + Live Firebase Cloud Realtime Sync

import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';
import { BLOGS as INITIAL_BLOGS } from '../data/blogs';
import { INITIAL_CATEGORIES } from '../data/categories';
import { 
  initFirestoreRealtimeSync,
  setLocalSavingState,
  saveProductToCloud,
  deleteProductFromCloud,
  clearProductsFromCloud,
  seedInitialDataToFirestore,
  saveInquiryToCloud,
  updateInquiryStatusInCloud,
  deleteInquiryFromCloud,
  saveBlogToCloud,
  deleteBlogFromCloud,
  clearBlogsFromCloud,
  seedInitialBlogsToFirestore,
  saveCategoryToCloud,
  deleteCategoryFromCloud,
  clearCategoriesFromCloud,
  seedInitialCategoriesToFirestore
} from '../firebase/firestoreSync';

import apedaLogo from '../assets/certificate/apeda.png';
import spicesBoardLogo from '../assets/certificate/spices board.png';
import fdaLogo from '../assets/certificate/fda.png';
import isoLogo from '../assets/certificate/iso.png';
import fssaiLogo from '../assets/certificate/fssai.png';
import halalLogo from '../assets/certificate/halal.png';

const STORAGE_KEYS = {
  PRODUCTS: 'marvex_products_v2',
  INQUIRIES: 'marvex_inquiries_v2',
  BLOGS: 'marvex_blogs_v2',
  CATEGORIES: 'marvex_categories_v2',
  SETTINGS: 'marvex_settings_v2',
  AUTH: 'marvex_admin_session_v2'
};

const DEFAULT_SETTINGS = {
  companyName: 'Marvex International',
  tagline: 'Precision Manufacturing & Global Merchant Exports',
  phone: '+91 8200712955',
  email: 'info@marvexinternational.com',
  address: 'Gujarat, India',
  whatsapp: '918200712955',
  exportPorts: 'Mundra Port, Kandla Port, Nhava Sheva (JNPT) Mumbai, India'
};

const INITIAL_CERTS = [
  { 
    id: 'cert-1',
    name: 'APEDA Certified Exporter', 
    code: 'APEDA / GOVT', 
    tag: 'Agricultural & Processed Food Products Export Development Authority',
    logo: apedaLogo
  },
  { 
    id: 'cert-2',
    name: 'Spice Board of India', 
    code: 'SPICE BOARD', 
    tag: 'Ministry of Commerce & Industry, Govt of India',
    logo: spicesBoardLogo
  },
  { 
    id: 'cert-3',
    name: 'US FDA Registered Facility', 
    code: 'US FDA', 
    tag: 'US Food and Drug Administration Registration',
    logo: fdaLogo
  },
  { 
    id: 'cert-4',
    name: 'ISO 22000 & ISO 9001:2015', 
    code: 'ISO 22000', 
    tag: 'Food Safety Management & Quality Control System',
    logo: isoLogo
  },
  { 
    id: 'cert-5',
    name: 'FSSAI License Approved', 
    code: 'FSSAI', 
    tag: 'Food Safety and Standards Authority of India',
    logo: fssaiLogo
  },
  { 
    id: 'cert-6',
    name: 'Halal Certified Export', 
    code: 'HALAL', 
    tag: 'Global Dietary Compliance for Gulf & Middle East Markets',
    logo: halalLogo
  }
];

// Helper: Broadcast store update event to all components
export function notifyStoreUpdate() {
  try {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('marvex_store_updated'));
    }
  } catch (e) {}
}

// Automatically start real-time Firestore synchronization on browser load
if (typeof window !== 'undefined') {
  setTimeout(() => {
    initFirestoreRealtimeSync();
  }, 100);
}

// Helper to normalize category data safely
export function normalizeCategory(c) {
  if (!c) return null;
  const name = (c.name || c.title || 'General Category').trim();
  const id = c.id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `cat-${Date.now()}`;
  const subcategories = Array.isArray(c.subcategories) 
    ? c.subcategories
        .filter(s => typeof s === 'string' && s.trim().length > 0)
        .map(s => s.trim())
    : [];
  
  return {
    ...c,
    id,
    name,
    title: name,
    businessRole: c.businessRole || 'Manufacturer & Exporter',
    highlight: c.highlight || `${name} (${c.businessRole || 'Manufacturer & Exporter'})`,
    eyebrow: c.eyebrow || 'Export Standard Compliance • Direct Factory Dispatch',
    desc: c.desc || c.description || '',
    description: c.description || c.desc || '',
    bgImg: c.bgImg || c.image || 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=1920&q=80',
    icon: c.icon || 'Layers',
    badges: Array.isArray(c.badges) && c.badges.length > 0 ? c.badges : ['Quality Guaranteed', 'Global Export Ready', 'Direct Procurement'],
    subcategories
  };
}

// Helper to normalize product category and subcategory safely
export function normalizeProduct(p) {
  if (!p) return null;
  let category = (p.category || p.cat || 'Earthing Parts').trim();
  let subcategory = (p.subcategory || '').trim();
  
  const businessType = p.businessType || (category === 'Spices & Agro Commodities' ? 'Merchant Exporter' : 'Manufacturer & Exporter');

  return {
    ...p,
    id: p.id || `prod-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    title: p.title || p.name || 'Export Commodity Item',
    category,
    cat: category,
    subcategory: subcategory || 'General',
    businessType,
    specs: p.specs || '',
    origin: p.origin || 'Gujarat, India',
    packaging: p.packaging || 'Export Standard Packaging',
    description: p.description || p.desc || '',
    desc: p.desc || p.description || '',
    hsCode: p.hsCode || '',
    image: p.image || 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80',
    isFeatured: Boolean(p.isFeatured)
  };
}

// ==========================================
// --- PRODUCTS STORE ---
// ==========================================
export function getProducts() {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(normalizeProduct).filter(Boolean);
        }
      }
    }
  } catch (e) {
    console.error('Error loading products from storage:', e);
  }
  return (INITIAL_PRODUCTS || []).map(normalizeProduct).filter(Boolean);
}

export async function saveProduct(productData) {
  try {
    setLocalSavingState(true);
    const list = getProducts();
    const normalized = normalizeProduct(productData);
    if (!normalized) {
      setLocalSavingState(false);
      return false;
    }

    const existingIdx = list.findIndex(p => p.id === normalized.id);
    let updated;
    if (existingIdx >= 0) {
      updated = [...list];
      updated[existingIdx] = normalized;
    } else {
      updated = [normalized, ...list];
    }

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
      } catch (storageErr) {
        console.warn('localStorage quota warning:', storageErr);
      }
    }
    notifyStoreUpdate();

    // Async push to Firebase Firestore for cross-browser live sync
    const cloudResult = await saveProductToCloud(normalized);
    setTimeout(() => setLocalSavingState(false), 800);

    return true;
  } catch (e) {
    setLocalSavingState(false);
    console.error('Error saving product:', e);
    return false;
  }
}

export async function deleteProduct(productId) {
  try {
    setLocalSavingState(true);
    const list = getProducts();
    const updated = list.filter(p => p.id !== productId);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    }
    notifyStoreUpdate();

    // Async delete from Firebase Firestore
    await deleteProductFromCloud(productId);
    setTimeout(() => setLocalSavingState(false), 800);

    return true;
  } catch (e) {
    setLocalSavingState(false);
    console.error('Error deleting product:', e);
    return false;
  }
}

export function deleteAllProducts() {
  try {
    setLocalSavingState(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify([]));
    }
    notifyStoreUpdate();

    // Async clear all from Firebase Firestore
    clearProductsFromCloud().finally(() => {
      setTimeout(() => setLocalSavingState(false), 1000);
    });

    return true;
  } catch (e) {
    setLocalSavingState(false);
    console.error('Error deleting all products:', e);
    return false;
  }
}

export function resetProductsToDefault() {
  try {
    setLocalSavingState(true);
    const defaultList = INITIAL_PRODUCTS.map(normalizeProduct).filter(Boolean);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(defaultList));
    }
    notifyStoreUpdate();

    // Async seed default catalog to cloud
    seedInitialDataToFirestore().finally(() => {
      setTimeout(() => setLocalSavingState(false), 1000);
    });

    return true;
  } catch (e) {
    setLocalSavingState(false);
    return false;
  }
}

// ==========================================
// --- ENQUIRIES / RFQ STORE ---
// ==========================================
export function getEnquiries() {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    }
  } catch (e) {}
  return [];
}

export function addEnquiry(enquiryData) {
  try {
    const list = getEnquiries();
    const newEnquiry = {
      id: `rfq-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
      status: 'New',
      name: enquiryData.name || 'Anonymous Buyer',
      email: enquiryData.email || '',
      phone: enquiryData.phone || '',
      country: enquiryData.country || 'International',
      product: enquiryData.product || enquiryData.productName || 'General Sourcing Inquiry',
      quantity: enquiryData.quantity || enquiryData.containerQty || '1 x 20ft FCL',
      destinationPort: enquiryData.destinationPort || enquiryData.port || 'CIF Destination',
      message: enquiryData.message || enquiryData.notes || '',
      source: enquiryData.source || 'Website Quote Form'
    };

    const updated = [newEnquiry, ...list];
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    }
    notifyStoreUpdate();

    // Async push to Firestore
    saveInquiryToCloud(newEnquiry);

    return newEnquiry;
  } catch (e) {
    console.error('Error adding inquiry:', e);
    return null;
  }
}

export function updateEnquiryStatus(id, newStatus) {
  try {
    const list = getEnquiries();
    const updated = list.map(item => item.id === id ? { ...item, status: newStatus } : item);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    }
    notifyStoreUpdate();

    // Async push to Firestore
    updateInquiryStatusInCloud(id, newStatus);

    return true;
  } catch (e) {
    return false;
  }
}

export function deleteEnquiry(id) {
  try {
    const list = getEnquiries();
    const updated = list.filter(item => item.id !== id);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    }
    notifyStoreUpdate();

    // Async delete from Firestore
    deleteInquiryFromCloud(id);

    return true;
  } catch (e) {
    return false;
  }
}

// ==========================================
// --- BLOGS STORE ---
// ==========================================
export function getBlogs() {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEYS.BLOGS);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    }
  } catch (e) {}
  return [];
}

export function saveBlog(blogData) {
  try {
    setLocalSavingState(true);
    const list = getBlogs();
    const id = blogData.id || `blog-${Date.now()}`;
    const newBlog = {
      ...blogData,
      id,
      date: blogData.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const idx = list.findIndex(b => b.id === id);
    let updated;
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = newBlog;
    } else {
      updated = [newBlog, ...list];
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(updated));
    }
    notifyStoreUpdate();

    // Async push to Firestore
    saveBlogToCloud(newBlog).finally(() => {
      setTimeout(() => setLocalSavingState(false), 1000);
    });

    return true;
  } catch (e) {
    setLocalSavingState(false);
    return false;
  }
}

export function deleteBlog(id) {
  try {
    setLocalSavingState(true);
    const list = getBlogs();
    const updated = list.filter(b => b.id !== id);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(updated));
    }
    notifyStoreUpdate();

    // Async delete from Firestore
    deleteBlogFromCloud(id).finally(() => {
      setTimeout(() => setLocalSavingState(false), 1000);
    });

    return true;
  } catch (e) {
    setLocalSavingState(false);
    return false;
  }
}

export function deleteAllBlogs() {
  try {
    setLocalSavingState(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify([]));
    }
    notifyStoreUpdate();

    // Async clear all blogs from cloud
    clearBlogsFromCloud().finally(() => {
      setTimeout(() => setLocalSavingState(false), 1000);
    });

    return true;
  } catch (e) {
    setLocalSavingState(false);
    return false;
  }
}

export function resetBlogsToDefault() {
  try {
    setLocalSavingState(true);
    const defaultBlogs = INITIAL_BLOGS || [];
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(defaultBlogs));
    }
    notifyStoreUpdate();

    // Async seed default blogs to cloud
    seedInitialBlogsToFirestore().finally(() => {
      setTimeout(() => setLocalSavingState(false), 1000);
    });

    return true;
  } catch (e) {
    setLocalSavingState(false);
    return false;
  }
}

// ==========================================
// --- CATEGORIES & SUBCATEGORIES STORE ---
// ==========================================
export function getCategories() {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(normalizeCategory).filter(Boolean);
        }
      }
    }
  } catch (e) {
    console.error('Error loading categories from storage:', e);
  }
  return INITIAL_CATEGORIES.map(normalizeCategory).filter(Boolean);
}

export function saveCategory(categoryData) {
  try {
    setLocalSavingState(true);
    const list = getCategories();
    const normalized = normalizeCategory(categoryData);
    if (!normalized) {
      setLocalSavingState(false);
      return false;
    }

    const existingIdx = list.findIndex(c => c.id === normalized.id || c.name.toLowerCase() === normalized.name.toLowerCase());
    let updated;
    if (existingIdx >= 0) {
      updated = [...list];
      updated[existingIdx] = normalized;
    } else {
      updated = [...list, normalized];
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updated));
    }
    notifyStoreUpdate();

    // Async push to Firebase Firestore
    saveCategoryToCloud(normalized).finally(() => {
      setTimeout(() => setLocalSavingState(false), 1000);
    });

    return true;
  } catch (e) {
    setLocalSavingState(false);
    console.error('Error saving category:', e);
    return false;
  }
}

export function deleteCategory(categoryId) {
  try {
    setLocalSavingState(true);
    const list = getCategories();
    const target = list.find(c => c.id === categoryId || c.name === categoryId);
    const updated = list.filter(c => c.id !== categoryId && c.name !== categoryId);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updated));
    }
    notifyStoreUpdate();

    // Async delete from Firestore
    const cloudId = target ? target.id : categoryId;
    deleteCategoryFromCloud(cloudId).finally(() => {
      setTimeout(() => setLocalSavingState(false), 1000);
    });

    return true;
  } catch (e) {
    setLocalSavingState(false);
    console.error('Error deleting category:', e);
    return false;
  }
}

export function addSubcategory(categoryId, subcategoryName) {
  if (!subcategoryName || !subcategoryName.trim()) return false;
  const list = getCategories();
  const cat = list.find(c => c.id === categoryId || c.name === categoryId);
  if (!cat) return false;
  
  const cleanSub = subcategoryName.trim();
  if (cat.subcategories.includes(cleanSub)) return true;
  
  const updatedSubcategories = [...cat.subcategories, cleanSub];
  return saveCategory({
    ...cat,
    subcategories: updatedSubcategories
  });
}

export function editSubcategory(categoryId, oldName, newName) {
  if (!newName || !newName.trim()) return false;
  const list = getCategories();
  const cat = list.find(c => c.id === categoryId || c.name === categoryId);
  if (!cat) return false;

  const cleanNew = newName.trim();
  const updatedSubcategories = cat.subcategories.map(s => s === oldName ? cleanNew : s);
  
  // Also update any products currently having this old subcategory
  try {
    const products = getProducts();
    let prodsChanged = false;
    const updatedProducts = products.map(p => {
      if ((p.category === cat.name || p.cat === cat.name) && p.subcategory === oldName) {
        prodsChanged = true;
        return { ...p, subcategory: cleanNew };
      }
      return p;
    });
    if (prodsChanged && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updatedProducts));
    }
  } catch (err) {}

  return saveCategory({
    ...cat,
    subcategories: updatedSubcategories
  });
}

export function deleteSubcategory(categoryId, subcategoryName) {
  const list = getCategories();
  const cat = list.find(c => c.id === categoryId || c.name === categoryId);
  if (!cat) return false;

  const updatedSubcategories = cat.subcategories.filter(s => s !== subcategoryName);
  return saveCategory({
    ...cat,
    subcategories: updatedSubcategories
  });
}

export function resetCategoriesToDefault() {
  try {
    setLocalSavingState(true);
    const defaults = INITIAL_CATEGORIES.map(normalizeCategory).filter(Boolean);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(defaults));
    }
    notifyStoreUpdate();

    // Async seed initial categories to Firestore
    seedInitialCategoriesToFirestore().finally(() => {
      setTimeout(() => setLocalSavingState(false), 1000);
    });

    return true;
  } catch (e) {
    setLocalSavingState(false);
    return false;
  }
}


// ==========================================
// --- SETTINGS STORE ---
// ==========================================
export function getSettings() {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    }
  } catch (e) {}
  return DEFAULT_SETTINGS;
}

export function saveSettings(settingsData) {
  try {
    const current = getSettings();
    const updated = { ...current, ...settingsData };
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    }
    notifyStoreUpdate();
    return true;
  } catch (e) {
    return false;
  }
}

// ==========================================
// --- CERTIFICATES STORE ---
// ==========================================
export function getCertificates() {
  return INITIAL_CERTS || [];
}

// ==========================================
// --- AUTHENTICATION ---
// ==========================================
export function checkAdminAuth() {
  try {
    if (typeof window !== 'undefined') {
      const auth = sessionStorage.getItem(STORAGE_KEYS.AUTH) || localStorage.getItem(STORAGE_KEYS.AUTH);
      return auth === 'authenticated';
    }
  } catch (e) {}
  return false;
}

export function adminLogin(password, remember = false) {
  const validPasscodes = ['marvex123', 'admin@marvex', 'marvex2026', 'admin123'];
  if (validPasscodes.includes(password.trim())) {
    try {
      if (remember) {
        localStorage.setItem(STORAGE_KEYS.AUTH, 'authenticated');
      }
      sessionStorage.setItem(STORAGE_KEYS.AUTH, 'authenticated');
      return { success: true };
    } catch (e) {}
  }
  return { success: false, error: 'Invalid admin credentials. Please try again.' };
}

export function adminLogout() {
  try {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(STORAGE_KEYS.AUTH);
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
  } catch (e) {}
}
