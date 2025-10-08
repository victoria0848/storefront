import { getCartItemCount } from '../cart.js';
import { getCategories } from '../api.js';

export function Header() {
  const el = document.createElement('header');
  el.className = 'header';
  
  el.innerHTML = `
    <div class="container header-inner">
      <div class="brand">
        <div class="logo">🏪</div>
        <div class="brand-text">
          <h1>Eshop</h1>
          <span class="tagline">Din online butik</span>
        </div>
      </div>
      
      <div class="search-container">
        <input class="search" placeholder="Søg produkter..." />
        <button class="search-btn">🔍</button>
      </div>
      
      <nav class="nav">
        <a href="#/" class="nav-link">Home</a>
        <div class="dropdown">
          <button class="dropdown-toggle">Kategorier</button>
          <div class="dropdown-menu">
            <div class="loading-categories">Indlæser kategorier...</div>
          </div>
        </div>
      </nav>
      
      <div class="cart" onclick="location.hash='#/cart'">
        <div class="cart-icon">🛒</div>
        <span class="count">0</span>
        <span class="cart-text">Kurv</span>
      </div>
    </div>
  `;

  // Add search functionality
  const searchInput = el.querySelector('.search');
  const searchBtn = el.querySelector('.search-btn');
  
  function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
      location.hash = `#/search/${encodeURIComponent(query)}`;
    }
  }
  
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  // Add dropdown functionality
  const dropdown = el.querySelector('.dropdown');
  const dropdownToggle = el.querySelector('.dropdown-toggle');
  
  dropdownToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('active');
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    dropdown.classList.remove('active');
  });

  // Load categories asynchronously
  loadCategories();

  async function loadCategories() {
    try {
      const categories = await getCategories();
      const dropdownMenu = el.querySelector('.dropdown-menu');
      dropdownMenu.innerHTML = categories.map(category => 
        `<a href="#/category/${category}">${category.charAt(0).toUpperCase() + category.slice(1)}</a>`
      ).join('');
    } catch (error) {
      console.error('Error loading categories:', error);
      const dropdownMenu = el.querySelector('.dropdown-menu');
      dropdownMenu.innerHTML = '<div class="error">Fejl ved indlæsning af kategorier</div>';
    }
  }

  return el;
}