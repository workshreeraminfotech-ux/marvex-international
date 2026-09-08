// Centralized Dynamic Data & Admin Store for Marvex International
// Hybrid architecture: Instant Local UI responsiveness + Live Firebase Cloud Realtime Sync

import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';
import { BLOGS as INITIAL_BLOGS } from '../data/blogs';
import { 
  initFirestoreRealtimeSync,
  saveProductToCloud,
  deleteProductFromCloud,
  saveInquiryToCloud,
  updateInquiryStatusInCloud,
  deleteInquiryFromCloud,
  saveBlogToCloud,
  deleteBlogFromCloud
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

// Helper to normalize product category and subcategory safely
export function normalizeProduct(p) {
  if (!p) return null;
  let category = p.category || p.cat || 'Earthing Parts';
  let subcategory = p.subcategory || '';
  
  const lowerCat = String(category).trim().toLowerCase();
  if (lowerCat.includes('earth') || lowerCat.includes('ground') || lowerCat.includes('rod') || lowerCat.includes('lightning')) {
    category = 'Earthing Parts';
    subcategory = subcategory || 'Earth Rods & Conductors';
  } else if (lowerCat.includes('spice') || lowerCat.includes('agro') || lowerCat.includes('seed') || lowerCat.includes('cumin') || lowerCat.includes('turmeric') || lowerCat.includes('chilli') || lowerCat.includes('rice')) {
    category = 'Spices & Agro Commodities';
    subcategory = subcategory || 'Whole Spices';
  } else if (lowerCat.includes('hard') || lowerCat.includes('sanit') || lowerCat.includes('sink') || lowerCat.includes('basin') || lowerCat.includes('tap') || lowerCat.includes('shower') || lowerCat.includes('bath')) {
    category = 'Hardware & Sanitary Items';
    subcategory = subcategory || 'Kitchen Sinks';
  }

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
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(normalizeProduct).filter(Boolean);
        }
      }
    }
  } catch (e) {
    console.error('Error loading products from storage:', e);
  }
  return INITIAL_PRODUCTS.map(normalizeProduct).filter(Boolean);
}

export function saveProduct(productData) {
  try {
    const list = getProducts();
    const normalized = normalizeProduct(productData);
    if (!normalized) return false;

    const existingIdx = list.findIndex(p => p.id === normalized.id);
    let updated;
    if (existingIdx >= 0) {
      updated = [...list];
      updated[existingIdx] = normalized;
    } else {
      updated = [normalized, ...list];
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    }
    notifyStoreUpdate();

    // Async push to Firebase Firestore for cross-browser live sync
    saveProductToCloud(normalized);

    return true;
  } catch (e) {
    console.error('Error saving product:', e);
    return false;
  }
}

export function deleteProduct(productId) {
  try {
    const list = getProducts();
    const updated = list.filter(p => p.id !== productId);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    }
    notifyStoreUpdate();

    // Async delete from Firebase Firestore
    deleteProductFromCloud(productId);

    return true;
  } catch (e) {
    console.error('Error deleting product:', e);
    return false;
  }
}

export function resetProductsToDefault() {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    }
    notifyStoreUpdate();
    return true;
  } catch (e) {
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
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    }
  } catch (e) {}
  return INITIAL_BLOGS || [];
}

export function saveBlog(blogData) {
  try {
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
    saveBlogToCloud(newBlog);

    return true;
  } catch (e) {
    return false;
  }
}

export function deleteBlog(id) {
  try {
    const list = getBlogs();
    const updated = list.filter(b => b.id !== id);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(updated));
    }
    notifyStoreUpdate();

    // Async delete from Firestore
    deleteBlogFromCloud(id);

    return true;
  } catch (e) {
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
