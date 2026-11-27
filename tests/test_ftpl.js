const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:900},colorScheme:'dark'});const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open)d.querySelector('[data-y]').click()},40)});
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html?sim#new');await p.waitForTimeout(300);
await p.click('[data-nver="5"]');await p.waitForTimeout(150);await p.click('input[name=nco] >> nth=0');await p.click('#nstartbtn');await p.waitForTimeout(400);
await p.evaluate(()=>{__ro.run('G.feuds=[]');location.hash='book'});await p.waitForTimeout(300);
const ids=await p.$$eval('.bw:not(.used):not(.out)',x=>x.slice(0,2).map(e=>e.dataset.bw));await p.click('#addm');for(const id of ids){await p.click(`[data-bw="${id}"]`);await p.waitForTimeout(50)}
await p.click('[data-sfeud]');await p.waitForTimeout(200);await p.click('[data-ftp="betrayal"]');await p.waitForTimeout(100);await p.screenshot({path:'/tmp/ftpl.png'});
await p.click('#fok');await p.waitForTimeout(300);
console.log(await p.evaluate(()=>__ro.run('JSON.stringify(FE().filter(f=>f.st==="cur").map(f=>[f.why,f.tpl,Math.round(f.heat),f.hm]).slice(-1))')));
console.log('beat',await p.$$eval('.fcard .sub',x=>x.map(e=>e.textContent).filter(t=>/Next/.test(t))));
console.log(errs);await b.close()})();
