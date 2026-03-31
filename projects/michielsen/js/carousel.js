let carouselIndex = 0;
let carouselVisible = 3;
let carouselTotal = 0;
let carouselAutoTimer = null;

function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const dotsEl = document.getElementById('carouselDots');
  if (!track || !dotsEl) return;
  const cards = track.querySelectorAll('.rev-card');
  carouselTotal = cards.length;
  carouselIndex = 0;
  carouselVisible = window.innerWidth < 700 ? 1 : window.innerWidth < 1050 ? 2 : 3;
  const gap = 20;
  const outerW = track.parentElement.offsetWidth;
  const cardW = (outerW - gap * (carouselVisible - 1)) / carouselVisible;
  cards.forEach(c => {
    c.style.minWidth = cardW + 'px';
    c.style.maxWidth = cardW + 'px';
    c.style.flexShrink = '0';
  });
  const totalPages = carouselTotal - carouselVisible + 1;
  dotsEl.innerHTML = '';
  for (let i = 0; i < totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    btn.onclick = () => goToSlide(i);
    dotsEl.appendChild(btn);
  }
  goToSlide(0);
  startAutoPlay();
}

function goToSlide(idx) {
  const track = document.getElementById('carouselTrack');
  const dotsEl = document.getElementById('carouselDots');
  if (!track) return;
  const gap = 20;
  const outerW = track.parentElement.offsetWidth;
  const cardW = (outerW - gap * (carouselVisible - 1)) / carouselVisible;
  const totalPages = carouselTotal - carouselVisible + 1;
  carouselIndex = Math.max(0, Math.min(idx, totalPages - 1));
  const offset = carouselIndex * (cardW + gap);
  track.style.transform = 'translateX(-' + offset + 'px)';
  if (dotsEl) dotsEl.querySelectorAll('.carousel-dot').forEach((d, i) => {
    d.classList.toggle('active', i === carouselIndex);
  });
}

function carouselNext() {
  const totalPages = carouselTotal - carouselVisible + 1;
  goToSlide(carouselIndex >= totalPages - 1 ? 0 : carouselIndex + 1);
  resetAutoPlay();
}
function carouselPrev() {
  const totalPages = carouselTotal - carouselVisible + 1;
  goToSlide(carouselIndex <= 0 ? totalPages - 1 : carouselIndex - 1);
  resetAutoPlay();
}
function startAutoPlay() {
  clearInterval(carouselAutoTimer);
  carouselAutoTimer = setInterval(() => {
    const totalPages = carouselTotal - carouselVisible + 1;
    goToSlide(carouselIndex >= totalPages - 1 ? 0 : carouselIndex + 1);
  }, 4500);
}
function resetAutoPlay() {
  clearInterval(carouselAutoTimer);
  startAutoPlay();
}

window.addEventListener('load', () => { setTimeout(initCarousel, 150); });
window.addEventListener('resize', () => { clearTimeout(window._crt); window._crt = setTimeout(initCarousel, 200); });