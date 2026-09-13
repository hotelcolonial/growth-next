'use client';
import {useEffect, useRef, useState} from 'react';

export default function CountUp({
  to,
  suffix = '',
  duration = 1400,
  format = (n: number) => n as unknown as string
}: {
  to: number;
  suffix?: string;
  duration?: number;
  format?: (n: number) => string | number;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const step = (t: number) => {
              const p = Math.min((t - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(to * eased);
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            io.unobserve(el);
          }
        });
      },
      {threshold: 0.3}
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return (
    <span ref={ref}>
      {format(val)}
      {suffix}
    </span>
  );
}
