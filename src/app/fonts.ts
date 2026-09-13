import localFont from 'next/font/local';
import {Inter} from 'next/font/google';

// Fuentes del sitio, cargadas con next/font: se auto-hospedan (sin viaje a
// Google), se precargan solas y Next inyecta los @font-face con la estrategia
// de `display`. Antes vivian en un @import de Google que bloqueaba el render y
// declaraba 79 @font-face para 13 pesos, de los que se usaban 5.

/**
 * HelveticaNeueCyr — la tipografia de marca. Solo estos tres pesos existen
 * como archivo y solo estos tres se usan:
 *   300 Light  · 400 Roman (el grueso del sitio) · 700 Bold
 * Declarar el 700 real evita que el navegador fabrique un bold sintetico
 * engrosando el Roman, que es lo que hacia antes.
 */
export const helvetica = localFont({
  src: [
    {path: './fonts/HelveticaNeueCyr-Light.woff2', weight: '300', style: 'normal'},
    {path: './fonts/HelveticaNeueCyr-Roman.woff2', weight: '400', style: 'normal'},
    {path: './fonts/HelveticaNeueCyr-Bold.woff2', weight: '700', style: 'normal'}
  ],
  display: 'swap',
  variable: '--font-helvetica',
  fallback: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif']
});

/**
 * Inter — solo los pesos que algun elemento usa de verdad (400, 600, 700).
 * Antes se pedian siete (300, 400, 500, 600, 700, 800, 900).
 */
export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['system-ui', 'sans-serif']
});
