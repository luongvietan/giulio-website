import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

// Default quality for optimized images (85 provides good balance of quality/size)
const DEFAULT_QUALITY = 85

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
    return builder.image(source)
}

// Helper to get a full URL for an image with optional dimensions
export function getImageUrl(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    source: any,
    options?: {
        width?: number
        height?: number
        quality?: number
    }
): string | null {
    if (!source) return null

    // Check if source has required asset reference
    if (!source.asset?._ref && !source._ref) {
        console.warn('[Sanity Image] Missing asset reference')
        return null
    }

    try {
        let imageBuilder = builder.image(source)

        if (options?.width) {
            imageBuilder = imageBuilder.width(options.width)
        }
        if (options?.height) {
            imageBuilder = imageBuilder.height(options.height)
        }
        // Apply quality (use default if not specified)
        imageBuilder = imageBuilder.quality(options?.quality || DEFAULT_QUALITY)

        return imageBuilder.auto('format').url()
    } catch (error) {
        console.error('[Sanity Image] Failed to build URL:', error)
        return null
    }
}

// Safe image URL that returns a fallback for broken references
export function getSafeImageUrl(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    source: any,
    options?: {
        width?: number
        height?: number
        quality?: number
        fallback?: string
    }
): string {
    const url = getImageUrl(source, options)
    return url || options?.fallback || ''
}
