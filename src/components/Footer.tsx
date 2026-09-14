'use client';
import {Fragment} from 'react';
import {useTranslations} from 'next-intl';
import {Link as LocaleLink} from '@/i18n/navigation';
import Reveal from '@/components/Reveal';
import ContactModal from '@/components/ContactModal';
import SocialIcon from '@/components/SocialIcon';
import {INSTAGRAM_URL, WHATSAPP_URL} from '@/lib/social';
import './Footer.css';

export default function Footer() {
  const t = useTranslations('Footer');
  return (
    <footer style={{borderTop: '1px solid var(--border)', paddingTop: 0}}>
      <section className="cta-contact">
        <div className="container">
          <div className="cta-grid">
            <Reveal className="cta-left">
              <span className="cta-eyebrow">{t('ctaEyebrow')}</span>
              <h2 className="cta-title">
                {t.rich('ctaTitle', {br: () => <br />})}
              </h2>
            </Reveal>
            <Reveal delay={140} className="cta-mid">
              <span className="cta-label">{t('ctaLabel')}</span>
              <div className="cta-links">
                {/* Solo abre el modal: es un <button>, no un <a href="#">. Con
                    href="#" el clic-medio llevaba a la home y los lectores de
                    pantalla lo anunciaban como enlace. */}
                <button
                  type="button"
                  className="cta-link"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
                >
                  <span className="cta-link-ic">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.4-5.6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.7.7-.9 1.7-.5 2.8a9 9 0 0 0 3.8 4.3c1.9 1 2.3.9 2.8.8.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1Z" />
                    </svg>
                  </span>
                  <span className="cta-link-tx">{t('linkWhatsapp')}</span>
                  <span className="cta-link-arrow">
                    <span className="icon-out">
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M6 18 L18 6 M9 6 L18 6 L18 15"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="icon-in">
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M6 18 L18 6 M9 6 L18 6 L18 15"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  className="cta-link"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
                >
                  <span className="cta-link-ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                  </span>
                  <span className="cta-link-tx">{t('linkEmail')}</span>
                  <span className="cta-link-arrow">
                    <span className="icon-out">
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M6 18 L18 6 M9 6 L18 6 L18 15"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="icon-in">
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M6 18 L18 6 M9 6 L18 6 L18 15"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
              <button
                className="cta-btn"
                onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
              >
                {t('ctaButton')}
              </button>
            </Reveal>
            <Reveal delay={260} className="cta-right">
              <div className="cta-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&auto=format&fit=crop"
                  alt={t('photoAlt')}
                  loading="lazy"
                />
              </div>
              <p className="cta-quote">
                {t('ctaQuote')}
              </p>
              <p className="cta-quote-by">{t('ctaQuoteBy')}</p>
            </Reveal>
          </div>
        </div>
      </section>
      <div className="marquee">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <Fragment key={i}>
              <span className="marquee-item">{t('marqueeRevenue')}</span>
              <span className="marquee-item muted">{t('marqueeDistribuicao')}</span>
              <span className="marquee-item">{t('marqueeMarketing')}</span>
              <span className="marquee-item muted">{t('marqueeReservas')}</span>
              <span className="marquee-item">{t('marqueePerformance')}</span>
              <span className="marquee-item muted">{t('marqueeConteudo')}</span>
            </Fragment>
          ))}
        </div>
      </div>
      {/*
        Localizacion: va entre el marquee y el bloque final del footer, con su
        propia banda. El id permite enlazarla desde el menu (/{locale}#localizacao).
        El iframe de Google es lazy: no penaliza la carga inicial.
      */}
      <section id="localizacao" className="loc-section" aria-labelledby="loc-title">
        <div className="container loc-grid">
          <div className="loc-text">
            <p className="eyebrow">{t('locEyebrow')}</p>
            <h2 id="loc-title" className="loc-title">
              {t('locTitle')}
            </h2>
            <address className="loc-address">{t('address')}</address>
          </div>
          <div className="loc-map">
            <iframe
              title={t('mapTitle')}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.6812424650025!2d-54.5484388!3d-25.548992700000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f69144a9aa9c17%3A0xff8451e914cf52d6!2sGrowthDirect%20Hotel%20Solutions!5e0!3m2!1spt-BR!2sbr!4v1789387228421!5m2!1spt-BR!2sbr"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </section>

      <div
        className="container"
        style={{padding: 'clamp(48px, 6vw, 84px) var(--gutter) clamp(28px, 3vw, 40px)'}}
      >
        <div className="footer-nav">
          <div className="footer-left">
            <LocaleLink href="/" className="footer-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-growthdirect.webp" alt={t('logoAlt')} />
            </LocaleLink>
            <LocaleLink href="/blog" className="footer-blog" data-hover>
              {t('blogLink')}{' '}
              <span className="footer-blog-arrow">
                <span className="icon-out">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
            </LocaleLink>
          </div>
          <div className="footer-nav-right">
            <div className="nav-social">
              <SocialIcon url={INSTAGRAM_URL} label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </SocialIcon>
              <SocialIcon url={WHATSAPP_URL} label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.4-5.6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.7.7-.9 1.7-.5 2.8a9 9 0 0 0 3.8 4.3c1.9 1 2.3.9 2.8.8.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1Z" />
                </svg>
              </SocialIcon>
              {/* El selector de idioma vivia aqui como boton muerto (sin
                  onClick). Se quito: el del header ya cumple esa funcion. */}
            </div>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
              data-hover
              className="nav-pill nav-pill-ghost"
              aria-label={t('scheduleAria')}
            >
              <span
                className="nav-pill-label"
                style={{
                  fontSize: '24px',
                  fontWeight: 400,
                  fontFamily: 'var(--font-sans)',
                  textTransform: 'none',
                  letterSpacing: '-0.02em'
                }}
              >
                {t('scheduleLabel')}
              </span>
              <span className="nav-pill-icon">
                <span className="icon-out">
                  <svg width="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
                  <svg width="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
            <button
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              data-hover
              className="nav-pill nav-pill-dark"
              aria-label={t('topAria')}
            >
              <span className="nav-pill-label" style={{fontSize: '19px', fontWeight: 700}}>
                {t('topLabel')}
              </span>
              <span className="nav-pill-icon">
                <svg width="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 19 V5 M6 11 L12 5 L18 11"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
        <div className="footer-legal">
          <span>{t('copyright', {year: new Date().getFullYear()})}</span>
          {/* Era un <span> muerto: ahora enlaza a la pagina real. */}
          <LocaleLink href="/privacidade" className="footer-privacy" data-hover>
            {t('privacy')}
          </LocaleLink>
          <span>{t('location')}</span>
        </div>
      </div>
      <ContactModal />
    </footer>
  );
}
