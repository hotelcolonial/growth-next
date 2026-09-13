'use client';
import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import Reveal from '@/components/Reveal';

export type BlogListItem = {
  slug: string;
  title: string;
  description?: string;
  category: string;
  dateLabel: string;
  coverImage: string;
};

const CATS = ['todos', 'dicas', 'cases', 'mercado'] as const;

export default function BlogList({posts}: {posts: BlogListItem[]}) {
  const t = useTranslations('Blog');
  const [cat, setCat] = useState<string>('todos');
  const catLabel = (key: string) =>
    ({todos: t('catTodos'), dicas: t('catDicas'), cases: t('catCases'), mercado: t('catMercado')})[
      key
    ] ?? key;
  const shown = cat === 'todos' ? posts : posts.filter((p) => p.category === cat);

  return (
    <>
      <div className="blog-head">
        <h1 className="blog-title">{t('listTitle')}</h1>
        <div className="blog-cats">
          {CATS.map((c) => (
            <button
              key={c}
              className={'blog-cat ' + (cat === c ? 'active' : '')}
              onClick={() => setCat(c)}
              data-hover
            >
              {catLabel(c)}
            </button>
          ))}
        </div>
      </div>

      <div className="blog-grid">
        {shown.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 70}>
            <Link href={`/blog/${p.slug}`} className="blog-card" data-hover>
              <div className="blog-card-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.coverImage} alt={p.title} loading="lazy" />
              </div>
              <div className="blog-card-body">
                <h2 className="blog-card-title">{p.title}</h2>
                {p.description && <p className="blog-card-desc">{p.description}</p>}
                <div className="blog-card-meta">
                  <span className="blog-card-cat">{catLabel(p.category)}</span>
                  <span className="blog-card-date">{p.dateLabel}</span>
                  <span className="blog-card-arrow">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M7 17 L17 7 M9 7 H17 V15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}
