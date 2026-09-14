// Preloader: gesto de marca de ~0,9 s.
//
// No lleva JavaScript a proposito:
//  - la animacion es CSS (logo) + SMIL (la ola), asi que el preloader se
//    retira solo aunque el JS falle o tarde. Antes dependia de un setTimeout
//    de 7,3 s: si el JS no corria, la cortina no se levantaba nunca.
//  - el contenido real ya esta renderizado debajo desde el primer paint, de
//    modo que el LCP no depende de esta capa.
//  - que aparezca una sola vez por sesion lo resuelve el script inline de
//    layout.tsx, que marca <html data-loader-seen> ANTES del primer paint.
//
// aria-hidden: es decoracion pura; los lectores de pantalla deben ignorarla.
export default function Loader() {
  return (
    <div id="loader" aria-hidden="true">
      <svg className="loader-wave" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
        <path fill="#F4EFEA" d="M0,0 H1440 V900 C1140,900 860,900 580,900 C380,900 180,900 0,900 Z">
          <animate
            attributeName="d"
            begin="0.42s"
            dur="0.46s"
            fill="freeze"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.5 0 0.2 1"
            values="M0,0 H1440 V900 C1140,900 860,900 580,900 C380,900 180,900 0,900 Z;M0,0 H1440 V-90 C1140,60 860,-180 580,-30 C380,40 180,-150 0,-70 Z"
          />
        </path>
      </svg>
      <div className="loader-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-growthdirect.webp" alt="" />
      </div>
    </div>
  );
}
