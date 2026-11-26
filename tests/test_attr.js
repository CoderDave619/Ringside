const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const W=+(process.argv[2]||1280);const p=await b.newPage({viewport:{width:W,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
p.on('dialog',d=>d.accept());
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html#new');await p.waitForTimeout(300);
await p.click('input[value=c0]');await p.click('#nstartbtn');await p.waitForTimeout(200);
for(let i=0;i<6;i++){await p.goto('file:///home/user/game/index.html#book');await p.waitForTimeout(30);try{await p.click('#auto:not([disabled])',{timeout:500})}catch(e){}await p.click('#run');await p.waitForTimeout(40);
  if(!(await p.locator('#cont').count())){if(await p.locator('[data-x]').count())await p.click('[data-x]');if(await p.locator('#skip').count())await p.click('#skip');continue}
  await p.click('#cont');await p.waitForTimeout(40);if(await p.locator('#rok').count())await p.click('#rok')}
console.log('ATTR',await p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save);return Object.values(G.ws).filter(w=>w.spec).slice(0,8).map(w=>`${w.name} wt${w.wt} fit${w.fit} fly${w.fly} pow${w.pow} tec${w.tec} brw${w.brw} agi${w.agi} psy${w.psy} ${w.per} ${w.spec}`)}));
await p.goto('file:///home/user/game/index.html#roster/mine');await p.waitForTimeout(150);
await p.click('tbody [data-star]');await p.waitForTimeout(150);await p.screenshot({path:'/tmp/a_prof.png',fullPage:true});
await p.click('[data-pa=train]');await p.waitForTimeout(80);await p.click('[data-ts=fly]');await p.waitForTimeout(40);await p.screenshot({path:'/tmp/a_train.png'});await p.click('#tok');await p.waitForTimeout(80);
console.log('TRAINMSG',await p.evaluate(()=>document.querySelector('.msg')?.innerText));await p.click('[data-x]');
await p.click('[data-pa=coach]');await p.waitForTimeout(80);await p.click('[data-cs=highflyer]');await p.screenshot({path:'/tmp/a_coach.png'});await p.click('#cok');await p.waitForTimeout(60);console.log('COACH1',await p.evaluate(()=>document.querySelector('.msg')?.innerText));await p.click('[data-x]');await p.waitForTimeout(80);
console.log('SCROLLX',await p.evaluate(()=>document.documentElement.scrollWidth));
await p.goto('file:///home/user/game/index.html#editor');await p.waitForTimeout(200);
console.log('ERRS',errs);await b.close()})();
