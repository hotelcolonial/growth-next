'use client';
import {useState} from 'react';

export default function PostShare({shareLabel, copiedLabel}: {shareLabel: string; copiedLabel: string}) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="post-share">
      <button
        className="post-share-btn"
        data-hover
        onClick={() => {
          try {
            navigator.clipboard?.writeText(window.location.href);
          } catch {
            /* noop */
          }
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        {copied ? copiedLabel : shareLabel}
      </button>
    </div>
  );
}
