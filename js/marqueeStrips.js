const MARQUEE_ITEMS = ['WEBGL','·','THREE.JS','·','JAVASCRIPT','·','PHP','·','MYSQL','·','CSS3','·','WORDPRESS','·','FIGMA','·','JAVA','·','AUTO TECHNICUS','·','NEFKENS PEUGEOT','·','ALMERE — DEN BOSCH','·'];
function buildMarquee(id) {
  const el = document.getElementById(id);
  if (!el) return;
  let html = '';
  for (let r = 0; r < 4; r++) {
    MARQUEE_ITEMS.forEach(t => { html += `<span${t==='·'?' class="accent"':''}>${t}</span>`; });
  }
  el.innerHTML = html + html;
}

buildMarquee('marqueeInner');

const dr=document.getElementById('dotsRow');
for(let i=0;i<36;i++){const s=document.createElement('span');dr.appendChild(s);}

const CARS=[
  {id:'h2',   file:'img/vehicle/h2.glb',   label:'H2',   defaultColor:'#00A651'},
  {id:'r34',  file:'img/vehicle/r34.glb',  label:'R34',  defaultColor:'#274B7E'},
  {id:'rx7',  file:'img/vehicle/rx7.glb',  label:'RX-7', defaultColor:'#F36F21'},
  {id:'s2000',file:'img/vehicle/s2000.glb',label:'S2000',defaultColor:'#FF4FA3'},
  {id:'v4r',  file:'img/vehicle/v4r.glb',  label:'V4R',  defaultColor:'#CC0000'},
];

let activeCarIdx=Math.floor(Math.random()*CARS.length);

function hexToRgb01(hex){
  const h=hex.replace('#','');
  return[parseInt(h.slice(0,2),16)/255,parseInt(h.slice(2,4),16)/255,parseInt(h.slice(4,6),16)/255];
}

let waveRgb=hexToRgb01(CARS[activeCarIdx].defaultColor);
let waveRgbTarget=[...waveRgb];

const vertSrc=`attribute vec4 a_position;void main(){gl_Position=a_position;}`;
const fragSrc=`
precision mediump float;
uniform float u_time;uniform vec2 u_resolution;uniform float u_pxSize;
uniform vec3 u_fgColor;uniform vec3 u_bgColor;
float bayer8(vec2 uv){
  int x=int(mod(uv.x,8.0));int y=int(mod(uv.y,8.0));int i=y*8+x;
  if(i==0)return 0.0/64.0;if(i==1)return 32.0/64.0;if(i==2)return 8.0/64.0;if(i==3)return 40.0/64.0;
  if(i==4)return 2.0/64.0;if(i==5)return 34.0/64.0;if(i==6)return 10.0/64.0;if(i==7)return 42.0/64.0;
  if(i==8)return 48.0/64.0;if(i==9)return 16.0/64.0;if(i==10)return 56.0/64.0;if(i==11)return 24.0/64.0;
  if(i==12)return 50.0/64.0;if(i==13)return 18.0/64.0;if(i==14)return 58.0/64.0;if(i==15)return 26.0/64.0;
  if(i==16)return 12.0/64.0;if(i==17)return 44.0/64.0;if(i==18)return 4.0/64.0;if(i==19)return 36.0/64.0;
  if(i==20)return 14.0/64.0;if(i==21)return 46.0/64.0;if(i==22)return 6.0/64.0;if(i==23)return 38.0/64.0;
  if(i==24)return 60.0/64.0;if(i==25)return 28.0/64.0;if(i==26)return 52.0/64.0;if(i==27)return 20.0/64.0;
  if(i==28)return 62.0/64.0;if(i==29)return 30.0/64.0;if(i==30)return 54.0/64.0;if(i==31)return 22.0/64.0;
  if(i==32)return 3.0/64.0;if(i==33)return 35.0/64.0;if(i==34)return 11.0/64.0;if(i==35)return 43.0/64.0;
  if(i==36)return 1.0/64.0;if(i==37)return 33.0/64.0;if(i==38)return 9.0/64.0;if(i==39)return 41.0/64.0;
  if(i==40)return 51.0/64.0;if(i==41)return 19.0/64.0;if(i==42)return 59.0/64.0;if(i==43)return 27.0/64.0;
  if(i==44)return 49.0/64.0;if(i==45)return 17.0/64.0;if(i==46)return 57.0/64.0;if(i==47)return 25.0/64.0;
  if(i==48)return 15.0/64.0;if(i==49)return 47.0/64.0;if(i==50)return 7.0/64.0;if(i==51)return 39.0/64.0;
  if(i==52)return 13.0/64.0;if(i==53)return 45.0/64.0;if(i==54)return 5.0/64.0;if(i==55)return 37.0/64.0;
  if(i==56)return 63.0/64.0;if(i==57)return 31.0/64.0;if(i==58)return 55.0/64.0;if(i==59)return 23.0/64.0;
  if(i==60)return 61.0/64.0;if(i==61)return 29.0/64.0;if(i==62)return 53.0/64.0;return 21.0/64.0;
}
void main(){
  float t=0.5*u_time;
  vec2 pxUv=gl_FragCoord.xy;pxUv-=0.5*u_resolution;pxUv/=u_pxSize;
  vec2 shapeUv=floor(pxUv)*u_pxSize/u_resolution.xy+0.5-0.5;shapeUv*=4.0;
  float wave=cos(0.5*shapeUv.x-2.0*t)*sin(1.5*shapeUv.x+t)*(0.75+0.25*cos(3.0*t));
  float shape=1.0-smoothstep(-1.0,1.0,shapeUv.y+wave);
  float dith=bayer8(pxUv)-0.5;float res=step(0.5,shape+dith);
  gl_FragColor=vec4(u_fgColor*res+u_bgColor*(1.0-res),1.0);
}`;

function mkShader(gl,t,s){const sh=gl.createShader(t);gl.shaderSource(sh,s);gl.compileShader(sh);return sh;}
function mkProg(gl,v,f){const p=gl.createProgram();gl.attachShader(p,v);gl.attachShader(p,f);gl.linkProgram(p);return p;}

const heroSection=document.getElementById('hero-section');
const wc=document.getElementById('glCanvas');
const gl=wc.getContext('webgl')||wc.getContext('experimental-webgl');
let uFg,uBg;
if(gl){
  const prog=mkProg(gl,mkShader(gl,gl.VERTEX_SHADER,vertSrc),mkShader(gl,gl.FRAGMENT_SHADER,fragSrc));
  const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const al=gl.getAttribLocation(prog,'a_position');gl.enableVertexAttribArray(al);gl.vertexAttribPointer(al,2,gl.FLOAT,false,0,0);
  const uT=gl.getUniformLocation(prog,'u_time'),uR=gl.getUniformLocation(prog,'u_resolution'),uP=gl.getUniformLocation(prog,'u_pxSize');
  uFg=gl.getUniformLocation(prog,'u_fgColor');uBg=gl.getUniformLocation(prog,'u_bgColor');
  const t0=Date.now();
  function rz(){wc.width=heroSection.clientWidth;wc.height=heroSection.clientHeight;gl.viewport(0,0,wc.width,wc.height);}
  window.addEventListener('resize',rz);rz();
  (function frame(){
    for(let i=0;i<3;i++) waveRgb[i]+=(waveRgbTarget[i]-waveRgb[i])*0.04;
    const t=(Date.now()-t0)*0.0015;
    gl.useProgram(prog);
    gl.uniform1f(uT,t);gl.uniform2f(uR,wc.width,wc.height);gl.uniform1f(uP,2);
    gl.uniform3f(uFg,waveRgb[0],waveRgb[1],waveRgb[2]);
    gl.uniform3f(uBg,waveRgb[0]*0.08,waveRgb[1]*0.08,waveRgb[2]*0.08);
    gl.drawArrays(gl.TRIANGLES,0,6);requestAnimationFrame(frame);
  })();
}