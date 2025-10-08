import { addToCart, getCart } from '../cart.js';

export function ProductCard(product) {
  const el = document.createElement('article');
  el.className = 'product-card';
  el.innerHTML = `
    <div class="product-image">
      <img src="${product.img}" alt="${product.title}" loading="lazy">
      <div class="product-overlay">
        <button class="quick-view" data-id="${product.id}">👁️ Hurtig visning</button>
      </div>
    </div>
    <div class="product-content">
      <h3 class="product-title">${product.title}</h3>
      <p class="product-description">${product.desc}</p>
      <div class="product-meta">
        <span class="product-category">${product.category}</span>
        <span class="product-price">${product.price} DKK</span>
      </div>
      <div class="product-actions">
        <a href="#/product/${product.id}" class="btn btn-outline">Se detaljer</a>
        <button class="btn btn-primary add-to-cart" data-id="${product.id}">
          <span class="btn-text">Køb nu</span>
          <span class="btn-icon">🛒</span>
        </button>
      </div>
    </div>
  `;

  // Add click handlers
  const addToCartBtn = el.querySelector('.add-to-cart');
  const quickViewBtn = el.querySelector('.quick-view');
  
  addToCartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addToCart(product, 1);
    
    // Update button state
    addToCartBtn.classList.add('added');
    addToCartBtn.innerHTML = '<span class="btn-text">Tilføjet!</span><span class="btn-icon">✅</span>';
    
    // Update cart count in header
    const countEl = document.querySelector('.cart .count');
    if (countEl) countEl.textContent = getCart().length;
    
    // Reset button after 2 seconds
    setTimeout(() => {
      addToCartBtn.classList.remove('added');
      addToCartBtn.innerHTML = '<span class="btn-text">Køb nu</span><span class="btn-icon">🛒</span>';
    }, 2000);
  });
  
  quickViewBtn.addEventListener('click', (e) => {
    e.preventDefault();
    location.hash = `#/product/${product.id}`;
  });

  return el;
}