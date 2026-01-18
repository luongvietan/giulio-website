import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import ContactPageClient from './contact-client';
import { sanityFetch } from '@/sanity/lib/client';
import { CONTACT_PAGE_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries';
import type { ContactPage, SiteSettings } from '@/types/sanity';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await sanityFetch<ContactPage | null>({
    query: CONTACT_PAGE_QUERY,
    tags: ['contactPage'],
  });

  return {
    title: pageData?.seoTitle ?? 'Contact Us | Gamma Capital',
    description: pageData?.seoDescription ?? 'Get in touch with Gamma Capital. Contact us about Discord memberships, consulting services, or general inquiries.',
  };
}

export default async function ContactPage() {
  const { isEnabled: isDraftMode } = await draftMode();

  const [pageData, siteSettings] = await Promise.all([
    sanityFetch<ContactPage | null>({
      query: CONTACT_PAGE_QUERY,
      revalidate: isDraftMode ? 0 : 60,
      tags: ['contactPage'],
    }),
    sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      revalidate: isDraftMode ? 0 : 60,
      tags: ['siteSettings'],
    }),
  ]);

  return <ContactPageClient pageData={pageData} siteSettings={siteSettings} />;
}
