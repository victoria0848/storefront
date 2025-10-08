const CART_KEY = 'eshop_cart_v2';
let cartState = JSON.parse(localStorage.getItem(CART_KEY) || '[]');

/**
 * Add product to cart
 * @param {Object} product - Product object
 * @param {number} quantity - Quantity to add (default: 1)
 */
export function addToCart(product, quantity = 1) {
  const existingItem = cartState.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.qty += quantity;
  } else {
    cartState.push({ 
      ...product, 
      qty: quantity,
      addedAt: new Date().toISOString()
    });
  }
  
  persist();
  dispatchCartUpdate();
}

/**
 * Remove product from cart
 * @param {string|number} productId - Product ID to remove
 */
export function removeFromCart(productId) {
  cartState = cartState.filter(item => item.id != productId);
  persist();
  dispatchCartUpdate();
}

/**
 * Update product quantity in cart
 * @param {string|number} productId - Product ID
 * @param {number} quantity - New quantity
 */
export function updateCartQuantity(productId, quantity) {
  const item = cartState.find(item => item.id == productId);
  
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.qty = quantity;
      persist();
      dispatchCartUpdate();
    }
  }
}

/**
 * Clear entire cart
 */
export function clearCart() {
  cartState = [];
  persist();
  dispatchCartUpdate();
}

/**
 * Get current cart items
 * @returns {Array} Array of cart items
 */
export function getCart() {
  return [...cartState];
}

/**
 * Get total price of all items in cart
 * @returns {number} Total price
 */
export function getTotal() {
  return cartState.reduce((total, item) => total + (item.price * item.qty), 0);
}

/**
 * Get total number of items in cart
 * @returns {number} Total quantity
 */
export function getCartItemCount() {
  return cartState.reduce((total, item) => total + item.qty, 0);
}

/**
 * Check if cart is empty
 * @returns {boolean} True if cart is empty
 */
export function isCartEmpty() {
  return cartState.length === 0;
}

/**
 * Get cart summary
 * @returns {Object} Cart summary with totals
 */
export function getCartSummary() {
  const subtotal = getTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;
  
  return {
    subtotal,
    shipping,
    total,
    itemCount: getCartItemCount(),
    isEmpty: isCartEmpty()
  };
}

/**
 * Save cart to localStorage
 */
function persist() {
  localStorage.setItem(CART_KEY, JSON.stringify(cartState));
}

/**
 * Dispatch cart update event
 */
function dispatchCartUpdate() {
  const event = new CustomEvent('cartUpdated', {
    detail: {
      cart: getCart(),
      total: getTotal(),
      itemCount: getCartItemCount()
    }
  });
  window.dispatchEvent(event);
}

/**
 * Initialize cart from localStorage
 */
export function initializeCart() {
  cartState = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  dispatchCartUpdate();
}

/**
 * Export cart data for checkout
 * @returns {Object} Cart data ready for server
 */
export function exportCartForCheckout() {
  return {
    items: cartState.map(item => ({
      productId: item.id,
      title: item.title,
      price: item.price,
      quantity: item.qty
    })),
    summary: getCartSummary(),
    timestamp: new Date().toISOString()
  };
}