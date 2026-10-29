/* ===================================================================
   FONDOS DE LA PORTADA (v2.11)
   - Películas: la película nº 1 en tendencia de la semana que está en tu lista.
   - Series: la mejor puntuada entre las 10 series más vistas de la semana que están en tu lista.
     (si no hay tendencias, un cartel de la propia lista que cambia cada día)
   - TV en vivo: una foto distinta cada día (deportes, noticias, cocina, pesca, naturaleza, música, viajes…).
   - Radios: el logo de una de las emisoras españolas más escuchadas; cambia cada vez que abres la app.
   Se renuevan al actualizar la lista. Lo último que se mostró se guarda para que salga al instante.
   =================================================================== */
document.head.insertAdjacentHTML('beforeend', `<style>
#home .tile .fondo{position:absolute;inset:0;z-index:0;pointer-events:none;background-size:cover;background-position:center 30%;
  filter:brightness(.92) saturate(1.08);opacity:0;transition:opacity .8s ease}
#home .tile .fondo.on{opacity:1}
#home .tile .capa{position:absolute;inset:0;z-index:1;pointer-events:none;opacity:0;transition:opacity .8s ease;
  background:linear-gradient(to top,rgba(4,7,14,.92) 0%,rgba(4,7,14,.5) 32%,rgba(4,7,14,0) 62%)}
/* con imagen de fondo no se pone el icono: la imagen ya dice qué es */
#home .tile.conFondo .ico{display:none}
#home .tile .fondo.on+.capa{opacity:1}
#home .tile .ico{z-index:2}
#home .tile::before{z-index:1}
#home .tile b,#home .tile small{z-index:2}
#home .tile.conFondo small{color:#d6deea}
#home .tile.conFondo b{color:#fff}
/* carátulas (películas, series) y logos (radios): la imagen entera, sin recortar ni deformar,
   y detrás la misma imagen muy difuminada rellenando la casilla */
#home .tile .fondo.borroso{filter:blur(24px) saturate(1.4) brightness(.6);transform:scale(1.4)}
#home .tile .centro{position:absolute;z-index:0;left:50%;transform:translateX(-50%);object-fit:contain;pointer-events:none;opacity:0;transition:opacity .8s ease;
  filter:drop-shadow(0 8px 22px rgba(0,0,0,.6))}
#home .tile .centro.on{opacity:1}
#home .tile .centro.cartel{top:3%;height:82%;width:94%;border-radius:calc(var(--u)*.8)}
#home .tile .centro.logo{top:12%;height:48%;width:52%;border-radius:calc(var(--u)*1)}
#home .tile.vacia .fondo,#home .tile.vacia .centro{display:none}
</style>`);

const TMDB_CARTEL = 'https://image.tmdb.org/t/p/w500';
const RADIOS_TOP = /\b(los ?40|cadena ?ser|\bser\b|cope|onda ?cero|cadena ?100|kiss ?fm|rock ?fm|europa ?fm|rne|radio ?nacional|radio ?marca|dial|hit ?fm|megastar|flaix|rac ?1|catalunya r|canal ?sur|loca ?fm|radiolé|melod[ií]a)\b/i;

function capaFondo(tile){
  let f = tile.querySelector('.fondo');
  if (!f) { tile.insertAdjacentHTML('afterbegin', '<div class="fondo"></div><div class="capa"></div>'); f = tile.querySelector('.fondo'); }
  return f;
}
/* pone la imagen solo cuando ya ha cargado (sin parpadeos); si falla, deja la casilla como estaba */
/* modo: '' = foto a toda la casilla (TV en vivo) · 'cartel' = carátula entera · 'logo' = logo de radio */
function ponFondo(tipo, url, modo){
  const tile = document.querySelector(`#home .tile[data-go="sec:${tipo}"]`); if (!tile || !url) return;
  const f = capaFondo(tile);
  if (f.dataset.url === url) return;
  const im = new Image();
  im.onload = () => {
    f.dataset.url = url; f.style.backgroundImage = `url("${url.replace(/"/g, '%22')}")`; f.classList.toggle('borroso', !!modo); f.classList.add('on'); tile.classList.add('conFondo');
    let l = tile.querySelector('.centro');
    if (modo) { if (!l) { tile.insertAdjacentHTML('beforeend', '<img class="centro" alt="">'); l = tile.querySelector('.centro'); }
      l.className = 'centro ' + modo; l.src = url; requestAnimationFrame(() => l.classList.add('on')); }
    else if (l) l.remove();
    try { const m = lee('fondos', {}); m[tipo] = { url, modo: modo || '' }; guarda('fondos', m); } catch (e) {}
  };
  im.onerror = () => { if (modo) { const m = lee('fondos', {}); if (m[tipo] && m[tipo].url === url) { delete m[tipo]; guarda('fondos', m); } } };
  im.src = url;
}
const diaDelAnio = () => Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 864e5);

/* ---------- TV en vivo: deporte del día ---------- */
const FOTOS_TV = 15;          // www/fondos/tv-01.jpg … tv-15.jpg (deportes, noticias, cocina, pesca, naturaleza, música, viajes)
function fondoDirecto(){ ponFondo('live', 'fondos/tv-' + String(diaDelAnio() % FOTOS_TV + 1).padStart(2, '0') + '.jpg'); }

/* ---------- Películas y series ---------- */
async function fondoVod(tipo){
  if (!LISTA || !LISTA[tipo] || !LISTA[tipo].items.length) return;
  let url = '';
  if (BRAND.tmdb) {
    try {
      const T = await cargaTendencias(tipo);
      const top = (T.filas[0] && T.filas[0].its) || [];
      let elegido = null;
      if (tipo === 'movie') elegido = top.find(x => x.r.poster || x.it.l);
      else elegido = top.slice(0, 10).filter(x => x.r.poster || x.it.l).sort((a, b) => (b.r.vote || 0) - (a.r.vote || 0))[0];
      if (elegido) url = elegido.r.poster ? TMDB_CARTEL + elegido.r.poster : elegido.it.l;
    } catch (e) {}
  }
  if (!url) {                                   // sin tendencias: un cartel de la lista, distinto cada día
    const con = LISTA[tipo].items.filter(x => x.l && /^https?:/i.test(x.l)).slice(0, 60);
    if (con.length) url = con[diaDelAnio() % con.length].l;
  }
  if (url) ponFondo(tipo, url, 'cartel');
}

/* ---------- Radios: una de las más escuchadas de España ---------- */
async function fondoRadio(){
  try {
    let c = await ALM.get('radios_top');
    if (!c || Date.now() - c.t > 864e5) {
      const j = await radioAPI('/json/stations/search?countrycode=ES&hidebroken=true&order=clickcount&reverse=true&limit=80');
      const v = j.filter(s => s.favicon && /^https:/i.test(s.favicon)).map(s => ({ n: s.name, l: s.favicon }));
      const buenas = v.filter(s => RADIOS_TOP.test(s.n));
      c = { t: Date.now(), v: (buenas.length >= 4 ? buenas : v).slice(0, 15) };
      ALM.set('radios_top', c);
    }
    if (c.v.length) { const r = c.v[Math.floor(Math.random() * c.v.length)]; ponFondo('radio', r.l, 'logo'); }
  } catch (e) {}
}

/* ---------- cuándo se pintan ---------- */
function fondosPortada(){
  fondoDirecto();
  if (LISTA && listaActual() && LISTA.key === claveLista(listaActual())) { fondoVod('movie'); fondoVod('series'); }
}
/* al arrancar: lo último que se vio, al momento */
(() => { const m = lee('fondos', {}); Object.keys(m).forEach(k => { if (m[k] && m[k].url && k !== 'radio') ponFondo(k, m[k].url, m[k].modo || ''); }); })();
fondoDirecto(); fondoRadio();
/* cuando la lista termina de cargar (o se actualiza), se renuevan películas y series */
const _contadoresP = contadores;
contadores = function(){ _contadoresP(); fondosPortada(); };
