import {notFound} from 'next/navigation';

// Catch-all DENTRO de [locale]. Sin esto, una URL como /pt/no-existe no casa
// con ninguna ruta y Next cae en su 404 global, que vive fuera del segmento
// [locale] y por tanto no tiene idioma ni layout: la pagina generica en ingles
// y sin header ni footer.
//
// Al capturarla aqui y llamar a notFound(), Next renderiza el not-found mas
// cercano — [locale]/not-found.tsx — ya dentro de [locale]/layout.tsx, con el
// idioma de la URL y la marca del sitio.
//
// Las rutas concretas (/blog, /cases/[slug]) tienen prioridad sobre el
// catch-all, asi que esto no las tapa.
export default function CatchAllNotFound() {
  notFound();
}
