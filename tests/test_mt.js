const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:800}});await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open&&!window.__noauto)d.querySelector('[data-y]').click()},40)});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html?sim#new');await p.waitForTimeout(300);
await p.click('[data-nver="1"]');await p.waitForTimeout(150);await p.click('input[value=c0]');await p.click('#nstartbtn');await p.waitForTimeout(300);
await p.evaluate(()=>{location.hash='book'});await p.waitForTimeout(300);
async function add(ty,custom){await p.evaluate(()=>__ro.run('G.card=[];dMatch()'));await p.waitForTimeout(100);await p.click(`[data-ty=${ty}]`);
 if(custom){for(const c of custom)await p.click(c);}
 for(let i=0;i<20;i++){const ok=await p.$('#mok:not([disabled])');if(ok)break;const pk=await p.$('[data-pk]:not([disabled])');if(!pk)break;await pk.click()}
 await p.screenshot({path:`/tmp/mt_${ty}.png`});const ok=await p.$('#mok:not([disabled])');if(ok){await ok.click();console.log('added',ty,await p.evaluate(()=>JSON.stringify(__ro.G().card.filter(x=>x.t==='m').map(x=>x.sides.map(s=>s.length).join('v')))))}else{console.log('could not fill',ty);await p.keyboard.press('Escape')}await p.waitForTimeout(100)}
await add('h12');await add('h23');await add('five');await add('custom',['[data-cs=add]','[data-cp="1:1"]']);
const card=await p.evaluate(()=>(__ro.G().shows||[]).slice(-1).concat(__ro.G().card).filter(x=>x.t==='m').map(x=>x.sides.map(s=>s.length).join('v')));console.log('CARD',card);
// run lots of uneven matches through the engine
const res=await p.evaluate(()=>__ro.run(`(()=>{const R=roster(G.me).filter(canWork);const out={w1:0,w2:0};for(let i=0;i<300;i++){const a=R[i%R.length],b=R[(i+1)%R.length],c=R[(i+2)%R.length];if(a===b||b===c||a===c)continue;const m={t:'m',sides:[[a.id],[b.id,c.id]],win:null,fin:{t:'Pinfall'}};m.win=simWinner(m);out[m.win?'w2':'w1']++;rateMatch(m,{})}return out})()`));
console.log('1v2 winners',JSON.stringify(res));
await p.evaluate(()=>{for(let i=0;i<3;i++)__ro.week()});
console.log('ERRS',errs);await b.close()})();
