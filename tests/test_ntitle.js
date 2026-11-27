const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();for(const vw of [[1280,900],[390,800]]){const p=await b.newPage({viewport:{width:vw[0],height:vw[1]},colorScheme:'dark'});const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open)d.querySelector('[data-y]').click()},40)});
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html?sim#new');await p.waitForTimeout(300);
await p.click('[data-nver="4"]');await p.waitForTimeout(150);await p.click('input[name=nco] >> nth=0');await p.click('#nstartbtn');await p.waitForTimeout(400);
await p.evaluate(()=>{location.hash='titles'});await p.waitForTimeout(300);
await p.click('#tnew');await p.waitForTimeout(150);await p.click('#ntok');console.log('empty err',await p.textContent('#nterr'));
await p.fill('#ntn','WWE Hardcore Championship');await p.selectOption('#ntt','3');await p.screenshot({path:`/tmp/sh/nt_${vw[0]}.png`});await p.click('#ntok');await p.waitForTimeout(300);
console.log(vw[0],await p.evaluate(()=>__ro.run('JSON.stringify(titlesOf(G.me).map(t=>t.name+"/"+t.tier))')));
// crown via a match
const opts=await p.evaluate(()=>__ro.run(`(()=>{const R=roster(G.me).filter(canWork).filter(w=>!Object.values(G.titles).some(t=>reignOf(t)&&reignOf(t).h.includes(w.id)));G.card=[{t:'m',sides:[[R[0].id],[R[1].id]],mt:'singles'}];const t=titlesOf(G.me).find(t=>t.name==='WWE Hardcore Championship');return titleOpts(G.me,G.card[0],G.card).some(x=>x.id===t.id)})()`));
console.log('can be put on the line',opts,'ERRS',errs);await p.close()}await b.close()})();
