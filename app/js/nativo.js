/* ===================================================================
   APK: idioma del audio y subtítulos con el reproductor nativo
   (en el ordenador solo existe el botón de audio para vídeos HLS)
   =================================================================== */
Object.assign(TXT.es, { subsNo:'Sin subtítulos', subs:'Subtítulos' });
Object.assign(TXT.en, { subsNo:'No subtitles', subs:'Subtitles' });
const ICN = { subs:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M7 12h3M12 12h5M7 15.5h7M16 15.5h1"/></svg>' };
document.getElementById('bAudio').insertAdjacentHTML('afterend', `<button class="pbtn" id="bSubs" data-go="pf:subs" hidden>${ICN.subs}<span></span></button>`);

const PISTAS = { audio:[], subs:[], sub:-1 };
const nomPista = p => String(p.lang || p.nombre || '?').toUpperCase().slice(0, 3);
function pintaPistas(){
  const ba = document.getElementById('bAudio'), bs = document.getElementById('bSubs');
  const sa = PISTAS.audio.findIndex(p => p.sel);
  ba.hidden = PISTAS.audio.length < 2;
  if (!ba.hidden) ba.querySelector('span').textContent = PISTAS.audio.length + ' · ' + nomPista(PISTAS.audio[Math.max(0, sa)]);
  bs.hidden = !PISTAS.subs.length;
  if (!bs.hidden) bs.querySelector('span').textContent = PISTAS.sub < 0 ? 'OFF' : nomPista(PISTAS.subs[PISTAS.sub] || {});
}
if (NATP) {
  NATP.addListener('pistas', e => {
    PISTAS.audio = (e.audio || []); PISTAS.subs = (e.subs || []);
    const s = PISTAS.subs.findIndex(p => p.sel); PISTAS.sub = s;
    pintaPistas();
  });
  /* sustituyen a las de series.js (que solo sabían de HLS) */
  pistasAudio = function(){ pintaPistas(); };
  cambiaAudio = function(){
    if (PISTAS.audio.length < 2) return;
    const a = PISTAS.audio.findIndex(p => p.sel), n = (a + 1) % PISTAS.audio.length;
    NATP.audio({ i: n }); aviso(t('audio') + ': ' + nomPista(PISTAS.audio[n]));
    if (typeof muestraVbar === 'function' && (PF.activa || SF.activa)) muestraVbar(); else muestraOSD();
  };
}
function cambiaSubs(){
  if (!NATP || !PISTAS.subs.length) return;
  PISTAS.sub = PISTAS.sub + 1 >= PISTAS.subs.length ? -1 : PISTAS.sub + 1;
  NATP.subs({ i: PISTAS.sub }); pintaPistas();
  aviso(PISTAS.sub < 0 ? t('subsNo') : t('subs') + ': ' + nomPista(PISTAS.subs[PISTAS.sub]));
}
/* el botón de audio y el de subtítulos también en TV en vivo */
const _accionPeli = accionPeli;
accionPeli = function(a){ if (a === 'subs') return cambiaSubs(); if (a === 'audio') return cambiaAudio(); return _accionPeli(a); };
const _accionSerie = accionSerie;
accionSerie = function(a, b){ if (a === 'subs') return cambiaSubs(); return _accionSerie(a, b); };
const _paraVideo = paraVideo;
paraVideo = function(){ PISTAS.audio = []; PISTAS.subs = []; PISTAS.sub = -1; pintaPistas(); _paraVideo(); };
