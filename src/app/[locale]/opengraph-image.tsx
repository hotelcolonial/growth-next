import {ImageResponse} from 'next/og';
import {getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {OG_SIZE, OG_CONTENT_TYPE, cargarRecursos, TarjetaOG} from '@/lib/og';

// Imagen Open Graph por defecto. Al vivir en el segmento [locale], Next la
// aplica a la home y a todo lo que cuelga de ella (blog, privacidade, 404),
// salvo donde otro opengraph-image la sobrescriba (posts y cases).

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'GrowthDirect Hotel Solutions';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function Image({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Meta'});
  const {fuentes, logoSrc} = await cargarRecursos();

  return new ImageResponse(
    (
      <TarjetaOG
        logoSrc={logoSrc}
        titulo={t('ogTitle')}
        pie={t('ogSubtitle')}
      />
    ),
    {...size, fonts: fuentes}
  );
}
