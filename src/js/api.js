const API_BASE = 'https://dummyjson.com';

// Cache for products to avoid repeated API calls
let productsCache = null;
let categoriesCache = null;

/**
 * Fetch all products from DummyJSON API
 * @returns {Promise<Array>} Array of products
 */
export async function getProducts() {
  if (productsCache) {
    return productsCache;
  }
  
  try {
    const response = await fetch(`${API_BASE}/products`);
    const data = await response.json();
    productsCache = data.products.map(product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      desc: product.description,
      img: product.thumbnail,
      category: product.category,
      brand: product.brand,
      rating: product.rating,
      stock: product.stock
    }));
    return productsCache;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Get all categories from DummyJSON API
 * @returns {Promise<Array>} Array of categories
 */
export async function getCategories() {
  if (categoriesCache) {
    return categoriesCache;
  }
  
  try {
    const response = await fetch(`${API_BASE}/products/categories`);
    const data = await response.json();
    categoriesCache = data;
    return categoriesCache;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Get products by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} Array of products in category
 */
export async function getProductsByCategory(category) {
  try {
    const response = await fetch(`${API_BASE}/products/category/${category}`);
    const data = await response.json();
    return data.products.map(product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      desc: product.description,
      img: product.thumbnail,
      category: product.category,
      brand: product.brand,
      rating: product.rating,
      stock: product.stock
    }));
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

/**
 * Get single product by ID
 * @param {number} id - Product ID
 * @returns {Promise<Object|null>} Product object or null
 */
export async function getProductById(id) {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`);
    const product = await response.json();
    
    if (product.id) {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        desc: product.description,
        img: product.thumbnail,
        category: product.category,
        brand: product.brand,
        rating: product.rating,
        stock: product.stock,
        images: product.images
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
}

/**
 * Search products by query
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of matching products
 */
export async function searchProducts(query) {
  try {
    const response = await fetch(`${API_BASE}/products/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.products.map(product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      desc: product.description,
      img: product.thumbnail,
      category: product.category,
      brand: product.brand,
      rating: product.rating,
      stock: product.stock
    }));
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

// Legacy functions for backward compatibility
export const fetchAll = getProducts;
export const fetchByCategory = getProductsByCategory;
export const fetchById = getProductById;