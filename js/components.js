/* Header / Footer Web Components — fetch-based partials */

class SiteHeader extends HTMLElement {
  async connectedCallback() {
    try {
      const res = await fetch('/partials/header.html');
      if (!res.ok) throw new Error(res.status);
      this.innerHTML = await res.text();
      this._highlightCurrentPage();
    } catch {
      this.innerHTML = `<header class="site-header"><div class="container">
        <a href="/" class="site-logo">りゃーの<span>マンガ</span>感想</a>
      </div></header>`;
    }
  }

  _highlightCurrentPage() {
    const path = location.pathname;
    this.querySelectorAll('.site-nav a').forEach(a => {
      const href = a.getAttribute('href');
      if (href !== '/' && path.startsWith(href)) {
        a.style.color = 'var(--color-accent)';
      }
    });
  }
}

class SiteFooter extends HTMLElement {
  async connectedCallback() {
    try {
      const res = await fetch('/partials/footer.html');
      if (!res.ok) throw new Error(res.status);
      this.innerHTML = await res.text();
    } catch {
      this.innerHTML = `<footer class="site-footer"><div class="container">
        <p class="footer-copy">&copy; ${new Date().getFullYear()} りゃーのマンガ感想</p>
      </div></footer>`;
    }
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
