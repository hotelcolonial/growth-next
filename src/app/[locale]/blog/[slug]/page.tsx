import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {compileMDX} from 'next-mdx-remote/rsc';
import {Link} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import {getPost, getPostSlugs, getAdjacentPosts, formatPostDate} from '@/lib/blog';
import {buildPageMetadata, articleJsonLd, SITE_URL} from '@/lib/seo';
import Reveal from '@/components/Reveal';
import PostShare from '@/components/blog/PostShare';
import './post.css';

export function generateStaticParams() {
  const slugs = getPostSlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({locale, slug})));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  const p = getPost(locale, slug);
  if (!p) return {};
  return buildPageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: p.frontmatter.title,
    description: p.frontmatter.description || '',
    type: 'article'
  });
}

export default async function PostPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Blog');
  const p = getPost(locale, slug);
  if (!p) notFound();
  const f = p.frontmatter;
  const {content} = await compileMDX({source: p.content});
  const {prev, next} = getAdjacentPosts(locale, slug);
  const catMap: Record<string, string> = {
    dicas: t('catDicas'),
    cases: t('catCases'),
    mercado: t('catMercado')
  };
  const catLabel = catMap[f.category] ?? f.category;

  return (
    <main className="post-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              locale,
              url: `${SITE_URL}/${locale}/blog/${slug}`,
              headline: f.title,
              description: f.description || '',
              image: f.coverImage,
              datePublished: f.date,
              type: 'Article'
            })
          )
        }}
      />
      <article className="container post-wrap">
        <Link href="/blog" className="post-back" data-hover>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t('back')}
        </Link>

        <Reveal>
          <p className="post-cat">{catLabel}</p>
          <p className="post-date">{formatPostDate(f.date, locale)}</p>
          <h1 className="post-title">{f.title}</h1>
          <PostShare shareLabel={t('share')} copiedLabel={t('shared')} />
        </Reveal>

        <Reveal delay={120}>
          <div className="post-hero">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={f.coverImage} alt={f.coverAlt || f.title} loading="lazy" />
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="post-body">{content}</div>
        </Reveal>

        {f.duo && f.duo.length >= 2 && (
          <Reveal delay={80}>
            <div className="post-duo">
              <div className="post-duo-img post-duo-tall">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.duo[0].image} alt={f.duo[0].alt || ''} loading="lazy" />
              </div>
              <div className="post-duo-img post-duo-wide">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.duo[1].image} alt={f.duo[1].alt || ''} loading="lazy" />
              </div>
            </div>
          </Reveal>
        )}

        {(prev || next) && (
          <div className="post-nav">
            {prev ? (
              <Link href={`/blog/${prev.slug}`} className="post-nav-link" data-hover>
                <span className="post-nav-ar">←</span>
                <span>{t('prevArticle')}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/blog/${next.slug}`} className="post-nav-link post-nav-next" data-hover>
                <span>{t('nextArticle')}</span>
                <span className="post-nav-ar">→</span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        )}
      </article>
    </main>
  );
}
