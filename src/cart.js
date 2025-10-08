const STORAGE_KEY = "storefront_cart";

let cart = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

export function getCart() {
  return cart;
}

export function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function addToCart(product) {
  const existing = cart.find((p) => p.id === product.id);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  saveCart();
}

export function removeFromCart(id) {
  cart = cart.filter((p) => p.id !== id);
  saveCart();
}

export function clearCart() {
  cart = [];
  saveCart();
}

export function getCartCount() {
  return cart.reduce((sum, p) => sum + p.qty, 0);
}

export function getCartTotal() {
  return cart.reduce((sum, p) => sum + p.price * p.qty, 0);
}