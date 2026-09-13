'use client';

import { useTranslations } from 'next-intl';
import Reveal from '@/components/Reveal';
import './SolucaoSection.css';

const SOL_IMG = {
  main: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400&q=80&auto=format&fit=crop',
  sec: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop'
};

export default function SolucaoSection() {
  const t = useTranslations('Solucao');
  return (
    <section className="sol-section" id="solucao">
      <div className="container">
        <div className="sol-grid">
          <Reveal style={{ gridArea: 'title' }}>
            <div className="sol-head">
              <div className="sol-head-left">
                <span className="sol-head-eyebrow">{t('eyebrow')}</span>
                <h2 className="sol-head-title">
                  {t.rich('title', { br: () => <br /> })}
                </h2>
              </div>
            </div>
          </Reveal>
          <Reveal delay={140} className="sol-img-cell" style={{ gridArea: 'photo' }}>
            <div className="sol-photo sol-photo-main">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={SOL_IMG.main} alt={t('mainImageAlt')} loading="lazy" />
              <span className="sol-photo-overlay" />
            </div>
          </Reveal>
          <div className="sol-right" style={{ gridArea: 'content' }}>
            <Reveal>
              <div className="sol-rule">
                <span className="sol-rule-label">{t('ruleLabel')}</span>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h3 className="sol-statement">
                {t.rich('statement', {
                  emph: (chunks: React.ReactNode) => <em>{chunks}</em>
                })}
              </h3>
            </Reveal>
            <Reveal delay={220}>
              <div className="sol-paras">
                <p>{t('paragraph1')}</p>
                <p>{t('paragraph2')}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
