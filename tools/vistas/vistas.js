#!/usr/bin/env node
// Uso: node vistas.js <modelo.glb|.gltf> <id> [--out carpeta] [--rotY grados] [--gamma 0.6]
// Escribe <id>.webp (cañón a la derecha), <id>_left.webp, <id>_front.webp y <id>_top.webp,
// más <id>_hoja.png con las cuatro vistas juntas para revisarlas, y muestra las proporciones
// para copiarlas en index.html (ratio: 640 / alto).
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const opt = (k, def) => { const i = args.indexOf('--' + k); return i >= 0 ? args.splice(i, 2)[1] : def; };
const outDir = path.resolve(opt('out', path.join(__dirname, 'salida')));
const rotY = opt('rotY', '0'), gamma = opt('gamma', '0.6'), hide = opt('hide', '');
const listOnly = args.includes('--list'); if (listOnly) args.splice(args.indexOf('--list'), 1);
const [modelPath, id] = args;
if (!modelPath || !id) { console.log('Uso: node vistas.js <modelo.glb|.gltf> <id> [--out carpeta] [--rotY grados] [--gamma 0.6] [--hide pieza1,pieza2] [--list]'); process.exit(1); }
const model = path.resolve(modelPath), modelDir = path.dirname(model);
if (!fs.existsSync(model)) { console.error('No encuentro el modelo: ' + model); process.exit(1); }
fs.mkdirSync(outDir, { recursive: true });

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.glb': 'model/gltf-binary', '.gltf': 'model/gltf+json', '.bin': 'application/octet-stream', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };
// /modelo/... sirve la carpeta del modelo (un .gltf necesita su .bin al lado); lo demás, esta carpeta.
const server = http.createServer((req, res) => {
  const u = decodeURIComponent(req.url.split('?')[0]);
  const file = u.startsWith('/modelo/') ? path.join(modelDir, u.slice(8)) : path.join(__dirname, u);
  const base = u.startsWith('/modelo/') ? modelDir : __dirname;
  if (!path.resolve(file).startsWith(base) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const page = await browser.newPage({ viewport: { width: 1800, height: 1800 } });
  if (listOnly) {
    // Piezas del modelo con su caja (x, y, z ya girados; el largo es z). Sirve para encontrar qué ocultar con --hide.
    await page.goto(`http://127.0.0.1:${port}/render.html?${new URLSearchParams({ m: '/modelo/' + path.basename(model), rotY, hide, list: 1 })}`);
    await page.waitForFunction('window.RESULT', null, { timeout: 300000 });
    const r = await page.evaluate('window.RESULT');
    if (r.error) { console.error(r.error); process.exitCode = 1; }
    else for (const p of r.parts) console.log(`${p.name.padEnd(24)} (en ${p.parent || '—'})  min ${p.min.map(v => v.toFixed(2)).join(', ')}  max ${p.max.map(v => v.toFixed(2)).join(', ')}`);
    await browser.close(); server.close(); return;
  }
  const views = [['side', id], ['left', id + '_left'], ['front', id + '_front'], ['top', id + '_top']];
  const ratios = {};
  for (const [view, name] of views) {
    const q = new URLSearchParams({ m: '/modelo/' + path.basename(model), view, rotY, gamma, hide });
    await page.goto(`http://127.0.0.1:${port}/render.html?${q}`);
    await page.waitForFunction('window.RESULT', null, { timeout: 300000 });
    const r = await page.evaluate('window.RESULT');
    if (r.error) { console.error(`Error en la vista ${view}:\n${r.error}`); process.exitCode = 1; break; }
    fs.writeFileSync(path.join(outDir, name + '.webp'), Buffer.from(r.webp.split(',')[1], 'base64'));
    ratios[view] = r.h;
    if (view === 'side') console.log(`Medidas del modelo (x, y, z): ${r.size.map(v => v.toFixed(2)).join(' × ')}  (el largo es z)`);
    console.log(`${name}.webp  640 × ${r.h}`);
  }
  if (Object.keys(ratios).length === 4) {
    // Hoja de revisión: las cuatro vistas sobre el fondo del juego.
    const imgs = views.map(([, n]) => 'data:image/webp;base64,' + fs.readFileSync(path.join(outDir, n + '.webp')).toString('base64'));
    await page.setContent(`<body style="margin:0;background:#141912;display:grid;grid-template-columns:640px 640px;gap:24px;padding:24px;width:max-content">${imgs.map(s => `<img src="${s}" style="width:640px">`).join('')}</body>`);
    await page.waitForTimeout(300);
    await page.locator('body').screenshot({ path: path.join(outDir, id + '_hoja.png') });
    console.log(`\nHoja de revisión: ${path.join(outDir, id + '_hoja.png')}`);
    console.log(`\nPara index.html:\n  img: 'img/${id}.webp', ratio: 640 / ${ratios.side},\n  left: { img: 'img/${id}_left.webp', ratio: 640 / ${ratios.left}, ... }\n  top: { img: 'img/${id}_top.webp', ratio: 640 / ${ratios.top} }, front: { img: 'img/${id}_front.webp', ratio: 640 / ${ratios.front} }`);
  }
  await browser.close(); server.close();
})().catch(e => { console.error(e); server.close(); process.exit(1); });
