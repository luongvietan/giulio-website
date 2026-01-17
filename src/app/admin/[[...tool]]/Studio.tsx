'use client'

import { NextStudio } from 'next-sanity/studio'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'

// Schema imports - properly typed for Next.js sanity module
// Note: We duplicate the schema structure here because importing from /sanity folder
// causes type conflicts between the two separate node_modules (sanity/ vs root)

// Objects
const link = {
    name: 'link',
    title: 'Link',
    type: 'object',
    fields: [
        { name: 'text', title: 'Text', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'href', title: 'URL', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'isExternal', title: 'Open in new tab?', type: 'boolean', initialValue: false },
    ],
}

const ctaButton = {
    name: 'ctaButton',
    title: 'CTA Button',
    type: 'object',
    fields: [
        { name: 'text', title: 'Button Text', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'href', title: 'URL', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'variant', title: 'Style Variant', type: 'string', options: { list: ['primary', 'secondary', 'ghost'] }, initialValue: 'primary' },
        { name: 'showArrow', title: 'Show Arrow Icon?', type: 'boolean', initialValue: true },
    ],
}

const navItem = {
    name: 'navItem',
    title: 'Navigation Item',
    type: 'object',
    fields: [
        { name: 'text', title: 'Menu Text', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'href', title: 'URL', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'hasDropdown', title: 'Has Dropdown Menu?', type: 'boolean', initialValue: false },
        {
            name: 'dropdownItems',
            title: 'Dropdown Items',
            type: 'array',
            of: [{
                type: 'object', fields: [
                    { name: 'text', title: 'Text', type: 'string', validation: (Rule: any) => Rule.required() },
                    { name: 'description', title: 'Description', type: 'string' },
                    { name: 'href', title: 'URL', type: 'string', validation: (Rule: any) => Rule.required() },
                ]
            }],
            hidden: ({ parent }: any) => !parent?.hasDropdown,
        },
    ],
}

const stat = {
    name: 'stat',
    title: 'Statistic',
    type: 'object',
    fields: [
        { name: 'value', title: 'Value', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'label', title: 'Label', type: 'string', validation: (Rule: any) => Rule.required() },
    ],
}

const serviceCard = {
    name: 'serviceCard',
    title: 'Service Card',
    type: 'object',
    fields: [
        { name: 'icon', title: 'Icon Name', type: 'string', options: { list: ['BarChart3', 'Users', 'Building2', 'Network', 'Rocket', 'Discord'] } },
        { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'description', title: 'Description', type: 'text', rows: 3, validation: (Rule: any) => Rule.required() },
        { name: 'href', title: 'Link URL', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'linkText', title: 'Link Text', type: 'string', initialValue: 'Learn more' },
    ],
}

// Sections
const heroSection = {
    name: 'heroSection',
    title: 'Hero Section',
    type: 'object',
    fields: [
        { name: 'badge', title: 'Badge Text', type: 'string' },
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'titleLine2', title: 'Title Line 2 (Highlighted)', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'description', title: 'Description', type: 'text', rows: 3, validation: (Rule: any) => Rule.required() },
        { name: 'primaryCTA', title: 'Primary CTA Button', type: 'ctaButton' },
        { name: 'secondaryCTA', title: 'Secondary CTA Button', type: 'ctaButton' },
        { name: 'featureCards', title: 'Feature Cards', type: 'array', of: [{ type: 'serviceCard' }], validation: (Rule: any) => Rule.max(3) },
        { name: 'stats', title: 'Statistics', type: 'array', of: [{ type: 'stat' }], validation: (Rule: any) => Rule.max(4) },
    ],
}

const whatWeDoSection = {
    name: 'whatWeDoSection',
    title: 'What We Do Section',
    type: 'object',
    fields: [
        { name: 'badge', title: 'Badge Text', type: 'string', initialValue: 'Our Solutions' },
        { name: 'title', title: 'Section Title', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'description', title: 'Description', type: 'text', rows: 2 },
        { name: 'services', title: 'Services', type: 'array', of: [{ type: 'serviceCard' }] },
        { name: 'showViewAllButton', title: 'Show "View All" Button?', type: 'boolean', initialValue: true },
        { name: 'viewAllButtonText', title: 'View All Button Text', type: 'string', hidden: ({ parent }: any) => !parent?.showViewAllButton },
        { name: 'viewAllButtonHref', title: 'View All Button URL', type: 'string', hidden: ({ parent }: any) => !parent?.showViewAllButton },
    ],
}

const testimonialCTASection = {
    name: 'testimonialCTASection',
    title: 'CTA Section',
    type: 'object',
    fields: [
        { name: 'badge', title: 'Badge Text', type: 'string' },
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'titleLine2', title: 'Title Line 2 (Muted)', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        { name: 'primaryCTA', title: 'Primary CTA Button', type: 'ctaButton' },
        { name: 'secondaryCTA', title: 'Secondary CTA Button', type: 'ctaButton' },
    ],
}

const threeCardsSection = {
    name: 'threeCardsSection',
    title: 'Three Cards Section',
    type: 'object',
    fields: [
        { name: 'cards', title: 'Cards', type: 'array', of: [{ type: 'serviceCard' }], validation: (Rule: any) => Rule.max(3).min(1) },
    ],
}

const richTextSection = {
    name: 'richTextSection',
    title: 'Rich Text Section',
    type: 'object',
    fields: [
        { name: 'title', title: 'Section Title (optional)', type: 'string' },
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                { type: 'block', styles: [{ title: 'Normal', value: 'normal' }, { title: 'H2', value: 'h2' }, { title: 'H3', value: 'h3' }, { title: 'Quote', value: 'blockquote' }] },
                { type: 'image', options: { hotspot: true } },
            ],
        },
        { name: 'backgroundColor', title: 'Background Color', type: 'string', options: { list: ['white', 'gray', 'teal'] }, initialValue: 'white' },
    ],
}

// Documents
const siteSettings = {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    groups: [
        { name: 'navigation', title: 'Navigation' },
        { name: 'footer', title: 'Footer' },
        { name: 'seo', title: 'SEO & Meta' },
    ],
    fields: [
        { name: 'siteName', title: 'Site Name', type: 'string', group: 'navigation', initialValue: 'Gamma Capital' },
        { name: 'logo', title: 'Logo', type: 'image', group: 'navigation', options: { hotspot: true } },
        { name: 'logoText', title: 'Logo Text (if no image)', type: 'string', group: 'navigation', initialValue: 'Γ' },
        { name: 'navItems', title: 'Navigation Menu Items', type: 'array', group: 'navigation', of: [{ type: 'navItem' }] },
        { name: 'navCTA', title: 'Navigation CTA Button', type: 'ctaButton', group: 'navigation' },
        { name: 'footerDescription', title: 'Footer Description', type: 'text', group: 'footer', rows: 2 },
        { name: 'socialLinks', title: 'Social Media Links', type: 'array', group: 'footer', of: [{ type: 'object', fields: [{ name: 'platform', title: 'Platform', type: 'string', options: { list: ['twitter', 'linkedin', 'discord', 'email'] } }, { name: 'url', title: 'URL', type: 'string' }] }] },
        { name: 'footerColumns', title: 'Footer Link Columns', type: 'array', group: 'footer', of: [{ type: 'object', fields: [{ name: 'title', title: 'Column Title', type: 'string' }, { name: 'links', title: 'Links', type: 'array', of: [{ type: 'link' }] }] }] },
        { name: 'contactEmail', title: 'Contact Email', type: 'string', group: 'footer' },
        { name: 'copyrightText', title: 'Copyright Text', type: 'string', group: 'footer' },
        { name: 'disclaimer', title: 'Footer Disclaimer', type: 'text', group: 'footer', rows: 3 },
        { name: 'seoTitle', title: 'Default SEO Title', type: 'string', group: 'seo' },
        { name: 'seoDescription', title: 'Default Meta Description', type: 'text', group: 'seo', rows: 3 },
        { name: 'ogImage', title: 'Default OG Image', type: 'image', group: 'seo', options: { hotspot: true } },
    ],
}

const page = {
    name: 'page',
    title: 'Page',
    type: 'document',
    groups: [
        { name: 'content', title: 'Content', default: true },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        { name: 'title', title: 'Page Title', type: 'string', group: 'content', validation: (Rule: any) => Rule.required() },
        { name: 'slug', title: 'Slug', type: 'slug', group: 'content', options: { source: 'title', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
        { name: 'isHomepage', title: 'Is Homepage?', type: 'boolean', group: 'content', initialValue: false },
        {
            name: 'sections',
            title: 'Page Sections',
            type: 'array',
            group: 'content',
            of: [
                { type: 'heroSection', title: 'Hero Section' },
                { type: 'whatWeDoSection', title: 'What We Do' },
                { type: 'testimonialCTASection', title: 'CTA Section' },
                { type: 'threeCardsSection', title: 'Three Cards' },
                { type: 'richTextSection', title: 'Rich Text' },
            ],
        },
        { name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo' },
        { name: 'seoDescription', title: 'Meta Description', type: 'text', group: 'seo', rows: 3 },
        { name: 'ogImage', title: 'Social Share Image', type: 'image', group: 'seo', options: { hotspot: true } },
    ],
}

const schemaTypes = [link, ctaButton, navItem, stat, serviceCard, heroSection, whatWeDoSection, testimonialCTASection, threeCardsSection, richTextSection, siteSettings, page]

const singletonTypes = ['siteSettings']

const structure = (S: any) =>
    S.list()
        .title('Content')
        .items([
            S.listItem()
                .title('Site Settings')
                .id('siteSettings')
                .child(
                    S.document()
                        .schemaType('siteSettings')
                        .documentId('siteSettings')
                        .title('Site Settings')
                ),
            S.divider(),
            S.documentTypeListItem('page').title('Pages'),
        ])

const config = defineConfig({
    name: 'default',
    title: 'Gamma Capital CMS',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rm9kkope',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    basePath: '/admin',
    plugins: [
        structureTool({ structure }),
        presentationTool({
            previewUrl: {
                origin: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
                preview: '/',
                previewMode: {
                    enable: '/api/draft',
                },
            },
        }),
        visionTool(),
    ],
    schema: {
        types: schemaTypes,
        templates: (templates) =>
            templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
    },
    document: {
        actions: (prev, context) => {
            if (singletonTypes.includes(context.schemaType)) {
                return prev.filter(
                    (action) => action.action !== 'delete' && action.action !== 'duplicate'
                )
            }
            return prev
        },
    },
})

export function Studio() {
    return <NextStudio config={config} />
}
