'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import './HeroFeature.css';

// useLayoutEffect avisa si se ejecuta en el servidor; en SSR cae a useEffect.
// Es una constante de modulo, no una rama dentro del render.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const FILM = {
  desktop: '/assets/video/growthdirect-brand-film.mp4',
  mobile: '/assets/video/growthdirect-brand-film-720.mp4',
  poster: '/assets/video/growthdirect-brand-film-poster.webp'
};

export default function HeroFeature() {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Calcula y aplica la posicion del frame para el scroll actual.
  // `smx`/`smy` es el desplazamiento suavizado del raton (0 al cargar).
  const position = (smx = 0, smy = 0) => {
    const placeholder = placeholderRef.current;
    const inner = innerRef.current;
    if (!placeholder || !inner) return;
    const rect = placeholder.getBoundingClientRect();
    const vh = window.innerHeight;
    const pageY = rect.top + window.scrollY;
    const targetTop = vh * 0.1; // where the placeholder finally settles
    const targetScroll = Math.max(1, pageY - targetTop);
    const progress = Math.max(0, Math.min(1, window.scrollY / targetScroll));
    const startScale = 0.235;
    const endScale = 1;
    const p = 1 - Math.pow(1 - progress, 3);
    const scale = startScale + (endScale - startScale) * p;

    // Resting position: small, to the RIGHT of the headline (like the
    // reference laptop). As scroll progresses it lerps to centered + full.
    const vw = window.innerWidth;
    const restX = vw * 0.222;
    const restY = vh * 0.02;
    const finalX = 0;
    const finalOffsetY = rect.top + rect.height / 2 - vh / 2;
    const xPos = restX * (1 - p) + finalX * p;
    const yPos = restY * (1 - p) + finalOffsetY * p;
    inner.style.transform = `translate(-50%, -50%) translate3d(${xPos + smx}px, ${yPos + smy}px, 0) scale(${scale})`;
  };

  // Una primera pasada SINCRONA antes de que el navegador pinte. El CSS ya deja
  // el frame en la posicion de scroll 0; esto cubre el caso de recargar con el
  // scroll restaurado, donde ese valor por defecto no seria el correcto.
  useIsoLayoutEffect(() => {
    position();
  }, []);

  useEffect(() => {
    let mx = 0,
      my = 0; // raw mouse offset (px, around 0)
    let smx = 0,
      smy = 0; // smoothed mouse offset
    let raf = 0;
    const onMouse = (e: MouseEvent) => {
      const w = window.innerWidth,
        h = window.innerHeight;
      mx = (e.clientX / w - 0.5) * 36;
      my = (e.clientY / h - 0.5) * 36;
    };
    window.addEventListener('mousemove', onMouse, {
      passive: true
    });
    const tick = () => {
      smx += (mx - smx) * 0.07;
      smy += (my - smy) * 0.07;
      position(smx, smy);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMouse);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <section className="hero-feature-section">
      <div ref={placeholderRef} className="hero-feature-placeholder" />
      <div ref={innerRef} className="hero-feature-frame" aria-hidden="true">
        {/* Brand film propio, recomprimido desde _originals/video (64 MB).
            El movil (donde el marco mide ~350px) baja la version 720p; los
            navegadores sin soporte de `media` en <source> toman la primera. */}
        <video autoPlay loop muted playsInline preload="auto" poster={FILM.poster}>
          <source src={FILM.mobile} type="video/mp4" media="(max-width: 700px)" />
          <source src={FILM.desktop} type="video/mp4" />
        </video>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={FILM.poster} alt="" />
      </div>
    </section>
  );
}
