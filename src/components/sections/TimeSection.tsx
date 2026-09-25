'use client';

import {useTranslations} from 'next-intl';
import Reveal from '@/components/Reveal';
import './TimeSection.css';

// Los nombres no se traducen; los cargos salen de Time.roles.<id>.
// Retratos verticales 4:5 centrados en el rostro, recortados desde el original
// (ver _originals/assets/equipe); van arriba de cada tarjeta.
const PEOPLE = [
  {id: 'raquel', name: 'Raquel Betancourt', img: '/assets/equipe/raquel-betancourt-growthdirect.webp'},
  {id: 'gabriel', name: 'Gabriel Cunha', img: '/assets/equipe/gabriel-cunha-growthdirect.webp'},
  {id: 'esther', name: 'Esther Suárez', img: '/assets/equipe/esther-suarez-growthdirect.webp'},
  {id: 'wilmary', name: 'Wilmary Díaz', img: '/assets/equipe/wilmary-diaz-growthdirect.webp'},
  {id: 'leonardo', name: 'Leonardo Perusso', img: '/assets/equipe/leonardo-perusso-growthdirect.webp'},
  {id: 'thiago', name: 'Thiago Alves', img: '/assets/equipe/thiago-alves-growthdirect.webp'}
] as const;

export default function TimeSection() {
  const t = useTranslations('Time');
  return (
    <section className="time-section" id="time" aria-labelledby="time-title">
      <div className="container">
        <div className="time-layout">
          {/* Bloque coral: titulo, frase y el mismo modal de contacto del sitio. */}
          <Reveal className="time-intro">
            <div className="time-intro-inner">
              <span className="time-intro-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M3 19.5c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="16.5" cy="8.8" r="2.5" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M16.5 14c2.6 0 4.5 1.9 4.5 4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              <h2 id="time-title" className="time-title">{t('title')}</h2>
              <p className="time-intro-text">{t('intro')}</p>
              <button
                type="button"
                className="time-btn"
                data-hover
                onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
              >
                {t('cta')}
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6 18 L18 6 M9 6 L18 6 L18 15"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </Reveal>
          <ul className="time-grid">
            {PEOPLE.map((p, i) => {
              const role = t(`roles.${p.id}`);
              return (
                <Reveal key={p.id} as="li" delay={(i % 3) * 100} className="time-card">
                  <div className="time-photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.img}
                      alt={t('photoAlt', {name: p.name, role})}
                      width={600}
                      height={750}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="time-info">
                    <p className="time-role">{role}</p>
                    <h3 className="time-name">{p.name}</h3>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
