import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import ServicePageClient from '@/components/templates/service-page-client';
import { sanityFetch } from "@/sanity/lib/client";
import { SERVICE_LANDING_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { ServiceLandingPage, SiteSettings } from "@/types/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled: isDraftMode } = await draftMode();
  const pageData = await sanityFetch<ServiceLandingPage | null>({
    query: SERVICE_LANDING_PAGE_QUERY,
    params: { id: 'strategyPage' },
    revalidate: isDraftMode ? 0 : 60,
    tags: ['strategyPage'],
  });

  return {
    title: pageData?.seoTitle || 'Strategy Insights | Gamma Capital',
    description: pageData?.seoDescription || 'Actionable market intelligence and data-driven analysis including market research, technical signals, risk assessment, and opportunity identification.',
  };
}

export default async function StrategyInsightsPage() {
  const { isEnabled: isDraftMode } = await draftMode();

  const [pageData, siteSettings] = await Promise.all([
    sanityFetch<ServiceLandingPage | null>({
      query: SERVICE_LANDING_PAGE_QUERY,
      params: { id: 'strategyPage' },
      revalidate: isDraftMode ? 0 : 60,
      tags: ['strategyPage'],
    }),
    sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      revalidate: isDraftMode ? 0 : 60,
      tags: ['siteSettings'],
    }),
  ]);

  return (
    <ServicePageClient
      pageData={pageData}
      siteSettings={siteSettings}
      defaultBadge="Strategy Insights"
      defaultTitle="Market Intelligence & Strategy"
    />
  );
}
