/* ===================================================================
   AJUSTES (v2.5)
   Reproductor · Listas y guía · Carpetas · Control parental · Apariencia · Mi cuenta · Avanzado
   Todo se guarda en el aparato (claves cfg_*).
   =================================================================== */
Object.assign(TXT.es, {
  aj_tit:'Ajustes', aj_rep:'Reproductor', aj_lis:'Listas y guía', aj_car:'Carpetas', aj_pin:'Control parental', aj_apa:'Apariencia',
  aj_cue:'Mi cuenta', aj_ava:'Avanzado', aj_si:'Sí', aj_no:'No', bloqueada:'Carpeta bloqueada · pulsa OK y escribe el PIN',
  pinTit:'Escribe el PIN', pinNuevo:'Escribe el nuevo PIN (4 cifras)', pinRepite:'Repite el nuevo PIN', pinMal:'PIN incorrecto',
  pinNoCoincide:'Los PIN no coinciden', pinGuardado:'PIN guardado', pinQuitado:'PIN quitado', aceptar:'Aceptar', cancelar:'Cancelar',
  carpetaNueva:'Nueva carpeta', nombreCarpeta:'Nombre de la carpeta', anadidoA:'Añadido a «{c}»', quitadoDe:'Quitado de «{c}»',
  misCarpetas:'Mis carpetas', sinElemento:'Pon un canal o elige un título primero', volver:'Volver',
  pinOlvide:'He olvidado el PIN', pinQuedan:'te quedan {n} intentos', pinBloqueado:'Demasiados intentos: PIN bloqueado 5 minutos',
  pinEspera:'PIN bloqueado. Espera {n} min', pinBloqTit:'PIN bloqueado',
  pinBloqTxt:'Se ha bloqueado por fallar 3 veces. Podrás volver a intentarlo en {n} minutos. ¿Has olvidado el PIN? Pulsa Aceptar para pedir ayuda a soporte por WhatsApp.'
});
Object.assign(TXT.en, {
  aj_tit:'Settings', aj_rep:'Player', aj_lis:'Playlists & guide', aj_car:'Folders', aj_pin:'Parental control', aj_apa:'Appearance',
  aj_cue:'My account', aj_ava:'Advanced', aj_si:'Yes', aj_no:'No', bloqueada:'Locked folder · press OK and enter the PIN',
  pinTit:'Enter PIN', pinNuevo:'Enter new PIN (4 digits)', pinRepite:'Repeat new PIN', pinMal:'Wrong PIN',
  pinNoCoincide:'PINs do not match', pinGuardado:'PIN saved', pinQuitado:'PIN removed', aceptar:'OK', cancelar:'Cancel',
  carpetaNueva:'New folder', nombreCarpeta:'Folder name', anadidoA:'Added to «{c}»', quitadoDe:'Removed from «{c}»',
  misCarpetas:'My folders', sinElemento:'Play a channel or pick a title first', volver:'Back',
  pinOlvide:'I forgot the PIN', pinQuedan:'{n} attempts left', pinBloqueado:'Too many attempts: PIN locked for 5 minutes',
  pinEspera:'PIN locked. Wait {n} min', pinBloqTit:'PIN locked',
  pinBloqTxt:'Locked after 3 wrong attempts. You can try again in {n} minutes. Forgot it? Press OK to ask support on WhatsApp.'
});
const CFG = (k, d) => lee('cfg_' + k, d);
const ponAJ = (k, v) => guarda('cfg_' + k, v);

const ICJ = {
  rep:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/></svg>',
  lis:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 6h16M4 12h10M4 18h7"/><circle cx="18" cy="16" r="3.5"/><path d="M18 14.5V16l1 1"/></svg>',
  car:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
  carMas:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M12 10.5v5M9.5 13h5"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/></svg>',
  apa:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/></svg>',
  cue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  ava:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg>',
  gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 15H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9 4.6V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0 1.2 2.9H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  ojo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z"/><circle cx="12" cy="12" r="3.2"/></svg>',
  noOjo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10.5 7 10.5 7a17 17 0 0 1-3 3.8M6.2 6.3C3.3 8.2 1.5 12 1.5 12S5.5 19 12 19a10 10 0 0 0 4.4-1"/></svg>',
  arriba:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6"/></svg>',
  abajo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
  candado:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 10V7.5a5 5 0 0 1 10 0V10h.5A1.5 1.5 0 0 1 19 11.5v8A1.5 1.5 0 0 1 17.5 21h-11A1.5 1.5 0 0 1 5 19.5v-8A1.5 1.5 0 0 1 6.5 10zm2 0h6V7.5a3 3 0 0 0-6 0z"/></svg>',
  abierto:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="5" y="10.5" width="14" height="10" rx="1.5"/><path d="M8 10.5V7.5a4 4 0 0 1 7.6-1.7"/></svg>',
  papelera:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>',
  atras:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  lapiz:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>'
};

/* ---------- maqueta ---------- */
document.body.insertAdjacentHTML('beforeend', `
<section class="scr" id="ajustes">
  <header class="ajHead"><button class="btn f ajVolver" data-go="aja:volver">${ICJ.atras}<span data-t="volver"></span></button><div class="marca"><img data-logo alt=""><span data-version></span></div><h1>${ICJ.gear}<span data-t="aj_tit"></span></h1></header>
  <div class="ajBody"><nav class="ajMenu" id="ajMenu"></nav><div class="ajPanel" id="ajPanel"></div></div>
</section>
<div class="velo" id="vPin"><div class="ven pinVen">
  <h3 id="pinTit"></h3>
  <div class="pinPuntos" id="pinPuntos"><i></i><i></i><i></i><i></i></div>
  <div class="pinMsg" id="pinMsg"></div>
  <div class="pinTec">${[1,2,3,4,5,6,7,8,9].map(n => `<button class="btn f" data-go="pin:${n}">${n}</button>`).join('')}
    <button class="btn f" data-go="pin:no" data-t="cancelar"></button><button class="btn f" data-go="pin:0">0</button><button class="btn f" data-go="pin:del">⌫</button></div>
  <button class="btn f pinOlvido" data-go="pin:olvido" id="pinOlvido" hidden data-t="pinOlvide"></button>
</div></div>
<div class="velo" id="vEntrada"><div class="ven">
  <h3 id="entTit"></h3><input type="text" id="entTxt" maxlength="30" autocomplete="off">
  <div class="botones"><button class="btn f" data-go="ent:no" data-t="cancelar"></button><button class="btn pri f" data-go="ent:si" data-t="aceptar"></button></div>
</div></div>
<div class="velo" id="vConf"><div class="ven">
  <h3 id="confTit"></h3><p id="confTxt" style="color:var(--mut);font-size:calc(var(--u)*var(--ft)*1.4);line-height:1.45"></p>
  <div class="botones"><button class="btn f" data-go="conf:no" data-t="cancelar"></button><button class="btn pri f" data-go="conf:si" data-t="aceptar"></button></div>
</div></div>
<div class="velo" id="vCarp"><div class="ven">
  <h3><span data-t="misCarpetas"></span> <small id="carpItem" style="color:var(--mut);font-weight:400"></small></h3>
  <div id="carpLista" class="carpLista"></div>
  <div class="botones"><button class="btn f" data-go="carp:nueva">${ICJ.carMas}<span data-t="carpetaNueva"></span></button><button class="btn pri f" data-go="cerrar" data-t="listo"></button></div>
</div></div>`);
document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="css/ajustes.css">');
pintaTextos();
$$('[data-logo]').forEach(i => i.src = BRAND.logo);

/* ---------- ventanitas: PIN, texto y confirmar ---------- */
let pinRes = null, pinBuf = '';
function pidePinDigitos(titulo, olvido){
  return new Promise(ok => {
    pinRes = ok; pinBuf = ''; $('#pinTit').textContent = titulo; $('#pinMsg').textContent = ''; pintaPin();
    $('#pinOlvido').hidden = !olvido;
    abreVentana('vPin');
  });
}
function pintaPin(){ $$('#pinPuntos i').forEach((x, k) => x.classList.toggle('on', k < pinBuf.length)); }
function teclaPin(d){
  if (d === 'no') { cierraVentana(); const r = pinRes; pinRes = null; r && r(null); return; }
  if (d === 'olvido') { const r = pinRes; pinRes = null; cierraVentana(); r && r(null); contactaSoporte('pin'); return; }
  if (d === 'del') { pinBuf = pinBuf.slice(0, -1); pintaPin(); return; }
  if (pinBuf.length >= 4) return;
  pinBuf += d; pintaPin();
  if (pinBuf.length === 4) setTimeout(() => { const r = pinRes; pinRes = null; cierraVentana(); r && r(pinBuf); }, 150);
}
document.addEventListener('keydown', e => {
  if (!$('#vPin').classList.contains('on')) return;
  if (/^[0-9]$/.test(e.key)) { teclaPin(e.key); e.preventDefault(); e.stopImmediatePropagation(); }
  else if (e.key === 'Backspace') { teclaPin('del'); e.preventDefault(); e.stopImmediatePropagation(); }
}, true);
const hashPin = p => { let h = 0x811c9dc5; for (const c of 'pepetv|' + p) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return (h >>> 0).toString(36); };
const pinActivo = () => !!lee('pin_h', '');
/* 3 fallos seguidos = PIN bloqueado 5 minutos (así un niño no puede ir probando) */
async function pidePin(){
  if (!pinActivo()) return true;
  const hasta = +lee('pin_bloq', 0);
  if (hasta > Date.now()) {
    const min = Math.ceil((hasta - Date.now()) / 60e3);
    aviso(t('pinEspera', { n: min }));
    if (await pideConfirmar(t('pinBloqTit'), t('pinBloqTxt', { n: min }))) contactaSoporte('pin');
    return false;
  }
  const p = await pidePinDigitos(t('pinTit'), true); if (p == null) return false;
  if (hashPin(p) === lee('pin_h', '')) { guarda('pin_mal', 0); return true; }
  const mal = (+lee('pin_mal', 0) || 0) + 1;
  if (mal >= 3) { guarda('pin_mal', 0); guarda('pin_bloq', Date.now() + 5 * 60e3); aviso(t('pinBloqueado')); }
  else { guarda('pin_mal', mal); aviso(t('pinMal') + ' · ' + t('pinQuedan', { n: 3 - mal })); }
  return false;
}
let entRes = null;
function pideTexto(titulo, valor){
  return new Promise(ok => { entRes = ok; $('#entTit').textContent = titulo; $('#entTxt').value = valor || ''; abreVentana('vEntrada'); setTimeout(() => $('#entTxt').focus(), 60); });
}
$('#entTxt').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); accion('ent:si'); } e.stopPropagation(); });
let confRes = null;
function pideConfirmar(titulo, texto){ return new Promise(ok => { confRes = ok; $('#confTit').textContent = titulo; $('#confTxt').textContent = texto || ''; abreVentana('vConf'); }); }

/* ===================================================================
   CARPETAS: ocultar, ordenar, propias y bloqueadas (por lista y sección)
   =================================================================== */
const baseC = tipo => LISTA ? LISTA.key + '_' + (tipo || S.tipo) : '';
const esAdulto = n => /\b(xxx|adult[oa]s?|\+ ?18|18 ?\+|porn\w*|er[oó]tic\w*|hot ?club|playboy|for adults)\b/i.test(String(n || ''));
const desbloq = new Set();                              // carpetas abiertas con PIN mientras la app sigue abierta
const propiasDe = tipo => lee('cprop_' + baseC(tipo), []);
const guardaPropias = (tipo, l) => guarda('cprop_' + baseC(tipo), l);
/* carpetas de adultos: 'si' = bloquear con PIN · 'ocultar' = no se ven · 'no' = nada (solo cuenta si hay PIN) */
const adultoModo = () => { const v = CFG('adultos', 'si'); return v === 'ocultar' ? 'ocultar' : v === 'no' ? 'no' : 'bloquear'; };
/* 2.0: carpetas especiales que también se pueden bloquear u ocultar */
const ESPECIALES_ALL = ['__fav', '__tend', '__new', '__vis', '__sin', '__all'];
function especialesDe(tp){
  const n = { __fav: t('favoritos'), __tend: 'Tendencias', __new: 'Añadidos recientemente', __vis: 'Vistos recientemente', __sin: 'Sin carpeta',
    __all: tp === 'live' ? 'Todos los canales' : tp === 'movie' ? 'Todas las películas' : 'Todas las series' };
  return (tp === 'live' ? ['__fav', '__sin', '__all'] : ['__fav', '__tend', '__new', '__vis', '__sin', '__all']).map(id => ({ id, n: n[id] }));
}
function bloqueadaCat(c, tipo){
  if (!pinActivo() || c.id === '__bus' || (c.id.startsWith('__') && !ESPECIALES_ALL.includes(c.id))) return false;
  const lk = lee('clock_' + baseC(tipo), []);
  return lk.includes(c.id) || (adultoModo() === 'bloquear' && esAdulto(c.n));
}
/* carpetas ocultas: no aparecen en ningún sitio (ni en la lista, ni en "Todos", ni en el buscador) */
function ocultasDe(tipo){
  const out = new Set(lee('coc_' + baseC(tipo), []));
  if (pinActivo() && adultoModo() === 'ocultar' && LISTA) (LISTA[tipo || S.tipo].cats || []).forEach(c => { if (esAdulto(c.n)) out.add(c.id); });
  return out;
}
function gruposBloqueados(tipo){
  tipo = tipo || S.tipo;
  if (!LISTA) return new Set();
  const out = ocultasDe(tipo);
  if (!pinActivo()) return out;
  const lk = new Set(lee('clock_' + baseC(tipo), []));
  (LISTA[tipo].cats || []).forEach(c => { if ((lk.has(c.id) || (adultoModo() === 'bloquear' && esAdulto(c.n))) && !desbloq.has(c.id)) out.add(c.id); });
  return out;
}
const _montaCarpetas = montaCarpetas;
montaCarpetas = function(){
  _montaCarpetas();
  if (S.tipo === 'radio' || !LISTA) return;
  const b = baseC(), ord = lee('cord_' + b, null), oc = ocultasDe();
  const fav = S.cats.filter(c => c.id === '__fav'), esp = S.cats.filter(c => c.id.startsWith('__') && !['__fav', '__sin', '__all'].includes(c.id));
  const fin = S.cats.filter(c => c.id === '__sin' || c.id === '__all');
  let prov = S.cats.filter(c => !c.id.startsWith('__'));
  if (ord) { const pos = new Map(ord.map((id, k) => [id, k])); prov = prov.map((c, k) => [c, pos.has(c.id) ? pos.get(c.id) : 1e5 + k]).sort((x, y) => x[1] - y[1]).map(x => x[0]); }
  prov = prov.filter(c => !oc.has(c.id));
  prov.forEach(c => { c.lock = bloqueadaCat(c); });
  const props = propiasDe().map(p => ({ id: p.id, n: p.n, total: p.items.length, propia: true, ico: ICJ.car }));
  S.cats = [...fav, ...props, ...esp, ...prov, ...fin].filter(c => !(c.id.startsWith('__') && oc.has(c.id)));   // 2.0: también se pueden ocultar las especiales
  S.cats.forEach(c => { if (ESPECIALES_ALL.includes(c.id)) c.lock = bloqueadaCat(c); });
  /* con carpetas ocultas o bloqueadas, los totales de "Todos", "Sin carpeta" y "Recientes" no cuentan lo que no se ve */
  if (gruposBloqueados().size) S.cats.forEach(c => { if (c.id === '__all' || c.id === '__sin' || c.id === '__new') c.total = itemsDe(c).length; });
  vCats.pon(S.cats.length);
};
const _itemsDe = itemsDe;
itemsDe = function(cat){
  if (S.tipo === 'radio' || !LISTA) return _itemsDe(cat);
  cat.bloq = !!(cat.lock && !desbloq.has(cat.id));
  if (cat.bloq) return [];
  if (cat.propia) {
    const p = propiasDe().find(x => x.id === cat.id), m = new Map(LISTA[S.tipo].items.map(x => [x.id, x]));
    const fuera = ocultasDe();
    return p ? p.items.map(id => m.get(id)).filter(it => it && !fuera.has(it.g)) : [];
  }
  let r = _itemsDe(cat);
  if (['__all', '__bus', '__new', '__sin', '__vis', '__fav'].includes(cat.id) || cat.id === '__tend') {
    const gb = gruposBloqueados(); if (gb.size) r = r.filter(it => !gb.has(it.g));
  }
  return r;
};
const _eligeCat = eligeCat;
eligeCat = function(i){
  _eligeCat(i);
  const c = S.cats[S.cat];
  if (c && c.bloq) { const v = document.getElementById(enGrid() ? 'gVacio' : 'iVacio'); v.hidden = false; v.textContent = t('bloqueada'); }
};
/* la carpeta bloqueada se abre con OK (o tocándola) y el PIN */
async function abreBloqueada(){
  const c = S.cats[S.cat]; if (!c || !c.bloq) return false;
  if (await pidePin()) { desbloq.add(c.id); eligeCat(S.cat); S.zona = 'items'; marcaZonas(); }
  return true;
}
const _clickCats = vCats.click;
vCats.click = i => { _clickCats(i); const c = S.cats[S.cat]; if (c && c.bloq) abreBloqueada(); };
/* candado en la lista de carpetas */
const _htmlCat = vCats.html;
vCats.html = i => { const c = S.cats[i]; let h = _htmlCat(i); if (c && c.lock) h += `<span class="hz candado">${desbloq.has(c.id) ? ICJ.abierto : ICJ.candado}</span>`; return h; };
vCats.html.cls = _htmlCat.cls;

/* ---------- añadir a mis carpetas (botón de la barra lateral) ---------- */
function elementoActual(){
  if (PF.abierta && PF.it) return PF.it;
  if (SF.abierta && SF.it) return SF.it;
  if (S.tipo === 'live' && S.jugando) return S.jugando;
  return S.items[S.it] || null;
}
function abreMisCarpetas(){
  const it = elementoActual(); if (!it) { aviso(t('sinElemento')); return; }
  $('#carpItem').textContent = '· ' + it.n;
  const l = propiasDe();
  $('#carpLista').innerHTML = l.length ? l.map(p => `<button class="opc f${p.items.includes(it.id) ? ' sel' : ''}" data-go="carp:pon:${p.id}">${ICJ.car}<span>${esc(p.n)}</span><small>${p.items.length}</small></button>`).join('')
    : `<p style="color:var(--mut)">${t('carpetaNueva')} ↓</p>`;
  abreVentana('vCarp');
}
async function accionCarp(q, id){
  const it = elementoActual(); if (!it) return;
  const l = propiasDe();
  if (q === 'nueva') {
    cierraVentana();
    const n = (await pideTexto(t('nombreCarpeta'), '') || '').trim(); if (!n) return abreMisCarpetas();
    l.push({ id: '__c:' + Date.now().toString(36), n: n.slice(0, 30), items: [it.id] }); guardaPropias(S.tipo, l);
    aviso(t('anadidoA', { c: n })); refrescaCarpetas(); return abreMisCarpetas();
  }
  if (q === 'pon') {
    const p = l.find(x => x.id === id); if (!p) return;
    const k = p.items.indexOf(it.id); if (k < 0) { p.items.push(it.id); aviso(t('anadidoA', { c: p.n })); } else { p.items.splice(k, 1); aviso(t('quitadoDe', { c: p.n })); }
    guardaPropias(S.tipo, l); refrescaCarpetas(); abreMisCarpetas();
  }
}
function refrescaCarpetas(){
  if (!$('#sec').classList.contains('on')) return;
  const id = (S.cats[S.cat] || {}).id; montaCarpetas();
  const i = S.cats.findIndex(c => c.id === id); S.cat = Math.max(0, i);
  if (i >= 0 && S.cats[i].propia) eligeCat(S.cat); else vCats.marca(undefined, S.cat);
}

/* ---------- barra lateral: + carpeta y ajustes; info pasa a Ajustes → Mi cuenta ---------- */
document.querySelector('#rail [data-r="listas"]').insertAdjacentHTML('beforebegin',
  `<button class="rb" data-r="carpeta">${ICJ.carMas}</button><button class="rb" data-r="ajustes">${ICJ.gear}</button>`);
document.querySelector('#rail [data-r="info"]').remove();
const _rail2 = rail;
rail = function(r){
  if (r === 'carpeta') return abreMisCarpetas();
  if (r === 'ajustes') {           // se para el vídeo, pero al volver de Ajustes seguimos en la misma sección
    if (PF.abierta) cierraFicha(); if (SF.abierta) cierraSerie();
    pantallaCompleta(false); paraVideo(); S.jugando = null; fondoPlayer(null); msgPlayer('');
    return abreAjustes();
  }
  _rail2(r);
};
const _ajustaRail = ajustaRail;
ajustaRail = function(){ _ajustaRail(); document.querySelector('#rail [data-r="carpeta"]').style.display = S.tipo === 'radio' ? 'none' : '';
  document.querySelector('#rail [data-r="listas"]').style.display = ((LIC && LIC.lists) || []).length > 1 ? '' : 'none'; };   // Cambiar lista solo si hay más de 1 visible

/* OK sobre una carpeta bloqueada */
const _teclaSeccion2 = teclaSeccion;
teclaSeccion = function(e){
  if ($('#sec').classList.contains('on') && !document.querySelector('.velo.on') && S.zona === 'cats' && e.key === 'Enter') {
    const c = S.cats[S.cat]; if (c && c.bloq) { e.preventDefault(); abreBloqueada(); return true; }
  }
  return _teclaSeccion2(e);
};

/* ===================================================================
   PANTALLA DE AJUSTES
   =================================================================== */
/* 1.2: "Listas y guía" va dentro de Mi cuenta y "Avanzado" dentro de Reproductor; Ajustes se abre en el primer apartado del menú */
const SECC = ['cue', 'apa', 'rep', 'pin'];        /* 1.3: Carpetas va dentro de Ordenar */
let secAj = 'cue', carTipo = 'live';
const OPC = {};
const IDIOMAS_MEDIA = [['', 'Original'], ['es', 'Español'], ['en', 'English'], ['fr', 'Français'], ['it', 'Italiano'], ['pt', 'Português'], ['de', 'Deutsch']];
function opcion(clave, titulo, expl, vals, def, alCambiar){
  OPC[clave] = { vals, def, alCambiar };
  const v = CFG(clave, def), lab = (vals.find(x => String(x[0]) === String(v)) || vals[0])[1];
  return `<div class="ajr"><div class="ajt"><b>${titulo}</b>${expl ? `<small>${expl}</small>` : ''}</div><button class="ajv f" data-go="ajc:${clave}">${esc(lab)}<i>›</i></button></div>`;
}
const boton = (go, txt, extra) => `<button class="btn f ${extra || ''}" data-go="aja:${go}">${txt}</button>`;
const fila = (k, v) => `<div class="fila"><span>${esc(k)}</span><b>${esc(v)}</b></div>`;

let ajPinOk = false;                                   // PIN ya puesto en esta visita a Ajustes
async function pinAjustesOk(){ if (!pinActivo() || ajPinOk) return true; if (await pidePin()) { ajPinOk = true; return true; } return false; }
async function abreAjustes(){
  ajPinOk = false;
  if (pinActivo() && CFG('pinAjustes', 'no') === 'si') { if (!(await pidePin())) return; ajPinOk = true; }
  if (typeof repBloqueo === 'function') repBloqueo();
  secAj = SECC[0]; pintaMenuAj(); pintaPanelAj(); muestra('ajustes');
}
function pintaMenuAj(){
  $('#ajMenu').innerHTML = SECC.map(s => `<button class="ajm f${s === secAj ? ' sel' : ''}" data-go="ajs:${s}">${ICJ[s]}<span>${t('aj_' + s)}</span></button>`).join('');
}
function pintaPanelAj(enfocar){
  const P = $('#ajPanel'), si = [['si', t('aj_si')], ['no', t('aj_no')]];
  let h = `<h2>${t('aj_' + secAj)}</h2>`;
  if (secAj === 'rep') {
    h += opcion('formato', 'Formato del directo', 'Automático va bien casi siempre. Si un servidor da cortes, prueba con el otro.', [['auto', 'Automático (recomendado)'], ['ts', 'MPEG-TS (.ts)'], ['m3u8', 'HLS (.m3u8)']], 'auto', () => {})
      + opcion('buffer', 'Memoria de reproducción (búfer)', 'Más búfer aguanta mejor los tirones de internet, pero tarda un poco más en arrancar.', [['normal', 'Normal'], ['grande', 'Grande (conexión lenta)'], ['max', 'Máxima']], 'normal', configNativo)
      + opcion('ajusteDef', 'Ajuste de imagen', 'Cómo encaja el vídeo en la pantalla.', [['0', 'Original'], ['1', 'Llenar'], ['2', 'Recortar'], ['3', '4:3']], String(lee('ajuste', 0)), v => ponAjuste(+v))
      + opcion('audio', 'Idioma de audio preferido', 'Si la película o el canal trae varios idiomas, empieza con este.', IDIOMAS_MEDIA, 'es', configNativo)
      + opcion('subs', 'Subtítulos', 'Activarlos automáticamente cuando el vídeo los traiga.', si, 'no', configNativo)
      + opcion('subsLang', 'Idioma de los subtítulos', '', IDIOMAS_MEDIA.slice(1), 'es', configNativo)
      + opcion('subsTam', 'Tamaño de los subtítulos', '', [['p', 'Pequeño'], ['n', 'Normal'], ['g', 'Grande'], ['mg', 'Muy grande']], 'n', configNativo)
      + `<p class="ajNota">El audio, los subtítulos y el búfer funcionan en la app instalada (APK). En el ordenador solo cuentan formato y ajuste de imagen.</p>`;
  }
  if (secAj === 'car') h += panelCarpetas();
  if (secAj === 'pin') {
    const act = pinActivo();
    h += `<div class="ajEstado ${act ? 'ok' : ''}">${act ? ICJ.candado + ' Control parental ACTIVADO' : ICJ.abierto + ' Control parental desactivado'}</div>`
      + `<div class="ajBtns">${act ? boton('pinCambia', 'Cambiar PIN') + boton('pinQuita', 'Quitar PIN') : boton('pinCrea', 'Crear PIN', 'pri')}</div>`
      + (act ? opcion('adultos', 'Carpetas de adultos', 'Las carpetas con nombres como XXX, Adultos o +18. Bloquear: se ven con candado y piden el PIN. Ocultar: no aparecen en la app.', [['si', 'Bloquear con PIN'], ['ocultar', 'Ocultar del todo'], ['no', 'No hacer nada']], 'si', () => { desbloq.clear(); })
             + opcion('pinAjustes', 'Pedir PIN para entrar en Ajustes', 'Así nadie puede quitar los bloqueos sin el PIN.', si, 'no', () => {}) : '')
      + `<div class="ajBtns">${boton('irCarpetas', ICJ.car + ' Bloquear u ocultar carpetas')}</div>`
      + `<p class="ajNota">Ahí marca <b>Bloquear</b> u <b>Ocultar</b> en las carpetas que quieras (está en <b>Ordenar → Carpetas</b>). Si olvidas el PIN, tu proveedor puede quitarlo desde el panel.</p>`;
  }
  if (secAj === 'apa') {
    const px = lee('txt_px', 14);
    h += `<div class="ajr"><div class="ajt"><b>Tamaño del texto</b><small>De 10 a 20. Normal: 14.</small></div><div class="ajPaso">${boton('txtMenos', '−')}<b>${px} px</b>${boton('txtMas', '+')}</div></div>`
      + opcion('idioma', 'Idioma de la app', '', IDIOMAS.map(([k, n]) => [k, n]), LANG, v => { LANG = v; guarda('lang', v); pintaTextos(); })
      + opcion('tema', 'Modo de color', 'Oscuro es el de siempre; claro va mejor con mucha luz.', [['oscuro', 'Oscuro'], ['claro', 'Claro']], 'oscuro', v => aplicaTema(v))
      + ['movie', 'series'].map(tp => `<h3>${tp === 'movie' ? t('peliculas') : t('series')}</h3>`
          + `<div class="ajr"><div class="ajt"><b>Carátulas por fila</b></div><div class="ajPaso">${boton('cols:' + tp + ':-1', '−')}<b>${lee('cols_' + tp, 5)}</b>${boton('cols:' + tp + ':1', '+')}</div></div>`
          + `<div class="ajr"><div class="ajt"><b>Vista</b></div><div class="ajPaso">${boton('vista:' + tp + ':grid', t('vGrid'), lee('vista_' + tp, 'grid') === 'grid' ? 'sel' : '')}${boton('vista:' + tp + ':lista', t('vLista'), lee('vista_' + tp, 'grid') === 'lista' ? 'sel' : '')}</div></div>`).join('');
  }
  if (secAj === 'cue') {
    const L = (LIC && LIC.lists) || [];
    h += `<div class="ajCodigo"><small>${t('codigoAparato')}</small><b>${esc(CODE)}</b></div>`
      + fila(t('estado'), LIC ? t('st_' + LIC.st) : '—') + fila('Plan', LIC ? LIC.plan || '—' : '—') + fila(t('fin'), LIC ? fecha(LIC.end) : '—')
      + fila(t('listasN'), L.map(l => l.name).join(', ') || '—') + fila(t('version'), 'v' + BRAND.version) + fila(t('sistema'), sistema())
      + `<div class="ajBtns">${boton('licencia', 'Comprobar mi licencia ahora', 'pri')}${LIC && LIC.support && (LIC.support.wa || LIC.support.tel) ? boton('soporte', t('soporte')) : ''}</div>`;
  }
  if (secAj === 'cue') {
    h += `<h3 id="ajLisTit">${t('aj_lis')}</h3>` + opcion('refresco', 'Actualizar las listas solas', 'Cada cuánto se vuelven a descargar los canales, películas y series.', [['6', 'Cada 6 horas'], ['12', 'Cada 12 horas'], ['24', 'Una vez al día'], ['0', 'Solo cuando yo lo pida']], '12', () => {})
      + opcion('epg', 'Ajuste horario de la guía', 'Si la guía va adelantada o atrasada respecto a la tele.', [-3, -2, -1, 0, 1, 2, 3].map(n => [String(n), n === 0 ? 'Sin ajuste' : (n > 0 ? '+' : '') + n + ' h']), '0', () => { for (const k in epgCache) delete epgCache[k]; })
      + `<div class="ajBtns">${boton('actualizar', 'Actualizar listas ahora', 'pri')}${boton('borrarMem', 'Borrar memoria de listas')}</div>`
      + `<p class="ajNota">Borrar la memoria hace que la próxima vez se descargue todo de nuevo. Útil si tu proveedor ha cambiado canales y no aparecen.</p>`;
  }
  if (secAj === 'rep') {
    h += `<h3>${t('aj_ava')}</h3>` + opcion('decoder', 'Decodificación de vídeo', 'Hardware usa el chip del aparato (recomendado). Software puede arreglar imágenes raras en algunos TV Box, pero gasta más.', [['auto', 'Hardware (recomendado)'], ['soft', 'Preferir software']], 'auto', configNativo)
      + opcion('tunel', 'Modo túnel (Android TV / TV Box)', 'En algunas teles va más suave y con el audio más sincronizado. Si ves algo raro, quítalo.', si, 'no', configNativo)
      + `<div class="ajBtns">${boton('borrarTodo', 'Borrar todos los datos de la app', 'peligro')}</div>`
      + `<p class="ajNota">Borrar los datos quita favoritos, carpetas, progreso de películas y ajustes. El código del aparato y la licencia no se pierden.</p>`;
  }
  P.innerHTML = h;
  if (enfocar) { const e = P.querySelector(`[data-go="${enfocar}"]`) || $('#ajMenu .sel'); if (e) enfoca(e); }
}
function panelCarpetas(){
  let h = `<div class="ajBtns tabs">${['live', 'movie', 'series'].map(tp => boton('carT:' + tp, t({ live:'tv', movie:'peliculas', series:'series' }[tp]), carTipo === tp ? 'sel' : '')).join('')}</div>`;
  if (!LISTA) return h + `<p class="ajNota">Carga primero una lista (entra en TV en vivo, Películas o Series una vez).</p>`;
  const b = baseC(carTipo), d = LISTA[carTipo], cuenta = {};
  d.items.forEach(it => { cuenta[it.g] = (cuenta[it.g] || 0) + 1; });
  let cats = d.cats.filter(c => cuenta[c.id]);
  const ord = lee('cord_' + b, null);
  if (ord) { const pos = new Map(ord.map((id, k) => [id, k])); cats = cats.map((c, k) => [c, pos.has(c.id) ? pos.get(c.id) : 1e5 + k]).sort((x, y) => x[1] - y[1]).map(x => x[0]); }
  const oc = new Set(lee('coc_' + b, [])), lk = new Set(lee('clock_' + b, [])), props = lee('cprop_' + b, []);
  h += `<div class="ajBtns">${boton('carNueva', ICJ.carMas + ' Nueva carpeta propia')}${boton('carOrig', 'Orden original')}</div>`;
  if (props.length) h += `<h3>${t('misCarpetas')}</h3>` + props.map(p => `<div class="ajc">${ICJ.car}<span>${esc(p.n)} <small>(${p.items.length})</small></span>${boton('carRen:' + p.id, ICJ.lapiz, 'ico')}${boton('carBorra:' + p.id, ICJ.papelera, 'ico')}</div>`).join('')
    + `<p class="ajNota">Para meter canales o títulos en tus carpetas, usa el botón ${ICJ.carMas} de la barra lateral mientras ves el canal o con el título elegido.</p>`;
  { const oc0 = new Set(lee('coc_' + b, [])), lk0 = new Set(lee('clock_' + b, []));
    const chk0 = (go, id, on, txt) => `<button class="btn f chk${on ? ' on' : ''}" data-go="aja:${go}:${id}"><i>${on ? '✓' : ''}</i>${txt}</button>`;
    h += `<h3>Carpetas especiales</h3>` + especialesDe(carTipo).map(c => `<div class="ajc${oc0.has(c.id) ? ' oculta' : ''}"><span>${esc(c.n)}</span>`
      + chk0('carLock', c.id, lk0.has(c.id), 'Bloquear') + chk0('carVer', c.id, oc0.has(c.id), 'Ocultar') + `</div>`).join(''); }
  h += `<h3>Carpetas de la lista</h3><p class="ajNota">▲▼ ordenar · <b>Bloquear</b>: se ve con candado y pide el PIN · <b>Ocultar</b>: desaparece de la app (ni en la lista, ni en "Todos", ni en el buscador).${pinActivo() ? ' Para cambiarlo se pide el PIN.' : ' Para bloquear hace falta crear antes un PIN en Control parental.'}</p>`;
  const adM = pinActivo() ? adultoModo() : 'no';
  h += cats.map((c, k) => { const ad = esAdulto(c.n) && adM !== 'no';
    const oc2 = oc.has(c.id) || (ad && adM === 'ocultar'), bl = lk.has(c.id) || (ad && adM === 'bloquear');
    const chk = (go, on, txt, auto) => `<button class="btn f chk${on ? ' on' : ''}${auto ? ' auto' : ''}" data-go="aja:${go}:${c.id}"><i>${on ? '✓' : ''}</i>${txt}</button>`;
    return `<div class="ajc${oc2 ? ' oculta' : ''}"><span>${esc(c.n)} <small>(${cuenta[c.id]})</small>${ad ? ' <small class="auto">· adultos</small>' : ''}</span>`
      + boton('carSube:' + c.id, ICJ.arriba, 'ico' + (k ? '' : ' nada')) + boton('carBaja:' + c.id, ICJ.abajo, 'ico' + (k < cats.length - 1 ? '' : ' nada'))
      + chk('carLock', bl, 'Bloquear', ad && adM === 'bloquear') + chk('carVer', oc2, 'Ocultar', ad && adM === 'ocultar') + `</div>`; }).join('');
  return h;
}
function ordenActual(tp){
  const b = baseC(tp), d = LISTA[tp], cuenta = {}; d.items.forEach(it => { cuenta[it.g] = 1; });
  let ids = d.cats.filter(c => cuenta[c.id]).map(c => c.id);
  const ord = lee('cord_' + b, null);
  if (ord) { const pos = new Map(ord.map((id, k) => [id, k])); ids = ids.map((id, k) => [id, pos.has(id) ? pos.get(id) : 1e5 + k]).sort((x, y) => x[1] - y[1]).map(x => x[0]); }
  return ids;
}
async function accionAj(go){
  const p = go.split(':'), q = p[1], x = p.slice(2).join(':');
  switch (q) {
    case 'actualizar': aviso(t('cargandoLista')); try { LISTA = null; await precargaLista(true); aviso('Listas actualizadas'); } catch (e) { aviso(t('errLista')); } break;
    case 'borrarMem': if (await pideConfirmar('Borrar memoria de listas', 'Se volverán a descargar la próxima vez que entres.')) {
        try { indexedDB.deleteDatabase('pepetv'); } catch (e) {} LISTA = null; aviso('Memoria borrada'); setTimeout(() => location.reload(), 600); } break;
    case 'pinCrea': case 'pinCambia': {
        if (q === 'pinCambia' && !(await pidePin())) break;
        const a1 = await pidePinDigitos(t('pinNuevo')); if (a1 == null) break;
        const a2 = await pidePinDigitos(t('pinRepite')); if (a2 == null) break;
        if (a1 !== a2) { aviso(t('pinNoCoincide')); break; }
        guarda('pin_h', hashPin(a1)); aviso(t('pinGuardado')); break; }
    case 'pinQuita': if (await pidePin()) { guarda('pin_h', ''); desbloq.clear(); aviso(t('pinQuitado')); } break;
    case 'txtMenos': ponTexto(lee('txt_px', 14) - 1); break;
    case 'txtMas': ponTexto(lee('txt_px', 14) + 1); break;
    case 'licencia': arranca(true); return;
    case 'soporte': contactaSoporte('gen'); return;
    case 'volver': atrasMovil(); return;
    case 'borrarTodo': if (await pideConfirmar('Borrar todos los datos', 'Se borran favoritos, carpetas, progreso y ajustes de este aparato. El código y la licencia se mantienen.')) {
        const code = lee('code'); try { localStorage.clear(); } catch (e) {} try { indexedDB.deleteDatabase('pepetv'); } catch (e) {}
        if (code) guarda('code', code); setTimeout(() => location.reload(), 300); } return;
    case 'carT': carTipo = x; break;
    case 'carNueva': { const n = (await pideTexto(t('nombreCarpeta'), '') || '').trim(); if (n) { const l = propiasDe(carTipo); l.push({ id: '__c:' + Date.now().toString(36), n: n.slice(0, 30), items: [] }); guardaPropias(carTipo, l); } break; }
    case 'carRen': { const l = propiasDe(carTipo), pp = l.find(z => z.id === x); if (!pp) break; const n = (await pideTexto(t('nombreCarpeta'), pp.n) || '').trim(); if (n) { pp.n = n.slice(0, 30); guardaPropias(carTipo, l); } break; }
    case 'carBorra': { const l = propiasDe(carTipo), pp = l.find(z => z.id === x); if (pp && await pideConfirmar('Borrar carpeta', '«' + pp.n + '» (los canales y títulos no se borran de la lista)')) guardaPropias(carTipo, l.filter(z => z.id !== x)); break; }
    case 'carOrig': guarda('cord_' + baseC(carTipo), null); guarda('coc_' + baseC(carTipo), []); break;
    case 'carVer': {
        const cat = LISTA[carTipo].cats.find(z => z.id === x);
        if (pinActivo() && adultoModo() === 'ocultar' && cat && esAdulto(cat.n)) { aviso('Esta se oculta sola por ser de adultos (puedes cambiarlo en Control parental)'); break; }
        if (!(await pinAjustesOk())) break;
        const k = 'coc_' + baseC(carTipo), s = new Set(lee(k, [])); s.has(x) ? s.delete(x) : s.add(x); guarda(k, [...s]); break; }
    case 'carSube': case 'carBaja': { const ids = ordenActual(carTipo), i = ids.indexOf(x), j = q === 'carSube' ? i - 1 : i + 1;
        if (i >= 0 && j >= 0 && j < ids.length) { [ids[i], ids[j]] = [ids[j], ids[i]]; guarda('cord_' + baseC(carTipo), ids); } break; }
    case 'carLock': {
        if (!pinActivo()) { aviso('Primero crea un PIN en Control parental'); break; }
        if (!(await pinAjustesOk())) break;
        const k = 'clock_' + baseC(carTipo), s = new Set(lee(k, [])), cat = LISTA[carTipo].cats.find(z => z.id === x);
        const auto = adultoModo() === 'bloquear' && cat && esAdulto(cat.n);
        if (s.has(x)) s.delete(x); else if (!auto) s.add(x); else aviso('Esta se bloquea sola por ser de adultos (puedes quitarlo en Control parental)');
        guarda(k, [...s]); break; }
    default:
      if (q === 'cols') { const [tp, d] = x.split(':'); guarda('cols_' + tp, Math.max(2, Math.min(8, lee('cols_' + tp, 5) + (+d)))); }
      else if (q === 'vista') { const [tp, v] = x.split(':'); guarda('vista_' + tp, v); }
  }
  pintaPanelAj(go);
}
function cambiaOpcion(clave){
  const o = OPC[clave]; if (!o) return;
  const v = CFG(clave, o.def), i = o.vals.findIndex(z => String(z[0]) === String(v)), n = o.vals[(i + 1) % o.vals.length][0];
  ponAJ(clave, n); if (o.alCambiar) o.alCambiar(n);
  pintaPanelAj('ajc:' + clave);
}

/* ---------- modo claro / oscuro ---------- */
const TEMA_CLARO = { '--bg':'#EEF2F8', '--bg2':'#FFFFFF', '--card':'#FFFFFF', '--card2':'#E6ECF5', '--line':'rgba(10,25,50,.13)', '--txt':'#0E1726', '--mut':'#56677F' };
function aplicaTema(v){
  const r = document.documentElement, st = r.style, bgOscuro = r.dataset.bgo || '';
  if (v === 'claro') { Object.keys(TEMA_CLARO).forEach(k => st.setProperty(k, TEMA_CLARO[k])); r.dataset.tema = 'claro'; }
  else { Object.keys(TEMA_CLARO).forEach(k => st.removeProperty(k)); if (bgOscuro) st.setProperty('--bg', bgOscuro); delete r.dataset.tema; }
}
setTimeout(() => aplicaTema(CFG('tema', 'oscuro')), 0);       // después de que se pongan los colores de la marca

/* ---------- reproductor nativo: le pasamos los ajustes ---------- */
function configNativo(){
  if (!NATP || !NATP.config) return;
  NATP.config({ buffer: CFG('buffer', 'normal'), audio: CFG('audio', 'es'), subs: CFG('subs', 'no') === 'si', subsLang: CFG('subsLang', 'es'),
                subsTam: { p: .75, n: 1, g: 1.35, mg: 1.7 }[CFG('subsTam', 'n')] || 1, soft: CFG('decoder', 'auto') === 'soft', tunel: CFG('tunel', 'no') === 'si' });
}
configNativo();

/* ---------- órdenes de los botones ---------- */
const _accion = accion;
accion = function(go){
  const p = go.split(':'), a = p[0];
  if (a === 'ajustes') return abreAjustes();
  if (a === 'ajs' && p[1] === 'car' && pinActivo() && !ajPinOk) { pinAjustesOk().then(ok => { if (ok) accion(go); }); return; }
  if (a === 'ajs') { secAj = p[1]; pintaMenuAj(); pintaPanelAj(); const e = $('#ajMenu .sel'); if (e) enfoca(e); return; }
  if (a === 'ajc') return cambiaOpcion(p[1]);
  if (a === 'aja') return accionAj(go);
  if (a === 'pin') return teclaPin(p[1]);
  if (a === 'ent') { const r = entRes; entRes = null; cierraVentana(); r && r(p[1] === 'si' ? $('#entTxt').value : null); return; }
  if (a === 'conf') { const r = confRes; confRes = null; cierraVentana(); r && r(p[1] === 'si'); return; }
  if (a === 'carp') return accionCarp(p[1], p.slice(2).join(':'));
  return _accion(go);
};
/* si se cierra una ventanita con "atrás", la promesa responde "cancelar" */
const _cierraV2 = cierraVentana;
cierraVentana = function(){
  const pinAbierto = $('#vPin').classList.contains('on'), entAbierto = $('#vEntrada').classList.contains('on'), confAbierto = $('#vConf').classList.contains('on');
  _cierraV2();
  if (pinAbierto && pinRes) { const r = pinRes; pinRes = null; r(null); }
  if (entAbierto && entRes) { const r = entRes; entRes = null; r(null); }
  if (confAbierto && confRes) { const r = confRes; confRes = null; r(false); }
};

/* al volver de Ajustes a una sección, se aplican los cambios (carpetas, apariencia…) */
const _muestra = muestra;
muestra = function(id, g){
  const antes = ($('.scr.on') || {}).id;
  _muestra(id, g);
  if (antes === 'ajustes' && id === 'sec') { refrescaCarpetas(); if (enGrid()) aplicaApariencia(); else { vItems.sucio = true; vItems.pinta(true); } }
};

/* 2.0: Tendencias bloqueada → no se pinta el escaparate hasta poner el PIN */
if (typeof pintaTend === 'function') { const _pTend = pintaTend; pintaTend = function(){ const c = S.cats[S.cat];
  if (c && c.id === '__tend' && c.lock && !desbloq.has('__tend')) { const td = document.getElementById('tend'); if (td) td.hidden = true; return; } return _pTend.apply(this, arguments); }; }
