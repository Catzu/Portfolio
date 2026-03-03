const specList = document.querySelector('.about-grid-specs');
if (specList) {
  const specObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.spec-val[data-val]').forEach((v, rowIdx) => {
        const text = v.dataset.val;
        v.textContent = '';
        v.classList.add('typing');
        let i = 0;
        setTimeout(() => {
          const iv = setInterval(() => {
            v.textContent = text.slice(0, ++i);
            if (i >= text.length) { clearInterval(iv); v.classList.remove('typing'); v.classList.add('typed'); }
          }, 22);
        }, rowIdx * 140 + 300);
      });
      specObs.unobserve(entry.target);
    });
  }, { threshold: 0.2 });
  specObs.observe(specList);
}