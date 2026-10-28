/* ===================================================================
   PELÍCULAS
   - cuadrícula de carátulas (miles sin atascarse)
   - carpetas especiales: Favoritos, Tendencias ahora (ES), Añadidos recientemente, Vistos recientemente
   - ficha con reproductor, seguir viendo, tráiler, favorito
   =================================================================== */
Object.assign(TXT.es, {
  tendencias:'Tendencias ahora (ES)', recientes:'Añadidos recientemente', vistos:'Vistos recientemente', todas:'Todas las películas',
  semana:'Lo más visto esta semana', sinTend:'Aún no hay tendencias que coincidan con tu lista', cargandoTend:'Buscando tendencias…',
  sinVistos:'Aquí aparecerán las películas que empieces a ver', sinPelis:'No hay películas en esta carpeta',
  fLanz:'Fecha de lanzamiento', fGenero:'Género', fDuracion:'Duración', fDirector:'Director', fReparto:'Reparto', fDesc:'Descripción',
  reproducir:'Reproducir', continuar:'Continuar {t}', desdeInicio:'Desde el principio', trailer:'Tráiler', sinTrailer:'No hay tráiler para esta película',
  abrirYT:'Abrir en YouTube', pantallaCompleta:'Pantalla completa', noPeli:'No se puede reproducir esta película', visto:'Vista', buscarPhP:'Título de la película…'
});
Object.assign(TXT.en, {
  tendencias:'Trending now (ES)', recientes:'Recently added', vistos:'Recently watched', todas:'All movies',
  semana:'Top this week', sinTend:'No trending titles match your playlist yet', cargandoTend:'Looking for trends…',
  sinVistos:'Movies you start watching will appear here', sinPelis:'No movies in this folder',
  fLanz:'Release date', fGenero:'Genre', fDuracion:'Runtime', fDirector:'Director', fReparto:'Cast', fDesc:'Description',
  reproducir:'Play', continuar:'Resume {t}', desdeInicio:'From the start', trailer:'Trailer', sinTrailer:'No trailer for this movie',
  abrirYT:'Open in YouTube', pantallaCompleta:'Full screen', noPeli:'This movie cannot be played', visto:'Watched', buscarPhP:'Movie title…'
});

const ICP = {
  pausa:'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4.5" width="4" height="15" rx="1"/><rect x="14" y="4.5" width="4" height="15" rx="1"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l12.5-7.5z"/></svg>',
  reinicio:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v5h5"/></svg>',
  yt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.2.4-2.5.4-3.8s-.1-2.6-.4-3.8zM10 15V9l5.2 3z"/></svg>',
  atras:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  atr10:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 6v12L2.5 12zM21.5 6v12L13 12z"/></svg>',
  ade10:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 6v12l8.5-6zM2.5 6v12L11 12z"/></svg>',
  fuego:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1 3.5 5 5.6 5 10.4A5 5 0 0 1 12 22a5 5 0 0 1-5-5.2c0-2.3 1.2-3.8 2.3-4.9.2 1.6.9 2.6 1.9 3.1C10.6 11 11.6 6 12 2z"/></svg>',
  mas:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M4 7h11M4 12h11M4 17h7M18 14v6M15 17h6"/></svg>',
  ojo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z"/><circle cx="12" cy="12" r="3.2"/></svg>',
  star:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.5 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6-4.9-4.5 6.6-.8z"/></svg>'
};

/* ---------- maqueta: columna de carátulas + tendencias + ficha ---------- */
document.querySelector('#sec .sbody').insertAdjacentHTML('beforeend', `
  <div class="col cgrid" id="cGrid">
    <div class="vl" id="vGrid"><div class="esp"></div></div>
    <div class="vacio" id="gVacio" hidden></div>
    <div class="tend" id="tend" hidden></div>
  </div>`);
document.querySelector('#sec .smain').insertAdjacentHTML('beforeend', `
  <div class="ficha" id="ficha" hidden>
    <div class="fpos" id="fPos"></div>
    <div class="fbtns">
      <button class="rb f" data-go="pf:full">${IC.full}</button>
      <button class="rb f" data-go="pf:pausa" id="fbPausa">${ICP.pausa}</button>
      <button class="rb f" data-go="pf:reinicio">${ICP.reinicio}</button>
      <button class="rb f" data-go="pf:fav" id="fbFav">${IC.fav}</button>
      <button class="rb f" data-go="pf:trailer">${ICP.yt}</button>
      <button class="rb f" data-go="pf:atras">${ICP.atras}</button>
    </div>
    <div class="fder">
      <div class="fplayer" id="fPlayer"></div>
      <div class="finfo" id="fInfo"></div>
    </div>
    <div class="fcol3"><div class="facc" id="fAcc"></div><div class="banners" id="fBan" hidden></div></div>
  </div>`);
document.getElementById('pbox').insertAdjacentHTML('beforeend', `
  <div class="ftit" id="fTit"></div>
  <div class="vbar" id="vbar">
    <button class="vb" data-go="pf:atr">${ICP.atr10}</button>
    <button class="vb" data-go="pf:pausa" id="vbPausa">${ICP.pausa}</button>
    <span id="vT">00:00</span>
    <input type="range" id="vPos" min="0" max="1000" value="0">
    <span id="vD">00:00</span><span id="vRes" class="vres"></span>
    <button class="vb" data-go="pf:ade">${ICP.ade10}</button>
  </div>`);
document.body.insertAdjacentHTML('beforeend', `
<div class="velo" id="vTrailer"><div class="ven" style="width:min(94vw,calc(var(--u)*110))">
  <div class="yt" id="ytBox"></div>
  <div class="botones"><button class="btn f" id="ytAbrir" data-go="pf:yt" data-t="abrirYT"></button><button class="btn pri f" data-go="pf:cierraTrailer" data-t="cerrar"></button></div>
</div></div>`);
document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="css/peliculas.css">');

/* ===================================================================
   TMDB (fichas y tendencias)
   =================================================================== */
const TMDB_IMG = 'https://image.tmdb.org/t/p/';
const PLATAFORMAS = [[8, 'Netflix'], [119, 'Amazon Prime Video'], [350, 'Apple TV+'], [337, 'Disney+'], [1899, 'HBO Max'],
                     [2241, 'Movistar Plus+'], [1773, 'SkyShowtime'], [63, 'Filmin']];
function tmdb(ruta, q){
  if (!BRAND.tmdb) return Promise.reject(new Error('tmdb'));
  const u = 'https://api.themoviedb.org/3' + ruta + (ruta.includes('?') ? '&' : '?') + 'api_key=' + BRAND.tmdb + '&language=es-ES' + (q ? '&' + q : '');
  return fetch(u).then(r => { if (!r.ok) throw new Error('tmdb ' + r.status); return r.json(); });
}
/* título "limpio" para comparar: sin prefijos de país, calidad, año ni símbolos */
function normTit(s){
  return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/^\s*(\[[^\]]*\]|\([^)]*\)|[a-z]{2,4}\s*[|:\-–]\s*)+/i, '')
    .replace(/\b(4k|uhd|fhd|hd|sd|1080p?|720p?|2160p?|hdr|multi|dual|cast|castellano|latino|lat|vose|vos|subs?|mkv|mp4|x26[45]|hevc|h26[45]|screener|cam|ts)\b/g, ' ')
    .replace(/[([]?\b(19|20)\d{2}\b[)\]]?/g, ' ').replace(/&/g, ' y ').replace(/[^a-z0-9]+/g, ' ').trim();
}
const anioDe = s => { const m = String(s || '').match(/\b(19[3-9]\d|20[0-4]\d)\b/); return m ? m[1] : ''; };

const TENDS = { movie:{ key:null, filas:[], items:[], cargando:null }, series:{ key:null, filas:[], items:[], cargando:null } };
let TEND = TENDS.movie;
function usaTend(){ TEND = TENDS[S.tipo] || TENDS.movie; }
function indicePelis(tipo){
  tipo = tipo || 'movie'; const ck = '_idx_' + tipo;
  if (LISTA[ck]) return LISTA[ck];
  const porT = new Map(), porId = new Map();
  for (const it of LISTA[tipo].items) {
    if (it.tmdb) porId.set(String(it.tmdb), it);
    const k = normTit(it.n); if (k && !porT.has(k)) porT.set(k, it);
  }
  return (LISTA[ck] = { porT, porId });
}
function casa(r, tipo){
  const { porT, porId } = indicePelis(tipo);
  return porId.get(String(r.id)) || porT.get(normTit(r.title)) || porT.get(normTit(r.original_title)) || null;
}
async function cargaTendencias(forzado){
  const tipo = forzado || (S.tipo === 'series' ? 'series' : 'movie'), T = TENDS[tipo], tv = tipo === 'series' ? 'tv' : 'movie';
  if (!BRAND.tmdb || !LISTA || !LISTA[tipo].items.length) return T;
  if (T.key === LISTA.key && T.filas.length) return T;
  if (T.cargando) return T.cargando;
  T.cargando = (async () => {
    const c = await ALM.get('tend2_' + tipo + '_' + LISTA.key);
    let crudo = c && Date.now() - c.t < 6 * 3600e3 ? c.v : null;
    if (!crudo) {
      const pide = async (ruta, q) => { const out = [];
        for (const p of [1, 2]) { try { const j = await tmdb(ruta, q + '&page=' + p); out.push(...(j.results || [])); } catch (e) { break; } }
        return out.map(r => ({ id:r.id, title:r.title || r.name, original_title:r.original_title || r.original_name, vote:r.vote_average, poster:r.poster_path, bd:r.backdrop_path })); };
      const filas = [{ n:t('semana'), r: await pide('/trending/' + tv + '/week', '') }];
      for (const [id, n] of PLATAFORMAS)
        filas.push({ n, r: await pide('/discover/' + tv, 'watch_region=ES&with_watch_providers=' + id + '&sort_by=popularity.desc&vote_count.gte=20') });
      crudo = filas; ALM.set('tend2_' + tipo + '_' + LISTA.key, { t: Date.now(), v: crudo });
    }
    const vistos = new Set(), todos = [];
    const filas = crudo.map(f => {
      const its = []; const ya = new Set();
      for (const r of f.r) { const it = casa(r, tipo); if (it && !ya.has(it.id)) { ya.add(it.id); its.push({ it, r }); if (!vistos.has(it.id)) { vistos.add(it.id); todos.push(it); } } if (its.length >= 20) break; }
      return { n: f.n, its };
    }).filter(f => f.its.length);
    TENDS[tipo] = { key: LISTA.key, filas, items: todos, cargando: null }; usaTend();
    return TENDS[tipo];
  })().catch(() => { T.cargando = null; return T; });
  return T.cargando;
}

/* ===================================================================
   CARPETAS ESPECIALES
   =================================================================== */
const vistosPelis = () => lee('vis_' + S.tipo + '_' + LISTA.key, []);
function carpetasEspeciales(){
  if (!enGrid()) return;
  usaTend();
  if (BRAND.tmdb) S.cats.push({ id:'__tend', n:t('tendencias'), total: TEND.key === LISTA.key ? TEND.items.length : 0, ico:ICP.fuego });
  if (LISTA[S.tipo].items.some(x => x.a)) S.cats.push({ id:'__new', n:t('recientes'), total: Math.min(100, LISTA[S.tipo].items.filter(x => x.a).length), ico:ICP.mas });
  S.cats.push({ id:'__vis', n:t('vistos'), total: vistosPelis().length, ico:ICP.ojo });
}
function itemsEspecial(cat){
  if (!enGrid()) return null;
  const d = LISTA[S.tipo].items;
  if (cat.id === '__tend') return TEND.key === LISTA.key ? TEND.items : [];
  if (cat.id === '__new') return d.filter(x => x.a).sort((a, b) => b.a - a.a).slice(0, 100);
  if (cat.id === '__vis') { const m = new Map(d.map(x => [x.id, x])); return vistosPelis().map(v => m.get(v.id)).filter(Boolean); }
  return null;
}

/* ===================================================================
   CUADRÍCULA DE CARÁTULAS
   =================================================================== */
const enGrid = () => S.tipo === 'movie' || S.tipo === 'series';
let COLS = () => matchMedia('(orientation:portrait)').matches ? 3 : 5;
const PG = { foco:false };      // ¿el foco del mando está en la cuadrícula?

function htmlPoster(it, k, foco){
  const r = it.r ? (+it.r).toFixed(1) : '', fv = esFavX(it.id), vis = (lee('vis_' + S.tipo + '_' + LISTA.key, []).find(v => v.id === it.id));
  const pct = vis && vis.dur ? Math.min(100, vis.pos / vis.dur * 100) : 0;
  return `<div class="pos${foco ? ' foc' : ''}" data-k="${k}">
    ${it.l ? `<img src="${esc(it.l)}" loading="lazy" alt="" onerror="this.remove()">` : ''}
    <div class="pini">${esc(iniciales(it.n))}</div>
    ${r && r !== '0.0' ? `<span class="nota">${ICP.star}${r}</span>` : ''}
    <span class="pfav${fv ? ' si' : ''}">${IC.fav}</span>
    <div class="ptit">${esc(it.n)}</div>
    ${pct ? `<div class="pprog"><i style="width:${pct}%"></i></div>` : ''}
  </div>`;
}
class VGrid extends VLista {
  h(){ const c = COLS(), gap = Math.round(UPX * .8), w = (this.el.clientWidth - gap * (c - 1) - 6) / c; return Math.max(60, Math.round(w * 1.5)); }
}
const htmlFila = i => { const c = COLS(); let s = '';
  for (let k = i * c; k < Math.min(S.items.length, i * c + c); k++) s += htmlPoster(S.items[k], k, PG.foco && S.zona === 'items' && k === S.it);
  return s; };
htmlFila.cls = 'gfila';
const vGrid = new VGrid(document.getElementById('vGrid'), () => 0, htmlFila, () => {});
vGrid.sinFoc = true;
document.getElementById('vGrid').addEventListener('click', e => {
  const p = e.target.closest('.pos'); if (!p) return; const k = +p.dataset.k;
  if (e.target.closest('.pfav')) { S.it = k; favActual(); return; }
  S.zona = 'items'; S.it = k; marcaGrid(); abreFicha(S.items[k]);
});
addEventListener('resize', () => { if (enGrid()) vGrid.pinta(true); });

function gridCat(c){
  const tv = document.getElementById('tend'), vl = document.getElementById('vGrid'), va = document.getElementById('gVacio');
  const esTend = c.id === '__tend';
  tv.hidden = !esTend; vl.hidden = esTend;
  if (esTend) { pintaTend(); va.hidden = true; return; }
  vGrid.pon(Math.ceil(S.items.length / COLS()));
  va.hidden = S.items.length > 0;
  va.textContent = c.id === '__fav' ? t('sinFavs').replace(/canal/g, 'título') : c.id === '__vis' ? t(S.tipo === 'series' ? 'sinVistosS' : 'sinVistos') : t(S.tipo === 'series' ? 'sinSeries' : 'sinPelis');
}
function marcaGrid(){
  if (!enGrid()) return;
  PG.foco = S.zona === 'items';
  const c = S.cats[S.cat];
  if (c && c.id === '__tend') { pintaTendFoco(); return; }
  vGrid.marca(PG.foco ? Math.floor(S.it / COLS()) : -1);
}

/* ---------- tendencias: una fila por plataforma ---------- */
const TF = { f:0, c:0 };
async function pintaTend(){
  const tv = document.getElementById('tend');
  if (TEND.key !== LISTA.key) {
    tv.innerHTML = `<div class="vacio"><div><div class="sp" style="margin:0 auto calc(var(--u)*1)"></div>${t('cargandoTend')}</div></div>`;
    await cargaTendencias();
    const c = S.cats.find(x => x.id === '__tend'); if (c) { c.total = TEND.items.length; vCats.marca(); }
    if (S.cats[S.cat] && S.cats[S.cat].id === '__tend') { S.items = TEND.items; } else return;
  }
  if (!TEND.filas.length) { tv.innerHTML = `<div class="vacio">${t('sinTend')}</div>`; return; }
  tv.innerHTML = TEND.filas.map((f, fi) => `<div class="tfila"><h4>${esc(f.n)}</h4><div class="tcar" data-f="${fi}">${
    f.its.map(({ it }, ci) => `<div class="tpos" data-f="${fi}" data-c="${ci}"><span class="trank">${ci + 1}</span>${htmlPoster(it, -1, false)}</div>`).join('')}</div></div>`).join('');
  TF.f = Math.min(TF.f, TEND.filas.length - 1); pintaTendFoco();
}
function pintaTendFoco(){
  document.querySelectorAll('#tend .tpos.foc').forEach(x => x.classList.remove('foc'));
  if (!(PG.foco && S.zona === 'items')) return;
  const el = document.querySelector(`#tend .tpos[data-f="${TF.f}"][data-c="${TF.c}"]`);
  if (el) { el.classList.add('foc'); el.scrollIntoView({ block:'nearest', inline:'nearest' }); }
}
document.getElementById('tend').addEventListener('click', e => {
  const p = e.target.closest('.tpos'); if (!p) return;
  TF.f = +p.dataset.f; TF.c = +p.dataset.c; S.zona = 'items'; PG.foco = true; pintaTendFoco();
  abreFicha(TEND.filas[TF.f].its[TF.c].it);
});

/* ===================================================================
   FICHA + REPRODUCTOR DE PELÍCULA
   =================================================================== */
const PF = { it:null, info:null, abierta:false, activa:false, tGuarda:0 };
const vodActivo = () => PF.activa || (typeof SF !== 'undefined' && SF.activa);
const hms = s => { s = Math.max(0, Math.floor(s || 0)); const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60;
  return (h ? h + ':' + String(m).padStart(2, '0') : String(m).padStart(2, '0')) + ':' + String(x).padStart(2, '0'); };

async function infoPeli(it){
  if (it._info) return it._info;
  let o = { tit: it.n, poster: it.l, r: it.r, anio: anioDe(it.n) };
  if (LISTA.x && it.sid) {
    try {
      const api = LISTA.x.base + '/player_api.php?username=' + encodeURIComponent(LISTA.x.user) + '&password=' + encodeURIComponent(LISTA.x.pass);
      const j = await redJSON(api + '&action=get_vod_info&vod_id=' + it.sid, 20000), i = (j && j.info) || {};
      o = Object.assign(o, { poster: i.cover_big || i.movie_image || it.l, fondo: (i.backdrop_path && i.backdrop_path[0]) || '',
        fecha: i.releasedate || i.release_date || '', genero: i.genre || '', dur: i.duration || '', dir: i.director || '',
        reparto: i.cast || i.actors || '', desc: i.plot || i.description || '', yt: i.youtube_trailer || '', tmdb: i.tmdb_id || it.tmdb || '',
        r: +i.rating || it.r });
    } catch (e) {}
  }
  if (BRAND.tmdb && (!o.desc || !o.poster || !o.fondo || !o.yt)) {
    try {
      let id = o.tmdb;
      if (!id) { const anio = o.anio, q = normTit(it.n);
        const s = await tmdb('/search/movie', 'query=' + encodeURIComponent(q) + (anio ? '&year=' + anio : ''));
        const r = (s.results || [])[0] || (anio ? ((await tmdb('/search/movie', 'query=' + encodeURIComponent(q))).results || [])[0] : null); id = r && r.id; }
      if (id) {
        const m = await tmdb('/movie/' + id, 'append_to_response=videos,credits&include_video_language=es,en');
        const vs = (m.videos && m.videos.results) || [], vtr = vs.find(v => v.site === 'YouTube' && v.type === 'Trailer') || vs.find(v => v.site === 'YouTube');
        o.desc = o.desc || m.overview || ''; o.poster = o.poster || (m.poster_path ? TMDB_IMG + 'w500' + m.poster_path : '');
        o.fondo = o.fondo || (m.backdrop_path ? TMDB_IMG + 'w1280' + m.backdrop_path : '');
        o.fecha = o.fecha || m.release_date || ''; o.genero = o.genero || (m.genres || []).map(g => g.name).join(', ');
        o.dur = o.dur || (m.runtime ? Math.floor(m.runtime / 60) + 'h ' + m.runtime % 60 + 'min' : '');
        o.dir = o.dir || ((m.credits && m.credits.crew) || []).filter(c => c.job === 'Director').map(c => c.name).join(', ');
        o.reparto = o.reparto || ((m.credits && m.credits.cast) || []).slice(0, 8).map(c => c.name).join(', ');
        o.yt = o.yt || (vtr ? vtr.key : ''); o.r = o.r || m.vote_average;
      }
    } catch (e) {}
  }
  return (it._info = o);
}
function urlPeli(it){ return it.u || urlXtream(LISTA, it, 'movie'); }

async function abreFicha(it){
  if (!it) return;
  if (S.tipo === 'series') return abreSerie(it);
  PF.it = it; PF.abierta = true; PF.activa = false;
  const sec = document.getElementById('sec'); sec.classList.add('enficha');
  document.getElementById('ficha').hidden = false;
  document.getElementById('fPlayer').appendChild(document.getElementById('pbox'));
  const pb = document.getElementById('pbox'); pb.classList.add('vod'); pb.classList.remove('radio');
  paraVideo(); msgPlayer(''); S.jugando = null;
  document.getElementById('pFondo').style.display = 'none';
  pintaFicha({ tit: it.n, poster: it.l, r: it.r });
  const o = await infoPeli(it); if (PF.it !== it) return;
  pintaFicha(o);
}
function pintaFicha(o){
  const it = PF.it, r = o.r ? (+o.r).toFixed(1) : '';
  document.getElementById('fPos').innerHTML = `${o.poster ? `<img src="${esc(o.poster)}" alt="" onerror="this.remove()">` : ''}<div class="pini">${esc(iniciales(it.n))}</div>
    ${r && r !== '0.0' ? `<span class="nota">${ICP.star}${r}</span>` : ''}<span class="pfav${esFavX(it.id) ? ' si' : ''}">${IC.fav}</span>`;
  const est = Math.round((+o.r || 0) / 2);
  document.getElementById('fTit').innerHTML = `<div class="ffondo" style="${o.fondo ? `background-image:url('${esc(o.fondo)}')` : ''}"></div>
    <div class="ftxt"><h2>${esc(o.tit)}</h2>${o.genero ? `<div>${esc(o.genero)}</div>` : ''}
    ${o.r ? `<div class="estrellas">${[1, 2, 3, 4, 5].map(n => `<i class="${n <= est ? 'si' : ''}">${ICP.star}</i>`).join('')}</div>` : ''}
    ${o.fecha ? `<small>${t('fLanz')}: ${esc(o.fecha)}</small>` : ''}</div>`;
  pintaAcc();
  const fila = (k, x) => x ? `<div class="fi"><b>${t(k)}:</b><span>${esc(x)}</span></div>` : '';
  document.getElementById('fInfo').innerHTML = fila('fLanz', o.fecha) + fila('fGenero', o.genero) + fila('fDuracion', o.dur) + fila('fDirector', o.dir) + fila('fReparto', o.reparto) + fila('fDesc', o.desc);
  document.getElementById('fTit').classList.toggle('oculto', PF.activa);
  if (!PF.activa) enfocaPrimero(document.getElementById('fAcc'));
}
function pintaAcc(){
  const it = PF.it; if (!it) return;
  const v = lee('vis_movie_' + LISTA.key, []).find(x => x.id === it.id);
  const sigue = v && v.pos > 60 && (!v.dur || v.pos < v.dur - 120);
  document.getElementById('pbox').classList.toggle('activa', PF.activa);
  document.getElementById('fAcc').innerHTML = PF.activa
    ? `<button class="btn f" data-go="pf:reinicio">${ICP.reinicio}<span>${t('desdeInicio')}</span></button>`
    : sigue
    ? `<button class="btn pri f" data-go="pf:continuar">${ICP.play}<span>${t('continuar', { t: hms(v.pos) })}</span></button><button class="btn f" data-go="pf:inicio">${ICP.reinicio}<span>${t('desdeInicio')}</span></button>`
    : `<button class="btn pri f" data-go="pf:inicio">${ICP.play}<span>${t('reproducir')}</span></button>`;
}
function cierraFicha(){
  guardaPos(true); paraVideo(); msgPlayer('');
  PF.abierta = false; PF.activa = false; pantallaCompleta(false);
  const pb = document.getElementById('pbox'); pb.classList.remove('vod', 'activa');
  document.querySelector('#sec .pcol').insertBefore(pb, document.getElementById('guia'));
  document.getElementById('pFondo').style.display = ''; fondoPlayer(null);
  document.getElementById('ficha').hidden = true; document.getElementById('sec').classList.remove('enficha');
  document.querySelectorAll('#ficha .kf').forEach(x => x.classList.remove('kf'));
  const c = S.cats[S.cat]; if (c) { const vi = S.cats.find(x => x.id === '__vis'); if (vi) vi.total = vistosPelis().length; vCats.marca(); }
  if (c && c.id === '__vis') { const id = PF.it && PF.it.id; eligeCat(S.cat); S.it = Math.max(0, S.items.findIndex(x => x.id === id)); }
  S.zona = 'items'; marcaGrid(); document.activeElement && document.activeElement.blur && document.activeElement.blur();
}
function reproducePeli(desde){
  const it = PF.it; if (!it) return;
  PF.activa = true; document.getElementById('fTit').classList.add('oculto'); pintaAcc();
  msgPlayer(`<div><div class="sp"></div>${t('conectandoCanal')}</div>`);
  motor(urlPeli(it), () => { if (PF.it === it) msgPlayer(`<div>${t('noPeli')}<br><small style="color:var(--mut)">${esc(it.n)}</small></div>`); }, { directo:false, desde: desde || 0 });
  muestraVbar();          // 2.3: empieza en la ficha; a pantalla completa solo si lo pide el cliente
}
function guardaPos(forzar){
  if (!PF.activa || !PF.it || !vid.duration || !isFinite(vid.duration)) return;
  const now = Date.now(); if (!forzar && now - PF.tGuarda < 5000) return; PF.tGuarda = now;
  const k = 'vis_movie_' + LISTA.key, l = lee(k, []).filter(x => x.id !== PF.it.id);
  l.unshift({ id: PF.it.id, pos: vid.currentTime, dur: vid.duration, t: now });
  guarda(k, l.slice(0, 60));
}
vid.addEventListener('timeupdate', () => {
  if (!vodActivo()) return; if (PF.activa) guardaPos(); else guardaPosSerie();
  const d = vid.duration, c = vid.currentTime;
  document.getElementById('vT').textContent = hms(c);
  document.getElementById('vD').textContent = isFinite(d) ? hms(d) : '--:--';
  if (isFinite(d) && d > 0 && !PF.arrastra) document.getElementById('vPos').value = Math.round(c / d * 1000);
  document.getElementById('vRes').textContent = vid.videoWidth ? vid.videoWidth + ' x ' + vid.videoHeight : '';
});
['play', 'pause'].forEach(ev => vid.addEventListener(ev, () => {
  const h = vid.paused ? ICP.play : ICP.pausa; document.getElementById('vbPausa').innerHTML = h; document.getElementById('fbPausa').innerHTML = h; }));
vid.addEventListener('ended', () => { if (typeof SF !== 'undefined' && SF.activa) return finEpisodio(); if (PF.activa) { guardaPos(true); pantallaCompleta(false); PF.activa = false; pintaAcc(); enfocaPrimero(document.getElementById('fAcc')); } });
const vPos = document.getElementById('vPos');
vPos.addEventListener('input', () => { PF.arrastra = true; });
vPos.addEventListener('change', () => { PF.arrastra = false; if (isFinite(vid.duration)) vid.currentTime = vPos.value / 1000 * vid.duration; });

let tVbar;
function muestraVbar(){ const b = document.getElementById('vbar'), p = document.getElementById('pbar'); b.classList.remove('oculto'); p.classList.remove('oculto'); clearTimeout(tVbar);
  tVbar = setTimeout(() => { if (!vid.paused && (PF.activa || (typeof SF !== 'undefined' && SF.activa))) { b.classList.add('oculto'); p.classList.add('oculto'); } }, 4000); }
function salta(s){ if (!vodActivo()) return; try { vid.currentTime = Math.max(0, Math.min((vid.duration || 1e9) - 1, vid.currentTime + s)); } catch (e) {} muestraVbar(); }

function trailer(o){
  o = o || (PF.it && PF.it._info);
  if (!o || !o.yt) { aviso(t('sinTrailer')); return; }
  if (vodActivo() && !vid.paused) vid.pause();
  document.getElementById('ytBox').innerHTML = `<iframe src="https://www.youtube.com/embed/${encodeURIComponent(o.yt)}?autoplay=1&rel=0" allow="autoplay; encrypted-media; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
  abreVentana('vTrailer');
}
function accionPeli(a){
  switch (a) {
    case 'inicio': reproducePeli(0); break;
    case 'continuar': { const v = lee('vis_movie_' + LISTA.key, []).find(x => x.id === PF.it.id); reproducePeli(v ? v.pos : 0); break; }
    case 'full': if (PF.activa) pantallaCompleta(true); else reproducePeli(0); break;
    case 'pausa': if (!PF.activa) { reproducePeli(0); break; } if (vid.paused) vid.play().catch(() => {}); else vid.pause(); muestraVbar(); break;
    case 'reinicio': if (PF.activa) { vid.currentTime = 0; vid.play().catch(() => {}); } else reproducePeli(0); break;
    case 'fav': aviso(t(cambiaFav(LISTA, S.tipo, PF.it.id) ? 'favSi' : 'favNo')); document.querySelector('#fPos .pfav').classList.toggle('si', esFavX(PF.it.id));
      S.cats[0].total = favs(LISTA, S.tipo).length; vCats.marca(); break;
    case 'trailer': trailer(); break;
    case 'atras': cierraFicha(); break;
    case 'atr': salta(-10); break;
    case 'ade': salta(10); break;
    case 'yt': { const o = (typeof SF !== 'undefined' && SF.abierta ? SF.info : PF.it._info) || {}; window.open('https://www.youtube.com/watch?v=' + encodeURIComponent(o.yt), '_blank'); break; }
    case 'cierraTrailer': document.getElementById('ytBox').innerHTML = ''; cierraVentana(); break;
  }
}

/* ---------- mando en películas ---------- */
function teclaPelis(e){
  if (!enGrid()) return undefined;
  const k = e.key, c = e.keyCode, atrasK = k === 'Escape' || k === 'Backspace' || k === 'GoBack' || c === 10009 || c === 461 || c === 4;
  const full = document.body.classList.contains('full');
  if (typeof SF !== 'undefined' && SF.abierta) return teclaSerie(e, atrasK, full);
  if (PF.abierta) {
    if (full) {
      if (atrasK) { pantallaCompleta(false); pintaAcc(); enfocaPrimero(document.getElementById('fAcc')); }
      else if (k === 'ArrowLeft' || k === 'ArrowRight') salta((k === 'ArrowRight' ? 1 : -1) * (e.repeat ? 30 : 10));
      else if (k === 'Enter' || k === ' ' || k === 'MediaPlayPause' || c === 179) accionPeli('pausa');
      else if (k === 'ArrowUp' || k === 'ArrowDown') muestraVbar();
      else return true;
      e.preventDefault(); return true;
    }
    if (atrasK) { e.preventDefault(); cierraFicha(); return true; }
    if (/^[0-9]$/.test(k)) return true;
    return false;                                   // flechas y OK: navegación normal por los botones
  }
  if (/^[0-9]$/.test(k)) { e.preventDefault(); return true; }
  if (S.zona !== 'items') return undefined;          // carril y carpetas: lo de siempre
  const cat = S.cats[S.cat];
  if (atrasK) { S.zona = 'cats'; marcaZonas(); e.preventDefault(); return true; }
  if (cat && cat.id === '__tend') {
    const F = TEND.filas; if (!F.length) { if (k === 'ArrowLeft') { S.zona = 'cats'; marcaZonas(); } e.preventDefault(); return true; }
    if (k === 'ArrowUp') TF.f = Math.max(0, TF.f - 1);
    else if (k === 'ArrowDown') TF.f = Math.min(F.length - 1, TF.f + 1);
    else if (k === 'ArrowLeft') { if (TF.c === 0) { S.zona = 'cats'; marcaZonas(); e.preventDefault(); return true; } TF.c--; }
    else if (k === 'ArrowRight') TF.c++;
    else if (k === 'Enter') { const x = F[TF.f].its[TF.c]; if (x) abreFicha(x.it); e.preventDefault(); return true; }
    else return undefined;
    TF.c = Math.max(0, Math.min(F[TF.f].its.length - 1, TF.c)); pintaTendFoco(); e.preventDefault(); return true;
  }
  const n = S.items.length, C = COLS();
  if (k === 'ArrowLeft') { if (S.it % C === 0 || !n) { S.zona = 'cats'; marcaZonas(); } else S.it--; }
  else if (k === 'ArrowRight') { if (S.it % C < C - 1 && S.it < n - 1) S.it++; }
  else if (k === 'ArrowUp' || k === 'PageUp') S.it = Math.max(S.it % C, S.it - C * (k === 'PageUp' ? 3 : 1));
  else if (k === 'ArrowDown' || k === 'PageDown') { const d = S.it + C * (k === 'PageDown' ? 3 : 1); S.it = d < n ? d : (Math.floor((n - 1) / C) > Math.floor(S.it / C) ? n - 1 : S.it); }
  else if (k === 'Enter') { abreFicha(S.items[S.it]); e.preventDefault(); return true; }
  else return undefined;
  marcaGrid(); e.preventDefault(); return true;
}

/* al cerrar cualquier ventana, para el tráiler */
const _cierraV = cierraVentana;
cierraVentana = function(){ const y = document.getElementById('ytBox'); if (y) y.innerHTML = ''; _cierraV(); };

/* 1.8: la barra de progreso se esconde sola a los 4 s también con el reproductor pequeño (no solo en pantalla completa);
   vuelve al mover el ratón, tocar el vídeo o al pausar */
(function(){
  const vivo = () => PF.activa || (typeof SF !== 'undefined' && SF.activa);
  const pb = document.getElementById('pbox');
  ['mousemove', 'touchstart', 'click'].forEach(ev => pb.addEventListener(ev, () => { if (vivo()) muestraVbar(); }, { passive: true }));
  vid.addEventListener('play', () => { if (vivo()) muestraVbar(); });
  vid.addEventListener('pause', () => { if (vivo()) muestraVbar(); });
})();

/* 2.0: la carátula ocupa todo el alto de la ficha con su forma (2:3). Se mide el alto real y el ancho sale de ahí. */
(function(){
  const mide = el => { if (!el || el.hidden) return; const h = el.clientHeight; if (h > 50) { el.style.setProperty('--altoF', h + 'px'); el.classList.add('medida'); } };
  const fs = () => [document.getElementById('ficha'), document.getElementById('serie')];
  if (window.ResizeObserver) { const ro = new ResizeObserver(es => es.forEach(e => mide(e.target))); setTimeout(() => fs().forEach(f => f && ro.observe(f)), 0); }
  addEventListener('resize', () => fs().forEach(mide));
  new MutationObserver(() => fs().forEach(mide)).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['hidden'] });
})();
