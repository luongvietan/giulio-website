import { defineType, defineField } from 'sanity'
import { Target } from 'lucide-react'

export default defineType({
    name: 'whyGammaSection',
    title: 'Why Gamma Section',
    type: 'object',
    icon: Target,
    fields: [
        defineField({
            name: 'badge',
            title: 'Badge Text',
            type: 'string',
            initialValue: 'Our Difference',
        }),
        defineField({
            name: 'title',
            title: 'Section Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
            initialValue: 'Why Gamma Capital',
        }),
        defineField({
            name: 'reasons',
            title: 'Reasons',
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
                                { title: 'Building', value: 'Building' },
                                { title: 'Target', value: 'Target' },
                                { title: 'Shield', value: 'Shield' },
                                { title: 'Message Square', value: 'MessageSquare' },
                                { title: 'Layers', value: 'Layers' },
                            ],
                        },
                    }),
                    defineField({ name: 'text', title: 'Text', type: 'string' }),
                ],
                preview: {
                    select: { title: 'text', subtitle: 'icon' },
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
                title: 'Why Gamma Section',
                subtitle: title,
            }
        },
    },
})
