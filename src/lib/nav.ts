// Stub de navegación para la Fase 2 (solo la home existe).
// La navegación real entre rutas se cableará en una fase posterior.
export function useNav() {
  return {
    route: '/',
    navigate: (_to: string) => {
      /* no-op por ahora — sin rutas internas todavía */
    }
  };
}
