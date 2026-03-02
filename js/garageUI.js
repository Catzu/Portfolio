const slotsEl=document.getElementById('garageSlots');

function setWaveColor(hex){waveRgbTarget=hexToRgb01(hex);}
function setAccentColor(hex){
  document.documentElement.style.setProperty('--accent', hex);
}