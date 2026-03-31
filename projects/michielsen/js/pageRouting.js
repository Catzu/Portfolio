const pages = {
  home: 'page-home', diensten: 'page-diensten',
  apk: 'page-apk', onderhoud: 'page-onderhoud',
  airco: 'page-airco', aankoop: 'page-aankoop',
  laswerk: 'page-laswerk', overons: 'page-overons',
  prijslijst: 'page-prijslijst', contact: 'page-contact',
  disclaimer: 'page-disclaimer', privacy: 'page-privacy'
};
function showPage(key, el) {
  if (el) el.preventDefault ? el.preventDefault() : null;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pageEl = document.getElementById(pages[key]);
  if (pageEl) {
    pageEl.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    triggerReveals();
  }
  // Update active nav link
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === key);
  });
  // Handle nav transparency - only transparent on home at top
  const nav = document.getElementById('nav');
  if (key === 'home' && window.scrollY <= 60) {
    nav.classList.remove('solid');
    nav.style.background = 'transparent';
    nav.style.backdropFilter = 'none';
    nav.style.webkitBackdropFilter = 'none';
  } else {
    nav.classList.add('solid');
    nav.style.background = '';
    nav.style.backdropFilter = '';
    nav.style.webkitBackdropFilter = '';
  }
  return false;
}