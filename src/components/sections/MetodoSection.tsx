'use client';
import {type ReactNode} from 'react';
import {useTranslations} from 'next-intl';
import Reveal from '@/components/Reveal';
import './MetodoSection.css';

export default function MetodoSection() {
  const t = useTranslations('Metodo');
  const steps: {n: string; title: string; sub: string; desc: string; svg: ReactNode}[] = [
    {
      n: '01',
      title: t('step1Title'),
      sub: t('step1Sub'),
      desc: t('step1Desc'),
      svg: (
        <svg viewBox="0 0 120 120" fill="none" className="met-svg">
          <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="2" />
          <line x1="73" y1="73" x2="99" y2="99" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line className="met-sweep2" x1="50" y1="50" x2="50" y2="22" stroke="#F95738" strokeWidth="2" strokeLinecap="round" />
          <circle className="met-ping" cx="50" cy="50" r="4.5" fill="#F95738" />
        </svg>
      ),
    },
    {
      n: '02',
      title: t('step2Title'),
      sub: t('step2Sub'),
      desc: t('step2Desc'),
      svg: (
        <svg viewBox="0 0 120 120" fill="none" className="met-svg">
          <rect x="24" y="30" width="68" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
          <rect className="met-bar2" x="24" y="53" width="44" height="14" rx="2" fill="#F95738" />
          <rect x="24" y="76" width="58" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      n: '03',
      title: t('step3Title'),
      sub: t('step3Sub'),
      desc: t('step3Desc'),
      svg: (
        <svg viewBox="0 0 120 120" fill="none" className="met-svg">
          <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="2" />
          <g className="met-launch">
            <line x1="47" y1="73" x2="73" y2="47" stroke="#F95738" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M57 47 L73 47 L73 63" stroke="#F95738" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
        </svg>
      ),
    },
    {
      n: '04',
      title: t('step4Title'),
      sub: t('step4Sub'),
      desc: t('step4Desc'),
      svg: (
        <svg viewBox="0 0 120 120" fill="none" className="met-svg">
          <line x1="24" y1="96" x2="100" y2="96" stroke="currentColor" strokeWidth="2" opacity="0.2" />
          <path className="met-chart" d="M24 84 L48 66 L68 74 L96 34" stroke="#F95738" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle className="met-ping" cx="96" cy="34" r="6" fill="#F95738" />
        </svg>
      ),
    },
  ];
  return (
    <section className="met-section" id="metodo">
      <div className="container">
        <div className="proc-head">
          <Reveal delay={100} className="proc-head-left">
            <span className="proc-eyebrow">{t('eyebrow')}</span>
            <h2 className="proc-headline">
              {t.rich('headline', {
                b: (chunks: ReactNode) => <strong>{chunks}</strong>,
                br: () => <br />,
              })}
            </h2>
          </Reveal>
        </div>
        {steps.map((s) => (
          <Reveal key={s.n} delay={60} className="proc-band">
            <div className="proc-visual">
              <div className="proc-figure">{s.svg}</div>
            </div>
            <div className="proc-text">
              <h3 className="proc-title">{s.title}</h3>
              <p className="proc-desc">{s.desc}</p>
            </div>
            <span className="proc-step">
              <span className="proc-step-label">{t('stepLabel')}</span>
              <span className="proc-step-num">{s.n}</span>
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
