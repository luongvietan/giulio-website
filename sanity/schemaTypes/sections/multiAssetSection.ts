import { defineType, defineField } from 'sanity'
import { Globe } from 'lucide-react'

export default defineType({
    name: 'multiAssetSection',
    title: 'Multi-Asset Section',
    type: 'object',
    icon: Globe,
    fields: [
        defineField({
            name: 'badge',
            title: 'Badge Text',
            type: 'string',
            initialValue: 'Cross-Asset Expertise',
        }),
        defineField({
            name: 'title',
            title: 'Section Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
            initialValue: 'A Multi-Asset, Institutional Perspective',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'secondaryDescription',
            title: 'Secondary Description',
            type: 'text',
            rows: 3,
            description: 'Optional second paragraph',
        }),
        defineField({
            name: 'assetClasses',
            title: 'Asset Classes',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({
                        name: 'icon',
                        title: 'Icon',
                        type: 'string',
                        options: {
                            list: [
                                { title: 'Trending Up', value: 'TrendingUp' },
                                { title: 'Layers', value: 'Layers' },
                                { title: 'Globe', value: 'Globe' },
                                { title: 'Building', value: 'Building2' },
                                { title: 'Coins', value: 'Coins' },
                            ],
                        },
                    }),
                    defineField({ name: 'label', title: 'Label', type: 'string' }),
                ],
                preview: {
                    select: { title: 'label', subtitle: 'icon' },
                },
            }],
            validation: (Rule) => Rule.max(6),
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                title: 'Multi-Asset Section',
                subtitle: title,
            }
        },
    },
})
