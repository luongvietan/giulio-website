import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { documentInternationalization } from '@sanity/document-internationalization'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'
import { schemaTypes } from './schemaTypes'

const supportedLanguages = [
  { id: 'en', title: 'English' },
  { id: 'it', title: 'Italiano' }
]

const i18nSchemaTypes = [
  'page',
  'siteSettings',
  'contactPage',
  'membershipsPage',
  'consultingPage',
  'solutionsPage',
  'serviceLandingPage',
  'uiStrings'
]

const singletonTypes = ['serviceLandingPage']
const i18nListTypes = ['siteSettings', 'contactPage', 'membershipsPage', 'consultingPage', 'solutionsPage', 'uiStrings', 'serviceLandingPage']

const structure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.documentTypeList('siteSettings').title('Site Settings (All Languages)')),
      S.listItem()
        .title('Solutions Page')
        .id('solutionsPage')
        .child(S.documentTypeList('solutionsPage').title('Solutions Page (All Languages)')),
      S.divider(),
      S.listItem()
        .title('Service Pages')
        .id('servicePages')
        .child(S.documentTypeList('serviceLandingPage').title('Service Pages (All Languages)')),
      S.divider(),
      S.listItem()
        .title('Memberships Page')
        .id('membershipsPage')
        .child(S.documentTypeList('membershipsPage').title('Memberships Page (All Languages)')),
      S.listItem()
        .title('Consulting Page')
        .id('consultingPage')
        .child(S.documentTypeList('consultingPage').title('Consulting Page (All Languages)')),
      S.listItem()
        .title('Contact Page')
        .id('contactPage')
        .child(S.documentTypeList('contactPage').title('Contact Page (All Languages)')),
      S.divider(),
      S.listItem()
        .title('UI Strings')
        .id('uiStrings')
        .child(S.documentTypeList('uiStrings').title('UI Strings (All Languages)')),
      S.documentTypeListItem('page').title('Pages'),
    ])

export default defineConfig({
  name: 'default',
  title: 'Gamma Capital CMS',

  projectId: 'rm9kkope',
  dataset: 'production',
  basePath: '/admin',

  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_ORIGIN || 'http://localhost:3000',
        preview: '/',
        previewMode: {
          enable: '/api/draft' + (process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET
            ? `?secret=${process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET}`
            : ''),
        },
      },
    }),
    visionTool(),
    documentInternationalization({
      supportedLanguages,
      schemaTypes: i18nSchemaTypes,
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) =>
        !i18nListTypes.includes(schemaType)
      ),
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

