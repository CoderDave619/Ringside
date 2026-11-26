// 50-run bug test: node bug50.js [runs] [years] [parallel]
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const RUNS=+(process.argv[2]||50),YEARS=+(process.argv[3]||5),PAR=+(process.argv[4]||8);
const TABS=['dash','book','roster','superstars','feuds','teams','company','titles','events','business','calendar','war','companies','history/ev','history/tt','history/yr','history/st','history/rk','history/hof','history/aw','history/rec','history/wl','history/time','edit','home'];
async function one(b,i){const diff=['relaxed','standard','tough'][i%3],inj=['off','rare','normal','frequent'][Math.floor(i/3)%4],src=i%7===6?'tutorial':'builtin',ver=1+i%6,start=src==='tutorial'?'tut':['1994','2003','2011','2015','2020','2026'][ver-1];
  const p=await b.newPage({viewport:{width:i%4===0?390:1280,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));p.on('console',m=>{if(m.type()==='error'&&!/TUNNEL|net::/.test(m.text()))errs.push('console: '+m.text().slice(0,160))});p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open)d.querySelector('[data-y]').click()},40)});
  await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html?sim#new');await p.waitForTimeout(300);
  if(src==='tutorial'){await p.click('[data-nsrc=tutorial]')}else{await p.click(`[data-nver="${ver}"]`)}await p.waitForTimeout(150);
  const mode=['career','career','story','sandbox'][Math.floor(i/2)%4];await p.click(`input[name=nmode][value=${mode}]`);await p.waitForTimeout(100);
  const cos=await p.$$eval('input[name=nco]',L=>L.map(x=>x.value));const pick=cos[i%cos.length];await p.click(`input[value="${pick}"]`);await p.waitForTimeout(100);
  if(pick==='new'){await p.fill('#nn','Test Promotion '+i);await p.fill('#ns','T'+i)}
  await p.click(`[data-ndf=${diff}]`);await p.waitForTimeout(60);await p.click(`[data-ninj=${inj}]`);await p.waitForTimeout(60);await p.click(`[data-nslot="${1+i%3}"]`);await p.waitForTimeout(60);
  await p.click('#nstartbtn');await p.waitForTimeout(500);await p.evaluate(()=>{window.__full=true});
  const yrs=[];
  for(let y=0;y<YEARS;y++){
    await p.evaluate(()=>{for(let k=0;k<52;k++){if(__ro.G().over)break;__ro.week()}});
    yrs.push(await p.evaluate(()=>{const G=__ro.G(),m=G.cos[G.me];return {cash:Math.round(m.cash),pop:Math.round(m.pop),size:m.size,ros:Object.values(G.ws).filter(w=>w.co===G.me&&w.status==='active').length,over:G.over,ai:Object.values(G.cos).filter(c=>c.id!==G.me&&c.active).map(c=>Math.round(c.cash/1000)),closed:Object.values(G.cos).filter(c=>c.closed).length}}));
    // render every screen
    await p.evaluate(()=>{localStorage.ro_save=JSON.stringify(__ro.G())});
    for(const t of TABS){await p.evaluate(t=>{location.hash=t},t);await p.waitForTimeout(25)}
    await p.evaluate(()=>{location.hash='dash'});
    if(y===1){const ok=await p.evaluate(async()=>{await __ro.run('slotFlush()');const n=__ro.G().slot;return await __ro.run(`slotLoad(${'$'}{n})`.replace('${n}',n))});yrs[yrs.length-1].reload=ok}
    if(yrs[yrs.length-1].over)break}
  // character editor + staff page + a profile action, quick UI pass
  try{await p.evaluate(()=>{location.hash='superstars'});await p.waitForTimeout(150);if(await p.locator('[data-pa=look]').count()){await p.click('[data-pa=look]');await p.click('[data-rnd]');await p.click('#lkok')}}catch(e){errs.push('ui look: '+e.message.slice(0,80))}
  const cnt=await p.evaluate(()=>__ro.G().cnt||{});await p.close();
  return {i,diff,inj,start,mode,co:pick,yrs,errs:[...new Set(errs)],bad:cnt.bad||[],cnt}}
(async()=>{const b=await chromium.launch();const out=[];let next=0;
  await Promise.all(Array.from({length:PAR},async()=>{while(next<RUNS){const i=next++;try{out.push(await one(b,i))}catch(e){out.push({i,crash:e.message.slice(0,300)})}}}));
  out.sort((a,b)=>a.i-b.i);require('fs').writeFileSync('/tmp/bug50.json',JSON.stringify(out));
  const errs={};out.forEach(r=>(r.errs||[]).concat(r.crash?['CRASH '+r.crash]:[]).concat((r.bad||[]).map(x=>'BAD '+x)).forEach(e=>{errs[e]=(errs[e]||0)+1}));
  console.log('runs',out.length,'errors',JSON.stringify(errs,null,1));await b.close()})();
