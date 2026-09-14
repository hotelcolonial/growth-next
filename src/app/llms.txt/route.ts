import {routing} from '@/i18n/routing';
import {SITE_URL, ALLOW_INDEXING} from '@/lib/seo';
import {getAllCases} from '@/lib/cases';
import {getAllPosts} from '@/lib/blog';

// /llms.txt — mapa del sitio en markdown para motores de IA (ChatGPT,
// Perplexity, Gemini, Google AI Overviews). Se genera en build a partir del
// contenido REAL: solo lista URLs que existen.
//
// Interruptor de indexacion: mientras NEXT_PUBLIC_ALLOW_INDEXING no sea 'true'
// este archivo devuelve 404. El motivo es coherencia — robots.txt responde
// "Disallow: /" y todas las paginas emiten noindex, asi que seria contradictorio
// servir a la vez un mapa que invita a leer y citar el sitio. Muchos crawlers de
// IA ignoran robots.txt, de modo que un llms.txt completo lo dejaria expuesto
// justo cuando no queremos. Al activar el interruptor aparece solo.

const nl = (xs: string[]) => xs.join('\n');

export function GET() {
  if (!ALLOW_INDEXING) {
    return new Response('Not Found', {status: 404});
  }

  const {defaultLocale, locales} = routing;
  const cases = getAllCases(defaultLocale);
  const posts = getAllPosts(defaultLocale);

  const secciones: string[] = [];

  secciones.push(
    nl([
      '# Growth Hotel Solutions',
      '',
      '> Terceirização comercial para hotéis no Brasil. Assumimos a operação',
      '> comercial completa do hotel — revenue management, distribuição,',
      '> marketing de performance, conteúdo e central de reservas — para',
      '> aumentar as reservas diretas e reduzir a dependência das OTAs.',
      '',
      `Site disponível em ${locales.length} idiomas: português (${SITE_URL}/pt),`,
      `espanhol (${SITE_URL}/es) e inglês (${SITE_URL}/en). Os links abaixo`,
      `apontam para a versão em português, o idioma padrão; troque o prefixo`,
      '`/pt` por `/es` ou `/en` para as outras versões.'
    ])
  );

  secciones.push(
    nl([
      '## Páginas principais',
      '',
      `- [Início](${SITE_URL}/${defaultLocale}): o que fazemos, os pilares da operação comercial (revenue e distribuição, conteúdo e redes sociais, marketing de performance, central de reservas), o método de trabalho e os planos.`,
      `- [Blog](${SITE_URL}/${defaultLocale}/blog): artigos sobre revenue management, distribuição hoteleira e marketing para hotéis.`,
      `- [Política de Privacidade](${SITE_URL}/${defaultLocale}/privacidade): quais dados pessoais tratamos e os direitos do titular segundo a LGPD.`
    ])
  );

  if (cases.length > 0) {
    secciones.push(
      nl([
        '## Cases',
        '',
        ...cases.map((c) => {
          const f = c.frontmatter;
          // La metrica principal, si existe, va en la propia linea: es el dato
          // concreto que un modelo puede citar.
          const metrica = f.metrics?.[0];
          const cifra = metrica ? ` Resultado: ${metrica.value} em ${metrica.label}.` : '';
          return `- [${f.title}](${SITE_URL}/${defaultLocale}/cases/${c.slug}): ${f.description}${cifra}`;
        })
      ])
    );
  }

  if (posts.length > 0) {
    secciones.push(
      nl([
        '## Artigos do blog',
        '',
        ...posts.map((p) => {
          const f = p.frontmatter;
          const desc = f.description ? `: ${f.description}` : '';
          return `- [${f.title}](${SITE_URL}/${defaultLocale}/blog/${p.slug})${desc}`;
        })
      ])
    );
  }

  secciones.push(
    nl([
      '## Contato',
      '',
      '- Telefone: 0800 819 1993',
      '- E-mail: contato@growthhotelsolutions.com.br',
      '',
      'Para agendar um diagnóstico comercial, use o formulário disponível em',
      `qualquer página do site (${SITE_URL}/${defaultLocale}).`
    ])
  );

  return new Response(secciones.join('\n\n') + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
