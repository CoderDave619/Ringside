const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();for(const vw of [[1280,900],[390,800]]){const p=await b.newPage({viewport:{width:vw[0],height:vw[1]}});await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open&&!window.__noauto)d.querySelector('[data-y]').click()},40)});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html?sim#new');await p.waitForTimeout(300);
await p.click('[data-nver="1"]');await p.waitForTimeout(150);await p.click('input[name=nco][value=new]');await p.fill('#nn','Test Co');await p.fill('#ns','TC');await p.click('#nstartbtn');await p.waitForTimeout(300);
const ids=await p.evaluate(()=>__ro.run(`freeAgents().filter(w=>w.status==='active'&&!w.mgr).slice(0,12).forEach(w=>signW(w,G.me,100,8));const R=roster(G.me).sort((a,b)=>b.pop-a.pop);R[1].out=G.week+3;R[1].outWhy='injury';R[2].mom=85;startFeud([[R[0].id],[R[3].id]],'Respect',70,'you');startFeud([[R[0].id],[R[4].id]],'Respect',35,'you');startFeud([[R[0].id],[R[5].id]],'Respect',10,'you');G.card=[];save();R.map(w=>w.id)`));
await p.evaluate(()=>{location.hash='book'});await p.waitForTimeout(200);await p.evaluate(()=>__ro.run('render()'));await p.waitForTimeout(200);
// tap two wrestlers -> singles match
await p.click(`[data-bw="${ids[0]}"]`);await p.waitForTimeout(100);
const fe=await p.$$eval('.bw.fe',x=>x.map(e=>e.getAttribute('style')));console.log(vw[0],'feud highlights',fe.length,fe);
console.log('injured section',await p.$eval('.bksec',e=>e.textContent).catch(()=>'none'),'hot',await p.$$eval('.bw .mk.hot',x=>x.length));
await p.screenshot({path:`/tmp/ob1_${vw[0]}.png`});
await p.click(`[data-bw="${ids[3]}"]`);await p.waitForTimeout(100);
let card=await p.evaluate(()=>JSON.stringify(__ro.G().card.map(x=>x.sides||x.who)));console.log('card after 2 taps',card);
// tap injured -> refused
await p.click(`[data-bw="${ids[1]}"]`);await p.waitForTimeout(200);
// third tap creates a new match
await p.click(`[data-bw="${ids[2]}"]`);await p.waitForTimeout(100);
// change match 2 to tag team
await p.selectOption('#bmt1','tag');await p.waitForTimeout(100);
for(const k of [4,5,6])await p.click(`[data-bw="${ids[k]}"]`).then(()=>p.waitForTimeout(80));
card=await p.evaluate(()=>JSON.stringify(__ro.G().card.map(x=>({mt:x.mt,s:x.sides}))));console.log('after tag',card);
// segment
await p.click('#adds');await p.waitForTimeout(100);await p.click(`[data-bw="${ids[7]}"]`);await p.waitForTimeout(100);await p.selectOption('#bsg2','Challenge');
// incomplete match blocks run
await p.click('#addm');await p.waitForTimeout(100);await p.evaluate(()=>{window.__noauto=1});await p.click('#run');await p.waitForTimeout(200);
console.log('run blocked:',await p.$eval('#cfm',d=>d.open&&d.innerText).catch(()=>'no'));await p.click('#cfm [data-y]');await p.evaluate(()=>{window.__noauto=0});
await p.screenshot({path:`/tmp/ob2_${vw[0]}.png`,fullPage:vw[0]>500});
await p.click('[data-rm="3"]');await p.waitForTimeout(100);
// remove a person, then title select
await p.click(`[data-win="0:0"]`);await p.waitForTimeout(100);
console.log('win',await p.evaluate(()=>__ro.G().card[0].win));
await p.click('#run');await p.waitForTimeout(500);console.log('show ran',await p.evaluate(()=>__ro.run('myShows().length')));
await p.evaluate(()=>{location.hash='roster'});await p.waitForTimeout(300);
console.log('roster sec',await p.$eval('tr.secrow',e=>e.textContent).catch(()=>'none'),'last row out',await p.$$eval('tbody tr',r=>r[r.length-1].innerText.slice(0,60)));
await p.screenshot({path:`/tmp/ob3_${vw[0]}.png`});
console.log('scrollX',await p.evaluate(()=>document.documentElement.scrollWidth),'ERRS',errs);await p.close()}await b.close()})();
