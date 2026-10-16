/* ============================================================================
   VELOURA PARFUMS - CONFIGURAÇÃO DE LINKS DO MERCADO LIVRE
   ============================================================================ */

// Configuração dos links para os anúncios do Mercado Livre
// Substitua as URLs vazias pelos links reais dos seus anúncios
const productLinks = {
  'L\'Amour': '',
  'Rose Noir': '',
  'Eau de Lumière': '',
  'Jardin Secrète': '',
  'Veloura Intense': ''
};

/* ============================================================================
   INICIALIZAÇÃO
   ============================================================================ */

document.addEventListener('DOMContentLoaded', function () {
  initNavigation();
  initMenu();
  initScrollEffects();
  initAnimationOnScroll();
});

function initMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.header-nav');
  if (!toggle || !nav) return;

  const close = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  };

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) close();
  });
}

/* ============================================================================
   NAVEGAÇÃO SUAVE
   ============================================================================ */

function initNavigation() {
  // Scroll suave para links de âncora
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ============================================================================
   ABERTURA DE LINKS DO MERCADO LIVRE
   ============================================================================ */

function openMercadoLivre(productName) {
  const url = productLinks[productName];

  if (url && url.length > 0) {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    // Se não houver link configurado, mostra alerta ou rola para a seção
    alert('O link para este produto estará disponível em breve.');
  }
}

/* ============================================================================
   SCROLL EFFECTS
   ============================================================================ */

function initScrollEffects() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScroll = 0;
  let ticking = false;

  const onScroll = () => {
    lastScroll = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (lastScroll > 50) {
          header.classList.add('scroll');
        } else {
          header.classList.remove('scroll');
        }
        ticking = false;
      });
    }
    ticking = true;
  };

  window.addEventListener('scroll', onScroll);
}

/* ============================================================================
   ANIMAÇÃO AO SCROLL (INTERSECTION OBSERVER)
   ============================================================================ */

function initAnimationOnScroll() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
}
