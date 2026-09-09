// Menu mobile
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // fecha o menu ao clicar em um link (mobile)
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Copiar e-mail com feedback
const copyBtn = document.getElementById('copy-email');
const feedback = document.getElementById('copy-feedback');

if (copyBtn && feedback) {
  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      feedback.textContent = 'E-mail copiado — cola aí.';
    } catch (err) {
      feedback.textContent = email;
    }
    setTimeout(() => { feedback.textContent = ''; }, 3500);
  });
}

// Ano no rodapé
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
