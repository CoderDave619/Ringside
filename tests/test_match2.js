const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();for(const vw of [[1280,900],[390,800]]){const p=await b.newPage({viewport:{width:vw[0],height:vw[1]},colorScheme:'dark'});const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open)d.querySelector('[data-y]').click()},40)});
await p.route('https://**',r=>r.abort());await p.goto('file:///home/user/game/index.html?sim#new');await p.waitForTimeout(300);
await p.click('[data-nver="4"]');await p.waitForTimeout(150);await p.click('input[name=nco] >> nth=0');await p.click('#nstartbtn');await p.waitForTimeout(400);
await p.evaluate(()=>__ro.run('me().weeklyLeft=0'));await p.evaluate(()=>{location.hash='book'});await p.waitForTimeout(300);await p.evaluate(()=>__ro.run('render()'));
const ids=await p.$$eval('.bw:not(.used):not(.out)',x=>x.slice(0,14).map(e=>e.dataset.bw));
const C=()=>p.evaluate(()=>__ro.run('JSON.stringify(G.card.map(x=>[x.t,x.mt||x.g,x.pre?1:0,x.t==="m"?x.sides.map(s=>s.length).join("v"):(x.who||[]).length]))'));
// singles: 2 then free-for-all
await p.click('#addm');for(const id of ids.slice(0,2)){await p.click(`[data-bw="${id}"]`);await p.waitForTimeout(40)}
await p.click('.bm .bslot >> nth=-1');await p.click(`[data-bw="${ids[2]}"]`);await p.waitForTimeout(40);
await p.click('.bm .bslot >> nth=-1');await p.click(`[data-bw="${ids[3]}"]`);await p.waitForTimeout(40);
console.log(vw[0],'ffa',await C());
await p.click(`.bm >> nth=0 >> [data-rmw$=":${ids[3]}"]`);await p.waitForTimeout(40);console.log('removed one',await C());
// tag with 3 teams
await p.click('#addm');await p.waitForTimeout(40);await p.click('.bm.cur [data-bmode$=":t"]');await p.waitForTimeout(40);await p.click('.bm.cur [data-btk$=":1"]');await p.waitForTimeout(40);
for(const id of ids.slice(4,10)){await p.click(`[data-bw="${id}"]`);await p.waitForTimeout(40)}
console.log('tag3',await C());
// pre-show
await p.click('#addpm');await p.waitForTimeout(40);for(const id of ids.slice(10,12)){await p.click(`[data-bw="${id}"]`);await p.waitForTimeout(40)}
await p.click('#addpa');await p.waitForTimeout(40);
console.log('pre',await C());
await p.screenshot({path:`/tmp/sh/m2_${vw[0]}.png`,fullPage:true});
await p.click('#run');await p.waitForTimeout(500);console.log('result rows',await p.$$eval('.srow',r=>r.map(x=>x.innerText.split('\n')[0]).slice(0,6)));
console.log('ERRS',errs);await p.close()}await b.close()})();
