/* ===================================================================
   AJUSTES DEL REPRODUCTOR PROTEGIDOS (1.3)
   Se pueden ver, pero para cambiarlos hace falta un código de un solo uso que da el proveedor:
   el cliente lo pide desde aquí, el panel crea un número aleatorio y avisa al proveedor; sirve una vez
   (hasta salir de Reproductor o de Ajustes) y caduca a los 30 minutos.
   =================================================================== */
Object.assign(TXT.es, {
  repTit:'Ajustes protegidos', repAvisoTit:'Antes de tocar nada…',
  repAviso:'Todo está configurado para que veas los canales y las películas de la mejor manera posible. Cambiar estos ajustes puede empeorar la reproducción. Si de verdad necesitas cambiar algo, pide un código a tu proveedor.',
  repCaja:'Para cambiar estos ajustes necesitas un <b>código de un solo uso</b> que te da tu proveedor.',
  repPide:'Pedir código a soporte', repTengo:'Tengo un código', repEscribe:'Escribe el código de 6 cifras',
  repPedido:'Código pedido. Tu proveedor te lo dará; luego pulsa «Tengo un código».', repOk:'Ajustes desbloqueados. Al salir se volverán a proteger.',
  repError:'No se ha podido conectar. Revisa internet.', repBloq:'Estos ajustes están protegidos. Pide un código a tu proveedor.',
  repWaTit:'¿Avisar por WhatsApp?', repWaTxt:'Tu proveedor ya tiene el código en su panel. Si quieres, abre WhatsApp para avisarle de que lo has pedido.'
});
Object.assign(TXT.en, {
  repTit:'Protected settings', repAvisoTit:'Before changing anything…',
  repAviso:'Everything is set up for the best possible playback. Changing these settings may make it worse. If you really need to change something, ask your provider for a code.',
  repCaja:'To change these settings you need a <b>one-time code</b> from your provider.',
  repPide:'Ask support for a code', repTengo:'I have a code', repEscribe:'Enter the 6-digit code',
  repPedido:'Code requested. Your provider will give it to you; then press “I have a code”.', repOk:'Settings unlocked. They will be protected again when you leave.',
  repError:'Could not connect. Check your internet.', repBloq:'These settings are protected. Ask your provider for a code.',
  repWaTit:'Notify on WhatsApp?', repWaTxt:'Your provider already has the code in their panel. You can open WhatsApp to let them know.'
});
document.head.insertAdjacentHTML('beforeend', `<style>
.repCaja{display:flex;flex-direction:column;gap:calc(var(--u)*.7);padding:calc(var(--u)*1.4);border-radius:calc(var(--u)*1.1);border:1px solid #f5a524;
  background:color-mix(in srgb,#f5a524 12%,var(--card))}
.repCaja b.t{font-size:calc(var(--u)*var(--ft)*1.45);color:#FFC766}
html[data-tema="claro"] .repCaja b.t{color:#9A6400}
.repCaja p{color:var(--mut);font-size:calc(var(--u)*var(--ft)*1.2);line-height:1.45;margin:0}
#ajPanel.repBloq .ajv,#ajPanel.repBloq .btn.peligro{opacity:.45}
</style>`);

let repOK = false, repAvisado = false;
const repProtegido = () => !!BRAND.api && !repOK;
function repBloqueo(){ repOK = false; repAvisado = false; }               // al entrar en Ajustes, todo protegido otra vez

const _pintaPanelAjR = pintaPanelAj;
pintaPanelAj = function(enfocar){
  _pintaPanelAjR(enfocar);
  const P = $('#ajPanel');
  P.classList.toggle('repBloq', secAj === 'rep' && repProtegido());
  if (secAj !== 'rep' || !repProtegido()) return;
  const h = `<div class="repCaja"><b class="t">🔒 ${t('repTit')}</b><p>${t('repCaja')}</p>
    <div class="ajBtns">${boton('repPide', t('repPide'), 'pri')}${boton('repTengo', t('repTengo'))}</div></div>`;
  const tit = P.querySelector('h2'); if (tit) tit.insertAdjacentHTML('afterend', h); else P.insertAdjacentHTML('afterbegin', h);
  if (enfocar && /^aja:rep/.test(enfocar)) { const e = P.querySelector(`[data-go="${enfocar}"]`); if (e) enfoca(e); }
  if (!repAvisado) { repAvisado = true;
    const no = $('#vConf [data-go="conf:no"]'); no.style.display = 'none';
    setTimeout(() => pideConfirmar(t('repAvisoTit'), t('repAviso')).finally(() => { no.style.display = ''; }), 150); }
};
async function repPideCodigo(){
  try {
    const j = await (await fetch(BRAND.api + '?' + new URLSearchParams({ a:'codrep', d:CODE, s:SEC, pide:'1' }))).json();
    if (!j || !j.ok) throw new Error('x');
    aviso(t('repPedido'));
    const s = (LIC && LIC.support) || {};
    if (s.wa || s.tel) setTimeout(() => pideConfirmar(t('repWaTit'), t('repWaTxt')).then(si => { if (si) contactaSoporte('codrep'); }), 700);
  } catch (e) { aviso(t('repError')); }
}
async function repTengoCodigo(){
  const v = ((await pideTexto(t('repEscribe'), '')) || '').replace(/\D/g, '');
  if (!v) return;
  try {
    const j = await (await fetch(BRAND.api + '?' + new URLSearchParams({ a:'codrep', d:CODE, s:SEC, v }))).json();
    if (j && j.ok) { repOK = true; aviso(t('repOk')); pintaPanelAj(); const e = $('#ajPanel .ajv'); if (e) enfoca(e); }
    else aviso((j && j.err) || t('repError'));
  } catch (e) { aviso(t('repError')); }
}
const _accionR = accion;
accion = function(go){
  if (go === 'aja:repPide') return repPideCodigo();
  if (go === 'aja:repTengo') return repTengoCodigo();
  if (go.startsWith('ajs:') && go !== 'ajs:rep') { repOK = false; repAvisado = false; }     // al salir de Reproductor se vuelve a proteger
  if (go === 'ajs:rep') repAvisado = false;
  if (secAj === 'rep' && repProtegido() && (go.startsWith('ajc:') || go === 'aja:borrarTodo') && $('#ajustes').classList.contains('on')) { aviso(t('repBloq')); return; }
  return _accionR(go);
};
/* al salir de Ajustes también se vuelve a proteger */
const _muestraR = muestra;
muestra = function(id, g){ if (id !== 'ajustes') { repOK = false; repAvisado = false; } return _muestraR(id, g); };
