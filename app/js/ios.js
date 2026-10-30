/* ===================================================================
   SOLO EN IPHONE / IPAD (web pepe-tv.com)
   El reproductor de Safari no lee películas ni capítulos .mkv (ni algunos .avi).
   - Si una película o capítulo no se puede ver, prueba sola a pedirlo al servidor en .m3u8
     (algunos servidores IPTV lo convierten). En los .mkv lo prueba primero.
   - Si aun así no va, sale una ventana: Abrir en VLC (gratis en la App Store) / Copiar el enlace.
   - Botón «Otro reproductor» en la barra de iconos de Películas y Series.
   =================================================================== */
(function(){
  if (!window.IOS || (typeof NATP !== 'undefined' && NATP) || window.PepePC) return;
  const VLC_TIENDA = 'https://apps.apple.com/es/app/vlc-media-player/id650377962';
  let URL_ACT = '', vuelta = 0, avisadoDe = '';

  /* películas y capítulos: probar otro formato antes de dar error */
  const _motorIOS = motor;
  motor = function(url, falla, opc){
    const mia = ++vuelta;
    URL_ACT = url;
    const vod = opc && opc.directo === false && /\/(movie|series)\/[^/]+\/[^/]+\/[^/?]+\.\w{2,4}(\?|$)/i.test(url) && !/\.m3u8(\?|$)/i.test(url);
    if (!vod) return _motorIOS(url, falla, opc);
    const alt = url.replace(/\.\w{2,4}(\?|$)/, '.m3u8$1');
    const orden = /\.(mkv|avi|wmv|flv)(\?|$)/i.test(url) ? [alt, url] : [url, alt];
    let i = 0;
    const prueba = () => _motorIOS(orden[i], () => {
      if (mia !== vuelta) return;                               // ya se está viendo otra cosa
      if (++i < orden.length) { msgPlayer(`<div><div class="sp"></div>Probando otro formato…</div>`); return prueba(); }
      falla();
      if (avisadoDe !== url) { avisadoDe = url; setTimeout(() => abreOpciones('falla'), 600); }
    }, opc);
    prueba();
  };

  /* ventana de opciones */
  document.body.insertAdjacentHTML('beforeend', `
  <div class="velo" id="vIosFuera"><div class="ven" style="width:min(94vw,calc(var(--u)*72))">
    <h3 id="ifTit">Este vídeo no se puede ver aquí</h3>
    <p class="ajNota" id="ifTxt" style="margin:0 0 calc(var(--u)*1.2)"></p>
    <div class="botones" style="flex-direction:column;align-items:stretch;gap:calc(var(--u)*.8)">
      <button class="btn pri f" data-go="iof:vlc">▶ Abrir en VLC</button>
      <button class="btn f" data-go="iof:copia">Copiar el enlace</button>
      <button class="btn f" data-go="iof:tienda">Instalar VLC (gratis)</button>
      <button class="btn f" data-go="cerrar">Cerrar</button>
    </div>
  </div></div>`);
  function abreOpciones(tipo){
    document.getElementById('ifTit').textContent = tipo === 'boton' ? 'Abrir en otro reproductor' : 'Este vídeo no se puede ver aquí';
    document.getElementById('ifTxt').textContent = tipo === 'boton'
      ? 'Ábrelo en la app VLC, por ejemplo si no suena o va mal.'
      : 'Está en un formato (por ejemplo .mkv) que el iPhone no reproduce dentro de PepeTV. Con la app VLC, que es gratis, se ve bien.';
    abreVentana('vIosFuera');
  }
  function copia(txt){
    const ok = () => { cierraVentana(); aviso('Enlace copiado: pégalo en tu reproductor'); };
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(txt).then(ok).catch(() => copiaVieja(txt) && ok());
    if (copiaVieja(txt)) ok(); else aviso('No se ha podido copiar el enlace');
  }
  function copiaVieja(txt){                                      // en http no hay portapapeles moderno
    const ta = document.createElement('textarea');
    ta.value = txt; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;font-size:16px';
    document.body.appendChild(ta); ta.focus(); ta.setSelectionRange(0, txt.length);
    let r = false; try { r = document.execCommand('copy'); } catch (e) {}
    ta.remove(); return r;
  }
  function fuera(q){
    if (q === 'tienda') { cierraVentana(); location.href = VLC_TIENDA; return; }
    if (!URL_ACT) return;
    if (q === 'copia') return copia(URL_ACT);
    try { vid.pause(); } catch (e) {}
    if (document.body.classList.contains('full')) pantallaCompleta(false);
    cierraVentana();
    location.href = 'vlc-x-callback://x-callback-url/stream?url=' + encodeURIComponent(URL_ACT);
    aviso('Abriendo en VLC… Si no se abre, instala VLC desde la App Store.');
  }
  const _accionIOS = accion;
  accion = function(go){
    if (go === 'iof:menu') { abreOpciones('boton'); return; }
    if (go.startsWith('iof:')) { fuera(go.slice(4)); return; }
    return _accionIOS(go);
  };

  /* botón en la barra de iconos de Películas y Series */
  const ICX = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>`;
  const _barraRepIOS = barraRep;
  barraRep = function(serie){
    return _barraRepIOS(serie).replace(/<\/div>$/, `<div class="rbExtra"><button class="btn f rbi rbFuera" data-go="iof:menu" aria-label="Abrir en otro reproductor">${ICX}<span>Otro reproductor</span></button></div></div>`);
  };
})();
