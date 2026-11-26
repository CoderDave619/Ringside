// Balance runs: node bal.js <diff> <years> <companyRadio>
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const diff=process.argv[2]||'relaxed',years=+(process.argv[3]||5),pick=process.argv[4]||'c0';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html?sim#new');await p.waitForTimeout(300);
await p.click(`input[value=${pick}]`);await p.click(`[data-ndf=${diff}]`);await p.waitForTimeout(80);await p.click('#nstartbtn');await p.waitForTimeout(200);
const snap=()=>p.evaluate(()=>{const G=__ro.G();const m=G.cos[G.me];const R=Object.values(G.ws).filter(w=>w.co===G.me&&w.status==='active');
  const top=Object.values(G.ws).filter(w=>w.status==='active').sort((a,b)=>(b.fame||0)-(a.fame||0));
  return {date:G.date,over:G.over,cash:Math.round(m.cash),pop:Math.round(m.pop),fans:m.fans,view:m.lastViewers,buys:m.lastBuys,size:m.size,type:Object.entries(m.rep||{}).filter(([k,v])=>v>=25).map(([k])=>k).join('/'),
   roster:R.length,hap:Math.round(R.reduce((t,w)=>t+(w.mor??70),0)/Math.max(1,R.length)),unhappy:R.filter(w=>(w.mor??70)<35).length,
   top:top.slice(0,3).map(w=>w.name+' '+Math.round(w.fame||w.pop*10)),asc:top.filter(w=>(w.fame||0)>=1000).length,
   rivals:Object.values(G.cos).filter(c=>c.active&&c.id!==G.me).map(c=>c.short+':'+Math.round(c.cash/1000)+'k/'+c.size[0]+'/'+Math.round(c.fans/1000)+'kf').join(' '),
   closed:Object.values(G.cos).filter(c=>c.closed).length}});
const out=[];
for(let y=0;y<years;y++){await p.evaluate(()=>{for(let i=0;i<52;i++){if(__ro.G().over)break;__ro.week()}});out.push(await snap());if(out[out.length-1].over)break}
const dbg=await p.evaluate(()=>{const D=__ro.G().dbg||[];const avg=(L,i)=>Math.round(L.reduce((t,x)=>t+x[i],0)/Math.max(1,L.length));const out={};for(const [k,L] of [['weekly',D.filter(x=>!x[0])],['major',D.filter(x=>x[0])]]){const last=L.slice(-20);out[k]={n:L.length,gate:avg(last,1),buys:avg(last,2),ads:avg(last,3),tv:avg(last,4),wages:avg(last,5),cost:avg(last,6),bonus:avg(last,7),profit:avg(last,8)}}return out});
const news=await p.evaluate(()=>{const G=__ro.G();const c=k=>G.news.filter(n=>k.test(n.text)).length;return {backstage:c(/^Backstage/),arena:G.news.filter(n=>/arenas\./.test(n.text)).map(n=>n.date.slice(0,4)+' '+n.text.slice(0,40)),asc:c(/ascended/),hof:c(/Hall of Fame/),boom:c(/booming/),miser:c(/miserable/),newsN:G.news.length}});
const cnt=await p.evaluate(()=>__ro.G().cnt||{});const mgr=await p.evaluate(()=>{const G=__ro.G();const R=Object.values(G.ws).filter(w=>w.co===G.me&&w.status==='active');return {managed:R.filter(w=>w.mgBy).length,specs:R.map(w=>(w.spec||[]).join('+')).filter(Boolean).length,trend:G.trend,rep:G.cos[G.me].rep}});
console.log(JSON.stringify({diff,years,out,dbg,cnt,mgr,errs}));await b.close()})();
