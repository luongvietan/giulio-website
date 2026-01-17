import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
    SUPPORTED_GROUPS,
    isValidLocale,
    isValidGroup,
    translations,
    type SupportedLocale,
    type SupportedGroup,
} from '@/lib/join-config';
import JoinClient from './join-client';

interface JoinPageProps {
    params: Promise<{
        group: string;
    }>;
    searchParams: Promise<{
        locale?: string;
    }>;
}

// Generate static params for all groups
export async function generateStaticParams() {
    return SUPPORTED_GROUPS.map((group) => ({ group }));
}

// Generate metadata for SEO
export async function generateMetadata({ params, searchParams }: JoinPageProps): Promise<Metadata> {
    const { group } = await params;
    const { locale = 'en' } = await searchParams;

    if (!isValidGroup(group)) {
        return { title: 'Not Found' };
    }

    const validLocale = isValidLocale(locale) ? locale : 'en';
    const t = translations[validLocale as SupportedLocale];

    return {
        title: `${t.ctaButton} | Gamma Capital`,
        description: t.description,
        robots: 'noindex, nofollow', // Usually join pages should not be indexed
    };
}

export default async function JoinPage({ params, searchParams }: JoinPageProps) {
    const { group } = await params;
    const { locale = 'en' } = await searchParams;

    // Validate group
    if (!isValidGroup(group)) {
        notFound();
    }

    // Default to 'en' if locale is invalid
    const validLocale = isValidLocale(locale) ? locale : 'en';

    return (
        <JoinClient
            locale={validLocale as SupportedLocale}
            group={group as SupportedGroup}
        />
    );
}
