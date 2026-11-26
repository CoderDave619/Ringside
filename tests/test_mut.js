const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open)d.querySelector('[data-y]').click()},40)});
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html?sim#new');await p.waitForTimeout(300);
await p.click('[data-nver="2"]');await p.waitForTimeout(150);await p.click('input[name=nco] >> nth=0');await p.click('#nstartbtn');await p.waitForTimeout(400);
const r=await p.evaluate(()=>__ro.run(`(()=>{const out=[];roster(G.me).forEach(w=>w.mor=10);for(let i=0;i<12;i++){roster(G.me).forEach(w=>w.mor=10);mutinyWeek();upstartWeek();G.week++}
 const c=spawnCo({});for(let i=0;i<6;i++){upstartWeek();G.week++}
 return {warn:G.news.filter(n=>/Locker room warning/.test(n.text)).length,walk:G.news.filter(n=>/^Walkout/.test(n.text)).map(n=>n.text.slice(0,160)),up:c.short+' roster '+roster(c.id).length,offers:G.offers.length,lure:G.news.filter(n=>/lured|new company, made/.test(n.text)).length}})()`));
console.log(JSON.stringify(r,null,1));await p.evaluate(()=>{location.hash='dash'});await p.waitForTimeout(300);console.log('inbox unrest',await p.evaluate(()=>/Locker room unrest/.test(document.body.innerText)));
await p.evaluate(()=>{location.hash='companies'});await p.waitForTimeout(300);
console.log('ERRS',errs);await b.close()})();
