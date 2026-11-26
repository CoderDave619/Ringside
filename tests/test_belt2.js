const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open&&!window.__noauto)d.querySelector('[data-y]').click()},40)});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html#editor');await p.waitForTimeout(400);
await p.evaluate(()=>{const b=[...document.querySelectorAll('button,[data-cat],[data-ecat]')].find(x=>/^Titles/i.test(x.textContent.trim()));if(b)b.click()});await p.waitForTimeout(300);
const first=await p.$('[data-es]');if(first)await first.click();await p.waitForTimeout(200);
const eb=await p.$('#ebelt');console.log('ebelt',!!eb);
if(eb){await eb.click();await p.waitForTimeout(200);await p.click('[data-pre="Royal"]');await p.click('#blok');await p.waitForTimeout(300);
 console.log('saved in editor',await p.evaluate(()=>{const e=JSON.parse(localStorage.ro_ed||'null');return e&&(e.titles||[]).filter(t=>t.belt).length}));}
await p.goto('file:///home/user/game/index.html?sim#new');await p.waitForTimeout(300);
await p.click('input[value=c3]');await p.click('#nstartbtn');await p.waitForTimeout(300);
const ch=await p.evaluate(()=>{const G=__ro.G();const t=Object.values(G.titles).find(t=>t.reigns.some(r=>!r.lost&&!r.pre&&r.h.length));return t&&t.reigns.find(r=>!r.lost&&!r.pre).h[0]});
if(ch){await p.evaluate(id=>__ro.run(`goW('${id}')`),ch);await p.waitForTimeout(300);console.log('profile belt chips',await p.$$eval('[data-belt-view]',x=>x.length));await p.screenshot({path:'/tmp/belt_prof.png'})}
console.log('ERRS',errs);await b.close()})();
