import { getCartCount } from "../cart.js";

export function renderHeader(onSearch, onCartOpen) {
  const header = document.getElementById("site-header");
  header.innerHTML = `
    <div class="header" style="display:flex;justify-content:space-between;align-items:center;padding:1rem 2rem;">
      <div><strong>🛍️ Storefront</strong></div>
      <input id="search" type="text" placeholder="Søg produkter..." style="width:40%;padding:0.5rem;border-radius:8px;border:1px solid #ccc;">
      <div>
        <button id="open-cart">🛒 <span id="cart-count">${getCartCount()}</span></button>
      </div>
    </div>
  `;

  document.getElementById("search").addEventListener("input", (e) => {
    onSearch(e.target.value);
  });

  document.getElementById("open-cart").addEventListener("click", onCartOpen);
}

export function updateCartCount() {
  document.getElementById("cart-count").textContent = getCartCount();
}