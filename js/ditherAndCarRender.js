'use strict';
const BAYER8=[0,32,8,40,2,34,10,42,48,16,56,24,50,18,58,26,12,44,4,36,14,46,6,38,60,28,52,20,62,30,54,22,3,35,11,43,1,33,9,41,51,19,59,27,49,17,57,25,15,47,7,39,13,45,5,37,63,31,55,23,61,29,53,21];

const overlay=document.getElementById('carOverlay');
const oc=overlay.getContext('2d');
const heroSec=document.getElementById('hero-section');

function resizeOverlay(){
  const dpr=devicePixelRatio||1;
  overlay.width=Math.round(heroSec.clientWidth*dpr);
  overlay.height=Math.round(heroSec.clientHeight*dpr);
  overlay.style.width=heroSec.clientWidth+'px';
  overlay.style.height=heroSec.clientHeight+'px';
}
resizeOverlay();

function carRect(){
  return{x:0,y:0,w:overlay.width,h:overlay.height};
}

const threeCanvas=document.getElementById('three-hidden');
const scene=new THREE.Scene();
const cam=new THREE.PerspectiveCamera(32,1,0.01,1000);
cam.position.set(-0.6,-0.3,5);cam.lookAt(-0.6,-0.3,0);

const renderer=new THREE.WebGLRenderer({canvas:threeCanvas,antialias:true,alpha:true,preserveDrawingBuffer:true});
renderer.setClearColor(0,0);renderer.setPixelRatio(1);
renderer.outputEncoding=THREE.sRGBEncoding;
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.4;

scene.add(new THREE.AmbientLight(0xffffff,0.15));
const kl=new THREE.DirectionalLight(0xffffff,4.5);kl.position.set(3,6,5);scene.add(kl);
const fl=new THREE.DirectionalLight(0xffffff,0.8);fl.position.set(-4,2,2);scene.add(fl);
const rl=new THREE.DirectionalLight(0xffffff,2.5);rl.position.set(0,3,-6);scene.add(rl);

const rc=document.createElement('canvas'),rx=rc.getContext('2d');

function resizeThree(){
  const r=carRect();
  threeCanvas.width=r.w;threeCanvas.height=r.h;
  renderer.setSize(r.w,r.h,false);
  cam.aspect=overlay.width/overlay.height;cam.updateProjectionMatrix();
  rc.width=r.w;rc.height=r.h;
}
resizeThree();

const loadEl=document.getElementById('car-loading');
function posLoad(){
  const dpr=devicePixelRatio||1;
  loadEl.style.left=(overlay.width/dpr/2)+'px';
  loadEl.style.top=(overlay.height/dpr/2)+'px';
  loadEl.style.transform='translate(-50%,-50%)';
}
posLoad();
window.addEventListener('resize',()=>{resizeOverlay();resizeThree();posLoad();});

let carModel=null,autoY=Math.PI*0.5,isLoading=false;
let rX=0,rY=0;

function loadCar(fileId){
  if(isLoading)return;
  isLoading=true;
  if(carModel){scene.remove(carModel);carModel=null;}
  loadEl.style.display='none';

  new THREE.GLTFLoader().load(
    CARS[fileId].file,
    gltf=>{
      const m=gltf.scene;
      const box=new THREE.Box3().setFromObject(m);
      const ctr=box.getCenter(new THREE.Vector3()),sz=box.getSize(new THREE.Vector3());
      const sc=3.2/Math.max(sz.x,sz.y,sz.z);
      m.scale.setScalar(sc);m.position.copy(ctr.multiplyScalar(-sc));
      m.position.y-=sz.y*sc*0.08;
      m.traverse(c=>{if(c.isMesh){[].concat(c.material).forEach(mt=>{mt.roughness=0.15;mt.metalness=0.9;mt.envMapIntensity=0;});}});
      scene.add(m);carModel=m;
      isLoading=false;
      autoY=Math.PI*0.5;rX=0;rY=0;

      const np=document.getElementById('car-nameplate');
      np.textContent=CARS[fileId].label;
      np.classList.add('show');
      setTimeout(()=>np.classList.remove('show'),2200);
    },
    xhr=>{if(xhr.total)loadEl.textContent=`LOADING ${Math.round(xhr.loaded/xhr.total*100)}%`;},
    e=>{console.error(e);loadEl.textContent='ERROR';isLoading=false;
    }
  );
}

loadCar(activeCarIdx);

let drag=false,lmx=0,lmy=0,vx=0,vy=0;
const CAM_Z=6;

function inHero(cy){return cy<heroSec.getBoundingClientRect().bottom;}
function inCarArea(cx,cy){return cx>window.innerWidth*0.4&&inHero(cy);}

window.addEventListener('mousedown',e=>{
  if(!inCarArea(e.clientX,e.clientY))return;
  drag=true;lmx=e.clientX;lmy=e.clientY;vx=vy=0;heroSec.style.cursor='grabbing';
});
window.addEventListener('mousemove',e=>{
  if(inCarArea(e.clientX,e.clientY)&&!drag)heroSec.style.cursor='grab';
  else if(!drag)heroSec.style.cursor='';
  if(!drag)return;
  const dx=e.clientX-lmx,dy=e.clientY-lmy;lmx=e.clientX;lmy=e.clientY;
  vx=dx;vy=dy;
  rY+=dx*0.008;
  rX=Math.max(-0.5,Math.min(0.5,rX+dy*0.005));
});
window.addEventListener('mouseup',()=>{drag=false;heroSec.style.cursor='';});

let tx=0,ty=0;
heroSec.addEventListener('touchstart',e=>{
  if(e.touches.length===1){tx=e.touches[0].clientX;ty=e.touches[0].clientY;vx=vy=0;}
},{passive:true});
heroSec.addEventListener('touchmove',e=>{
  if(e.touches.length===1){
    const dx=e.touches[0].clientX-tx,dy=e.touches[0].clientY-ty;
    tx=e.touches[0].clientX;ty=e.touches[0].clientY;
    vx=dx;vy=dy;rY+=dx*0.008;rX=Math.max(-0.5,Math.min(0.5,rX+dy*0.005));
    e.preventDefault();
  }
},{passive:false});

function drawCar(){
  const r=carRect();
  rx.clearRect(0,0,r.w,r.h);
  rx.drawImage(threeCanvas,0,0);
  const pix=rx.getImageData(0,0,r.w,r.h).data;
  const dpr=devicePixelRatio||1;
  const cell=Math.max(2,Math.round(3.5*dpr));
  const cols=Math.ceil(r.w/cell),rows=Math.ceil(r.h/cell);
  let maxA=0;
  for(let i=3;i<pix.length;i+=4)maxA=Math.max(maxA,pix[i]);
  if(maxA<4)return;
  for(let cy=0;cy<rows;cy++){
    for(let cx=0;cx<cols;cx++){
      const px=Math.min(Math.floor((cx+0.5)*cell),r.w-1);
      const py=Math.min(Math.floor((cy+0.5)*cell),r.h-1);
      const i=(py*r.w+px)*4;
      const a=pix[i+3];
      if(a<8)continue;
      const lum=(0.299*pix[i]+0.587*pix[i+1]+0.114*pix[i+2])/255;
      const th=BAYER8[(((cy%8)+8)%8)*8+(((cx%8)+8)%8)]/64-0.5;
      if(lum+th>=0.5){
        const v=Math.round(Math.min(255,lum*320));
        oc.fillStyle=`rgb(${v},${v},${v})`;
      }else{
        oc.fillStyle=`#000000`;
      }
      oc.fillRect(r.x+cx*cell,r.y+cy*cell,cell-1,cell-1);
    }
  }
}

(function loop(){
  requestAnimationFrame(loop);
  if(!carModel)return;
  if(!drag){vx*=0.88;vy*=0.88;rY+=vx*0.004;rX=Math.max(-0.5,Math.min(0.5,rX+vy*0.003));}
  autoY-=0.006;
  carModel.rotation.y=rY+autoY;carModel.rotation.x=rX;
  cam.position.z=CAM_Z;cam.position.y=0.5;
  renderer.render(scene,cam);
  oc.clearRect(0,0,overlay.width,overlay.height);
  drawCar();
})();