/* ===================================================================
   2.8: DESCARGAR la película o el capítulo que se está viendo
   - Windows: el cliente elige dónde guardarlo; barra de progreso (y en la barra de tareas).
   - Android / Fire TV / TV Box: se guarda en Descargas/PepeTV (aviso en las notificaciones).
   - iPhone / navegador: no se puede (no sale el botón).
   - Solo a los clientes que tengan «Puede descargar: SÍ» en el panel (Acciones).
   =================================================================== */
(function(){
  const PC = window.PepePC && window.PepePC.descarga ? window.PepePC : null;
  const AND = !PC && typeof NATP !== 'undefined' && NATP && NATP.descarga ? NATP : null;
  if (!PC && !AND) return;

  const ICD = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7 10l5 5 5-5"/><path d="M5 20h14"/></svg>`;
  const BAJ = new Map();     // id → {nombre, estado, rec, tot, ruta}

  /* qué se está viendo ahora: enlace y nombre del archivo */
  function actual(){
    let url = '', nom = '';
    if (typeof SF !== 'undefined' && SF.activa && SF.it && SF.ep) {
      url = urlEp(SF.ep);
      nom = SF.it.n + ' - T' + String(SF.ep.t).padStart(2, '0') + 'E' + String(SF.ep.e).padStart(2, '0') + (SF.ep.n && !/^(episod|cap)/i.test(SF.ep.n) ? ' - ' + SF.ep.n : '');
    } else if (typeof PF !== 'undefined' && PF.activa && PF.it) { url = urlPeli(PF.it); nom = PF.it.n; }
    if (!url) return null;
    let ext = 'mp4'; try { const m = new URL(url).pathname.match(/\.([a-z0-9]{2,4})$/i); if (m && !/^(m3u8|php)$/i.test(m[1])) ext = m[1].toLowerCase(); } catch (e) {}
    return { url, nombre: nom.replace(/[\\/:*?"<>|]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 140) + '.' + ext };
  }

  async function descarga(){
    const a = actual();
    if (!a) { aviso('Pon primero la película o el capítulo'); return; }
    if (/\.m3u8(\?|$)/i.test(a.url)) { aviso('Este vídeo no se puede descargar (es un directo por partes)'); return; }
    try {
      const r = PC ? await PC.descarga(a) : await AND.descarga(a);
      if (r && r.ok) {
        if (AND) { BAJ.set(r.id, { nombre: a.nombre, estado: 'bajando', rec: 0, tot: 0 }); sigueAndroid(); pinta(); aviso('Descargando en Descargas/PepeTV…'); }
        else aviso('Descargando…');
      } else if (r && r.err === 'permiso') aviso('Acepta el permiso y vuelve a pulsar Descargar');
      else if (!(r && r.err === 'cancelado')) aviso('No se ha podido empezar la descarga');
    } catch (e) { aviso('No se ha podido empezar la descarga'); }
  }

  /* ---------- cajita de progreso (abajo a la derecha) ---------- */
  document.body.insertAdjacentHTML('beforeend', `<div id="descCaja" class="descCaja"></div>`);
  const caja = document.getElementById('descCaja');
  const mb = b => b > 0 ? (b / 1048576 >= 1024 ? (b / 1073741824).toFixed(1) + ' GB' : Math.round(b / 1048576) + ' MB') : '';
  function pinta(){
    let s = '';
    for (const [id, d] of BAJ) {
      const pc = d.tot > 0 ? Math.min(100, Math.floor(d.rec * 100 / d.tot)) : 0;
      const txt = d.estado === 'hecha' ? '✔ Descargada' : d.estado === 'fallo' ? '✖ Ha fallado' : d.estado === 'cancelada' ? 'Cancelada'
        : d.estado === 'parada' ? 'En pausa (esperando conexión)…' : (d.tot > 0 ? pc + ' % · ' + mb(d.rec) + ' de ' + mb(d.tot) : (mb(d.rec) || 'Empezando…'));
      const fin = d.estado === 'hecha' || d.estado === 'fallo' || d.estado === 'cancelada';
      s += `<div class="descIt${fin ? ' fin' : ''}"><div class="descN" title="${esc(d.nombre)}">${ICD}<span>${esc(d.nombre)}</span></div>
        <div class="descB"><i style="width:${d.estado === 'hecha' ? 100 : pc}%"></i></div>
        <div class="descP"><span>${txt}</span>${fin ? (d.estado === 'hecha' && PC && d.ruta ? `<button class="btn f" data-go="desc:ver:${id}">Ver carpeta</button>` : '') + `<button class="btn f" data-go="desc:quita:${id}">✕</button>`
          : `<button class="btn f" data-go="desc:cancela:${id}">Cancelar</button>`}</div></div>`;
    }
    caja.innerHTML = s; caja.classList.toggle('on', !!s);
  }
  if (PC) PC.alDescargar(d => {
    const antes = BAJ.get(d.id); BAJ.set(d.id, d);
    if (!antes) aviso('Descargando ' + d.nombre);
    if (d.estado === 'hecha') aviso('Descarga terminada: ' + d.nombre);
    else if (d.estado === 'fallo') aviso('La descarga ha fallado: ' + d.nombre);
    pinta();
  });
  let tAnd = null;
  function sigueAndroid(){
    clearTimeout(tAnd);
    const ids = [...BAJ].filter(([, d]) => d.estado === 'bajando' || d.estado === 'parada').map(([id]) => id);
    if (!ids.length) return;
    AND.descargas({ ids }).then(r => {
      for (const d of (r && r.lista) || []) { const a = BAJ.get(d.id) || {}; if (a.estado !== 'hecha' && d.estado === 'hecha') aviso('Descarga terminada: ' + d.nombre); BAJ.set(d.id, Object.assign(a, d)); }
      pinta();
    }).catch(() => {}).finally(() => { tAnd = setTimeout(sigueAndroid, 2000); });
  }

  /* ---------- botón en la barra de iconos de Películas y Series ---------- */
  const _barraRepD = barraRep;
  barraRep = function(serie){
    const html = _barraRepD(serie);
    if (!(typeof LIC !== 'undefined' && LIC && LIC.desc)) return html;          // solo si se lo das en el panel
    const bot = `<button class="btn f rbi rbDesc" data-go="desc:baja" aria-label="${serie ? 'Descargar el capítulo' : 'Descargar la película'}">${ICD}<span>Descargar</span></button>`;
    if (html.includes('class="rbExtra"')) return html.replace('<div class="rbExtra">', '<div class="rbExtra">' + bot);
    return html.replace(/<\/div>$/, `<div class="rbExtra">${bot}</div></div>`);
  };
  const _accionD = accion;
  accion = function(go){
    if (go.startsWith('desc:')) {
      const [, q, id] = go.split(':');
      if (q === 'baja') descarga();
      else if (q === 'cancela') { if (PC) PC.cancelaDescarga(id); else { AND.cancelaDescarga({ id }); const d = BAJ.get(id); if (d) d.estado = 'cancelada'; pinta(); } }
      else if (q === 'quita') { BAJ.delete(id); pinta(); }
      else if (q === 'ver') { const d = BAJ.get(id); if (d && PC) PC.muestraArchivo(d.ruta); }
      return;
    }
    return _accionD(go);
  };
})();
