import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'rm9kkope',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function testQuery() {
  console.log('🧪 Testing SITE_SETTINGS_QUERY...\n')

  const locale = 'it'

  const result = await client.fetch(`
    *[_type == "siteSettings" && (language == $locale || !defined(language))][0] {
      "siteName": siteName[_key == $locale][0].value,
      "logoText": logoText[_key == $locale][0].value,
      navItems[] {
        text,
        href,
        hasDropdown,
        dropdownItems[] { text, description, href }
      },
      navCTA { text, href, variant, showArrow },
      footerDescription,
      footerColumns[] {
        title,
        links[] { text, href, isExternal }
      },
      copyrightText,
      disclaimer,
      seoTitle,
      seoDescription,
      "brand": *[_type == "brandSettings"][0] {
        siteName,
        logo { ..., asset-> },
        favicon { ..., asset-> },
        socialLinks[] { platform, url, iconName },
        contactEmail
      },
      "logo": *[_type == "brandSettings"][0].logo { ..., asset-> },
      "socialLinks": *[_type == "brandSettings"][0].socialLinks[] { platform, url, iconName },
      "contactEmail": *[_type == "brandSettings"][0].contactEmail
    }
  `, { locale })

  console.log('📊 Key fields:')
  console.log('  siteName:', result?.siteName)
  console.log('  logoText:', result?.logoText)
  console.log('  navItems count:', result?.navItems?.length)
  if (result?.navItems) {
    result.navItems.forEach((item: { text: string; href: string }) => {
      console.log(`    - ${item.text}: ${item.href}`)
    })
  }
  console.log('  footerDescription:', result?.footerDescription?.substring(0, 60) + '...')
  console.log('  footerColumns count:', result?.footerColumns?.length)
  console.log('  copyrightText:', result?.copyrightText)
  console.log('  socialLinks count:', result?.socialLinks?.length)
  console.log('  contactEmail:', result?.contactEmail)
}

testQuery().catch(console.error)
