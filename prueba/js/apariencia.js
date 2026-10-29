/* ===================================================================
   APARIENCIA (Películas y Series) y TAMAÑO DEL TEXTO (Aa, en todas)
   Se guarda en el aparato.
   =================================================================== */
Object.assign(TXT.es, { apariencia:'Apariencia', porFila:'Carátulas por fila', vista:'Vista', vGrid:'Cuadrícula', vLista:'Lista',
  vListaInfo:'En lista salen 2 por fila: carátula a la izquierda e información a la derecha.', tamTexto:'Tamaño del texto',
  ejemplo:'Así se verán los textos de la aplicación', listo:'Listo', porDefecto:'Por defecto', anadida:'Añadida el {f}' });
Object.assign(TXT.en, { apariencia:'Appearance', porFila:'Posters per row', vista:'View', vGrid:'Grid', vLista:'List',
  vListaInfo:'List view shows 2 per row: poster on the left, information on the right.', tamTexto:'Text size',
  ejemplo:'This is how texts will look', listo:'Done', porDefecto:'Default', anadida:'Added {f}' });

const ICA = {
  apar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><rect x="3" y="3" width="7.5" height="10" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="10" rx="1.5"/><path d="M3 17.5h18M3 21h11" stroke-linecap="round"/></svg>',
  texto:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.2 4h2.4l5.6 15h-2.6l-1.4-4H5.6l-1.4 4H1.6zM6.3 13h4.2L8.4 6.8zM19 9.5c2.4 0 3.6 1.2 3.6 3.6V19h-2.1v-1.1c-.6.9-1.5 1.3-2.7 1.3-1.8 0-2.9-1-2.9-2.5 0-1.7 1.3-2.5 3.6-2.5h1.9v-.3c0-1.1-.6-1.6-1.8-1.6-.9 0-1.7.3-2.4.8l-.8-1.6c.9-.7 2.2-1 3.6-1zm-.6 5.6c-1.2 0-1.6.4-1.6 1 0 .6.5 1 1.3 1 .9 0 1.7-.5 1.9-1.3v-.7z"/></svg>',
  menos:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M5 12h14"/></svg>',
  mas:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M5 12h14M12 5v14"/></svg>'
};

/* botones nuevos en el carril (antes de "listas") */
document.querySelector('#rail [data-r="listas"]').insertAdjacentHTML('beforebegin',
  `<button class="rb" data-r="apar">${ICA.apar}</button><button class="rb" data-r="texto">${ICA.texto}</button>`);

document.body.insertAdjacentHTML('beforeend', `
<div class="velo" id="vApar"><div class="ven">
  <h3 data-t="apariencia"></h3>
  <div class="ajf"><span data-t="porFila"></span>
    <div class="paso"><button class="btn f" data-go="ap:cols:-1">${ICA.menos}</button><input type="range" id="apCols" min="2" max="8" step="1"><b id="apColsV"></b><button class="btn f" data-go="ap:cols:1">${ICA.mas}</button></div></div>
  <div class="ajf"><span data-t="vista"></span>
    <div class="seg"><button class="btn f" data-go="ap:vista:grid" id="apVG" data-t="vGrid"></button><button class="btn f" data-go="ap:vista:lista" id="apVL" data-t="vLista"></button></div></div>
  <small class="ajn" data-t="vListaInfo"></small>
  <div class="botones"><button class="btn pri f" data-go="cerrar" data-t="listo"></button></div>
</div></div>
<div class="velo" id="vTexto"><div class="ven">
  <h3 data-t="tamTexto"></h3>
  <div class="paso"><button class="btn f" data-go="ap:txt:-1">${ICA.menos}</button><input type="range" id="apTxt" min="10" max="20" step="1"><b id="apTxtV"></b><button class="btn f" data-go="ap:txt:1">${ICA.mas}</button></div>
  <div class="ajEj" data-t="ejemplo"></div>
  <div class="botones"><button class="btn f" data-go="ap:txt:def" data-t="porDefecto"></button><button class="btn pri f" data-go="cerrar" data-t="listo"></button></div>
</div></div>`);
pintaTextos();

/* ---------- tamaño del texto: 10 a 20 (14 = normal) ---------- */
let FT = 1;
function ponTexto(px){
  px = Math.max(10, Math.min(20, Math.round(px))); guarda('txt_px', px); FT = px / 14;
  document.documentElement.style.setProperty('--ft', FT.toFixed(3));
  const r = document.getElementById('apTxt'); if (r) r.value = px;
  const v = document.getElementById('apTxtV'); if (v) v.textContent = px + ' px';
  if (typeof vCats !== 'undefined') { vCats.pinta(true); vItems.pinta(true); if (typeof vGrid !== 'undefined') vGrid.pinta(true); }
}
ponTexto(lee('txt_px', 14));
document.getElementById('apTxt').addEventListener('input', e => ponTexto(+e.target.value));
/* las filas de carpetas y canales crecen si el texto crece */
vCats.alto = () => 4.7 * Math.max(1, FT);
vItems.alto = () => 3.7 * Math.max(1, FT);

/* ---------- apariencia de la cuadrícula ---------- */
const vistaDe = () => lee('vista_' + S.tipo, 'grid');
const colsDe = () => lee('cols_' + S.tipo, 5);
COLS = () => {                                   // sustituye a la de peliculas.js
  const vert = matchMedia('(orientation:portrait)').matches;
  if (vistaDe() === 'lista') return vert ? 1 : 2;
  return vert ? Math.min(colsDe(), 3) : colsDe();
};
function aplicaApariencia(){
  const g = document.getElementById('vGrid'); g.style.setProperty('--cols', COLS());
  g.classList.toggle('modoLista', vistaDe() === 'lista');
  if (enGrid() && S.cats[S.cat] && S.cats[S.cat].id !== '__tend') { const i = S.it; vGrid.pon(Math.ceil(S.items.length / COLS())); S.it = i; marcaGrid(); }
}
function pintaApar(){
  const c = colsDe(), v = vistaDe();
  document.getElementById('apCols').value = c; document.getElementById('apColsV').textContent = c;
  document.getElementById('apVG').classList.toggle('sel', v === 'grid'); document.getElementById('apVL').classList.toggle('sel', v === 'lista');
  document.querySelectorAll('#vApar .paso button, #apCols').forEach(b => b.disabled = v === 'lista');
}
document.getElementById('apCols').addEventListener('input', e => { guarda('cols_' + S.tipo, +e.target.value); pintaApar(); aplicaApariencia(); });
function accionApar(q, v){
  if (q === 'cols') { guarda('cols_' + S.tipo, Math.max(2, Math.min(8, colsDe() + (+v)))); pintaApar(); aplicaApariencia(); }
  else if (q === 'vista') { guarda('vista_' + S.tipo, v); pintaApar(); aplicaApariencia(); }
  else if (q === 'txt') ponTexto(v === 'def' ? 14 : lee('txt_px', 14) + (+v));
}

/* ---------- vista en lista: carátula a la izquierda, información a la derecha ---------- */
const _htmlPoster = htmlPoster;
htmlPoster = function(it, k, foco){
  if (k < 0 || vistaDe() !== 'lista') return _htmlPoster(it, k, foco);
  if (S.tipo === 'movie' && !it._info) pideSinopsis(it);
  const r = it.r ? (+it.r).toFixed(1) : '', inf = it._info || it._datos || {}, anio = it.y || anioDe(it.n) || String(inf.fecha || '').slice(0, 4);
  const gen = it.gen || inf.genero || '', desc = it.plot || inf.desc || '';
  const carp = (LISTA[S.tipo].cats.find(c => c.id === it.g) || {}).n || '';
  return `<div class="pl${foco ? ' foc' : ''}" data-k="${k}">
    <div class="plp">${it.l ? `<img src="${esc(it.l)}" loading="lazy" alt="" onerror="this.remove()">` : ''}<div class="pini">${esc(iniciales(it.n))}</div></div>
    <div class="pli"><b>${esc(it.n)}</b>
      <div class="plm">${r && r !== '0.0' ? `<span class="plr">${ICP.star}${r}</span>` : ''}${anio ? `<span>${anio}</span>` : ''}${gen ? `<span>${esc(gen)}</span>` : ''}</div>
      ${desc ? `<p>${esc(desc)}</p>` : `<p class="plc">${esc(carp)}${it.a ? ' · ' + t('anadida', { f: fecha(it.a) }) : ''}</p>`}
    </div>
    <span class="pfav${esFavX(it.id) ? ' si' : ''}">${IC.fav}</span>
  </div>`;
};
VGrid.prototype.h = function(){
  const c = COLS(), gap = Math.round(UPX * .8), w = (this.el.clientWidth - gap * (c - 1) - 6) / c;
  if (vistaDe() === 'lista') return Math.max(110, Math.round(w * .3 * 1.5));
  return Math.max(60, Math.round(w * 1.5));
};
document.getElementById('vGrid').addEventListener('click', e => {
  const p = e.target.closest('.pl'); if (!p) return; const k = +p.dataset.k;
  if (e.target.closest('.pfav')) { S.it = k; favActual(); return; }
  S.zona = 'items'; S.it = k; marcaGrid(); abreFicha(S.items[k]);
});
const _gridCat = gridCat;
gridCat = function(c){ document.getElementById('vGrid').style.setProperty('--cols', COLS()); document.getElementById('vGrid').classList.toggle('modoLista', vistaDe() === 'lista'); _gridCat(c); };

/* ---------- carril: botones según la sección y navegación con el mando ---------- */
function railVisibles(){ return [...document.querySelectorAll('#rail .rb')].filter(b => b.offsetParent !== null); }
function ajustaRail(){
  document.querySelector('#rail [data-r="apar"]').style.display = enGrid() ? '' : 'none';
  document.querySelector('#rail [data-r="full"]').style.display = enGrid() ? 'none' : '';
}
const _rail = rail;
rail = function(r){
  if (r === 'apar') { pintaApar(); abreVentana('vApar'); return; }
  if (r === 'texto') { ponTexto(lee('txt_px', 14)); abreVentana('vTexto'); return; }
  _rail(r);
};
const _marcaZonas = marcaZonas;
marcaZonas = function(){
  ajustaRail(); _marcaZonas();
  const vis = railVisibles();
  document.querySelectorAll('#rail .rb').forEach(b => b.classList.remove('foc'));
  if (S.zona === 'rail' && vis.length) { S.rail = Math.max(0, Math.min(S.rail, vis.length - 1)); vis[S.rail].classList.add('foc'); }
};
/* el mando en el carril usa solo los botones visibles */
const _teclaSeccion = teclaSeccion;
teclaSeccion = function(e){
  if (document.getElementById('sec').classList.contains('on') && !document.querySelector('.velo.on') && S.zona === 'rail'
      && !document.body.classList.contains('full') && !PF.abierta && !SF.abierta && !document.getElementById('scarga').classList.contains('on')) {
    const vis = railVisibles(), k = e.key;
    if (k === 'ArrowUp' || k === 'ArrowDown') { S.rail = Math.max(0, Math.min(vis.length - 1, S.rail + (k === 'ArrowUp' ? -1 : 1))); marcaZonas(); e.preventDefault(); return true; }
    if (k === 'Enter') { const b = vis[S.rail]; if (b) rail(b.dataset.r); e.preventDefault(); return true; }
  }
  return _teclaSeccion(e);
};

/* ---------- sinopsis en la vista de lista (películas) ----------
   Se piden solo las que se ven en pantalla, de 2 en 2, y se guardan en el aparato para la próxima vez. */
const SINOP = { cola: [], enCurso: 0, pedidas: new Set(), tPinta: null };
function pideSinopsis(it){
  if (SINOP.pedidas.has(it.id)) return;
  SINOP.pedidas.add(it.id); SINOP.cola.push(it); sigueSinopsis();
}
function sigueSinopsis(){
  while (SINOP.enCurso < 2 && SINOP.cola.length) {
    const it = SINOP.cola.pop();                               // primero las últimas que han entrado en pantalla
    if (!estaEnPantalla(it)) { SINOP.pedidas.delete(it.id); continue; }
    SINOP.enCurso++;
    const k = 'inf_' + LISTA.key + '_' + it.id;
    ALM.get(k).then(g => g || infoPeli(it).then(o => { ALM.set(k, o); return o; }))
      .then(o => { it._info = o; clearTimeout(SINOP.tPinta); SINOP.tPinta = setTimeout(() => { if (enGrid() && vistaDe() === 'lista') { vGrid.sucio = true; vGrid.pinta(true); } }, 300); })
      .catch(() => {})
      .finally(() => { SINOP.enCurso--; sigueSinopsis(); });
  }
}
function estaEnPantalla(it){
  if (!enGrid() || S.tipo !== 'movie' || vistaDe() !== 'lista') return false;
  const i = S.items.indexOf(it); if (i < 0) return false;
  const fila = Math.floor(i / COLS()); return fila >= (vGrid._a || 0) && fila < (vGrid._b || 0);
}
