'use client';
import {useState, type CSSProperties} from 'react';

export default function Photo({
  src,
  label,
  alt,
  ratio = '4/3',
  style = {},
  className = ''
}: {
  src?: string;
  label?: string;
  alt?: string;
  ratio?: string;
  style?: CSSProperties;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);
  return (
    <div className={'photo ' + className} style={{aspectRatio: ratio, ...style}}>
      {!errored ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt || label || ''} loading="lazy" onError={() => setErrored(true)} />
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'repeating-linear-gradient(45deg, var(--bg-elev-1) 0 12px, var(--bg-elev-2) 12px 24px)'
          }}
        />
      )}
      {label && <span className="photo-label">{label}</span>}
    </div>
  );
}
