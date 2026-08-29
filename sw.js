const CACHE='rf-guide-v40';
const FILES=[
  '/rf-lab-guide/index.html',
  '/rf-lab-guide/foundation.html',
  '/rf-lab-guide/beginner.html',
  '/rf-lab-guide/intermediate.html',
  '/rf-lab-guide/expert.html',
  '/rf-lab-guide/protocol.html',
  '/rf-lab-guide/protocol_debug.html',
  '/rf-lab-guide/features.html',
  '/rf-lab-guide/lte-features.html',
  '/rf-lab-guide/nr-sa-features.html',
  '/rf-lab-guide/nr-nsa-features.html',
  '/rf-lab-guide/common-features.html',
  '/rf-lab-guide/instruments.html',
  '/rf-lab-guide/docs.html',
  '/rf-lab-guide/resume.html',
  '/rf-lab-guide/interview.html',
  '/rf-lab-guide/automation.html',
  '/rf-lab-guide/notes.html',
  '/rf-lab-guide/interview.js',
  '/rf-lab-guide/interview-bank.json',
  '/rf-lab-guide/shared.css',
  '/rf-lab-guide/shared.js',
  '/rf-lab-guide/search-index.json',
  '/rf-lab-guide/manifest.json',
  '/rf-lab-guide/icon-192.png',
  '/rf-lab-guide/icon-512.png',
  '/rf-lab-guide/images/exm_acp_b28_low_power_screenshot.png',
  '/rf-lab-guide/images/rct_test_setup_hand_drawn_diagram_du_to_aau_b1b3_t.png',
  '/rf-lab-guide/images/trx1_acp_aclr_full_power_b28_screenshot.png',
  '/rf-lab-guide/images/trx1_modulation_analysis_evm_constellation_screens.png',
  '/rf-lab-guide/svg/A01_1.svg',
  '/rf-lab-guide/svg/A03_1.svg',
  '/rf-lab-guide/svg/A04_1.svg',
  '/rf-lab-guide/svg/A05_1.svg',
  '/rf-lab-guide/svg/A05_2.svg',
  '/rf-lab-guide/svg/A06_1.svg',
  '/rf-lab-guide/svg/A07_1.svg',
  '/rf-lab-guide/svg/A08_1.svg',
  '/rf-lab-guide/svg/A09_1.svg',
  '/rf-lab-guide/svg/A10_1.svg',
  '/rf-lab-guide/svg/A11_1.svg',
  '/rf-lab-guide/svg/A13_1.svg',
  '/rf-lab-guide/svg/A14_1.svg',
  '/rf-lab-guide/svg/A15_1.svg',
  '/rf-lab-guide/svg/EXP1_1.svg',
  '/rf-lab-guide/svg/EXP1_2.svg',
  '/rf-lab-guide/svg/EXP2_1.svg',
  '/rf-lab-guide/svg/EXP3_1.svg',
  '/rf-lab-guide/svg/EXP3_2.svg',
  '/rf-lab-guide/svg/EXP3_3.svg',
  '/rf-lab-guide/svg/EXP4_1.svg',
  '/rf-lab-guide/svg/EXP4_2.svg',
  '/rf-lab-guide/svg/EXP5_1.svg',
  '/rf-lab-guide/svg/EXP6_1.svg',
  '/rf-lab-guide/svg/L0_1.svg',
  '/rf-lab-guide/svg/L11_1.svg',
  '/rf-lab-guide/svg/L18_1.svg',
  '/rf-lab-guide/svg/L19_1.svg',
  '/rf-lab-guide/svg/L1_1.svg',
  '/rf-lab-guide/svg/L20_1.svg',
  '/rf-lab-guide/svg/L21_1.svg',
  '/rf-lab-guide/svg/L22_1.svg',
  '/rf-lab-guide/svg/L23_1.svg',
  '/rf-lab-guide/svg/L24_1.svg',
  '/rf-lab-guide/svg/L25_1.svg',
  '/rf-lab-guide/svg/L26_1.svg',
  '/rf-lab-guide/svg/L27_1.svg',
  '/rf-lab-guide/svg/L28_1.svg',
  '/rf-lab-guide/svg/L29_1.svg',
  '/rf-lab-guide/svg/L30_1.svg',
  '/rf-lab-guide/svg/L31_1.svg',
  '/rf-lab-guide/svg/L32_1.svg',
  '/rf-lab-guide/svg/L33_1.svg',
  '/rf-lab-guide/svg/L34_1.svg',
  '/rf-lab-guide/svg/L35_1.svg',
  '/rf-lab-guide/svg/L36_1.svg',
  '/rf-lab-guide/svg/L37_1.svg',
  '/rf-lab-guide/svg/L38_1.svg',
  '/rf-lab-guide/svg/L39_1.svg',
  '/rf-lab-guide/svg/L3_1.svg',
  '/rf-lab-guide/svg/L40_1.svg',
  '/rf-lab-guide/svg/L41_1.svg',
  '/rf-lab-guide/svg/L42_1.svg',
  '/rf-lab-guide/svg/L43_1.svg',
  '/rf-lab-guide/svg/L44_1.svg',
  '/rf-lab-guide/svg/L45_1.svg',
  '/rf-lab-guide/svg/L4_1.svg',
  '/rf-lab-guide/svg/L7_1.svg',
  '/rf-lab-guide/svg/L9_1.svg',
  '/rf-lab-guide/svg/M14_1.svg',
  '/rf-lab-guide/svg/M15_1.svg',
  '/rf-lab-guide/svg/M16_1.svg',
  '/rf-lab-guide/svg/M16_2.svg',
  '/rf-lab-guide/svg/WHY_1.svg'
];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES).catch(()=>{}))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const accept = req.headers.get('accept') || '';
  const isPage = req.mode === 'navigate' || accept.includes('text/html');
  if (isPage) {
    // network-first for HTML pages so content updates show immediately when online
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{});
        return res;
      }).catch(() => caches.match(req).then(r => r || caches.match('/rf-lab-guide/index.html')))
    );
  } else {
    // cache-first for static assets (css/js/svg/png/json) — fast + offline
    e.respondWith(
      caches.match(req).then(r => r || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{});
        return res;
      }))
    );
  }
});
