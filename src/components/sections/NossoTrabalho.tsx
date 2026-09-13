'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link as LocaleLink } from '@/i18n/navigation';
import Reveal from '@/components/Reveal';
import Photo from '@/components/Photo';
import './NossoTrabalho.css';

function WorkCard({
  img,
  img2,
  label,
  kicker,
  title,
  sub,
  area,
  h,
  href
}: {
  img?: string;
  img2?: string;
  label?: string;
  kicker?: string;
  title?: string;
  sub?: string;
  area?: string;
  h?: string;
  href: string;
}) {
  const t = useTranslations('Work');
  const cardRef = useRef<HTMLAnchorElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const card = cardRef.current;
    const pill = pillRef.current;
    if (!card || !pill) return;
    let tx = 0,
      ty = 0; // target (mouse) position within card
    let cx = 0,
      cy = 0; // current (smoothed) pill position
    let inside = false;
    let raf = 0;
    const onEnter = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      tx = cx = e.clientX - r.left;
      ty = cy = e.clientY - r.top;
      inside = true;
      card.classList.add('cursor-active');
      const dot = document.getElementById('cursor');
      if (dot) dot.style.opacity = '0';
    };
    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    };
    const onLeave = () => {
      inside = false;
      card.classList.remove('cursor-active');
      const dot = document.getElementById('cursor');
      if (dot) dot.style.opacity = '1';
    };
    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      pill.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%) scale(${inside ? 1 : 0.8})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
      // Restore the custom cursor on unmount (e.g. clicking a card navigates
      // away before mouseleave fires, which would leave the cursor hidden).
      const dot = document.getElementById('cursor');
      if (dot) dot.style.opacity = '1';
    };
  }, []);
  return (
    // Enlace real (<a href>), no un router.push sobre un <button>: asi el case
    // es rastreable por buscadores y modelos de IA, se puede abrir en pestana
    // nueva y es alcanzable con el teclado. El diseno no cambia: .work-card ya
    // era display:block y todo el CSS es por clase, no por etiqueta.
    <LocaleLink
      ref={cardRef}
      href={href}
      className="work-card"
      data-hover={true}
      style={{ gridArea: area, '--card-h': h } as React.CSSProperties}
    >
      <div className="work-card-media">
        <Photo
          src={img}
          label={label}
          alt={title}
          ratio="auto"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 0,
            border: 'none'
          }}
        />
        <span
          className="work-card-media-2"
          style={{ backgroundImage: `url(${img2 || img})` }}
        />
        <span className="work-overlay" />
      </div>
      <span ref={pillRef} className="work-pill">
        <span className="work-pill-label">
          {t('pill')}{' '}
          <span className="arrow">→</span>
        </span>
      </span>
      <span className="work-moon" aria-hidden="true" />
      <span className="work-text">
        {kicker && <span className="work-kicker">{kicker}</span>}
        <span className="work-title">{title}</span>
        <span className="work-sub">{sub}</span>
      </span>
    </LocaleLink>
  );
}

// Hoy solo hay un case publicado, asi que las cinco tarjetas apuntan a el
// (antes tambien, pero via router.push hardcodeado y sin enlace real).
// Cuando haya mas cases, cada tarjeta recibira su propio slug.
const CASE_HREF = '/cases/hotel-colonial-iguacu';

export default function NossoTrabalho() {
  const t = useTranslations('Work');
  return (
    <section className="work-section">
      <div className="container">
        <Reveal>
          <div className="work-head">
            <div className="work-head-left">
              <span className="work-eyebrow">{t('eyebrow')}</span>
              <h2 className="work-headline">
                {t.rich('headline', {
                  br: () => <br />
                })}
              </h2>
            </div>
            <p className="work-head-desc">
              {t.rich('desc', {
                strong: (chunks) => <strong>{chunks}</strong>
              })}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0} className="work-reveal">
          <div className="work-grid">
            <WorkCard
              href={CASE_HREF}
              area="c1"
              h="560px"
              img="/assets/piscina-area-lazer-guarda-sois-hotel-colonial-iguacu.webp"
              img2="/assets/piscina-jardim-flores-hotel-colonial-iguacu.webp"
              title={t('card1Title')}
              sub={t('card1Sub')}
            />
            <WorkCard
              href={CASE_HREF}
              area="c2"
              h="560px"
              img="/assets/lobby-saguao-area-convivencia-hotel-colonial-iguacu.webp"
              img2="/assets/quarto-apartamento-casal-hotel-colonial-iguacu.webp"
              title={t('card2Title')}
              sub={t('card2Sub')}
            />
            <div className="work-notes" style={{ gridArea: 'c3' }}>
              <h3 className="work-statement" style={{ fontSize: '72px' }}>
                {t.rich('statement', {
                  em: (chunks) => <em style={{ fontSize: '72px' }}>{chunks}</em>
                })}
              </h3>
            </div>
            <WorkCard
              href={CASE_HREF}
              area="c4"
              h="420px"
              img="/assets/fachada-entrada-principal-piscina-hotel-colonial-iguacu.webp"
              img2="/assets/entrada-recepcao-fonte-agua-hotel-colonial-iguacu.webp"
              title={t('card4Title')}
              sub={t('card4Sub')}
            />
            <WorkCard
              href={CASE_HREF}
              area="c5"
              h="420px"
              img="/assets/lobby-recepcao-area-estar-hotel-colonial-iguacu.webp"
              img2="/assets/entrada-principal-noite-iluminada-hotel-colonial-iguacu.webp"
              title={t('card5Title')}
              sub={t('card5Sub')}
            />
            <WorkCard
              href={CASE_HREF}
              area="c6"
              h="420px"
              img="/assets/estacionamento-fonte-jardim-hotel-colonial-iguacu.webp"
              img2="/assets/criancas-brincando-piscina-hotel-colonial-iguacu.webp"
              title={t('card6Title')}
              sub={t('card6Sub')}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
