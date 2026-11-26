const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const W=+(process.argv[2]||1280);const p=await b.newPage({viewport:{width:W,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open)d.querySelector('[data-y]').click()},40)});
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html#new');await p.waitForTimeout(300);
await p.click('input[value=c0]');await p.click('#nstartbtn');await p.waitForTimeout(200);
await p.goto('file:///home/user/game/index.html#calendar');await p.waitForTimeout(100);
console.log('STY0',await p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save);return Object.values(G.cos).filter(c=>c.active).map(c=>c.short+':'+c.sty.join('/')+':cyc'+c.cyc)}));

await p.screenshot({path:'/tmp/s_cal.png',fullPage:true});
console.log('MYSTY',await p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save);return G.cos[G.me].rep}));
const N=+(process.argv[3]||30);
for(let i=0;i<N;i++){await p.goto('file:///home/user/game/index.html#book');await p.waitForTimeout(30);if(await p.locator('#rok').count())await p.click('#rok');
  try{await p.click('#auto:not([disabled])',{timeout:500})}catch(e){}await p.click('#run');await p.waitForTimeout(40);
  if(!(await p.locator('#cont').count())){if(await p.locator('[data-x]').count())await p.click('[data-x]');if(await p.locator('#skip').count())await p.click('#skip');continue}
  await p.click('#cont');await p.waitForTimeout(40);if(await p.locator('#rok').count())await p.click('#rok')}
const R=await p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save);const a=G.stx.all;const ws=Object.values(G.ws).filter(w=>w.sx);const me=Object.values(G.ws).filter(w=>w.co===G.me);
 return {all:{sh:a.sh,m:a.m,ff:a.ff,hh:a.hh,fh:a.fh,tw:a.tw,mu:a.mu,s5:a.s5,fin:a.fin,gim:Object.keys(a.gim).length},cos:Object.keys(G.stx.co).length,yrs:Object.keys(G.stx.y),wsx:ws.length,
  sty:me.slice(0,4).map(w=>w.name+' '+JSON.stringify(w.sty)),cyc:Object.values(G.cos).filter(c=>c.active).map(c=>c.short+':'+c.cyc+':'+(c.evh??'').toString().slice(0,5))}});
console.log(JSON.stringify(R,null,1));
await p.goto('file:///home/user/game/index.html#history/st');await p.waitForTimeout(150);await p.screenshot({path:'/tmp/s_stats.png',fullPage:true});
await p.selectOption('#sxw','s4');await p.waitForTimeout(80);
const cid=await p.evaluate(()=>JSON.parse(localStorage.ro_save).me);await p.selectOption('#sxco',cid);await p.waitForTimeout(80);await p.screenshot({path:'/tmp/s_stats2.png',fullPage:true});
console.log('SCROLLX',await p.evaluate(()=>document.documentElement.scrollWidth));
await p.click('[data-hw]');await p.waitForTimeout(150);await p.screenshot({path:'/tmp/s_prof.png',fullPage:true});
console.log('PROF',await p.evaluate(()=>[...document.querySelectorAll('h3')].map(h=>h.innerText).join(' | ')));
await p.goto('file:///home/user/game/index.html#companies');await p.waitForTimeout(100);await p.screenshot({path:'/tmp/s_cos.png'});
console.log('SCROLLX2',await p.evaluate(()=>document.documentElement.scrollWidth));
console.log('ERRS',errs);await b.close()})();
