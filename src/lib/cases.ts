import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {routing} from '@/i18n/routing';

const CASES_DIR = path.join(process.cwd(), 'content', 'cases');

export type CaseMetric = {label: string; value: string};
export type CaseMetaItem = {label: string; value: string};
export type CaseDetailItem = {label: string; value: string};

export type CaseFeature = {
  image: string;
  imageAlt: string;
  caption: string;
  statementBefore: string;
  statementEm: string;
  statementAfter: string;
};

export type CaseComparison = {
  kind: 'chart' | 'image';
  title: string;
  subtitle: string;
  // chart
  beforePoints?: string;
  afterPoints?: string;
  // image
  beforeImage?: string;
  beforeAlt?: string;
  beforeFilter?: string;
  afterImage?: string;
  afterAlt?: string;
};

export type CaseGalleryItem = {image: string; caption: string};

export type CaseFrontmatter = {
  client: string;
  title: string;
  description: string;
  coverImage: string;
  coverAlt?: string;
  date: string;
  metrics?: CaseMetric[];
  meta?: CaseMetaItem[];
  details?: CaseDetailItem[];
  feature?: CaseFeature;
  comparisons?: CaseComparison[];
  gallery?: CaseGalleryItem[];
};

export type CaseData = {
  slug: string;
  frontmatter: CaseFrontmatter;
  content: string;
};

// Resolve the .mdx file for a locale/slug, with defensive fallback to the
// default locale (pt) when a given language file is missing.
function fileFor(locale: string, slug: string): string | null {
  const direct = path.join(CASES_DIR, locale, `${slug}.mdx`);
  if (fs.existsSync(direct)) return direct;
  const fallback = path.join(CASES_DIR, routing.defaultLocale, `${slug}.mdx`);
  if (fs.existsSync(fallback)) return fallback;
  return null;
}

// Slugs come from the default-locale folder = single source of truth,
// guaranteeing the SAME slug across the three languages.
export function getCaseSlugs(): string[] {
  const dir = path.join(CASES_DIR, routing.defaultLocale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getCase(locale: string, slug: string): CaseData | null {
  const file = fileFor(locale, slug);
  if (!file) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const {data, content} = matter(raw);
  return {slug, frontmatter: data as CaseFrontmatter, content};
}

export function getAllCases(locale: string): CaseData[] {
  return getCaseSlugs()
    .map((slug) => getCase(locale, slug))
    .filter((c): c is CaseData => c !== null)
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}
