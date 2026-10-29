/* ===================================================================
   LISTAS: lee Xtream, enlaces M3U y archivos M3U subidos al panel.
   Todo se guarda en el aparato (IndexedDB) para abrir rápido.
   =================================================================== */

/* ---------- red: en la APK usa la conexión nativa (sin bloqueos CORS) ---------- */
function red(url, ms){
  const C = window.Capacitor, H = C && C.Plugins && C.Plugins.CapacitorHttp;
  if (H && C.isNativePlatform && C.isNativePlatform() && /^https?:/i.test(url)) {
    return H.get({ url, responseType:'text', headers:{ 'User-Agent':'VLC/3.0.20 LibVLC/3.0.20', 'Accept':'*/*' },
                   connectTimeout:30000, readTimeout: ms || 180000 })
      .then(r => { if (r.status < 200 || r.status >= 300) throw new Error('HTTP ' + r.status);
                   return typeof r.data === 'string' ? r.data : JSON.stringify(r.data); });
  }
  const ctl = new AbortController(), tm = setTimeout(() => ctl.abort(), ms || 180000);
  /* navegador / iPhone: si el servidor no deja leerlo desde una web (CORS) o es http en una web https,
     se pide a través del panel de Google, que lo descarga y lo devuelve */
  const porPanel = () => fetch(BRAND.api + '?' + new URLSearchParams({ a:'red', d:CODE, s:SEC, u:url }), { signal: ctl.signal })
    .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
    .then(t => { if (t.charAt(0) === '{' && /^\{"ok":false/.test(t)) throw new Error(JSON.parse(t).err || 'panel'); return t; });
  const mixto = location.protocol === 'https:' && /^http:/i.test(url);
  const directo = mixto ? Promise.reject(new TypeError('mixto'))
    : fetch(url, { signal: ctl.signal }).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); });
  return directo.catch(e => (e instanceof TypeError && BRAND.api && /^https?:/i.test(url)) ? porPanel() : Promise.reject(e))
    .finally(() => clearTimeout(tm));
}
const redJSON = (u, ms) => red(u, ms).then(t => JSON.parse(t));

/* ---------- almacén local ---------- */
const ALM = (() => {
  let dbp;
  const db = () => dbp || (dbp = new Promise((ok, ko) => {
    const r = indexedDB.open('pepetv', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('kv');
    r.onsuccess = () => ok(r.result); r.onerror = () => ko(r.error);
  }));
  const op = (modo, fn) => db().then(d => new Promise((ok, ko) => {
    const tx = d.transaction('kv', modo), q = fn(tx.objectStore('kv'));
    tx.oncomplete = () => ok(q && q.result); tx.onerror = () => ko(tx.error);
  }));
  return {
    get: k => op('readonly', s => s.get(k)).catch(() => undefined),
    set: (k, v) => op('readwrite', s => s.put(v, k)).catch(() => {}),
    del: k => op('readwrite', s => s.delete(k)).catch(() => {})
  };
})();

/* ---------- utilidades ---------- */
function claveLista(l){
  const s = l.type === 'xtream' ? l.server + '|' + l.user : (l.url || l.file || l.name);
  let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return 'L' + (h >>> 0).toString(36);
}
function baseXtream(s){
  s = String(s || '').trim().replace(/\/+$/, '');
  if (!/^https?:\/\//i.test(s)) s = 'http://' + s;
  return s;
}
function b64(s){ try { return decodeURIComponent(escape(atob(s || ''))); } catch (e) { return s || ''; } }
const num = v => { const n = parseFloat(v); return isFinite(n) ? n : 0; };

/* ===================================================================
   CARGA DE UNA LISTA
   Devuelve { key, nombre, tipo, exp, live:{cats,items}, movie:{…}, series:{…} }
   cats  = [{id, n}]   en el orden del proveedor
   items = [{id, n, l(logo), g(carpeta), num, u(url)|sid, ext, epg, r(nota), a(añadido), y(año)}]
   =================================================================== */
/* cada cuántas horas se vuelve a leer la lista sola (Ajustes → Listas y guía; 0 = solo a mano) */
const VIGENCIA_H = () => { const h = +lee('cfg_refresco', 12); return h > 0 ? h : 1e6; };

async function cargaLista(l, forzar, avance){
  const key = claveLista(l);
  if (!forzar) {
    const c = await ALM.get('lista_' + key);
    if (c && Date.now() - c.t < VIGENCIA_H() * 3600e3) return c;
  }
  avance && avance('conectando');
  const d = l.type === 'xtream' ? await cargaXtream(l, avance) : await cargaM3U(l, avance);
  d.key = key; d.nombre = l.name; d.tipo = l.type; d.t = Date.now();
  await ALM.set('lista_' + key, d);
  return d;
}

/* ---------- Xtream ---------- */
async function cargaXtream(l, avance){
  const base = baseXtream(l.server), q = 'username=' + encodeURIComponent(l.user) + '&password=' + encodeURIComponent(l.pass);
  const api = base + '/player_api.php?' + q;
  const info = await redJSON(api, 30000);
  if (!info || !info.user_info || String(info.user_info.auth) !== '1') throw new Error('auth');
  const ui = info.user_info;
  const out = { exp: ui.exp_date ? num(ui.exp_date) * 1000 : 0,
                formatos: ui.allowed_output_formats || ['m3u8', 'ts'],
                x: { base, user: l.user, pass: l.pass } };
  const cats = arr => (Array.isArray(arr) ? arr : []).map(c => ({ id: String(c.category_id), n: String(c.category_name || '').trim() }));

  avance && avance('canales');
  const [lc, ls] = await Promise.all([redJSON(api + '&action=get_live_categories'), redJSON(api + '&action=get_live_streams')]);
  out.live = { cats: cats(lc), items: (ls || []).map(s => ({
    id: 'l' + s.stream_id, sid: s.stream_id, n: String(s.name || '').trim(), l: s.stream_icon || '',
    g: String(s.category_id), num: num(s.num), epg: s.epg_channel_id || '', arc: num(s.tv_archive) })) };

  avance && avance('peliculas');
  try {
    const [vc, vs] = await Promise.all([redJSON(api + '&action=get_vod_categories'), redJSON(api + '&action=get_vod_streams')]);
    out.movie = { cats: cats(vc), items: (vs || []).map(s => ({
      id: 'm' + s.stream_id, sid: s.stream_id, n: String(s.name || '').trim(), l: s.stream_icon || '', g: String(s.category_id),
      ext: s.container_extension || 'mp4', r: num(s.rating), a: num(s.added) * 1000, tmdb: s.tmdb || '' })) };
  } catch (e) { out.movie = { cats: [], items: [] }; }

  avance && avance('series');
  try {
    const [sc, ss] = await Promise.all([redJSON(api + '&action=get_series_categories'), redJSON(api + '&action=get_series')]);
    out.series = { cats: cats(sc), items: (ss || []).map(s => ({
      id: 's' + s.series_id, sid: s.series_id, n: String(s.name || '').trim(), l: s.cover || '', g: String(s.category_id),
      r: num(s.rating), a: num(s.last_modified) * 1000, y: String(s.releaseDate || s.release_date || '').slice(0, 4),
      gen: s.genre || '', plot: s.plot || '', cast: s.cast || '', dir: s.director || '' })) };
  } catch (e) { out.series = { cats: [], items: [] }; }
  return out;
}

function urlXtream(lista, it, tipo){
  const x = lista.x;
  if (tipo === 'live') {
    /* en la APK (reproductor nativo) el directo va mejor en .ts; en el navegador, en .m3u8 */
    const nat = typeof NATP !== 'undefined' && NATP, fm = lista.formatos || [];
    const pref = lee('cfg_formato', 'auto');                 // Ajustes → Reproductor → Formato del directo
    const f = window.IOS && !nat ? 'm3u8'                     // iPhone/iPad: Safari solo reproduce HLS
      : pref === 'ts' || pref === 'm3u8' ? pref : nat ? (fm.includes('ts') || !fm.length ? 'ts' : 'm3u8') : (fm.includes('m3u8') ? 'm3u8' : 'ts');
    return x.base + '/live/' + encodeURIComponent(x.user) + '/' + encodeURIComponent(x.pass) + '/' + it.sid + '.' + f;
  }
  if (tipo === 'movie') return x.base + '/movie/' + encodeURIComponent(x.user) + '/' + encodeURIComponent(x.pass) + '/' + it.sid + '.' + (it.ext || 'mp4');
  return '';
}
function urlCanal(lista, it){ return it.u || urlXtream(lista, it, 'live'); }

/* Guía corta (Xtream): ahora y lo siguiente */
const epgCache = {};
async function guiaCorta(lista, it){
  if (!lista.x || !it.sid) return [];
  const k = lista.key + it.sid, c = epgCache[k];
  if (c && Date.now() - c.t < 10 * 60e3) return c.v;
  const api = lista.x.base + '/player_api.php?username=' + encodeURIComponent(lista.x.user) + '&password=' + encodeURIComponent(lista.x.pass);
  try {
    const j = await redJSON(api + '&action=get_short_epg&stream_id=' + it.sid + '&limit=6', 20000);
    const v = (j.epg_listings || []).map(e => ({
      tit: b64(e.title), des: b64(e.description),
      ini: num(e.start_timestamp) * 1000 || Date.parse(String(e.start).replace(' ', 'T')),
      fin: num(e.stop_timestamp) * 1000 || Date.parse(String(e.end).replace(' ', 'T'))
    }));
    const off = (+lee('cfg_epg', 0) || 0) * 3600e3;          // Ajustes → desfase horario de la guía
    v.forEach(e => { e.ini += off; e.fin += off; });
    v.splice(0, v.length, ...v.filter(e => e.fin > Date.now()).sort((a, b) => a.ini - b.ini));
    epgCache[k] = { t: Date.now(), v };
    return v;
  } catch (e) { return []; }
}

/* ---------- M3U (enlace o archivo subido) ---------- */
async function cargaM3U(l, avance){
  const txt = await red(l.url);
  if (!/#EXTM3U|#EXTINF/i.test(txt.slice(0, 5000))) throw new Error('m3u');
  avance && avance('canales');
  return parseM3U(txt);
}
function parseM3U(txt){
  const lineas = txt.split(/\r?\n/), tipos = { live: new Map(), movie: new Map(), series: new Map() };
  const items = { live: [], movie: [], series: [] }, series = new Map();
  let inf = null, n = 0;
  const attr = (s, k) => { const m = s.match(new RegExp(k + '="([^"]*)"', 'i')); return m ? m[1].trim() : ''; };
  const carpeta = (t, nombre) => { const m = tipos[t]; if (!m.has(nombre)) m.set(nombre, String(m.size + 1)); return m.get(nombre); };
  for (let raw of lineas) {
    const s = raw.trim(); if (!s) continue;
    if (s.startsWith('#EXTINF')) {
      const coma = s.indexOf(',', s.lastIndexOf('"') > 0 ? s.lastIndexOf('"') : 0);
      inf = { n: (coma >= 0 ? s.slice(coma + 1) : '').trim() || attr(s, 'tvg-name'),
              l: attr(s, 'tvg-logo'), grp: attr(s, 'group-title') || 'Sin carpeta', epg: attr(s, 'tvg-id'), cn: num(attr(s, 'tvg-chno')) };
      continue;
    }
    if (s.startsWith('#EXTGRP:') && inf) { inf.grp = s.slice(8).trim() || inf.grp; continue; }
    if (s.startsWith('#')) continue;
    if (!inf) inf = { n: s.split('/').pop(), l: '', grp: 'Sin carpeta', epg: '', cn: 0 };
    const u = s, path = u.split('?')[0].toLowerCase();
    let t = 'live';
    if (/\/series\//.test(path)) t = 'series';
    else if (/\/movie\//.test(path) || /\.(mp4|mkv|avi|mov|wmv|m4v)$/.test(path)) t = /s\d{1,2}\s*e\d{1,3}/i.test(inf.n) ? 'series' : 'movie';
    n++;
    if (t === 'series') {
      const m = inf.n.match(/^(.*?)[\s._-]*s(\d{1,2})\s*e(\d{1,3})/i);
      const nom = (m ? m[1] : inf.n).replace(/[\s._-]+$/, '').trim() || inf.n;
      const g = carpeta('series', inf.grp), k = g + '|' + nom.toLowerCase();
      if (!series.has(k)) { const o = { id: 's' + n, n: nom, l: inf.l, g, eps: [] }; series.set(k, o); items.series.push(o); }
      series.get(k).eps.push({ id: 'e' + n, n: inf.n, u, t: m ? +m[2] : 1, e: m ? +m[3] : series.get(k).eps.length + 1, l: inf.l });
    } else {
      items[t].push({ id: t[0] + n, n: inf.n, l: inf.l, g: carpeta(t, inf.grp), u, epg: inf.epg, num: inf.cn || 0 });
    }
    inf = null;
  }
  const out = {};
  for (const t of ['live', 'movie', 'series']) out[t] = { cats: [...tipos[t]].map(([nombre, id]) => ({ id, n: nombre })), items: items[t] };
  let i = 0; out.live.items.forEach(it => { it.num = it.num || ++i; });
  return out;
}

/* ---------- favoritos y orden por lista ---------- */
function favs(lista, tipo){ return lee('fav_' + tipo + '_' + lista.key, []); }
function esFav(lista, tipo, id){ return favs(lista, tipo).includes(id); }
function cambiaFav(lista, tipo, id){
  const f = favs(lista, tipo), i = f.indexOf(id);
  if (i < 0) f.push(id); else f.splice(i, 1);
  guarda('fav_' + tipo + '_' + lista.key, f);
  return i < 0;
}
