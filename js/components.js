/* Header / Footer Web Components — fetch-based partials */

class SiteHeader extends HTMLElement {
  async connectedCallback() {
    try {
      const res = await fetch('/partials/header.html');
      if (!res.ok) throw new Error(res.status);
      this.innerHTML = await res.text();
      this._highlightCurrentPage();
    } catch {
      this.innerHTML = `<header class="site-header">
        <a href="/" class="site-logo">りゃーの<em>マンガ</em>感想</a>
      </header>`;
    }
  }

  _highlightCurrentPage() {
    const path = location.pathname;
    this.querySelectorAll('.site-nav a').forEach(a => {
      const href = a.getAttribute('href');
      if (href !== '/' && path.startsWith(href)) {
        a.style.color = 'var(--color-text)';
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
      // Re-execute scripts inserted via innerHTML
      this.querySelectorAll('script').forEach(oldScript => {
        const newScript = document.createElement('script');
        newScript.textContent = oldScript.textContent;
        oldScript.parentNode.replaceChild(newScript, oldScript);
      });
    } catch {
      this.innerHTML = `<footer class="site-footer">
        <p class="footer-brand">&copy; ${new Date().getFullYear()} りゃーのマンガ感想</p>
      </footer>`;
    }
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);


/* ============================================================
   Editorial Enhancements — Reading Progress, TOC, Reveal
   ============================================================ */

/* Reading progress bar — only on review article pages */
function initReadingProgress() {
  const article = document.querySelector('.article-layout .article-body');
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

/* Active TOC highlight — observes article-body section[id] */
function initActiveTOC() {
  setTimeout(() => {
    const tocLinks = document.querySelectorAll('.toc-list a');
    const sections = document.querySelectorAll('.article-body section[id]');
    if (!tocLinks.length || !sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tocLinks.forEach(a => {
            const li = a.closest('li');
            const isActive = a.getAttribute('href') === '#' + id;
            if (li) li.classList.toggle('is-active', isActive);
            a.classList.toggle('is-active', isActive);
          });
        }
      });
    }, { rootMargin: '-15% 0px -70% 0px' });

    sections.forEach(s => observer.observe(s));
  }, 200);
}

/* Reveal-on-scroll for body sections */
function initRevealOnScroll() {
  const targets = document.querySelectorAll('.body-section');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(t => observer.observe(t));
}

window.addEventListener('DOMContentLoaded', () => {
  initReadingProgress();
  initActiveTOC();
  initRevealOnScroll();
});
