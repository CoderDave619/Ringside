const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });await p.addInitScript(()=>{window.__autoyes=setInterval(()=>{const d=document.getElementById('cfm');if(d&&d.open&&!window.__noauto)d.querySelector('[data-y]').click()},40)});
  const errs = [];
  p.on('pageerror', e => errs.push('PAGEERR ' + e.message));
  await p.route('https://cdnjs.cloudflare.com/**', r => r.fulfill({ path: '/tmp/dl/package/dist/xlsx.full.min.js', contentType: 'text/javascript' }));
  await p.route('https://fonts.googleapis.com/**', r => r.abort());
  await p.goto('file:///home/user/game/index.html#editor');
  await p.waitForTimeout(500);
  for (const f of ['JoW_1969_scenario.xlsx', 'JoW_1994_roster_preview.xlsx']) {
    await p.setInputFiles('#file', '/mnt/project-files/jow-1969/' + f);
    await p.waitForTimeout(800);
    console.log(f, '=>', (await p.textContent('#emsg')).trim());
  }
  // re-import 1969 then inspect a wrestler + company
  await p.setInputFiles('#file', '/mnt/project-files/jow-1969/JoW_1969_scenario.xlsx');
  await p.waitForTimeout(800);
  await p.click('[data-es="33"]');
  await p.screenshot({ path: '/tmp/shot_editor.png', fullPage: true });
  await p.click('[data-ec="c"]');
  await p.click('[data-es="0"]');
  console.log('CO0', await p.inputValue('[data-f=short]'), await p.inputValue('[data-f=open]'), await p.inputValue('[data-f=renames]'));
  await p.click('[data-es="7"]');
  console.log('CO7', await p.inputValue('[data-f=short]'), await p.inputValue('[data-f=open]'), await p.inputValue('[data-f=close]'));
  await p.click('#eplay');
  await p.waitForTimeout(300);
  await p.screenshot({ path: '/tmp/shot_new.png', fullPage: true });
  await p.click('input[value=c1]');
  await p.click('#nstartbtn');
  await p.waitForTimeout(300);
  console.log('HDR', (await p.textContent('#hdr')).replace(/\s+/g, ' '));
  await p.goto('file:///home/user/game/index.html#roster'); await p.waitForTimeout(200);
  console.log('ROSTER', (await p.textContent('#app')).replace(/\s+/g, ' ').slice(0, 600));
  await p.setViewportSize({ width: 390, height: 800 });
  await p.goto('file:///home/user/game/index.html#book'); await p.waitForTimeout(200);
  await p.click('#auto');
  await p.screenshot({ path: '/tmp/shot_mobile.png', fullPage: true });
  console.log('ERRS', errs);
  await b.close();
})();
