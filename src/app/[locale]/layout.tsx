import type {ReactNode} from 'react';
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {robotsMeta, SITE_URL} from '@/lib/seo';
import '../globals.css';
import CustomCursor from '@/components/fx/CustomCursor';
import Loader from '@/components/fx/Loader';
import Curtain from '@/components/fx/Curtain';
import ScrollProgress from '@/components/fx/ScrollProgress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

// Site-wide metadata base: metadataBase (for resolving relative URLs), the
// title template, and the indexing switch (robots) — inherited by all pages.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s — Growth Hotel Solutions',
    default: 'Growth Hotel Solutions — Terceirização comercial para hotéis'
  },
  robots: robotsMeta
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <Loader />
          <CustomCursor />
          <Curtain />
          <ScrollProgress />
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
