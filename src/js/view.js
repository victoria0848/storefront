/**
 * View module - Contains all render functions for DOM manipulation
 */

/**
 * Render a product card
 * @param {Object} product - Product object
 * @returns {HTMLElement} Product card element
 */
export function renderProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.innerHTML = `
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
  return card;
}

/**
 * Render product details
 * @param {Object} product - Product object
 * @returns {HTMLElement} Product details element
 */
export function renderProductDetails(product) {
  const layout = document.createElement('div');
  layout.className = 'product-detail';

  layout.innerHTML = `
    <div class="product-gallery">
      <div class="main-image">
        <img src="${product.img}" alt="${product.title}" />
      </div>
      ${product.images ? `
        <div class="product-thumbnails">
          ${product.images.slice(0, 4).map(img => `
            <img src="${img}" alt="${product.title}" class="thumbnail">
          `).join('')}
        </div>
      ` : ''}
    </div>
    <div class="product-info">
      <h1 class="product-title">${product.title}</h1>
      <p class="product-brand">Brand: ${product.brand}</p>
      <p class="product-category">Kategori: ${product.category}</p>
      <div class="product-rating">
        ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
        <span class="rating-text">(${product.rating}/5)</span>
      </div>
      <p class="product-description">${product.desc}</p>
      <div class="product-stock">
        <span class="stock-label">Lager:</span>
        <span class="stock-count ${product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock'}">
          ${product.stock > 0 ? `${product.stock} stk.` : 'Udsolgt'}
        </span>
      </div>
      <div class="product-price">
        <span class="price">${product.price} DKK</span>
      </div>
      <div class="product-actions">
        <button id="buy-now" class="btn btn-primary btn-large" ${product.stock === 0 ? 'disabled' : ''}>
          <span class="btn-text">Køb nu</span>
          <span class="btn-icon">🛒</span>
        </button>
        <button id="add-to-cart" class="btn btn-outline btn-large" ${product.stock === 0 ? 'disabled' : ''}>
          <span class="btn-text">Tilføj til kurv</span>
          <span class="btn-icon">➕</span>
        </button>
      </div>
      <div class="product-features">
        <h3>Produktdetaljer</h3>
        <ul>
          <li>Høj kvalitet</li>
          <li>Hurtig levering</li>
          <li>30 dages returret</li>
          <li>Gratis fragt over 500 DKK</li>
        </ul>
      </div>
    </div>
  `;

  return layout;
}

/**
 * Render cart items
 * @param {Array} cartItems - Array of cart items
 * @returns {HTMLElement} Cart element
 */
export function renderCart(cartItems) {
  const cartContainer = document.createElement('div');
  cartContainer.className = 'cart-container';

  if (cartItems.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <h3>Din kurv er tom</h3>
        <p>Udforsk vores produkter og tilføj dem til din kurv</p>
        <a href="#/" class="btn btn-primary">Gå til forsiden</a>
      </div>
    `;
  } else {
    const cartList = document.createElement('div');
    cartList.className = 'cart-list';

    cartItems.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <div class="cart-item-image">
          <img src="${item.img}" alt="${item.title}" />
        </div>
        <div class="cart-item-details">
          <h3 class="cart-item-title">${item.title}</h3>
          <p class="cart-item-category">${item.category}</p>
          <div class="cart-item-price">${item.price} DKK</div>
        </div>
        <div class="cart-item-quantity">
          <button class="qty-btn" data-id="${item.id}" data-action="decrease">-</button>
          <span class="qty">${item.qty}</span>
          <button class="qty-btn" data-id="${item.id}" data-action="increase">+</button>
        </div>
        <div class="cart-item-total">
          ${item.price * item.qty} DKK
        </div>
        <button class="remove-item" data-id="${item.id}">🗑️</button>
      `;
      cartList.appendChild(cartItem);
    });

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const shipping = total > 500 ? 0 : 50;

    const cartSummary = document.createElement('div');
    cartSummary.className = 'cart-summary';
    cartSummary.innerHTML = `
      <div class="summary-row">
        <span>Subtotal:</span>
        <span>${total} DKK</span>
      </div>
      <div class="summary-row">
        <span>Levering:</span>
        <span>${shipping === 0 ? 'Gratis' : `${shipping} DKK`}</span>
      </div>
      <div class="summary-row total">
        <span>Total:</span>
        <span>${total + shipping} DKK</span>
      </div>
      <button id="checkout" class="btn btn-primary btn-large">
        <span class="btn-text">Gennemfør køb</span>
        <span class="btn-icon">💳</span>
      </button>
    `;

    cartContainer.appendChild(cartList);
    cartContainer.appendChild(cartSummary);
  }

  return cartContainer;
}

/**
 * Render categories navigation
 * @param {Array} categories - Array of categories
 * @returns {HTMLElement} Categories navigation element
 */
export function renderCategories(categories) {
  const nav = document.createElement('nav');
  nav.className = 'nav';

  const homeLink = document.createElement('a');
  homeLink.href = '#/';
  homeLink.className = 'nav-link';
  homeLink.textContent = 'Home';
  nav.appendChild(homeLink);

  const dropdown = document.createElement('div');
  dropdown.className = 'dropdown';
  
  const dropdownToggle = document.createElement('button');
  dropdownToggle.className = 'dropdown-toggle';
  dropdownToggle.textContent = 'Kategorier';
  dropdown.appendChild(dropdownToggle);

  const dropdownMenu = document.createElement('div');
  dropdownMenu.className = 'dropdown-menu';
  
  categories.forEach(category => {
    const link = document.createElement('a');
    link.href = `#/category/${category}`;
    link.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    dropdownMenu.appendChild(link);
  });

  dropdown.appendChild(dropdownMenu);
  nav.appendChild(dropdown);

  return nav;
}

/**
 * Render hero section
 * @returns {HTMLElement} Hero section element
 */
export function renderHero() {
  const hero = document.createElement('section');
  hero.className = 'hero';
  hero.innerHTML = `
    <div class="hero-content">
      <h1>Velkommen til Eshop</h1>
      <p class="hero-subtitle">Udforsk vores fantastiske udvalg af kvalitetsprodukter</p>
      <div class="hero-actions">
        <a href="#/category/smartphones" class="btn btn-primary">Se smartphones</a>
        <a href="#/category/laptops" class="btn btn-outline">Se laptops</a>
      </div>
    </div>
    <div class="hero-image">
      <div class="hero-placeholder">🏪</div>
    </div>
  `;
  return hero;
}

/**
 * Render featured products section
 * @param {Array} products - Array of products
 * @returns {HTMLElement} Featured products section
 */
export function renderFeaturedProducts(products) {
  const section = document.createElement('section');
  section.className = 'featured-products';
  section.innerHTML = '<h2>Fremhævede produkter</h2>';
  
  const grid = document.createElement('div');
  grid.className = 'products-grid';
  
  products.forEach(product => {
    grid.appendChild(renderProductCard(product));
  });
  
  section.appendChild(grid);
  return section;
}

/**
 * Render search results
 * @param {string} query - Search query
 * @param {Array} products - Array of matching products
 * @returns {HTMLElement} Search results element
 */
export function renderSearchResults(query, products) {
  const content = document.createElement('div');
  
  const title = document.createElement('h2');
  title.textContent = `Søgeresultater for "${query}"`;
  title.className = 'page-title';
  content.appendChild(title);
  
  const grid = document.createElement('div');
  grid.className = 'products-grid';
  
  if (products.length === 0) {
    grid.innerHTML = '<p class="no-results">Ingen produkter fundet for din søgning.</p>';
  } else {
    products.forEach(product => {
      grid.appendChild(renderProductCard(product));
    });
  }
  
  content.appendChild(grid);
  return content;
}

/**
 * Render category page
 * @param {string} category - Category name
 * @param {Array} products - Array of products in category
 * @returns {HTMLElement} Category page element
 */
export function renderCategoryPage(category, products) {
  const content = document.createElement('div');
  
  const title = document.createElement('h2');
  title.textContent = `Kategori: ${category.charAt(0).toUpperCase() + category.slice(1)}`;
  title.className = 'page-title';
  content.appendChild(title);
  
  const grid = document.createElement('div');
  grid.className = 'products-grid';
  
  if (products.length === 0) {
    grid.innerHTML = '<p class="no-results">Ingen produkter i denne kategori.</p>';
  } else {
    products.forEach(product => {
      grid.appendChild(renderProductCard(product));
    });
  }
  
  content.appendChild(grid);
  return content;
}

/**
 * Render thanks page
 * @returns {HTMLElement} Thanks page element
 */
export function renderThanksPage() {
  const section = document.createElement('section');
  section.className = 'thanks-page';
  section.innerHTML = `
    <div class="thanks-content">
      <div class="thanks-icon">✅</div>
      <h2>Tak for dit køb!</h2>
      <p class="thanks-message">
        Vi har modtaget din ordre og behandler den nu.<br>
        Du modtager en bekræftelse pr. e-mail inden for få minutter.
      </p>
      <div class="thanks-actions">
        <a href="#/" class="btn btn-primary">Handl videre</a>
        <a href="#/cart" class="btn btn-outline">Se kurv</a>
      </div>
    </div>
  `;
  return section;
}

/**
 * Render error page
 * @param {string} message - Error message
 * @returns {HTMLElement} Error page element
 */
export function renderErrorPage(message = 'Siden blev ikke fundet') {
  const content = document.createElement('div');
  content.className = 'error-page';
  content.innerHTML = `
    <h2>404 - ${message}</h2>
    <p>Den side du leder efter eksisterer ikke.</p>
    <a href="#/" class="btn btn-primary">Gå til forsiden</a>
  `;
  return content;
}
