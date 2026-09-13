import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {getAllPosts, formatPostDate} from '@/lib/blog';
import {buildPageMetadata, blogJsonLd, SITE_URL} from '@/lib/seo';
import BlogList, {type BlogListItem} from '@/components/blog/BlogList';
import './blog.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Blog'});
  return buildPageMetadata({
    locale,
    path: '/blog',
    title: t('listTitle'),
    description: t('metaDescription')
  });
}

export default async function BlogPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Blog');
  const posts = getAllPosts(locale);
  const items: BlogListItem[] = posts.map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    description: p.frontmatter.description,
    category: p.frontmatter.category,
    dateLabel: formatPostDate(p.frontmatter.date, locale),
    coverImage: p.frontmatter.coverImage
  }));

  return (
    <main className="blog-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            blogJsonLd({locale, url: `${SITE_URL}/${locale}/blog`, description: t('metaDescription')})
          )
        }}
      />
      <section className="container blog-top">
        {items.length === 0 ? (
          <>
            <div className="blog-head">
              <h1 className="blog-title">{t('listTitle')}</h1>
            </div>
            <div className="blog-empty">
              <span className="eyebrow">{t('soonBadge')}</span>
              <p className="blog-empty-title">{t('emptyTitle')}</p>
              <p className="blog-empty-sub">{t('emptySub')}</p>
            </div>
          </>
        ) : (
          <BlogList posts={items} />
        )}
      </section>
    </main>
  );
}
