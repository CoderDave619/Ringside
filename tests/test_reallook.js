// Real History wrestlers start with their real ring-gear look.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open)d.querySelector('[data-y]').click()},40)});
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html?sim#new');await p.waitForTimeout(500);
const nv=await p.$$eval('[data-nver]',a=>a.map(x=>x.dataset.nver));
await p.click('[data-nver="5"]');await p.waitForTimeout(150);await p.click('input[name=nco] >> nth=0');await p.click('#nstartbtn');await p.waitForTimeout(2500);
const r=await p.evaluate(()=>{const G=__ro.G();if(!G)return {hash:location.hash};const f=Object.values(G.ws).find(w=>w.name==='The Fiend');return f?{mask:(f.px||{}).mask,pat:(f.px||{}).maskPattern,start:G.date||G.day}:null});
console.log('versions',nv.join(','),'fiend',JSON.stringify(r),'errors',errs.length?errs:'none');
await b.close();process.exit(r&&r.pat==='grin'&&!errs.length?0:1)})();
