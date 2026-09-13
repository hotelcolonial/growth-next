'use client';
import {useEffect, useRef, type ReactNode, type CSSProperties, type ElementType} from 'react';

export default function Reveal({
  children,
  delay = 0,
  as: As = 'div',
  line = false,
  className = '',
  style = {},
  ...rest
}: {
  children?: ReactNode;
  delay?: number;
  as?: ElementType;
  line?: boolean;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
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
  }, [delay]);

  const Tag = As as ElementType;
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={(line ? 'reveal-line ' : 'reveal ') + className} style={style} {...rest}>
      {line ? <span>{children}</span> : children}
    </Tag>
  );
}
