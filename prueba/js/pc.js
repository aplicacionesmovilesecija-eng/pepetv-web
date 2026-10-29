/* ===================================================================
   2.8: SOLO EN EL PROGRAMA DE WINDOWS
   El reproductor normal (el de Chrome) no sabe el audio AC3/Dolby de algunas películas y canales: se ve pero no suena.
   - Si un vídeo se ve pero no suena (o no se puede reproducir), sale una ventana con opciones:
     verlo con el reproductor alternativo (mpv, incluido), abrirlo en VLC (si está instalado), copiar el enlace o seguir así.
   - Botón «Abrir en otro reproductor» en la barra de iconos de Películas y Series.
   =================================================================== */
(function(){
  if (!window.PepePC || !window.PepePC.fuera) return;
  let URL_ACT = '', TIT_ACT = '', avisadoDe = '', tSonido = null, PROG = { mpv: false, vlc: false };
  window.PepePC.programas().then(p => { PROG = p || PROG; }).catch(() => {});

  /* recordar qué se está reproduciendo */
  const _motorPC = motor;
  motor = function(url, falla, opc){
    URL_ACT = url;
    TIT_ACT = (typeof SF !== 'undefined' && SF.activa && SF.it) ? SF.it.n + (SF.ep ? ' · T' + SF.ep.t + ' E' + SF.ep.e : '')
            : (typeof PF !== 'undefined' && PF.activa && PF.it) ? PF.it.n : (S.jugando ? S.jugando.n : 'PepeTV');
    clearTimeout(tSonido);
    return _motorPC(url, falla, opc);
  };

  /* ventana de opciones */
  document.body.insertAdjacentHTML('beforeend', `
  <div class="velo" id="vSinSonido"><div class="ven" style="width:min(94vw,calc(var(--u)*72))">
    <h3 id="ssTit">Este vídeo no tiene sonido aquí</h3>
    <p class="ajNota" id="ssTxt" style="margin:0 0 calc(var(--u)*1.2)"></p>
    <div class="botones" style="flex-direction:column;align-items:stretch;gap:calc(var(--u)*.8)">
      <button class="btn pri f" data-go="pcf:mpv" id="ssMpv">▶ Verlo con el reproductor alternativo (con sonido)</button>
      <button class="btn f" data-go="pcf:vlc" id="ssVlc">Abrir en VLC</button>
      <button class="btn f" data-go="pcf:copia">Copiar el enlace</button>
      <button class="btn f" data-go="cerrar" id="ssSeguir">Seguir aquí</button>
    </div>
  </div></div>`);
  function abreOpciones(tipo){
    const sin = tipo === 'sonido';
    document.getElementById('ssTit').textContent = sin ? 'Este vídeo no tiene sonido aquí' : tipo === 'boton' ? 'Abrir en otro reproductor' : 'Este vídeo no se puede ver aquí';
    document.getElementById('ssTxt').textContent = sin
      ? 'Su audio es de un tipo (Dolby/AC3) que el reproductor del ordenador no sabe reproducir. Con el reproductor alternativo se ve y se oye bien.'
      : tipo === 'boton' ? 'Ábrelo en un reproductor aparte, por ejemplo si no suena o va mal. Con Esc vuelves a PepeTV.'
      : 'Prueba a verlo con el reproductor alternativo: lee más tipos de vídeo y de sonido.';
    document.getElementById('ssMpv').style.display = PROG.mpv ? '' : 'none';
    document.getElementById('ssVlc').style.display = PROG.vlc ? '' : 'none';
    document.getElementById('ssSeguir').textContent = sin ? 'Seguir sin sonido' : 'Cerrar';
    abreVentana('vSinSonido');
  }
  async function fuera(prog){
    if (!URL_ACT) return;
    if (prog === 'copia') { await window.PepePC.copia(URL_ACT); cierraVentana(); aviso('Enlace copiado: pégalo en tu reproductor (Ctrl+V)'); return; }
    const desde = vid && !(S.tipo === 'live' || S.tipo === 'radio') ? Math.floor(vid.currentTime || 0) : 0;
    try { vid.pause(); } catch (e) {}
    if (document.body.classList.contains('full')) pantallaCompleta(false);
    const r = await window.PepePC.fuera({ url: URL_ACT, prog, titulo: TIT_ACT, desde });
    cierraVentana();
    aviso(r && r.ok ? (prog === 'vlc' ? 'Abriendo en VLC…' : 'Abriendo el reproductor alternativo… (Esc para volver)') : 'No se ha podido abrir el reproductor');
  }
  const _accionPC = accion;
  accion = function(go){
    if (go.startsWith('pcf:')) { fuera(go.slice(4)); return; }
    return _accionPC(go);
  };

  /* ¿se ve pero no suena? (el reproductor normal no ha decodificado nada de audio tras unos segundos) */
  vid.addEventListener('playing', () => {
    clearTimeout(tSonido);
    if (vid.nat) return;
    const url = URL_ACT;
    tSonido = setTimeout(() => {
      const el = vid.el;
      if (URL_ACT !== url || vid.paused || el.muted || !(el.currentTime > 3)) return;
      if (typeof el.webkitAudioDecodedByteCount === 'number' && el.webkitAudioDecodedByteCount === 0 && avisadoDe !== url) {
        avisadoDe = url; abreOpciones('sonido');
      }
    }, 7000);
  });
  /* si no se puede reproducir: ofrecer el reproductor alternativo */
  const _msgPlayerPC = msgPlayer;
  msgPlayer = function(h){
    _msgPlayerPC(h);
    const txt = String(h || '');
    if (PROG.mpv && URL_ACT && avisadoDe !== URL_ACT && /(No se puede reproducir|cannot be played)/i.test(txt)) { avisadoDe = URL_ACT; setTimeout(() => abreOpciones('falla'), 600); }
  };

  /* botón en la barra de iconos de Películas y Series */
  const ICX = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>`;
  const _barraRepPC = barraRep;
  barraRep = function(serie){
    return _barraRepPC(serie).replace(/<\/div>$/, `<div class="rbExtra"><button class="btn f rbi rbFuera" data-go="pcf:menu" aria-label="Abrir en otro reproductor">${ICX}<span>Otro reproductor</span></button></div></div>`);
  };
  const _accionPC2 = accion;
  accion = function(go){ if (go === 'pcf:menu') { abreOpciones('boton'); return; } return _accionPC2(go); };
})();
