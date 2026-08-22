(function(){
  const $=id=>document.getElementById(id);
  let BANK=[], queue=[], pos=0, state=load();
  function load(){ try{return JSON.parse(localStorage.getItem('iv_v1'))||{status:{}}}catch(e){return {status:{}}} }
  function save(){ try{localStorage.setItem('iv_v1', JSON.stringify(state));}catch(e){} }
  const personas=[
    'A senior RF/RU validation lead asks:',
    'RAN system-design round —',
    'Rapid-fire (15-yr RCT lead):',
    'Debug walkthrough — the interviewer probes:',
    'Cross-domain (RF ↔ protocol):',
    'Scenario question:'
  ];
  function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));const t=a[i];a[i]=a[j];a[j]=t;}return a;}
  function counts(){let g=0,r=0;for(const k in state.status){if(state.status[k]==='gotit')g++;else if(state.status[k]==='review')r++;}return {g:g,r:r};}
  function buildQueue(){
    const topic=$('iv-topic').value, mode=$('iv-mode').value;
    let items=BANK.slice();
    if(topic!=='all') items=items.filter(function(it){return it.topics.indexOf(topic)>=0;});
    if(mode==='review') items=items.filter(function(it){return state.status[it.q]==='review';});
    if(mode!=='order') shuffle(items);
    if(mode!=='review') items.sort(function(a,b){return (b.real?1:0)-(a.real?1:0);});
    queue=items; pos=0;
  }
  function render(){
    const c=counts(); $('iv-gotit').textContent='✓ '+c.g+' got it'; $('iv-review').textContent='↻ '+c.r+' to review';
    if(!queue.length){ $('iv-persona').textContent=''; $('iv-q').innerHTML='<span style="color:#4a5470">No questions match this filter. Try another topic, or switch mode back to Random.</span>'; $('iv-a').style.display='none'; $('iv-progress').textContent='0 / 0'; return; }
    if(pos>=queue.length){
      const g=queue.filter(function(it){return state.status[it.q]==='gotit';}).length;
      const r=queue.filter(function(it){return state.status[it.q]==='review';}).length;
      $('iv-persona').textContent='✅ Session complete';
      $('iv-q').innerHTML='You went through <b>'+queue.length+'</b> questions &mdash; ✓ '+g+' got it, ↻ '+r+' to review.<br><br>Switch to <b>Review flagged</b> mode to drill the ones you marked, pick another topic, or press <b>Start / Shuffle</b> to go again.';
      $('iv-a').style.display='none'; $('iv-your').value=''; $('iv-progress').textContent=queue.length+' / '+queue.length; return;
    }
    const it=queue[pos];
    $('iv-persona').innerHTML=(it.real?'<span style="color:#f5a623">⭐ Asked in a real interview</span> &mdash; ':'')+'<span style="color:#9b8cf8;font-weight:700">'+personas[pos%personas.length]+'</span> <span style="color:#4a5470;font-size:11px">['+it.topics.join(' · ')+']</span>';
    $('iv-q').textContent=it.q;
    $('iv-a').style.display='none'; $('iv-a').innerHTML='';
    $('iv-your').value='';
    $('iv-progress').textContent=(pos+1)+' / '+queue.length;
  }
  function showAns(){ const it=queue[pos]; if(!it)return; const src=it.card?('<div style="margin-top:10px;font-size:11px;color:#4a5470">source: <a style="color:#5bc4ef;text-decoration:none" href="'+it.file+'#'+it.card+'">'+it.card+' ↗</a></div>'):''; $('iv-a').innerHTML='<div style="font-weight:700;color:#00d4a0;margin-bottom:6px">Model answer</div>'+it.a+src; $('iv-a').style.display='block'; }
  function mark(s){ const it=queue[pos]; if(!it||pos>=queue.length)return; state.status[it.q]=s; save(); pos++; render(); }
  function next(){ if(pos<queue.length){pos++; render();} }
  function start(){ buildQueue(); render(); }
  fetch('interview-bank.json').then(function(r){return r.json();}).then(function(b){
    BANK=b;
    const tset={}; b.forEach(function(it){it.topics.forEach(function(t){tset[t]=(tset[t]||0)+1;});});
    const sel=$('iv-topic');
    Object.keys(tset).sort(function(a,b){return tset[b]-tset[a];}).forEach(function(t){var o=document.createElement('option');o.value=t;o.textContent=t+' ('+tset[t]+')';sel.appendChild(o);});
    if($('iv-total')) $('iv-total').textContent=b.length;
    $('iv-start').onclick=start; $('iv-show').onclick=showAns;
    $('iv-got').onclick=function(){mark('gotit');}; $('iv-rev').onclick=function(){mark('review');}; $('iv-next').onclick=next;
    $('iv-reset').onclick=function(){ if(confirm('Reset your interview progress (got-it / review marks)?')){state={status:{}};save();render();} };
    $('iv-topic').onchange=start; $('iv-mode').onchange=start;
    start();
  }).catch(function(e){ $('iv-q').textContent='Could not load the question bank (interview-bank.json).'; });
})();
