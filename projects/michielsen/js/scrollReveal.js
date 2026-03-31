function triggerReveals() {
  setTimeout(() => {
    const els = document.querySelectorAll('.page.active .reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('up'); } });
    }, { threshold: 0.1 });
    els.forEach(el => { el.classList.remove('up'); obs.observe(el); });
  }, 50);
}
triggerReveals();