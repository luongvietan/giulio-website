import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const secret = searchParams.get('secret')

    // Validate secret to protect the endpoint
    const previewSecret = process.env.SANITY_PREVIEW_SECRET

    // Require secret in production
    if (!previewSecret && process.env.NODE_ENV === 'production') {
        console.error('[Draft API] SANITY_PREVIEW_SECRET is not configured')
        return NextResponse.json({ message: 'Preview not configured' }, { status: 500 })
    }

    if (previewSecret && secret !== previewSecret) {
        return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // Enable draft mode
    const draft = await draftMode()
    draft.enable()

    // Redirect to the page being previewed
    if (slug) {
        redirect(slug === '/' ? '/' : `/${slug}`)
    }

    redirect('/')
}
