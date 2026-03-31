window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  const homeActive = document.getElementById('page-home') && document.getElementById('page-home').classList.contains('active');
  if (homeActive && window.scrollY <= 60) {
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
});