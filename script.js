document.querySelectorAll('.service-filters__button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.service-filters__button').forEach((item) => item.classList.remove('service-filters__button--active'));
    button.classList.add('service-filters__button--active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.services__item').forEach((card) => {
      card.classList.toggle('services__item--hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

document.querySelectorAll('.service-card__order').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('#orderService').value = button.dataset.service;
    bootstrap.Modal.getOrCreateInstance(document.querySelector('#orderModal')).show();
  });
});

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const localDate = new Date(tomorrow.getTime() - tomorrow.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const dateField = document.querySelector('#orderDate');
dateField.min = localDate;

function handleDemoForm(form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    form.querySelector('.form__success').hidden = false;
  });
}

document.querySelectorAll('#orderForm, #contactForm').forEach(handleDemoForm);

const backToTop = document.querySelector('.back-to-top');

function updateBackToTop() {
  backToTop.hidden = window.scrollY < 320;
}

if (backToTop) {
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  window.addEventListener('pageshow', updateBackToTop);
  updateBackToTop();
}
