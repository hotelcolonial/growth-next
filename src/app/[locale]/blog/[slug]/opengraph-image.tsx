import {ImageResponse} from 'next/og';
import {getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {getPost, getPostSlugs} from '@/lib/blog';
import {OG_SIZE, OG_CONTENT_TYPE, cargarRecursos, TarjetaOG} from '@/lib/og';

// OG por artículo: el título del frontmatter sobre la plantilla de marca.
//
// No se usa el `coverImage` de fondo a proposito: todas las coberturas del
// sitio son WebP, formato que satori no sabe decodificar. Ademas, un titulo
// sobre color plano se lee mejor en miniatura que sobre una foto con overlay.

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'GrowthDirect Hotel Solutions';

export function generateStaticParams() {
  const slugs = getPostSlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({locale, slug})));
}

export default async function Image({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  const post = getPost(locale, slug);
  const t = await getTranslations({locale, namespace: 'Meta'});
  const {fuentes, logoSrc} = await cargarRecursos();

  return new ImageResponse(
    (
      <TarjetaOG
        logoSrc={logoSrc}
        etiqueta="blog"
        // Si el post no existiera, la tarjeta cae al titulo generico en vez
        // de romper la generacion de la imagen.
        titulo={post?.frontmatter.title ?? t('ogTitle')}
        pie={post?.frontmatter.description}
      />
    ),
    {...size, fonts: fuentes}
  );
}
