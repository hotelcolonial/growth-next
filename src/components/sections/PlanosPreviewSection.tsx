'use client';

import {useTranslations} from 'next-intl';
import Reveal from '@/components/Reveal';
import { useNav } from '@/lib/nav';
import './PlanosPreviewSection.css';

interface Pack {
  name: string;
  desc: string;
  hot?: boolean;
  prefix?: string;
  facts: string[];
  excludes?: string[];
}

export default function PlanosPreviewSection() {
  useNav();
  const t = useTranslations('Planos');
  const packs: Pack[] = [
    {
      name: t('plan1Name'),
      desc: t('plan1Desc'),
      facts: t.raw('plan1Facts') as string[],
    },
    {
      name: t('plan2Name'),
      desc: t('plan2Desc'),
      hot: true,
      prefix: t('plan2Prefix'),
      facts: t.raw('plan2Facts') as string[],
    },
    {
      name: t('plan3Name'),
      desc: t('plan3Desc'),
      prefix: t('plan3Prefix'),
      facts: t.raw('plan3Facts') as string[],
    },
  ];

  return (
    <section className="packs" id="planos">
      <div className="container">
        <div className="packs-head">
          <Reveal delay={100} className="packs-head-left">
            <span className="packs-eyebrow">{t('eyebrow')}</span>
            <h2 className="packs-title">{t('title')}</h2>
          </Reveal>
        </div>
        <div className="packs-grid">
          {packs.map((p, i) => (
            <Reveal key={p.name} delay={i * 100} className={p.hot ? 'pack-card pack-card-hot' : 'pack-card'}>
              <div className="pack-name">
                {p.name}
                {p.hot && <span className="pack-flame" aria-hidden="true" />}
              </div>
              <div className="pack-desc">{p.desc}</div>
              {p.prefix && <div className="pack-prefix">{p.prefix}</div>}
              <div className="pack-facts">
                {p.facts.map((f, j) => (
                  <div key={j} className="pack-fact">
                    <span className="pack-check">✓</span>
                    <span>{f}</span>
                  </div>
                ))}
                {p.excludes && p.excludes.map((f, j) => (
                  <div key={'x' + j} className="pack-fact pack-fact-no">
                    <span className="pack-x">✕</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <button className="pack-btn" onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}>
                <span className="pack-btn-top">
                  <span>{t('ctaTop')}</span>
                  <span className="pack-arrow">
                    <span className="icon-out">
                      <svg viewBox="0 0 24 24">
                        <path d="M6 18 L18 6 M9 6 L18 6 L18 15" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="icon-in">
                      <svg viewBox="0 0 24 24">
                        <path d="M6 18 L18 6 M9 6 L18 6 L18 15" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </span>
                <span className="pack-btn-bottom">{t('ctaBottom')}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
