// El opengraph-image de [locale] no llega hasta aqui: cuando un segmento hijo
// declara su propio `openGraph` en generateMetadata, Next deja de heredar la
// imagen del padre. Se reexporta la tarjeta por defecto para que el listado
// del blog tambien tenga la suya.
export {default, size, contentType, alt, generateStaticParams} from '../opengraph-image';
