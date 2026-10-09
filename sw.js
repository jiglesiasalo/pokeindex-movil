// PokeIndex móvil: datos y páginas, primero la red (siempre al día); fotos de TCGdex, primero lo guardado
const C='pi-movil-1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  if(u.origin===location.origin){const key=u.origin+u.pathname;
    e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(key,cp))}return res}).catch(()=>caches.open(C).then(c=>c.match(key)).then(x=>x||new Response('',{status:504}))));return}
  if(/(^|\.)tcgdex\.net$/.test(u.hostname)&&/\.(webp|png|jpg|jpeg)$/i.test(u.pathname)){
    e.respondWith(caches.open(C).then(c=>c.match(r.url).then(hit=>hit||fetch(r).then(res=>{if(res.ok||res.type==='opaque')c.put(r.url,res.clone());return res}))))}});
