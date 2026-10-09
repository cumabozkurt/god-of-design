
(function(){
  var D=window.__I18N__, KEY="lang:"+D.repo;
  var root=document.documentElement;
  function apply(l){
    var dict=D[l]; root.lang=l;
    document.querySelectorAll("[data-i18n]").forEach(function(el){var v=dict[el.getAttribute("data-i18n")]; if(v!=null) el.innerHTML=v;});
    document.querySelectorAll("[data-i18n-attr]").forEach(function(el){el.getAttribute("data-i18n-attr").split(";").forEach(function(p){var a=p.split(":"); var v=dict[a[1]]; if(v!=null) el.setAttribute(a[0],v);});});
    document.querySelectorAll("[data-src-"+l+"]").forEach(function(el){el.src=el.getAttribute("data-src-"+l);});
    document.title=dict.__title; var m=document.querySelector('meta[name="description"]'); if(m) m.content=dict.__desc;
    document.querySelectorAll(".lang button").forEach(function(b){b.setAttribute("aria-pressed",b.dataset.l===l?"true":"false");});
    try{localStorage.setItem(KEY,l)}catch(e){}
  }
  var saved=null; try{saved=localStorage.getItem(KEY)}catch(e){}
  var q=new URLSearchParams(location.search).get("lang");
  var start=(q==="en"||q==="tr")?q:(saved||D.def);
  if(start!==D.def) apply(start); else document.querySelectorAll(".lang button").forEach(function(b){b.setAttribute("aria-pressed",b.dataset.l===start?"true":"false");});
  document.querySelectorAll(".lang button").forEach(function(b){b.addEventListener("click",function(){apply(b.dataset.l)});});
  // tabs
  document.querySelectorAll("[role=tablist]").forEach(function(tl){
    var tabs=[].slice.call(tl.querySelectorAll("[role=tab]"));
    function sel(t){tabs.forEach(function(x){var on=x===t;x.setAttribute("aria-selected",on);x.tabIndex=on?0:-1;document.getElementById(x.getAttribute("aria-controls")).hidden=!on;});}
    tabs.forEach(function(t,i){t.addEventListener("click",function(){sel(t)});t.addEventListener("keydown",function(e){var d=e.key==="ArrowRight"?1:e.key==="ArrowLeft"?-1:0;if(d){var n=tabs[(i+d+tabs.length)%tabs.length];n.focus();sel(n);}});});
  });
  // copy
  document.querySelectorAll(".copy").forEach(function(b){b.addEventListener("click",function(){
    var pre=b.parentNode.querySelector("pre"), txt=pre.getAttribute("data-copy")||pre.innerText;
    var done=function(){var o=b.innerHTML;b.textContent=root.lang==="tr"?"Kopyalandı ✓":"Copied ✓";setTimeout(function(){b.innerHTML=o},1600)};
    if(navigator.clipboard) navigator.clipboard.writeText(txt).then(done,done); else {var t=document.createElement("textarea");t.value=txt;document.body.appendChild(t);t.select();try{document.execCommand("copy")}catch(e){}t.remove();done();}
  });});
  // reveal
  if("IntersectionObserver" in window && !/static/.test(location.search)){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}})},{rootMargin:"0px 0px -8% 0px"});document.querySelectorAll(".reveal").forEach(function(el){io.observe(el)});}
  else document.querySelectorAll(".reveal").forEach(function(el){el.classList.add("in")});
  // OS detection for downloads
  var ua=navigator.userAgent, os=/Windows/i.test(ua)?"win":/Mac/i.test(ua)?"mac":/Linux|X11/i.test(ua)&&!/Android/i.test(ua)?"linux":"";
  if(os){var rec=document.querySelector('.dl[data-os="'+os+'"]'); if(rec) rec.classList.add("rec"); var pc=document.querySelector('[data-primary-os="'+os+'"]'); var p=document.getElementById("primary-cta"); if(pc&&p){p.href=pc.href; var l=p.querySelector("[data-os-label]"); if(l) l.setAttribute("data-i18n",pc.getAttribute("data-label-key")), l.innerHTML=D[root.lang][pc.getAttribute("data-label-key")];}}
  if(os){var osTab=document.querySelector('[data-os-tab~="'+os+'"]'); if(osTab) osTab.click();}
  // live GitHub data (stars shown only when > 0; latest release assets refresh baked links)
  var api="https://api.github.com/repos/"+D.owner+"/"+D.repo;
  fetch(api).then(function(r){return r.ok?r.json():null}).then(function(j){if(j&&j.stargazers_count>0){document.querySelectorAll(".stars").forEach(function(s){s.textContent="★ "+j.stargazers_count.toLocaleString()})}}).catch(function(){});
  if(document.querySelector("[data-asset]")) fetch(api+"/releases/latest").then(function(r){return r.ok?r.json():null}).then(function(j){
    if(!j||!j.assets) return;
    document.querySelectorAll("[data-asset]").forEach(function(a){var re=new RegExp(a.getAttribute("data-asset")); var hit=j.assets.filter(function(x){return re.test(x.name)})[0]; if(hit){a.href=hit.browser_download_url; var s=a.querySelector(".fname"); if(s) s.textContent=hit.name+" · "+(hit.size/1048576).toFixed(hit.size>1048576*10?0:1)+" MB";}});
    document.querySelectorAll(".rel-tag").forEach(function(s){s.textContent=j.tag_name});
  }).catch(function(){});
})();
