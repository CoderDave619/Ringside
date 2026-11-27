const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const c=await b.newContext();const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open)d.querySelector('[data-y]').click()},40)});
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html#new');await p.waitForTimeout(300);
await p.click('[data-nver="4"]');await p.waitForTimeout(150);await p.click('input[name=nco] >> nth=0');await p.click('#nstartbtn');await p.waitForTimeout(500);
console.log('after new',await p.evaluate(()=>location.hash));
await p.evaluate(()=>{location.hash='book'});await p.waitForTimeout(200);
for(const u of ['index.html#book','index.html','index.html#roster/mine']){await p.goto('about:blank');await p.goto('file:///home/user/game/'+u);await p.waitForTimeout(400);console.log(u,'->',await p.evaluate(()=>location.hash),await p.evaluate(()=>document.querySelector('h2')?.innerText))}
console.log('ERRS',errs);await b.close()})();
