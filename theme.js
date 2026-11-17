const theme = document.documentElement;

try {
  const savedTheme = localStorage.getItem('cleaning-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') theme.dataset.bsTheme = savedTheme;
} catch {}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  function updateLabel() {
    const label = theme.dataset.bsTheme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему';
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
  }

  updateLabel();
  toggle.addEventListener('click', () => {
    theme.classList.add('theme-transition');
    theme.dataset.bsTheme = theme.dataset.bsTheme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('cleaning-theme', theme.dataset.bsTheme); } catch {}
    updateLabel();
  });
});
