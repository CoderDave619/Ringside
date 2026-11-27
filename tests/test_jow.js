const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();for(const vw of [[1280,900],[390,800]]){const p=await b.newPage({viewport:{width:vw[0],height:vw[1]}});const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open)d.querySelector('[data-y]').click()},40)});
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html?sim#new');await p.waitForTimeout(300);
await p.click('[data-nver="4"]');await p.waitForTimeout(150);await p.click('input[name=nco] >> nth=0');await p.click('#nstartbtn');await p.waitForTimeout(400);
await p.evaluate(()=>{location.hash='book'});await p.waitForTimeout(300);await p.evaluate(()=>__ro.run('render()'));
await p.click('#adds');await p.waitForTimeout(100);await p.selectOption('#bsg0','Custom');await p.waitForTimeout(100);await p.selectOption('#bstn0','call');await p.fill('#bstx0','Unveils a new faction');await p.locator('#bstx0').blur();
const ids=await p.$$eval('.bw:not(.used):not(.out)',x=>x.slice(0,8).map(e=>e.dataset.bw));for(const id of ids.slice(0,7)){await p.click(`[data-bw="${id}"]`);await p.waitForTimeout(40)}
console.log(vw[0],'seg',await p.evaluate(()=>JSON.stringify(__ro.G().card[0])));
await p.screenshot({path:`/tmp/jow_book_${vw[0]}.png`});
await p.click('#addm');await p.waitForTimeout(80);for(const id of ids.slice(0,0))0;
await p.evaluate(()=>__ro.run(`(()=>{const t=titlesOf(G.me)[0];t.rule='gim';const R=roster(G.me).filter(canWork).filter(w=>!G.card[0].who.includes(w.id));G.card[1].sides=[[R[0].id],[R[1].id]];return 1})()`));
console.log('title opts with gim rule (standard match)',await p.evaluate(()=>__ro.run('titleOpts(G.me,G.card[1],G.card).map(t=>t.name).join("|")')));
await p.evaluate(()=>__ro.run(`G.card[1].gm='ladder'`));console.log('with ladder',await p.evaluate(()=>__ro.run('titleOpts(G.me,G.card[1],G.card).length')));
await p.evaluate(()=>__ro.run('render()'));await p.click('#run');await p.waitForTimeout(400);console.log('result label',await p.evaluate(()=>document.querySelector('.srows .srow .sline')?.innerText));await p.click('#cont');await p.waitForTimeout(300);
console.log('earn',await p.evaluate(()=>__ro.run(`(()=>{const w=roster(G.me)[2];w.e_big=3;w.trt=[perOf(w)];earnTraits();return w.name+' '+JSON.stringify(trOf(w))+' '+JSON.stringify(w.earned)})()`)));
console.log('arc',await p.evaluate(()=>__ro.run(`(()=>{const out=[];for(const k of Object.keys(ARCS)){delete G.arc;const d=ARCS[k].start();if(!d){out.push(k+':nostart');continue}G.arc={k,...d,wk0:G.week};G.arc.left=1;arcWeek();out.push(k+':'+(G.arc?'open':'done'))}return out.join(' ')+' feuds '+FE().filter(f=>f.co===G.me&&f.st==='cur').length})()`)));
await p.evaluate(()=>{location.hash='titles'});await p.waitForTimeout(200);
console.log('scrollX',await p.evaluate(()=>document.documentElement.scrollWidth),'ERRS',errs);await p.close()}await b.close()})();
