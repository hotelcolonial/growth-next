import {NextResponse} from 'next/server';

// Reenvía los leads del formulario "vamos conversar" al Google Apps Script
// que los escribe en la Google Sheet. La URL del script vive SOLO en el
// servidor (GOOGLE_SHEETS_WEBHOOK_URL, sin prefijo NEXT_PUBLIC_) para no
// exponerla en el bundle del navegador.

const CANAIS = ['whatsapp', 'instagram', 'telegram', 'email'] as const;
type Canal = (typeof CANAIS)[number];

// Topes defensivos: evitan que un bot mande payloads enormes a la Sheet.
const MAX_NOME = 120;
const MAX_CONTATO = 160;

// Tiempo máximo de espera del Apps Script antes de dar error al usuario.
const TIMEOUT_MS = 10_000;

type Payload = {
  nome?: unknown;
  canal?: unknown;
  contato?: unknown;
  // Honeypot: campo oculto que un humano nunca ve ni rellena.
  website?: unknown;
};

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ok: false, error: 'invalid_json'}, {status: 400});
  }

  // ── Anti-spam (honeypot) ───────────────────────────────────────────────
  // Si el campo oculto viene con algo, es un bot: se descarta la petición
  // sin reenviarla a la Sheet. Respondemos 200 genérico a propósito, para
  // que el bot no aprenda que fue detectado y no reintente con variantes.
  if (str(body.website)) {
    return NextResponse.json({ok: true});
  }

  // ── Validación ─────────────────────────────────────────────────────────
  const nome = str(body.nome);
  const contato = str(body.contato);
  const canal = str(body.canal) as Canal;

  const fields: string[] = [];
  if (!nome) fields.push('nome');
  if (!contato) fields.push('contato');
  if (!CANAIS.includes(canal)) fields.push('canal');

  if (fields.length > 0) {
    return NextResponse.json({ok: false, error: 'invalid_fields', fields}, {status: 400});
  }

  if (nome.length > MAX_NOME || contato.length > MAX_CONTATO) {
    return NextResponse.json({ok: false, error: 'too_long'}, {status: 400});
  }

  // ── Reenvío al Apps Script ─────────────────────────────────────────────
  const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhook) {
    console.error('[contact] Falta la variable de entorno GOOGLE_SHEETS_WEBHOOK_URL');
    return NextResponse.json({ok: false, error: 'not_configured'}, {status: 500});
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      // Claves exactas que espera el Apps Script.
      body: JSON.stringify({nome, canal, contato}),
      // Apps Script responde con un 302 hacia script.googleusercontent.com.
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: 'no-store'
    });

    if (!res.ok) {
      console.error(`[contact] Apps Script respondió ${res.status} ${res.statusText}`);
      return NextResponse.json({ok: false, error: 'upstream_error'}, {status: 502});
    }

    return NextResponse.json({ok: true});
  } catch (err) {
    const timedOut = err instanceof Error && err.name === 'TimeoutError';
    console.error('[contact] Fallo al enviar al Apps Script:', err);
    return NextResponse.json(
      {ok: false, error: timedOut ? 'upstream_timeout' : 'upstream_unreachable'},
      {status: 502}
    );
  }
}
