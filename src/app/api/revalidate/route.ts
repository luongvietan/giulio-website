import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Secret to validate webhook requests from Sanity
const REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { secret, _type, slug } = body

        // Require secret in production for security
        if (process.env.NODE_ENV === 'production') {
            if (!REVALIDATE_SECRET) {
                console.error('[Revalidate] SANITY_REVALIDATE_SECRET is not configured')
                return NextResponse.json({ message: 'Webhook not configured' }, { status: 500 })
            }
            if (secret !== REVALIDATE_SECRET) {
                return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
            }
        } else if (REVALIDATE_SECRET && secret !== REVALIDATE_SECRET) {
            // In development, only validate if secret is configured
            return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
        }

        // Log in development for debugging
        if (process.env.NODE_ENV === 'development') {
            console.log('[Revalidate] Received webhook:', { _type, slug })
        }

        const revalidatedTags: string[] = []

        // Revalidate based on document type
        if (_type === 'page') {
            revalidateTag('page')
            revalidateTag('homepage')
            revalidateTag('sitemap')
            revalidatedTags.push('page', 'homepage', 'sitemap')

            // Revalidate specific slug if provided
            if (slug?.current) {
                revalidateTag(slug.current)
                revalidatedTags.push(slug.current)
            }
        } else if (_type === 'siteSettings') {
            revalidateTag('siteSettings')
            revalidatedTags.push('siteSettings')
        }

        // Always revalidate general tags
        revalidateTag('sanity')
        revalidatedTags.push('sanity')

        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            type: _type,
            tags: revalidatedTags,
        })
    } catch (error) {
        console.error('[Revalidate] Error:', error)
        return NextResponse.json(
            { message: 'Error revalidating', error: String(error) },
            { status: 500 }
        )
    }
}

