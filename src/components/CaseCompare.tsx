'use client';
import {useEffect, useRef, useState, type ReactNode} from 'react';

// Draggable before/after comparison slider — faithful port of the original
// site's CaseCompare (clip-path reveal + draggable divider/handle).
export default function CaseCompare({
  before,
  after,
  beforeLabel,
  afterLabel
}: {
  before: ReactNode;
  after: ReactNode;
  beforeLabel: string;
  afterLabel: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(2, Math.min(98, p)));
  };

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (dragging.current) update(e.clientX);
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, []);

  return (
    <div
      className="cmp"
      ref={ref}
      onPointerDown={(e) => {
        dragging.current = true;
        update(e.clientX);
      }}
    >
      <div className="cmp-panel cmp-after">
        {after}
        <span className="cmp-tag cmp-tag-r">{afterLabel}</span>
      </div>
      <div className="cmp-panel cmp-before" style={{clipPath: `inset(0 ${100 - pos}% 0 0)`}}>
        {before}
        <span className="cmp-tag cmp-tag-l">{beforeLabel}</span>
      </div>
      <div className="cmp-divider" style={{left: pos + '%'}}>
        <span className="cmp-handle" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M14 7l-5 5 5 5M10 7l5 5-5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
