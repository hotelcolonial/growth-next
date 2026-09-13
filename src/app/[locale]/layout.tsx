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
    // data-loader-seen="0" es el valor por defecto que emite el SERVIDOR, asi
    // que el atributo existe en el HTML desde el principio. El script inline de
    // abajo solo lo cambia a "1" cuando corresponde.
    //
    // suppressHydrationWarning: el script modifica ese atributo ANTES de que
    // React hidrate, asi que servidor y cliente difieren a proposito. Es el
    // patron documentado por Next para esto (guia "Preventing flash before
    // hydration", seccion Themes). Solo silencia los atributos de ESTE elemento
    // —no se propaga a los hijos—, asi que no puede ocultar mismatches reales
    // en el resto del arbol.
    <html lang={locale} data-loader-seen="0" suppressHydrationWarning>
      <head>
        {/*
          Se ejecuta durante el parseo del HTML, antes del primer paint: quien
          ya vio el preloader no llega a ver ni un fotograma. El try/catch cubre
          navegadores o modos donde sessionStorage esta bloqueado (ahi el
          preloader simplemente se muestra, y se retira solo por CSS).

          Tiene que ser un <script> suelto, NO next/script: con
          strategy="beforeInteractive" Next no lo inlinea, lo encola en
          self.__next_s y lo ejecuta su runtime DESPUES del primer paint, con lo
          que el preloader vuelve a parpadear. Aqui hace falta un script que
          bloquee el parseo, que es justo lo que documenta Next en la guia
          "Preventing flash before hydration".

          Efecto secundario conocido: al cambiar de idioma se remonta el
          segmento [locale] y React re-renderiza este arbol en cliente, donde
          avisa "Encountered a script tag while rendering React component". Es
          un aviso de desarrollo y aqui es inocuo: el script solo tiene sentido
          en una carga completa de pagina, y en un cambio de idioma
          sessionStorage ya esta puesto y el preloader ya se retiro.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var k='ghs:loader-seen';" +
              "if(sessionStorage.getItem(k)){document.documentElement.setAttribute('data-loader-seen','1');}" +
              "else{sessionStorage.setItem(k,'1');}}catch(e){}})();"
          }}
        />
      </head>
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
