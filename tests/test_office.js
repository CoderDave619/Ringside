const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();for(const vw of [[1280,900],[390,800]]){const p=await b.newPage({viewport:{width:vw[0],height:vw[1]}});await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open&&!window.__noauto)d.querySelector('[data-y]').click()},40)});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html?sim#new');await p.waitForTimeout(300);
await p.click('[data-nver="4"]');await p.waitForTimeout(150);const cs=await p.$$eval('input[name=nco]',L=>L.map(x=>x.value));await p.click(`input[name=nco][value="${cs[0]}"]`);await p.click('#nstartbtn');await p.waitForTimeout(500);
console.log(vw[0],'landed',await p.evaluate(()=>location.hash));
for(let k=0;k<4;k++)await p.evaluate(()=>__ro.week());await p.evaluate(()=>{location.hash='home'});await p.waitForTimeout(100);await p.evaluate(()=>{location.hash='office'});await p.waitForTimeout(300);
await p.screenshot({path:`/tmp/of_${vw[0]}.png`});
const objs=await p.$$eval('.ofc a.obj',L=>L.map(a=>a.getAttribute('href')));console.log('objects',objs.join(' '));
for(const h of objs){await p.evaluate(()=>{location.hash='office'});await p.waitForTimeout(150);await p.click(`.ofc a.obj[href="${h}"] .art`);await p.waitForTimeout(150);const t=await p.evaluate(()=>location.hash+' '+(document.querySelector('#app h2')||{}).textContent);if(!t.includes(h))console.log('BAD',h,t)}
await p.evaluate(()=>{location.hash='news'});await p.waitForTimeout(300);await p.screenshot({path:`/tmp/nw_${vw[0]}.png`});console.log('articles',await p.$$eval('.nwa',x=>x.length));
await p.click('[data-nws=tt]').catch(()=>console.log('no tt sec'));await p.waitForTimeout(100);
await p.evaluate(()=>{location.hash='settings'});await p.waitForTimeout(200);await p.selectOption('#cdiff','tough');await p.waitForTimeout(100);console.log('diff',await p.evaluate(()=>__ro.G().opts.diff));
await p.screenshot({path:`/tmp/st_${vw[0]}.png`});
await p.evaluate(()=>{location.hash='calendar'});await p.waitForTimeout(200);console.log('brands on calendar',await p.$$eval('[data-brand]',x=>x.length),'cdiff gone',!(await p.$('#cdiff')));
await p.fill('[data-brand="0"]','Alpha');await p.fill('[data-brand="1"]','Beta');await p.click('[data-bsave]');await p.waitForTimeout(150);console.log('brands',await p.evaluate(()=>JSON.stringify(__ro.G().cos[__ro.G().me].brands)));
await p.evaluate(()=>{location.hash='business'});await p.waitForTimeout(200);console.log('brands gone from store',!(await p.$('[data-brand]')));
console.log('scrollX',await p.evaluate(()=>document.documentElement.scrollWidth),'ERRS',errs);await p.close()}await b.close()})();
