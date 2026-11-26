const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const W=+(process.argv[2]||1280);const p=await b.newPage({viewport:{width:W,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open)d.querySelector('[data-y]').click()},40)});
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html#new');await p.waitForTimeout(300);
await p.click('input[value=c0]');await p.click('#nstartbtn');await p.waitForTimeout(200);
await p.goto('file:///home/user/game/index.html#calendar');await p.waitForTimeout(100);
console.log('STY0',await p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save);return Object.values(G.cos).filter(c=>c.active).map(c=>c.short+':'+c.sty.join('/')+':cyc'+c.cyc)}));
await p.click('[data-cst=lucha]');await p.waitForTimeout(60);await p.click('[data-cst=comedy]');await p.waitForTimeout(60);
await p.screenshot({path:'/tmp/s_cal.png',fullPage:true});
console.log('MYSTY',await p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save);return G.cos[G.me].sty}));
const N=+(process.argv[3]||30);
for(let i=0;i<N;i++){await p.goto('file:///home/user/game/index.html#book');await p.waitForTimeout(30);if(await p.locator('#rok').count())await p.click('#rok');
  try{await p.click('#auto:not([disabled])',{timeout:500})}catch(e){}await p.click('#run');await p.waitForTimeout(40);
  if(!(await p.locator('#cont').count())){if(await p.locator('[data-x]').count())await p.click('[data-x]');if(await p.locator('#skip').count())await p.click('#skip');continue}
  await p.click('#cont');await p.waitForTimeout(40);if(await p.locator('#rok').count())await p.click('#rok')}
console.log('FAME',await p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save);const ws=Object.values(G.ws).filter(w=>w.fame!=null).sort((a,b)=>b.fame-a.fame);return {date:G.date,top:ws.slice(0,12).map(w=>w.name+' '+Math.round(w.fame)+' pop'+Math.round(w.pop)),n1000:ws.filter(w=>w.fame>=1000).length,hof:G.hof,chof:Object.values(G.cos).map(c=>c.short+':'+(c.hof||[]).length),news:G.news.filter(n=>/ascended|Hall of Fame/.test(n.t||n.txt||JSON.stringify(n))).slice(0,8).map(n=>JSON.stringify(n).slice(0,120))}}));
await p.goto('file:///home/user/game/index.html#history/hof');await p.waitForTimeout(150);await p.screenshot({path:'/tmp/s_hof.png',fullPage:true});
await p.goto('file:///home/user/game/index.html#superstars');await p.waitForTimeout(150);await p.screenshot({path:'/tmp/s_star.png'});
console.log('ERRS',errs);await b.close()})();
