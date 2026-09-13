import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {buildPageMetadata} from '@/lib/seo';
import './privacidade.css';

// Slug unico para los 3 idiomas (/{locale}/privacidade). Mantenerlo igual
// simplifica los hreflang y evita redirecciones al cambiar de idioma.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Privacy'});
  // buildPageMetadata ya aplica el interruptor NEXT_PUBLIC_ALLOW_INDEXING,
  // el canonical y los hreflang de los 3 idiomas.
  return buildPageMetadata({
    locale,
    path: '/privacidade',
    title: t('metaTitle'),
    description: t('metaDescription')
  });
}

export default async function PrivacyPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Privacy');

  const email = t('email');
  const listItems = (key: string) => t.raw(key) as string[];

  return (
    <main className="pv-page">
      <div className="container">
        <header className="pv-head">
          <p className="eyebrow">{t('eyebrow')}</p>
          <h1 className="pv-title">{t('title')}</h1>
          <p className="pv-updated">{t('lastUpdated')}</p>
          <p className="pv-intro">{t('intro')}</p>
        </header>

        <div className="pv-body">
          <section className="pv-section">
            <h2>{t('s1Title')}</h2>
            <p>{t('s1Intro')}</p>
            <ul>
              {listItems('s1Items').map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>{t('s1Outro')}</p>
          </section>

          <section className="pv-section">
            <h2>{t('s2Title')}</h2>
            <p>{t('s2Body')}</p>
          </section>

          <section className="pv-section">
            <h2>{t('s3Title')}</h2>
            <p>{t('s3Body')}</p>
          </section>

          <section className="pv-section">
            <h2>{t('s4Title')}</h2>
            <p>{t('s4Intro')}</p>
            <p>{t('s4Body')}</p>
          </section>

          <section className="pv-section">
            <h2>{t('s5Title')}</h2>
            <p>{t('s5Body')}</p>
          </section>

          <section className="pv-section">
            <h2>{t('s6Title')}</h2>
            <p>{t('s6Body')}</p>
          </section>

          <section className="pv-section">
            <h2>{t('s7Title')}</h2>
            <p>{t('s7Body')}</p>
          </section>

          <section className="pv-section">
            <h2>{t('s8Title')}</h2>
            <p>{t('s8Intro')}</p>
            <ul>
              {listItems('s8Items').map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="pv-section">
            <h2>{t('s9Title')}</h2>
            <p>
              {t.rich('s9Body', {
                mail: () => <a href={`mailto:${email}`}>{email}</a>
              })}
            </p>
          </section>

          <section className="pv-section">
            <h2>{t('s10Title')}</h2>
            <p>{t('s10Body')}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
