const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const W=+(process.argv[2]||1280);const p=await b.newPage({viewport:{width:W,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
p.on('dialog',d=>d.accept());
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html#new');await p.waitForTimeout(300);
await p.click('input[value=c0]');await p.click('#nstartbtn');await p.waitForTimeout(200);
console.log('MGRS',await p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save);return Object.values(G.ws).filter(w=>w.mgonly).map(w=>w.name+' cha'+w.cha)}));
await p.goto('file:///home/user/game/index.html#roster/mine');await p.waitForTimeout(150);
await p.click('tbody [data-star]');await p.waitForTimeout(150);
await p.click('[data-pa=mgp]');await p.waitForTimeout(80);await p.screenshot({path:'/tmp/m_pick.png'});await p.click('[data-mg]:not([disabled])');await p.waitForTimeout(100);
console.log('MGBY',await p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save);return Object.values(G.ws).filter(w=>w.mgBy).map(w=>w.name+' <- '+G.ws[w.mgBy].name)}));
for(let i=0;i<8;i++){await p.goto('file:///home/user/game/index.html#book');await p.waitForTimeout(30);try{await p.click('#auto:not([disabled])',{timeout:500})}catch(e){}await p.click('#run');await p.waitForTimeout(40);
  if(i===2)await p.screenshot({path:'/tmp/m_res.png',fullPage:true});
  if(!(await p.locator('#cont').count())){if(await p.locator('[data-x]').count())await p.click('[data-x]');if(await p.locator('#skip').count())await p.click('#skip');continue}
  await p.click('#cont');await p.waitForTimeout(40);if(await p.locator('#rok').count())await p.click('#rok')}
console.log('FANS',await p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save);return Object.values(G.cos).filter(c=>c.active).map(c=>c.short+' '+c.fans+' buys'+c.lastBuys+' '+c.size)}));
await p.goto('file:///home/user/game/index.html#company');await p.waitForTimeout(150);await p.screenshot({path:'/tmp/m_co.png',fullPage:true});
await p.reload();await p.waitForTimeout(300);console.log('RELOADX',await p.evaluate(()=>document.documentElement.scrollWidth));console.log('TOPR',await p.evaluate(()=>[...document.querySelectorAll('*')].map(e=>[Math.round(e.getBoundingClientRect().right+scrollX),e.tagName+'.'+e.className+'#'+e.id+' '+(e.innerText||'').slice(0,30)]).sort((a,b)=>b[0]-a[0]).slice(0,6)));console.log('WIDE',await p.evaluate(()=>[...document.querySelectorAll('body *')].filter(e=>e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflowX!=='visible'||e.getBoundingClientRect().right>390).slice(0,5).map(e=>e.tagName+'.'+e.className+' '+(e.innerText||'').slice(0,40))));
console.log('SCROLLX',await p.evaluate(()=>document.documentElement.scrollWidth));
console.log('ERRS',errs);await b.close()})();
