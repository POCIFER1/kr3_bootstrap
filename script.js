const serviceFilters = document.querySelectorAll('.service-filters__button');
const serviceCards = document.querySelectorAll('.services__item');
const serviceCount = document.querySelector('#serviceCount');

serviceFilters.forEach((button) => {
  button.addEventListener('click', () => {
    serviceFilters.forEach((item) => {
      item.classList.toggle('service-filters__button--active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    let visibleCount = 0;
    serviceCards.forEach((card) => {
      const visible = button.dataset.filter === 'all' || card.dataset.category === button.dataset.filter;
      card.classList.toggle('services__item--hidden', !visible);
      if (visible) visibleCount += 1;
    });
    serviceCount.textContent = 'Найдено услуг: ' + visibleCount;
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
if (dateField) dateField.min = localDate;

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

document.querySelectorAll('.comparison-slider__range').forEach((range) => {
  const slider = range.closest('.comparison-slider');
  function updateComparison() {
    slider.style.setProperty('--split', range.value + '%');
    range.setAttribute('aria-valuetext', range.value + '% изображения до уборки');
  }
  range.addEventListener('input', updateComparison);
  window.addEventListener('pageshow', updateComparison);
  updateComparison();
});

const calculator = document.querySelector('#priceCalculator');
if (calculator) {
  const service = document.querySelector('#calcService');
  const area = document.querySelector('#calcArea');
  const total = document.querySelector('#calcTotal');
  const currency = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });

  function updatePrice() {
    const { min, rate } = service.selectedOptions[0].dataset;
    total.textContent = area.validity.valid
      ? 'Ориентир: ' + currency.format(Math.max(Number(min), area.valueAsNumber * Number(rate)))
      : 'Укажите площадь от 1 до 10 000 м².';
  }

  calculator.addEventListener('input', updatePrice);
  calculator.addEventListener('submit', (event) => {
    event.preventDefault();
    document.querySelector('#orderService').value = service.value;
    document.querySelector('#orderArea').value = area.value;
    bootstrap.Modal.getOrCreateInstance(document.querySelector('#orderModal')).show();
  });
  updatePrice();
}

const serviceDetails = document.querySelector('#serviceDetails');
if (serviceDetails) {
  serviceDetails.addEventListener('show.bs.modal', (event) => {
    const trigger = event.relatedTarget;
    const card = trigger.closest('.service-card');
    const service = card.querySelector('.service-card__order').dataset.service;
    serviceDetails.querySelector('#serviceDetailsTitle').textContent = service;
    serviceDetails.querySelector('#serviceDetailsDescription').textContent = trigger.dataset.description;
    serviceDetails.querySelector('#serviceDetailsPrice').textContent = card.querySelector('.service-card__price-row > span').textContent;
    serviceDetails.querySelector('#serviceDetailsList').replaceChildren(...card.querySelector('ul').cloneNode(true).children);

    serviceDetails.querySelector('#serviceDetailsOrder').onclick = () => {
      serviceDetails.addEventListener('hidden.bs.modal', () => {
        document.querySelector('#orderService').value = service;
        const orderModal = document.querySelector('#orderModal');
        orderModal.addEventListener('hidden.bs.modal', () => trigger.focus(), { once: true });
        bootstrap.Modal.getOrCreateInstance(orderModal).show();
      }, { once: true });
      bootstrap.Modal.getInstance(serviceDetails).hide();
    };
  });
}
