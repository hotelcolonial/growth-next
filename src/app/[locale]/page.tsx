import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {buildPageMetadata, organizationJsonLd} from '@/lib/seo';
import HeroHome from '@/components/sections/HeroHome';
import LogoStrip from '@/components/sections/LogoStrip';
import HeroFeature from '@/components/sections/HeroFeature';
import EstrategiaSection from '@/components/sections/EstrategiaSection';
import NossoTrabalho from '@/components/sections/NossoTrabalho';
import SolucaoSection from '@/components/sections/SolucaoSection';
import MetodoSection from '@/components/sections/MetodoSection';
import PlanosPreviewSection from '@/components/sections/PlanosPreviewSection';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Meta'});
  const meta = buildPageMetadata({
    locale,
    path: '/',
    title: t('homeTitle'),
    description: t('homeDescription'),
    type: 'website'
  });
  // The title.template only applies to CHILD segments; the home shares the
  // layout's segment, so we set the full (absolute) title explicitly here.
  return {...meta, title: {absolute: `${t('homeTitle')} — Growth Hotel Solutions`}};
}

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(organizationJsonLd())}}
      />
      <HeroHome />
      <LogoStrip />
      <HeroFeature />
      <EstrategiaSection />
      <NossoTrabalho />
      <SolucaoSection />
      <MetodoSection />
      <PlanosPreviewSection />
    </>
  );
}
