const menuButton=document.querySelector('.menu-button');
const siteNav=document.querySelector('.site-nav');
if(menuButton&&siteNav){menuButton.addEventListener('click',()=>{const open=siteNav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});}

const copyButton=document.getElementById('copy-contract');
if(copyButton){copyButton.addEventListener('click',async()=>{const text=document.getElementById('contract').textContent;const status=document.getElementById('copy-status');try{await navigator.clipboard.writeText(text);status.textContent='The Archive preserved it.';}catch{status.textContent='Copy unavailable on this browser.';}setTimeout(()=>status.textContent='',2500);});}

const revealObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const canvas=document.getElementById('void-canvas');
if(canvas){const ctx=canvas.getContext('2d');let w,h,dpr,particles=[];function resize(){dpr=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);particles=Array.from({length:Math.min(90,Math.floor(w/12))},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.4+.2,v:Math.random()*.18+.03,a:Math.random()*.55+.08}));}function frame(){ctx.clearRect(0,0,w,h);for(const p of particles){p.y-=p.v;if(p.y<0){p.y=h;p.x=Math.random()*w;}ctx.beginPath();ctx.fillStyle=`rgba(189,132,255,${p.a})`;ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();}requestAnimationFrame(frame);}addEventListener('resize',resize);resize();frame();}
