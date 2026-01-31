import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'rm9kkope',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_WRITE_TOKEN,
})

async function cleanupDuplicates() {
    console.log('🧹 Cleaning up duplicate/old documents...\n')

    // Find all siteSettings documents with random UUIDs (not our seeded ones)
    const oldDocs = await client.fetch(`*[_type == "siteSettings" && !(_id in ["siteSettings-en", "siteSettings-it"])] { _id }`)

    console.log(`Found ${oldDocs.length} old siteSettings documents to delete:`)
    oldDocs.forEach((doc: { _id: string }) => console.log(`  - ${doc._id}`))

    if (oldDocs.length > 0) {
        const transaction = client.transaction()
        oldDocs.forEach((doc: { _id: string }) => transaction.delete(doc._id))
        await transaction.commit()
        console.log('✅ Deleted old siteSettings documents')
    }

    // Clean up other old page documents too
    const docTypes = ['solutionsPage', 'membershipsPage', 'consultingPage', 'contactPage']

    for (const type of docTypes) {
        const oldPageDocs = await client.fetch(
            `*[_type == $type && !(_id in [$enId, $itId])] { _id }`,
            { type, enId: `${type}-en`, itId: `${type}-it` }
        )

        if (oldPageDocs.length > 0) {
            console.log(`\nFound ${oldPageDocs.length} old ${type} documents:`)
            oldPageDocs.forEach((doc: { _id: string }) => console.log(`  - ${doc._id}`))

            const tx = client.transaction()
            oldPageDocs.forEach((doc: { _id: string }) => tx.delete(doc._id))
            await tx.commit()
            console.log(`✅ Deleted old ${type} documents`)
        }
    }

    console.log('\n🎉 Cleanup complete!')
}

cleanupDuplicates().catch(console.error)
