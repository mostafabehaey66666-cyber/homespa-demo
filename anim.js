(function(){
try{
var d=document,de=d.documentElement,rm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
if(rm||!("IntersectionObserver" in window))return;
de.classList.add("js");
function add(sel,cls,step){d.querySelectorAll(sel).forEach(function(e,i){e.classList.add("rv");if(cls)e.classList.add(cls);e.style.setProperty("--d",(i*step)+"s")})}
add(".facts>div","",.12);add(".cards>.card","",.15);add(".steps>li","",.15);add("h2","",0);add(".sub,.note","",0);
add("form","",0);add(".faq details","",.08);add(".map","",0);add("#book .actions","",0);
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12,rootMargin:"0px 0px -6% 0px"});
d.querySelectorAll(".rv").forEach(function(e){io.observe(e)});
// safety net: never leave content hidden
setTimeout(function(){d.querySelectorAll(".rv:not(.in)").forEach(function(e){var r=e.getBoundingClientRect();if(r.top<innerHeight)e.classList.add("in")})},2500);
// counters on step numbers
d.querySelectorAll(".steps b").forEach(function(b){var n=parseInt(b.textContent,10);if(!n)return;b.textContent="0";var o=new IntersectionObserver(function(es){if(es[0].isIntersecting){o.disconnect();var t0=null;(function f(t){t0=t0||t;var p=Math.min((t-t0)/900,1);b.textContent=Math.round(n*p);if(p<1)requestAnimationFrame(f)})(performance.now())}},{threshold:.6});o.observe(b)});
// progress bar, header shrink, parallax
var bar=d.createElement("div");bar.id="prog";d.body.appendChild(bar);
var top=d.querySelector(".top"),img=d.querySelector(".hero-img"),hero=d.querySelector(".hero"),tick=false;
function upd(){tick=false;var y=pageYOffset,h=de.scrollHeight-innerHeight;
bar.style.transform="scaleX("+(h>0?y/h:0)+")";
if(top)top.classList.toggle("shrunk",y>40);
if(img&&hero&&y<hero.offsetHeight+200)img.style.transform="translate3d(0,"+Math.min(y*.12,28)+"px,0) scale(1.12)"}
addEventListener("scroll",function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});upd();
}catch(e){document.documentElement.classList.remove("js")}
})();
