'use client';
import {useEffect, useRef} from 'react';
import {useTranslations} from 'next-intl';

export default function Loader() {
  const t = useTranslations('Loader');
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const loader = ref.current;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const wave = document.getElementById('loaderWaveAnim') as any;
    const t1 = setTimeout(() => {
      if (wave && wave.beginElement) {
        try {
          wave.beginElement();
        } catch {
          /* noop */
        }
      }
      document.dispatchEvent(new CustomEvent('app:ready'));
    }, 5700);
    const t2 = setTimeout(() => {
      if (loader) loader.style.display = 'none';
    }, 7300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div id="loader" ref={ref}>
      <svg className="loader-wave" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
        <path fill="#F4EFEA" d="M0,0 H1440 V900 C1140,900 860,900 580,900 C380,900 180,900 0,900 Z">
          <animate
            id="loaderWaveAnim"
            attributeName="d"
            begin="indefinite"
            dur="1.5s"
            fill="freeze"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.5 0 0.2 1"
            values="M0,0 H1440 V900 C1140,900 860,900 580,900 C380,900 180,900 0,900 Z;M0,0 H1440 V-90 C1140,60 860,-180 580,-30 C380,40 180,-150 0,-70 Z"
          />
        </path>
      </svg>
      <div className="loader-words">
        <span className="lw lwphrase">
          {t.rich('phrase', {em: (chunks) => <em>{chunks}</em>})}
        </span>
      </div>
      <div className="loader-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-growth-transparente.webp" alt="Growth Hotel Solutions" />
      </div>
    </div>
  );
}
