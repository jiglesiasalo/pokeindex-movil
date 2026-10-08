// PokeIndex móvil: primero la red (datos al día); si no hay conexión, lo último que se vio
const C='pi-movil-1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
  const key=u.origin+u.pathname;
  e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(key,cp))}return r}).catch(()=>caches.open(C).then(c=>c.match(key)).then(r=>r||new Response('',{status:504}))))});
