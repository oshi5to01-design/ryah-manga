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


/* ============================================================
   Editorial Enhancements — Reading Progress, TOC, Reveal
   ============================================================ */

/* Reading progress bar — only on review pages */
function initReadingProgress() {
  const article = document.querySelector('.review-page-layout article');
  if (!article) return;

  const bar = document.createElement('div');
  bar.className = 'reading-progress';
  document.body.appendChild(bar);

  let ticking = false;
  const update = () => {
    const rect = article.getBoundingClientRect();
    const start = window.scrollY + rect.top;
    const total = rect.height - window.innerHeight;
    const scrolled = window.scrollY - start;
    const pct = Math.max(0, Math.min(100, (scrolled / total) * 100));
    bar.style.width = pct + '%';
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
}

/* Active TOC highlight — observes review-body h2s */
function initActiveTOC() {
  // TOC is built by inline scripts; wait a tick for it to populate.
  setTimeout(() => {
    const tocLinks = document.querySelectorAll('.toc a');
    const headings = document.querySelectorAll('.review-body h2');
    if (!tocLinks.length || !headings.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tocLinks.forEach(a => {
            const li = a.closest('li');
            if (!li) return;
            li.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-15% 0px -70% 0px' });

    headings.forEach(h => observer.observe(h));
  }, 150);
}

/* Reveal-on-scroll for h2 underlines and verdict box */
function initRevealOnScroll() {
  const targets = document.querySelectorAll('.review-body h2, .verdict-box');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  targets.forEach(t => observer.observe(t));
}

window.addEventListener('DOMContentLoaded', () => {
  initReadingProgress();
  initActiveTOC();
  initRevealOnScroll();
});
