export function Footer() {
  const el = document.createElement('footer');
  el.className = 'footer';
  el.innerHTML = `
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Kontakt os</h3>
          <p>📧 hej@eshop.example</p>
          <p>📞 +45 12 34 56 78</p>
          <p>📍 København, Danmark</p>
        </div>
        
        <div class="footer-section">
          <h3>Hurtige links</h3>
          <a href="#/">Forside</a>
          <a href="#/category/lamper">Lamper</a>
          <a href="#/category/møbler">Møbler</a>
          <a href="#/category/tekstiler">Tekstiler</a>
        </div>
        
        <div class="footer-section">
          <h3>Information</h3>
          <a href="#/about">Om os</a>
          <a href="#/shipping">Levering</a>
          <a href="#/returns">Returnering</a>
          <a href="#/privacy">Privatlivspolitik</a>
        </div>
        
        <div class="footer-section">
          <h3>Følg os</h3>
          <div class="social-links">
            <a href="#" class="social-link">📘 Facebook</a>
            <a href="#" class="social-link">📷 Instagram</a>
            <a href="#" class="social-link">🐦 Twitter</a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>© ${new Date().getFullYear()} Eshop - Alle rettigheder forbeholdes</p>
      </div>
    </div>
  `;
  return el;
}