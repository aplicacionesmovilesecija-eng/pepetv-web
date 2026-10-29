/* ===================================================================
   2.8: botones de IDIOMA DEL AUDIO y SUBTÍTULOS en la barra de iconos (Películas y Series)
   Al pulsar sale una ventanita con la lista para elegir.
   - APK: pistas del reproductor nativo (todas: mkv, mp4, HLS…)
   - Ordenador/web: pistas de audio de los vídeos HLS; si no hay forma de cambiarlo aquí,
     en Windows ofrece el reproductor alternativo (tecla A = audio, S = subtítulos).
   =================================================================== */
(function(){
  const ICA = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/></svg>`;
  const ICT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M7 12h3M12 12h5M7 15.5h7M16 15.5h1"/></svg>`;
  const IDI = { es:'Español', spa:'Español', esp:'Español', en:'Inglés', eng:'Inglés', fr:'Francés', fra:'Francés', fre:'Francés', it:'Italiano', ita:'Italiano',
    pt:'Portugués', por:'Portugués', de:'Alemán', deu:'Alemán', ger:'Alemán', ca:'Catalán', cat:'Catalán', eu:'Euskera', eus:'Euskera', baq:'Euskera', gl:'Gallego', glg:'Gallego',
    ja:'Japonés', jpn:'Japonés', ko:'Coreano', kor:'Coreano', zh:'Chino', chi:'Chino', zho:'Chino', ru:'Ruso', rus:'Ruso', ar:'Árabe', ara:'Árabe', nl:'Neerlandés', nld:'Neerlandés', dut:'Neerlandés',
    pl:'Polaco', pol:'Polaco', tr:'Turco', tur:'Turco', sv:'Sueco', swe:'Sueco', hi:'Hindi', hin:'Hindi', und:'' };
  const nombre = (p, i) => {
    const l = String(p.lang || '').toLowerCase().split('-')[0], idi = IDI[l] !== undefined ? IDI[l] : (l ? l.toUpperCase() : '');
    const et = String(p.nombre || p.name || '').trim();
    let s = idi || et || ('Pista ' + (i + 1));
    if (et && idi && et.toLowerCase() !== idi.toLowerCase() && !et.toLowerCase().startsWith(idi.toLowerCase())) s += ' · ' + et;
    if (p.canales > 2) s += p.canales >= 6 ? ' (5.1)' : ' (' + p.canales + ' canales)';
    return s;
  };

  /* las pistas que hay ahora: {audio:[{n, sel}], subs:[{n, sel}], subOff} */
  function pistas(){
    if (typeof NATP !== 'undefined' && NATP && typeof PISTAS !== 'undefined')
      return { audio: PISTAS.audio.map((p, i) => ({ n: nombre(p, i), sel: !!p.sel })), subs: PISTAS.subs.map((p, i) => ({ n: nombre(p, i), sel: i === PISTAS.sub })), nat: true };
    const h = typeof hls !== 'undefined' && hls ? hls : null;
    return { audio: h && h.audioTracks ? h.audioTracks.map((p, i) => ({ n: nombre(p, i), sel: i === h.audioTrack })) : [],
             subs: h && h.subtitleTracks ? h.subtitleTracks.map((p, i) => ({ n: nombre(p, i), sel: i === h.subtitleTrack })) : [], nat: false };
  }
  function elige(tipo, i){
    if (typeof NATP !== 'undefined' && NATP && typeof PISTAS !== 'undefined') {
      if (tipo === 'a') { NATP.audio({ i }); PISTAS.audio.forEach((p, k) => p.sel = k === i); }
      else { PISTAS.sub = i; NATP.subs({ i }); }
      if (typeof pintaPistas === 'function') pintaPistas();
    } else if (typeof hls !== 'undefined' && hls) {
      if (tipo === 'a') hls.audioTrack = i; else { hls.subtitleTrack = i; hls.subtitleDisplay = i >= 0; }
    }
    const P = pistas(), L = tipo === 'a' ? P.audio : P.subs;
    aviso(tipo === 'a' ? 'Audio: ' + (L[i] ? L[i].n : '') : (i < 0 ? 'Sin subtítulos' : 'Subtítulos: ' + (L[i] ? L[i].n : '')));
    refresca();
  }

  /* ventanita con la lista */
  document.body.insertAdjacentHTML('beforeend', `<div class="velo" id="vPistas"><div class="ven" style="width:min(92vw,calc(var(--u)*46))">
    <h3 id="piTit"></h3><div class="botones" id="piLista" style="flex-direction:column;align-items:stretch;gap:calc(var(--u)*.6)"></div></div></div>`);
  function abre(tipo){
    const P = pistas(), L = tipo === 'a' ? P.audio : P.subs;
    document.getElementById('piTit').textContent = tipo === 'a' ? 'Idioma del audio' : 'Subtítulos';
    let h = '';
    if (!L.length || (tipo === 'a' && L.length < 2)) {
      const pc = window.PepePC && window.PepePC.fuera;
      h = `<p class="ajNota" style="margin:0 0 calc(var(--u)*.8)">${tipo === 'a' ? 'Este vídeo solo trae un idioma de audio' : 'Este vídeo no trae subtítulos'}${pc && !P.nat ? ', o el reproductor del ordenador no los puede cambiar. En el reproductor alternativo puedes elegirlos con la tecla ' + (tipo === 'a' ? 'A' : 'S') + '.' : '.'}</p>`
        + (pc && !P.nat ? `<button class="btn pri f" data-go="pcf:mpv">▶ Abrir en el reproductor alternativo</button>` : '');
    } else {
      if (tipo === 's') h += `<button class="btn f${L.every(x => !x.sel) ? ' pri' : ''}" data-go="pista:s:-1">${L.every(x => !x.sel) ? '✔ ' : ''}Sin subtítulos</button>`;
      L.forEach((x, i) => { h += `<button class="btn f${x.sel ? ' pri' : ''}" data-go="pista:${tipo}:${i}">${x.sel ? '✔ ' : ''}${esc(x.n)}</button>`; });
    }
    h += `<button class="btn f" data-go="cerrar">Cerrar</button>`;
    document.getElementById('piLista').innerHTML = h;
    abreVentana('vPistas');
  }

  /* botones en la barra (después de los de volumen) */
  const _barraRepP = barraRep;
  barraRep = function(serie){
    const b = (go, ico, tip, cls) => `<button class="btn f rbi ${cls}" data-go="${go}" data-tip="${tip}" aria-label="${tip}">${ico}</button>`;
    return _barraRepP(serie).replace('class="rbar', 'class="rbar rp').replace(/<\/div>$/, b('pista:menu:a', ICA, 'Idioma del audio', 'rbPa') + b('pista:menu:s', ICT, 'Subtítulos', 'rbPs') + '</div>');
  };
  /* gris si no hay nada que elegir; en el globito, lo que suena ahora */
  function refresca(){
    const P = pistas(), sa = P.audio.find(x => x.sel), ss = P.subs.find(x => x.sel);
    document.querySelectorAll('.rbPa').forEach(x => { x.classList.toggle('poco', P.audio.length < 2); x.dataset.tip = 'Idioma del audio' + (P.audio.length > 1 ? ' (' + P.audio.length + '): ' + (sa ? sa.n : '') : ''); });
    document.querySelectorAll('.rbPs').forEach(x => { x.classList.toggle('poco', !P.subs.length); x.dataset.tip = 'Subtítulos' + (P.subs.length ? ': ' + (ss ? ss.n : 'no') : ''); });
  }
  setInterval(() => { if (document.querySelector('.rbPa')) refresca(); }, 1500);

  const _accionP = accion;
  accion = function(go){
    if (go.startsWith('pista:')) {
      const [, q, v] = go.split(':');
      if (q === 'menu') abre(v); else { cierraVentana(); elige(q, +v); }
      return;
    }
    return _accionP(go);
  };
})();
