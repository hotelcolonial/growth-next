'use client';
import type {ReactNode} from 'react';
import {useNav} from '@/lib/nav';

export default function L({
  to,
  children,
  className = '',
  arrow = false,
  ...rest
}: {
  to: string;
  children?: ReactNode;
  className?: string;
  arrow?: boolean;
  [key: string]: unknown;
}) {
  const {navigate} = useNav();
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
      {arrow && (
        <span className="arrow" style={{marginLeft: 8}}>
          →
        </span>
      )}
    </a>
  );
}
