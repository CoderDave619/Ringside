const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open)d.querySelector('[data-y]').click()},40)});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html?sim#new');await p.waitForTimeout(300);
await p.click('[data-nver="2"]');await p.waitForTimeout(150);await p.click('input[name=nco] >> nth=0');await p.click('#nstartbtn');await p.waitForTimeout(500);
console.log(await p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save);return G.date}));
// qualify two wrestlers, jump to late December, run the show
await p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save);G.date=G.date.slice(0,4)+'-12-27';localStorage.ro_save=JSON.stringify(G)});await p.reload();await p.waitForTimeout(400);
await p.evaluate(()=>{});
const r=await p.evaluate(()=>{const ws=Object.values(window.G?G.ws:{});return ws.length});console.log('G visible?',r);
await p.evaluate(()=>{location.hash='book'});await p.waitForTimeout(300);
console.log('qualified',await p.evaluate(()=>__ro.run("(()=>{const L=roster(G.me).slice(0,2);L.forEach(w=>hofAdd(w));save();delete window.__ro_hide;return L.map(w=>w.name+':'+w.hofQ)})()")));
await p.evaluate(()=>__ro.run('render()'));
await p.click('#auto');await p.waitForTimeout(200);await p.click('#run');await p.waitForTimeout(400);
const cont=await p.$('#cont');if(cont){await cont.click();await p.waitForTimeout(500)}
if(await p.$('#rok'))await p.click('#rok');await p.waitForTimeout(500);
await p.evaluate(()=>__ro.run('(()=>{G.hofShow=G.hofCer.length-1;const r=window.__ro;window.__ro=null;hofCerPop();window.__ro=r})()'));await p.waitForTimeout(200);
console.log('dialog',await p.evaluate(()=>{const d=document.querySelector('.hofcer');return d?d.innerText.replace(/\n/g,' | ').slice(0,300):'none'}));
await p.screenshot({path:'/tmp/hofcer.png'});
await p.evaluate(()=>{location.hash='history/hof'});await p.waitForTimeout(300);console.log('page has ceremonies',await p.evaluate(()=>/Ceremonies/.test(document.body.innerText)));
console.log('ERRS',errs);await b.close()})();
