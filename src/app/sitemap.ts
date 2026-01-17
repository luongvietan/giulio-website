import { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/client'

interface PageData {
    _id: string
    title: string
    slug: string
    isHomepage?: boolean
    noIndex?: boolean
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gammacapital.com'

    // Custom query to include noIndex field for filtering
    const SITEMAP_PAGES_QUERY = `*[_type == "page"] {
        _id,
        title,
        "slug": slug.current,
        isHomepage,
        noIndex
    }`

    // Fetch all pages from Sanity
    const pages = await sanityFetch<PageData[] | null>({
        query: SITEMAP_PAGES_QUERY,
        revalidate: 3600, // Revalidate every hour
        tags: ['page', 'sitemap'],
    })

    // Static routes that always exist
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: siteUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${siteUrl}/memberships`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${siteUrl}/solutions`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${siteUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${siteUrl}/consulting`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ]

    // Dynamic CMS pages (excluding homepage and noIndex pages)
    const cmsRoutes: MetadataRoute.Sitemap = (pages || [])
        .filter((page) => !page.isHomepage && page.slug && !page.noIndex)
        .map((page) => ({
            url: `${siteUrl}/${page.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }))

    return [...staticRoutes, ...cmsRoutes]
}
