import { defineType, defineField } from 'sanity'
import { Text } from 'lucide-react'

export default defineType({
    name: 'uiStrings',
    title: 'UI Strings',
    type: 'document',
    icon: Text,
    groups: [
        { name: 'notFound', title: '404 Page' },
        { name: 'general', title: 'General' },
    ],
    fields: [
        // 404 Page Fields
        defineField({
            name: 'notFoundBadge',
            title: '404 Badge Text',
            type: 'string',
            group: 'notFound',
            initialValue: 'Error 404',
        }),
        defineField({
            name: 'notFoundTitle',
            title: '404 Title',
            type: 'string',
            group: 'notFound',
            initialValue: 'Lost in Data.',
            description: 'Use {highlight} to wrap the highlighted word, e.g., "Lost in {highlight}Data.{/highlight}"',
        }),
        defineField({
            name: 'notFoundDescription',
            title: '404 Description',
            type: 'text',
            group: 'notFound',
            rows: 2,
            initialValue: 'The page you are looking for has been moved, removed, or never existed in our strategy framework.',
        }),
        defineField({
            name: 'notFoundHomeButtonText',
            title: 'Home Button Text',
            type: 'string',
            group: 'notFound',
            initialValue: 'Return Home',
        }),
        defineField({
            name: 'notFoundContactButtonText',
            title: 'Contact Button Text',
            type: 'string',
            group: 'notFound',
            initialValue: 'Contact Support',
        }),
        defineField({
            name: 'notFoundQuickLinksTitle',
            title: 'Quick Links Section Title',
            type: 'string',
            group: 'notFound',
            initialValue: 'Popular Insights',
        }),
        defineField({
            name: 'notFoundQuickLinks',
            title: 'Quick Links',
            type: 'array',
            group: 'notFound',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'label', title: 'Label', type: 'string' }),
                    defineField({ name: 'href', title: 'Link', type: 'string' }),
                ],
                preview: {
                    select: { title: 'label', subtitle: 'href' },
                },
            }],
        }),

        // General UI Strings
        defineField({
            name: 'draftModeLabel',
            title: 'Draft Mode Label',
            type: 'string',
            group: 'general',
            initialValue: 'Draft Mode',
        }),
        defineField({
            name: 'draftModeExitText',
            title: 'Draft Mode Exit Text',
            type: 'string',
            group: 'general',
            initialValue: 'Exit',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'UI Strings',
                subtitle: 'System messages and labels',
            }
        },
    },
})
