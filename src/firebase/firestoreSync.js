import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  getDocs, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import { 
  normalizeProduct, 
  notifyStoreUpdate, 
  getProducts as getLocalProducts,
  getBlogs as getLocalBlogs 
} from '../utils/adminStore';

import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';
import { BLOGS as INITIAL_BLOGS } from '../data/blogs';

const COLLECTIONS = {
  PRODUCTS: 'marvex_products',
  INQUIRIES: 'marvex_inquiries',
  BLOGS: 'marvex_blogs'
};

const STORAGE_KEYS = {
  PRODUCTS: 'marvex_products_v2',
  INQUIRIES: 'marvex_inquiries_v2',
  BLOGS: 'marvex_blogs_v2'
};

let unsubProducts = null;
let unsubInquiries = null;
let unsubBlogs = null;
let isInitialized = false;

// Helper to clean undefined values before sending to Firestore
function sanitizeForFirestore(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  const clean = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val !== undefined && val !== null) {
      if (typeof val === 'object' && !Array.isArray(val) && !(val instanceof Date)) {
        clean[key] = sanitizeForFirestore(val);
      } else {
        clean[key] = val;
      }
    } else if (val === null) {
      clean[key] = '';
    }
  }
  return clean;
}

let isLocalSaving = false;

export function setLocalSavingState(isSaving) {
  isLocalSaving = isSaving;
}

// Initialize real-time synchronization
export function initFirestoreRealtimeSync() {
  if (typeof window === 'undefined' || !isFirebaseConfigured() || !db) {
    return false;
  }

  if (isInitialized) return true;
  isInitialized = true;

  try {
    // 1. PRODUCTS REALTIME LISTENER
    const productsRef = collection(db, COLLECTIONS.PRODUCTS);
    unsubProducts = onSnapshot(productsRef, (snapshot) => {
      if (isLocalSaving) return;

      if (!snapshot.empty) {
        const remoteProducts = [];
        snapshot.forEach((docSnap) => {
          remoteProducts.push({ id: docSnap.id, ...docSnap.data() });
        });
        const normalized = remoteProducts.map(normalizeProduct).filter(Boolean);
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(normalized));
        notifyStoreUpdate();
      } else {
        // If Firestore is empty, check if we currently have local products
        const local = getLocalProducts();
        if (local && local.length > 0) {
          // Push existing local products to Firestore instead of wiping them out
          local.forEach(p => saveProductToCloud(p));
        } else {
          localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify([]));
          notifyStoreUpdate();
        }
      }
    }, (error) => {
      console.warn('Firestore Products sync notice:', error.message);
    });

    // 2. INQUIRIES REALTIME LISTENER
    const inquiriesRef = collection(db, COLLECTIONS.INQUIRIES);
    unsubInquiries = onSnapshot(inquiriesRef, (snapshot) => {
      const remoteInquiries = [];
      snapshot.forEach((docSnap) => {
        remoteInquiries.push({ id: docSnap.id, ...docSnap.data() });
      });
      // Sort newest first
      remoteInquiries.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(remoteInquiries));
      notifyStoreUpdate();
    }, (error) => {
      console.warn('Firestore Inquiries sync notice:', error.message);
    });

    // 3. BLOGS REALTIME LISTENER
    const blogsRef = collection(db, COLLECTIONS.BLOGS);
    unsubBlogs = onSnapshot(blogsRef, (snapshot) => {
      if (isLocalSaving) return;

      if (!snapshot.empty) {
        const remoteBlogs = [];
        snapshot.forEach((docSnap) => {
          remoteBlogs.push({ id: docSnap.id, ...docSnap.data() });
        });
        localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(remoteBlogs));
        notifyStoreUpdate();
      } else {
        const localBlogs = getLocalBlogs();
        if (localBlogs && localBlogs.length > 0) {
          localBlogs.forEach(b => saveBlogToCloud(b));
        } else {
          localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify([]));
          notifyStoreUpdate();
        }
      }
    }, (error) => {
      console.warn('Firestore Blogs sync notice:', error.message);
    });

    return true;
  } catch (err) {
    console.error('Error starting Firestore real-time sync:', err);
    return false;
  }
}

// Seed initial products to Firestore when explicitly requested
export async function seedInitialDataToFirestore() {
  if (!db || !isFirebaseConfigured()) return;
  try {
    const defaultList = INITIAL_PRODUCTS.map(normalizeProduct).filter(Boolean);
    for (const prod of defaultList) {
      if (prod && prod.id) {
        const clean = sanitizeForFirestore(prod);
        const docRef = doc(db, COLLECTIONS.PRODUCTS, String(prod.id));
        await setDoc(docRef, clean, { merge: true });
      }
    }
    console.log('Seeded initial product catalog to Firestore successfully.');
  } catch (e) {
    console.warn('Auto-seed products note:', e.message);
  }
}

// Seed initial blogs to Firestore when explicitly requested
export async function seedInitialBlogsToFirestore() {
  if (!db || !isFirebaseConfigured()) return;
  try {
    const defaultBlogs = INITIAL_BLOGS || [];
    for (const b of defaultBlogs) {
      if (b && b.id) {
        const clean = sanitizeForFirestore(b);
        const docRef = doc(db, COLLECTIONS.BLOGS, String(b.id));
        await setDoc(docRef, clean, { merge: true });
      }
    }
  } catch (e) {}
}

// Clear all products from cloud
export async function clearProductsFromCloud() {
  if (!db || !isFirebaseConfigured()) return false;
  try {
    const productsRef = collection(db, COLLECTIONS.PRODUCTS);
    const snapshot = await getDocs(productsRef);
    const deletePromises = [];
    snapshot.forEach((docSnap) => {
      deletePromises.push(deleteDoc(docSnap.ref));
    });
    await Promise.all(deletePromises);
    return true;
  } catch (e) {
    console.error('Firestore clearProductsFromCloud error:', e);
    return false;
  }
}

// Clear all blogs from cloud
export async function clearBlogsFromCloud() {
  if (!db || !isFirebaseConfigured()) return false;
  try {
    const blogsRef = collection(db, COLLECTIONS.BLOGS);
    const snapshot = await getDocs(blogsRef);
    const deletePromises = [];
    snapshot.forEach((docSnap) => {
      deletePromises.push(deleteDoc(docSnap.ref));
    });
    await Promise.all(deletePromises);
    return true;
  } catch (e) {
    console.error('Firestore clearBlogsFromCloud error:', e);
    return false;
  }
}

// --- CLOUD CRUD: PRODUCTS ---
export async function saveProductToCloud(product) {
  if (!db || !isFirebaseConfigured()) return false;
  try {
    const normalized = normalizeProduct(product);
    if (!normalized || !normalized.id) return false;
    const clean = sanitizeForFirestore(normalized);
    const docRef = doc(db, COLLECTIONS.PRODUCTS, String(normalized.id));
    await setDoc(docRef, clean, { merge: true });
    return true;
  } catch (e) {
    console.error('Firestore saveProduct error:', e);
    return false;
  }
}

export async function deleteProductFromCloud(productId) {
  if (!db || !isFirebaseConfigured()) return false;
  try {
    const docRef = doc(db, COLLECTIONS.PRODUCTS, String(productId));
    await deleteDoc(docRef);
    return true;
  } catch (e) {
    console.error('Firestore deleteProduct error:', e);
    return false;
  }
}

// --- CLOUD CRUD: INQUIRIES ---
export async function saveInquiryToCloud(inquiry) {
  if (!db || !isFirebaseConfigured()) return false;
  try {
    if (!inquiry || !inquiry.id) return false;
    const clean = sanitizeForFirestore(inquiry);
    const docRef = doc(db, COLLECTIONS.INQUIRIES, String(inquiry.id));
    await setDoc(docRef, clean, { merge: true });
    return true;
  } catch (e) {
    console.error('Firestore saveInquiry error:', e);
    return false;
  }
}

export async function updateInquiryStatusInCloud(id, newStatus) {
  if (!db || !isFirebaseConfigured()) return false;
  try {
    const docRef = doc(db, COLLECTIONS.INQUIRIES, String(id));
    await setDoc(docRef, { status: newStatus }, { merge: true });
    return true;
  } catch (e) {
    console.error('Firestore updateInquiryStatus error:', e);
    return false;
  }
}

export async function deleteInquiryFromCloud(id) {
  if (!db || !isFirebaseConfigured()) return false;
  try {
    const docRef = doc(db, COLLECTIONS.INQUIRIES, String(id));
    await deleteDoc(docRef);
    return true;
  } catch (e) {
    console.error('Firestore deleteInquiry error:', e);
    return false;
  }
}

// --- CLOUD CRUD: BLOGS ---
export async function saveBlogToCloud(blog) {
  if (!db || !isFirebaseConfigured()) return false;
  try {
    if (!blog || !blog.id) return false;
    const clean = sanitizeForFirestore(blog);
    const docRef = doc(db, COLLECTIONS.BLOGS, String(blog.id));
    await setDoc(docRef, clean, { merge: true });
    return true;
  } catch (e) {
    console.error('Firestore saveBlog error:', e);
    return false;
  }
}

export async function deleteBlogFromCloud(id) {
  if (!db || !isFirebaseConfigured()) return false;
  try {
    const docRef = doc(db, COLLECTIONS.BLOGS, String(id));
    await deleteDoc(docRef);
    return true;
  } catch (e) {
    console.error('Firestore deleteBlog error:', e);
    return false;
  }
}
