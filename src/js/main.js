import * as API from './api.js';
import * as View from './view.js';
import * as Cart from './cart.js';
import { Header } from '../components/header.js';
import { Footer } from '../components/footer.js';

const app = document.getElementById('app');

/**
 * Update cart count in header
 */
function updateCartCount() {
  const countEl = document.querySelector('.cart .count');
  if (countEl) {
    countEl.textContent = Cart.getCartItemCount();
  }
}

/**
 * Render the main layout with header, content, and footer
 * @param {HTMLElement} content - Content to display in main section
 */
function renderLayout(content) {
  app.innerHTML = '';
  app.appendChild(Header());
  
  const main = document.createElement('main');
  main.className = 'container';
  main.appendChild(content);
  app.appendChild(main);
  
  app.appendChild(Footer());
  updateCartCount();
}

/**
 * Show loading state
 * @returns {HTMLElement} Loading element
 */
function showLoading() {
  const loading = document.createElement('div');
  loading.className = 'loading';
  loading.innerHTML = `
    <div class="loading-spinner"></div>
    <p>Indlæser produkter...</p>
  `;
  return loading;
}

/**
 * Show error state
 * @param {string} message - Error message
 * @returns {HTMLElement} Error element
 */
function showError(message) {
  const error = document.createElement('div');
  error.className = 'error';
  error.innerHTML = `
    <h2>Fejl</h2>
    <p>${message}</p>
    <button onclick="location.reload()" class="btn btn-primary">Prøv igen</button>
  `;
  return error;
}

/**
 * Main routing function
 */
async function route() {
  const hash = location.hash || '#/';
  let content;

  try {
    // Show loading state
    content = showLoading();
    renderLayout(content);

    // FORSIDE
    if (hash === '#/' || hash === '') {
      const products = await API.getProducts();
      const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      const hero = View.renderHero();
      const featured = View.renderFeaturedProducts(randomProducts);
      
      content = document.createElement('div');
      content.appendChild(hero);
      content.appendChild(featured);
    }

    // SØGERESULTATER
    else if (hash.startsWith('#/search/')) {
      const query = decodeURIComponent(hash.split('/')[2]);
      const products = await API.searchProducts(query);
      content = View.renderSearchResults(query, products);
    }

    // KATEGORI-VISNING
    else if (hash.startsWith('#/category/')) {
      const category = decodeURIComponent(hash.split('/')[2]);
      const products = await API.getProductsByCategory(category);
      content = View.renderCategoryPage(category, products);
    }

    // PRODUKTDETALJE
    else if (hash.startsWith('#/product/')) {
      const productId = hash.split('/')[2];
      const product = await API.getProductById(productId);

      if (!product) {
        content = View.renderErrorPage('Produkt ikke fundet');
      } else {
        content = View.renderProductDetails(product);
        
        // Add event listeners for product actions
        const buyNowBtn = content.querySelector('#buy-now');
        const addToCartBtn = content.querySelector('#add-to-cart');
        
        if (buyNowBtn) {
          buyNowBtn.addEventListener('click', () => {
            Cart.addToCart(product, 1);
            location.hash = '#/cart';
          });
        }
        
        if (addToCartBtn) {
          addToCartBtn.addEventListener('click', () => {
            Cart.addToCart(product, 1);
            
            // Show feedback
            addToCartBtn.classList.add('added');
            addToCartBtn.innerHTML = '<span class="btn-text">Tilføjet!</span><span class="btn-icon">✅</span>';
            
            setTimeout(() => {
              addToCartBtn.classList.remove('added');
              addToCartBtn.innerHTML = '<span class="btn-text">Tilføj til kurv</span><span class="btn-icon">➕</span>';
            }, 2000);
          });
        }
      }
    }

    // INDKØBSKURV
    else if (hash === '#/cart') {
      const cartItems = Cart.getCart();
      const title = document.createElement('h2');
      title.textContent = 'Indkøbskurv';
      title.className = 'page-title';

      content = document.createElement('div');
      content.appendChild(title);
      content.appendChild(View.renderCart(cartItems));

      // Add event listeners for cart interactions
      content.addEventListener('click', (e) => {
        if (e.target.classList.contains('qty-btn')) {
          const productId = e.target.dataset.id;
          const action = e.target.dataset.action;
          const item = cartItems.find(i => i.id == productId);
          
          if (action === 'increase') {
            Cart.addToCart(item, 1);
          } else if (action === 'decrease') {
            Cart.updateCartQuantity(productId, item.qty - 1);
          }
        }
        
        if (e.target.classList.contains('remove-item')) {
          const productId = e.target.dataset.id;
          Cart.removeFromCart(productId);
        }
      });

      // Checkout button
      const checkoutBtn = content.querySelector('#checkout');
      if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
          // Simulate sending data to server
          const orderData = Cart.exportCartForCheckout();
          console.log('Sending order to server:', orderData);
          
          // Clear cart and redirect to thanks page
          Cart.clearCart();
          location.hash = '#/thanks';
        });
      }
    }

    // TAK FOR KØB
    else if (hash === '#/thanks') {
      content = View.renderThanksPage();
    }

    // FEJL / 404
    else {
      content = View.renderErrorPage();
    }

    renderLayout(content);

  } catch (error) {
    console.error('Error loading page:', error);
    content = showError('Der opstod en fejl ved indlæsning af siden.');
    renderLayout(content);
  }
}

/**
 * Initialize the application
 */
function initializeApp() {
  // Initialize cart from localStorage
  Cart.initializeCart();
  
  // Listen for cart updates
  window.addEventListener('cartUpdated', updateCartCount);
  
  // Set up routing
  window.addEventListener('hashchange', route);
  window.addEventListener('load', route);
  
  // Initialize first route
  route();
}

// Start the application
initializeApp();