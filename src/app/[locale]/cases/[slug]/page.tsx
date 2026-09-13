import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import {getCase, getCaseSlugs} from '@/lib/cases';
import {buildPageMetadata, articleJsonLd, SITE_URL} from '@/lib/seo';
import Reveal from '@/components/Reveal';
import CaseCompare from '@/components/CaseCompare';
import CmpChart from '@/components/CmpChart';
import './case-detail.css';

export function generateStaticParams() {
  const slugs = getCaseSlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({locale, slug})));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  const c = getCase(locale, slug);
  if (!c) return {};
  return buildPageMetadata({
    locale,
    path: `/cases/${slug}`,
    title: c.frontmatter.title,
    description: c.frontmatter.description,
    type: 'article'
  });
}

export default async function CaseDetailPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Cases');
  const c = getCase(locale, slug);
  if (!c) notFound();
  const f = c.frontmatter;

  return (
    <main className="case-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              locale,
              url: `${SITE_URL}/${locale}/cases/${slug}`,
              headline: f.title,
              description: f.description,
              image: f.coverImage,
              datePublished: f.date,
              type: 'Article'
            })
          )
        }}
      />
      <section className="container case-top">
        <Link href="/" className="case-back" data-hover>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t('back')}
        </Link>

        <Reveal>
          <h1 className="case-title">{f.title}</h1>
        </Reveal>

        <Reveal delay={100}>
          <div className="case-meta">
            {f.meta?.map((m) => (
              <div key={m.label} className="case-meta-cell">
                <p className="case-meta-k">{m.label}</p>
                <p className="case-meta-v">{m.value}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="case-hero">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={f.coverImage} alt={f.coverAlt || f.title} loading="lazy" />
          </div>
        </Reveal>
      </section>

      {f.details && f.details.length > 0 && (
        <section className="container case-details">
          <div className="case-details-left">
            <p>{t('detailsLabel')}</p>
          </div>
          <div className="case-details-rows">
            {f.details.map((d, i) => (
              <Reveal key={d.label} delay={i * 60}>
                <div className="case-row">
                  <p className="case-row-k">{d.label}</p>
                  <p className="case-row-v">{d.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {f.feature && (
        <section className="container case-feature">
          <Reveal className="case-feature-fig">
            <div className="case-feature-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.feature.image} alt={f.feature.imageAlt} loading="lazy" />
            </div>
            <p className="case-cap">{f.feature.caption}</p>
          </Reveal>
          <Reveal delay={120}>
            <p className="case-statement">
              {f.feature.statementBefore}
              <em>{f.feature.statementEm}</em>
              {f.feature.statementAfter}
            </p>
          </Reveal>
        </section>
      )}

      {f.comparisons?.map((cmp, i) => (
        <section key={i} className="container case-compare-wrap">
          <Reveal>
            <div className="case-cmp-head">
              <h2 className="case-cmp-title">{cmp.title}</h2>
              <p className="case-cmp-sub">{cmp.subtitle}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <CaseCompare
              beforeLabel={t('beforeLabel')}
              afterLabel={t('afterLabel')}
              before={
                cmp.kind === 'chart' ? (
                  <CmpChart points={cmp.beforePoints ?? ''} color="#9DA0A5" strokeWidth={3} dotR={5} />
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img className="cmp-img" style={{filter: cmp.beforeFilter}} src={cmp.beforeImage} alt={cmp.beforeAlt ?? ''} />
                )
              }
              after={
                cmp.kind === 'chart' ? (
                  <CmpChart points={cmp.afterPoints ?? ''} color="#F95738" strokeWidth={3.5} dotR={6} />
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img className="cmp-img" src={cmp.afterImage} alt={cmp.afterAlt ?? ''} />
                )
              }
            />
          </Reveal>
        </section>
      ))}

      {f.gallery && f.gallery.length > 0 && (
        <section className="container case-gallery-wrap">
          <div className="case-gallery">
            {f.gallery.map((g, i) => (
              <Reveal key={i} delay={i * 80} className="case-gfig">
                <div className="case-gimg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.image} alt={g.caption} loading="lazy" />
                </div>
                <p className="case-cap">{g.caption}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
