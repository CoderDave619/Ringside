const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const W=+(process.argv[2]||1280);const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open)d.querySelector('[data-y]').click()},40)});
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html#new');await p.waitForTimeout(300);
await p.click('input[value=c0]');await p.click('#nstartbtn');await p.waitForTimeout(200);
await p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save);G.cos[G.me].cash=5000000;localStorage.ro_save=JSON.stringify(G)});
await p.goto('file:///home/user/game/index.html#business');await p.reload();await p.waitForTimeout(300);
for(const k of ['prod','road','prod','ann','gm','doc','agent','tr','trainer']){await p.click(`[data-hire=${k}]`);await p.waitForTimeout(60);await p.click('[data-hp]:not([disabled]) >> nth=-1');await p.waitForTimeout(60)}
// announcer as wrestler
await p.click('[data-hire=ann]');await p.click('[data-hw] >> nth=0');await p.waitForTimeout(60);
for(const b of ['truck','gym','jet']){await p.click(`[data-buy=${b}]`);await p.waitForTimeout(60)}
await p.screenshot({path:`/tmp/biz_${W}.png`,fullPage:true});
await p.click('[data-sact="ann:over"]');await p.click('[data-sa] >> nth=0');await p.waitForTimeout(60);
await p.click('[data-sact="tr:sit"]');await p.click('[data-sa] >> nth=0');await p.waitForTimeout(60);
await p.click('[data-sact="agent:fa"]');await p.click('[data-sa] >> nth=0');await p.waitForTimeout(60);
await p.click('[data-sact="trainer:pick"]');await p.click('[data-tn] >> nth=0');await p.click('[data-tn] >> nth=1');await p.click('[data-x]');await p.waitForTimeout(60);
await p.click('[data-sact="gm:shot"]');await p.click('[data-sa] >> nth=0');await p.waitForTimeout(60);
console.log('STATE',await p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save),m=G.cos[G.me];return {staff:m.staff,crew:m.crew,items:m.items,cash:m.cash,trn:Object.values(G.ws).filter(w=>w.trn).length,news:G.news.slice(0,6).map(n=>n.text)}}));
await p.goto('file:///home/user/game/index.html#book');await p.waitForTimeout(150);if(await p.locator('#rok').count())await p.click('#rok');
await p.click('#auto');await p.waitForTimeout(100);
const n=await p.locator('[data-crw]').count();console.log('crew buttons',n);
if(n){await p.click('[data-crw] >> nth=0');await p.waitForTimeout(60);await p.click('[data-crw] >> nth=1');await p.waitForTimeout(60)}
await p.screenshot({path:`/tmp/biz_book_${W}.png`,fullPage:true});
await p.click('#run');await p.waitForTimeout(200);
console.log('RES',(await p.textContent('#dlgc')).replace(/\s+/g,' ').slice(0,300));
console.log('SCROLLX',await p.evaluate(()=>document.documentElement.scrollWidth));
console.log('ERRS',errs);await b.close()})();
