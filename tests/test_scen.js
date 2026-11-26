const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open&&!window.__noauto)d.querySelector('[data-y]').click()},40)});
  const errs = [];
  p.on('pageerror', e => errs.push('PAGEERR ' + e.message));
  await p.route('https://**', r => r.abort());
  const U = 'file:///home/user/game/index.html';
  await p.goto(U + '#new'); await p.evaluate(() => localStorage.clear()); await p.goto(U + '#editor'); await p.reload();
  await p.waitForTimeout(300);
  console.log('NAV home:', (await p.textContent('#nav')));
  await p.click('#enew'); await p.waitForTimeout(100);
  await p.fill('#ename', 'Test World'); await p.dispatchEvent('#ename', 'change');
  await p.fill('#estart', '1990-01-01'); await p.dispatchEvent('#estart', 'change');
  await p.click('[data-ec=c]');
  for (const [s, n] of [['AAA', 'Alpha Wrestling'], ['BBB', 'Beta Grappling']]) {
    await p.click('#eadd'); await p.fill('[data-f=short]', s); await p.fill('[data-f=name]', n); await p.fill('[data-f=open]', '1980-01-01'); await p.dispatchEvent('[data-f=open]', 'change'); await p.dispatchEvent('[data-f=short]', 'change');
  }
  await p.click('[data-ec=w]');
  const names = ['Iron Mike', 'Lady Storm', 'Big Tex', 'Kid Flash', 'Doc Rumble', 'Sly Vega'];
  for (let i = 0; i < names.length; i++) {
    await p.click('#eadd'); await p.fill('[data-f=name]', names[i]); await p.dispatchEvent('[data-f=name]', 'change');
    await p.fill('[data-f=cha]', String(50 + i * 5)); await p.fill('[data-f=pop]', String(40 + i * 5));
    await p.selectOption('[data-f=home]', i % 2 ? 'BBB' : 'AAA');
  }
  await p.click('[data-ec=t]'); await p.click('#eadd'); await p.fill('[data-f=name]', 'Alpha Heavyweight Title'); await p.dispatchEvent('[data-f=name]','change');
  await p.selectOption('[data-f=co]', 'AAA'); await p.fill('[data-f=champ]', 'Iron Mike'); await p.fill('[data-f=since]', '1989-06-01');
  await p.fill('[data-f=past]', '1985-01-01 | 1989-06-01 | Old Timer');
  await p.click('[data-ec=w]'); await p.click('[data-es="1"]'); await p.fill('[data-f=al]', '80'); await p.dispatchEvent('[data-f=al]','input');
  console.log('ALIGN label', await p.textContent('[data-alv]'));
  await p.click('#esave');await p.waitForTimeout(300); console.log('SAVE', await p.textContent('#emsg'));
  await p.reload(); await p.waitForTimeout(300);
  await p.goto(U + '#new'); await p.waitForTimeout(200);
  const opts = await p.$$eval('[data-nsrc]', o => o.map(x => x.dataset.nsrc + '=' + x.textContent.trim().slice(0,40)));
  console.log('NEWGAME sources', opts);
  await p.click('[data-nsrc="s:Test World"]'); await p.waitForTimeout(100);
  console.log('NEW page', (await p.textContent('#app')).replace(/\s+/g,' ').slice(0,900)); console.log('ED', await p.evaluate(()=>localStorage.getItem('ro_ed').slice(0,500)));
  await p.click('input[name=nco] >> nth=0'); await p.click('#nstartbtn');await p.waitForTimeout(300);await p.evaluate(()=>{location.hash='book'}); await p.waitForTimeout(200);
  console.log('NAV game:', (await p.textContent('#nav')));
  console.log('HDR', (await p.textContent('#hdr')).replace(/\s+/g, ' '));
  console.log('GAME TITLES', await p.evaluate(()=>{const g=JSON.parse(localStorage.getItem('ro_save'));return JSON.stringify(Object.values(g.titles).map(t=>[t.name,t.reigns.map(r=>r.hn+(r.pre?'(pre)':''))]))}));
  console.log('STORM al', await p.evaluate(()=>{const g=JSON.parse(localStorage.getItem('ro_save'));const w=Object.values(g.ws).find(w=>w.name==='Lady Storm');return w.al+' '+w.align}));
  for (let i = 0; i < 3; i++) { try { await p.click('#auto:not([disabled])', { timeout: 500 }); } catch (e) {} await p.click('#run'); await p.click('#cont'); }
  await p.goto(U + '#calendar'); await p.waitForTimeout(100);
  await p.fill('#cwn', 'Monday Mayhem'); await p.waitForTimeout(50);
  await p.goto(U + '#book'); await p.waitForTimeout(100);
  console.log('BOOK title', await p.textContent('#app h2'));
  // main menu then edit copy
  await p.click('[data-ng=Menu]'); await p.click('#nav a[href="#home"]'); await p.waitForTimeout(100);
  console.log('NAV menu:', (await p.textContent('#nav'))); await p.screenshot({path:'/tmp/shot_home.png',fullPage:true}); console.log('HOME', (await p.textContent('#app')).replace(/\s+/g,' ').slice(0,500));
  await p.goto(U + '#editor'); await p.waitForTimeout(200);
  await p.selectOption('#eopen', 's:Test World'); await p.waitForTimeout(300);
  console.log('OPEN', await p.textContent('#emsg'), await p.inputValue('#ename'));
  await p.click('[data-ec=w]'); await p.click('[data-es="0"]'); await p.fill('[data-f=name]', 'Iron Mike II'); await p.dispatchEvent('[data-f=name]', 'change');
  await p.click('#esave');await p.waitForTimeout(300);
  const sc = await p.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('ro_scens'))));
  console.log('SAVED', sc);
  const orig = await p.evaluate(() => JSON.parse(localStorage.getItem('ro_scens'))['Test World'].versions.slice(-1)[0].data.wrestlers[0].name);
  console.log('ORIGINAL wrestler0', orig);
  await p.screenshot({ path: '/tmp/shot_scen.png', fullPage: true });
  console.log('ERRS', errs);
  await b.close();
})();
