function toggleMobile() {
  const mn = document.getElementById('mobile-nav');
  mn.classList.toggle('open');
  const hb = document.getElementById('hamburger');
  const spans = hb.querySelectorAll('span');
  const open = mn.classList.contains('open');
  spans[0].style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = open ? '0' : '1';
  spans[2].style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
}