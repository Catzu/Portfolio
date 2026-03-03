let _ticking=false;
window.addEventListener('scroll', () => {
  if(_ticking)return;
  _ticking=true;
  requestAnimationFrame(()=>{
    const fade = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.6));
    document.getElementById('glCanvas').style.opacity = fade;
    document.getElementById('carOverlay').style.opacity = fade;
    _ticking=false;
  });
});