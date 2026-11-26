const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:800},acceptDownloads:true});await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open&&!window.__noauto)d.querySelector('[data-y]').click()},40)});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html?sim#new');await p.waitForTimeout(300);
await p.click('input[value=story]');await p.waitForTimeout(150);
console.log('story picks new co',await p.$eval('input[value=new]',x=>x.checked));
await p.fill('#nn','Neon Wrestling');await p.fill('#ns','NEON');await p.selectOption('#nsz','Local');
await p.click('#nstartbtn');await p.waitForTimeout(400);
console.log('camp box',(await p.evaluate(()=>document.querySelector('.camp')?.innerText||'none')).slice(0,120).replace(/\n/g,' | '));
await p.screenshot({path:'/tmp/camp.png'});
await p.evaluate(()=>__ro.run(`freeAgents().slice(0,8).forEach(w=>signW(w,G.me,100,8));achCheck();save();render()`));await p.waitForTimeout(200);console.log('after signing',(await p.evaluate(()=>document.querySelector('.camp')?.innerText||'none')).slice(0,60).replace(/\n/g,' | '));
await p.click('#auto');await p.waitForTimeout(200);await p.click('#run');await p.waitForTimeout(400);
await p.screenshot({path:'/tmp/camp_toast.png'});
const cont=await p.$('#cont');if(cont){await cont.click();await p.waitForTimeout(300)}
console.log('camp after',(await p.evaluate(()=>document.querySelector('.camp')?.innerText||'none')).slice(0,80).replace(/\n/g,' | '));
await p.evaluate(()=>{location.hash='history'});await p.waitForTimeout(300);await p.click('[data-hv=ach]');await p.waitForTimeout(200);
console.log('ach',(await p.evaluate(()=>document.querySelector('.achs')?.parentElement.innerText||'')).slice(0,160).replace(/\n/g,' | '));
await p.screenshot({path:'/tmp/ach.png',fullPage:false});
console.log('size',await p.evaluate(()=>{const s=JSON.parse(localStorage.ro_save);return s.cos[s.me].size+' '+s.opts.mode}));
// scenario share and load
await p.evaluate(()=>{location.hash='editor'});await p.waitForTimeout(400);
const [dl]=await Promise.all([p.waitForEvent('download'),p.click('#eexp')]);const path=await dl.path();console.log('download',dl.suggestedFilename());
const fs=require('fs');const j=JSON.parse(fs.readFileSync(path,'utf8'));j.scenario.name='Shared test';fs.writeFileSync('/tmp/shared.json',JSON.stringify(j));
const [fc]=await Promise.all([p.waitForEvent('filechooser'),p.click('#eimf')]);await fc.setFiles('/tmp/shared.json');await p.waitForTimeout(400);
console.log('load msg',await p.evaluate(()=>document.getElementById('emsg')?.innerText));
await p.goto('file:///home/user/game/index.html#new');await p.waitForTimeout(300);
console.log('in new list',await p.$$eval('[data-nsrc]',x=>x.map(e=>e.dataset.nsrc).filter(k=>k.includes('Shared'))));
console.log('ERRS',errs);await b.close()})();
