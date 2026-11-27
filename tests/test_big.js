const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open)d.querySelector('[data-y]').click()},40);if(localStorage.fullTest){const o=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='ro_save'&&v.length>1000)throw new DOMException('full','QuotaExceededError');return o.call(this,k,v)}}});
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html?sim#new');await p.waitForTimeout(300);
await p.click('[data-nver="5"]');await p.waitForTimeout(150);await p.click('input[name=nco] >> nth=0');await p.click('#nstartbtn');await p.waitForTimeout(300);
await p.evaluate(()=>{localStorage.fullTest=1});await p.reload();await p.waitForTimeout(400);
console.log('pre',await p.evaluate(()=>[!!__ro.G(),location.hash,!!localStorage.ro_save,localStorage.ro_big]));await p.evaluate(()=>{__ro.week();__ro.run('save()')});await p.waitForTimeout(1200);
console.log('big',await p.evaluate(()=>localStorage.ro_big),'ls has save',await p.evaluate(()=>!!localStorage.ro_save));
const wk=await p.evaluate(()=>__ro.G().week);await p.reload();await p.waitForTimeout(1200);
console.log('after reload week',await p.evaluate(()=>__ro.G()?.week),'expected',wk,'hash',await p.evaluate(()=>location.hash),errs);await b.close()})();
