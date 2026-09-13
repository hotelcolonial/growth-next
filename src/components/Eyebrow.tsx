import type {ReactNode} from 'react';

export default function Eyebrow({children, num}: {children?: ReactNode; num?: ReactNode}) {
  return (
    <div className="eyebrow">
      {num && <span style={{fontFamily: 'var(--font-mono)', color: 'var(--accent)'}}>{num}</span>}
      <span>{children}</span>
    </div>
  );
}
