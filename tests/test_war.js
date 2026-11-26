const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open)d.querySelector('[data-y]').click()},40)});
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html#new');await p.waitForTimeout(300);
await p.click('input[value=c0]');await p.click('#nstartbtn');await p.waitForTimeout(200);
await p.goto('file:///home/user/game/index.html#calendar');await p.waitForTimeout(100);await p.selectOption('#ccyc','2');await p.waitForTimeout(80);await p.screenshot({path:'/tmp/w_cal.png',fullPage:true});
await p.goto('file:///home/user/game/index.html#book');
for(let i=0;i<14;i++){await p.click('#auto');await p.click('#run');await p.waitForTimeout(30);if(await p.locator('#cont').count())await p.click('#cont');else{await p.click('[data-x]');await p.click('#skip')}await p.waitForTimeout(30);if(await p.locator('#rok').count())await p.click('#rok')}
console.log('SCHED',await p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save);const maj={};G.shows.filter(x=>x.mj).forEach(x=>{(maj[x.d]=maj[x.d]||[]).push(x.s)});return {cyc:Object.values(G.cos).map(c=>c.short+':'+c.cyc),maj,war:(G.war||[]).length,last:(G.war||[]).slice(-1)[0]?.rows.map(r=>r.s+' '+r.sc+' #'+r.rk)}}));
await p.goto('file:///home/user/game/index.html#war');await p.waitForTimeout(120);await p.screenshot({path:'/tmp/w_war.png',fullPage:true});
await p.setViewportSize({width:390,height:844});await p.waitForTimeout(80);console.log('SCROLLX',await p.evaluate(()=>document.documentElement.scrollWidth));
console.log('ERRS',errs);await b.close()})();
