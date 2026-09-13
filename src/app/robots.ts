import type {MetadataRoute} from 'next';
import {ALLOW_INDEXING, SITE_URL} from '@/lib/seo';

// El comportamiento de este archivo depende ENTERAMENTE de la variable de
// entorno NEXT_PUBLIC_ALLOW_INDEXING (ver .env.example):
//
//   != 'true'  (estado actual, pruebas)  -> Disallow: / para todos. Bloqueo
//              total y sin exponer el sitemap. Va en la misma direccion que el
//              <meta name="robots" content="noindex, nofollow"> que ya emiten
//              todas las paginas via lib/seo.ts.
//
//   == 'true'  (produccion)              -> rastreo normal, se publica la linea
//              Sitemap: y se permite explicitamente a los crawlers de IA.
//
// OJO: es una variable NEXT_PUBLIC_, o sea que se resuelve en BUILD. Cambiarla
// en Vercel no basta: hay que volver a desplegar para que /robots.txt cambie.

// Crawlers de IA que citan fuentes. Se listan aparte del '*' porque algunos
// (Google-Extended, ClaudeBot) solo obedecen a su nombre exacto, y porque asi
// queda explicito que se les permite entrar a proposito, no por descuido.
const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'PerplexityBot',
  'Google-Extended',
  'ClaudeBot',
  'anthropic-ai',
  'CCBot'
];

export default function robots(): MetadataRoute.Robots {
  if (!ALLOW_INDEXING) {
    // Sin `sitemap`: no se le da a nadie un mapa del sitio que no queremos
    // que indexen todavia.
    return {
      rules: [{userAgent: '*', disallow: '/'}]
    };
  }

  return {
    rules: [
      {userAgent: '*', allow: '/', disallow: ['/api/']},
      {userAgent: AI_CRAWLERS, allow: '/', disallow: ['/api/']}
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
