const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open)d.querySelector('[data-y]').click()},40)});
await p.route('https://**',r=>r.abort());const U='file:///home/user/game/index.html';
await p.goto(U+'#new');await p.waitForTimeout(300);await p.click('input[value=c0]');await p.click('#nstartbtn');await p.waitForTimeout(500);
await p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save);G.cos[G.me].cash=2000000;localStorage.ro_save=JSON.stringify(G)});await p.goto(U+'#business');await p.reload();await p.waitForTimeout(300);
// scout
await p.click('[data-hire=scout]');await p.click('[data-hp] >> nth=-1');await p.waitForTimeout(80);await p.click('[data-sact="scout:find"]');await p.waitForTimeout(80);
// brands + draft
await p.fill('[data-brand="0"]','Monday Mayhem');await p.fill('[data-brand="1"]','Friday Fury');await p.click('[data-bsave]');await p.waitForTimeout(80);await p.click('[data-draft]');await p.waitForTimeout(80);
console.log('BR',await p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save);return Object.values(G.ws).filter(w=>w.co===G.me).map(w=>w.name.split(' ')[0]+':'+(w.brand||'-')).join(' ')}),await p.evaluate(()=>JSON.parse(localStorage.ro_save).news.slice(0,3).map(n=>n.text)));
// tournament across shows (brands cleared so all 4 can wrestle)
await p.click('[data-bclear]');await p.fill('[data-brand="1"]','');await p.click('[data-bsave]');
for(let wk=0;wk<4;wk++){await p.goto(U+'#book');await p.waitForTimeout(150);if(await p.locator('#rok').count())await p.click('#rok');
 if(wk===0){await p.click('#tnew');await p.click('#tgo');await p.waitForTimeout(80)}
 if(await p.locator('#tround').count()){await p.click('#tround');await p.waitForTimeout(60)}else{await p.click('#auto')}
 if(wk===0)await p.screenshot({path:'/tmp/tour_book.png',fullPage:true});
 await p.click('#run');await p.waitForTimeout(150);await p.click('#cont');await p.waitForTimeout(150);if(await p.locator('dialog[open]').count()){await p.keyboard.press('Escape')}}
console.log('TOUR',await p.evaluate(()=>{const G=JSON.parse(localStorage.ro_save);return [G.tour,G.tourHist,G.news.filter(n=>/tournament|Golden|Cup|Prix|Bracket|Classic|Road|semi|final/i.test(n.text)).slice(0,5).map(n=>n.text)]}));
console.log('ERRS',errs);await b.close()})();
