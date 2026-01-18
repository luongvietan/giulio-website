import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import MembershipsPageClient from './memberships-client';
import { sanityFetch } from '@/sanity/lib/client';
import { MEMBERSHIPS_PAGE_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries';
import type { MembershipsPage, SiteSettings } from '@/types/sanity';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await sanityFetch<MembershipsPage | null>({
    query: MEMBERSHIPS_PAGE_QUERY,
    tags: ['membershipsPage'],
  });

  return {
    title: pageData?.seoTitle ?? 'Discord Memberships | Gamma Capital',
    description: pageData?.seoDescription ?? 'Join our exclusive Discord community for real-time market insights and connect with sophisticated investors.',
  };
}

export default async function MembershipsPage() {
  const { isEnabled: isDraftMode } = await draftMode();

  const [pageData, siteSettings] = await Promise.all([
    sanityFetch<MembershipsPage | null>({
      query: MEMBERSHIPS_PAGE_QUERY,
      revalidate: isDraftMode ? 0 : 60,
      tags: ['membershipsPage'],
    }),
    sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      revalidate: isDraftMode ? 0 : 60,
      tags: ['siteSettings'],
    }),
  ]);

  return <MembershipsPageClient pageData={pageData} siteSettings={siteSettings} />;
}
