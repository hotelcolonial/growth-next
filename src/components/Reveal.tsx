'use client';
import {useEffect, useRef, type ReactNode, type CSSProperties, type ElementType} from 'react';

export default function Reveal({
  children,
  delay = 0,
  as: As = 'div',
  line = false,
  immediate = false,
  className = '',
  style = {},
  ...rest
}: {
  children?: ReactNode;
  delay?: number;
  as?: ElementType;
  line?: boolean;
  /**
   * Para contenido que ya esta a la vista al cargar (el hero). En vez de
   * esperar al IntersectionObserver —que solo corre despues de hidratar, y por
   * eso los textos "caian" con segundos de retraso— anima con una animacion CSS
   * que arranca en el primer frame. Sin dependencia de JavaScript.
   */
  immediate?: boolean;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (immediate) return; // lo resuelve el CSS, no hace falta observar
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = delay / 1000 + 's';
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('in');
            io.unobserve(el);
          }
        });
      },
      {threshold: 0.15, rootMargin: '0px 0px -80px 0px'}
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, immediate]);

  const Tag = As as ElementType;
  const base = immediate ? 'reveal-now ' : line ? 'reveal-line ' : 'reveal ';
  // En modo immediate el retraso lo lleva la propia animacion CSS, para que se
  // aplique desde el primer frame y no despues de hidratar.
  const finalStyle = immediate ? {animationDelay: `${delay}ms`, ...style} : style;
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={base + className} style={finalStyle} {...rest}>
      {line && !immediate ? <span>{children}</span> : children}
    </Tag>
  );
}
