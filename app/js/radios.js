/* ===================================================================
   RADIOS — directorio público Radio Browser (radio-browser.info)
   España primero; duplicadas fuera; rotas fuera; las más escuchadas arriba.
   =================================================================== */
const RADIO = {
  hosts: ['de1', 'de2', 'fi1', 'nl1', 'at1'].map(h => 'https://' + h + '.api.radio-browser.info'),
  host: 0, paises: null, cache: {}, busq: []
};
async function radioAPI(ruta){
  let ultimo;
  for (let n = 0; n < RADIO.hosts.length; n++) {
    const h = RADIO.hosts[(RADIO.host + n) % RADIO.hosts.length];
    try { const j = await redJSON(h + ruta, 25000); RADIO.host = (RADIO.host + n) % RADIO.hosts.length; return j; }
    catch (e) { ultimo = e; }
  }
  throw ultimo || new Error('radio');
}
const nombrePais = (() => { let d; try { d = new Intl.DisplayNames([LANG || 'es'], { type:'region' }); } catch (e) {}
  return (code, def) => { try { return (d && d.of(code)) || def; } catch (e) { return def; } }; })();

async function radioPaises(){
  if (RADIO.paises) return RADIO.paises;
  const c = await ALM.get('radio_paises');
  if (c && Date.now() - c.t < 7 * 864e5) return (RADIO.paises = c.v);
  const j = await radioAPI('/json/countries?hidebroken=true');
  const v = j.filter(p => p.iso_3166_1 && p.stationcount > 0)
    .map(p => ({ code: p.iso_3166_1.toUpperCase(), n: nombrePais(p.iso_3166_1.toUpperCase(), p.name), total: p.stationcount }));
  const unico = new Map(); v.forEach(p => { const o = unico.get(p.code); if (o) o.total += p.total; else unico.set(p.code, p); });
  const lista = [...unico.values()].sort((a, b) => a.code === 'ES' ? -1 : b.code === 'ES' ? 1 : a.n.localeCompare(b.n, 'es'));
  ALM.set('radio_paises', { t: Date.now(), v: lista });
  return (RADIO.paises = lista);
}
function radioLimpia(arr, g){
  const vistos = new Set(), out = [];
  for (const s of arr) {
    const u = s.url_resolved || s.url; if (!u || String(s.lastcheckok) === '0') continue;
    const k = String(s.name || '').toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g, '');
    if (!k || vistos.has(k) || vistos.has(u)) continue;
    vistos.add(k); vistos.add(u);
    out.push({ id: 'r' + s.stationuuid, uuid: s.stationuuid, n: String(s.name).trim(), l: s.favicon || '', u, g: g || s.countrycode,
      num: out.length + 1, tags: s.tags || '', codec: s.codec || '', br: +s.bitrate || 0, pais: s.country || '', est: s.state || '',
      lang: s.language || '', web: s.homepage || '', hls: +s.hls === 1 });
  }
  return out;
}
async function radioDePais(code){
  if (RADIO.cache[code]) return RADIO.cache[code];
  const c = await ALM.get('radio_' + code);
  if (c && Date.now() - c.t < 864e5) return (RADIO.cache[code] = c.v);
  const j = await radioAPI('/json/stations/bycountrycodeexact/' + code + '?hidebroken=true&order=clickcount&reverse=true&limit=3000');
  const v = radioLimpia(j, code);
  ALM.set('radio_' + code, { t: Date.now(), v });
  return (RADIO.cache[code] = v);
}
async function radioBusca(q){
  const j = await radioAPI('/json/stations/search?hidebroken=true&order=clickcount&reverse=true&limit=300&name=' + encodeURIComponent(q));
  return (RADIO.busq = radioLimpia(j, '__bus'));
}
function radioClic(it){ radioAPI('/json/url/' + it.uuid).catch(() => {}); }   // cortesía con el directorio

/* favoritos de radio: se guardan enteros porque no dependen de ninguna lista */
const radioFavs = () => lee('fav_radio_obj', []);
function radioCambiaFav(it){
  const f = radioFavs(), i = f.findIndex(x => x.id === it.id);
  if (i < 0) f.push(it); else f.splice(i, 1);
  guarda('fav_radio_obj', f); return i < 0;
}
const radioEsFav = id => radioFavs().some(x => x.id === id);
