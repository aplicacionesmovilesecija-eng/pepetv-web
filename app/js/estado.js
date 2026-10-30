/* ===================================================================
   2.2
   - TV en vivo: botones debajo del reproductor (bajar/subir volumen, pantalla completa, ajuste de imagen)
   - La barra del título se esconde sola a los 5 s también con el reproductor pequeño
   - Fuera de las barras laterales: pantalla completa, pausa y desde el principio (ya están en los botones del reproductor)
   - OJO en las carátulas: nada → VISTA (verde) → VIENDO (naranja) → VERÉ (rojo) → nada
     y botón ojo en la barra lateral para filtrar Películas/Series por ese estado
   =================================================================== */

/* ---------- TV en vivo: botones debajo del reproductor ---------- */
const ICL = {
  menos: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 12h5"/></svg>`,
  mas: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 12h5M18.5 9.5v5"/></svg>`
};
document.getElementById('guia').insertAdjacentHTML('beforebegin', `<div class="lbar" id="lbar">
  <button class="btn lbi" data-go="lv:menos" data-tip="Bajar volumen" aria-label="Bajar volumen">${ICL.menos}</button>
  <button class="btn lbi" data-go="lv:mas" data-tip="Subir volumen" aria-label="Subir volumen">${ICL.mas}</button>
  <button class="btn lbi" data-go="lv:full" data-tip="Pantalla completa" aria-label="Pantalla completa">${ICB.full}</button>
  <button class="btn lbi lbAj" data-go="lv:aj" data-tip="Imagen" aria-label="Ajuste de imagen">${ICB.aj}</button>
</div>`);
function volumen(d){ vid.volume = Math.max(0, Math.min(1, Math.round((vid.volume + d) * 20) / 20)); document.getElementById('bVol').value = vid.volume; guarda('vol', vid.volume); if (!(PF.activa || (typeof SF !== 'undefined' && SF.activa))) muestraOSD(); aviso('Volumen ' + Math.round(vid.volume * 100) + ' %'); }
function tipAjusteLive(){ document.querySelectorAll('.lbAj').forEach(x => { x.dataset.tip = nomAjuste(); x.setAttribute('aria-label', x.dataset.tip); }); }
tipAjusteLive();
document.getElementById('lbar').addEventListener('click', e => {
  const b = e.target.closest('[data-go]'); if (!b) return; e.stopPropagation();
  const a = b.dataset.go.split(':')[1];
  if (a === 'menos') volumen(-.1);
  else if (a === 'mas') volumen(.1);
  else if (a === 'full') { if (S.jugando) pantallaCompleta(true); }
  else if (a === 'aj') { ponAjuste((lee('ajuste', 0) + 1) % AJ.length); tipAjusteLive(); if (typeof muestraTip === 'function') muestraTip(b, 2.5); }
});

/* ---------- la barra del título (y la de abajo) se esconden a los 5 s aunque no esté en pantalla completa ---------- */
muestraOSD = function(){
  ['osd', 'pbar'].forEach(id => document.getElementById(id).classList.remove('oculto')); clearTimeout(tOSD);
  tOSD = setTimeout(() => ['osd', 'pbar'].forEach(id => document.getElementById(id).classList.add('oculto')), 5000);
};
document.getElementById('pbox').addEventListener('mousemove', () => { if (S.jugando && !(typeof PF !== 'undefined' && PF.activa) && !(typeof SF !== 'undefined' && SF.activa)) muestraOSD(); }, { passive: true });

/* ---------- fuera de las barras laterales: pantalla completa, pausa y desde el principio ---------- */
const _ajustaRailE = ajustaRail;
ajustaRail = function(){ _ajustaRailE(); const f = document.querySelector('#rail [data-r="full"]'); if (f) f.style.display = 'none'; };
if (typeof ORD_ORIG !== 'undefined' && ORD_ORIG.rail) ORD_ORIG.rail = ORD_ORIG.rail.filter(x => x !== 'full');
try { ajustaRail(); } catch (e) {}

/* ---------- los 4 accesos de arriba: el azul fuerte solo mientras el mando está encima ---------- */
document.getElementById('secs').addEventListener('focusout', e => { const b = e.target.closest && e.target.closest('.sb'); if (b) b.classList.remove('kf'); });
document.getElementById('secs').addEventListener('click', () => document.querySelectorAll('#secs .sb.kf').forEach(x => x.classList.remove('kf')), true);

/* ---------- OJO: estado de cada película o serie ---------- */
const EST = [null, { n: 'VISTA', c: 'v' }, { n: 'VIENDO', c: 'n' }, { n: 'VERÉ', c: 'r' }];
const EST_TIP = ['Marcar: Vista / Viendo / Veré', 'Vista (pulsa: Viendo)', 'Viendo (pulsa: Veré)', 'Veré (pulsa: quitar)'];
const ICOJO = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>`;
const claveEst = tipo => 'est_' + (tipo || S.tipo) + '_' + (LISTA ? LISTA.key : '');
const estadoDe = (id, tipo) => (lee(claveEst(tipo), {})[id] || 0);
function cambiaEstado(id, tipo){
  const k = claveEst(tipo), m = lee(k, {}), n = ((m[id] || 0) + 1) % 4;
  if (n) m[id] = n; else delete m[id]; guarda(k, m); return n;
}
const htmlEst = (id, tipo) => { const n = estadoDe(id, tipo), e = EST[n];
  return `<span class="pojo${n ? ' e' + e.c : ''}" data-tip="${EST_TIP[n]}">${ICOJO}</span>${e ? `<div class="pband e${e.c}">${e.n}</div>` : ''}`; };
/* en la cuadrícula */
const _htmlPosterE = htmlPoster;
htmlPoster = function(it, k, foco){ return _htmlPosterE(it, k, foco).replace('<div class="ptit">', htmlEst(it.id) + '<div class="ptit">'); };
document.getElementById('vGrid').addEventListener('click', e => {
  const o = e.target.closest('.pojo'); if (!o) return; e.stopPropagation();
  const p = o.closest('.pos'), it = S.items[+p.dataset.k]; if (!it) return;
  cambiaEstado(it.id); if (filtroEst()) refiltra(); else vGrid.pinta(true);
}, true);
/* en la ficha (carátula grande) */
function pintaEstFicha(){
  const serie = typeof SF !== 'undefined' && SF.abierta, it = serie ? SF.it : (PF.abierta ? PF.it : null); if (!it) return;
  const box = document.getElementById(serie ? 'sPos' : 'fPos'); if (!box) return;
  box.querySelectorAll('.pojo,.pband').forEach(x => x.remove());
  box.insertAdjacentHTML('beforeend', htmlEst(it.id, serie ? 'series' : 'movie'));
  document.querySelectorAll('.fbtns [data-go="pf:estado"]').forEach(b => { const n = estadoDe(it.id, serie ? 'series' : 'movie'); b.className = 'rb f bEst' + (n ? ' e' + EST[n].c : ''); b.dataset.tip = EST_TIP[n]; });
}
['fPos', 'sPos'].forEach(id => { const b = document.getElementById(id); if (b) b.addEventListener('click', e => {
  if (e.target.closest('.pojo')) { e.stopPropagation(); accionEstado(); }
  else if (e.target.closest('.pfav')) { e.stopPropagation(); if (id === 'sPos') accionSerie('fav'); else accionPeli('fav'); }      // 2.9: el corazón de la carátula grande
}, true); });
function accionEstado(){
  const serie = typeof SF !== 'undefined' && SF.abierta, it = serie ? SF.it : PF.it; if (!it) return;
  const n = cambiaEstado(it.id, serie ? 'series' : 'movie'); pintaEstFicha();
  aviso(n ? 'Marcada como ' + EST[n].n : 'Sin marcar');
}
/* botón ojo también en la barra de la ficha (para el mando) */
document.querySelectorAll('.fbtns').forEach(f => { const fav = f.querySelector('[data-go="pf:fav"]'); if (fav) fav.insertAdjacentHTML('afterend', `<button class="rb f bEst" data-go="pf:estado" data-tip="${EST_TIP[0]}">${ICOJO}</button>`); });
const _pintaFichaE = pintaFicha; pintaFicha = function(o){ _pintaFichaE(o); pintaEstFicha(); };
const _pintaSerieE = pintaSerie; pintaSerie = function(o){ _pintaSerieE(o); pintaEstFicha(); };
const _accionPeliE = accionPeli; accionPeli = function(a){ if (a === 'estado') return accionEstado(); return _accionPeliE(a); };
const _accionSerieE = accionSerie; accionSerie = function(a, x){ if (a === 'estado') return accionEstado(); return _accionSerieE(a, x); };

/* ---------- filtro por estado (botón ojo de la barra lateral, solo Películas y Series) ---------- */
const filtroEst = () => enGrid() ? (lee('festado_' + S.tipo, 0) || 0) : 0;
document.querySelector('#rail [data-r="fav"]').insertAdjacentHTML('afterend', `<button class="rb" data-r="ojo">${ICOJO}</button>`);
function pintaBotonFiltro(){
  const b = document.querySelector('#rail [data-r="ojo"]'); if (!b) return; const n = filtroEst();
  b.style.display = enGrid() ? '' : 'none'; b.classList.remove('ev', 'en', 'er'); if (n) b.classList.add('e' + EST[n].c);
  b.dataset.tip = n ? 'Viendo solo: ' + EST[n].n + ' (pulsa para cambiar)' : 'Filtrar por Vista / Viendo / Veré';
}
function refiltra(){ const c = S.cats[S.cat]; if (c) eligeCat(S.cat); pintaBotonFiltro(); }
const _ajustaRailE2 = ajustaRail; ajustaRail = function(){ _ajustaRailE2(); pintaBotonFiltro(); };
const _railE = rail;
rail = function(r){
  if (r === 'ojo') { if (!enGrid()) return; const n = (filtroEst() + 1) % 4; guarda('festado_' + S.tipo, n); refiltra();
    aviso(n ? 'Mostrando solo: ' + EST[n].n : 'Mostrando todo'); return; }
  return _railE(r);
};
const _itemsDeE = itemsDe;
itemsDe = function(cat){
  const r = _itemsDeE(cat), n = filtroEst(); if (!n || !Array.isArray(r)) return r;
  const m = lee(claveEst(), {}); return r.filter(it => m[it.id] === n);
};
if (typeof ORD_DEFECTO !== 'undefined' && ORD_DEFECTO.rail && !ORD_DEFECTO.rail.includes('ojo')) ORD_DEFECTO.rail.splice(ORD_DEFECTO.rail.indexOf('fav') + 1, 0, 'ojo');
if (typeof ORD_ORIG !== 'undefined' && ORD_ORIG.rail && !ORD_ORIG.rail.includes('ojo')) { const i = ORD_ORIG.rail.indexOf('fav'); ORD_ORIG.rail.splice(i >= 0 ? i + 1 : ORD_ORIG.rail.length, 0, 'ojo'); }
if (typeof RAIL_N !== 'undefined') RAIL_N.ojo = 'Filtrar Vista / Viendo / Veré';
if (typeof TIP_N !== 'undefined') TIP_N['r:ojo'] = 'Filtrar Vista / Viendo / Veré';
pintaBotonFiltro();

/* ---------- 2.2: «Enviar mi lista» a la vista en la portada ---------- */
const _accionEnv = accion;
accion = function(go){ if (go === 'envio') { if (typeof abreEnvio === 'function') abreEnvio(); return; } return _accionEnv(go); };

/* ---------- 2.3: corazón y ojo también en las filas de Tendencias / Netflix… ---------- */
document.getElementById('tend').addEventListener('click', e => {
  const fav = e.target.closest('.pfav'), ojo = e.target.closest('.pojo'); if (!fav && !ojo) return;
  const p = e.target.closest('.tpos'); if (!p) return; e.stopPropagation();
  const it = TEND.filas[+p.dataset.f].its[+p.dataset.c].it; if (!it) return;
  if (fav) { aviso(t(cambiaFav(LISTA, S.tipo, it.id) ? 'favSi' : 'favNo')); const c = S.cats.find(x => x.id === '__fav'); if (c) { c.total = favs(LISTA, S.tipo).length; vCats.marca(); } }
  else { const n = cambiaEstado(it.id); aviso(n ? 'Marcada como ' + EST[n].n : 'Sin marcar'); }
  const sc = [...document.querySelectorAll('#tend .tcar')].map(x => x.scrollLeft), st = document.getElementById('tend').scrollTop;
  pintaTend(); requestAnimationFrame(() => { document.querySelectorAll('#tend .tcar').forEach((x, i) => x.scrollLeft = sc[i] || 0); document.getElementById('tend').scrollTop = st; });
}, true);

/* ---------- 2.3: RADIOS — bandera de cada país, y ocultar / bloquear países (Ajustes → Ordenar → Carpetas → Radios) ---------- */
const bandera = code => /^[A-Z]{2}$/.test(code) ? `<img class="flag" src="https://flagcdn.com/w80/${code.toLowerCase()}.png" alt="" loading="lazy" onerror="this.remove()">` : '';
const _vCatsHtmlE = vCats.html;
vCats.html = i => { const c = S.cats[i], h = _vCatsHtmlE(i);   // 2.4: bandera grande a la izquierda; nombre y nº de emisoras debajo
  return S.tipo === 'radio' && c && /^[A-Z]{2}$/.test(c.id) ? '<span class="rflag">' + bandera(c.id) + '</span>' + h : h; };
vCats.html.cls = _vCatsHtmlE.cls || 'cat';          // 2.4: sin esto las carpetas perdían su estilo (y no se veía el candado)
const radOcultos = () => new Set(lee('coc_radio', [])), radBloq = () => new Set(lee('clock_radio', []));
const _montaRadiosE = montaRadios;
montaRadios = function(){
  _montaRadiosE();
  const oc = radOcultos(), lk = radBloq();
  S.cats = S.cats.filter(c => !(c.id.length === 2 && oc.has(c.id)));
  S.cats.forEach(c => { c.lock = pinActivo() && lk.has(c.id); });
  vCats.pon(S.cats.length);
};
const _itemsDeR = itemsDe;
itemsDe = function(cat){
  if (S.tipo === 'radio' && cat) { cat.bloq = !!(cat.lock && !desbloq.has(cat.id)); if (cat.bloq) return []; }
  return _itemsDeR(cat);
};
/* pestaña Radios en Ordenar → Carpetas */
const _panelCarpetasE = panelCarpetas;
panelCarpetas = function(){
  if (carTipo !== 'radio') return _panelCarpetasE().replace('</div>', boton('carT:radio', t('radios'), '') + '</div>');
  let h = `<div class="ajBtns tabs">${['live', 'movie', 'series', 'radio'].map(tp => boton('carT:' + tp, t({ live:'tv', movie:'peliculas', series:'series', radio:'radios' }[tp]), carTipo === tp ? 'sel' : '')).join('')}</div>`;
  const ps = (typeof RADIO !== 'undefined' && RADIO.paises) || [];
  if (!ps.length) return h + `<p class="ajNota">Entra una vez en Radios para que aparezca la lista de países.</p>`;
  const oc = radOcultos(), lk = radBloq();
  h += `<h3>Países</h3><p class="ajNota"><b>Bloquear</b>: se ve con candado y pide el PIN · <b>Ocultar</b>: el país desaparece de Radios.${pinActivo() ? '' : ' Para bloquear hace falta crear antes un PIN en Control parental.'}</p>`;
  const chk = (go, id, on, txt) => `<button class="btn f chk${on ? ' on' : ''}" data-go="aja:${go}:${id}"><i>${on ? '✓' : ''}</i>${txt}</button>`;
  return h + ps.map(p => `<div class="ajc${oc.has(p.code) ? ' oculta' : ''}"><span>${bandera(p.code)}${esc(p.n)} <small>(${p.total})</small></span>${chk('radLock', p.code, lk.has(p.code), 'Bloquear')}${chk('radVer', p.code, oc.has(p.code), 'Ocultar')}</div>`).join('');
};
const _accionRad = accion;
accion = function(go){
  const p = go.split(':');
  if (p[0] === 'aja' && (p[1] === 'radVer' || p[1] === 'radLock')) {
    (async () => {
      if (p[1] === 'radLock' && !pinActivo()) { aviso('Primero crea un PIN en Control parental'); return; }
      if (!(await pinAjustesOk())) return;
      const k = p[1] === 'radVer' ? 'coc_radio' : 'clock_radio', s = new Set(lee(k, [])); s.has(p[2]) ? s.delete(p[2]) : s.add(p[2]); guarda(k, [...s]);
      pintaPanelAj(go);
    })(); return;
  }
  return _accionRad(go);
};

/* ---------- 2.8: mando en TV en vivo y Radios: desde los canales, → lleva a los botones de debajo del reproductor ---------- */
let LBI = 0;
function lbarBotones(){ return [...document.querySelectorAll('#lbar .lbi')].filter(b => b.offsetParent !== null); }
function lbarFoco(i){ const l = lbarBotones(); if (!l.length) return false; LBI = Math.max(0, Math.min(l.length - 1, i)); enfoca(l[LBI]);
  if (typeof muestraTip === 'function') setTimeout(() => muestraTip(l[LBI], 2.5), 30); return true; }
function lbarSal(){ S.zona = 'items'; const a = document.activeElement; if (a && a.closest && a.closest('#lbar')) { a.blur(); a.classList.remove('kf'); } marcaZonas(); }
const _teclaSeccionL = teclaSeccion;
teclaSeccion = function(e){
  const sec = document.getElementById('sec');
  if (!sec.classList.contains('on') || document.querySelector('.velo.on') || document.body.classList.contains('full')
      || (typeof PF !== 'undefined' && PF.abierta) || (typeof SF !== 'undefined' && SF.abierta) || !(S.tipo === 'live' || S.tipo === 'radio')
      || document.getElementById('scarga').classList.contains('on')) return _teclaSeccionL(e);
  const k = e.key, c = e.keyCode, atrasK = k === 'Escape' || k === 'Backspace' || k === 'GoBack' || c === 10009 || c === 461 || c === 4;
  if (S.zona === 'lbar') {
    e.preventDefault();
    if (k === 'ArrowLeft') { if (LBI > 0) lbarFoco(LBI - 1); else lbarSal(); }
    else if (k === 'ArrowRight') lbarFoco(LBI + 1);
    else if (k === 'Enter' || k === ' ') { const b = lbarBotones()[LBI]; if (b) b.click(); }
    else if (atrasK || k === 'ArrowUp' || k === 'ArrowDown') lbarSal();
    return true;
  }
  if (S.zona === 'items' && k === 'ArrowRight' && S.items.length && lbarBotones().length) {
    e.preventDefault(); S.zona = 'lbar'; marcaZonas(); lbarFoco(0); return true;
  }
  return _teclaSeccionL(e);
};

/* ---------- 2.9: TENDENCIAS — el filtro del ojo también aquí, y al volver de la ficha se ve lo marcado ---------- */
const _pintaTendE = pintaTend;
pintaTend = async function(){
  if (TEND.key !== LISTA.key) { TEND.filasTodas = null; await _pintaTendE(); if (TEND.key !== LISTA.key) return; }
  if (TEND.filas !== TEND._vista) TEND.filasTodas = TEND.filas;                 // filas recién cargadas
  const todas = TEND.filasTodas || TEND.filas, n = filtroEst(), m = n ? lee(claveEst(), {}) : null;
  TEND.filas = TEND._vista = n ? todas.map(f => Object.assign({}, f, { its: f.its.filter(x => x.it && m[x.it.id] === n) })).filter(f => f.its.length) : todas;
  if (n && !TEND.filas.length) { document.getElementById('tend').innerHTML = `<div class="vacio">No hay ninguna marcada como ${EST[n].n} en Tendencias</div>`; return; }
  return _pintaTendE();
};
function repintaTend(){
  const c = S.cats[S.cat]; if (!c || c.id !== '__tend' || !document.getElementById('tend')) return;
  const sc = [...document.querySelectorAll('#tend .tcar')].map(x => x.scrollLeft), st = document.getElementById('tend').scrollTop;
  pintaTend().then(() => requestAnimationFrame(() => { document.querySelectorAll('#tend .tcar').forEach((x, i) => x.scrollLeft = sc[i] || 0); document.getElementById('tend').scrollTop = st; }));
}
const _cierraFichaT = cierraFicha; cierraFicha = function(){ const r = _cierraFichaT.apply(this, arguments); repintaTend(); return r; };
const _cierraSerieT = cierraSerie; cierraSerie = function(){ const r = _cierraSerieT.apply(this, arguments); repintaTend(); return r; };
