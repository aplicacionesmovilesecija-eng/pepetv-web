/* ===================================================================
   2.1: BARRA DE ICONOS DEL REPRODUCTOR (Películas y Series, mismo sitio)
   Mientras se ve algo, la columna de la derecha muestra solo iconos (con su nombre en el globito):
   anterior · −10 s · play/pausa · +10 s · siguiente · desde el principio · pantalla completa · ajuste de imagen
   =================================================================== */
const ICB = {
  ant: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 5v14L9 12zM4.5 5H7v14H4.5z"/></svg>`,
  full: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>`,
  aj: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M8 9H6v2M16 15h2v-2"/></svg>`
};
const AJ_NOM = ['Original', 'Llenar', 'Recortar', '4:3', '16:9'];
function nomAjuste(){ const i = lee('ajuste', 0); return 'Imagen: ' + (typeof AJN !== 'undefined' && AJN[i] ? t(AJN[i]) : (AJ_NOM[i] || 'Original')) + ' (pulsa para cambiar)'; }
function barraRep(serie){
  const b = (go, ico, tip, cls) => `<button class="btn${cls === 'nada' ? '' : ' f'} rbi${cls ? ' ' + cls : ''}" data-go="${go}" data-tip="${tip}" aria-label="${tip}"${cls === 'nada' ? ' disabled' : ''}>${ico}</button>`;
  const sig = serie && SF.ep && siguienteDe(SF.ep), ant = serie && SF.ep && anteriorDe(SF.ep);
  return `<div class="rbar${serie ? ' r5' : ''}">`
    + (serie ? b('pf:ant', ICB.ant, 'Episodio anterior', ant ? '' : 'nada') : '')
    + b('pf:atr', ICP.atr10, 'Atrás 10 segundos')
    + b('pf:pausa', vid.paused ? ICP.play : ICP.pausa, 'Pausa / seguir', 'rbPausa')
    + b('pf:ade', ICP.ade10, 'Adelante 10 segundos')
    + (serie ? b('pf:sig', ICS.sig, 'Siguiente episodio', sig ? '' : 'nada') : '')
    + b('pf:reinicio', ICP.reinicio, 'Desde el principio')
    + b('pf:full', ICB.full, 'Pantalla completa')
    + b('pf:ajuste', ICB.aj, nomAjuste(), 'rbAj')
    + b('pf:volm', ICL.menos, 'Bajar volumen')
    + b('pf:volp', ICL.mas, 'Subir volumen')
    + `</div>`;
}
function anteriorDe(ep){
  const o = SF.info, L = o.eps[ep.t] || [], i = L.findIndex(x => x.id === ep.id);
  if (i > 0) return L[i - 1];
  const ti = o.temps.indexOf(ep.t); if (ti > 0) { const P = o.eps[o.temps[ti - 1]] || []; return P[P.length - 1] || null; }
  return null;
}
['play', 'pause'].forEach(ev => vid.addEventListener(ev, () => document.querySelectorAll('.rbPausa').forEach(x => x.innerHTML = vid.paused ? ICP.play : ICP.pausa)));

/* acciones nuevas: episodio anterior y ajuste de imagen */
const _accionSerieBarra = accionSerie;
accionSerie = function(a, x){
  if (a === 'ant') { const p = SF.ep && anteriorDe(SF.ep); if (p) { guardaPosSerie(true); reproduceEp(p, 0); } return; }
  return _accionSerieBarra(a, x);
};
const _accionPeliBarra = accionPeli;
accionPeli = function(a){
  if (a === 'ajuste') { ponAjuste((lee('ajuste', 0) + 1) % AJ.length); document.querySelectorAll('.rbAj').forEach(x => { x.dataset.tip = nomAjuste(); x.setAttribute('aria-label', x.dataset.tip); });
    const e = document.activeElement; if (e && e.classList.contains('rbAj') && typeof muestraTip === 'function') muestraTip(e, 2.5); return; }
  if (a === 'ant') return;
  if (a === 'volm' || a === 'volp') { volumen(a === 'volp' ? .1 : -.1); muestraVbar(); return; }   // 2.5
  return _accionPeliBarra(a);
};
/* la barra sustituye a los botones de texto mientras se ve algo */
const _pintaAccSerieBarra = pintaAccSerie;
pintaAccSerie = function(){ _pintaAccSerieBarra(); if (SF.activa) document.getElementById('sAcc').innerHTML = barraRep(true); };
const _pintaAccBarra = pintaAcc;
pintaAcc = function(){ _pintaAccBarra(); if (PF.activa) document.getElementById('fAcc').innerHTML = barraRep(false); pintaBanners(); };

/* mando: los 4 accesos de arriba (TV, Radios, Películas, Series) y los botones de encima del vídeo
   también se alcanzan con las flechas dentro de una ficha */
/* 2.3: solo dentro de una ficha (si no, al entrar en una sección el foco se iba a «TV en vivo» y se quedaba azul) */
document.querySelectorAll('#secs .sb').forEach(b => { b.dataset.go = 'secb:' + b.dataset.s; });
function sbEnFicha(){ const en = (typeof PF !== 'undefined' && PF.abierta) || (typeof SF !== 'undefined' && SF.abierta);
  document.querySelectorAll('#secs .sb').forEach(b => { b.classList.toggle('f', !!en); if (!en) b.classList.remove('kf'); });
  const a = document.activeElement; if (!en && a && a.closest && a.closest('#secs')) a.blur(); }
new MutationObserver(sbEnFicha).observe(document.getElementById('sec'), { attributes: true, attributeFilter: ['class'] });
['ficha', 'serie'].forEach(id => { const x = document.getElementById(id); if (x) new MutationObserver(sbEnFicha).observe(x, { attributes: true, attributeFilter: ['hidden'] }); });
document.getElementById('secs').addEventListener('mousedown', e => e.preventDefault());   // con el ratón no se queda «enfocado»
sbEnFicha();
document.querySelectorAll('#pbar .pbtn').forEach(b => { if (b.tagName === 'BUTTON') b.classList.add('f'); });
const _accionBarra = accion;
accion = function(go){
  if (go.startsWith('secb:')) { cambiaSeccion(go.slice(5)); return; }
  if (go.startsWith('ban:')) { const b = ((LIC && LIC.banners) || [])[+go.slice(4)]; if (b && b.link) abreFuera(b.link); return; }
  return _accionBarra(go);
};

/* 2.1: BANNERS de promoción (se crean en el panel → Banners). Salen en Películas, debajo de los botones de la derecha */
function pintaBanners(){
  const c = document.getElementById('fBan'); if (!c) return;
  const l = ((typeof LIC !== 'undefined' && LIC && LIC.banners) || []).filter(b => b && b.img);
  c.hidden = !l.length;
  c.innerHTML = l.map((b, i) => b.link
    ? `<button class="banner f" data-go="ban:${i}" data-tip="${esc(b.txt || 'Abrir')}"><img src="${esc(b.img)}" alt="${esc(b.txt || '')}" loading="lazy"></button>`
    : `<div class="banner"><img src="${esc(b.img)}" alt="${esc(b.txt || '')}" loading="lazy"></div>`).join('');
}
