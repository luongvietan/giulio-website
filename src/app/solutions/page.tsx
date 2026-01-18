import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import SolutionsPageClient from './solutions-client';
import { sanityFetch } from "@/sanity/lib/client";
import { SOLUTIONS_PAGE_QUERY, SITE_SETTINGS_QUERY, UI_STRINGS_QUERY } from "@/sanity/lib/queries";
import type { SolutionsPage, SiteSettings, UIStrings } from "@/types/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await sanityFetch<SolutionsPage | null>({
    query: SOLUTIONS_PAGE_QUERY,
    revalidate: 60,
    tags: ['solutionsPage'],
    skipDraftMode: true, // draftMode() not available in generateMetadata
  });

  return {
    title: pageData?.seoTitle ?? undefined,
    description: pageData?.seoDescription ?? undefined,
  };
}

export default async function SolutionsPage() {
  const { isEnabled: isDraftMode } = await draftMode();

  const [pageData, siteSettings, uiStrings] = await Promise.all([
    sanityFetch<SolutionsPage | null>({
      query: SOLUTIONS_PAGE_QUERY,
      revalidate: isDraftMode ? 0 : 60,
      tags: ['solutionsPage'],
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

  if (!pageData && !isDraftMode) {
    notFound();
  }

  return <SolutionsPageClient pageData={pageData} siteSettings={siteSettings} uiStrings={uiStrings} />;
}
