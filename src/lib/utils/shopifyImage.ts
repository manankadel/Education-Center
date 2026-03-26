// src/lib/utils/shopifyImage.ts

/**
 * Optimizes Shopify Image URLs by appending transformation parameters.
 * This happens on Shopify's servers, not your user's phone.
 */
export const getShopifyImageUrl = (url: string, { width, height, crop }: { width?: number, height?: number, crop?: string } = {}) => {
  if (!url) return '';
  
  try {
    const urlObj = new URL(url);
    if (width) urlObj.searchParams.set('width', width.toString());
    if (height) urlObj.searchParams.set('height', height.toString());
    if (crop) urlObj.searchParams.set('crop', crop);
    
    // Convert to webp for best compression
    urlObj.searchParams.set('format', 'webp');
    
    return urlObj.toString();
  } catch (e) {
    return url;
  }
};