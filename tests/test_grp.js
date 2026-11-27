const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open)d.querySelector('[data-y]').click()},40)});
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html#new');await p.waitForTimeout(300);
await p.click('input[value=c0]');await p.click('#nstartbtn');await p.waitForTimeout(200);
const ids=await p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save);return Object.values(G.ws).filter(w=>w.co===G.me&&w.status==='active').map(w=>w.id)});
await p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save);G.teams=[];localStorage.ro_save=JSON.stringify(G)});await p.reload();await p.waitForTimeout(200);
await p.goto('file:///home/user/game/index.html#teams');await p.waitForTimeout(100);
await p.evaluate(()=>{location.hash='factions'});await p.waitForTimeout(250);await p.click('#tnewf');await p.fill('#tn','Heenan Family');await p.click(`[data-mm="${ids[0]}"]`);await p.click(`[data-mm="${ids[1]}"]`);await p.click('#tok');await p.waitForTimeout(80);
await p.click('[data-tgo]');await p.waitForTimeout(80);
await p.selectOption('#tam',ids[2]);await p.click('#tadd');await p.waitForTimeout(60);
await p.fill('#tgn','The Family');await p.fill(`[data-role="${ids[0]}"]`,'Leader');await p.fill(`[data-role="${ids[1]}"]`,'Mouthpiece');await p.fill('#tgd','Old school heels');await p.click('#tsave');await p.waitForTimeout(60);
await p.setInputFiles('[data-img^="grp:"]','/tmp/logo.png');await p.waitForTimeout(400);
await p.click(`[data-trm="${ids[2]}"]`);await p.waitForTimeout(60);
for(let i=0;i<8;i++){await p.goto('file:///home/user/game/index.html#book');await p.click('#auto');await p.click('#run');await p.waitForTimeout(30);if(await p.locator('#cont').count())await p.click('#cont');if(await p.locator('#rok').count())await p.click('#rok')}
await p.goto('file:///home/user/game/index.html#edit');await p.click('[data-gc=c]');await p.waitForTimeout(60);
const me=await p.evaluate(()=>JSON.parse(localStorage.ro_save).me);await p.click(`[data-gs="${me}"]`).catch(()=>{});await p.waitForTimeout(60);
const has=await p.locator(`[data-img="co:${me}"]`).count();console.log('CO IMG FIELD',has);if(has){await p.setInputFiles(`[data-img="co:${me}"]`,'/tmp/logo.png');await p.waitForTimeout(400)}
console.log('LOGOS',await p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save);return {co:(G.cos[G.me].logo||'').length,grp:(G.teams[0].logo||'').length,name:G.teams[0].name,lead:!!G.teams[0].lead,log:(G.teams[0].log||[]).map(x=>x.t)}}));
await p.keyboard.press('Escape');await p.goto('file:///home/user/game/index.html#factions');await p.waitForTimeout(80);await p.click('[data-tgo]');await p.waitForTimeout(80);await p.screenshot({path:'/tmp/g_page.png',fullPage:true});
console.log('ERRS',errs);await b.close()})();
