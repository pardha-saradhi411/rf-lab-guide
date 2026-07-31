const CACHE='rf-guide-v2';
const FILES=[
  '/rf-lab-guide/index.html',
  '/rf-lab-guide/foundation.html',
  '/rf-lab-guide/beginner.html',
  '/rf-lab-guide/intermediate.html',
  '/rf-lab-guide/expert.html',
  '/rf-lab-guide/protocol.html',
  '/rf-lab-guide/protocol_debug.html',
  '/rf-lab-guide/features.html',
  '/rf-lab-guide/instruments.html',
  '/rf-lab-guide/docs.html',
  '/rf-lab-guide/shared.css',
  '/rf-lab-guide/shared.js',
  '/rf-lab-guide/search-index.json',
  '/rf-lab-guide/manifest.json',
  '/rf-lab-guide/icon-192.png',
  '/rf-lab-guide/icon-512.png',
  '/rf-lab-guide/images/exm_acp_b28_low_power_screenshot.png',
  '/rf-lab-guide/images/rct_test_setup_hand_drawn_diagram_du_to_aau_b1b3_t.png',
  '/rf-lab-guide/images/trx1_acp_aclr_full_power_b28_screenshot.png',
  '/rf-lab-guide/images/trx1_modulation_analysis_evm_constellation_screens.png'
];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES).catch(()=>{}))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))); });
