import { addToCart } from "../cart.js";
import { formatPrice } from "../utils.js";
import { updateCartCount } from "./header.js";
import { getProductById } from "../api.js";

export function renderProducts(list, onOpenDetails) {
  const main = document.getElementById("main-content");
  main.innerHTML = `
    <div class="grid">
      ${list
        .map(
          (p) => `
        <div class="card" data-id="${p.id}">
          <img src="${p.thumbnail}" alt="${p.title}">
          <h3>${p.title}</h3>
          <p>${formatPrice(p.price)}</p>
          <button class="buy-btn" data-id="${p.id}">Køb nu</button>
        </div>`
        )
        .join("")}
    </div>
  `;

  // "Køb nu"
  document.querySelectorAll(".buy-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const product = list.find((p) => p.id === id);
      addToCart(product);
      updateCartCount();
    })
  );

  // Klik på kort
  document.querySelectorAll(".card").forEach((card) =>
    card.addEventListener("click", () => onOpenDetails(card.dataset.id))
  );
}

export async function renderProductDetails(id) {
  const product = await getProductById(id);
  const main = document.getElementById("main-content");

  main.innerHTML = `
    <div style="display:flex;gap:2rem;padding:2rem">
      <img src="${product.thumbnail}" style="width:300px;height:200px;object-fit:cover;border-radius:8px">
      <div>
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <strong>${formatPrice(product.price)}</strong><br><br>
        <button id="buy-now">Køb nu</button>
      </div>
    </div>
  `;

  document
    .getElementById("buy-now")
    .addEventListener("click", () => {
      addToCart(product);
      updateCartCount();
      alert("Tilføjet til kurv!");
    });
}