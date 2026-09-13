'use client';
import {useState, useEffect, type FormEvent} from 'react';
import {useTranslations} from 'next-intl';

type Status = 'idle' | 'sending' | 'error';

export default function ContactModal() {
  const t = useTranslations('Contact');
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [method, setMethod] = useState('whatsapp');
  const [val, setVal] = useState('');
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  // Honeypot: un humano nunca lo ve (está oculto por CSS y fuera del
  // orden de tabulación); si llega con contenido, el servidor lo descarta.
  const [website, setWebsite] = useState('');

  useEffect(() => {
    const onOpen = () => {
      setSent(false);
      setStatus('idle');
      setErrorMsg('');
      setOpen(true);
    };
    window.addEventListener('open-contact', onOpen);
    return () => window.removeEventListener('open-contact', onOpen);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;

    const nome = name.trim();
    const contato = val.trim();
    if (!nome || !contato) {
      setStatus('error');
      setErrorMsg(t('requiredFields'));
      return;
    }

    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nome, canal: method, contato, website})
      });
      if (!res.ok) throw new Error('request_failed');
      setStatus('idle');
      setSent(true);
      setName('');
      setVal('');
      setMethod('whatsapp');
    } catch {
      setStatus('error');
      setErrorMsg(t('errorText'));
    }
  }
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);
  const methods = [
    {
      id: 'whatsapp',
      label: t('whatsappLabel'),
      ph: t('whatsappPlaceholder'),
      ic: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.4-5.6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.7.7-.9 1.7-.5 2.8a9 9 0 0 0 3.8 4.3c1.9 1 2.3.9 2.8.8.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1Z" />
        </svg>
      )
    },
    {
      id: 'instagram',
      label: t('instagramLabel'),
      ph: t('instagramPlaceholder'),
      ic: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      )
    },
    {
      id: 'telegram',
      label: t('telegramLabel'),
      ph: t('telegramPlaceholder'),
      ic: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.9 4.3l-3.3 15.6c-.2 1.1-.9 1.4-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.3 13 1.4 11.5c-1.1-.3-1.1-1 .2-1.5l19-7.3c.9-.3 1.7.2 1.3 1.6Z" />
        </svg>
      )
    },
    {
      id: 'email',
      label: t('emailLabel'),
      ph: t('emailPlaceholder'),
      ic: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      )
    }
  ];
  const cur = methods.find((m) => m.id === method) || methods[0];
  return (
    <div className={'cm-overlay ' + (open ? 'open' : '')} onClick={() => setOpen(false)}>
      <div className="cm-card" onClick={(e) => e.stopPropagation()}>
        <button className="cm-close" onClick={() => setOpen(false)} aria-label={t('closeLabel')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
          </svg>
        </button>
        {!sent ? (
          <form onSubmit={handleSubmit} noValidate>
            <h2 className="cm-title">{t('title')}</h2>
            <p className="cm-sub">{t('subtitle')}</p>

            {/* Honeypot anti-spam — oculto para personas, visible para bots. */}
            <div className="cm-hp" aria-hidden="true">
              <label htmlFor="cm-website">Website</label>
              <input
                id="cm-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <label className="cm-label" htmlFor="cm-name">
              {t('nameLabel')}
            </label>
            <input
              id="cm-name"
              className="cm-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('namePlaceholder')}
              autoComplete="name"
              maxLength={120}
              disabled={status === 'sending'}
            />
            <label className="cm-label" htmlFor="cm-contact">
              {t('channelLabel')}
            </label>
            <div className="cm-methods">
              {methods.map((m) => (
                <button
                  type="button"
                  key={m.id}
                  className={'cm-method ' + (method === m.id ? 'active' : '')}
                  onClick={() => setMethod(m.id)}
                  aria-pressed={method === m.id}
                  disabled={status === 'sending'}
                >
                  <span className="cm-method-ic">{m.ic}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
            <input
              id="cm-contact"
              className="cm-input"
              type={method === 'email' ? 'email' : 'text'}
              inputMode={method === 'whatsapp' ? 'tel' : 'text'}
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder={cur.ph}
              maxLength={160}
              disabled={status === 'sending'}
            />

            {status === 'error' && (
              <p className="cm-error" role="alert">
                {errorMsg}
              </p>
            )}

            <button type="submit" className="cm-submit" disabled={status === 'sending'}>
              <span>{status === 'sending' ? t('submitting') : t('submit')}</span>
              <span className="cm-submit-arrow">
                <span className="icon-out">
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M6 18 L18 6 M9 6 L18 6 L18 15"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="icon-in">
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M6 18 L18 6 M9 6 L18 6 L18 15"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </button>
          </form>
        ) : (
          <div className="cm-thanks" role="status" aria-live="polite">
            <h2 className="cm-title">{t('successTitle')}</h2>
            <p className="cm-sub">{t('successText')}</p>
            <button type="button" className="cm-submit" onClick={() => setOpen(false)}>
              <span>{t('closeButton')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
