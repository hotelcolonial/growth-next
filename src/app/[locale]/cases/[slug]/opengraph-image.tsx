import {ImageResponse} from 'next/og';
import {getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {getCase, getCaseSlugs} from '@/lib/cases';
import {OG_SIZE, OG_CONTENT_TYPE, cargarRecursos, TarjetaOG} from '@/lib/og';

// OG por case: el titulo del frontmatter sobre la plantilla de marca.
// Mismo criterio que en el blog: la cobertura es WebP y satori no la lee.

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Growth Hotel Solutions';

export function generateStaticParams() {
  const slugs = getCaseSlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({locale, slug})));
}

export default async function Image({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  const caso = getCase(locale, slug);
  const t = await getTranslations({locale, namespace: 'Meta'});
  const {fuentes, logoSrc} = await cargarRecursos();

  // La metrica principal del case (ej. "+118%") es lo que mas vende al
  // compartirlo, asi que va de pie cuando existe.
  const metrica = caso?.frontmatter.metrics?.[0];
  const pie = metrica ? `${metrica.value} ${metrica.label}` : caso?.frontmatter.description;

  return new ImageResponse(
    (
      <TarjetaOG
        logoSrc={logoSrc}
        etiqueta="case"
        titulo={caso?.frontmatter.title ?? t('ogTitle')}
        pie={pie}
      />
    ),
    {...size, fonts: fuentes}
  );
}
