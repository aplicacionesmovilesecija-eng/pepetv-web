/* ===================================================================
   SECCIÓN TV EN VIVO (la misma estructura servirá a las demás)
   carril de iconos | carpetas | canales | reproductor + guía
   =================================================================== */
Object.assign(TXT.es, {
  favoritos:'Favoritos', todos:'Todos los canales', resultados:'Resultados', total:'Total: {n}', cargandoLista:'Cargando la lista…',
  av_conectando:'Conectando con el servidor…', av_canales:'Descargando canales…', av_peliculas:'Descargando películas…', av_series:'Descargando series…',
  errLista:'No se ha podido leer la lista.', errAuth:'El usuario o la contraseña de la lista no son válidos, o la lista ha caducado.',
  errCors:'Si estás probando en el navegador del ordenador, puede que el servidor no deje leer la lista desde una web. En la app instalada sí funciona.',
  reintentar:'Reintentar', volver:'Volver', sinCanales:'Esta carpeta está vacía', sinFavs:'Aún no tienes favoritos. Pulsa el corazón con un canal puesto para añadirlo.',
  noReproduce:'No se puede reproducir este canal', probandoBackup:'Probando el canal de reserva…', conectandoCanal:'Conectando…',
  favSi:'Añadido a favoritos', favNo:'Quitado de favoritos', sinGuia:'No hay guía para este canal', buscar:'Buscar', buscarPh:'Nombre del canal…',
  expiraLista:'Expira el {f}', sinCaducidad:'Sin caducidad', listaDe:'Lista actual:', estadoApp:'Activación', ilimitada:'Ilimitada',
  ajusteOriginal:'Original', ajusteLlenar:'Llenar', ajusteRecortar:'Recortar', ajuste43:'4:3', sinLista:'No hay ninguna lista cargada',
  canalesN:'{n} canales'
});
Object.assign(TXT.en, {
  favoritos:'Favorites', todos:'All channels', resultados:'Results', total:'Total: {n}', cargandoLista:'Loading playlist…',
  av_conectando:'Connecting to server…', av_canales:'Downloading channels…', av_peliculas:'Downloading movies…', av_series:'Downloading series…',
  errLista:'The playlist could not be read.', errAuth:'Playlist username or password are not valid, or the playlist has expired.',
  errCors:'If you are testing in a desktop browser, the server may block reading from a web page. The installed app works.',
  reintentar:'Retry', volver:'Back', sinCanales:'This folder is empty', sinFavs:'No favorites yet. Press the heart while a channel is playing.',
  noReproduce:'This channel cannot be played', probandoBackup:'Trying backup channel…', conectandoCanal:'Connecting…',
  favSi:'Added to favorites', favNo:'Removed from favorites', sinGuia:'No guide for this channel', buscar:'Search', buscarPh:'Channel name…',
  expiraLista:'Expires {f}', sinCaducidad:'No expiry', listaDe:'Current playlist:', estadoApp:'Activation', ilimitada:'Unlimited',
  ajusteOriginal:'Original', ajusteLlenar:'Fill', ajusteRecortar:'Crop', ajuste43:'4:3', sinLista:'No playlist loaded', canalesN:'{n} channels'
});

/* ---------- iconos ---------- */
const IC = {
  home:'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/></svg>',
  full:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
  salirFull:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/></svg>',
  fav:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.8 4.5c2.1 0 3.6 1.2 5.2 3 1.6-1.8 3.1-3 5.2-3 3.8 0 5.9 3.9 4.4 7.3C19.5 16.4 12 21 12 21z"/></svg>',
  buscar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.6-4.6"/></svg>',
  listas:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/></svg>',
  info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>',
  salir:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 3v8M6.3 6.6a8 8 0 1 0 11.4 0"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4z" fill="#000" opacity=".55"/></svg>',
  reloj:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M5 3 2 6M19 3l3 3"/></svg>',
  eq:'<svg viewBox="0 0 24 16" fill="currentColor"><rect x="1" y="6" width="4" height="10" rx="1"><animate attributeName="y" values="6;2;8;6" dur="1s" repeatCount="indefinite"/></rect><rect x="10" y="2" width="4" height="14" rx="1"><animate attributeName="y" values="2;9;4;2" dur="1.1s" repeatCount="indefinite"/></rect><rect x="19" y="8" width="4" height="8" rx="1"><animate attributeName="y" values="8;3;7;8" dur=".9s" repeatCount="indefinite"/></rect></svg>',
  pant:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M8 10V8h3M16 14v2h-3"/></svg>',
  vol:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/></svg>',
  lista:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M5 7h14M5 12h14M5 17h9"/></svg>',
  escudo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>'
};

/* ---------- maqueta de la pantalla ---------- */
document.body.insertAdjacentHTML('beforeend', `
<section class="scr" id="sec">
  <nav class="rail" id="rail">
    <div class="hora" data-clock></div>
    <button class="rb" data-r="home">${IC.home}</button>
    <button class="rb" data-r="full">${IC.full}</button>
    <button class="rb" data-r="fav">${IC.fav}</button>
    <button class="rb" data-r="buscar">${IC.buscar}</button>
    <button class="rb" data-r="listas">${IC.listas}</button>
    <button class="rb" data-r="info">${IC.info}</button>
    <button class="rb fin" data-r="salir">${IC.salir}</button>
  </nav>
  <div class="smain">
    <header class="shead">
      <img class="lg" data-logo alt=""><span class="ver" data-version></span>
      <div class="chip"><b id="sTit"></b><span id="sCarp"></span></div>
      <div class="hbox">
        <div class="hb"><i>${IC.lista}</i><div><span>${'<span data-t="listaDe"></span>'} <em id="hLista"></em></span><small id="hExp"></small></div></div>
        <div class="hb"><i>${IC.escudo}</i><div><span data-t="estadoApp"></span><small id="hAct"></small></div></div>
      </div>
    </header>
    <div class="sbody">
      <div class="col"><div class="vl" id="vCats"><div class="esp"></div></div></div>
      <div class="col"><div class="vl" id="vItems"><div class="esp"></div></div><div class="vacio" id="iVacio" hidden></div></div>
      <div class="pcol">
        <div class="pbox" id="pbox">
          <video id="vid" playsinline></video>
          <div class="logoFondo" id="pFondo"><img data-icon alt=""></div>
          <div class="osd oculto" id="osd"></div>
          <div class="pbar oculto" id="pbar">
            <button class="pbtn" id="bFull" title="Pantalla completa">${IC.full}</button>
            <button class="pbtn" id="bAjuste">${IC.pant}<span></span></button>
            <label class="pbtn">${IC.vol}<input type="range" id="bVol" min="0" max="1" step="0.05"></label>
          </div>
          <div class="pmsg" id="pmsg"></div>
        </div>
        <div class="guia" id="guia"></div>
      </div>
    </div>
  </div>
  <div class="scarga" id="scarga"></div>
</section>
<div id="numero"></div>
<div class="velo" id="vBuscar"><div class="ven">
  <h3 data-t="buscar"></h3>
  <input type="text" id="qBuscar" autocomplete="off">
  <div class="botones"><button class="btn f" data-go="cerrar" data-t="cerrar"></button><button class="btn pri f" data-go="buscarYa" data-t="buscar"></button></div>
</div></div>`);
document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="css/seccion.css">');

/* ---------- estado ---------- */
const S = {
  tipo:'live', lista:null, cats:[], items:[], cat:0, it:0, zona:'items', rail:0,
  jugando:null, intento:0, busqueda:'', cargando:false
};
let LISTA = null;           // datos de la lista actual (todas las secciones)
let cargaEnCurso = null;

/* unidad de tamaño en píxeles (igual que --u del CSS) */
function U(){ const p = document.createElement('div'); p.style.cssText = 'position:absolute;width:calc(var(--u)*100);visibility:hidden'; document.body.appendChild(p); const w = p.offsetWidth / 100; p.remove(); return w; }
let UPX = U(); addEventListener('resize', () => { UPX = U(); vCats.pinta(true); vItems.pinta(true); });

/* ---------- lista virtual (miles de canales sin atascarse) ---------- */
class VLista {
  constructor(el, alto, html, click){ this.el = el; this.esp = el.firstElementChild; this.alto = alto; this.html = html; this.n = 0; this.foc = -1; this.sel = -1;
    el.addEventListener('scroll', () => this.pinta()); this.click = click;
    el.addEventListener('click', e => { const r = e.target.closest('.row'); if (r) this.click(+r.dataset.i); }); }
  h(){ return Math.round(this.alto() * UPX); }
  pon(n){ this.n = n; this.el.scrollTop = 0; this.pinta(true); }
  pinta(todo){
    const h = this.h(), gap = Math.round(UPX * .55), paso = h + gap, H = this.el.clientHeight, top = this.el.scrollTop;
    this.esp.style.height = (this.n * paso) + 'px';
    const a = Math.max(0, Math.floor(top / paso) - 4), b = Math.min(this.n, Math.ceil((top + H) / paso) + 4);
    if (!todo && this._a === a && this._b === b && !this.sucio) return;
    this._a = a; this._b = b; this.sucio = false;
    let s = ''; for (let i = a; i < b; i++) s += `<div class="row ${this.html.cls || ''}${i === this.foc && !this.sinFoc ? ' foc' : ''}${i === this.sel ? ' sel' : ''}" data-i="${i}" style="top:${i * paso}px;height:${h}px">${this.html(i)}</div>`;
    this.esp.innerHTML = s;
  }
  ve(i){ const h = this.h() + Math.round(UPX * .55), top = i * h, el = this.el;
    if (top < el.scrollTop) el.scrollTop = top; else if (top + h > el.scrollTop + el.clientHeight) el.scrollTop = top + h - el.clientHeight; }
  marca(foc, sel){ if (foc !== undefined) this.foc = foc; if (sel !== undefined) this.sel = sel; this.sucio = true; if (this.foc >= 0) this.ve(this.foc); this.pinta(true); }
}

const iniciales = n => (String(n || '?').replace(/^[A-Z]{2,3}[-:|\s]+/i, '').trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('') || '?').toUpperCase();
const logoHTML = (src, n) => src ? `<img src="${esc(src)}" loading="lazy" onerror="this.replaceWith(document.createTextNode('${esc(iniciales(n)).replace(/'/g, '')}'))">` : esc(iniciales(n));

const htmlCat = i => { const c = S.cats[i]; return `<b>${esc(c.n)}</b><small>${t('total', { n: c.total })}</small>${c.id === '__fav' ? `<span class="hz" style="color:#ff5d7a">${IC.fav}</span>` : c.ico ? `<span class="hz">${c.ico}</span>` : ''}`; };
htmlCat.cls = 'cat';
const htmlIt = i => { const it = S.items[i];
  return `<span class="lo">${logoHTML(it.l, it.n)}</span><span class="nm">${esc(it.n)}</span>${esFavX(it.id) ? `<span class="hz">${IC.fav}</span>` : ''}<span class="eq">${IC.eq}</span><span class="nu">${it.num || i + 1}</span>`; };
htmlIt.cls = 'it';

const vCats = new VLista(document.getElementById('vCats'), () => 4.7, htmlCat, i => { S.zona = 'cats'; eligeCat(i); marcaZonas(); });
const vItems = new VLista(document.getElementById('vItems'), () => 3.7, htmlIt, i => { S.zona = 'items'; S.it = i; marcaZonas(); okItem(); });

/* ---------- carga de la lista actual ---------- */
function listaActual(){ const L = (LIC && LIC.lists) || []; if (!L.length) return null; return L[Math.min(lee('lista', 0), L.length - 1)]; }

function precargaLista(forzar){
  const l = listaActual(); if (!l) { LISTA = null; return Promise.resolve(null); }
  if (cargaEnCurso && !forzar) return cargaEnCurso;
  cargaEnCurso = cargaLista(l, forzar, paso => {
      const c = document.getElementById('scarga'); if (c.classList.contains('on')) c.querySelector('small').textContent = t('av_' + paso); })
    .then(d => { LISTA = d; contadores(); return d; })
    .finally(() => { cargaEnCurso = null; });
  return cargaEnCurso;
}
function contadores(){
  if (!LISTA) return;
  const f = (id, n, k) => { const e = document.getElementById(id); if (e) e.textContent = n ? t(k, { n: n.toLocaleString('es-ES') }) : ''; };
  /* sin contar lo de las carpetas ocultas por control parental */
  const n = k => { const fuera = typeof ocultasDe === 'function' ? ocultasDe(k) : null; return fuera && fuera.size ? LISTA[k].items.filter(x => !fuera.has(x.g)).length : LISTA[k].items.length; };
  f('nLive', n('live'), 'canales'); f('nMovie', n('movie'), 'pelis'); f('nSeries', n('series'), 'seriesN');
  /* secciones que esta lista no trae: se ven atenuadas (en la portada y en los iconos de arriba) */
  [['movie', 'nMovie'], ['series', 'nSeries'], ['live', 'nLive']].forEach(([k, id]) => {
    const vacia = !LISTA[k].items.length;
    document.querySelectorAll(`#home .tile[data-go="sec:${k}"], #secs .sb[data-s="${k}"]`).forEach(x => x.classList.toggle('vacia', vacia));
    if (vacia) { const e = document.getElementById(id); if (e) e.textContent = t('noIncluida'); }
  });
}
const seccionVacia = tipo => (tipo === 'live' || tipo === 'movie' || tipo === 'series') && LISTA && listaActual() && LISTA.key === claveLista(listaActual()) && !LISTA[tipo].items.length;

/* ---------- abrir sección ---------- */
async function abreSeccion(tipo){
  document.getElementById('sec').classList.toggle('grid', tipo === 'movie' || tipo === 'series');
  if (tipo === 'radio') return abreRadios();
  if (tipo !== 'live' && tipo !== 'movie' && tipo !== 'series') { aviso(t('enObras')); return; }
  if (!listaActual()) { aviso(t('sinLista')); return; }
  if (seccionVacia(tipo)) { aviso(t('noIncluidaAviso', { s: t({ live:'tv', movie:'peliculas', series:'series' }[tipo]) })); return; }
  S.tipo = tipo; S.busqueda = '';
  document.getElementById('sTit').textContent = t({ live:'tv', movie:'peliculas', series:'series' }[tipo]);
  pintaCabecera();
  muestra('sec');
  pintaTextos();
  if (!LISTA || LISTA.key !== claveLista(listaActual())) {
    cargando(true);
    try { await precargaLista(); }
    catch (e) { cargando(false, e); return; }
    cargando(false);
  }
  if (tipo !== 'live') usaTend();
  /* si con esta lista no hay ninguna tendencia, se pasa sola a "Todas las películas / series" */
  if (tipo !== 'live') cargaTendencias().then(() => { const c = S.cats.find(x => x.id === '__tend'); if (c) { c.total = TEND.items.length; vCats.marca(); }
    if (!TEND.items.length && S.tipo === tipo && document.getElementById('sec').classList.contains('on') && S.cats[S.cat] && S.cats[S.cat].id === '__tend') {
      const j = S.cats.findIndex(x => x.id === '__all'); if (j >= 0) { eligeCat(j); marcaZonas(); } } });
  montaCarpetas();
  const tendVacia = TENDS[tipo] && TENDS[tipo].key === LISTA.key && !TENDS[tipo].cargando && !TENDS[tipo].items.length;
  const ultima = tipo !== 'live' && BRAND.tmdb && !tendVacia ? '__tend' : '__all';      // al entrar: Tendencias (pelis/series) o Todos los canales
  let ci = S.cats.findIndex(c => c.id === ultima); if (ci < 0) ci = S.cats.findIndex(c => c.total > 0 && !c.id.startsWith('__')); if (ci < 0) ci = 0;
  S.zona = 'items';
  eligeCat(ci);
  if (tipo !== 'live') { marcaZonas(); return; }
  const ult = lee('ult_canal_' + claveSec(), null), ii = S.items.findIndex(x => x.id === ult);
  S.it = Math.max(0, ii); marcaZonas();
  if (ii >= 0) reproduceCanal(S.items[ii]);
}
function pintaCabecera(){
  const l = listaActual();
  document.getElementById('hLista').textContent = l ? l.name : '';
  document.getElementById('hExp').textContent = LISTA && LISTA.exp ? t('expiraLista', { f: fecha(LISTA.exp) }) : (LISTA ? t('sinCaducidad') : '');
  document.getElementById('hAct').textContent = LIC.st === 'trial' ? t('st_trial') + ' · ' + fecha(LIC.end) : t('expira', { f: fecha(LIC.end) });
}
function cargando(si, err){
  const c = document.getElementById('scarga');
  if (si) { c.innerHTML = `<div class="sp"></div><div>${t('cargandoLista')}</div><small>${t('av_conectando')}</small>`; c.classList.add('on'); return; }
  if (!err) { c.classList.remove('on'); pintaCabecera(); return; }
  const auth = String(err.message) === 'auth';
  const web = !(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
  c.innerHTML = `<div style="font-size:calc(var(--u)*var(--ft)*2.2);font-weight:800">${t('errLista')}</div>
    <small>${auth ? t('errAuth') : (web ? t('errCors') : esc(err.message))}</small>
    <div class="botones"><button class="btn pri f" data-go="secReintentar">${t('reintentar')}</button><button class="btn f" data-go="secVolver">${t('volver')}</button></div>`;
  c.classList.add('on'); enfocaPrimero(c);
}

/* ---------- carpetas ---------- */
function montaCarpetas(){
  if (S.tipo === 'radio') return montaRadios();
  const d = LISTA[S.tipo], cuenta = {};
  d.items.forEach(it => { cuenta[it.g] = (cuenta[it.g] || 0) + 1; });
  const fv = favs(LISTA, S.tipo);
  S.cats = [{ id:'__fav', n:t('favoritos'), total: fv.length }];
  carpetasEspeciales();
  if (S.busqueda) S.cats.push({ id:'__bus', n:t('resultados') + ': ' + S.busqueda, total: buscaItems(S.busqueda).length });
  d.cats.forEach(c => { if (cuenta[c.id]) S.cats.push({ id:c.id, n:c.n, total:cuenta[c.id] }); });
  const sin = d.items.filter(it => !d.cats.some(c => c.id === it.g)).length;
  if (sin) S.cats.push({ id:'__sin', n:'Sin carpeta', total:sin });
  S.cats.push({ id:'__all', n:t(S.tipo === 'live' ? 'todos' : S.tipo === 'movie' ? 'todas' : 'todasS'), total:d.items.length });
  vCats.pon(S.cats.length);
}
function itemsDe(cat){
  if (S.tipo === 'radio') return radioItems(cat);
  const d = LISTA[S.tipo], esp = itemsEspecial(cat); if (esp) return esp;
  if (cat.id === '__fav') { const fv = favs(LISTA, S.tipo), m = new Map(d.items.map(x => [x.id, x])); return fv.map(id => m.get(id)).filter(Boolean); }
  if (cat.id === '__all') return d.items;
  if (cat.id === '__bus') return buscaItems(S.busqueda);
  if (cat.id === '__sin') return d.items.filter(it => !d.cats.some(c => c.id === it.g));
  return d.items.filter(it => it.g === cat.id);
}
function buscaItems(q){
  const n = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const w = n(q).split(/\s+/).filter(Boolean);
  return LISTA[S.tipo].items.filter(it => { const x = n(it.n); return w.every(p => x.includes(p)); }).slice(0, 2000);
}
function eligeCat(i){
  S.cat = Math.max(0, Math.min(i, S.cats.length - 1));
  const c = S.cats[S.cat]; S.items = itemsDe(c);
  document.getElementById('sCarp').textContent = c.n;
  if (!c.id.startsWith('__')) guarda('ult_cat_' + claveSec(), c.id);
  vItems.pon(S.items.length);
  const sel = S.jugando ? S.items.findIndex(x => x.id === S.jugando.id) : -1;
  S.it = sel >= 0 ? sel : 0;
  vItems.marca(S.zona === 'items' ? S.it : -1, sel);
  vCats.marca(S.zona === 'cats' ? S.cat : -1, S.cat);
  const v = document.getElementById('iVacio');
  v.hidden = S.items.length > 0; v.textContent = c.id === '__fav' ? t(S.tipo === 'radio' ? 'sinFavsR' : 'sinFavs') : (c.cargando ? t('cargandoR') : t('sinCanales'));
  if (enGrid()) gridCat(c); else guiaDe(S.items[S.it]);
}
function marcaZonas(){
  vCats.marca(S.zona === 'cats' ? S.cat : -1, S.cat);
  const sel = S.jugando ? S.items.findIndex(x => x.id === S.jugando.id) : -1;
  vItems.marca(S.zona === 'items' ? S.it : -1, sel);
  document.querySelectorAll('#rail .rb').forEach((b, i) => b.classList.toggle('foc', S.zona === 'rail' && i === S.rail));
  marcaGrid();
}

/* ---------- reproductor ----------
   "vid" es una fachada: en la APK manda al reproductor nativo (ExoPlayer);
   en el ordenador usa el <video> del navegador con hls.js / mpegts.js. El resto de la app no nota la diferencia. */
const NATP = (() => { const C = window.Capacitor; return C && C.isNativePlatform && C.isNativePlatform() && C.Plugins && C.Plugins.PepePlayer ? C.Plugins.PepePlayer : null; })();
class Vid extends EventTarget {
  constructor(el){
    super(); this.el = el; this.nat = false; this.onerror = null;
    this.st = { pos:0, dur:NaN, paused:true, w:0, h:0, ready:0 };
    ['playing','waiting','pause','play','timeupdate','ended','loadedmetadata','error'].forEach(ev =>
      el.addEventListener(ev, () => { if (!this.nat) this.emite(ev); }));
  }
  emite(ev){ this.dispatchEvent(new Event(ev)); if (ev === 'error' && this.onerror) this.onerror(); }
  get currentTime(){ return this.nat ? this.st.pos : this.el.currentTime; }
  set currentTime(v){ if (this.nat) { this.st.pos = v; NATP.seek({ s: v }); } else this.el.currentTime = v; }
  get duration(){ return this.nat ? this.st.dur : this.el.duration; }
  get paused(){ return this.nat ? this.st.paused : this.el.paused; }
  get videoWidth(){ return this.nat ? this.st.w : this.el.videoWidth; }
  get videoHeight(){ return this.nat ? this.st.h : this.el.videoHeight; }
  get readyState(){ return this.nat ? this.st.ready : this.el.readyState; }
  get volume(){ return this.el.volume; }
  set volume(v){ this.el.volume = v; if (NATP) NATP.volumen({ v }); }
  play(){ if (this.nat) { NATP.resume(); return Promise.resolve(); } return this.el.play(); }
  pause(){ if (this.nat) NATP.pause(); else this.el.pause(); }
}
const vid = new Vid(document.getElementById('vid'));
let hls = null, mts = null, tFallo = null;
try { vid.volume = lee('vol', 1); } catch (e) {}
document.getElementById('bVol').value = vid.volume;
document.getElementById('bVol').oninput = e => { vid.volume = +e.target.value; guarda('vol', vid.volume); };

function paraVideo(){
  clearTimeout(tFallo);
  if (vid.nat) { NATP.stop(); vid.nat = false; nativoVisible(false); }
  vid.st = { pos:0, dur:NaN, paused:true, w:0, h:0, ready:0 };
  if (hls) { try { hls.destroy(); } catch (e) {} hls = null; }
  if (mts) { try { mts.pause(); mts.unload(); mts.detachMediaElement(); mts.destroy(); } catch (e) {} mts = null; }
  vid.onerror = null; vid.el.removeAttribute('src'); try { vid.el.load(); } catch (e) {}
}
/* opc: { directo, desde } */
function motor(url, falla, opc){
  paraVideo(); opc = opc || {};
  if (typeof pingPronto === 'function') pingPronto();
  let hecho = false; const mal = m => { if (hecho) return; hecho = true; falla(m); };
  vid.onerror = () => mal('video');
  if (NATP) {
    const conVista = S.tipo !== 'radio';
    vid.nat = true; vid.st.paused = false;
    NATP.play({ url, live: opc.directo !== undefined ? !!opc.directo : (S.tipo === 'live' || S.tipo === 'radio'), vista: conVista, desde: opc.desde || 0 });
    nativoVisible(conVista);
    tFallo = setTimeout(() => { if (vid.readyState < 2) mal('tiempo'); }, 25000);
    return;
  }
  const nombre = url.split('?')[0].split('/').pop(), m3u8 = /\.m3u8$/i.test(nombre), ts = /\.ts$/i.test(nombre) || !/\.\w{2,4}$/.test(nombre);
  const hlsNativo = window.IOS && vid.el.canPlayType('application/vnd.apple.mpegurl');
  if (hlsNativo && (m3u8 || !ts)) {                        // iPhone/iPad: reproductor de Safari (no necesita CORS)
    vid.el.src = url;
  } else if (m3u8 && window.Hls && Hls.isSupported()) {
    hls = new Hls({ enableWorker:true, maxBufferLength:30, liveSyncDurationCount:4, manifestLoadingMaxRetry:3, levelLoadingMaxRetry:3, fragLoadingMaxRetry:4 });
    hls.on(Hls.Events.ERROR, (e, d) => { if (d.fatal) mal('hls'); });
    hls.loadSource(url); hls.attachMedia(vid.el);
  } else if (ts && window.mpegts && mpegts.isSupported()) {
    mts = mpegts.createPlayer({ type:'mpegts', isLive:true, url }, { enableWorker:true, enableStashBuffer:true, stashInitialSize:384 * 1024, liveBufferLatencyChasing:false });
    mts.on(mpegts.Events.ERROR, () => mal('ts'));
    mts.attachMediaElement(vid.el); mts.load();
  } else { vid.el.src = url; }
  if (opc.desde > 0) { const pon = () => { try { vid.el.currentTime = opc.desde; } catch (e) {} vid.el.removeEventListener('loadedmetadata', pon); }; vid.el.addEventListener('loadedmetadata', pon); }
  tFallo = setTimeout(() => { if (vid.readyState < 2) mal('tiempo'); }, 20000);
  vid.el.play().catch(() => {});
}
/* eventos del reproductor nativo -> la fachada */
if (NATP) {
  document.documentElement.classList.add('apk');
  NATP.addListener('estado', e => {
    if (!vid.nat) return;
    if (e.estado === 'buffering') { vid.st.ready = 1; vid.emite('waiting'); }
    else if (e.estado === 'ready') { const antes = vid.st.ready; vid.st.ready = 4; if (antes < 4) { vid.emite('loadedmetadata'); if (!vid.st.paused) vid.emite('playing'); } }
    else if (e.estado === 'ended') vid.emite('ended');
    else if (e.estado === 'error') vid.emite('error');
  });
  NATP.addListener('juega', e => { if (!vid.nat) return; vid.st.paused = !e.si; vid.emite(e.si ? 'play' : 'pause'); if (e.si && vid.st.ready >= 4) vid.emite('playing'); });
  NATP.addListener('tiempo', e => { if (!vid.nat) return; vid.st.pos = e.pos / 1000; vid.st.dur = e.dur > 0 ? e.dur / 1000 : NaN; vid.emite('timeupdate'); });
  NATP.addListener('video', e => { if (!vid.nat) return; vid.st.w = e.w; vid.st.h = e.h; vid.emite('loadedmetadata'); });
}
/* el vídeo nativo se ve por un "hueco" transparente en la pantalla web, justo donde está el reproductor */
let rectNat = '', tRect = null;
function nativoVisible(si){
  document.documentElement.classList.toggle('vnat', si);
  document.getElementById('pbox').classList.toggle('nativo', si);
  clearInterval(tRect); rectNat = '';
  if (si) { mideNativo(); tRect = setInterval(mideNativo, 250); }
}
function mideNativo(){
  if (!NATP || !vid.nat) return;
  const b = document.getElementById('pbox'), r = b.getBoundingClientRect(), k = window.devicePixelRatio || 1;
  /* ojo: en pantalla completa el reproductor es "fixed" y offsetParent vale null aunque se vea */
  const ver = document.getElementById('sec').classList.contains('on') && b.getClientRects().length > 0
    && getComputedStyle(b).display !== 'none' && !document.querySelector('.velo.on') && r.width > 2 && r.height > 2;
  const q = { x: Math.round(r.left * k), y: Math.round(r.top * k), w: Math.round(r.width * k), h: Math.round(r.height * k), ver };
  const clave = JSON.stringify(q); if (clave === rectNat) return; rectNat = clave;
  NATP.rect(q);
}
vid.addEventListener('playing', () => { clearTimeout(tFallo); msgPlayer(''); pintaOSD(); });
vid.addEventListener('waiting', () => msgPlayer('<div><div class="sp"></div></div>'));
vid.addEventListener('loadedmetadata', pintaOSD);

function msgPlayer(h){ const m = document.getElementById('pmsg'); m.innerHTML = h; m.classList.toggle('on', !!h); }

function reproduceCanal(it, dePaso){
  if (!it) return;
  if (!dePaso) S.probados = new Set();          // 2.5: canales de reserva ya probados en esta ronda (para no ir y volver sin fin)
  S.probados.add(it.id);
  S.jugando = it; S.intento = 0; guarda('ult_canal_' + claveSec(), it.id);
  fondoPlayer(it);
  msgPlayer(`<div><div class="sp"></div>${t('conectandoCanal')}</div>`);
  intenta(it, urlCanal(LISTA, it));
  marcaZonas(); muestraOSD(); guiaDe(it, true);
}
function intenta(it, url){
  motor(url, () => {
    if (S.jugando !== it) return;
    S.intento++;
    if (S.intento === 1 && S.tipo === 'live' && LISTA && LISTA.x && !window.IOS) {        // Xtream: prueba el otro formato (.ts <-> .m3u8)
      if (/\.m3u8(\?|$)/i.test(url)) return intenta(it, url.replace(/\.m3u8(\?|$)/i, '.ts$1'));
      if (/\.ts(\?|$)/i.test(url)) return intenta(it, url.replace(/\.ts(\?|$)/i, '.m3u8$1'));
    }
    const res = S.tipo === 'live' ? buscaReserva(it) : null;
    if (res) { msgPlayer(`<div><div class="sp"></div>${t('probandoBackup')}</div>`); aviso(t('probandoBackup')); reproduceCanal(res, true);
      const j = S.items.findIndex(x => x.id === res.id); if (j >= 0) { S.it = j; marcaZonas(); } return; }
    msgPlayer(`<div>${t('noReproduce')}<br><small style="color:var(--mut)">${esc(it.n)}</small></div>`);
  });
}
/* canal de reserva: "X (backup)" o, si el que falla es el backup, el original */
function buscaReserva(it){
  const base = it.n.replace(/\s*\((backup|reserva|bk)\)\s*$/i, '').trim().toLowerCase(), d = LISTA[S.tipo].items;
  const ya = S.probados || new Set(); if (ya.size >= 4) return null;      // como mucho 3 reservas y se para
  return d.find(x => x !== it && !ya.has(x.id) && x.g === it.g && x.n.replace(/\s*\((backup|reserva|bk)\)\s*$/i, '').trim().toLowerCase() === base) || null;
}
const AJ = ['', 'a-fill', 'a-cover', 'a-43'], AJN = ['ajusteOriginal', 'ajusteLlenar', 'ajusteRecortar', 'ajuste43'];
function ponAjuste(i){ if (NATP) NATP.ajuste({ modo: [0, 1, 2, 1][i] || 0 }); const b = document.getElementById('pbox'); AJ.forEach(c => c && b.classList.remove(c)); if (AJ[i]) b.classList.add(AJ[i]); guarda('ajuste', i);
  document.querySelector('#bAjuste span').textContent = t(AJN[i]); }
ponAjuste(lee('ajuste', 0));
document.getElementById('bAjuste').onclick = () => ponAjuste((lee('ajuste', 0) + 1) % AJ.length);

let tOSD;
function muestraOSD(){ ['osd', 'pbar'].forEach(id => document.getElementById(id).classList.remove('oculto')); clearTimeout(tOSD);
  tOSD = setTimeout(() => { if (document.body.classList.contains('full')) ['osd', 'pbar'].forEach(id => document.getElementById(id).classList.add('oculto')); }, 5000); }
async function pintaOSD(){
  const it = S.jugando, o = document.getElementById('osd'); if (!it) return;
  const g = S.tipo === 'live' ? (await guiaCorta(LISTA, it))[0] : null, ahora = Date.now();
  const res = vid.videoWidth ? vid.videoWidth + ' x ' + vid.videoHeight : '';
  const hm = ms => new Date(ms).toLocaleTimeString('es-ES', { hour:'2-digit', minute:'2-digit' });
  o.innerHTML = `<span class="lo">${logoHTML(it.l, it.n)}</span><div class="mid"><b>${esc(it.n)}</b>
    ${g ? `<div class="prog"><i style="width:${Math.max(0, Math.min(100, (ahora - g.ini) / (g.fin - g.ini) * 100))}%"></i></div>
    <div class="lin"><span>${hm(g.ini)}</span><span>${esc(g.tit)}</span><span>${hm(g.fin)}</span></div>` : ''}</div>
    ${S.tipo === 'radio' ? `<small style="text-align:center;color:var(--mut);font-size:calc(var(--u)*var(--ft)*.95)">${esc([it.est, nombrePais(it.g, it.pais)].filter(Boolean).join(' · '))}</small>` : ''}</div>
    <div class="der">Nº ${it.num || ''}<small>${S.tipo === 'radio' ? esc((it.codec || '') + (it.br ? ' · ' + it.br + ' kbps' : '')) : res}</small></div>`;
}
setInterval(() => { if (S.jugando && document.getElementById('sec').classList.contains('on')) pintaOSD(); }, 30000);

/* ---------- guía ---------- */
let tGuia, guiaId;
function guiaDe(it, ya){
  clearTimeout(tGuia); const g = document.getElementById('guia');
  if (!it) { g.innerHTML = ''; return; }
  guiaId = it.id;
  if (S.tipo === 'radio') { tGuia = setTimeout(() => { if (guiaId === it.id) g.innerHTML = fichaRadio(it); }, ya ? 0 : 250); return; }
  tGuia = setTimeout(async () => {
    const v = await guiaCorta(LISTA, it); if (guiaId !== it.id) return;
    if (!v.length) { g.innerHTML = `<div class="sinGuia">${LISTA.x ? t('sinGuia') : ''}</div>`; return; }
    const hm = ms => new Date(ms).toLocaleTimeString('es-ES', { hour:'2-digit', minute:'2-digit' }), ahora = Date.now();
    g.innerHTML = v.slice(0, 5).map(e => { const vivo = e.ini <= ahora && ahora < e.fin, p = vivo ? (ahora - e.ini) / (e.fin - e.ini) * 100 : 0;
      return `<div class="ge${vivo ? ' ahora' : ''}"><b>${vivo ? IC.play : IC.reloj}<span>${esc(e.tit)}</span></b>${e.des ? `<p>${esc(e.des)}</p>` : ''}
        <div class="lin"><span>${hm(e.ini)}</span><div class="prog"><i style="width:${p}%"></i></div><span>${hm(e.fin)}</span></div></div>`; }).join('');
  }, ya ? 0 : 450);
}

/* ---------- acciones ---------- */
function okItem(){
  const it = S.items[S.it]; if (!it) return;
  if (S.jugando && S.jugando.id === it.id) return pantallaCompleta(true);
  reproduceCanal(it);
}
function pantallaCompleta(si){
  document.body.classList.toggle('full', si);
  if (NATP) NATP.pantalla({ completa: !!si });          // móvil: gira a horizontal y oculta las barras
  document.getElementById('bFull').innerHTML = si ? IC.salirFull : IC.full;
  muestraOSD(); if (!si) marcaZonas();
}
document.getElementById('bFull').addEventListener('click', e => { e.stopPropagation(); pantallaCompleta(!document.body.classList.contains('full')); });
function salSeccion(){ if (PF.abierta) cierraFicha(); if (SF.abierta) cierraSerie(); pantallaCompleta(false); paraVideo(); S.jugando = null; fondoPlayer(null); msgPlayer(''); S.busqueda = '';
  document.getElementById('osd').classList.add('oculto'); muestra('home', false); pila = []; pintaPortada(); }
function favActual(){
  const it = S.jugando || S.items[S.it]; if (!it) return;
  aviso(t((S.tipo === 'radio' ? radioCambiaFav(it) : cambiaFav(LISTA, S.tipo, it.id)) ? 'favSi' : 'favNo'));
  const c = S.cats[S.cat]; montaCarpetas(); S.cat = Math.min(S.cat, S.cats.length - 1);
  S.cats[0].total = S.tipo === 'radio' ? radioFavs().length : favs(LISTA, S.tipo).length; if (c.id === '__fav') eligeCat(0); else { vCats.marca(); vItems.marca(); }
  S.cat = Math.max(0, S.cats.findIndex(x => x.id === c.id)); vCats.marca(undefined, S.cat); marcaGrid(); if (c.id === '__tend') pintaTend();
}
function rail(r){
  switch (r) {
    case 'home': salSeccion(); break;
    case 'full': if (S.jugando) pantallaCompleta(true); break;
    case 'fav': favActual(); break;
    case 'buscar': document.getElementById('qBuscar').placeholder = t(S.tipo === 'radio' ? 'buscarPhR' : S.tipo === 'movie' ? 'buscarPhP' : S.tipo === 'series' ? 'buscarPhS' : 'buscarPh'); document.getElementById('qBuscar').value = S.busqueda; abreVentana('vBuscar');
      setTimeout(() => document.getElementById('qBuscar').focus(), 50); break;
    case 'listas': if ((LIC.lists || []).length > 1) { salSeccion(); accion('listas'); } else aviso(t('cambiarLista') + ': 1'); break;
    case 'info': abreInfo(); break;
    case 'salir': abreVentana('vSalir'); break;
  }
}
document.getElementById('rail').addEventListener('click', e => { const b = e.target.closest('.rb'); if (b) rail(b.dataset.r); });
document.getElementById('pbox').addEventListener('dblclick', e => { if (!e.target.closest('.pbtn,.vbar') && (!PF.abierta || PF.activa) && (!SF.abierta || SF.activa)) pantallaCompleta(!document.body.classList.contains('full')); });
document.getElementById('pbox').addEventListener('click', e => { if (e.target.closest('.pbtn,.vbar')) return;
  if (SF.abierta) { if (!SF.activa) accionSerie('full'); else if (document.body.classList.contains('full')) muestraVbar(); else pantallaCompleta(true); return; }
  if (PF.abierta) { if (!PF.activa) reproducePeli(0); else if (document.body.classList.contains('full')) muestraVbar(); else pantallaCompleta(true); return; }
  if (document.body.classList.contains('full')) muestraOSD(); else if (S.jugando) pantallaCompleta(true); });
document.getElementById('qBuscar').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); accion('buscarYa'); } e.stopPropagation(); });

async function buscarYa(){
  S.busqueda = document.getElementById('qBuscar').value.trim(); cierraVentana();
  if (S.tipo === 'radio' && S.busqueda) { try { aviso(t('buscando')); await radioBusca(S.busqueda); } catch (e) { aviso(t('errRadio')); return; } }
  montaCarpetas(); let i = S.cats.findIndex(c => c.id === (S.busqueda ? '__bus' : '__all')); if (i < 0) i = 0;
  S.zona = 'items'; eligeCat(i); marcaZonas();
}

/* ---------- número de canal con el mando ---------- */
let numBuf = '', tNum;
function teclaNumero(d){
  numBuf = (numBuf + d).slice(-4); const n = document.getElementById('numero'); n.textContent = numBuf; n.classList.add('on');
  clearTimeout(tNum); tNum = setTimeout(() => { n.classList.remove('on');
    const fuera = typeof gruposBloqueados === 'function' ? gruposBloqueados() : new Set();
    const it = (S.tipo === 'live' ? LISTA.live.items : S.items).find(x => String(x.num) === numBuf && !fuera.has(x.g)); numBuf = '';
    if (it) { reproduceCanal(it); const i = S.items.findIndex(x => x.id === it.id); if (i >= 0) { S.it = i; marcaZonas(); } } }, 1500);
}

/* ---------- mando dentro de la sección ---------- */
function teclaSeccion(e){
  if (!document.getElementById('sec').classList.contains('on') || document.querySelector('.velo.on')) return false;
  if (document.getElementById('scarga').classList.contains('on')) return false;      // botones de error: navegación normal
  const rp = teclaPelis(e); if (rp !== undefined) return rp;
  const k = e.key, c = e.keyCode, atrasK = k === 'Escape' || k === 'Backspace' || k === 'GoBack' || c === 10009 || c === 461 || c === 4;
  const full = document.body.classList.contains('full');
  if (/^[0-9]$/.test(k)) { teclaNumero(k); e.preventDefault(); return true; }
  if (full) {
    if (atrasK) pantallaCompleta(false);
    else if (k === 'ArrowUp' || k === 'ArrowDown' || k === 'ChannelUp' || k === 'ChannelDown' || c === 166 || c === 167) {
      const d = (k === 'ArrowUp' || k === 'ChannelUp' || c === 166) ? -1 : 1, n = S.items.length;
      if (n) { const cur = S.items.findIndex(x => S.jugando && x.id === S.jugando.id); S.it = ((cur < 0 ? S.it : cur) + d + n) % n; reproduceCanal(S.items[S.it]); }
    }
    else if (k === 'ArrowLeft' || k === 'ArrowRight') { vid.volume = Math.max(0, Math.min(1, vid.volume + (k === 'ArrowRight' ? .1 : -.1))); document.getElementById('bVol').value = vid.volume; guarda('vol', vid.volume); muestraOSD(); }
    else if (k === 'Enter') muestraOSD();
    else return false;
    e.preventDefault(); return true;
  }
  const z = S.zona;
  if (atrasK) { if (z === 'items') S.zona = 'cats'; else salSeccion(); marcaZonas(); e.preventDefault(); return true; }
  const n = { rail: 7, cats: S.cats.length, items: S.items.length }[z];
  const salto = k === 'PageDown' || k === 'PageUp' ? 10 : 1;
  if (k === 'ArrowUp' || k === 'ArrowDown' || k === 'PageUp' || k === 'PageDown') {
    const d = (k === 'ArrowUp' || k === 'PageUp' ? -1 : 1) * salto;
    if (z === 'rail') S.rail = Math.max(0, Math.min(n - 1, S.rail + d));
    else if (z === 'cats') { eligeCat(Math.max(0, Math.min(n - 1, S.cat + d))); }
    else { S.it = Math.max(0, Math.min(n - 1, S.it + d)); guiaDe(S.items[S.it]); }
    marcaZonas();
  }
  else if (k === 'ArrowLeft') { S.zona = z === 'items' ? 'cats' : 'rail'; marcaZonas(); }
  else if (k === 'ArrowRight') { if (z === 'rail') S.zona = 'cats'; else if (z === 'cats' && S.items.length) S.zona = 'items'; marcaZonas(); }
  else if (k === 'Enter') {
    if (z === 'rail') rail(document.querySelectorAll('#rail .rb')[S.rail].dataset.r);
    else if (z === 'cats') { if (S.items.length) { S.zona = 'items'; marcaZonas(); } }
    else okItem();
  }
  else return false;
  e.preventDefault(); return true;
}

reloj();

/* =================================================================== RADIOS en la sección */
Object.assign(TXT.es, { noIncluida:'No incluidas en esta lista', noIncluidaAviso:'Tu lista actual no trae {s}', radios:'Radios', cargandoR:'Cargando emisoras…', sinFavsR:'Aún no tienes radios favoritas. Pulsa el corazón con una emisora sonando.',
  errRadio:'No se puede conectar con el directorio de radios. Revisa la conexión a internet.', buscando:'Buscando…', buscarPhR:'Nombre de la emisora…',
  rPais:'País', rIdioma:'Idioma', rGeneros:'Géneros', rCalidad:'Calidad', rWeb:'Web', rDirectorio:'Emisoras del directorio público Radio Browser' });
Object.assign(TXT.en, { noIncluida:'Not included in this list', noIncluidaAviso:'Your current list has no {s}', radios:'Radio', cargandoR:'Loading stations…', sinFavsR:'No favorite stations yet. Press the heart while a station is playing.',
  errRadio:'Cannot reach the radio directory. Check your internet connection.', buscando:'Searching…', buscarPhR:'Station name…',
  rPais:'Country', rIdioma:'Language', rGeneros:'Genres', rCalidad:'Quality', rWeb:'Website', rDirectorio:'Stations from the public Radio Browser directory' });

const claveSec = () => S.tipo === 'radio' ? 'radio' : LISTA.key + (S.tipo === 'live' ? '' : '_' + S.tipo);
const esFavX = id => S.tipo === 'radio' ? radioEsFav(id) : esFav(LISTA, S.tipo, id);
const ICRADIO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="10" r="2"/><path d="M12 12v9M8.5 13.5a5 5 0 1 1 7 0M5.6 16.4a9 9 0 1 1 12.8 0"/></svg>';

function fondoPlayer(it){
  const f = document.getElementById('pFondo'), b = document.getElementById('pbox');
  b.classList.toggle('radio', S.tipo === 'radio' && !!it);
  if (!it) { f.style.display = ''; f.innerHTML = `<img src="${esc(BRAND.icon)}" alt="">`; return; }
  if (S.tipo !== 'radio') { f.style.display = 'none'; return; }
  f.style.display = '';
  f.innerHTML = it.l ? `<img src="${esc(it.l)}" alt="" onerror="this.outerHTML=ICRADIO">` : ICRADIO;
}
async function abreRadios(){
  S.tipo = 'radio'; S.busqueda = '';
  document.getElementById('sTit').textContent = t('radios');
  pintaCabecera(); muestra('sec'); pintaTextos();
  if (!RADIO.paises) {
    const c = document.getElementById('scarga');
    c.innerHTML = `<div class="sp"></div><div>${t('cargandoR')}</div><small>${t('rDirectorio')}</small>`; c.classList.add('on');
    try { await radioPaises(); c.classList.remove('on'); }
    catch (e) { c.innerHTML = `<div style="font-size:calc(var(--u)*var(--ft)*2.2);font-weight:800">${t('errRadio')}</div>
      <div class="botones"><button class="btn pri f" data-go="sec:radio">${t('reintentar')}</button><button class="btn f" data-go="secVolver">${t('volver')}</button></div>`;
      enfocaPrimero(c); return; }
  }
  montaRadios();
  const ult = lee('ult_cat_radio', 'ES');
  let ci = S.cats.findIndex(c => c.id === ult); if (ci < 0) ci = S.cats.findIndex(c => c.id === 'ES'); if (ci < 0) ci = 1;
  S.zona = 'items'; eligeCat(ci); marcaZonas();
}
function montaRadios(){
  S.cats = [{ id:'__fav', n:t('favoritos'), total: radioFavs().length }];
  if (S.busqueda) S.cats.push({ id:'__bus', n:t('resultados') + ': ' + S.busqueda, total: RADIO.busq.length });
  (RADIO.paises || []).forEach(p => S.cats.push({ id:p.code, n:p.n, total: RADIO.cache[p.code] ? RADIO.cache[p.code].length : p.total }));
  vCats.pon(S.cats.length);
}
function radioItems(cat){
  if (cat.id === '__fav') return radioFavs();
  if (cat.id === '__bus') return RADIO.busq;
  if (RADIO.cache[cat.id]) return RADIO.cache[cat.id];
  cat.cargando = true;
  radioDePais(cat.id).then(v => {
    cat.cargando = false; cat.total = v.length; vCats.marca();
    if (S.tipo === 'radio' && S.cats[S.cat] === cat) { eligeCat(S.cat); marcaZonas(); }
  }).catch(() => { cat.cargando = false; aviso(t('errRadio')); });
  return [];
}
function fichaRadio(it){
  const fila = (k, v) => v ? `<div class="fila"><span>${t(k)}</span><b>${esc(v)}</b></div>` : '';
  return `<div class="ge ahora"><b>${IC.play}<span>${esc(it.n)}</span></b>
    <div style="display:flex;flex-direction:column">${fila('rPais', [it.est, nombrePais(it.g, it.pais)].filter(Boolean).join(' · '))}
    ${fila('rIdioma', String(it.lang || '').replace(/(^|,)\s*(\w)/g, (m, c, l) => (c ? ', ' : '') + l.toUpperCase()))}${fila('rGeneros', String(it.tags || '').split(',').slice(0, 6).join(', '))}
    ${fila('rCalidad', [it.codec, it.br ? it.br + ' kbps' : ''].filter(Boolean).join(' · '))}${fila('rWeb', String(it.web || '').replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''))}</div></div>
    <div class="sinGuia">${t('rDirectorio')}</div>`;
}
/* al reproducir una radio, avisa al directorio (cuenta escuchas) */
const _repOrig = reproduceCanal;
reproduceCanal = function(it, dePaso){ _repOrig(it, dePaso); if (S.tipo === 'radio' && it && it.uuid) radioClic(it); };
