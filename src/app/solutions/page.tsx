import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import SolutionsPageClient from './solutions-client';
import { sanityFetch } from "@/sanity/lib/client";
import { SOLUTIONS_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SolutionsPage, SiteSettings } from "@/types/sanity";

// Metadata is now handled within the page component or via generateMetadata referencing CMS if needed
// For now, we can keep static metadata as fallback or fetch it dynamically
export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled: isDraftMode } = await draftMode();
  const pageData = await sanityFetch<SolutionsPage | null>({
    query: SOLUTIONS_PAGE_QUERY,
    revalidate: isDraftMode ? 0 : 60,
    tags: ['solutionsPage'],
  });

  return {
    title: pageData?.seoTitle || 'Solutions | Gamma Capital',
    description: pageData?.seoDescription || 'Comprehensive investment solutions including market intelligence, Discord memberships, consulting, real estate advisory, and strategic network access.',
  };
}

export default async function SolutionsPage() {
  const { isEnabled: isDraftMode } = await draftMode();

  const [pageData, siteSettings] = await Promise.all([
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
  ]);

  if (!pageData && !isDraftMode) {
    notFound();
  }

  return <SolutionsPageClient pageData={pageData} siteSettings={siteSettings} />;
}
