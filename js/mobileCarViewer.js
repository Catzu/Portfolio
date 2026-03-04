'use strict';
const mobileBreakpoint = window.matchMedia('(max-width: 480px)');

const mobileOverlay = document.getElementById('mobileCarOverlay');
const mobileOC = mobileOverlay.getContext('2d');
const mobileTHidden = document.getElementById('mobile-three-hidden');

const mobileScene = new THREE.Scene();
const mobileCam = new THREE.PerspectiveCamera(42, 1, 0.01, 1000);
mobileCam.position.set(0, 0.2, 4.5);
mobileCam.lookAt(0, 0.2, 0);

const mobileRenderer = new THREE.WebGLRenderer({canvas:mobileTHidden,antialias:true,alpha:true,preserveDrawingBuffer:true});
mobileRenderer.setClearColor(0,0);
mobileRenderer.setPixelRatio(1);
mobileRenderer.outputEncoding = THREE.sRGBEncoding;
mobileRenderer.toneMapping = THREE.ACESFilmicToneMapping;
mobileRenderer.toneMappingExposure = 1.4;

mobileScene.add(new THREE.AmbientLight(0xffffff,0.15));
const mkl=new THREE.DirectionalLight(0xffffff,4.5);mkl.position.set(3,6,5);mobileScene.add(mkl);
const mfl=new THREE.DirectionalLight(0xffffff,0.8);mfl.position.set(-4,2,2);mobileScene.add(mfl);
const mrl=new THREE.DirectionalLight(0xffffff,2.5);mrl.position.set(0,3,-6);mobileScene.add(mrl);

const mrc=document.createElement('canvas'),mrx=mrc.getContext('2d',{willReadFrequently:true});
let mobileCarModel=null,mobileAutoY=Math.PI*0.5,mobileIsLoading=false;
let mobileRX=0,mobileRY=0;
let mobileInitialized=false;

function resizeMobileThree(){
  const wrap=document.getElementById('mobile-car-wrap');
  const dpr=devicePixelRatio||1;
  const w=Math.round(wrap.clientWidth*dpr);
  const h=Math.round(wrap.clientHeight*dpr);
  mobileOverlay.width=w;mobileOverlay.height=h;
  mobileOverlay.style.width=wrap.clientWidth+'px';
  mobileOverlay.style.height=wrap.clientHeight+'px';
  mobileTHidden.width=w;mobileTHidden.height=h;
  mobileRenderer.setSize(w,h,false);
  mobileCam.aspect=w/h;mobileCam.updateProjectionMatrix();
  mrc.width=w;mrc.height=h;
}

function drawMobileCar(){
  const w=mobileOverlay.width,h=mobileOverlay.height;
  mrx.clearRect(0,0,w,h);
  mrx.drawImage(mobileTHidden,0,0);
  const pix=mrx.getImageData(0,0,w,h).data;
  const dpr=devicePixelRatio||1;
  const cell=Math.max(2,Math.round(3.5*dpr));
  const cols=Math.ceil(w/cell),rows=Math.ceil(h/cell);
  let maxA=0;
  for(let i=3;i<pix.length;i+=4)maxA=Math.max(maxA,pix[i]);
  if(maxA<4)return;
  for(let cy=0;cy<rows;cy++){
    for(let cx=0;cx<cols;cx++){
      const px=Math.min(Math.floor((cx+0.5)*cell),w-1);
      const py=Math.min(Math.floor((cy+0.5)*cell),h-1);
      const ii=(py*w+px)*4;
      const a=pix[ii+3];
      if(a<8)continue;
      const lum=(0.299*pix[ii]+0.587*pix[ii+1]+0.114*pix[ii+2])/255;
      const th=BAYER8[(((cy%8)+8)%8)*8+(((cx%8)+8)%8)]/64-0.5;
      if(lum+th>=0.5){
        const v=Math.round(Math.min(255,lum*320));
        mobileOC.fillStyle=`rgb(${v},${v},${v})`;
      }else{
        mobileOC.fillStyle='#000000';
      }
      mobileOC.fillRect(cx*cell,cy*cell,cell-1,cell-1);
    }
  }
}

function loadMobileCar(fileId){
  if(mobileIsLoading)return;
  mobileIsLoading=true;
  if(mobileCarModel){mobileScene.remove(mobileCarModel);mobileCarModel=null;}

  const mlo=document.getElementById('mobile-load-overlay');
  const mfill=document.getElementById('mobileOverlayFill');
  const mpct=document.getElementById('mobileOverlayPct');
  mlo.classList.remove('gone');
  if(mfill)mfill.style.width='0%';
  if(mpct)mpct.textContent='LOADING 0%';

  new THREE.GLTFLoader().load(
    CARS[fileId].file,
    gltf=>{
      const m=gltf.scene;
      const box=new THREE.Box3().setFromObject(m);
      const ctr=box.getCenter(new THREE.Vector3()),sz=box.getSize(new THREE.Vector3());
      const sc=3.8/Math.max(sz.x,sz.y,sz.z);
      m.scale.setScalar(sc);m.position.copy(ctr.multiplyScalar(-sc));
      m.position.y-=sz.y*sc*0.08;
      m.traverse(c=>{if(c.isMesh){[].concat(c.material).forEach(mt=>{mt.roughness=0.15;mt.metalness=0.9;mt.envMapIntensity=0;});}});
      mobileScene.add(m);mobileCarModel=m;
      mobileIsLoading=false;
      mobileAutoY=Math.PI*0.5;mobileRX=0;mobileRY=0;
      if(mfill)mfill.style.width='100%';
      if(mpct)mpct.textContent='LOADING 100%';
      setTimeout(()=>{mlo.classList.add('gone');},300);
    },
    xhr=>{
      const p=xhr.total?Math.round(xhr.loaded/xhr.total*100):0;
      if(mfill)mfill.style.width=p+'%';
      if(mpct)mpct.textContent='LOADING '+p+'%';
    },
    e=>{console.error(e);mobileIsLoading=false;mlo.classList.add('gone');}
  );
}

// Touch drag
let mtx=0,mty=0,mvx=0,mvy=0;
const mobileWrap=document.getElementById('mobile-car-wrap');
mobileWrap.addEventListener('touchstart',e=>{
  if(e.touches.length===1){mtx=e.touches[0].clientX;mty=e.touches[0].clientY;mvx=mvy=0;}
},{passive:true});
mobileWrap.addEventListener('touchmove',e=>{
  if(e.touches.length===1){
    const dx=e.touches[0].clientX-mtx,dy=e.touches[0].clientY-mty;
    mtx=e.touches[0].clientX;mty=e.touches[0].clientY;
    mvx=dx;mvy=dy;
    mobileRY+=dx*0.008;
    mobileRX=Math.max(-0.5,Math.min(0.5,mobileRX+dy*0.005));
    e.preventDefault();
  }
},{passive:false});

// Render loop
(function mobileLoop(){
  requestAnimationFrame(mobileLoop);
  if(!mobileBreakpoint.matches)return;
  if(!mobileCarModel)return;
  mvx*=0.88;mvy*=0.88;
  mobileRY+=mvx*0.004;
  mobileRX=Math.max(-0.5,Math.min(0.5,mobileRX+mvy*0.003));
  mobileAutoY-=0.006;
  mobileCarModel.rotation.y=mobileRY+mobileAutoY;
  mobileCarModel.rotation.x=mobileRX;
  mobileCam.position.z=4.5;mobileCam.position.y=0.2;
  mobileRenderer.render(mobileScene,mobileCam);
  mobileOC.clearRect(0,0,mobileOverlay.width,mobileOverlay.height);
  drawMobileCar();
})();

// Breakpoint init
function onMobileBreakpointChange(e){
  if(e.matches&&!mobileInitialized){
    mobileInitialized=true;
    resizeMobileThree();
    loadMobileCar(activeCarIdx);
  }
}
mobileBreakpoint.addEventListener('change',onMobileBreakpointChange);
if(mobileBreakpoint.matches){
  mobileInitialized=true;
  resizeMobileThree();
  loadMobileCar(activeCarIdx);
}

window.addEventListener('resize',()=>{
  if(mobileBreakpoint.matches)resizeMobileThree();
});