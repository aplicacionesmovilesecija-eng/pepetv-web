/* ===================================================================
   GLOBITOS CON EL NOMBRE DE LOS BOTONES (1.3)
   Salen al pasar el ratón por encima y al seleccionar con el mando, sobre todo en los botones
   que solo tienen un icono (barra lateral, reproductor, flechas…). Colores de la app.
   =================================================================== */
const TIP_N = {
  // barra lateral (data-r)
  'r:home':'Inicio', 'r:full':'Pantalla completa', 'r:fav':'Favorito', 'r:buscar':'Buscar', 'r:listas':'Cambiar lista', 'r:apar':'Apariencia (vista)',
  'r:texto':'Tamaño del texto', 'r:carpeta':'Mis carpetas', 'r:ajustes':'Ajustes', 'r:info':'Información', 'r:salir':'Salir',
  // películas y series (data-go)
  'pf:full':'Pantalla completa', 'pf:pausa':'Pausa / seguir', 'pf:reinicio':'Desde el principio', 'pf:fav':'Favorito', 'pf:trailer':'Tráiler',
  'pf:atras':'Volver', 'pf:atr':'Atrás 10 segundos', 'pf:ade':'Adelante 10 segundos', 'pf:sig':'Siguiente episodio', 'pf:audio':'Idioma del audio',
  'pf:subs':'Subtítulos', 'pf:yt':'Ver tráiler',
  // otros
  'busVoz':'Buscar con la voz', 'cerrar':'Cerrar'
};
const TIP_ID = { bFull:'Pantalla completa / salir', bAjuste:'Ajuste de imagen (original, llenar, recortar, 4:3)' };
function tipDe(el){
  if (!el || !el.closest) return '';
  if (el.dataset.tip) return el.dataset.tip;
  if (el.id && TIP_ID[el.id]) return TIP_ID[el.id];
  if (el.dataset.r && TIP_N['r:' + el.dataset.r]) return TIP_N['r:' + el.dataset.r];
  const go = el.dataset.go || '';
  if (TIP_N[go]) return TIP_N[go];
  if (/^aja:(ordSube|carSube)/.test(go)) return 'Subir';
  if (/^aja:(ordBaja|carBaja)/.test(go)) return 'Bajar';
  if (/^aja:carRen/.test(go)) return 'Cambiar nombre';
  if (/^aja:carBorra/.test(go)) return 'Borrar carpeta';
  if (el.matches('label.pbtn')) return 'Volumen';
  if (el.classList.contains('sb')) return '';                                  // ya tienen el nombre escrito debajo
  // si el botón ya tiene texto a la vista, no hace falta globito
  const txt = (el.textContent || '').trim();
  if (txt.length > 2 && !el.querySelector('span:empty')) return '';
  return el.getAttribute('aria-label') || el.getAttribute('title') || '';
}
document.body.insertAdjacentHTML('beforeend', '<div id="tip" role="tooltip"></div>');
document.head.insertAdjacentHTML('beforeend', `<style>
#tip{position:fixed;z-index:200;pointer-events:none;opacity:0;transform:translateY(4px);transition:opacity .15s,transform .15s;
  background:var(--grad);color:#fff;font-weight:700;font-size:calc(var(--u)*var(--ft)*1.15);padding:calc(var(--u)*.45) calc(var(--u)*1);
  border-radius:calc(var(--u)*.6);white-space:nowrap;box-shadow:0 6px 18px rgba(0,0,0,.4)}
#tip.on{opacity:1;transform:none}
</style>`);
let tipEl = null, tipT = null;
function muestraTip(el, segundos){
  const txt = tipDe(el), tip = document.getElementById('tip');
  if (!txt || !el.offsetParent) { ocultaTip(); return; }
  tipEl = el; tip.textContent = txt; tip.classList.add('on');
  const r = el.getBoundingClientRect(), w = tip.offsetWidth, h = tip.offsetHeight, W = innerWidth, H = innerHeight, m = 8;
  let x, y;
  if (el.closest('#rail') && W > H) { x = r.right + m; y = r.top + r.height / 2 - h / 2; }    // barra lateral: a la derecha
  else { x = r.left + r.width / 2 - w / 2; y = r.top - h - m; if (y < 4) y = r.bottom + m; }   // resto: encima (o debajo si no cabe)
  tip.style.left = Math.max(4, Math.min(W - w - 4, x)) + 'px'; tip.style.top = Math.max(4, Math.min(H - h - 4, y)) + 'px';
  clearTimeout(tipT); if (segundos) tipT = setTimeout(ocultaTip, segundos * 1000);
}
function ocultaTip(){ tipEl = null; clearTimeout(tipT); const t2 = document.getElementById('tip'); if (t2) t2.classList.remove('on'); }
/* ratón */
document.addEventListener('mouseover', e => {
  const el = e.target.closest('button,label.pbtn,[data-tip]');
  if (el === tipEl) return;
  if (el && tipDe(el)) muestraTip(el); else ocultaTip();
});
document.addEventListener('mousedown', ocultaTip);
document.addEventListener('scroll', ocultaTip, true);
/* mando: al seleccionar un botón (foco) */
const _enfocaT = enfoca;
enfoca = function(e){ _enfocaT(e); if (e && tipDe(e)) setTimeout(() => muestraTip(e, 2.5), 30); else ocultaTip(); };
/* mando en la barra lateral (no usa el foco del navegador) */
const _marcaZonasT = marcaZonas;
marcaZonas = function(){
  _marcaZonasT();
  if (S.zona === 'rail') { const b = document.querySelector('#rail .rb.foc'); if (b) setTimeout(() => muestraTip(b, 2.5), 30); }
  else if (tipEl && tipEl.closest && tipEl.closest('#rail')) ocultaTip();
};
/* los "title" del navegador se cambian por el globito (para no ver dos) */
document.querySelectorAll('button[title]').forEach(b => { b.dataset.tip = b.title; b.removeAttribute('title'); });
