import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import './not-found.css';

// 404 con la marca del sitio. Vive dentro de [locale], asi que se renderiza
// DENTRO de [locale]/layout.tsx: hereda header, footer, tipografias y colores,
// y next-intl le da el idioma de la URL.
//
// Un not-found.tsx no puede exportar `metadata` (no es una page), asi que el
// noindex va como <meta> en el propio JSX: React lo eleva al <head>. Es
// importante que sea explicito y no dependa de NEXT_PUBLIC_ALLOW_INDEXING —
// una pagina de error no debe indexarse ni siquiera con el sitio en produccion.
export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <section className="nf-page">
        <div className="container nf-inner">
          <p className="eyebrow">{t('eyebrow')}</p>
          <p className="nf-code" aria-hidden="true">
            404
          </p>
          <h1 className="nf-title">{t('title')}</h1>
          <p className="nf-sub">{t('subtitle')}</p>
          <div className="nf-actions">
            <Link href="/" className="nf-btn nf-btn-primary" data-hover>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M15 5l-7 7 7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t('backHome')}
            </Link>
            <Link href="/blog" className="nf-btn nf-btn-ghost" data-hover>
              {t('backBlog')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
