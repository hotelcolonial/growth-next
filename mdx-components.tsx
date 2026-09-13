import type {MDXComponents} from 'mdx/types';

// Punto único para mapear/estilizar elementos MDX en toda la app.
// Por ahora vacío (sin contenido aún) — aquí se añadirán overrides al portar el diseño.
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
