(function() {
  let sx = 0;
  document.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, {passive:true});
  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) { dx < 0 ? carouselNext() : carouselPrev(); }
  }, {passive:true});
})();