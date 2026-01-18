import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import ConsultingPageClient from './consulting-client';
import { sanityFetch } from '@/sanity/lib/client';
import { CONSULTING_PAGE_QUERY, SITE_SETTINGS_QUERY, UI_STRINGS_QUERY } from '@/sanity/lib/queries';
import type { ConsultingPage, SiteSettings, UIStrings } from '@/types/sanity';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await sanityFetch<ConsultingPage | null>({
    query: CONSULTING_PAGE_QUERY,
    tags: ['consultingPage'],
  });

  return {
    title: pageData?.seoTitle ?? 'Consulting Services | Gamma Capital',
    description: pageData?.seoDescription ?? 'Expert investment consulting services including portfolio review, strategy design, and risk framework development.',
  };
}

export default async function ConsultingPage() {
  const { isEnabled: isDraftMode } = await draftMode();

  const [pageData, siteSettings, uiStrings] = await Promise.all([
    sanityFetch<ConsultingPage | null>({
      query: CONSULTING_PAGE_QUERY,
      revalidate: isDraftMode ? 0 : 60,
      tags: ['consultingPage'],
    }),
    sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      revalidate: isDraftMode ? 0 : 60,
      tags: ['siteSettings'],
    }),
    sanityFetch<UIStrings | null>({
      query: UI_STRINGS_QUERY,
      revalidate: isDraftMode ? 0 : 60,
      tags: ['uiStrings'],
    }),
  ]);

  return <ConsultingPageClient pageData={pageData} siteSettings={siteSettings} uiStrings={uiStrings} />;
}
