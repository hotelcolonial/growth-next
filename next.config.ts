import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  // Permite usar .md y .mdx como páginas/componentes
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx']
};

// next-intl: usa por defecto ./src/i18n/request.ts
const withNextIntl = createNextIntlPlugin();

// @next/mdx — incluye .md además de .mdx (por defecto solo compila .mdx)
const withMDX = createMDX({
  extension: /\.(md|mdx)$/
});

export default withNextIntl(withMDX(nextConfig));
