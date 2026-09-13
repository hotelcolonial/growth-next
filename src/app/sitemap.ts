import type {MetadataRoute} from 'next';
import {routing} from '@/i18n/routing';
import {SITE_URL} from '@/lib/seo';
import {getPostSlugs, getPost} from '@/lib/blog';
import {getCaseSlugs, getCase} from '@/lib/cases';

// Sitemap generado en build. Solo lista URLs que EXISTEN de verdad:
// las secciones del menu (#servicos, #metodo, #planos) son anclas de la home,
// no rutas, y por eso no aparecen aqui.
//
// Cada entrada lleva `alternates.languages` con los 3 idiomas + x-default, que
// es la forma en que Google entiende un sitio multilingue desde el sitemap.
// Los codigos son los mismos que emiten las etiquetas <link hreflang> de las
// paginas (pt / es / en): si algun dia se cambian a pt-BR, hay que cambiarlos
// en los dos sitios a la vez o Google vera senales contradictorias.

const {locales, defaultLocale} = routing;

/** URL absoluta para un locale + ruta sin prefijo de idioma. */
const abs = (locale: string, path = '') => `${SITE_URL}/${locale}${path}`;

/** Mapa hreflang para una ruta dada, en los 3 idiomas + x-default. */
function languagesFor(path = ''): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = abs(l, path);
  languages['x-default'] = abs(defaultLocale, path);
  return languages;
}

/** Una entrada por idioma para la misma ruta, todas con sus alternates. */
function entriesFor(
  path: string,
  lastModified: Date,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  priority: number
): MetadataRoute.Sitemap {
  const languages = languagesFor(path);
  return locales.map((locale) => ({
    url: abs(locale, path),
    lastModified,
    changeFrequency,
    priority,
    alternates: {languages}
  }));
}

/** Fecha del frontmatter ("2024-01-01") a Date; si falla, la de build. */
function parseDate(iso?: string): Date {
  if (!iso) return new Date();
  const d = new Date(`${iso}T00:00:00Z`);
  return isNaN(d.getTime()) ? new Date() : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // --- Home ---------------------------------------------------------------
  const home = entriesFor('', now, 'weekly', 1);

  // --- Cases --------------------------------------------------------------
  const caseSlugs = getCaseSlugs();
  const cases = caseSlugs.flatMap((slug) => {
    const c = getCase(defaultLocale, slug);
    return entriesFor(
      `/cases/${slug}`,
      parseDate(c?.frontmatter.date),
      'yearly',
      0.8
    );
  });

  // --- Blog ---------------------------------------------------------------
  // getPostSlugs() devuelve [] si aun no hay posts: el sitemap sigue siendo
  // valido, solo que sin entradas de articulos.
  const postSlugs = getPostSlugs();
  const posts = postSlugs.flatMap((slug) => {
    const p = getPost(defaultLocale, slug);
    return entriesFor(
      `/blog/${slug}`,
      parseDate(p?.frontmatter.date),
      'monthly',
      0.7
    );
  });

  // El listado del blog se "actualiza" con su post mas reciente.
  const ultimoPost = posts.length
    ? new Date(Math.max(...posts.map((e) => (e.lastModified as Date).getTime())))
    : now;
  const blogIndex = entriesFor('/blog', ultimoPost, 'weekly', 0.6);

  // --- Legal --------------------------------------------------------------
  const privacidade = entriesFor('/privacidade', now, 'yearly', 0.3);

  return [...home, ...cases, ...blogIndex, ...posts, ...privacidade];
}
