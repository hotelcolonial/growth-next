'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/Reveal';
import './EstrategiaSection.css';

export default function EstrategiaSection() {
  const t = useTranslations('Estrategia');
  const items = [
    {
      n: '01',
      title: t('item1Title'),
      body: [t('item1Body1'), t('item1Body2')],
      to: '/servicos/revenue-distribuicao',
    },
    {
      n: '02',
      title: t('item2Title'),
      body: [t('item2Body1'), t('item2Body2')],
      to: '/servicos/conteudo-redes',
    },
    {
      n: '03',
      title: t('item3Title'),
      body: [t('item3Body1'), t('item3Body2')],
      to: '/servicos/performance-marketing',
    },
    {
      n: '04',
      title: t('item4Title'),
      body: [t('item4Body1'), t('item4Body2')],
      to: '/servicos/central-reservas',
    },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section className="estrategia-section">
      <div className="container">
        <div className="estrategia-grid">
          <div className="estrategia-left">
            <Reveal>
              <h2 className="estrategia-headline" style={{ fontSize: '58px', lineHeight: '0.95' }}>
                {t.rich('headline', {
                  serif: (chunks: React.ReactNode) => (
                    <em className="serif" style={{ fontSize: '75px' }}>
                      {chunks}
                    </em>
                  ),
                })}
              </h2>
            </Reveal>
          </div>
          <div className="estrategia-right">
            <Reveal delay={100}>
              <div className="acc">
                {items.map((it, i) => {
                  const isOpen = open === i;
                  return (
                    <div key={it.n} className={'acc-item ' + (isOpen ? 'open' : '')}>
                      <button
                        className="acc-head"
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        data-hover={true}
                        aria-expanded={isOpen}
                      >
                        <span className="acc-title">{it.title}</span>
                        <span className="acc-icon" aria-hidden="true">
                          <span className="acc-icon-bar h" />
                          <span className="acc-icon-bar v" />
                        </span>
                      </button>
                      <div className="acc-panel" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                        <div className="acc-panel-inner">
                          {it.body.map((p, j) => (
                            <p key={j} className="acc-text">
                              {p}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
