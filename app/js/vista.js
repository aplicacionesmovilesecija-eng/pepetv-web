/* ===================================================================
   2.4: APARIENCIA también en TV en vivo y Radios
   Lista o cuadrícula, y de 1 a 6 columnas (deslizador). Se guarda por sección en el aparato.
   =================================================================== */
const esLR = () => S.tipo === 'live' || S.tipo === 'radio';
const lrVista = () => lee('vista_' + S.tipo, 'lista');
const lrCols = () => { const v = lee('cols_' + S.tipo, 0); const c = v || (lrVista() === 'grid' ? 4 : 1);
  const vert = matchMedia('(orientation:portrait)').matches; return Math.max(1, Math.min(vert ? 3 : 6, c)); };
const lrN = () => esLR() ? lrCols() : 1;

/* el botón Apariencia sale en todas las secciones */
const _ajustaRailV = ajustaRail;
ajustaRail = function(){ _ajustaRailV(); const a = document.querySelector('#rail [data-r="apar"]'); if (a) a.style.display = ''; };

/* la ventana de Apariencia: en TV/Radios el deslizador va de 1 a 6 y la lista también admite columnas */
const _pintaAparV = pintaApar;
pintaApar = function(){
  const r = document.getElementById('apCols'), lbl = document.querySelector('#vApar [data-t="porFila"]'), info = document.querySelector('#vApar [data-t="vListaInfo"]');
  if (!esLR()) { r.min = 2; r.max = 8; if (lbl) lbl.textContent = t('porFila'); if (info) info.hidden = false; return _pintaAparV(); }
  r.min = 1; r.max = 6;
  const c = lrCols(), v = lrVista();
  r.value = c; document.getElementById('apColsV').textContent = c;
  document.getElementById('apVG').classList.toggle('sel', v === 'grid'); document.getElementById('apVL').classList.toggle('sel', v === 'lista');
  document.querySelectorAll('#vApar .paso button, #apCols').forEach(b => b.disabled = false);
  if (lbl) lbl.textContent = S.tipo === 'radio' ? 'Emisoras por fila' : 'Canales por fila';
  if (info) info.hidden = true;
};
const _accionAparV = accionApar;
accionApar = function(q, v){
  if (!esLR()) return _accionAparV(q, v);
  if (q === 'cols') { guarda('cols_' + S.tipo, Math.max(1, Math.min(6, lrCols() + (+v)))); pintaApar(); aplicaApariencia(); }
  else if (q === 'vista') { guarda('vista_' + S.tipo, v); guarda('cols_' + S.tipo, v === 'grid' ? 4 : 1); pintaApar(); aplicaApariencia(); }
  else return _accionAparV(q, v);
};
const _aplicaAparienciaV = aplicaApariencia;
aplicaApariencia = function(){
  if (!esLR()) return _aplicaAparienciaV();
  const i = S.it; vItems.pon(S.items.length); S.it = i; vItems.marca(S.zona === 'items' ? S.it : -1, vItems.sel);
};
document.getElementById('apCols').addEventListener('input', e => { if (esLR()) { guarda('cols_' + S.tipo, +e.target.value); pintaApar(); aplicaApariencia(); } });

/* ---------- la lista de canales/emisoras con varias columnas ---------- */
const htmlItG = i => { const it = S.items[i];
  return `<span class="lo">${logoHTML(it.l, it.n)}</span><span class="nm">${esc(it.n)}</span><span class="nu">${it.num || i + 1}</span>${esFavX(it.id) ? `<span class="hz">${IC.fav}</span>` : ''}`; };
const _hItems = vItems.h.bind(vItems);
vItems.h = function(){
  if (!esLR() || lrVista() !== 'grid') return _hItems();
  const n = lrN(), gap = Math.round(UPX * .55), w = (this.el.clientWidth - gap * (n - 1) - 6) / n;
  return Math.max(Math.round(UPX * 6), Math.round(w * .95));
};
vItems.pinta = function(todo){
  const n = lrN(), grid = esLR() && lrVista() === 'grid';
  const h = this.h(), gap = Math.round(UPX * .55), paso = h + gap, H = this.el.clientHeight, top = this.el.scrollTop, filas = Math.ceil(this.n / n);
  this.esp.style.height = (filas * paso) + 'px';
  const a = Math.max(0, Math.floor(top / paso) - 4), b = Math.min(filas, Math.ceil((top + H) / paso) + 4);
  const k = n + (grid ? 'g' : 'l');
  if (!todo && this._a === a && this._b === b && this._k === k && !this.sucio) return;
  this._a = a; this._b = b; this._k = k; this.sucio = false;
  const W = `calc((100% - ${gap * (n - 1)}px - ${Math.round(UPX * .4)}px) / ${n})`;
  let s = '';
  for (let f = a; f < b; f++) for (let c = 0; c < n; c++) { const i = f * n + c; if (i >= this.n) break;
    const pos = n > 1 ? `left:calc(${W} * ${c} + ${gap * c}px);width:${W};right:auto;` : '';
    s += `<div class="row ${grid ? 'it itg' : (this.html.cls || '')}${i === this.foc && !this.sinFoc ? ' foc' : ''}${i === this.sel ? ' sel' : ''}" data-i="${i}" style="top:${f * paso}px;height:${h}px;${pos}">${grid ? htmlItG(i) : this.html(i)}</div>`; }
  this.esp.innerHTML = s; this.el.dataset.cols = n; this.el.dataset.vista = grid ? 'grid' : 'lista';
};
vItems.ve = function(i){
  const n = lrN(), h = this.h() + Math.round(UPX * .55), top = Math.floor(i / n) * h, el = this.el;
  if (top < el.scrollTop) el.scrollTop = top; else if (top + h > el.scrollTop + el.clientHeight) el.scrollTop = top + h - el.clientHeight;
};
addEventListener('resize', () => { if (esLR()) vItems.pinta(true); });

/* ---------- mando: con varias columnas, izquierda/derecha se mueven por la fila y arriba/abajo saltan de fila ---------- */
const _teclaSeccionV = teclaSeccion;
teclaSeccion = function(e){
  const n = lrN(), k = e.key;
  if (n > 1 && esLR() && S.zona === 'items' && document.getElementById('sec').classList.contains('on') && !document.querySelector('.velo.on')
      && !document.body.classList.contains('full') && !document.getElementById('scarga').classList.contains('on') && S.items.length) {
    const L = S.items.length, col = S.it % n; let j = null;
    if (k === 'ArrowDown') j = Math.min(L - 1, S.it + n);
    else if (k === 'ArrowUp') { if (S.it - n >= 0) j = S.it - n; }
    else if (k === 'ArrowRight') { if (col < n - 1 && S.it + 1 < L) j = S.it + 1; }          // en la última columna: pasa a los botones del reproductor
    else if (k === 'ArrowLeft' && col > 0) j = S.it - 1;
    if (j !== null) { e.preventDefault(); S.it = j; vItems.marca(S.it); if (typeof guiaDe === 'function') guiaDe(S.items[S.it]); return true; }
  }
  return _teclaSeccionV(e);
};
