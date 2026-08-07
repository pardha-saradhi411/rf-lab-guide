
// ── Tag filter ─────────────────────────────────────────────────────────────
let activeTag = 'all';
function tagFilter(tag) {
  activeTag = tag;
  document.querySelectorAll('.tag-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tag === tag);
  });
  const cards = document.querySelectorAll('.module-card');
  let visible = 0;
  cards.forEach(card => {
    if (tag === 'all') {
      card.classList.remove('tag-hidden');
      visible++;
    } else {
      const tags = (card.dataset.tags || '').split(' ');
      const match = tags.some(t => t === tag);
      card.classList.toggle('tag-hidden', !match);
      if (match) visible++;
    }
  });
  const countEl = document.getElementById('tag-count');
  if (countEl) {
    countEl.textContent = tag === 'all'
      ? visible + ' cards total'
      : visible + ' cards';
  }
  if (tag !== 'all') {
    const first = document.querySelector('.module-card:not(.tag-hidden)');
    if (first) setTimeout(()=>first.scrollIntoView({behavior:'smooth', block:'start'}), 60);
  }
}

// Unified bar: structural chips jump to a section (and clear any active tag filter).
function navJump(id) {
  tagFilter('all');
  const el = document.getElementById(id);
  if (el) setTimeout(()=>el.scrollIntoView({behavior:'smooth', block:'start'}), 80);
}


const infoData = {
  exa: {
    freq: "<b>FREQ key</b> — Sets the center frequency of the analyzer. For B1 TX: set to 2140.0 MHz (DL). For B3: 1842.5 MHz. For B8: 942.5 MHz. For B28: 758 MHz. For B41 TDD: 2545 MHz.<br><br><code>:SENS:FREQ:CENT 2140e6</code>",
    span: "<b>SPAN key</b> — Sets the frequency span around center. For ACLR: span = 5×BW. For EVM/modulation: set to channel BW (5/10/15/20 MHz). Narrow span = better frequency resolution but slower sweep.<br><br><code>:SENS:FREQ:SPAN 50e6</code>",
    start_stop: "<b>START/STOP keys</b> — Alternative to center+span. Set explicit start and stop frequencies. Useful for SEM measurements where you need precise band-edge control.",
    amptd: "<b>AMPTD key</b> — Sets reference level (top of display). Set ~10 dB above expected signal. For P_rated B1 = -16.7 dBm at SMA: set ref level to -5 dBm. Auto-scale available.",
    attn: "<b>ATTN key</b> — Mechanical input attenuator (0–30 dB in 5 dB steps). Higher attn = better IP3, worse noise figure. For weak signals: 0 dB. For strong TX signals: 10–20 dB.",
    preamp: "<b>Preamp key</b> — Internal LNA (~20 dB gain). Use for RX sensitivity measurements (weak signals). Disable for TX measurements to avoid gain compression.",
    extgain: "<b>Ext Gain key</b> — Compensates for cable loss. Enter your cable loss as positive value (e.g. +2.5 dB) so EXA subtracts it from displayed power. Makes readings cable-loss-corrected.",
    bw: "<b>BW key</b> — Resolution Bandwidth (RBW) and Video Bandwidth (VBW). For ACLR: RBW = 30 kHz. For channel power: RBW = auto. Narrower RBW = better frequency resolution, slower sweep.",
    sweep: "<b>Sweep key</b> — Sweep time and type. Auto sweep: EXA picks optimal. Manual: set longer for noisy measurements. Single sweep mode: use for TDD gated measurements (B41).",
    avg: "<b>Avg key</b> — Averaging reduces noise floor. Use 10–100 averages for ACLR/EVM. RMS averaging for power. Log averaging for noise. Video averaging for spectrum displays.",
    trig: "<b>Trig key</b> — Trigger source. For TDD B41: use External trigger at 9.9765 ms delay. Free run for FDD. Video trigger for burst detection.",
    meas: "<b>Meas key</b> — Select measurement type. Options: Channel Power, ACLR/ACP, EVM (modulation analysis), OBW, SEM, Spurious, Phase Noise.",
    meas_setup: "<b>Meas Setup key</b> — Configure measurement parameters after selecting Meas type. For ACLR: set offsets, integration BW. For EVM: set standard (LTE), ETM.",
    mode: "<b>Mode key</b> — Select analyzer mode. LTE-FDD (used for RCT), LTE-TDD (B41), Basic SA, IQ Analyzer. Each mode has its own measurement palette.",
    mode_setup: "<b>Mode Setup key</b> — Configure the current mode parameters. For LTE-FDD mode: set bandwidth, link direction, reference signal settings.",
    marker: "<b>Marker key</b> — Place frequency/amplitude markers. Marker→Peak finds highest point. Delta marker measures relative power. Useful for quick ACLR eyeballing.",
    peak: "<b>Peak key</b> — Marker→Peak shortcut. Immediately jumps marker to highest point on display. Use to verify you are measuring the wanted carrier.",
    delta: "<b>Delta key</b> — Creates a delta marker relative to current marker position. Measure ACLR manually: place marker on carrier, delta on adjacent channel offset.",
    mkr_to: "<b>Mkr→key</b> — Marker to Center/Reference Level. Sets center frequency or reference level to the current marker position. Quick way to tune to a signal.",
    input: "<b>Input key</b> — Select input port (RF, IQ) and impedance (50Ω). Always verify 50Ω selected for RF measurements. IQ input used for baseband analysis.",
    save: "<b>Save key</b> — Save state, trace data, screen. Save State saves all settings. Save Trace saves measurement data as CSV. Use before changing configuration.",
    recall: "<b>Recall key</b> — Recall saved state or trace. Load RCT measurement state to restore exact ACLR/EVM configuration between sessions.",
    knob: "<b>Knob</b> — Rotary encoder for fine adjustment of active parameter. Click knob = toggles between coarse/fine steps. Used after setting a value with numeric.",
    numeric: "<b>Numeric keypad</b> — Enter values directly. After pressing a key (FREQ, SPAN etc), type the value and select the unit (MHz, dBm, kHz).",
    units: "<b>Units keys</b> — GHz/dBm, MHz/dB, kHz/mV, Hz/μV etc. Press after numeric entry. Completes the entry and sets the parameter.",
    system: "<b>System key</b> — Access LAN settings (IP address for SCPI remote), calibration, alignment, factory preset. Find EXA IP: System → Show → System."
  },
  exm: {
    freq_ch: "<b>FREQ Channel key</b> — Sets center frequency. For EXM used as signal generator: sets the output RF frequency. For SA mode: sets the center analysis frequency.<br><br><code>:FREQ:CENT 2140e6</code>",
    input_output: "<b>Input/Output key</b> — Select RF port routing. Critical for EXM: routes signal to the correct front-panel RF connector (Port 1 for SA, Port 2 for SG). Must select before measurement.",
    auto_couple: "<b>Auto Couple key</b> — Automatically sets RBW, VBW, and sweep time for optimal measurement. Use as starting point, then fine-tune manually if needed.",
    marker: "<b>Marker key</b> — Place markers on trace for reading frequency/amplitude. Marker→Peak on EXM used for signal identification and ACLR cursor placement.",
    mode_preset: "<b>Mode Preset (green key)</b> — Resets current mode to factory defaults. Use to recover from unknown state. Green = safe recovery key. Does NOT change mode, only resets mode parameters.",
    span_xscale: "<b>SPAN / X Scale key</b> — Set frequency span for SA mode, or X-axis range for time-domain displays. For LTE RCT: span = 3× channel BW minimum.",
    view_display: "<b>View/Display key</b> — Toggle between measurement views (spectrum, waterfall, IQ). For EVM analysis: switch between constellation, EVM vs subcarrier, and summary views.",
    bw: "<b>BW key</b> — RBW/VBW settings. Narrower RBW increases dynamic range for adjacent channel measurements. EXM auto-couples BW to span by default (ratio 1:100).",
    peak_search: "<b>Peak Search key</b> — Moves marker to highest amplitude point. After transmission starts: Peak Search confirms the carrier is at expected frequency.",
    user_preset: "<b>User Preset key</b> — Recalls a user-saved preset state. Save your RCT measurement configuration as user preset for quick recall between tests.",
    amptd_yscale: "<b>AMPTD / Y Scale key</b> — Reference level and vertical scale. Set reference level ~10 dB above expected signal power. Log scale: 10 dB/div standard.",
    trace_detector: "<b>Trace/Detector key</b> — Choose trace type (clear/write, max hold, average) and detector (sample, peak, RMS). For ACLR: use RMS detector.",
    source: "<b>Source key</b> — EXM has an internal signal generator (TRX module). Source key accesses SG settings: frequency, power, modulation. Used for injecting test signals.",
    marker_arrow: "<b>Marker → keys</b> — Move marker to specific positions (Next Peak, Peak Left, Peak Right, Min). Useful for characterizing spurious emission levels.",
    save: "<b>Save key</b> — Save instrument state, measurement results, or screen captures. For RCT: save state after configuring each test (ACLR, EVM) for reproducibility.",
    mode: "<b>Mode key</b> — Select operating mode: SA (spectrum analyzer), LTE-FDD, LTE-TDD, Vector Signal Analyzer, SG (signal generator). Each mode reconfigures the hardware.",
    mode_setup: "<b>Mode Setup key</b> — Configure mode-specific parameters after selecting mode. For LTE-FDD: set BW, DL/UL, cell ID, reference signal power.",
    trigger: "<b>Trigger key</b> — Set trigger source for synchronized measurements. External trigger: sync to BBU frame clock. For B41 TDD: trigger delay = 9.9765 ms.",
    marker_fn: "<b>Marker Function key</b> — Advanced marker operations: band power, noise marker, delta pair. Band Power marker: integrate power over a frequency range (useful for manual ACLR).",
    recall: "<b>Recall key</b> — Load saved instrument state. Recall user preset or state file to restore exact measurement configuration. Essential for repeatable RCT.",
    meas: "<b>Meas key</b> — Select active measurement: Channel Power, ACP/ACLR, EVM, OBW, SEM, Spurious, Phase Noise. After selecting: press Meas Setup to configure parameters.",
    meas_setup: "<b>Meas Setup key</b> — Configure measurement: For ACP/ACLR: set offset frequencies (±5/10 MHz for LTE), integration bandwidth. For EVM: select LTE standard, ETM.",
    sweep_control: "<b>Sweep Control key</b> — Sweep type (continuous, single, gate). Sweep time auto or manual. For TDD gating: select Gated Sweep and configure gate parameters here.",
    restart: "<b>Restart key</b> — Restarts current sweep/measurement from beginning. Use after changing settings to get a clean measurement without previous data contamination.",
    single: "<b>Single key</b> — Takes one sweep then stops. Use for repeatable single-shot measurements. Follow with *OPC? in SCPI to wait for completion before reading results."
  },
  vna: {
    meas: "<b>Meas key</b> — Select S-parameter to measure: S11 (reflection), S21 (transmission/insertion loss), S12, S22. For cable loss: S21 (through measurement). For antenna: S11 (return loss).",
    format: "<b>Format key</b> — Display format: Log Magnitude (dB), Phase (degrees), Smith Chart, Polar, Real, Imaginary, SWR. For cable loss: Log Mag. For phase calibration: Phase.",
    scale: "<b>Scale key</b> — Set Y-axis scale: dB/division, reference level, reference position. For cable loss: 0 dB reference at top, 1–5 dB/div. Auto-scale available.",
    display: "<b>Display key</b> — Multi-trace layout. Up to 4 traces. Show S11+S21 simultaneously. Split screen. Useful for comparing reflection vs transmission of a DUT.",
    avg: "<b>Avg key</b> — Averaging: reduces noise floor. Use 16–64 averages for precise cable loss. Restart averaging after connecting DUT for clean data.",
    cal: "<b>Cal key</b> — Access calibration menu. Choose calibration type: SOLT (1-port), Full 2-port, Response. Start here for every VNA session after warmup.",
    solt: "<b>SOLT Calibration</b> — Short-Open-Load-Thru. Connect Short to port → measure. Connect Open → measure. Connect Load (50Ω termination) → measure. Connect Thru → measure. VNA corrects for cable, connector losses.",
    calrecall: "<b>Cal Recall key</b> — Load a previously saved calibration. Valid calibration for the frequency range and port configuration. Always verify cal date/temperature match current conditions.",
    start: "<b>Start key</b> — Set start frequency of sweep. For AAU band measurement B1: start = 1710 MHz (UL) or 2110 MHz (DL). For full band sweep: start = 100 MHz.",
    stop: "<b>Stop key</b> — Set stop frequency of sweep. Match to your band of interest. Narrower span = more points per MHz = better frequency resolution for same point count.",
    center: "<b>Center key</b> — Set center frequency. Alternative to Start+Stop. For B1 center: 1950 MHz UL / 2140 MHz DL. Quick way to zoom into a band.",
    span: "<b>Span key</b> — Frequency span around center. For per-band: 200 MHz span. For cable loss (wideband): 3 GHz span. More span = sparser frequency grid.",
    points: "<b>Points key</b> — Number of frequency points (101 to 100001). More points = higher resolution + slower sweep. For phase calibration: 1601+ points recommended.",
    power: "<b>Power key</b> — Output power of VNA test signal (-50 to 0 dBm typical). Use -10 dBm for passive DUT. Use -30 dBm if DUT has amplifiers to avoid compression.",
    ifbw: "<b>IF BW key</b> — Intermediate Frequency bandwidth. Narrow IF BW (100 Hz) = low noise floor, very slow. Wide IF BW (10 kHz) = fast sweep, noisier. Start with 1 kHz.",
    marker: "<b>Marker key</b> — Place frequency markers. For cable loss: marker at band center shows loss at that frequency. Marker table shows all values simultaneously.",
    search: "<b>Search key</b> — Marker search: Min/Max/Target. For filter characterization: Search→Min finds minimum insertion loss. For cable: Max finds worst loss point.",
    bwsearch: "<b>BW Search key</b> — Bandwidth search around a resonance or filter passband. Reports -3dB bandwidth, Q factor, insertion loss. Useful for antenna resonance analysis.",
    timedomain: "<b>Time Domain key</b> — Converts frequency response to time-domain (IFFT). Shows reflections vs. distance. Useful for finding cable faults or connector reflections.",
    memtrace: "<b>Mem/Trace key</b> — Store current trace to memory. Compare live measurement with stored reference. Use to see changes after connector re-seating or cable dressing.",
    knob: "<b>Rotary Knob</b> — Fine adjustment of active field. After pressing a key, rotate for continuous adjustment. Click for coarse/fine toggle.",
    numeric: "<b>Numeric Entry</b> — Direct value entry. Press key (Start, Stop, etc) → enter numbers → select unit key to complete entry.",
    units: "<b>Units keys</b> — GHz, MHz, kHz, dB, dBm etc. Completes numeric entry and applies the unit. Always verify unit matches expected (GHz vs MHz).",
    chtr: "<b>CH/TR key</b> — Channel and Trace management. Create new channels (independent calibrations), new traces (different S-params in same channel). Up to 4 channels on E5071C."
  }
};

function exmBtn(key) {
  const panel = document.getElementById('explain-exm');
  if (!panel) return;
  const info = infoData['exm'] && infoData['exm'][key];
  panel.innerHTML = info
    ? '<b style="color:#f5a623">' + key.replace(/_/g,' ').toUpperCase() + '</b><br>' + info
    : '<span style="color:#4a5470">No info for key: ' + key + '</span>';
}


// ── Card toggle ────────────────────────────────────────────────────────────
function toggleModule(el) {
  const body = el.nextElementSibling;
  const chevron = el.querySelector('.chevron');
  const status = el.querySelector('.mod-status, .mod-expand, .mod-status');
  const isOpen = body.style.display === 'block';
  body.style.display = isOpen ? 'none' : 'block';
  if (chevron) chevron.textContent = isOpen ? '▾' : '▴';
  if (status)  status.textContent  = isOpen ? 'click to expand' : 'expanded';
}

// ── Section expand / collapse ──────────────────────────────────────────
function getSectionCards(sectionId) {
  const myHdr = document.getElementById(sectionId);
  if (!myHdr) return [];
  // Use DOM order: find all sec-hdr[id] elements in document order
  const allSecHdrs = Array.from(document.querySelectorAll('.sec-hdr[id]'));
  const myIdx = allSecHdrs.indexOf(myHdr);
  const nextHdr = myIdx >= 0 && myIdx < allSecHdrs.length - 1 ? allSecHdrs[myIdx + 1] : null;
  // A card belongs to this section if it comes after myHdr and before nextHdr in DOM
  return Array.from(document.querySelectorAll('.module-card')).filter(card => {
    const afterStart = myHdr.compareDocumentPosition(card) & Node.DOCUMENT_POSITION_FOLLOWING;
    if (!afterStart) return false;
    if (!nextHdr) return true;
    const beforeEnd = nextHdr.compareDocumentPosition(card) & Node.DOCUMENT_POSITION_PRECEDING;
    return !!beforeEnd;
  });
}


function setModule(hdr, open) {
  if (!hdr) return;
  const body = hdr.nextElementSibling;
  if (!body || !body.classList || !body.classList.contains('module-body')) return;
  const chevron = hdr.querySelector('.chevron');
  const status = hdr.querySelector('.mod-status,.mod-expand');
  body.style.display = open ? 'block' : 'none';
  body.classList.toggle('open', open);
  if (chevron) chevron.textContent = open ? '▴' : '▾';
  if (status) status.textContent = open ? 'expanded' : 'click to expand';
}
function expandAll() {
  document.querySelectorAll('.module-hdr').forEach(h => setModule(h, true));
}
function collapseAll() {
  document.querySelectorAll('.module-hdr').forEach(h => setModule(h, false));
}
function expandSection(sectionId) {
  getSectionCards(sectionId).forEach(card => setModule(card.querySelector('.module-hdr'), true));
}
function collapseSection(sectionId) {
  getSectionCards(sectionId).forEach(card => setModule(card.querySelector('.module-hdr'), false));
}


// ── Search: dropdown results, click-to-jump (no auto-expand) ──────────────
let searchDropdown = null;

function filterCards(query) {
  const q = query.trim().toLowerCase();
  // Remove existing dropdown
  if (searchDropdown) { searchDropdown.remove(); searchDropdown = null; }
  const countEl = document.getElementById('search-count');
  if (!q) {
    if (countEl) countEl.textContent = '';
    return;
  }

  const cards = document.querySelectorAll('.module-card');
  const results = [];
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    if (text.includes(q)) {
      const numEl = card.querySelector('.mod-num');
      const titleEl = card.querySelector('.mod-title');
      const num = numEl ? numEl.textContent.trim() : '';
      const title = titleEl ? titleEl.textContent.trim() : '';
      results.push({ card, num, title });
    }
  });

  if (countEl) countEl.textContent = results.length + ' found';

  if (!results.length) return;

  // Build dropdown
  searchDropdown = document.createElement('div');
  searchDropdown.id = 'search-dropdown';
  searchDropdown.style.cssText = [
    'position:fixed','top:56px','left:50%','transform:translateX(-50%)',
    'width:min(600px,90vw)','max-height:60vh','overflow-y:auto',
    'background:#0d0f14','border:1px solid #2a3050','border-radius:10px',
    'box-shadow:0 8px 32px #000a','z-index:9999','padding:8px 0'
  ].join(';');

  results.slice(0, 40).forEach(({ card, num, title }) => {
    const row = document.createElement('div');
    row.style.cssText = 'padding:10px 16px;cursor:pointer;border-bottom:1px solid #1e2535;display:flex;align-items:center;gap:10px';
    row.innerHTML = '<span style="color:#5bc4ef;font-weight:700;font-size:12px;min-width:44px">' + num + '</span>' +
                    '<span style="color:#c8c8d8;font-size:13px">' + title.slice(0,70) + '</span>';
    row.onmouseenter = () => row.style.background = '#1e2535';
    row.onmouseleave = () => row.style.background = '';
    row.onclick = () => {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Expand the card
      const body = card.querySelector('.module-body');
      const chevron = card.querySelector('.chevron');
      const status = card.querySelector('.mod-status, .mod-expand');
      if (body) body.style.display = 'block';
      if (chevron) chevron.textContent = '▴';
      if (status) status.textContent = 'expanded';
      searchDropdown.remove(); searchDropdown = null;
    };
    searchDropdown.appendChild(row);
  });

  if (results.length > 40) {
    const more = document.createElement('div');
    more.style.cssText = 'padding:8px 16px;color:#4a5470;font-size:12px;text-align:center';
    more.textContent = '... and ' + (results.length - 40) + ' more. Refine your search.';
    searchDropdown.appendChild(more);
  }

  document.body.appendChild(searchDropdown);

  // Click outside to close
  setTimeout(() => {
    document.addEventListener('click', function closeDD(e) {
      if (searchDropdown && !searchDropdown.contains(e.target)) {
        searchDropdown.remove(); searchDropdown = null;
      }
      document.removeEventListener('click', closeDD);
    });
  }, 100);
}

function clearSearch() {
  const inp = document.getElementById('card-search');
  if (inp) inp.value = '';
  if (searchDropdown) { searchDropdown.remove(); searchDropdown = null; }
  const countEl = document.getElementById('search-count');
  if (countEl) countEl.textContent = '';
}

// ── Theme toggle ───────────────────────────────────────────────────────────
function toggleTheme() {
  document.body.classList.toggle('light-mode');
}

// ── Instrument tabs ────────────────────────────────────────────────────────
function switchTab(tab) {
  ['exa','exm','vna'].forEach(t => {
    const btn   = document.getElementById('tab-' + t);
    const panel = document.getElementById('panel-' + t);
    if (!btn || !panel) return;
    const active = t === tab;
    btn.classList.toggle('sel', active);
    panel.style.display = active ? 'flex' : 'none';
    if (active) {
      panel.classList.add('active-panel');
    } else {
      panel.classList.remove('active-panel');
    }
  });
}


// ── EXA info panels ────────────────────────────────────────────────────────
function show(inst, key) {
  const panel = document.getElementById('explain-' + inst);
  if (!panel) return;
  panel.style.display = 'block';
  const info = infoData[inst] && infoData[inst][key];
  panel.innerHTML = info
    ? '<b style="color:#5bc4ef;font-size:14px">' + key.replace(/_/g,' ').toUpperCase() + '</b><br><br>' + info
    : '<span style="color:#4a5470">No info for: ' + key + '</span>';
}


// Init: collapse all, ensure EXA tab shown
document.addEventListener('DOMContentLoaded', () => {
  // Activate All tag filter button
  // Collapse all cards
  document.querySelectorAll('.module-body').forEach(b => {
    b.style.display = 'none';
  // Ensure All filter is active after full render
  requestAnimationFrame(() => {
    tagFilter('all');
  });
});;
  // Show EXA tab by default
  switchTab('exa');
  // Keyboard shortcut
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const inp = document.getElementById('card-search');
      if (inp) { inp.focus(); inp.select(); }
    }
    if (e.key === 'Escape') {
      clearSearch();
      const inp = document.getElementById('card-search');
      if (inp) inp.blur();
      if (searchDropdown) { searchDropdown.remove(); searchDropdown = null; }
    }
  });
});

/* ===== PWA multi-file additions ===== */
async function globalSearch(query){
  if(!query||query.length<2) return [];
  const q=query.toLowerCase();
  let idx;
  try{ idx=await fetch('search-index.json').then(r=>r.json()); }catch(e){ return []; }
  return idx.filter(function(card){
    return card.title.toLowerCase().includes(q) ||
           (card.tags||'').toLowerCase().includes(q) ||
           card.text.toLowerCase().includes(q);
  }).slice(0,40);
}
async function indexSearch(query){
  const box=document.getElementById('global-results'); if(!box) return;
  if(!query||query.length<2){ box.innerHTML=''; return; }
  const res=await globalSearch(query);
  box.innerHTML = res.length
    ? res.map(function(c){return '<a class="gs-hit" href="'+c.file+'#'+c.id+'"><span class="gs-id">'+c.id+'</span>'+c.title+'<span class="gs-file">'+c.file.replace('.html','')+'</span></a>';}).join('')
    : '<div style="color:#4a5470;padding:8px">No matches for \''+query+'\'.</div>';
}
function indexTag(tag){ const inp=document.getElementById('global-search'); if(inp) inp.value=tag; indexSearch(tag); }
// On section pages: honor ?filter= and #card-id (run after the default tagFilter('all'))
document.addEventListener('DOMContentLoaded',function(){
  requestAnimationFrame(function(){
    if(document.querySelector('.module-card')){
      var p=new URLSearchParams(location.search).get('filter');
      if(p && typeof tagFilter==='function') tagFilter(p);
    }
    if(location.hash){
      var el=document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if(el && el.classList && el.classList.contains('module-card')){
        var b=el.querySelector('.module-body'); if(b) b.style.display='block';
        el.scrollIntoView({block:'start'});
      }
    }
  });
});

// Expand + scroll to a card when the hash changes (same-page result-link clicks)
window.addEventListener('hashchange', function(){
  if(!location.hash) return;
  var el=document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if(el && el.classList && el.classList.contains('module-card')){
    var b=el.querySelector('.module-body'); if(b) b.style.display='block';
    el.scrollIntoView({block:'start'});
  }
});

/* ===== Unified GLOBAL tag filter — identical behavior on every page =====
   A chip lists EVERY card carrying that tag across the whole guide (from
   search-index.json), grouped by section. Fixes the old split where index.html
   chips searched and section-page chips filtered only the current page. */
var TAG_SYNONYMS = {
  troubleshooting:['troubleshooting','debug','rca'],
  noise:['noise','nf'],
  lab:['lab','instruments','bench','hands-on'],
  handover:['handover','mobility'],
  'call-flow':['call-flow'],
  fundamentals:['fundamentals'],
  framework:['framework']
};
var SECTION_TITLES = {foundation:'Foundation',beginner:'Beginner',intermediate:'Intermediate',expert:'Expert',protocol:'Protocol',protocol_debug:'Protocol Debug',features:'RCT Features',instruments:'Instruments',docs:'Docs',index:'Home'};
function filterByTag(tag){
  document.querySelectorAll('.tag-btn').forEach(function(b){ b.classList.toggle('active', b.dataset.tag===tag); });
  var panel=document.getElementById('tag-results');
  if(!panel){
    panel=document.createElement('div');
    panel.id='tag-results'; panel.className='tag-results';
    var nav=document.querySelector('nav#topbar')||document.querySelector('nav');
    if(nav && nav.parentNode) nav.parentNode.insertBefore(panel, nav.nextSibling);
    else document.body.insertBefore(panel, document.body.firstChild);
  }
  if(tag==='all'){ panel.style.display='none'; panel.innerHTML=''; return; }
  var chip=document.querySelector('.tag-btn[data-tag="'+tag+'"]');
  var label=(chip?chip.textContent:tag).trim();
  fetch('search-index.json').then(function(r){return r.json();}).then(function(idx){
    var toks=TAG_SYNONYMS[tag]||[tag];
    var hits=idx.filter(function(c){
      var tg=' '+String(c.tags||'').toLowerCase()+' ';
      return toks.some(function(x){ return tg.indexOf(' '+x+' ')>=0; });
    });
    var html='<div class="tr-hd"><span class="tr-title">🔖 '+label+'</span><span class="tr-count">'+hits.length+' card'+(hits.length===1?'':'s')+' across the guide</span><button class="tr-clear" onclick="filterByTag(\'all\')">✕ clear filter</button></div>';
    if(!hits.length){
      html+='<div class="tr-empty">No cards tagged &ldquo;'+label+'&rdquo;.</div>';
    } else {
      var byFile={}; hits.forEach(function(h){ (byFile[h.file]=byFile[h.file]||[]).push(h); });
      Object.keys(byFile).forEach(function(f){
        var key=f.replace('.html','');
        html+='<div class="tr-sec">'+(SECTION_TITLES[key]||key)+' <span class="tr-n">'+byFile[f].length+'</span></div><div class="tr-grid">';
        html+=byFile[f].map(function(h){ return '<a class="tr-hit" href="'+h.file+'#'+h.id+'"><span class="tr-id">'+h.id+'</span><span class="tr-ht">'+h.title+'</span></a>'; }).join('');
        html+='</div>';
      });
    }
    panel.innerHTML=html; panel.style.display='block';
    window.scrollTo({top:0,behavior:'smooth'});
  }).catch(function(){ panel.style.display='block'; panel.innerHTML='<div class="tr-empty">Could not load the card index.</div>'; });
}
