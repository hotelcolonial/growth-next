'use client';
import {useEffect} from 'react';

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      raf = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener('mousemove', onMove);
    const loop = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    const onOver = (e: MouseEvent) => {
      const el = e.target as Element | null;
      if (el && el.closest && el.closest('a,button,[data-hover]')) cursor.classList.add('hover');
      else cursor.classList.remove('hover');
      if (el && el.closest && el.closest('[data-cursor-text]')) cursor.classList.add('text');
      else cursor.classList.remove('text');
    };
    document.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div id="cursor" />;
}
