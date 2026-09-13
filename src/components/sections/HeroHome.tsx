'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/Reveal';
import './HeroHome.css';

export default function HeroHome() {
  const t = useTranslations('Hero');
  const [scrollPct, setScrollPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = window.innerHeight;
      setScrollPct(Math.min(window.scrollY / max, 1));
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const services = t.raw('services') as string[];
  return (
    <section className="hero2">
      <div className="hero2-grid">
        <Reveal immediate as="h1" className="hero2-headline">
          <div className="row line1">
            <span>{t('headlineLine1')}</span>
          </div>
          <div className="row line2">
            <span className="accent" style={{ fontFamily: 'HelveticaNeueCyr' }}>{t('headlineAccent')}</span>
            <span className="hero2-sub">{t('subtitle')}</span>
          </div>
        </Reveal>
        <Reveal immediate delay={90} as="ul" className="hero2-services">
          {services.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </Reveal>
      </div>
      <div className="hero2-hint" style={{ opacity: 1 - scrollPct }}>{t('scrollHint')}</div>
    </section>
  );
}
