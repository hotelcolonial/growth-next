'use client';
import {Fragment, useState, useEffect, useRef} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import {Link as LocaleLink, usePathname} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import SocialIcon from '@/components/SocialIcon';
import {INSTAGRAM_URL, WHATSAPP_URL} from '@/lib/social';
import './Header.css';

const openContact = () => window.dispatchEvent(new CustomEvent('open-contact'));


export default function Header() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // El menu se cierra en el onClick de cada item (ver abajo), no con un efecto
  // sobre la ruta: los anclas no cambian el pathname, asi que un efecto no se
  // enteraria de un clic en "Servicos" estando ya en la home.

  // Close language dropdown on outside click
  useEffect(() => {
    if (!langOpen) return;
    const onDown = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [langOpen]);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);
  // Los tres del medio son anclas a secciones de la home. Como usan el <Link>
  // de next-intl, el locale se antepone solo (/pt/#servicos) y funcionan tanto
  // estando en la home como desde una pagina interna: navega a la home del
  // idioma actual y baja a la seccion. "Contato" no es una pagina: abre el
  // modal de contacto, que es lo que realmente recoge los leads.
  const nav: {label: string; to?: string; action?: () => void}[] = [
    {to: '/', label: t('inicio')},
    {to: '/#servicos', label: t('servicos')},
    {to: '/#metodo', label: t('metodo')},
    {to: '/#planos', label: t('planos')},
    {label: t('contato'), action: openContact}
  ];

  // Two-pill cluster width — drives dropdown alignment under the MENU pill
  return (
    <Fragment>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: scrolled ? '14px var(--gutter)' : '24px var(--gutter)',
          background: scrolled ? 'rgba(255, 255, 255, 0.78)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px) saturate(150%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(150%)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition:
            'padding 0.5s var(--ease-out-cubic), background 0.45s var(--ease-out-cubic), backdrop-filter 0.45s var(--ease-out-cubic), border-color 0.45s var(--ease-out-cubic)',
          pointerEvents: 'none'
        }}
      >
        <div style={{pointerEvents: 'auto'}}>
          <LocaleLink
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-growth-transparente.webp"
              alt="Growth Hotel Solutions"
              style={{
                display: 'block',
                flexShrink: 0,
                height: 'clamp(34px, 4vw, 46px)',
                width: 'auto'
              }}
            />
          </LocaleLink>
        </div>
        <nav
          aria-label={t('ariaNav')}
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
            position: 'relative'
          }}
        >
          <div className="nav-social">
            {/* Iconos de marca originales. Instagram queda inactivo hasta
                que exista la cuenta; WhatsApp, hasta tener el movil real.
                Las URLs se rellenan en src/lib/social.ts. */}
            <SocialIcon url={INSTAGRAM_URL} label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.997 8.33177C9.97722 8.33177 8.32888 9.98013 8.32888 12C8.32888 14.0199 9.97722 15.6682 11.997 15.6682C14.0169 15.6682 15.6652 14.0199 15.6652 12C15.6652 9.98013 14.0169 8.33177 11.997 8.33177ZM22.9988 12C22.9988 10.481 23.0125 8.97571 22.9272 7.45943C22.8419 5.69824 22.4402 4.13519 21.1523 2.84732C19.8617 1.55669 18.3014 1.15767 16.5403 1.07237C15.0213 0.987059 13.516 1.00082 11.9998 1.00082C10.4808 1.00082 8.97556 0.987059 7.45931 1.07237C5.69815 1.15767 4.13513 1.55945 2.84728 2.84732C1.55668 4.13794 1.15767 5.69824 1.07237 7.45943C0.987059 8.97846 1.00082 10.4837 1.00082 12C1.00082 13.5163 0.987059 15.0243 1.07237 16.5406C1.15767 18.3018 1.55944 19.8648 2.84728 21.1527C4.13788 22.4433 5.69815 22.8423 7.45931 22.9276C8.97831 23.0129 10.4835 22.9992 11.9998 22.9992C13.5188 22.9992 15.024 23.0129 16.5403 22.9276C18.3014 22.8423 19.8645 22.4406 21.1523 21.1527C22.4429 19.8621 22.8419 18.3018 22.9272 16.5406C23.0153 15.0243 22.9988 13.519 22.9988 12ZM11.997 17.6441C8.87374 17.6441 6.35309 15.1234 6.35309 12C6.35309 8.87664 8.87374 6.35594 11.997 6.35594C15.1203 6.35594 17.641 8.87664 17.641 12C17.641 15.1234 15.1203 17.6441 11.997 17.6441ZM17.8722 7.44292C17.1429 7.44292 16.554 6.85402 16.554 6.12478C16.554 5.39554 17.1429 4.80664 17.8722 4.80664C18.6014 4.80664 19.1903 5.39554 19.1903 6.12478C19.1905 6.29794 19.1565 6.46945 19.0904 6.62947C19.0242 6.78949 18.9271 6.93489 18.8047 7.05733C18.6822 7.17978 18.5369 7.27686 18.3768 7.34303C18.2168 7.40919 18.0453 7.44314 17.8722 7.44292Z"
                />
              </svg>
            </SocialIcon>
            <SocialIcon url={WHATSAPP_URL} label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.5 1C17.2992 1 22 5.70085 22 11.5C22 17.2991 17.2992 22 11.5 22C9.64443 22.003 7.8215 21.5119 6.21851 20.5772L1.00421 22L2.42381 16.7836C1.48836 15.1801 0.996915 13.3564 1.00001 11.5C1.00001 5.70085 5.70086 1 11.5 1ZM7.92161 6.565L7.71161 6.5734C7.57566 6.58168 7.44279 6.61739 7.32101 6.6784C7.20711 6.7429 7.10313 6.82353 7.01231 6.9178C6.88631 7.03645 6.81491 7.13935 6.73826 7.2391C6.34989 7.74404 6.14078 8.36397 6.14396 9.00099C6.14606 9.51549 6.28046 10.0163 6.49046 10.4846C6.91991 11.4317 7.62656 12.4345 8.55896 13.3637C8.78366 13.5874 9.00416 13.8121 9.24146 14.021C10.4 15.0411 11.7806 15.7767 13.2735 16.1693L13.8699 16.2607C14.0641 16.2712 14.2584 16.2565 14.4537 16.247C14.7595 16.2313 15.0581 16.1485 15.3283 16.0045C15.4658 15.9337 15.6 15.8566 15.7305 15.7735C15.7305 15.7735 15.7756 15.7441 15.8617 15.679C16.0035 15.574 16.0906 15.4994 16.2082 15.3766C16.2954 15.2863 16.371 15.1802 16.4287 15.0595C16.5106 14.8883 16.5925 14.5618 16.6261 14.2898C16.6513 14.0819 16.644 13.9685 16.6408 13.8982C16.6366 13.7858 16.5432 13.6693 16.4413 13.6199L15.8302 13.3459C15.8302 13.3459 14.9167 12.9479 14.3581 12.6938C14.2997 12.6683 14.237 12.6537 14.1733 12.6508C14.1015 12.6434 14.0289 12.6515 13.9604 12.6745C13.892 12.6975 13.8292 12.7349 13.7764 12.7841C13.7712 12.782 13.7008 12.8419 12.9417 13.7617C12.8981 13.8202 12.8381 13.8645 12.7692 13.8888C12.7004 13.9131 12.6259 13.9164 12.5553 13.8982C12.4869 13.8799 12.4198 13.8567 12.3547 13.8289C12.2245 13.7743 12.1794 13.7533 12.0901 13.7155C11.4875 13.4525 10.9295 13.0972 10.4364 12.6623C10.3041 12.5468 10.1812 12.4208 10.0552 12.299C9.64213 11.9034 9.28212 11.4559 8.98421 10.9676L8.92226 10.8679C8.87776 10.8009 8.84179 10.7286 8.81516 10.6526C8.77526 10.4983 8.87921 10.3744 8.87921 10.3744C8.87921 10.3744 9.13436 10.0951 9.25301 9.94389C9.36851 9.79689 9.46616 9.6541 9.52916 9.55225C9.65306 9.35275 9.69191 9.14799 9.62681 8.98945C9.33281 8.27125 9.02831 7.5562 8.71541 6.8464C8.65346 6.7057 8.46971 6.6049 8.30276 6.58495C8.24606 6.57865 8.18936 6.57235 8.13266 6.56815C7.99165 6.56114 7.85035 6.56254 7.70951 6.57235L7.92056 6.56395L7.92161 6.565Z"
                />
              </svg>
            </SocialIcon>
            <div className="nav-lang-wrap" ref={langRef}>
              <button
                className="nav-lang"
                data-hover
                aria-label={t('idioma')}
                aria-haspopup="true"
                aria-expanded={langOpen}
                onClick={() => setLangOpen((o) => !o)}
              >
                <span>{locale.toUpperCase()}</span>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={langOpen ? 'is-open' : ''}>
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {langOpen && (
                <div className="nav-lang-menu">
                  {routing.locales.map((loc) => (
                    <LocaleLink
                      key={loc}
                      href={pathname}
                      locale={loc}
                      data-hover
                      className={'nav-lang-item' + (loc === locale ? ' is-active' : '')}
                      aria-current={loc === locale ? 'true' : undefined}
                      onClick={() => setLangOpen(false)}
                    >
                      {loc.toUpperCase()}
                    </LocaleLink>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
            data-hover
            className="nav-pill nav-pill-ghost"
            aria-label={t('agendarDiagnostico')}
          >
            <span
              className="nav-pill-label"
              style={{
                fontSize: '24px',
                fontWeight: 400,
                fontFamily: '"HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
                textTransform: 'none',
                letterSpacing: '-0.02em'
              }}
            >
              {t('agendarDiagnosticoLabel')}
            </span>
            <span className="nav-pill-icon">
              <span className="icon-out">
                <svg
                  width="100%"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 18 L18 6 M9 6 L18 6 L18 15"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="icon-in">
                <svg
                  width="100%"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 18 L18 6 M9 6 L18 6 L18 15"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>
          </button>
          <div style={{position: 'relative'}}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              data-hover
              className={'nav-pill nav-pill-dark ' + (menuOpen ? 'is-open' : '')}
              aria-expanded={menuOpen}
              aria-controls="nav-dropdown"
            >
              <span className="nav-pill-label nav-pill-label-stack">
                <span
                  className={'label-state ' + (menuOpen ? 'out' : 'in')}
                >
                  {t('menu')}
                </span>
                <span className={'label-state ' + (menuOpen ? 'in' : 'out')}>{t('close')}</span>
              </span>
              <span className="nav-pill-icon">
                <span className={'menu-icon-stack ' + (menuOpen ? 'open' : '')}>
                  <span className="menu-icon-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                  <span className="menu-icon-x">
                    <span></span>
                    <span></span>
                  </span>
                </span>
              </span>
            </button>
            <div
              id="nav-dropdown"
              className={'nav-dropdown ' + (menuOpen ? 'open' : '')}
              aria-hidden={!menuOpen}
            >
              <div className="nav-dropdown-inner">
                {nav.map((n) => {
                  // Solo "Inicio" puede estar activo: los demas son anclas de
                  // la propia home o el modal, no rutas distintas.
                  const active = n.to === '/' && pathname === '/';
                  const inner = (
                    <>
                      <span className="nav-dd-arrow" aria-hidden="true">
                        <svg
                          width="100%"
                          viewBox="0 0 45 38"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24.4118 2L41.5 19.0882L24.4118 36.1765M0 19.0882L40.2794 19.0882"
                            stroke="currentColor"
                            strokeWidth="4.88235"
                          />
                        </svg>
                      </span>
                      <span className="nav-dd-label">{n.label}</span>
                    </>
                  );
                  // "Contato": abre el modal, no navega. Es un <button> porque
                  // no lleva a ninguna URL.
                  if (!n.to) {
                    return (
                      <button
                        key={n.label}
                        type="button"
                        data-hover
                        className="nav-dd-link"
                        onClick={() => {
                          setMenuOpen(false);
                          n.action?.();
                        }}
                      >
                        {inner}
                      </button>
                    );
                  }
                  // Home y anclas: enlaces reales con locale (rastreables).
                  return (
                    <LocaleLink
                      key={n.to}
                      href={n.to}
                      data-hover
                      className={'nav-dd-link ' + (active ? 'active' : '')}
                      onClick={() => setMenuOpen(false)}
                    >
                      {inner}
                    </LocaleLink>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90,
          background: 'rgba(16,17,19,0.45)',
          backdropFilter: 'blur(4px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.5s var(--ease-out-cubic)'
        }}
      />
    </Fragment>
  );
}
