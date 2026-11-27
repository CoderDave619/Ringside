const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open)d.querySelector('[data-y]').click()},40)});
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html#new');await p.waitForTimeout(300);
await p.click('input[value=c0]');await p.click('#nstartbtn');await p.waitForTimeout(300);await p.evaluate(()=>{location.hash='book'});await p.waitForTimeout(200);
for(let i=0;i<60;i++){if(await p.isDisabled('#auto')){await p.click('#skip');await p.waitForTimeout(20);continue}await p.click('#auto');await p.click('#run');await p.waitForTimeout(30);if(await p.locator('#cont').count())await p.click('#cont');else{await p.click('[data-x]');await p.click('#skip')}await p.waitForTimeout(20);if(await p.locator('#rok').count())await p.click('#rok')}
await p.click('[data-ng=History]');await p.click('#nav a[href="#history/ev"]');await p.waitForTimeout(150);await p.screenshot({path:'/tmp/h_ev.png',fullPage:true});
await p.click('#nav [data-ng=History]');await p.click('#nav a[href="#history/tt"]');await p.waitForTimeout(150);await p.screenshot({path:'/tmp/h_tt.png',fullPage:true});
await p.click('#nav [data-ng=History]');await p.click('#nav a[href="#history/yr"]');await p.waitForTimeout(150);
console.log('YEAR',await p.locator('h2').last().innerText());
await p.click('[data-hy]');await p.waitForTimeout(100);console.log('PREV',await p.locator('main h2').last().innerText());await p.screenshot({path:'/tmp/h_yr.png',fullPage:true});
await p.click('main summary');await p.waitForTimeout(60);await p.click('main details[open] [data-hev]');await p.waitForTimeout(100);console.log('OPENED',await p.locator('main .panel h2').first().innerText());
await p.goto('file:///home/user/game/index.html#wrestlers');await p.waitForTimeout(150);await p.click('[data-sf=all]');await p.waitForTimeout(100);await p.evaluate(()=>window.scrollTo(0,900));await p.screenshot({path:'/tmp/h_prof.png'});
await p.setViewportSize({width:390,height:844});await p.goto('file:///home/user/game/index.html#history/tt');await p.waitForTimeout(150);console.log('SCROLLX',await p.evaluate(()=>document.documentElement.scrollWidth));
await p.goto('file:///home/user/game/index.html#history/yr');await p.waitForTimeout(150);console.log('SCROLLX yr',await p.evaluate(()=>document.documentElement.scrollWidth));
console.log('ERRS',errs);await b.close()})();
