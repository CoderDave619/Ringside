const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open&&!window.__noauto)d.querySelector('[data-y]').click()},40)});
  const errs = [];
  p.on('pageerror', e => errs.push('PAGEERR ' + e.message));
  await p.route('https://**', r => r.abort());
  await p.goto('file:///home/user/game/index.html#new'); await p.waitForTimeout(300);
  await p.click('input[value=c0]'); await p.click('#nstartbtn'); await p.waitForTimeout(200);
  await p.goto('file:///home/user/game/index.html#companies'); await p.waitForTimeout(150);
  await p.click('[data-cv]'); await p.waitForTimeout(200);
  await p.selectOption('#rsort', 'wrk'); await p.waitForTimeout(100);
  console.log((await p.textContent('#app')).replace(/\s+/g, ' ').slice(0, 500));
  await p.screenshot({ path: '/tmp/shot_cv.png' });
  console.log('ERRS', errs);
  await b.close();
})();
