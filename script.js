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
