/* ===================================================================
   AJUSTES → ORDENAR
   El cliente pone en el orden que quiera:
   - las 4 secciones de la portada (y los iconos de arriba dentro de las secciones),
   - los botones de abajo de la portada,
   - los botones de la barra lateral de las secciones,
   - el menú de Ajustes.
   (Las carpetas se ordenan en Ajustes → Carpetas.) Se guarda en el aparato.
   =================================================================== */
Object.assign(TXT.es, { aj_ord:'Ordenar' });
Object.assign(TXT.en, { aj_ord:'Arrange' });
ICJ.ord = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4v16M3.5 7.5 7 4l3.5 3.5M17 20V4M13.5 16.5 17 20l3.5-3.5"/></svg>';
SECC.push('ord');
const SECC_ORIG = SECC.slice();

const RAIL_N = { home:'Inicio (portada)', full:'Pantalla completa', fav:'Favorito', buscar:'Buscar', listas:'Cambiar lista', apar:'Apariencia (vista)',
  texto:'Tamaño del texto', carpeta:'Mis carpetas', ajustes:'Ajustes', info:'Información', salir:'Salir' };
/* cada grupo: dónde están los elementos, cómo se llaman y cómo se reordenan */
const ORD = {
  tiles: { tit:'Portada · secciones', nota:'También cambia el orden de los iconos de arriba dentro de las secciones.',
    els: () => [...document.querySelectorAll('#home .tiles .tile')], id: e => e.dataset.go,
    nom: e => (e.querySelector('b') || {}).textContent || e.dataset.go, ico: e => (e.querySelector('.ico svg') || {}).outerHTML || '' },
  btns:  { tit:'Portada · botones de abajo', els: () => [...document.querySelectorAll('#home .homeBtns .btn')], id: e => e.dataset.go,
    nom: e => (e.querySelector('span') || {}).textContent || e.dataset.go, ico: e => (e.querySelector('svg') || {}).outerHTML || '' },
  rail:  { tit:'Barra lateral (dentro de las secciones)', nota:'Algunos botones solo salen en ciertas secciones (por ejemplo, Apariencia en Películas y Series).',
    els: () => [...document.querySelectorAll('#rail .rb')], id: e => e.dataset.r, nom: e => RAIL_N[e.dataset.r] || e.dataset.r, ico: e => (e.querySelector('svg') || {}).outerHTML || '' },
  aj:    { tit:'Menú de Ajustes', virtual: true }
};
/* orden original (tal y como viene la app) */
const ORD_ORIG = {};
['tiles', 'btns', 'rail'].forEach(g => { ORD_ORIG[g] = ORD[g].els().map(ORD[g].id); });
ORD_ORIG.aj = SECC_ORIG.slice();
/* orden de serie elegido por José (24/10/2026). Lo que no esté aquí va al final; lo que ya no exista se ignora. */
const ORD_DEFECTO = {
  tiles: ['sec:live', 'sec:radio', 'sec:movie', 'sec:series'],
  btns:  ['buscarTodo', 'refrescar', 'listas', 'envio', 'ajustes', 'enlaces', 'soporte', 'salir'],
  rail:  ['home', 'buscar', 'full', 'texto', 'fav', 'apar', 'carpeta', 'listas', 'ajustes', 'salir'],
  aj:    ['cue', 'apa', 'pin', 'ord', 'rep']
};

function ordenDe(g){
  const orig = ORD_ORIG[g], guard = lee('ord_' + g, null);
  const base = Array.isArray(guard) ? guard : (ORD_DEFECTO[g] || orig);
  const out = base.filter(id => orig.includes(id));
  orig.forEach(id => { if (!out.includes(id)) out.push(id); });            // botones nuevos de versiones futuras: al final
  return out;
}
function aplicaOrden(){
  // portada: secciones y botones
  ['tiles', 'btns'].forEach(g => {
    const els = ORD[g].els(); if (!els.length) return; const padre = els[0].parentNode, m = new Map(els.map(e => [ORD[g].id(e), e]));
    ordenDe(g).forEach(id => { const e = m.get(id); if (e) padre.appendChild(e); });
  });
  // iconos de arriba de las secciones: mismo orden que la portada
  const tipos = ordenDe('tiles').map(id => id.split(':')[1]);
  const secs = document.getElementById('secs');
  if (secs) { tipos.forEach(tp => { const b = secs.querySelector(`[data-s="${tp}"]`); if (b) secs.appendChild(b); }); }
  if (typeof TIPOS_SEC !== 'undefined') TIPOS_SEC.splice(0, TIPOS_SEC.length, ...tipos);
  // barra lateral: el reloj siempre arriba; el último botón va pegado abajo
  const rail = document.getElementById('rail'), rb = ORD.rail.els(), mr = new Map(rb.map(e => [e.dataset.r, e]));
  ordenDe('rail').forEach(id => { const e = mr.get(id); if (e) rail.appendChild(e); });
  rb.forEach(e => e.classList.remove('fin')); const ult = rail.querySelector('.rb:last-of-type'); if (ult) ult.classList.add('fin');
  // menú de Ajustes
  SECC.splice(0, SECC.length, ...ordenDe('aj'));
  if (typeof flechasCarril === 'function') requestAnimationFrame(flechasCarril);
}

function panelOrdenar(){
  let h = `<p class="ajNota">Pon los botones en el orden que más te guste con ▲ y ▼. Se guarda en este aparato.</p>`;
  for (const g of ['tiles', 'btns', 'rail', 'aj']) {
    const o = ordenDe(g), G = ORD[g];
    h += `<h3>${G.tit}</h3>${G.nota ? `<p class="ajNota">${G.nota}</p>` : ''}`;
    const els = G.virtual ? null : new Map(G.els().map(e => [G.id(e), e]));
    h += o.map((id, k) => {
      const e = els && els.get(id);
      const nom = G.virtual ? t('aj_' + id) : G.nom(e), ico = G.virtual ? ICJ[id] : G.ico(e);
      return `<div class="ordFila"><b>${k + 1}</b><i>${ico || ''}</i><span>${esc(nom)}</span>`
        + boton('ordSube:' + g + ':' + id, ICJ.arriba, 'ico' + (k ? '' : ' nada'))
        + boton('ordBaja:' + g + ':' + id, ICJ.abajo, 'ico' + (k < o.length - 1 ? '' : ' nada')) + `</div>`;
    }).join('');
  }
  h += `<div class="ajBtns">${boton('ordOrig', 'Volver al orden original')}</div>`;
  return h;
}
/* Ordenar tiene dos pestañas: Botones y Carpetas (las carpetas piden el PIN si hay control parental) */
let ordTab = 'bot';
const _pintaPanelAjO = pintaPanelAj;
pintaPanelAj = function(enfocar){
  if (secAj !== 'ord') return _pintaPanelAjO(enfocar);
  const tabs = `<div class="ajBtns tabs">${boton('ordTab:bot', ICJ.ord + ' Botones', ordTab === 'bot' ? 'sel' : '')}${boton('ordTab:car', ICJ.car + ' Carpetas', ordTab === 'car' ? 'sel' : '')}</div>`;
  const P = $('#ajPanel'); P.innerHTML = `<h2>${t('aj_ord')}</h2>` + tabs + (ordTab === 'car' ? panelCarpetas() : panelOrdenar());
  if (enfocar) { const e = P.querySelector(`[data-go="${enfocar}"]`) || $('#ajMenu .sel'); if (e) enfoca(e); }
};
const _accionO = accion;
accion = function(go){
  const p = go.split(':');
  if (p[0] === 'aja' && (p[1] === 'ordSube' || p[1] === 'ordBaja')) {
    const g = p[2], id = p.slice(3).join(':'), o = ordenDe(g), i = o.indexOf(id), j = p[1] === 'ordSube' ? i - 1 : i + 1;
    if (i >= 0 && j >= 0 && j < o.length) { [o[i], o[j]] = [o[j], o[i]]; guarda('ord_' + g, o); aplicaOrden(); if (g === 'aj') pintaMenuAj(); }
    // el foco sigue al botón que se ha movido (si llega al borde, pasa a la otra flecha)
    const sigo = (j >= 0 && j < o.length) ? (j === 0 ? 'aja:ordBaja:' : j === o.length - 1 ? 'aja:ordSube:' : 'aja:' + p[1] + ':') + g + ':' + id : go;
    pintaPanelAj(sigo); return;
  }
  if (p[0] === 'aja' && p[1] === 'ordTab') {
    if (p[2] === 'car') { pinAjustesOk().then(ok => { if (!ok) return; ordTab = 'car'; pintaPanelAj('aja:ordTab:car'); }); return; }
    ordTab = 'bot'; pintaPanelAj('aja:ordTab:bot'); return;
  }
  if (go === 'aja:irCarpetas') {
    pinAjustesOk().then(ok => { if (!ok) return; secAj = 'ord'; ordTab = 'car'; pintaMenuAj(); pintaPanelAj('aja:ordTab:car'); }); return;
  }
  if (go.startsWith('ajs:') && go !== 'ajs:ord') ordTab = 'bot';
  if (go === 'aja:ordOrig') {
    pideConfirmar('Orden original', 'Los botones volverán al orden de serie.').then(si => {
      if (!si) return; ['tiles', 'btns', 'rail', 'aj'].forEach(g => guarda('ord_' + g, null)); aplicaOrden(); pintaMenuAj(); pintaPanelAj('aja:ordOrig'); });
    return;
  }
  return _accionO(go);
};
aplicaOrden();
