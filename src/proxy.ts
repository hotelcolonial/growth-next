import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

// Next.js 16: el antiguo `middleware` se llama ahora `proxy` (runtime nodejs).
// next-intl provee el handler de detección/ruteo de idioma como export default.
export default createMiddleware(routing);

export const config = {
  // Aplica a todas las rutas excepto API, internos de Next y archivos con extensión
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
