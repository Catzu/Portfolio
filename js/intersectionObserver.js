const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;

    if (el.classList.contains('reveal')) el.classList.add('visible');

    if (el.classList.contains('glitch-title')) {
      setTimeout(() => {
        el.classList.add('glitching');
        setTimeout(() => el.classList.remove('glitching'), 420);
      }, 360);
    }

    if (el.classList.contains('stat-block-anim')) {
      el.querySelectorAll('[data-count]').forEach(n => {
        const target = parseInt(n.dataset.count);
        const dur = 1200, step = 16;
        const inc = target / (dur / step);
        let cur = 0;
        const t = setInterval(() => {
          cur = Math.min(cur + inc, target);
          n.textContent = Math.round(cur);
          if (cur >= target) clearInterval(t);
        }, step);
      });
    }

    if (el.classList.contains('cv-entry')) {
      setTimeout(() => el.classList.add('line-visible'), 80);
    }

    io.unobserve(el);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .glitch-title, .stat-block-anim, .cv-entry').forEach(el => io.observe(el));