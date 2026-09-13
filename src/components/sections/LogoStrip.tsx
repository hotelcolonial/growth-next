'use client';

import {useTranslations} from 'next-intl';
import Reveal from '@/components/Reveal';
import './LogoStrip.css';

// Los logos no son homogeneos: unos llevan `big`, otros `invert` y otros
// ninguno. Sin este tipo TypeScript infiere una union y por eso el map estaba
// anotado como `any`.
type Logo = {src: string; alt: string; big?: boolean; invert?: boolean};

export default function LogoStrip() {
  const t = useTranslations('Logos');
  const logos: Logo[] = [{
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
            {logos.map((l, i) => (
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
