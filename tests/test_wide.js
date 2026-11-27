const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });await p.addInitScript(()=>{try{localStorage.ro_rcomp='0'}catch(e){}});await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open&&!window.__noauto)d.querySelector('[data-y]').click()},40)});
  const errs = [];
  p.on('pageerror', e => errs.push('PAGEERR ' + e.message));
  await p.route('https://**', r => r.abort());
  await p.goto('file:///home/user/game/index.html#new');
  await p.waitForTimeout(300);
  await p.click('input[value=c0]'); await p.click('#nstartbtn');await p.waitForTimeout(300);await p.evaluate(()=>{location.hash='book'}); await p.waitForTimeout(200);
  for (let i = 0; i < 4; i++) { await p.click('#auto'); await p.click('#run'); await p.click('#cont'); await p.waitForTimeout(50); }
  const check = async (w) => {
    await p.setViewportSize({ width: w, height: 900 });
    for (const t of ['book', 'roster', 'wrestlers', 'companies', 'calendar', 'edit', 'editor', 'new']) {
      await p.goto('file:///home/user/game/index.html#' + t); await p.waitForTimeout(150);
      const r = await p.evaluate(() => {
        const out = []; const W = document.documentElement.clientWidth;
        if (document.documentElement.scrollWidth > W + 1) out.push('page ' + document.documentElement.scrollWidth);
        for (const el of document.querySelectorAll('body *')) { const rc = el.getBoundingClientRect(); if (rc.right > W + 1 && rc.width > 0 && getComputedStyle(el).position !== 'fixed') { out.push(el.tagName + '.' + el.className + ' ' + Math.round(rc.right)); if (out.length > 4) break; } }
        return out;
      });
      console.log(w, t, r.length ? r : 'ok');
    }
  };
  await check(1280); await check(390);
  await p.goto('file:///home/user/game/index.html#roster'); await p.waitForTimeout(150);
  await p.screenshot({ path: '/tmp/shot_r390.png', fullPage: true });
  await p.click('[data-ct]'); await p.waitForTimeout(100);
  const d = await p.evaluate(() => { const dl = document.querySelector('dialog'); return [dl.scrollWidth, dl.clientWidth]; });
  console.log('dialog', d);
  await p.screenshot({ path: '/tmp/shot_d390.png' });
  await p.setViewportSize({ width: 1280, height: 900 }); await p.keyboard.press('Escape');
  await p.goto('file:///home/user/game/index.html#roster'); await p.waitForTimeout(150);
  await p.screenshot({ path: '/tmp/shot_r1280.png' });
  console.log('ERRS', errs);
  await b.close();
})();
