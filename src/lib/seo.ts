import type {Metadata} from 'next';
import {routing} from '@/i18n/routing';

// Base URL (no trailing slash). Set via NEXT_PUBLIC_SITE_URL; falls back to
// localhost for local dev when the env var is absent.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3100').replace(/\/+$/, '');

// Indexing switch. Only 'true' allows indexing; anything else => noindex.
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true';

const BRAND = 'Growth Hotel Solutions';
// Logo de marca en PNG. Ya NO es la imagen Open Graph —de eso se encargan los
// opengraph-image.tsx con next/og—; su unico papel ahora es el `logo` de los
// datos estructurados JSON-LD, donde Google recomienda un formato clasico.
// El generador de OG usa su propia copia en assets/og/logo.png.
const BRAND_LOGO = '/logo-growth-transparente.png';

const OG_LOCALES: Record<string, string> = {pt: 'pt_BR', es: 'es_ES', en: 'en_US'};
const BCP47: Record<string, string> = {pt: 'pt-BR', es: 'es', en: 'en'};
export const ogLocale = (l: string) => OG_LOCALES[l] ?? 'pt_BR';
export const bcp47 = (l: string) => BCP47[l] ?? l;

// The indexing switch: when off, every page emits noindex, nofollow.
export const robotsMeta: Metadata['robots'] = ALLOW_INDEXING
  ? {index: true, follow: true}
  : {index: false, follow: false};

function alternates(locale: string, path: string) {
  const p = !path || path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = `${SITE_URL}/${l}${p}`;
  languages['x-default'] = `${SITE_URL}/${routing.defaultLocale}${p}`;
  return {canonical: `${SITE_URL}/${locale}${p}`, languages};
}

const absUrl = (img: string) => (img.startsWith('http') ? img : `${SITE_URL}${img}`);

// Build a complete per-page Metadata object: title (template adds the brand),
// description, canonical, hreflang alternates, Open Graph, Twitter Card, robots.
export function buildPageMetadata(opts: {
  locale: string;
  path: string; // path WITHOUT the locale prefix, e.g. '' | '/blog' | '/blog/foo' | '/cases/foo'
  title: string; // page-specific part; the layout template appends " — Growth Hotel Solutions"
  description: string;
  type?: 'website' | 'article';
}): Metadata {
  const {locale, path, title, description, type = 'website'} = opts;
  const alt = alternates(locale, path);
  const fullTitle = `${title} — ${BRAND}`;
  // Sin `images` a proposito: las imagenes Open Graph las generan los archivos
  // opengraph-image.tsx con next/og, y Next inyecta solos og:image, su tipo,
  // ancho, alto y twitter:image. Si aqui se declararan, pisarian esa
  // convencion y volveriamos al logo suelto.
  return {
    title,
    description,
    alternates: alt,
    robots: robotsMeta,
    openGraph: {
      type,
      url: alt.canonical,
      siteName: BRAND,
      locale: ogLocale(locale),
      title: fullTitle,
      description
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description
    }
  };
}

// ---------- JSON-LD builders ----------
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND,
    url: SITE_URL,
    logo: `${SITE_URL}${BRAND_LOGO}`,
    description:
      'Terceirização comercial para hotéis: revenue, distribuição, conteúdo, performance e central de reservas.',
    knowsLanguage: ['pt-BR', 'es', 'en']
  };
}

export function blogJsonLd(opts: {locale: string; url: string; description: string}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `Blog — ${BRAND}`,
    url: opts.url,
    description: opts.description,
    inLanguage: bcp47(opts.locale),
    publisher: {
      '@type': 'Organization',
      name: BRAND,
      logo: {'@type': 'ImageObject', url: `${SITE_URL}${BRAND_LOGO}`}
    }
  };
}

export function articleJsonLd(opts: {
  locale: string;
  url: string;
  headline: string;
  description: string;
  image?: string;
  datePublished?: string;
  type?: 'Article' | 'CreativeWork';
}) {
  const {locale, url, headline, description, image, datePublished, type = 'Article'} = opts;
  return {
    '@context': 'https://schema.org',
    '@type': type,
    headline,
    description,
    image: [absUrl(image || BRAND_LOGO)],
    inLanguage: bcp47(locale),
    url,
    ...(datePublished ? {datePublished} : {}),
    author: {'@type': 'Organization', name: BRAND},
    publisher: {
      '@type': 'Organization',
      name: BRAND,
      logo: {'@type': 'ImageObject', url: `${SITE_URL}${BRAND_LOGO}`}
    }
  };
}
