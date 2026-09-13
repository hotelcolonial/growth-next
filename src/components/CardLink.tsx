'use client';
import {useNav} from '@/lib/nav';

export default function CardLink({
  to,
  num,
  title,
  desc,
  tags,
  big = false
}: {
  to: string;
  num?: string;
  title?: string;
  desc?: string;
  tags?: string[];
  big?: boolean;
}) {
  const {navigate} = useNav();
  return (
    <button
      onClick={() => navigate(to)}
      data-hover
      style={{
        textAlign: 'left',
        padding: big ? 'clamp(32px, 4vw, 56px)' : '32px',
        background: 'var(--bg-elev-1)',
        border: '1px solid var(--border)',
        borderRadius: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: big ? 32 : 24,
        transition: 'background 0.5s var(--ease-out-cubic), border-color 0.5s, transform 0.5s',
        cursor: 'none',
        position: 'relative',
        overflow: 'hidden',
        width: '100%'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--bg-elev-2)';
        e.currentTarget.style.borderColor = 'var(--border-strong)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--bg-elev-1)';
        e.currentTarget.style.borderColor = 'var(--border)';
      }}
    >
      {num && (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <span style={{fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.16em'}}>
            PILAR {num}
          </span>
          <span style={{fontSize: 24, color: 'var(--fg-muted)'}} className="arrow">
            ↗
          </span>
        </div>
      )}
      <h3 className="h-display" style={{fontSize: big ? 'clamp(36px, 4vw, 64px)' : 'clamp(28px, 2.6vw, 40px)', lineHeight: 1.05}}>
        {title}
      </h3>
      {desc && <p style={{color: 'var(--fg-muted)', fontSize: big ? 17 : 15, lineHeight: 1.5, maxWidth: '40ch'}}>{desc}</p>}
      {tags && tags.length > 0 && (
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto'}}>
          {tags.map((t, i) => (
            <span
              key={i}
              style={{
                fontSize: 11,
                padding: '6px 12px',
                borderRadius: 999,
                border: '1px solid var(--border-strong)',
                color: 'var(--fg-muted)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.06em'
              }}
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}
