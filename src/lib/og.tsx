import {readFile} from 'node:fs/promises';
import {join} from 'node:path';

// Plantilla compartida por las tres imagenes Open Graph del sitio.
//
// Los recursos se leen del disco en BUILD (carpeta assets/og), no por URL:
// satori —el motor detras de ImageResponse— necesita TTF/OTF/WOFF1 para las
// fuentes y PNG/JPEG para imagenes. NO admite woff2 ni WebP, que es justo lo
// que sirve el sitio al navegador. Por eso assets/og guarda copias aparte.
//
// El texto va en Inter y NO en HelveticaNeueCyr, aunque esta sea la cara de
// marca: HelveticaNeueCyr no contiene NINGUN caracter acentuado (ni ç, ã, é,
// í, ó, ñ...). En un titular portugues o espanol satori tendria que buscar
// cada acento en otra fuente y la palabra saldria con dos tipografias
// mezcladas ("terceiriza-ç-ã-o"). Inter cubre todo el latin y ya forma parte
// del sistema tipografico del sitio, asi que la tarjeta se lee uniforme.

export const OG_SIZE = {width: 1200, height: 630};
export const OG_CONTENT_TYPE = 'image/png';

const ruta = (f: string) => join(process.cwd(), 'assets', 'og', f);

export async function cargarRecursos() {
  const [regular, bold, logo] = await Promise.all([
    readFile(ruta('Inter-Regular.woff')),
    readFile(ruta('Inter-Bold.woff')),
    readFile(ruta('logo.png'))
  ]);
  return {
    fuentes: [
      {name: 'Inter', data: regular, style: 'normal' as const, weight: 400 as const},
      {name: 'Inter', data: bold, style: 'normal' as const, weight: 700 as const}
    ],
    logoSrc: `data:image/png;base64,${logo.toString('base64')}`
  };
}

const CORAL = '#F95738';
const TINTA = '#101113';
const GRIS = '#52565B';

/**
 * Tarjeta de marca 1200x630.
 *
 * Todo el contenido vive centrado en una columna de 900px: WhatsApp a veces
 * recorta la tarjeta a un cuadrado central, y asi no se pierde nada. El titulo
 * lleva un bloque coral detras, que es el gesto de marca de la home
 * ("vender mais." sobre coral).
 */
export function TarjetaOG({
  logoSrc,
  etiqueta,
  titulo,
  pie
}: {
  logoSrc: string;
  /** Palabra pequena de contexto: "case", "blog"... Opcional. */
  etiqueta?: string;
  titulo: string;
  pie?: string;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FFFFFF',
        fontFamily: 'Inter',
        position: 'relative'
      }}
    >
      {/* Barra coral inferior: remata la tarjeta y sobrevive al recorte 16:9 */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 14,
          background: CORAL,
          display: 'flex'
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 900,
          textAlign: 'center'
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={264} height={58} style={{marginBottom: 44}} />

        {etiqueta ? (
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: GRIS,
              marginBottom: 22
            }}
          >
            {etiqueta}
          </div>
        ) : null}

        <div
          style={{
            display: 'flex',
            fontSize: titulo.length > 60 ? 54 : 66,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: -2,
            color: TINTA,
            background: CORAL,
            // El bloque coral respira alrededor del texto, como en la home
            padding: '10px 26px',
            borderRadius: 10
          }}
        >
          <span style={{color: '#FFFFFF'}}>{titulo}</span>
        </div>

        {pie ? (
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              color: GRIS,
              marginTop: 34,
              lineHeight: 1.35
            }}
          >
            {pie}
          </div>
        ) : null}
      </div>
    </div>
  );
}
