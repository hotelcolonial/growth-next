import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {routing} from '@/i18n/routing';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export type PostDuoImage = {image: string; alt?: string};

export type PostFrontmatter = {
  title: string;
  description?: string;
  category: string; // 'dicas' | 'cases' | 'mercado'
  date: string; // ISO date, e.g. "2025-05-12" (used for ordering + display)
  coverImage: string; // card image + post hero
  coverAlt?: string;
  duo?: PostDuoImage[]; // the two "post-duo" images (optional)
};

export type PostData = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
};

function fileFor(locale: string, slug: string): string | null {
  const direct = path.join(BLOG_DIR, locale, `${slug}.mdx`);
  if (fs.existsSync(direct)) return direct;
  const fallback = path.join(BLOG_DIR, routing.defaultLocale, `${slug}.mdx`);
  if (fs.existsSync(fallback)) return fallback;
  return null;
}

// Slugs come from the default-locale folder. Files starting with "_" (e.g.
// _TEMPLATE.mdx) are ignored. Returns [] when the folder/posts don't exist.
export function getPostSlugs(): string[] {
  const dir = path.join(BLOG_DIR, routing.defaultLocale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getPost(locale: string, slug: string): PostData | null {
  if (slug.startsWith('_')) return null;
  const file = fileFor(locale, slug);
  if (!file) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const {data, content} = matter(raw);
  return {slug, frontmatter: data as PostFrontmatter, content};
}

export function getAllPosts(locale: string): PostData[] {
  return getPostSlugs()
    .map((slug) => getPost(locale, slug))
    .filter((p): p is PostData => p !== null)
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export function getAdjacentPosts(
  locale: string,
  slug: string
): {prev: PostData | null; next: PostData | null} {
  const all = getAllPosts(locale);
  const i = all.findIndex((p) => p.slug === slug);
  if (i === -1) return {prev: null, next: null};
  return {
    prev: i > 0 ? all[i - 1] : null,
    next: i < all.length - 1 ? all[i + 1] : null
  };
}

// "12 mai 2025"-style lowercase date, localized month abbreviation.
export function formatPostDate(iso: string, locale: string): string {
  const d = new Date(iso + 'T00:00:00Z');
  if (isNaN(d.getTime())) return iso;
  const day = String(d.getUTCDate()).padStart(2, '0');
  const month = new Intl.DateTimeFormat(locale, {month: 'short', timeZone: 'UTC'})
    .format(d)
    .replace('.', '')
    .toLowerCase();
  return `${day} ${month} ${d.getUTCFullYear()}`;
}
