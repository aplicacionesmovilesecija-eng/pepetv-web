/* ===================================================================
   BUSCADOR GLOBAL + ACCESOS A LAS 4 SECCIONES EN LA CABECERA
   - Busca a la vez en películas, series, TV en vivo y radios, mientras se escribe.
   - Resultados en una ventana: primero películas, luego series, canales y radios.
   - Respeta el control parental: lo bloqueado u oculto no aparece.
   =================================================================== */
Object.assign(TXT.es, { busTodo:'Busca películas, series, canales o radios…', busPelis:'Películas', busSeries:'Series', busCanales:'TV en vivo',
  busRadios:'Radios', busNada:'No hay resultados para «{q}»', busEscribe:'Escribe al menos 2 letras', busMas:'{n} en total', busRadiosC:'Buscando emisoras…',
  busCargando:'Cargando la lista…' });
Object.assign(TXT.en, { busTodo:'Search movies, series, channels or radios…', busPelis:'Movies', busSeries:'Series', busCanales:'Live TV',
  busRadios:'Radios', busNada:'No results for “{q}”', busEscribe:'Type at least 2 letters', busMas:'{n} in total', busRadiosC:'Searching stations…',
  busCargando:'Loading the list…' });

const BUS = { q:'', res:{ movie:[], series:[], live:[], radio:[] }, tot:{}, tEsc:null, tRad:null, radQ:'', radCargando:false };
const BUS_MAX = { movie:40, series:40, live:60, radio:30 };
const normB = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/* ventana nueva (sustituye a la antigua de "Buscar") */
document.getElementById('vBuscar').remove();
document.body.insertAdjacentHTML('beforeend', `
<div class="velo" id="vBuscar"><div class="ven bus">
  <div class="busTop"><i>${IC.buscar}</i><input type="text" id="qBuscar" class="f" autocomplete="off" autocorrect="off" spellcheck="false" enterkeyhint="search">
    <button class="btn f busMic" data-go="busVoz" id="busMic" hidden data-tip="Buscar con la voz" aria-label="Buscar con la voz"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg></button>
    <button class="btn f busX" data-go="cerrar" aria-label="Cerrar" data-tip="Cerrar">✕</button></div>
  <div class="busRes" id="busRes"></div>
</div></div>`);
document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="css/buscador.css">');

/* carpetas que no deben salir (bloqueadas con PIN u ocultas) */
function gruposFuera(tipo){
  return gruposBloqueados(tipo);           // bloqueadas sin abrir con el PIN + ocultas (ajustes.js)
}
/* busca en una sección; primero lo que empieza igual, luego lo que tiene una palabra que empieza igual, luego el resto */
function buscaEn(tipo, q){
  if (!LISTA || !LISTA[tipo]) return { r: [], n: 0 };
  const w = normB(q).split(/\s+/).filter(Boolean), fuera = gruposFuera(tipo), q0 = w.join(' ');
  const a = [], b = [], c = [];
  for (const it of LISTA[tipo].items) {
    if (fuera.has(it.g)) continue;
    const x = it._nb || (it._nb = normB(it.n));
    if (!w.every(p => x.includes(p))) continue;
    if (x.startsWith(q0)) a.push(it); else if ((' ' + x).includes(' ' + w[0])) b.push(it); else c.push(it);
  }
  const todo = a.concat(b, c);
  return { r: todo.slice(0, BUS_MAX[tipo]), n: todo.length };
}

async function abreBuscador(){
  const q = document.getElementById('qBuscar');
  q.placeholder = t('busTodo'); q.value = BUS.q;
  abreVentana('vBuscar'); enfoca(q); q.select();
  if (!LISTA && listaActual()) {
    document.getElementById('busRes').innerHTML = `<div class="busMsg"><div class="sp"></div>${t('busCargando')}</div>`;
    try { await precargaLista(); } catch (e) {}
  }
  pintaBusqueda();
}
function escribeBusqueda(){ clearTimeout(BUS.tEsc); BUS.tEsc = setTimeout(() => { BUS.q = document.getElementById('qBuscar').value.trim(); pintaBusqueda(); }, 140); }

function pintaBusqueda(){
  const q = BUS.q, el = document.getElementById('busRes');
  if (normB(q).replace(/\s/g, '').length < 2) { BUS.res = { movie:[], series:[], live:[], radio:[] }; el.innerHTML = `<div class="busMsg">${t('busEscribe')}</div>`; return; }
  ['movie', 'series', 'live'].forEach(k => { const x = buscaEn(k, q); BUS.res[k] = x.r; BUS.tot[k] = x.n; });
  if (BUS.radQ !== q) { BUS.res.radio = []; BUS.tot.radio = 0; }
  pideRadios(q);
  dibujaResultados();
}
function dibujaResultados(){
  const el = document.getElementById('busRes'), R = BUS.res, q = BUS.q;
  const tit = (k, n, tot) => `<h4>${t(k)} <small>${tot > n ? t('busMas', { n: tot.toLocaleString('es-ES') }) : n}</small></h4>`;
  const poster = (tipo, it, i) => `<button class="bpos f" data-go="bres:${tipo}:${i}">
      <span class="bimg">${it.l ? `<img src="${esc(it.l)}" loading="lazy" alt="" onerror="this.remove()">` : ''}<em>${esc(iniciales(it.n))}</em></span>
      <b>${esc(it.n)}</b>${it.r && +it.r ? `<small>★ ${(+it.r).toFixed(1)}</small>` : ''}</button>`;
  const fila = (tipo, it, i, extra) => `<button class="bcan f" data-go="bres:${tipo}:${i}"><span class="lo">${logoHTML(it.l, it.n)}</span>
      <b>${esc(it.n)}</b><small>${esc(extra || '')}</small></button>`;
  let h = '';
  if (R.movie.length) h += `<section>${tit('busPelis', R.movie.length, BUS.tot.movie)}<div class="bfila">${R.movie.map((it, i) => poster('movie', it, i)).join('')}</div></section>`;
  if (R.series.length) h += `<section>${tit('busSeries', R.series.length, BUS.tot.series)}<div class="bfila">${R.series.map((it, i) => poster('series', it, i)).join('')}</div></section>`;
  if (R.live.length) { const gn = new Map((LISTA.live.cats || []).map(c => [c.id, c.n]));
    h += `<section>${tit('busCanales', R.live.length, BUS.tot.live)}<div class="blista">${R.live.map((it, i) => fila('live', it, i, (it.num ? 'Nº ' + it.num + ' · ' : '') + (gn.get(it.g) || ''))).join('')}</div></section>`; }
  if (R.radio.length) h += `<section>${tit('busRadios', R.radio.length, BUS.tot.radio)}<div class="blista">${R.radio.map((it, i) => fila('radio', it, i, [it.pais, it.codec].filter(Boolean).join(' · '))).join('')}</div></section>`;
  else if (BUS.radCargando) h += `<section><h4>${t('busRadios')}</h4><div class="busMsg peq"><div class="sp"></div>${t('busRadiosC')}</div></section>`;
  if (!h) h = `<div class="busMsg">${t('busNada', { q: esc(q) })}</div>`;
  const foco = document.activeElement && document.activeElement.closest && document.activeElement.closest('#busRes') ? document.activeElement.dataset.go : null;
  el.innerHTML = h;
  if (foco) { const f = el.querySelector(`[data-go="${foco}"]`); if (f) enfoca(f); else enfoca(document.getElementById('qBuscar')); }
}
/* las radios vienen de internet: se piden al dejar de escribir */
function pideRadios(q){
  clearTimeout(BUS.tRad);
  if (normB(q).length < 3 || BUS.radQ === q) { BUS.radCargando = false; return; }
  BUS.radCargando = true;
  BUS.tRad = setTimeout(async () => {
    try {
      const j = await radioAPI('/json/stations/search?hidebroken=true&order=clickcount&reverse=true&limit=120&name=' + encodeURIComponent(q));
      if (BUS.q !== q) return;
      const v = radioLimpia(j, '__bus'); BUS.res.radio = v.slice(0, BUS_MAX.radio); BUS.tot.radio = v.length; BUS.radQ = q;
    } catch (e) { if (BUS.q !== q) return; BUS.res.radio = []; }
    BUS.radCargando = false;
    if (document.getElementById('vBuscar').classList.contains('on')) dibujaResultados();
  }, 650);
}

const qB = document.getElementById('qBuscar');
qB.addEventListener('input', escribeBusqueda);
qB.addEventListener('keydown', e => {
  const k = e.key, c = e.keyCode;
  if (k === 'ArrowDown' || k === 'Enter') {
    e.preventDefault(); BUS.q = qB.value.trim(); clearTimeout(BUS.tEsc); pintaBusqueda();
    const p = document.querySelector('#busRes .f'); if (p) { enfoca(p); if (k === 'Enter' && !e.isComposing) qB.blur(); }
  }
  else if (k === 'Escape' || k === 'GoBack' || c === 10009 || c === 461 || c === 4) { e.preventDefault(); cierraVentana(); }
  e.stopPropagation();
});

/* ---------- búsqueda por voz ----------
   Móvil y tele (APK): el reconocimiento de voz de Google. Ordenador: el de Chrome. */
Object.assign(TXT.es, { busVoz:'Di lo que quieres buscar', busEscucha:'Escuchando…', busSinVoz:'Este aparato no tiene búsqueda por voz.' });
Object.assign(TXT.en, { busVoz:'Say what you want to search', busEscucha:'Listening…', busSinVoz:'This device has no voice search.' });
const SRweb = window.SpeechRecognition || window.webkitSpeechRecognition;
(async () => {
  let si = false;
  if (NATP && NATP.vozDisponible) { try { si = !!(await NATP.vozDisponible()).si; } catch (e) {} }
  else si = !!SRweb && !window.PepePC;   // en el programa de Windows la voz de Chrome no funciona
  document.getElementById('busMic').hidden = !si;
})();
function textoVoz(txt){
  txt = String(txt || '').trim(); if (!txt) return;
  qB.value = txt; BUS.q = txt; pintaBusqueda();
  const p = document.querySelector('#busRes .f'); enfoca(p || qB);
}
async function buscaVoz(){
  const b = document.getElementById('busMic'), lang = LANG === 'en' ? 'en-US' : 'es-ES';
  if (NATP && NATP.voz) {
    try { textoVoz((await NATP.voz({ lang, texto: t('busVoz') })).texto); }
    catch (e) { if (!/cancel/i.test(String(e && e.message))) aviso(t('busSinVoz')); }
    return;
  }
  if (!SRweb) { aviso(t('busSinVoz')); return; }
  const r = new SRweb(); r.lang = lang; r.interimResults = false; r.maxAlternatives = 1;
  b.classList.add('oyendo'); qB.placeholder = t('busEscucha');
  r.onresult = e => textoVoz(e.results[0][0].transcript);
  r.onerror = () => aviso(t('busSinVoz'));
  r.onend = () => { b.classList.remove('oyendo'); qB.placeholder = t('busTodo'); };
  try { r.start(); } catch (e) { b.classList.remove('oyendo'); }
}
/* botón de buscar / micrófono del mando (en los aparatos que lo pasan a la app) */
document.addEventListener('keydown', e => {
  if (!['BrowserSearch', 'LaunchAssistant', 'MicrophoneToggle', 'VoiceDial'].includes(e.key)) return;
  e.preventDefault();
  if (!document.getElementById('vBuscar').classList.contains('on')) abreBuscador();
  if (!document.getElementById('busMic').hidden) setTimeout(buscaVoz, 300);
}, true);

/* abrir un resultado: lleva a su sección y lo abre / lo pone */
async function abreResultado(tipo, i){
  const it = BUS.res[tipo][i]; if (!it) return;
  cierraVentana();
  const enSec = document.getElementById('sec').classList.contains('on');
  if (typeof PF !== 'undefined' && PF.abierta) cierraFicha();
  if (typeof SF !== 'undefined' && SF.abierta) cierraSerie();
  if (enSec) pantallaCompleta(false);
  if (!enSec || S.tipo !== tipo) {
    if (enSec) { paraVideo(); S.jugando = null; fondoPlayer(null); msgPlayer(''); }
    if (tipo === 'live' && LISTA) guarda('ult_canal_' + LISTA.key, it.id);    // así no arranca antes otro canal
    await abreSeccion(tipo);
    pila = pila.filter(x => x !== 'sec');
  }
  if (tipo === 'radio') {
    RADIO.busq = BUS.res.radio; S.busqueda = BUS.q; montaRadios();
    S.zona = 'items'; eligeCat(Math.max(0, S.cats.findIndex(c => c.id === '__bus')));
    S.it = Math.max(0, S.items.findIndex(x => x.id === it.id)); reproduceCanal(S.items[S.it] || it); marcaZonas(); return;
  }
  if (tipo === 'live') {
    S.zona = 'items'; eligeCat(Math.max(0, S.cats.findIndex(c => c.id === '__all')));
    S.it = Math.max(0, S.items.findIndex(x => x.id === it.id));
    if (!S.jugando || S.jugando.id !== it.id) reproduceCanal(it); else marcaZonas();
    return;
  }
  abreFicha(it);
}

/* ---------- accesos a las 4 secciones en la cabecera ---------- */
const TIPOS_SEC = ['live', 'movie', 'series', 'radio'];
(() => {
  const ico = tipo => { const s = document.querySelector(`#home .tile[data-go="sec:${tipo}"] .ico svg`); return s ? s.outerHTML : ''; };
  const txt = { live:'tv', movie:'peliculas', series:'series', radio:'radios' };
  document.querySelector('#sec .chip').insertAdjacentHTML('afterend', `<nav class="secs" id="secs">${TIPOS_SEC.map(k =>
    `<button class="sb" data-s="${k}">${ico(k)}<small data-t="${txt[k]}">${t(txt[k])}</small></button>`).join('')}</nav>`);
})();
S.top = 0;
function cambiaSeccion(tipo){
  if (seccionVacia(tipo)) { aviso(t('noIncluidaAviso', { s: t({ live:'tv', movie:'peliculas', series:'series' }[tipo]) })); return; }
  if (tipo === S.tipo && !PF.abierta && !SF.abierta) { S.zona = 'items'; marcaZonas(); return; }
  if (PF.abierta) cierraFicha(); if (SF.abierta) cierraSerie();
  pantallaCompleta(false); paraVideo(); S.jugando = null; fondoPlayer(null); msgPlayer('');
  abreSeccion(tipo).finally(() => { pila = pila.filter(x => x !== 'sec'); });
}
document.getElementById('secs').addEventListener('click', e => { const b = e.target.closest('.sb'); if (b) cambiaSeccion(b.dataset.s); });

const _marcaZonasB = marcaZonas;
marcaZonas = function(){
  _marcaZonasB();
  document.querySelectorAll('#secs .sb').forEach((b, i) => {
    b.classList.toggle('on', TIPOS_SEC[i] === S.tipo);
    b.classList.toggle('foc', S.zona === 'top' && i === S.top);
  });
};

/* buscador desde el carril y desde la portada */
const _railB = rail;
rail = function(r){ if (r === 'buscar') return abreBuscador(); _railB(r); };
const _accionB = accion;
accion = function(go){
  if (go.startsWith('bres:')) { const q = go.split(':'); return abreResultado(q[1], +q[2]); }
  if (go === 'buscarTodo') return abreBuscador();
  if (go === 'busVoz') return buscaVoz();
  return _accionB(go);
};
(() => {
  const r = document.querySelector('#home [data-go="refrescar"]'); if (!r) return;
  r.insertAdjacentHTML('beforebegin', `<button class="btn f" data-go="buscarTodo">${IC.buscar}<span data-t="buscar">${t('buscar')}</span></button>`);
})();

/* mando: subir desde la primera carpeta (o el primer botón del carril) lleva a los accesos de arriba */
const _teclaB = teclaSeccion;
teclaSeccion = function(e){
  const sec = document.getElementById('sec');
  if (!sec.classList.contains('on') || document.querySelector('.velo.on') || document.body.classList.contains('full')
      || PF.abierta || SF.abierta || document.getElementById('scarga').classList.contains('on')) return _teclaB(e);
  const k = e.key, c = e.keyCode, atrasK = k === 'Escape' || k === 'Backspace' || k === 'GoBack' || c === 10009 || c === 461 || c === 4;
  if (S.zona === 'top') {
    if (k === 'ArrowLeft' || k === 'ArrowRight') { S.top = Math.max(0, Math.min(3, S.top + (k === 'ArrowLeft' ? -1 : 1))); marcaZonas(); }
    else if (k === 'ArrowDown' || atrasK) { S.zona = 'cats'; marcaZonas(); }
    else if (k === 'Enter') cambiaSeccion(TIPOS_SEC[S.top]);
    else return _teclaB(e);
    e.preventDefault(); return true;
  }
  if (k === 'ArrowUp' && ((S.zona === 'cats' && S.cat === 0) || (S.zona === 'rail' && S.rail === 0))) {
    S.zona = 'top'; S.top = Math.max(0, TIPOS_SEC.indexOf(S.tipo)); marcaZonas(); e.preventDefault(); return true;
  }
  return _teclaB(e);
};
