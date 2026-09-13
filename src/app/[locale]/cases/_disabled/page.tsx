import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import {getAllCases} from '@/lib/cases';
import './cases.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Cases'});
  return {title: t('metaTitle'), description: t('metaDescription')};
}

export default async function CasesPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Cases');
  const cases = getAllCases(locale);

  return (
    <main className="cases-page container">
      <header className="cases-head">
        <p className="eyebrow">{t('eyebrow')}</p>
        <h1 className="cases-title h-display">{t('title')}</h1>
        <p className="cases-lead lead">{t('lead')}</p>
      </header>

      {cases.length === 0 ? (
        <div className="cases-empty">{t('empty')}</div>
      ) : (
        <div className="cases-grid">
          {cases.map((c) => {
            const metric = c.frontmatter.metrics?.[0];
            return (
              <Link key={c.slug} href={`/cases/${c.slug}`} className="case-card" data-hover>
                <div className="case-card-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.frontmatter.coverImage} alt={c.frontmatter.title} loading="lazy" />
                </div>
                <div className="case-card-body">
                  <span className="case-card-client">{c.frontmatter.client}</span>
                  <h2 className="case-card-title">{c.frontmatter.title}</h2>
                  {metric && (
                    <span className="case-card-metric">
                      <strong>{metric.value}</strong> {metric.label}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
