import { getProducts } from "./api.js";
import { renderHeader } from "./components/header.js";
import { renderNav } from "./components/nav.js";
import { renderFooter } from "./components/footer.js";
import { renderProducts, renderProductDetails } from "./components/products.js";
import {
  getCart,
  removeFromCart,
  clearCart,
  getCartTotal,
} from "./cart.js";
import { randomItems } from "./utils.js";
import { updateCartCount } from "./components/header.js";

const main = document.getElementById("main-content");

let products = [];

async function init() {
  renderHeader(handleSearch, showCart);
  renderFooter();

  products = await getProducts();
  const categories = [...new Set(products.map((p) => p.category))];
  renderNav(categories, filterByCategory);

  showRandomProducts();
}

// 🔎 Søgefunktion
function handleSearch(q) {
  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(q.toLowerCase())
  );
  renderProducts(filtered, showDetails);
}

// 🏷️ Kategorivisning
function filterByCategory(category) {
  const filtered = products.filter((p) => p.category === category);
  renderProducts(filtered, showDetails);
}

// 🎴 Random produkter
function showRandomProducts() {
  renderProducts(randomItems(products, 3), showDetails);
}

// 🔍 Detaljer
function showDetails(id) {
  renderProductDetails(id);
}

// 🛒 Kurv
function showCart() {
  const cart = getCart();
  main.innerHTML = `
    <div class="container" style="padding:2rem">
      <h2>Indkøbskurv</h2>
      ${
        cart.length === 0
          ? "<p>Kurven er tom</p>"
          : cart
              .map(
                (p) => `
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem">
          <img src="${p.thumbnail}" width="80" height="60">
          <div style="flex:1">
            <strong>${p.title}</strong> (${p.qty})
          </div>
          <div>${p.price * p.qty} DKK</div>
          <button class="remove" data-id="${p.id}">Fjern</button>
        </div>`
              )
              .join("") +
            `<strong>Samlet: ${getCartTotal()} DKK</strong><br><br>
             <button id="checkout">Køb</button>`
      }
    </div>
  `;

  document.querySelectorAll(".remove").forEach((btn) =>
    btn.addEventListener("click", () => {
      removeFromCart(parseInt(btn.dataset.id));
      showCart();
      updateCartCount();
    })
  );

  const checkoutBtn = document.getElementById("checkout");
  if (checkoutBtn)
    checkoutBtn.addEventListener("click", () => {
      clearCart();
      updateCartCount();
      main.innerHTML = `
        <div style="text-align:center;padding:3rem">
          <h2>Tak for dit køb!</h2>
          <p>Din ordre er modtaget.</p>
          <button id="continue">Handl videre</button>
        </div>
      `;
      document
        .getElementById("continue")
        .addEventListener("click", showRandomProducts);
    });
}

init();