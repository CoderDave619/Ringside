const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const W=+(process.argv[2]||1280);const p=await b.newPage({viewport:{width:W,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
p.on('dialog',d=>d.accept());
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html#new');await p.waitForTimeout(300);
await p.click('input[value=c0]');await p.click('#nstartbtn');await p.waitForTimeout(200);
for(let i=0;i<10;i++){await p.goto('file:///home/user/game/index.html#book');await p.waitForTimeout(30);try{await p.click('#auto:not([disabled])',{timeout:500})}catch(e){}await p.click('#run');await p.waitForTimeout(40);
  if(!(await p.locator('#cont').count())){if(await p.locator('[data-x]').count())await p.click('[data-x]');if(await p.locator('#skip').count())await p.click('#skip');continue}
  await p.click('#cont');await p.waitForTimeout(40);if(await p.locator('#rok').count())await p.click('#rok')}
const sx=async n=>console.log(n,'SCROLLX',await p.evaluate(()=>document.documentElement.scrollWidth));
await p.goto('file:///home/user/game/index.html#dash');await p.waitForTimeout(150);await p.screenshot({path:'/tmp/d_dash.png',fullPage:true});await sx('dash');
await p.click('[data-ng=Company]');await p.waitForTimeout(80);await p.screenshot({path:'/tmp/d_nav.png'});
await p.goto('file:///home/user/game/index.html#company');await p.waitForTimeout(150);await p.screenshot({path:'/tmp/d_co.png',fullPage:true});await sx('co');
const o=await p.$$eval('#cosel option',os=>os.map(o=>o.value));await p.selectOption('#cosel',o[2]);await p.waitForTimeout(80);await p.screenshot({path:'/tmp/d_co2.png',fullPage:true});
await p.click('[data-ctl]');await p.waitForTimeout(150);console.log('after ctl',await p.evaluate(()=>location.hash));
await p.goto('file:///home/user/game/index.html#titles');await p.waitForTimeout(150);await p.screenshot({path:'/tmp/d_ti.png',fullPage:true});await sx('titles');
await p.goto('file:///home/user/game/index.html#events');await p.waitForTimeout(150);await p.screenshot({path:'/tmp/d_ev.png',fullPage:true});await sx('events');
if(await p.locator('[data-cev]').count()){await p.click('[data-cev]');await p.waitForTimeout(150);console.log('after cev',await p.evaluate(()=>location.hash+' '+document.querySelector('h2,h3')?.innerText))}
await p.goto('file:///home/user/game/index.html#companies');await p.waitForTimeout(100);if(await p.locator('[data-cv]').count()){await p.click('[data-cv]');await p.waitForTimeout(100);console.log('cv',await p.evaluate(()=>location.hash))}
await p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save);const R=Object.values(G.ws).filter(w=>w.co===G.me&&w.status==='active');G.disp=[{id:'dx1',a:R[0].id,b:R[1].id,why:'Backstage scuffle',wk:G.week,st:'open'},{id:'dx2',a:R[2].id,b:R[3].id,why:'Jealous of the champion',wk:G.week,st:'open'}];localStorage.ro_save=JSON.stringify(G)});
await p.goto('file:///home/user/game/index.html#home');await p.waitForTimeout(100);await p.goto('file:///home/user/game/index.html#dash');await p.reload();await p.waitForTimeout(200);await p.screenshot({path:'/tmp/d_disp.png',fullPage:true});
console.log('DSP',await p.locator('[data-dsp]').count());if(await p.locator('[data-dsp="dx1:pay"]').count()){await p.click('[data-dsp="dx1:pay"]');await p.waitForTimeout(80);await p.click('[data-dsp="dx2:main"]');await p.waitForTimeout(80)}
console.log('DISP after',await p.evaluate(()=>JSON.stringify(JSON.parse(localStorage.ro_save).disp)));
console.log('ERRS',errs);await b.close()})();
