setAccentColor(CARS[activeCarIdx].defaultColor);

CARS.forEach((car,i)=>{
  const slot=document.createElement('div');
  slot.className='car-slot'+(i===activeCarIdx?' active':'');
  slot.style.opacity=i===activeCarIdx?'1':'0.8';
  const btn=document.createElement('button');
  btn.className='slot-btn'+(i===activeCarIdx?' active':'');
  btn.style.setProperty('--car-color',car.defaultColor);
  const tlAcc=document.createElement('span');tlAcc.className='s-acc s-tl';
  const brAcc=document.createElement('span');brAcc.className='s-acc s-br';
  const pip=document.createElement('span');pip.className='slot-pip';
  btn.appendChild(tlAcc);btn.appendChild(brAcc);btn.appendChild(pip);
  const name=document.createElement('span');
  name.className='slot-name';
  name.textContent=car.label;
  btn.addEventListener('click',()=>selectCar(i));
  slot.appendChild(btn);
  slot.appendChild(name);
  slotsEl.appendChild(slot);
});