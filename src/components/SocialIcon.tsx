import type {ReactNode} from 'react';

/**
 * Icono de red social del header y del footer.
 *
 * Con `url`: enlace normal que abre en pestana nueva.
 * Sin `url`: se muestra el MISMO icono de marca, con el mismo tamano, color y
 * hover, pero como <span> no interactivo — sin href, sin foco por teclado y
 * aria-hidden. Asi el icono existe visualmente sin publicar un enlace roto ni
 * anunciar a un lector de pantalla un destino que no lleva a ningun sitio.
 *
 * Las URLs viven en src/lib/social.ts: al rellenarlas, el icono pasa solo de
 * placeholder a enlace real sin tocar este componente.
 */
export default function SocialIcon({
  url,
  label,
  children
}: {
  url: string;
  label: string;
  children: ReactNode;
}) {
  if (!url) {
    return (
      <span className="nav-social-ico" aria-hidden="true">
        {children}
      </span>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="nav-social-ico"
      aria-label={label}
      data-hover
    >
      {children}
    </a>
  );
}
