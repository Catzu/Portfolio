function selectCar(idx){
  if(idx===activeCarIdx&&carModel&&mobileCarModel)return;
  activeCarIdx=idx;
  if(mobileBreakpoint.matches){
    loadMobileCar(idx);
  } else {
    loadCar(idx);
  }
  setWaveColor(CARS[idx].defaultColor);
  setAccentColor(CARS[idx].defaultColor);
  document.querySelectorAll('.slot-btn').forEach((b,i)=>b.classList.toggle('active',i===idx));
  document.querySelectorAll('.car-slot').forEach((s,i)=>{s.style.opacity=i===idx?'1':'0.8';});
}