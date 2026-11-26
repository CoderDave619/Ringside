const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const tot={up:0,mut:0,mutMe:0,lure:0,errs:[]};
for(let g=0;g<4;g++){const p=await b.newPage();p.on('pageerror',e=>tot.errs.push(e.message.slice(0,150)));await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open)d.querySelector('[data-y]').click()},40)});
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html?sim#new');await p.waitForTimeout(300);
await p.click(`[data-nver="${1+g}"]`);await p.waitForTimeout(150);await p.click(`input[name=nco] >> nth=${g}`);await p.click('#nstartbtn');await p.waitForTimeout(400);
for(let k=0;k<260;k++){try{await p.evaluate(()=>__ro.week())}catch(e){tot.errs.push(String(e).slice(0,150));break}}
const r=await p.evaluate(()=>{const L=__ro.G().log||[],N=__ro.G().news;const all=[...N];return {up:all.filter(n=>/has launched/.test(n.text)).length,mut:all.filter(n=>/^Walkout!/.test(n.text)).length,cos:Object.values(__ro.G().cos).filter(c=>c.active).length,ups:Object.values(__ro.G().cos).filter(c=>c.upstart).map(c=>c.short+(c.active?'':'(closed)')+':'+c.why).join(' '),date:__ro.G().date}});
console.log(g,JSON.stringify(r));await p.close()}
console.log('ERRS',tot.errs.slice(0,5));await b.close()})();
