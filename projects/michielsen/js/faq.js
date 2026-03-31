function toggleFaq(el) {
  const item = el.closest('.faq-item');
  const allItems = document.querySelectorAll('.faq-item.open');
  allItems.forEach(i => { if (i !== item) i.classList.remove('open'); });
  item.classList.toggle('open');
}