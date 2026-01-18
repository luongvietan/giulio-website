import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import ServicePageClient from '@/components/templates/service-page-client';
import { sanityFetch } from "@/sanity/lib/client";
import { SERVICE_LANDING_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { ServiceLandingPage, SiteSettings } from "@/types/sanity";

// Metadata is now handled within the page component or via generateMetadata referencing CMS if needed
export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled: isDraftMode } = await draftMode();
  // Fetch with ID 'networkPage'
  const pageData = await sanityFetch<ServiceLandingPage | null>({
    query: SERVICE_LANDING_PAGE_QUERY,
    params: { id: 'networkPage' },
    revalidate: isDraftMode ? 0 : 60,
    tags: ['networkPage'],
  });

  return {
    title: pageData?.seoTitle || 'Strategic Network | Gamma Capital',
    description: pageData?.seoDescription || 'Access exclusive deal flow, institutional connections, and curated investment opportunities through our strategic network.',
  };
}

export default async function NetworkPage() {
  const { isEnabled: isDraftMode } = await draftMode();

  const [pageData, siteSettings] = await Promise.all([
    sanityFetch<ServiceLandingPage | null>({
      query: SERVICE_LANDING_PAGE_QUERY,
      params: { id: 'networkPage' },
      revalidate: isDraftMode ? 0 : 60,
      tags: ['networkPage'],
    }),
    sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      revalidate: isDraftMode ? 0 : 60,
      tags: ['siteSettings'],
    }),
  ]);

  if (!pageData && !isDraftMode) {
    // Optional: could render with defaults or notFound
    // notFound();
  }

  return (
    <ServicePageClient
      pageData={pageData}
      siteSettings={siteSettings}
      defaultBadge="Strategic Network"
      defaultTitle="Exclusive Access & Strategic Connections"
    />
  );
}
