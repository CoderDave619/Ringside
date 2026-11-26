const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:740}});await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open&&/^Start a new game/.test(d.textContent))d.querySelector('[data-y]').click()},40)});const errs=[];p.on('pageerror',e=>errs.push(e.message));
let native=0;p.on('dialog',d=>{native++;d.accept()});
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html?sim#new');await p.waitForTimeout(300);
await p.click('input[value=c0]');await p.click('#nstartbtn');await p.waitForTimeout(300);
await p.evaluate(()=>{location.hash='roster'});await p.waitForTimeout(300);
// a free agent from the roster's Indies view
const html=await p.evaluate(()=>[...document.querySelectorAll('[data-ct]')].length);console.log('ct buttons',html);
await p.evaluate(()=>__ro.run('dContract(freeAgents().sort((a,b)=>a.pop-b.pop)[0].id)'));await p.waitForTimeout(150);
await p.evaluate(()=>{const r=document.getElementById('pct');r.value=130;r.dispatchEvent(new Event('input',{bubbles:true}))});await p.waitForTimeout(100);
await p.click('#offer');await p.waitForTimeout(200);
const res=await p.evaluate(()=>{const o=document.querySelector('.offres');if(!o)return null;const r=o.getBoundingClientRect();return {t:o.innerText,top:r.top,vis:r.top>=0&&r.bottom<=innerHeight}});console.log('RESULT',JSON.stringify(res));
await p.screenshot({path:'/tmp/offer.png'});
await p.keyboard.press('Escape');
// release with in-game confirm
await p.evaluate(()=>{location.hash='roster'});await p.waitForTimeout(300);
const n0=await p.evaluate(()=>__ro?0:0).catch(()=>0);
await p.click('[data-ct]');await p.waitForTimeout(150);const rel=await p.$('#rel');
if(rel){await rel.click();await p.waitForTimeout(150);const q=await p.evaluate(()=>{const d=document.getElementById('cfm');return d&&d.open?d.innerText:null});console.log('CONFIRM',q);await p.screenshot({path:'/tmp/cfm.png'});
 await p.click('#cfm [data-y]');await p.waitForTimeout(200);const after=await p.evaluate(()=>document.getElementById('dlg')?.open);console.log('dialog open after release',after)}
console.log('native dialogs',native,'ERRS',errs);await b.close()})();
