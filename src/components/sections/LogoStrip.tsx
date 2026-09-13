'use client';

import {useTranslations} from 'next-intl';
import Reveal from '@/components/Reveal';
import './LogoStrip.css';

export default function LogoStrip() {
  const t = useTranslations('Logos');
  const logos = [{
    src: "/assets/logos/meritum-hoteis-logo.webp",
    alt: "Méritum Hotéis",
    big: true
  }, {
    src: "/assets/logos/prize-hoteis-logo.webp",
    alt: "Prize Hotéis",
    big: true
  }, {
    src: "/assets/logos/hotel-colonial-iguacu-logo.webp",
    alt: "Hotel Colonial Iguaçu"
  }, {
    src: "/assets/logos/villa-colonial-gastronomia-eventos-logo.webp",
    alt: "Villa Colonial Gastronomia e Eventos"
  }, {
    src: "/assets/logos/blando-logo.webp",
    alt: "Blando",
    invert: true
  }, {
    src: "/assets/logos/cliente-rede-hoteleira-logo.webp",
    alt: t('clienteAlt'),
    invert: true
  }];
  return (
    <section className="logostrip-section" aria-label={t('sectionLabel')}>
      <Reveal>
        <div className="logostrip-row">
          <span className="logostrip-label">{t('label')}</span>
          <div className="logostrip-logos">
            {logos.map((l: any, i: number) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={l.src}
                alt={l.alt}
                className={[l.invert ? "is-invert" : "", l.big ? "is-big" : ""].filter(Boolean).join(" ") || undefined}
                loading="lazy"
                draggable="false"
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
