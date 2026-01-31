import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'rm9kkope',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function fetchAllDocuments() {
  console.log('🔍 Fetching ALL documents from Sanity...\n')
  console.log('='.repeat(80))

  // Get all document types
  const docTypes = [
    'brandSettings',
    'uiStrings',
    'siteSettings',
    'solutionsPage',
    'membershipsPage',
    'consultingPage',
    'contactPage',
    'page'
  ]

  for (const type of docTypes) {
    console.log(`\n📦 ${type.toUpperCase()}`)
    console.log('-'.repeat(60))

    const docs = await client.fetch(`*[_type == $type]`, { type })

    if (docs.length === 0) {
      console.log('  (no documents found)')
    } else {
      docs.forEach((doc: Record<string, unknown>) => {
        console.log(`\n  📄 ID: ${doc._id}`)
        console.log(`     Language: ${doc.language || 'N/A'}`)

        // Show key fields based on type
        if (type === 'siteSettings') {
          console.log(`     siteName:`, JSON.stringify(doc.siteName))
          console.log(`     navItems count:`, (doc.navItems as unknown[])?.length || 0)
          console.log(`     footerColumns count:`, (doc.footerColumns as unknown[])?.length || 0)
          console.log(`     footerDescription:`, (doc.footerDescription as string)?.substring(0, 50) + '...')
        }

        if (type === 'brandSettings') {
          console.log(`     siteName:`, doc.siteName)
          console.log(`     contactEmail:`, doc.contactEmail)
          console.log(`     socialLinks count:`, (doc.socialLinks as unknown[])?.length || 0)
        }

        if (type === 'uiStrings') {
          console.log(`     notFoundBadge:`, JSON.stringify(doc.notFoundBadge))
        }

        if (type === 'page') {
          console.log(`     title:`, doc.title)
          console.log(`     slug:`, (doc.slug as { current: string })?.current)
          console.log(`     isHomepage:`, doc.isHomepage)
        }
      })
    }
  }

  console.log('\n\n' + '='.repeat(80))
  console.log('📊 SUMMARY')
  console.log('='.repeat(80))

  for (const type of docTypes) {
    const count = await client.fetch(`count(*[_type == $type])`, { type })
    console.log(`  ${type}: ${count} document(s)`)
  }
}

fetchAllDocuments().catch(console.error)
