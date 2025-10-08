export function renderNav(categories, onSelect) {
  const nav = document.getElementById("site-nav");
  nav.innerHTML = `
    <div class="navbar">
      ${categories
        .map(
          (cat) =>
            `<button class="nav-btn" data-cat="${cat}">${cat}</button>`
        )
        .join("")}
    </div>
  `;

  document.querySelectorAll(".nav-btn").forEach((btn) =>
    btn.addEventListener("click", () => onSelect(btn.dataset.cat))
  );
}