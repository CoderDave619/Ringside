const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  const errs = [];
  p.on('pageerror', e => errs.push('PAGEERR ' + e.message));
  p.on('console', m => { if (m.type() === 'error') errs.push('CONSOLE ' + m.text()); });
  await p.goto('file:///home/user/game/index.html#new');
  await p.waitForTimeout(800);
  const mode = process.argv[2] || 'wwwf';
  if (mode === 'wwwf') { await p.click('input[value=c0]'); }
  else { await p.click('[data-y="2001"]'); await p.click('input[value=new]'); await p.fill('#nn', 'Test Fed'); await p.fill('#ns', 'TF'); }
  await p.click('#nstartbtn');
  await p.waitForTimeout(300);
  await p.screenshot({ path: `/tmp/shot_${mode}_0.png`, fullPage: true });
  const weeks = +(process.argv[3] || 200);
  for (let i = 0; i < weeks; i++) {
    if (await p.$('text=Game over')) { console.log('game over at', i); break; }
    if (i % 3 === 0) {
      await p.goto('file:///home/user/game/index.html#roster'); await p.click('[data-rv=off]');
      while (await p.$('[data-mt],[data-dc]')) await p.click('[data-mt],[data-dc]');
      await p.click('[data-rv=roster]');
      const nw = (await p.$$('tr:has(.warn) [data-ct]')).length;
      for (let k = 0; k < nw; k++) { try { const b = (await p.$$('tr:has(.warn) [data-ct]'))[k]; if (!b) break; await b.click(); const o = await p.$('#offer:not([disabled])'); if (o) await o.click(); await p.keyboard.press('Escape'); await p.waitForTimeout(30); } catch (e) {} }
      await p.goto('file:///home/user/game/index.html#book');
    }
    if (i % 25 === 0) console.log('W', i, (await p.textContent('#hdr')).replace(/\s+/g, ' '));
    if (i % 4 === 0) {
      // sign a free agent
      await p.goto('file:///home/user/game/index.html#roster'); await p.click('[data-rv=fa]');
      try { await p.click('[data-ct]', { timeout: 1000 }); const o = await p.$('#offer:not([disabled])'); if (o) await o.click(); await p.keyboard.press('Escape'); } catch (e) {}
      await p.goto('file:///home/user/game/index.html#book');
    }
    await p.waitForTimeout(50);
    try { await p.click('#auto:not([disabled])', { timeout: 500 }); } catch (e) {}
    if (i === 3) { const f = await p.$('[data-fin="0"]'); if (f) { await f.click(); await p.click('[data-f="Ref missed it"]'); await p.click('[data-s="0"]'); await p.click('#fok'); } }
    if (i === 5) await p.screenshot({ path: `/tmp/shot_${mode}_book.png`, fullPage: true });
    await p.click('#run');
    await p.waitForTimeout(20);
    if (i === 5) await p.screenshot({ path: `/tmp/shot_${mode}_res.png` });
    const c = await p.$('#cont');
    if (c) await c.click(); else { await p.click('[data-x]'); }
  }
  const hdr = await p.textContent('#hdr');
  console.log('HDR', hdr.replace(/\s+/g, ' '));
  await p.goto('file:///home/user/game/index.html#companies'); await p.waitForTimeout(100);
  console.log('COS', (await p.textContent('#app')).replace(/\s+/g, ' ').slice(0, 1500));
  await p.screenshot({ path: `/tmp/shot_${mode}_cos.png`, fullPage: true });
  await p.goto('file:///home/user/game/index.html#roster'); await p.waitForTimeout(100);
  await p.screenshot({ path: `/tmp/shot_${mode}_roster.png`, fullPage: true });
  await p.goto('file:///home/user/game/index.html#calendar'); await p.waitForTimeout(100);
  console.log('NEWS', (await p.textContent('#app')).replace(/\s+/g, ' ').slice(0, 1500));
  for (const v of ['shows','cos','wl','time','rec','aw']) { await p.goto('file:///home/user/game/index.html#history'); await p.waitForTimeout(100); await p.click(`[data-hv=${v}]`); await p.waitForTimeout(100); if (v==='shows') { const d = await p.$('details.hrow'); if (d) await d.click(); } await p.screenshot({ path: `/tmp/shot_hist_${v}.png`, fullPage: false }); console.log('H_'+v, (await p.textContent('#app')).replace(/\s+/g,' ').slice(0,700)); }
  console.log('SIZE', await p.evaluate(() => { const g=JSON.parse(localStorage.getItem('ro_save')); return [JSON.stringify(g).length, JSON.stringify(g.shows).length, JSON.stringify(g.log).length, JSON.stringify(g.news).length, JSON.stringify(g.ws).length]; }));
  console.log('TITLES', await p.evaluate(() => { const g=JSON.parse(localStorage.getItem('ro_save')); return Object.values(g.titles||{}).map(t=>t.name+' P'+Math.round(t.prestige)+' reigns:'+t.reigns.map(r=>r.hn+'('+r.def.length+')').join(' > ')); }));
  console.log('DEAD', await p.evaluate(() => { const g=JSON.parse(localStorage.getItem('ro_save')); return Object.values(g.ws).filter(w=>w.status==='retired').map(w=>w.name+(w.dead?'†':'')).join(', '); }));
  console.log('LEG', await p.evaluate(() => { const g = JSON.parse(localStorage.getItem('ro_save')); return Object.values(g.ws).filter(w => w.legend || w.lp).map(w => w.name + ':' + w.lp + ':' + w.legend + ':' + Math.round(w.pop)); }));
  console.log('ERRS', errs.slice(0, 10));
  await b.close();
})();
