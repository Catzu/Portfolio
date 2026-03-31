(function() {
  const nav = document.getElementById('nav');
  nav.style.background = 'transparent';
  nav.style.backdropFilter = 'none';
  nav.style.webkitBackdropFilter = 'none';
})();
function submitForm(btn) {
  btn.textContent = '✓ VERZONDEN — WIJ NEMEN CONTACT OP';
  btn.style.background = 'var(--teal)';
  btn.style.clipPath = 'none';
  btn.style.borderRadius = '6px';
  btn.disabled = true;
}