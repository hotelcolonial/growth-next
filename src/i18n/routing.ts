import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // Idiomas soportados
  locales: ['pt', 'es', 'en'],

  // Idioma por defecto
  defaultLocale: 'pt',

  // Prefijo de idioma siempre presente en la URL (/pt, /es, /en)
  localePrefix: 'always'
});
