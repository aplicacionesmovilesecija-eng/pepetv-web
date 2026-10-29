/* ===================================================================
   ENVIAR MI LISTA A SOPORTE  +  AVISOS DEL PROVEEDOR   (v1.1)
   - El cliente manda su propia lista (enlace M3U, datos Xtream o archivo M3U) desde Ajustes → Mi cuenta.
     No se carga sola: el proveedor la revisa en el panel y la aprueba o la rechaza (con un motivo).
     Al enviarla puede avisar también por WhatsApp.
   - Avisos: el proveedor escribe un mensaje en el panel para todos o para algunos aparatos;
     aquí se enseña una sola vez, cuando llega.
   =================================================================== */
Object.assign(TXT.es, {
  envTit:'Enviar mi lista', envTxt:'¿Tienes tu propia lista? Mándala desde aquí (enlace M3U, datos Xtream o archivo) y te aparecerá en la app.',
  envBoton:'Enviar mi lista', envEnlace:'Enlace M3U', envXtream:'Datos Xtream', envArchivo:'Archivo M3U', envNombre:'Nombre para la lista (opcional)',
  envUrl:'Enlace de la lista (http://…)', envServidor:'Servidor (ej. http://servidor.com:8080)', envUsuario:'Usuario', envClave:'Contraseña',
  envElegir:'Elegir archivo…', envSinArchivo:'Ningún archivo elegido', envMandar:'Enviar', envEnviando:'Enviando…',
  envOk:'Lista enviada. Tu proveedor la revisará y te avisará.', envAvisarTit:'¿Avisar por WhatsApp?', envAvisarTxt:'Tu lista ya está enviada. Si quieres, abre WhatsApp para avisar a tu proveedor de que la revise.',
  envError:'No se ha podido enviar. Revisa la conexión a internet.', envFaltan:'Rellena los datos de la lista.', envSinPanel:'Esta app no está conectada a ningún panel.',
  envPend:'⏳ Pendiente de revisión', envAprob:'✅ Aprobada: ya la tienes en tu app', envRech:'❌ Rechazada', envMis:'Mis envíos',
  envTV:'En la tele, el archivo es difícil de elegir: mejor envía el enlace o los datos Xtream (o hazlo desde el móvil).',
  avisoTit:'Aviso de tu proveedor'
});
Object.assign(TXT.en, {
  envTit:'Send my list to support', envTxt:'Have your own list? Send it to your provider: they will check it and, if everything is fine, it will appear in the app.',
  envBoton:'Send my list', envEnlace:'M3U link', envXtream:'Xtream details', envArchivo:'M3U file', envNombre:'Name for the list (optional)',
  envUrl:'List link (http://…)', envServidor:'Server (e.g. http://server.com:8080)', envUsuario:'Username', envClave:'Password',
  envElegir:'Choose file…', envSinArchivo:'No file chosen', envMandar:'Send', envEnviando:'Sending…',
  envOk:'List sent. Your provider will check it.', envAvisarTit:'Notify on WhatsApp?', envAvisarTxt:'Your list has been sent. You can open WhatsApp to let your provider know.',
  envError:'Could not send. Check your internet connection.', envFaltan:'Fill in the list details.', envSinPanel:'This app is not connected to a panel.',
  envPend:'⏳ Waiting for review', envAprob:'✅ Approved: it is in your app', envRech:'❌ Rejected', envMis:'My submissions',
  envTV:'On a TV, choosing a file is hard: better send the link or the Xtream details (or use your phone).',
  avisoTit:'Message from your provider'
});

/* ---------- ventana del formulario ---------- */
document.body.insertAdjacentHTML('beforeend', `
<div class="velo" id="vEnvio"><div class="ven envVen">
  <h3 data-t="envTit"></h3>
  <div class="envTabs" id="envTabs"></div>
  <input type="text" class="f envIn" id="envN" maxlength="40" autocomplete="off">
  <div id="envCampos"></div>
  <input type="file" id="envFile" accept=".m3u,.m3u8,.txt,audio/x-mpegurl,application/x-mpegurl,text/plain" hidden>
  <p class="envMsg" id="envMsg"></p>
  <div class="botones"><button class="btn f" data-go="cerrar" data-t="cancelar"></button><button class="btn pri f" data-go="env:mandar" id="envMandar" data-t="envMandar"></button></div>
</div></div>`);
document.head.insertAdjacentHTML('beforeend', `<style>
.envVen{width:min(94vw,calc(var(--u)*70))}
.envTabs{display:flex;gap:calc(var(--u)*.8);flex-wrap:wrap}
.envTabs .btn{padding:calc(var(--u)*.7) calc(var(--u)*1.4);font-size:calc(var(--u)*var(--ft)*1.25)}
.envTabs .btn.sel{background:var(--grad);border-color:transparent;color:#fff}
.ven input.envIn{width:100%;margin-top:calc(var(--u)*.4)}
.envArch{display:flex;align-items:center;gap:calc(var(--u)*1);margin-top:calc(var(--u)*.6)}
.envArch small{color:var(--mut);font-size:calc(var(--u)*var(--ft)*1.15);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.envMsg{min-height:calc(var(--u)*1.6);font-size:calc(var(--u)*var(--ft)*1.2);color:#ff9a9a;margin:0}
.envMsg.ok{color:#7DE8A4}.envMsg.info{color:var(--mut)}
.ajEnv .envFila{display:flex;justify-content:space-between;gap:calc(var(--u)*1);padding:calc(var(--u)*.6) 0;border-bottom:1px solid var(--line);font-size:calc(var(--u)*var(--ft)*1.2)}
.ajEnv .envFila b{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ajEnv .envFila span{color:var(--mut);text-align:right}
</style>`);
const enTele = () => /TV/i.test(sistema());
const ENV = { tipo:'link', txt:'', fname:'' };
function pintaEnvio(){
  const tabs = [['link', 'envEnlace'], ['xtream', 'envXtream'], ['file', 'envArchivo']];
  $('#envTabs').innerHTML = tabs.map(([k, l]) => `<button class="btn f${ENV.tipo === k ? ' sel' : ''}" data-go="env:tipo:${k}">${t(l)}</button>`).join('');
  $('#envN').placeholder = t('envNombre');
  const inp = (id, ph, modo) => `<input type="text" inputmode="${modo || 'text'}" class="f envIn" id="${id}" placeholder="${esc(t(ph))}" autocomplete="off" autocapitalize="off" spellcheck="false">`;
  let h = '';
  if (ENV.tipo === 'link') h = inp('envUrl', 'envUrl', 'url');
  else if (ENV.tipo === 'xtream') h = inp('envSrv', 'envServidor', 'url') + inp('envUsr', 'envUsuario') + inp('envPas', 'envClave');
  else h = `<div class="envArch"><button class="btn f" data-go="env:archivo">${t('envElegir')}</button><small id="envFname">${esc(ENV.fname || t('envSinArchivo'))}</small></div>`;
  $('#envCampos').innerHTML = h;
  const m = $('#envMsg'); m.className = 'envMsg' + (ENV.tipo === 'file' && enTele() ? ' info' : ''); m.textContent = ENV.tipo === 'file' && enTele() ? t('envTV') : '';
  enganchaCampos();
}
/* en los campos de texto: ↑ ↓ cambian de campo (mando), Enter pasa al siguiente, el resto es para escribir */
function enganchaCampos(){
  $$('#vEnvio input.envIn').forEach(i => { if (i._ok) return; i._ok = true;
    i.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') return;                         // lo mueve el mando
      if (e.key === 'Enter') { e.preventDefault(); const l = $$('#vEnvio input.envIn'), k = l.indexOf(i); enfoca(l[k + 1] || $('#envMandar')); }
      if (e.key === 'Escape') return;
      e.stopPropagation();
    }); });
}
function abreEnvio(){
  if (!BRAND.api) { aviso(t('envSinPanel')); return; }
  ENV.txt = ''; ENV.fname = ''; $('#envN').value = ''; pintaEnvio(); abreVentana('vEnvio');
}
$('#envFile').addEventListener('change', e => {
  const f = e.target.files && e.target.files[0]; if (!f) return;
  if (f.size > 30e6) { $('#envMsg').className = 'envMsg'; $('#envMsg').textContent = 'El archivo es demasiado grande (máximo 30 MB).'; return; }
  const r = new FileReader();
  r.onload = () => { ENV.txt = String(r.result || ''); ENV.fname = f.name; $('#envFname').textContent = f.name + ' · ' + Math.round(f.size / 1024) + ' KB';
    const ok = /#EXTM3U|#EXTINF/i.test(ENV.txt.slice(0, 5000)); $('#envMsg').className = 'envMsg' + (ok ? ' ok' : ''); $('#envMsg').textContent = ok ? '✓ Lista M3U' : 'Ese archivo no parece una lista M3U.'; if (!ok) ENV.txt = ''; };
  r.readAsText(f); e.target.value = '';
});
async function mandaEnvio(){
  const msg = $('#envMsg'), b = $('#envMandar'), n = $('#envN').value.trim(), v = id => (($('#' + id) || {}).value || '').trim();
  let r;
  const datos = { a:'envio', d:CODE, s:SEC, tipo:ENV.tipo, n };
  if (ENV.tipo === 'link') { datos.url = v('envUrl'); if (!datos.url) { msg.className = 'envMsg'; msg.textContent = t('envFaltan'); return; } }
  if (ENV.tipo === 'xtream') { datos.server = v('envSrv'); datos.user = v('envUsr'); datos.pass = v('envPas'); if (!datos.server || !datos.user || !datos.pass) { msg.className = 'envMsg'; msg.textContent = t('envFaltan'); return; } }
  if (ENV.tipo === 'file' && !ENV.txt) { msg.className = 'envMsg'; msg.textContent = t('envFaltan'); return; }
  b.disabled = true; msg.className = 'envMsg info'; msg.textContent = t('envEnviando');
  try {
    if (ENV.tipo === 'file') {
      datos.fname = ENV.fname; datos.contenido = ENV.txt;
      r = await (await fetch(BRAND.api, { method:'POST', body: JSON.stringify(datos) })).json();      // sin cabeceras: Google lo acepta sin permisos extra
    } else r = await (await fetch(BRAND.api + '?' + new URLSearchParams(datos))).json();
  } catch (e) { r = { ok:false, err: t('envError') }; }
  b.disabled = false;
  if (!r || !r.ok) { msg.className = 'envMsg'; msg.textContent = (r && r.err) || t('envError'); return; }
  if (LIC) { LIC.envios = r.envios || LIC.envios; guarda('lic', LIC); }
  cierraVentana();
  if (r.directa) { aviso('✅ Lista añadida: ya la tienes en tu app'); if (typeof arranca === 'function') setTimeout(() => arranca(true), 800); if ($('#ajustes').classList.contains('on')) pintaPanelAj('aja:envAbre'); return; }   // 2.2: entra directamente
  aviso(t('envOk'));
  if ($('#ajustes').classList.contains('on')) pintaPanelAj('aja:envAbre');
  const s = (LIC && LIC.support) || {};
  if (s.wa || s.tel) setTimeout(() => pideConfirmar(t('envAvisarTit'), t('envAvisarTxt')).then(si => { if (si) contactaSoporte('envio'); }), 600);
}

/* ---------- Mi cuenta: botón y estado de los envíos ---------- */
const _pintaPanelAjE = pintaPanelAj;
pintaPanelAj = function(enfocar){
  _pintaPanelAjE(enfocar);
  if (secAj !== 'cue') return;
  const l = (LIC && LIC.envios) || [];
  const est = e => e.st === 'APROBADA' ? t('envAprob') : e.st === 'RECHAZADA' ? t('envRech') + (e.m ? ': ' + esc(e.m) : '') : t('envPend');
  const h = `<div class="ajAsis ajEnv"><h3>${t('envTit')}</h3><p class="ajNota">${t('envTxt')}</p>
    <div class="ajBtns">${boton('envAbre', t('envBoton'), 'pri')}</div>
    ${l.length ? `<p class="ajNota" style="margin-top:calc(var(--u)*.6)"><b>${t('envMis')}</b></p>` + l.map(e => `<div class="envFila"><b>${esc(e.n)}</b><span>${est(e)}</span></div>`).join('') : ''}</div>`;
  const ancla = $('#ajLisTit') || $('#ajPanel .ajAsis:not(.ajEnv)');           // 1.3: antes de "Listas y guía"
  if (ancla) ancla.insertAdjacentHTML('beforebegin', h); else $('#ajPanel').insertAdjacentHTML('beforeend', h);
  if (enfocar === 'aja:envAbre') { const e = $('#ajPanel [data-go="aja:envAbre"]'); if (e) enfoca(e); }
};
const _accionE = accion;
accion = function(go){
  const p = go.split(':');
  if (go === 'aja:envAbre') return abreEnvio();
  if (p[0] === 'env') {
    if (p[1] === 'tipo') { ENV.tipo = p[2]; pintaEnvio(); const b = $(`#envTabs [data-go="env:tipo:${p[2]}"]`); if (b) enfoca(b); return; }
    if (p[1] === 'archivo') return $('#envFile').click();
    if (p[1] === 'mandar') return mandaEnvio();
  }
  return _accionE(go);
};

/* ---------- avisos del proveedor (llegan al abrir la app y cada 2 minutos) ---------- */
let avisosCola = [], avisoMostrando = false;
const avisosPorConfirmar = [];
function muestraAvisos(l){
  const vistos = lee('avisos_vistos', []);
  (l || []).forEach(a => { if (a && a.id && !vistos.includes(a.id) && !avisosCola.some(x => x.id === a.id)) avisosCola.push(a); });
  sigueAvisos();
}
function sigueAvisos(){
  if (avisoMostrando || !avisosCola.length) return;
  if (document.querySelector('.velo.on') || document.body.classList.contains('full') || $('#splash').classList.contains('on')) { setTimeout(sigueAvisos, 5000); return; }
  const a = avisosCola.shift(); avisoMostrando = true;
  const vistos = lee('avisos_vistos', []); vistos.push(a.id); guarda('avisos_vistos', vistos.slice(-100));
  avisosPorConfirmar.push(a.id); setTimeout(ping, 1500);          // el panel verá que ya le ha salido
  const no = $('#vConf [data-go="conf:no"]'); no.style.display = 'none';
  const pc = pideConfirmar(t('avisoTit'), a.txt);
  if (a.img) $('#confTxt').insertAdjacentHTML('afterbegin', `<img class="avImg" src="${esc(a.img)}" alt="">`);   // 2.1: aviso con imagen
  pc.finally(() => { no.style.display = ''; avisoMostrando = false; setTimeout(sigueAvisos, 400); });
}

/* ---------- ENLACES (los pone el proveedor en el panel) ---------- */
Object.assign(TXT.es, { enlTit:'Enlaces', enlSin:'Tu proveedor aún no ha puesto enlaces.', enlTV:'Se abrirá en el navegador del aparato.' });
Object.assign(TXT.en, { enlTit:'Links', enlSin:'Your provider has not added any links yet.', enlTV:'It will open in the device browser.' });
document.body.insertAdjacentHTML('beforeend', `<div class="velo" id="vEnlaces"><div class="ven enlVen">
  <h3 data-t="enlTit"></h3><div class="enlLista" id="enlLista"></div>
  <div class="botones"><button class="btn pri f" data-go="cerrar" data-t="cerrar"></button></div></div></div>`);
document.head.insertAdjacentHTML('beforeend', `<style>
.enlVen{width:min(94vw,calc(var(--u)*64))}
.enlLista{display:flex;flex-direction:column;gap:calc(var(--u)*.8);max-height:58vh;overflow-y:auto;padding:calc(var(--u)*.3)}
.enlLista .btn{justify-content:flex-start;text-align:left;gap:calc(var(--u)*1.2);padding:calc(var(--u)*1.1) calc(var(--u)*1.6)}
.enlLista .btn i{width:calc(var(--u)*3.4);height:calc(var(--u)*3.4);border-radius:calc(var(--u)*.8);background:var(--grad);display:grid;place-items:center;flex:none;color:#fff;font-style:normal}
.enlLista .btn i svg{width:58%;height:58%}
.enlLista .btn span{display:flex;flex-direction:column;min-width:0}
.enlLista .btn small{color:var(--mut);font-weight:400;font-size:calc(var(--u)*var(--ft)*1.1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.enlLista .btn.kf small,.enlLista .btn:focus-visible small{color:inherit}
</style>`);
const ICO_ENL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>';
function abreEnlaces(){
  const l = (LIC && LIC.links) || [];
  $('#enlLista').innerHTML = l.length ? l.map((x, i) => `<button class="btn f" data-go="enl:${i}"><i>${ICO_ENL}</i><span><b>${esc(x.t)}</b>${x.d ? `<small>${esc(x.d)}</small>` : ''}</span></button>`).join('')
    : `<p class="ajNota">${t('enlSin')}</p>`;
  abreVentana('vEnlaces');
}
const _accionL = accion;
accion = function(go){
  if (go === 'enlaces') return abreEnlaces();
  if (go.startsWith('enl:')) { const x = ((LIC && LIC.links) || [])[+go.slice(4)]; if (x && /^https?:/i.test(x.u)) { cierraVentana(); abreFuera(x.u); } return; }
  return _accionL(go);
};
