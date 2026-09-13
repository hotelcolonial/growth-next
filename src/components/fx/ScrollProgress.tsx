'use client';
import {useEffect, useState} from 'react';

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? window.scrollY / h : 0);
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 2,
        background: 'var(--accent)',
        width: pct * 100 + '%',
        zIndex: 200,
        transition: 'width 0.1s linear'
      }}
    />
  );
}
