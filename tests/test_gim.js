const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const W=+(process.argv[2]||1280);const p=await b.newPage({viewport:{width:W,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open)d.querySelector('[data-y]').click()},40)});
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html#new');await p.waitForTimeout(300);
await p.click('input[value=c0]');await p.click('#nstartbtn');await p.waitForTimeout(200);
await p.goto('file:///home/user/game/index.html#book');await p.waitForTimeout(100);
while(await p.locator('[data-rm]').count()){await p.click('[data-rm]');await p.waitForTimeout(20)}
const pick=async n=>{for(let i=0;i<n;i++){const L=p.locator('.bw:not(.used):not(.out)');if(!(await L.count())){console.log('SHORT',i);break}await L.first().click();await p.waitForTimeout(30)}};
const lastI=()=>p.evaluate(()=>__ro?__ro.G().card.length-1:0);
const addm=async(ty)=>{await p.click('#addm');await p.waitForTimeout(40);const i=await p.evaluate(()=>document.querySelectorAll('.bm').length-1);if(ty)await p.selectOption('#bmt'+i,ty);await p.waitForTimeout(40);return i};
// triple threat with ladder
{const i=await addm('triple');await pick(3);await p.selectOption('#bgm'+i,'ladder');await p.waitForTimeout(40);await p.screenshot({path:'/tmp/g_add.png'})}
// singles then set deathmatch via card button
{const i=await addm();await pick(2);await p.selectOption('#bgm'+i,'death');await p.waitForTimeout(40)}
console.log('CARD',await p.evaluate(()=>[...document.querySelectorAll('.bm')].map(e=>e.innerText.replace(/\s+/g,' ').slice(0,120))));
await p.screenshot({path:'/tmp/g_card.png',fullPage:true});
console.log('OUTLOOK',await p.evaluate(()=>[...document.querySelectorAll('.kv')].map(e=>e.innerText.replace(/\s+/g,' ')).filter(t=>/gimmick/i.test(t))));
console.log('SCROLLX',await p.evaluate(()=>document.documentElement.scrollWidth));
const runWk=async()=>{await p.click('#run');await p.waitForTimeout(150);await p.click('#cont');await p.waitForTimeout(150);if(await p.locator('#rok').count())await p.click('#rok');await p.goto('file:///home/user/game/index.html#book');await p.waitForTimeout(100);while(await p.locator('[data-rm]').count()){await p.click('[data-rm]');await p.waitForTimeout(20)}};
const last=()=>p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save);const sh=G.shows.filter(s=>s.c===G.me).slice(-1)[0];return sh.m.map(m=>[m[0],m[1],m[2],m[3],m[4],m[9]].join(' | '))});
await p.click('#run');await p.waitForTimeout(150);await p.screenshot({path:'/tmp/g_res.png',fullPage:true});
await p.click('#cont');await p.waitForTimeout(150);if(await p.locator('#rok').count())await p.click('#rok');
const S=await p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save);const sh=G.shows.filter(s=>s.c===G.me).slice(-1)[0];return sh.m.map(m=>[m[0],m[1],m[2],m[3],m[4],m[9]].join(' | '))});console.log('SHOW',S);
await p.goto('file:///home/user/game/index.html#book');await p.waitForTimeout(100);while(await p.locator('[data-rm]').count()){await p.click('[data-rm]');await p.waitForTimeout(20)}
// battle royal 6
{const i=await addm('multi');await pick(6);await p.selectOption('#bgm'+i,'royal').catch(e=>console.log('no royal'));await p.waitForTimeout(60)}
await p.screenshot({path:'/tmp/g_royal.png'});await runWk();console.log('ROYAL',await last());
// four way with submission + finish dialog
{const i=await addm('four');await pick(4);await p.selectOption('#bgm'+i,'sub');await p.waitForTimeout(60)}
await p.click('[data-fin]').catch(()=>{});await p.waitForTimeout(60);await p.screenshot({path:'/tmp/g_fin.png'});console.log('FIN opts',await p.evaluate(()=>[...document.querySelectorAll('[data-f]')].map(b=>b.innerText)));if(await p.locator('[data-x]').count())await p.click('[data-x]');await runWk();console.log('FOUR',await last());

for(let k=0;k<10;k++){await p.click('#auto');await runWk()}
console.log('AI GIMS',await p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save);const c={};G.shows.forEach(s=>s.m.forEach(m=>{if(m[9])c[m[9]]=(c[m[9]]||0)+1}));return c}));
console.log('ERRS',errs);await b.close()})();
