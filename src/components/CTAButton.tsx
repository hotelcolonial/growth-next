'use client';
import type {ReactNode} from 'react';
import {useNav} from '@/lib/nav';

export default function CTAButton({
  to,
  children,
  variant = 'primary'
}: {
  to: string;
  children?: ReactNode;
  variant?: string;
}) {
  const {navigate} = useNav();
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={() =>
        to === '/contato' ? window.dispatchEvent(new CustomEvent('open-contact')) : navigate(to)
      }
    >
      {children}{' '}
      <span className="arrow">→</span>
    </button>
  );
}
