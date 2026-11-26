const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open&&!window.__noauto)d.querySelector('[data-y]').click()},40)});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html?sim#new');await p.waitForTimeout(300);
await p.click('input[value=c0]');await p.click('#nstartbtn');await p.waitForTimeout(300);
const out=await p.evaluate(()=>__ro.run(`(()=>{freeAgents().slice(0,14).forEach(w=>signW(w,G.me,100,8));const res=[];for(let k=0;k<40;k++){roster(G.me).forEach(w=>{w.fat=0;w.out=0});const R=roster(G.me).filter(canWork).sort(()=>Math.random()-.5);
 const t=titlesOf(G.me).find(t=>t.div!=='tag'&&reignOf(t));const ch=t&&reignOf(t).h[0];const rest=R.filter(w=>w.id!==ch);if(rest.length<11)return "short at "+k+" "+rest.length;
 const m1={t:'m',sides:[[ch],[rest[0].id,rest[1].id]],win:null,fin:null};const o=titleOpts(G.me,m1,[m1]);if(o.some(x=>x.id===t.id))m1.title=t.id;
 const m2={t:'m',sides:[[rest[2].id,rest[3].id],[rest[4].id,rest[5].id,rest[6].id]],win:null,fin:null};
 const m3={t:'m',sides:[[rest[7].id],[rest[8].id],[rest[9].id,rest[10].id]],win:null,fin:null};
 const before=reignOf(t).h.join();runShow(G.me,[m1,m2,m3],true);const after=reignOf(t)?.h;res.push([m1.title?1:0,m1.win,before===after?.join()?'kept':'changed:'+after?.length]);G.week++}
 return res})()`));
if(typeof out==="string"){console.log(out);process.exit()}const s={};out.forEach(r=>{const k=r.join('|');s[k]=(s[k]||0)+1});console.log(JSON.stringify(s));console.log('ERRS',errs);await b.close()})();
