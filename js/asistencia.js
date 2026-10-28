/* ===================================================================
   ASISTENCIA REMOTA DEL SOPORTE (v2.8)
   El cliente la activa en Ajustes → Mi cuenta. Dura 1 hora como máximo y puede quitarla cuando quiera.
   Mientras está activa: la app manda sus ajustes al panel cada 15 s y aplica lo que el proveedor cambie.
   No se manda nunca el PIN ni las contraseñas de las listas.
   =================================================================== */
Object.assign(TXT.es, { asisTit:'Asistencia del soporte', asisOn:'Recibir asistencia del soporte', asisOff:'Terminar asistencia ahora',
  asisTxt:'Mientras esté activada, tu proveedor podrá ver y cambiar los ajustes de PepeTV en este aparato para ayudarte. Nunca ve tu PIN ni las contraseñas de tus listas. Se apaga sola a la hora y puedes quitarla cuando quieras.',
  asisActiva:'Asistencia ACTIVA · termina a las {h}', asisPill:'Soporte conectado · {n} min', asisConectado:'El soporte está conectado ahora', asisEspera:'Esperando a que el soporte se conecte…', asisEmpieza:'Asistencia activada durante 1 hora',
  asisTermina:'Asistencia terminada', asisError:'No se ha podido conectar con el soporte. Revisa internet e inténtalo de nuevo.',
  asisCambio:'Tu proveedor ha cambiado: {c}', asisMsgTit:'Mensaje de tu proveedor', asisSinApi:'Esta app no está conectada a ningún panel.' });
Object.assign(TXT.en, { asisTit:'Support assistance', asisOn:'Get help from support', asisOff:'End assistance now',
  asisTxt:'While it is on, your provider can see and change PepeTV settings on this device to help you. They never see your PIN or playlist passwords. It turns off by itself after one hour and you can stop it anytime.',
  asisActiva:'Assistance ON · ends at {h}', asisPill:'Support connected · {n} min', asisConectado:'Support is connected now', asisEspera:'Waiting for support to connect…', asisEmpieza:'Assistance on for 1 hour',
  asisTermina:'Assistance ended', asisError:'Could not reach support. Check your internet and try again.',
  asisCambio:'Your provider changed: {c}', asisMsgTit:'Message from your provider', asisSinApi:'This app is not connected to a panel.' });

/* ---------- ajustes que el soporte puede ver y cambiar ---------- */
const SI_NO = [['si', 'Sí'], ['no', 'No']];
const n2 = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => [String(a + i), String(a + i)]);
const REM = [
  { s:'Reproductor', k:'formato', t:'Formato del directo', o:[['auto', 'Automático'], ['ts', 'MPEG-TS (.ts)'], ['m3u8', 'HLS (.m3u8)']], d:'auto' },
  { s:'Reproductor', k:'buffer', t:'Búfer', o:[['normal', 'Normal'], ['grande', 'Grande'], ['max', 'Máximo']], d:'normal', ap:() => configNativo() },
  { s:'Reproductor', k:'ajusteDef', t:'Ajuste de imagen', o:[['0', 'Original'], ['1', 'Llenar'], ['2', 'Recortar'], ['3', '4:3']],
    get:() => String(lee('ajuste', 0)), set:v => { ponAJ('ajusteDef', v); ponAjuste(+v); } },
  { s:'Reproductor', k:'audio', t:'Idioma de audio', o:IDIOMAS_MEDIA, d:'es', ap:() => configNativo() },
  { s:'Reproductor', k:'subs', t:'Subtítulos automáticos', o:SI_NO, d:'no', ap:() => configNativo() },
  { s:'Reproductor', k:'subsLang', t:'Idioma de subtítulos', o:IDIOMAS_MEDIA.slice(1), d:'es', ap:() => configNativo() },
  { s:'Reproductor', k:'subsTam', t:'Tamaño de subtítulos', o:[['p', 'Pequeño'], ['n', 'Normal'], ['g', 'Grande'], ['mg', 'Muy grande']], d:'n', ap:() => configNativo() },
  { s:'Listas y guía', k:'refresco', t:'Actualizar listas solas', o:[['6', 'Cada 6 h'], ['12', 'Cada 12 h'], ['24', 'Cada día'], ['0', 'Solo a mano']], d:'12' },
  { s:'Listas y guía', k:'epg', t:'Ajuste horario de la guía', o:[-3, -2, -1, 0, 1, 2, 3].map(n => [String(n), n === 0 ? 'Sin ajuste' : (n > 0 ? '+' : '') + n + ' h']), d:'0',
    ap:() => { try { for (const k in epgCache) delete epgCache[k]; } catch (e) {} } },
  { s:'Control parental', k:'adultos', t:'Carpetas de adultos', o:[['si', 'Bloquear con PIN'], ['ocultar', 'Ocultar del todo'], ['no', 'No hacer nada']], d:'si', ap:() => { try { desbloq.clear(); } catch (e) {} } },
  { s:'Control parental', k:'pinAjustes', t:'Pedir PIN para Ajustes', o:SI_NO, d:'no' },
  { s:'Apariencia', k:'idioma', t:'Idioma de la app', o:IDIOMAS.map(([k, n]) => [k, n]),
    get:() => LANG, set:v => { LANG = v; guarda('lang', v); ponAJ('idioma', v); pintaTextos(); } },
  { s:'Apariencia', k:'tema', t:'Modo de color', o:[['oscuro', 'Oscuro'], ['claro', 'Claro']], d:'oscuro', ap:v => aplicaTema(v) },
  { s:'Apariencia', k:'txt', t:'Tamaño del texto (px)', o:n2(10, 20), get:() => String(lee('txt_px', 14)), set:v => ponTexto(+v) },
  { s:'Apariencia', k:'cols_movie', t:'Películas: carátulas por fila', o:n2(2, 8), get:() => String(lee('cols_movie', 5)), set:v => guarda('cols_movie', +v) },
  { s:'Apariencia', k:'vista_movie', t:'Películas: vista', o:[['grid', 'Carátulas'], ['lista', 'Lista']], get:() => lee('vista_movie', 'grid'), set:v => guarda('vista_movie', v) },
  { s:'Apariencia', k:'cols_series', t:'Series: carátulas por fila', o:n2(2, 8), get:() => String(lee('cols_series', 5)), set:v => guarda('cols_series', +v) },
  { s:'Apariencia', k:'vista_series', t:'Series: vista', o:[['grid', 'Carátulas'], ['lista', 'Lista']], get:() => lee('vista_series', 'grid'), set:v => guarda('vista_series', v) },
  { s:'Avanzado', k:'decoder', t:'Decodificación de vídeo', o:[['auto', 'Hardware'], ['soft', 'Software']], d:'auto', ap:() => configNativo() },
  { s:'Avanzado', k:'tunel', t:'Modo túnel', o:SI_NO, d:'no', ap:() => configNativo() }
];
const remGet = r => String(r.get ? r.get() : CFG(r.k, r.d));
function remSet(r, v){
  if (!r.o.some(x => String(x[0]) === String(v))) return false;
  if (r.set) r.set(v); else { ponAJ(r.k, v); if (r.ap) r.ap(v); }
  return true;
}
/* lo que se manda al panel (sin PIN ni contraseñas) */
function fotoAjustes(){
  return {
    v: BRAND.version, sys: sistema(), ve: queVe(), pin: pinActivo(), pinBloq: +lee('pin_bloq', 0) > Date.now(),
    lst: ((LIC && LIC.lists) || []).map(l => l.name), la: (((LIC && LIC.lists) || [])[lee('lista', 0)] || {}).name || '',
    o: REM.map(r => ({ s: r.s, k: r.k, t: r.t, v: remGet(r), o: r.o }))
  };
}

/* ---------- conexión con el panel ---------- */
const ASIS = { vista: false, hasta: +lee('asis_hasta', 0) || 0, t: null, ultFoto: '', ultEnvio: 0, ocupado: false };
const asisActiva = () => ASIS.hasta > Date.now();
async function asisLlama(extra){
  const foto = JSON.stringify(fotoAjustes());
  const q = new URLSearchParams(Object.assign({ a:'asis', d:CODE, s:SEC }, extra || {}));
  if (foto !== ASIS.ultFoto || Date.now() - ASIS.ultEnvio > 120e3 || (extra && extra.on)) q.set('cfg', foto);
  const ctl = new AbortController(), tm = setTimeout(() => ctl.abort(), 15000);
  try {
    const r = await fetch(BRAND.api + '?' + q, { signal: ctl.signal }), j = await r.json();
    if (q.has('cfg')) { ASIS.ultFoto = foto; ASIS.ultEnvio = Date.now(); }
    return j;
  } finally { clearTimeout(tm); }
}
async function asisEmpieza(){
  if (!BRAND.api) { aviso(t('asisSinApi')); return; }
  try {
    const j = await asisLlama({ on: '1' });
    if (!j || !j.on) throw new Error('no');
    ASIS.hasta = j.hasta; ASIS.vista = !!j.vista; guarda('asis_hasta', j.hasta); aviso(t('asisEmpieza'));
    asisBucle(); pintaPill();
  } catch (e) { aviso(t('asisError')); }
}
async function asisTermina(avisar){
  const estaba = asisActiva();
  ASIS.hasta = 0; ASIS.vista = false; guarda('asis_hasta', 0); clearTimeout(ASIS.t); pintaPill();
  if (BRAND.api && estaba) { try { await asisLlama({ on: '0' }); } catch (e) {} }
  if (avisar) aviso(t('asisTermina'));
}
function asisBucle(){
  clearTimeout(ASIS.t);
  if (!asisActiva()) { if (ASIS.hasta) asisTermina(true); return; }
  ASIS.t = setTimeout(asisPaso, 15000);
}
async function asisPaso(){
  if (!asisActiva()) { asisTermina(true); return; }
  if (ASIS.ocupado) { asisBucle(); return; }
  ASIS.ocupado = true;
  try {
    const j = await asisLlama();
    if (j && j.ok && !j.on) { ASIS.hasta = 0; guarda('asis_hasta', 0); pintaPill(); aviso(t('asisTermina')); if (secAj === 'cue' && $('#ajustes').classList.contains('on')) pintaPanelAj(); return; }
    if (j && j.hasta) { ASIS.hasta = j.hasta; guarda('asis_hasta', j.hasta); }
    if (j && j.on) { const antes = ASIS.vista; ASIS.vista = !!j.vista; if (antes !== ASIS.vista && secAj === 'cue' && $('#ajustes').classList.contains('on')) pintaPanelAj(); }
    if (j && j.cmds && j.cmds.length) await asisOrdenes(j.cmds);
  } catch (e) {}
  finally { ASIS.ocupado = false; }
  pintaPill(); asisBucle();
}
/* órdenes que llegan del panel */
async function asisOrdenes(cmds){
  const cambiados = [];
  for (const c of cmds) {
    if (c.tipo === 'set') {
      for (const k in (c.v || {})) { const r = REM.find(x => x.k === k); if (r && remSet(r, c.v[k])) cambiados.push(r.t); }
    }
    else if (c.tipo === 'refrescar') { aviso(t('cargandoLista')); LISTA = null; precargaLista(true).then(() => { if ($('#home').classList.contains('on')) pintaPortada(); }).catch(() => {}); }
    else if (c.tipo === 'borrarMem') { try { indexedDB.deleteDatabase('pepetv'); } catch (e) {} LISTA = null; aviso('Tu proveedor ha borrado la memoria de listas'); setTimeout(() => location.reload(), 1500); return; }
    else if (c.tipo === 'quitarPin') { guarda('pin_h', ''); try { desbloq.clear(); } catch (e) {} aviso(t('pinQuitado')); }
    else if (c.tipo === 'desbloqPin') { guarda('pin_bloq', 0); guarda('pin_mal', 0); aviso('PIN desbloqueado por tu proveedor'); }
    else if (c.tipo === 'licencia') { try { LIC = await pideLicencia(); if ($('#home').classList.contains('on')) pintaPortada(); } catch (e) {} }
    else if (c.tipo === 'mensaje' && c.txt) { avisoGrande(t('asisMsgTit'), c.txt); }
    else if (c.tipo === 'fin') { await asisTermina(true); return; }
  }
  if (cambiados.length) {
    aviso(t('asisCambio', { c: cambiados.slice(0, 3).join(', ') + (cambiados.length > 3 ? '…' : '') }));
    if ($('#ajustes').classList.contains('on')) pintaPanelAj();
    if ($('#sec').classList.contains('on')) { try { if (enGrid()) aplicaApariencia(); else { vItems.sucio = true; vItems.pinta(true); } } catch (e) {} }
    if ($('#home').classList.contains('on')) pintaPortada();
  }
}

/* mensaje del proveedor: solo con botón Aceptar */
function avisoGrande(tit, txt){
  const no = $('#vConf [data-go="conf:no"]'); no.style.display = 'none';
  pideConfirmar(tit, txt).finally(() => { no.style.display = ''; });
}

/* ---------- aviso fijo en pantalla mientras está activa ---------- */
document.body.insertAdjacentHTML('beforeend', `<button class="asisPill" id="asisPill" hidden data-go="asisVer"><i></i><span></span></button>`);
document.head.insertAdjacentHTML('beforeend', `<style>
.asisPill{position:fixed;left:50%;top:calc(var(--u)*.6);transform:translateX(-50%);z-index:45;display:flex;align-items:center;gap:calc(var(--u)*.7);
  padding:calc(var(--u)*.45) calc(var(--u)*1.3);border-radius:99px;background:#16a34a;color:#fff;font-weight:700;font-size:calc(var(--u)*var(--ft)*1.05);
  border:0;box-shadow:0 4px 18px rgba(0,0,0,.4);cursor:pointer}
.asisPill i{width:calc(var(--u)*.9);height:calc(var(--u)*.9);border-radius:50%;background:#fff;animation:asisLuz 1.4s ease-in-out infinite}
@keyframes asisLuz{50%{opacity:.35}}
.asisPill[hidden]{display:none}
body.full .asisPill{display:none}
.ajAsis{margin-top:calc(var(--u)*2.2);padding:calc(var(--u)*1.6);border-radius:calc(var(--u)*1.2);border:1px solid var(--line);background:var(--card)}
.ajAsis.on{border-color:#16a34a;background:color-mix(in srgb,#16a34a 12%,var(--card))}
.ajAsis h3{margin:0 0 calc(var(--u)*.6)}
.ajAsis .ajEstado{margin:calc(var(--u)*.8) 0}
</style>`);
function pintaPill(){
  const p = $('#asisPill'), on = asisActiva() && ASIS.vista;      // solo se ve mientras el soporte está conectado
  p.hidden = !on;
  if (on) p.querySelector('span').textContent = t('asisPill', { n: Math.max(1, Math.ceil((ASIS.hasta - Date.now()) / 60e3)) });
}
setInterval(() => { if (ASIS.hasta) { if (!asisActiva()) asisTermina(true); else pintaPill(); } }, 30000);

/* ---------- Mi cuenta: el interruptor ---------- */
const _pintaPanelAjA = pintaPanelAj;
pintaPanelAj = function(enfocar){
  _pintaPanelAjA(enfocar);
  if (secAj !== 'cue') return;
  const on = asisActiva(), hh = new Date(ASIS.hasta).toLocaleTimeString('es-ES', { hour:'2-digit', minute:'2-digit' });
  $('#ajPanel').insertAdjacentHTML('beforeend', `<div class="ajAsis${on ? ' on' : ''}"><h3>${t('asisTit')}</h3>
    <p class="ajNota">${t('asisTxt')}</p>
    ${on ? `<div class="ajEstado ok">${t('asisActiva', { h: hh })}</div><p class="ajNota">${ASIS.vista ? '🟢 ' + t('asisConectado') : '⏳ ' + t('asisEspera')}</p>` : ''}
    <div class="ajBtns">${on ? boton('asisOff', t('asisOff')) : boton('asisOn', t('asisOn'), 'pri')}</div></div>`);
  if (enfocar && /^aja:asis/.test(enfocar)) { const e = $('#ajPanel').querySelector('[data-go^="aja:asis"]'); if (e) enfoca(e); }
};
const _accionA = accion;
accion = function(go){
  if (go === 'aja:asisOn') { pideConfirmar(t('asisTit'), t('asisTxt')).then(si => { if (si) asisEmpieza().then(() => pintaPanelAj('aja:asisOn')); }); return; }
  if (go === 'aja:asisOff') { asisTermina(true).then(() => pintaPanelAj('aja:asisOff')); return; }
  if (go === 'asisVer') { secAj = 'cue'; if (!$('#ajustes').classList.contains('on')) { if ($('#sec').classList.contains('on')) return rail('ajustes'); return abreAjustes(); } pintaMenuAj(); pintaPanelAj(); return; }
  return _accionA(go);
};

/* si la app se cerró con la asistencia activa, sigue (hasta que pase la hora) */
if (asisActiva()) { pintaPill(); setTimeout(asisPaso, 3000); } else if (ASIS.hasta) { ASIS.hasta = 0; guarda('asis_hasta', 0); }
