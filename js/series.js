/* ===================================================================
   SERIES — ficha: carátula + temporadas | episodios | reproductor + información
   Seguir viendo, siguiente episodio automático, idioma del audio (HLS)
   =================================================================== */
Object.assign(TXT.es, {
  todasS:'Todas las series', sinSeries:'No hay series en esta carpeta', sinVistosS:'Aquí aparecerán las series que empieces a ver',
  buscarPhS:'Título de la serie…', temporada:'Temporada {n}', eps:'{n} eps', episodio:'Episodio {n}', sigEp:'Siguiente episodio',
  sigEnSeg:'Siguiente episodio en {n} s…', finSerie:'Has terminado la serie', continuarEp:'Continuar T{s} E{e} · {t}', empezarSerie:'Empezar T1 E1',
  noEp:'No se puede reproducir este episodio', sinEps:'Esta serie no tiene episodios', audio:'Audio', cargandoEps:'Cargando episodios…',
  fEstreno:'Estreno', fCreador:'Creador / director'
});
Object.assign(TXT.en, {
  todasS:'All series', sinSeries:'No series in this folder', sinVistosS:'Series you start watching will appear here',
  buscarPhS:'Series title…', temporada:'Season {n}', eps:'{n} eps', episodio:'Episode {n}', sigEp:'Next episode',
  sigEnSeg:'Next episode in {n} s…', finSerie:'You finished the series', continuarEp:'Resume S{s} E{e} · {t}', empezarSerie:'Start S1 E1',
  noEp:'This episode cannot be played', sinEps:'This series has no episodes', audio:'Audio', cargandoEps:'Loading episodes…',
  fEstreno:'First aired', fCreador:'Creator / director'
});
const ICS = {
  sig:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 5v14l10-7zM17 5h2.5v14H17z"/></svg>',
  auri:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4.5" height="7" rx="1.5"/><rect x="16.5" y="14" width="4.5" height="7" rx="1.5"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
};

document.querySelector('#sec .smain').insertAdjacentHTML('beforeend', `
  <div class="serie" id="serie" hidden>
    <div class="fbtns">
      <button class="rb f" data-go="pf:full">${IC.full}</button>
      <button class="rb f" data-go="pf:pausa" id="sbPausa">${ICP.pausa}</button>
      <button class="rb f" data-go="pf:reinicio">${ICP.reinicio}</button>
      <button class="rb f" data-go="pf:fav">${IC.fav}</button>
      <button class="rb f" data-go="pf:atras">${ICP.atras}</button>
    </div>
    <div class="scol1"><div class="fpos" id="sPos"></div></div>
    <div class="fder">
      <div class="fplayer" id="sPlayer"></div>
      <div class="finfo" id="sInfo"></div>
    </div>
    <div class="fcol3">
      <div class="facc" id="sAcc"></div>
      <div class="temps" id="sTemps"></div>
      <div class="cEps"><button class="flecha arr" type="button" aria-label="Episodios anteriores" tabindex="-1" hidden>›</button><div class="seps" id="sEps"></div><button class="flecha aba" type="button" aria-label="Más episodios" tabindex="-1" hidden>›</button></div>
    </div>
  </div>`);
document.getElementById('vbar').insertAdjacentHTML('beforeend', `<button class="vb" data-go="pf:sig" id="vbSig" title="">${ICS.sig}</button>`);
document.getElementById('pbar').insertAdjacentHTML('afterbegin', `<button class="pbtn" id="bAudio" data-go="pf:audio" hidden>${ICS.auri}<span></span></button>`);

const SF = { abierta:false, activa:false, it:null, info:null, temps:[], eps:{}, t:null, ep:null, tGuarda:0, tSig:null };

/* ---------- datos de la serie ---------- */
function calidad(s){ s = String(s || ''); return /\b(4k|uhd|2160p?)\b/i.test(s) ? '4K' : /\b(fhd|1080p?)\b/i.test(s) ? 'FHD' : /\bhd\b|720p?/i.test(s) ? 'HD' : ''; }
async function datosSerie(it){
  if (it._datos) return it._datos;
  const o = { tit: it.n, poster: it.l, r: it.r, desc: it.plot || '', genero: it.gen || '', reparto: it.cast || '', dir: it.dir || '', fecha: it.y || '', temps: [], eps: {} };
  if (LISTA.x && it.sid) {
    const api = LISTA.x.base + '/player_api.php?username=' + encodeURIComponent(LISTA.x.user) + '&password=' + encodeURIComponent(LISTA.x.pass);
    const j = await redJSON(api + '&action=get_series_info&series_id=' + it.sid, 30000);
    const i = (j && j.info) || {};
    Object.assign(o, { poster: i.cover || it.l, fondo: (i.backdrop_path && i.backdrop_path[0]) || '', desc: i.plot || o.desc, genero: i.genre || o.genero,
      reparto: i.cast || o.reparto, dir: i.director || o.dir, fecha: i.releaseDate || i.release_date || o.fecha, r: +i.rating || it.r,
      yt: i.youtube_trailer || '', tmdb: i.tmdb || i.tmdb_id || '' });
    const E = (j && j.episodes) || {};
    for (const k of Object.keys(E)) {
      const n = +k; o.eps[n] = (E[k] || []).map((e, x) => ({ id: 'e' + e.id, eid: e.id, t: n, e: +e.episode_num || x + 1, n: e.title || '', ext: e.container_extension || 'mp4',
        dur: (e.info && (e.info.duration || '')) || '', desc: (e.info && e.info.plot) || '', img: (e.info && e.info.movie_image) || '' })).sort((a, b) => a.e - b.e);
    }
  } else if (it.eps) {
    for (const e of it.eps) (o.eps[e.t] = o.eps[e.t] || []).push({ id: e.id, t: e.t, e: e.e, n: e.n, u: e.u, img: e.l });
    for (const k in o.eps) o.eps[k].sort((a, b) => a.e - b.e);
  }
  o.temps = Object.keys(o.eps).map(Number).filter(n => o.eps[n].length).sort((a, b) => a - b);
  if (BRAND.tmdb && (!o.desc || !o.poster || !o.yt || !o.genero)) {
    try {
      let id = o.tmdb;
      if (!id) { const q = normTit(it.n), y = anioDe(it.n) || String(o.fecha).slice(0, 4);
        const s = await tmdb('/search/tv', 'query=' + encodeURIComponent(q) + (y ? '&first_air_date_year=' + y : ''));
        const r = (s.results || [])[0] || (y ? ((await tmdb('/search/tv', 'query=' + encodeURIComponent(q))).results || [])[0] : null); id = r && r.id; }
      if (id) {
        const m = await tmdb('/tv/' + id, 'append_to_response=videos,credits&include_video_language=es,en');
        const vs = (m.videos && m.videos.results) || [], v = vs.find(x => x.site === 'YouTube' && x.type === 'Trailer') || vs.find(x => x.site === 'YouTube');
        o.desc = o.desc || m.overview || ''; o.poster = o.poster || (m.poster_path ? TMDB_IMG + 'w500' + m.poster_path : '');
        o.fondo = o.fondo || (m.backdrop_path ? TMDB_IMG + 'w1280' + m.backdrop_path : '');
        o.genero = o.genero || (m.genres || []).map(g => g.name).join(', '); o.fecha = o.fecha || m.first_air_date || '';
        o.dir = o.dir || (m.created_by || []).map(c => c.name).join(', ');
        o.reparto = o.reparto || ((m.credits && m.credits.cast) || []).slice(0, 8).map(c => c.name).join(', ');
        o.yt = o.yt || (v ? v.key : ''); o.r = o.r || m.vote_average;
      }
    } catch (e) {}
  }
  return (it._datos = o);
}
const urlEp = ep => ep.u || (LISTA.x.base + '/series/' + encodeURIComponent(LISTA.x.user) + '/' + encodeURIComponent(LISTA.x.pass) + '/' + ep.eid + '.' + (ep.ext || 'mp4'));

/* ---------- progreso por episodio ---------- */
const progEps = () => lee('epp_' + LISTA.key, {});
function guardaPosSerie(forzar){
  if (!SF.activa || !SF.ep || !vid.duration || !isFinite(vid.duration)) return;
  const now = Date.now(); if (!forzar && now - SF.tGuarda < 5000) return; SF.tGuarda = now;
  const p = progEps(); p[SF.ep.id] = [Math.floor(vid.currentTime), Math.floor(vid.duration), now];
  const ks = Object.keys(p); if (ks.length > 3000) ks.sort((a, b) => p[a][2] - p[b][2]).slice(0, ks.length - 3000).forEach(k => delete p[k]);
  guarda('epp_' + LISTA.key, p);
  const k = 'vis_series_' + LISTA.key, l = lee(k, []).filter(x => x.id !== SF.it.id);
  l.unshift({ id: SF.it.id, ep: SF.ep.id, s: SF.ep.t, e: SF.ep.e, pos: vid.currentTime, dur: vid.duration, t: now });
  guarda(k, l.slice(0, 60));
}

/* ---------- abrir / pintar ---------- */
async function abreSerie(it){
  SF.abierta = true; SF.activa = false; SF.it = it; SF.ep = null; SF.info = null;
  document.getElementById('sec').classList.add('enficha', 'enserie');
  document.getElementById('serie').hidden = false;
  const pb = document.getElementById('pbox'); document.getElementById('sPlayer').appendChild(pb);
  pb.classList.add('vod'); pb.classList.remove('radio', 'activa');
  paraVideo(); msgPlayer(''); S.jugando = null; document.getElementById('pFondo').style.display = 'none';
  document.getElementById('sCarp').textContent = it.n;
  pintaSerie({ tit: it.n, poster: it.l, r: it.r, temps: [], eps: {} }, true);
  let o; try { o = await datosSerie(it); } catch (e) { o = { tit: it.n, poster: it.l, r: it.r, temps: [], eps: {}, error: true }; }
  if (SF.it !== it) return;
  SF.info = o;
  const v = lee('vis_series_' + LISTA.key, []).find(x => x.id === it.id);
  SF.t = v && o.eps[v.s] ? v.s : (o.temps[0] || null);
  pintaSerie(o);
}
function pintaSerie(o, cargando){
  const it = SF.it, r = o.r ? (+o.r).toFixed(1) : '';
  document.getElementById('sPos').innerHTML = `${o.poster ? `<img src="${esc(o.poster)}" alt="" onerror="this.remove()">` : ''}<div class="pini">${esc(iniciales(it.n))}</div>
    ${r && r !== '0.0' ? `<span class="nota">${ICP.star}${r}</span>` : ''}<span class="pfav${esFavX(it.id) ? ' si' : ''}">${IC.fav}</span>`;
  /* 1.3: una sola fila con la temporada elegida; si hay más, ▲ abre la lista hacia arriba, encima de la carátula */
  const tt = o.temps || [], varias = tt.length > 1, n0 = SF.t;
  document.getElementById('sTemps').innerHTML = !tt.length ? '' : `<button class="tmp f sel tmpUna${varias ? '' : ' sola'}" data-go="ps:tempMenu" id="tmpBtn"${varias ? ' data-tip="Cambiar de temporada"' : ''}>
      <span>${t('temporada', { n: n0 })}</span><b>${t('eps', { n: (o.eps[n0] || []).length })}</b>${varias ? `<i class="tmpFl">▲</i>` : ''}</button>
    <div class="tmpMenu" id="tmpMenu" hidden>${tt.map(n => `<button class="tmpOp f${n === n0 ? ' sel' : ''}" data-go="ps:temp:${n}"><span>${t('temporada', { n })}</span><small>${t('eps', { n: o.eps[n].length })}</small></button>`).join('')}</div>`;
  pintaEps(cargando);
  const est = Math.round((+o.r || 0) / 2);
  document.getElementById('fTit').innerHTML = `<div class="ffondo" style="${o.fondo ? `background-image:url('${esc(o.fondo)}')` : ''}"></div>
    <div class="ftxt"><h2 id="sTitEp">${esc(o.tit)}</h2>${o.genero ? `<div>${esc(o.genero)}</div>` : ''}
    ${o.r ? `<div class="estrellas">${[1, 2, 3, 4, 5].map(n => `<i class="${n <= est ? 'si' : ''}">${ICP.star}</i>`).join('')}</div>` : ''}</div>`;
  document.getElementById('fTit').classList.toggle('oculto', SF.activa);
  pintaAccSerie();
  const fila = (k, x) => x ? `<div class="fi"><b>${t(k)}:</b><span>${esc(x)}</span></div>` : '';
  document.getElementById('sInfo').innerHTML = fila('fEstreno', o.fecha) + fila('fGenero', o.genero) + fila('fDesc', o.desc) + fila('fCreador', o.dir) + fila('fReparto', o.reparto);
  if (!cargando && !SF.activa) enfocaPrimero(document.getElementById('sAcc'));
}
function pintaEps(cargando){
  const o = SF.info, box = document.getElementById('sEps');
  if (cargando || !o) { box.innerHTML = `<div class="vacio"><div><div class="sp" style="margin:0 auto calc(var(--u)*1)"></div>${t('cargandoEps')}</div></div>`; return; }
  const L = o.eps[SF.t] || []; if (!L.length) { box.innerHTML = `<div class="vacio">${o.error ? t('errLista') : t('sinEps')}</div>`; return; }
  const q = calidad(SF.it.n + ' ' + ((S.cats[S.cat] || {}).n || '')), p = progEps();
  box.innerHTML = L.map((ep, i) => { const g = p[ep.id], pct = g && g[1] ? Math.min(100, g[0] / g[1] * 100) : 0, visto = pct > 92;
    const nom = 'T' + String(ep.t).padStart(2, '0') + ' - ' + t('episodio', { n: ep.e }) + extraEp(ep.n);
    return `<button class="ep f${SF.ep && SF.ep.id === ep.id ? ' sel' : ''}" data-go="ps:ep:${i}">${q ? `<i class="q">${q}</i>` : ''}<span>${esc(nom)}</span>${visto ? `<i class="ok">${ICS.check}</i>` : ''}${pct && !visto ? `<em style="width:${pct}%"></em>` : ''}</button>`; }).join('');
}
/* título propio del episodio, sin repetir la serie ni "S01E02" ni "Episodio 2" */
function extraEp(n){
  let x = String(n || '').trim(); const m = x.match(/s\d{1,2}\s*e\d{1,3}\s*[-–:|.]*\s*(.*)$/i); if (m) x = m[1];
  x = x.replace(/^(episodio|episode|cap[ií]tulo|ep\.?)\s*\d+\s*[-–:|.]*\s*/i, '').trim();
  return x && x.length < 70 && normTit(x) !== normTit(SF.it.n) ? ' · ' + x : '';
}
function siguienteDe(ep){
  const o = SF.info, L = o.eps[ep.t] || [], i = L.findIndex(x => x.id === ep.id);
  if (i >= 0 && i < L.length - 1) return L[i + 1];
  const ti = o.temps.indexOf(ep.t); return ti >= 0 && ti < o.temps.length - 1 ? o.eps[o.temps[ti + 1]][0] : null;
}
function pintaAccSerie(){
  const o = SF.info || {}, acc = document.getElementById('sAcc');
  document.getElementById('pbox').classList.toggle('activa', SF.activa);
  if (SF.activa) { acc.innerHTML = (siguienteDe(SF.ep) ? `<button class="btn f" data-go="pf:sig">${ICS.sig}<span>${t('sigEp')}</span></button>` : ''); return; }
  if (!o.temps || !o.temps.length) { acc.innerHTML = ''; return; }
  const v = lee('vis_series_' + LISTA.key, []).find(x => x.id === SF.it.id);
  acc.innerHTML = v ? `<button class="btn pri f" data-go="ps:seguir">${ICP.play}<span>${t('continuarEp', { s: v.s, e: v.e, t: hms(v.pos) })}</span></button>`
                    : `<button class="btn pri f" data-go="ps:primero">${ICP.play}<span>${t('empezarSerie')}</span></button>`;
}

/* ---------- reproducir ---------- */
function reproduceEp(ep, desde){
  if (!ep) return;
  clearInterval(SF.tSig); SF.ep = ep; SF.activa = true; SF.t = ep.t;
  document.getElementById('fTit').classList.add('oculto');
  document.getElementById('sCarp').textContent = SF.it.n + ' · T' + ep.t + ' E' + ep.e;
  msgPlayer(`<div><div class="sp"></div>${t('conectandoCanal')}</div>`);
  const g0 = progEps()[ep.id], ini0 = desde != null ? desde : (g0 && g0[0] > 30 && g0[0] < g0[1] - 60 ? g0[0] : 0);
  motor(urlEp(ep), () => { if (SF.ep === ep) msgPlayer(`<div>${t('noEp')}<br><small style="color:var(--mut)">T${ep.t} E${ep.e}</small></div>`); }, { directo:false, desde: ini0 });

  document.getElementById('vbSig').style.display = siguienteDe(ep) ? '' : 'none';
  pintaSerie(SF.info); muestraVbar(); pistasAudio();          // 2.3: sin pasar sola a pantalla completa
}
function finEpisodio(){
  guardaPosSerie(true);
  const sig = siguienteDe(SF.ep);
  if (!sig) { aviso(t('finSerie')); pantallaCompleta(false); SF.activa = false; pintaSerie(SF.info); return; }
  let n = 5; msgPlayer(`<div>${t('sigEnSeg', { n })}</div>`);
  SF.tSig = setInterval(() => { n--; if (n <= 0) { clearInterval(SF.tSig); reproduceEp(sig, 0); } else msgPlayer(`<div>${t('sigEnSeg', { n })}</div>`); }, 1000);
}

/* ---------- idioma del audio (cuando el vídeo es HLS y trae varias pistas) ---------- */
function pistasAudio(){
  const b = document.getElementById('bAudio'); b.hidden = true;
  if (!hls) return;
  const pinta = () => { const L = hls.audioTracks || []; b.hidden = L.length < 2; if (L.length) b.querySelector('span').textContent = (L.length + ' · ' + String((L[hls.audioTrack] || {}).lang || (L[hls.audioTrack] || {}).name || '').toUpperCase().slice(0, 3)); };
  hls.on(Hls.Events.AUDIO_TRACKS_UPDATED, pinta); hls.on(Hls.Events.AUDIO_TRACK_SWITCHED, pinta); pinta();
}
function cambiaAudio(){ if (!hls || !hls.audioTracks || hls.audioTracks.length < 2) return; hls.audioTrack = (hls.audioTrack + 1) % hls.audioTracks.length; muestraVbar(); }

/* ---------- cerrar ---------- */
function cierraSerie(){
  guardaPosSerie(true); clearInterval(SF.tSig); paraVideo(); msgPlayer('');
  SF.abierta = false; SF.activa = false; pantallaCompleta(false);
  const pb = document.getElementById('pbox'); pb.classList.remove('vod', 'activa');
  document.querySelector('#sec .pcol').insertBefore(pb, document.getElementById('guia'));
  document.getElementById('pFondo').style.display = ''; fondoPlayer(null); document.getElementById('bAudio').hidden = true;
  document.getElementById('serie').hidden = true; document.getElementById('sec').classList.remove('enficha', 'enserie');
  const c = S.cats[S.cat]; if (c) document.getElementById('sCarp').textContent = c.n;
  const vi = S.cats.find(x => x.id === '__vis'); if (vi) { vi.total = vistosPelis().length; vCats.marca(); }
  if (c && c.id === '__vis') { const id = SF.it && SF.it.id; eligeCat(S.cat); S.it = Math.max(0, S.items.findIndex(x => x.id === id)); }
  S.zona = 'items'; marcaGrid(); if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
}

/* ---------- acciones ---------- */
function accionSerie(a, b){
  const o = SF.info;
  switch (a) {
    case 'temp': SF.t = +b; pintaSerie(o); { const f = document.querySelector('#sEps .ep'); if (f) enfoca(f); } break;
    case 'tempMenu': { const m = document.getElementById('tmpMenu'); if (!m || (o.temps || []).length < 2) break;
      m.hidden = !m.hidden; document.getElementById('tmpBtn').classList.toggle('abierto', !m.hidden);
      if (!m.hidden) { const sel = m.querySelector('.sel') || m.querySelector('.tmpOp'); if (sel) { enfoca(sel); sel.scrollIntoView({ block:'nearest' }); } } break; }
    case 'ep': reproduceEp((o.eps[SF.t] || [])[+b]); break;
    case 'primero': reproduceEp(o.eps[o.temps[0]][0], 0); break;
    case 'seguir': { const v = lee('vis_series_' + LISTA.key, []).find(x => x.id === SF.it.id);
      const ep = v && (o.eps[v.s] || []).find(x => x.id === v.ep);
      if (!ep) { reproduceEp(o.eps[o.temps[0]][0], 0); break; }
      if (v.dur && v.pos > v.dur - 60) reproduceEp(siguienteDe(ep) || ep, 0); else reproduceEp(ep, v.pos); break; }
    // botones compartidos con películas
    case 'full': if (SF.activa) pantallaCompleta(true); else accionSerie(lee('vis_series_' + LISTA.key, []).some(x => x.id === SF.it.id) ? 'seguir' : 'primero'); break;
    case 'pausa': if (!SF.activa) { accionSerie('full'); break; } if (vid.paused) vid.play().catch(() => {}); else vid.pause(); muestraVbar(); break;
    case 'reinicio': if (SF.activa) { vid.currentTime = 0; vid.play().catch(() => {}); } break;
    case 'sig': { const s = SF.ep && siguienteDe(SF.ep); if (s) { guardaPosSerie(true); reproduceEp(s, 0); } break; }
    case 'fav': aviso(t(cambiaFav(LISTA, 'series', SF.it.id) ? 'favSi' : 'favNo')); document.querySelector('#sPos .pfav').classList.toggle('si', esFavX(SF.it.id));
      S.cats[0].total = favs(LISTA, 'series').length; vCats.marca(); break;
    case 'trailer': trailer(o); break;
    case 'atras': cierraSerie(); break;
    case 'audio': cambiaAudio(); break;
    default: accionPeli(a);       // adelantar, retroceder, cerrar tráiler…
  }
}
['play', 'pause'].forEach(ev => vid.addEventListener(ev, () => { const b = document.getElementById('sbPausa'); if (b) b.innerHTML = vid.paused ? ICP.play : ICP.pausa; }));

/* ---------- mando ---------- */
function teclaSerie(e, atrasK, full){
  const k = e.key, c = e.keyCode;
  if (full) {
    if (atrasK) { pantallaCompleta(false); pintaAccSerie(); const s = document.querySelector('#sEps .ep.sel') || document.querySelector('#sAcc .f'); if (s) enfoca(s); }
    else if (k === 'ArrowLeft' || k === 'ArrowRight') salta((k === 'ArrowRight' ? 1 : -1) * (e.repeat ? 30 : 10));
    else if (k === 'Enter' || k === ' ' || k === 'MediaPlayPause' || c === 179) accionSerie('pausa');
    else if (k === 'MediaTrackNext' || c === 176) accionSerie('sig');
    else if (k === 'ArrowUp' || k === 'ArrowDown') muestraVbar();
    else return true;
    e.preventDefault(); return true;
  }
  if (atrasK) { e.preventDefault(); cierraSerie(); return true; }
  if (/^[0-9]$/.test(k)) return true;
  if (navSerie(k)) { e.preventDefault(); return true; }
  return false;
}
/* 2.1: en horizontal, casi todo lo resuelve el mando normal (por posición). Solo: desde un capítulo, izquierda vuelve a los botones */
function navSerie(k){
  if (!matchMedia('(orientation:landscape)').matches) return false;
  const a = document.activeElement;
  if (k === 'ArrowLeft' && a && a.classList && a.classList.contains('ep')) { const x = document.querySelector('#sAcc .f'); if (x) { enfoca(x); return true; } }
  if (k === 'ArrowDown' && a && a.id === 'tmpBtn') { const x = document.querySelector('#sEps .ep.sel') || document.querySelector('#sEps .ep'); if (x) { enfoca(x); x.scrollIntoView({ block:'nearest' }); return true; } }
  return false;
}

/* lista de temporadas: con Atrás se cierra; al pulsar fuera, también */
document.addEventListener('keydown', e => {
  const m = document.getElementById('tmpMenu'); if (!m || m.hidden) return;
  const k = e.key, c = e.keyCode;
  if (k === 'Escape' || k === 'Backspace' || k === 'GoBack' || c === 10009 || c === 461 || c === 4) {
    e.preventDefault(); e.stopImmediatePropagation(); m.hidden = true; const b = document.getElementById('tmpBtn'); b.classList.remove('abierto'); enfoca(b); return; }
  if (k === 'ArrowUp' || k === 'ArrowDown') {               // dentro de la lista, arriba/abajo se mueven por las temporadas
    const ops = [...m.querySelectorAll('.tmpOp')], i = ops.indexOf(document.activeElement);
    if (i < 0) return; e.preventDefault(); e.stopImmediatePropagation();
    const j = i + (k === 'ArrowUp' ? -1 : 1);
    if (j < 0) { m.hidden = true; const b = document.getElementById('tmpBtn'); b.classList.remove('abierto'); enfoca(b); return; }   // 1.8+: la lista se abre hacia abajo
    const jj = Math.min(ops.length - 1, j); enfoca(ops[jj]); ops[jj].scrollIntoView({ block:'nearest' });
  }
}, true);
document.addEventListener('click', e => { const m = document.getElementById('tmpMenu'); if (m && !m.hidden && !e.target.closest('#tmpMenu,#tmpBtn')) { m.hidden = true; document.getElementById('tmpBtn').classList.remove('abierto'); } });

/* 1.7: flechas azules de la lista de episodios (móvil en vertical): solo salen si hay más episodios hacia ese lado */
function flechasEps(){
  const e = document.getElementById('sEps'), w = e && e.parentNode; if (!w || !w.classList.contains('cEps')) return;
  w.querySelector('.arr').hidden = e.scrollTop < 4;
  w.querySelector('.aba').hidden = e.scrollTop + e.clientHeight >= e.scrollHeight - 4;
}
(function(){
  const e = document.getElementById('sEps'), w = e.parentNode;
  e.addEventListener('scroll', flechasEps);
  new MutationObserver(() => requestAnimationFrame(flechasEps)).observe(e, { childList: true });
  addEventListener('resize', flechasEps);
  w.querySelectorAll('.flecha').forEach(b => b.addEventListener('click', ev => { ev.stopPropagation();
    e.scrollBy({ top: (b.classList.contains('arr') ? -1 : 1) * e.clientHeight * .8, behavior: 'smooth' }); }));
})();
