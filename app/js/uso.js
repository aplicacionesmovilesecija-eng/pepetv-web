/* ===================================================================
   CONSUMO (v1.2): cuánto tiempo se usa la app y qué se ve
   Cada minuto, si la app está a la vista, suma 1 minuto "abierta" y, si algo se está reproduciendo,
   1 minuto "viendo" a ese canal / película / serie / radio. Cada 10 minutos lo manda al panel (resumen del día).
   No se manda nada más: ni listas, ni contraseñas.
   =================================================================== */
const hoyUso = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
function reproduciendo(){
  try {
    if (typeof vid === 'undefined' || vid.paused) return false;
    if (typeof PF !== 'undefined' && PF.activa) return true;
    if (typeof SF !== 'undefined' && SF.activa) return true;
    return !!(S.jugando && $('#sec').classList.contains('on'));
  } catch (e) { return false; }
}
function etiquetaUso(){
  let q = (typeof queVe === 'function' ? queVe() : '') || '';
  return q.replace(/\s+T\d+E\d+$/i, '').slice(0, 70);          // series: el nombre, sin el capítulo
}
function sumaMinuto(){
  if (document.hidden) return;
  const u = lee('uso', {}), d = hoyUso(), x = u[d] || (u[d] = { ab:0, v:0, c:{} });
  x.ab++;
  if (reproduciendo()) { x.v++; const e = etiquetaUso(); if (e) x.c[e] = (x.c[e] || 0) + 1; }
  Object.keys(u).sort().slice(0, -10).forEach(k => delete u[k]);     // solo los últimos 10 días
  guarda('uso', u);
}
async function mandaUso(){
  if (!BRAND.api) return;
  const u = lee('uso', {}), env = lee('uso_env', {});
  for (const d of Object.keys(u).sort().slice(-2)) {                  // hoy y ayer (por si ayer quedó algo sin mandar)
    const x = u[d], top = Object.entries(x.c).sort((a, b) => b[1] - a[1]).slice(0, 25), firma = x.ab + '|' + x.v;
    if (env[d] === firma) continue;
    try {
      const q = new URLSearchParams({ a:'uso', d:CODE, s:SEC, f:d, ab:x.ab, v:x.v, c:JSON.stringify(Object.fromEntries(top)) });
      const j = await (await fetch(BRAND.api + '?' + q)).json();
      if (j && j.ok) { env[d] = firma; guarda('uso_env', env); }
    } catch (e) {}
  }
}
setInterval(sumaMinuto, 60000);
setInterval(mandaUso, 600000);
setTimeout(mandaUso, 20000);
document.addEventListener('visibilitychange', () => { if (document.hidden) mandaUso(); });
