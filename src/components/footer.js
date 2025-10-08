export function renderFooter() {
  const footer = document.getElementById("site-footer");
  footer.innerHTML = `
    <div style="display:flex;justify-content:space-between;flex-wrap:wrap;padding:1rem 2rem;">
      <div>
        <h4>Kontakt</h4>
        <p>info@storefront.dk<br>+45 12 34 56 78</p>
      </div>
      <div>
        <h4>Adresse</h4>
        <p>Storegade 1<br>1000 København</p>
      </div>
      <div>
        <h4>Links</h4>
        <a href="#">Handelsbetingelser</a><br>
        <a href="#">Bankinfo</a>
      </div>
    </div>
  `;
}