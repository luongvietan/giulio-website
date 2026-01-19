import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { documentInternationalization } from '@sanity/document-internationalization'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'
import { schemaTypes } from './schemaTypes'

// Supported languages for internationalization
const supportedLanguages = [
  { id: 'en', title: 'English' },
  { id: 'it', title: 'Italiano' }
]

// Document types that support internationalization
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

// Custom structure for singleton documents (excluding i18n types that need multiple docs per language)
const singletonTypes = ['networkPage', 'realEstatePage', 'strategyPage']

// Types that should show as lists (for i18n)
const i18nListTypes = ['siteSettings', 'contactPage', 'membershipsPage', 'consultingPage', 'solutionsPage', 'uiStrings']

const structure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      // Site Settings (i18n list)
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.documentTypeList('siteSettings')
            .title('Site Settings (All Languages)')
        ),
      // Solutions Page (i18n list)
      S.listItem()
        .title('Solutions Page')
        .id('solutionsPage')
        .child(
          S.documentTypeList('solutionsPage')
            .title('Solutions Page (All Languages)')
        ),
      S.divider(),
      // Service Pages (Singletons - no i18n for now)
      S.listItem()
        .title('Network Page')
        .id('networkPage')
        .child(
          S.document()
            .schemaType('serviceLandingPage')
            .documentId('networkPage')
            .title('Network Page')
        ),
      S.listItem()
        .title('Real Estate Page')
        .id('realEstatePage')
        .child(
          S.document()
            .schemaType('serviceLandingPage')
            .documentId('realEstatePage')
            .title('Real Estate Page')
        ),
      S.listItem()
        .title('Strategy Page')
        .id('strategyPage')
        .child(
          S.document()
            .schemaType('serviceLandingPage')
            .documentId('strategyPage')
            .title('Strategy Page')
        ),
      S.divider(),
      // Other Pages (i18n lists)
      S.listItem()
        .title('Memberships Page')
        .id('membershipsPage')
        .child(
          S.documentTypeList('membershipsPage')
            .title('Memberships Page (All Languages)')
        ),
      S.listItem()
        .title('Consulting Page')
        .id('consultingPage')
        .child(
          S.documentTypeList('consultingPage')
            .title('Consulting Page (All Languages)')
        ),
      S.listItem()
        .title('Contact Page')
        .id('contactPage')
        .child(
          S.documentTypeList('contactPage')
            .title('Contact Page (All Languages)')
        ),
      S.divider(),
      // UI Strings (i18n list)
      S.listItem()
        .title('UI Strings')
        .id('uiStrings')
        .child(
          S.documentTypeList('uiStrings')
            .title('UI Strings (All Languages)')
        ),
      // Pages
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
    // Filter out singleton types from the global "New document" menu
    // i18n types are handled by the plugin
    templates: (templates) =>
      templates.filter(({ schemaType }) => 
        !singletonTypes.includes(schemaType) && !i18nListTypes.includes(schemaType)
      ),
  },

  document: {
    // For singleton types, prevent creating new documents and deleting existing ones
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
