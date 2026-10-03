(function(){
var CAPS=[
 [
  "Cosmic Latte",
  "Good coffee. Deeper thoughts."
 ],
 [
  "Slow Sip Iced Latte",
  "Artisan coffee, crafted for your everyday magic."
 ],
 [
  "Signature Heart Latte",
  "Latte art made for lingering."
 ],
 [
  "Caramel Cloud Latte",
  "Rich flavors. Real ingredients. Made with heart."
 ],
 [
  "Chocolate Cookie Frappe",
  "Great coffee. Better people."
 ],
 [
  "Layered Iced Latte",
  "Bold espresso. Creamy milk. Unforgettable moments."
 ],
 [
  "Iced Magic",
  "Same great coffee, new beautiful moments."
 ],
 [
  "Vanilla Moon",
  "Smooth, creamy, dreamy. Just like you."
 ],
 [
  "Cold Brew",
  "Freshly brewed. Always."
 ]
];
var nav=document.getElementById('nav'),heroImg=document.querySelector('.hero img'),htxt=document.getElementById('htxt'),
 secs=[].slice.call(document.querySelectorAll('.pinsec')),run=document.getElementById('menu'),light=document.getElementById('light'),
 cap=document.getElementById('cap'),cnt=document.getElementById('cnt'),ttl=document.querySelector('.ttl'),end=document.querySelector('.end'),
 its=[].slice.call(document.querySelectorAll('.it')),all=[ttl].concat(its,[end]),N=all.length,SP=1500,cam=0,shown=-1,
 reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function prog(){var r=run.getBoundingClientRect();return Math.min(1,Math.max(0,-r.top/(run.offsetHeight-innerHeight)))}
function tick(){
 var y=scrollY;nav.classList.toggle('solid',y>40);
 if(y<innerHeight*1.3){heroImg.style.transform='translateY('+(y*.18)+'px) scale(var(--s))';htxt.style.transform='translateY('+(-y*.15)+'px)';[].forEach.call(document.querySelectorAll('.hero .st'),function(e){e.style.transform='translateY('+(-y*e.dataset.sp)+'px)'});htxt.style.opacity=Math.max(0,1-y/(innerHeight*.7))}
 secs.forEach(function(s){var r=s.getBoundingClientRect();s.classList.toggle('on-img',r.top<innerHeight*.55);s.classList.toggle('on-text',r.top<-innerHeight*.1)});
 var t=prog()*(N-1)*SP;cam+=(t-cam)*(reduce?1:.35);if(Math.abs(t-cam)<.5)cam=t;
 all.forEach(function(el,i){var d=i*SP-cam,o=d>0?1-(d-SP*.5)/(SP*.5):1+d/450;o=Math.max(0,Math.min(1,o));
  el.style.opacity=o;el.style.visibility=o<=0?'hidden':'visible';el.style.transform='translate(-50%,-50%) translate3d(0,0,'+(-d)+'px)'});
 light.style.transform='translateX('+(-cam*.06)+'px)';
 var idx=Math.round(cam/SP)-1;
 if(idx!==shown){shown=idx;if(idx>=0&&idx<CAPS.length){cap.querySelector('h3').textContent=CAPS[idx][0];cap.querySelector('p').textContent=CAPS[idx][1];cap.classList.add('on');cnt.textContent=(idx+1)+' / '+CAPS.length}else{cap.classList.remove('on');cnt.textContent=''}}
 requestAnimationFrame(tick)}
function layout(){
 var V=innerWidth,Hh=innerHeight,nh=nav.offsetHeight,mob=V<=800,hero=document.getElementById('home'),h1=htxt.querySelector('h1');
 document.documentElement.style.setProperty('--nh',nh+'px');
 if(mob){['left','top','width','height','objectFit','webkitMaskImage','maskImage'].forEach(function(p){heroImg.style[p]=''});htxt.style.top='';htxt.style.width='';h1.style.fontSize=''}
 else{
  var H=hero.offsetHeight,top=nh+10,avail=H-top-14,Hi=Math.min(avail/.68,V*9/16),Wi=Hi*16/9,offX=(V-Wi)/2,imgTop=Math.max(H-Hi,top-.25*Hi),s=heroImg.style;
  s.objectFit='fill';s.left=offX+'px';s.top=imgTop+'px';s.width=Wi+'px';s.height=Hi+'px';
  var m=offX>4?'linear-gradient(to right,transparent,#000 5%,#000 95%,transparent)':'none';s.webkitMaskImage=m;s.maskImage=m;
  var tw=Math.max(240,Math.min(V*.36,offX+.365*Wi-V*.05-28));
  htxt.style.width=tw+'px';htxt.style.top=(nh+(H-nh)*.1)+'px';h1.style.fontSize=Math.min(tw/6.7,92)+'px'}
 [].forEach.call(document.querySelectorAll('.stage'),function(st){
  var im=st.querySelector('img'),s=im.style;
  if(im.dataset.pos===undefined)im.dataset.pos=s.objectPosition||'';
  if(mob||V/Hh<1.55){st.classList.remove('fit');['position','top','height','width','left','right','objectFit','webkitMaskImage','maskImage'].forEach(function(p){s[p]=''});s.objectPosition=im.dataset.pos}
  else{var h=Hh-nh,m2='linear-gradient(to right,transparent,#000 22%)';st.classList.add('fit');s.position='absolute';s.top=nh+'px';s.height=h+'px';s.width=(h*1.5)+'px';s.left='auto';s.right='0';s.objectFit='fill';s.objectPosition='';s.webkitMaskImage=m2;s.maskImage=m2}
 });
}
layout();addEventListener('resize',layout);addEventListener('load',layout);
tick();
})();