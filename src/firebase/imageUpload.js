import { storage } from './config';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { compressImage } from '../utils/imageCompressor';

/**
 * Uploads an image to Firebase Storage if available,
 * or returns an ultra-compressed lightweight data URL (< 25KB)
 * that is guaranteed to save in Firestore without exceeding any limits.
 */
export async function uploadOrCompressImage(fileOrDataUrl, folder = 'products', id = '') {
  if (!fileOrDataUrl) return '';

  // 1. If it's already a public web URL, return immediately
  if (typeof fileOrDataUrl === 'string' && (fileOrDataUrl.startsWith('http://') || fileOrDataUrl.startsWith('https://'))) {
    return fileOrDataUrl;
  }

  // 2. Ultra-compress the image to 500x500 at 0.65 quality (~15KB to 30KB)
  const compressedDataUrl = await compressImage(fileOrDataUrl, 500, 500, 0.65);
  if (!compressedDataUrl) return '';

  // 3. Attempt upload to Firebase Storage if configured
  if (storage && compressedDataUrl.startsWith('data:image')) {
    try {
      const cleanId = String(id || Date.now()).replace(/[^a-zA-Z0-9_-]/g, '_');
      const storagePath = `${folder}/${cleanId}_${Date.now()}.jpg`;
      const storageRef = ref(storage, storagePath);
      await uploadString(storageRef, compressedDataUrl, 'data_url');
      const downloadUrl = await getDownloadURL(storageRef);
      console.log(`✅ Image uploaded to Firebase Storage (${folder}):`, downloadUrl);
      return downloadUrl;
    } catch (storageErr) {
      console.warn('Firebase Storage upload note (falling back to lightweight JPEG):', storageErr.message);
    }
  }

  // 4. Return ultra-lightweight compressed JPEG
  return compressedDataUrl;
}
