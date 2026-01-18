# Gamma Capital - Website

A Next.js 15 website with Sanity CMS integration for Gamma Capital, delivering institutional-grade market intelligence and strategic advisory services.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **CMS**: [Sanity v3](https://www.sanity.io/) (embedded studio at `/admin`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [GSAP](https://gsap.com/) + [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Geist Sans & Mono

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/              # Sanity Studio (embedded)
│   │   ├── contact/            # Contact page
│   │   ├── consulting/         # Consulting services page
│   │   ├── memberships/        # Membership plans page
│   │   └── solutions/          # Solutions pages
│   ├── components/
│   │   └── sections/           # Reusable page sections
│   ├── sanity/
│   │   └── lib/                # Sanity client & queries
│   └── types/
│       └── sanity.ts           # TypeScript interfaces
├── sanity/
│   └── schemaTypes/            # Sanity schema definitions
│       ├── documents/          # Document schemas
│       ├── sections/           # Section schemas
│       └── objects/            # Reusable object schemas
└── CMS-GUIDE.md                # Content editor documentation
```

## 🏗️ CMS Architecture

### Singleton Documents (Single Instance)
| Document | Purpose |
|----------|---------|
| `siteSettings` | Navigation, footer, global SEO |
| `contactPage` | Contact page content |
| `membershipsPage` | Membership plans & FAQs |
| `consultingPage` | Consulting services |
| `uiStrings` | System messages (404, labels) |

### Page Builder Sections
| Section | Description |
|---------|-------------|
| `heroSection` | Hero banner with CTAs, stats, bullet points |
| `whatWeDoSection` | Services grid |
| `testimonialCTASection` | Call-to-action block |
| `threeCardsSection` | Feature cards |
| `richTextSection` | Long-form content |
| `multiAssetSection` | Asset class display |
| `whyGammaSection` | Differentiators list |

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone repository
git clone <repository-url>
cd orchids-atquo-website

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Sanity project credentials
```

### Development
```bash
npm run dev
```
- **Website**: http://localhost:3000
- **Sanity Studio**: http://localhost:3000/admin

### Build
```bash
npm run build
npm start
```

## 🔑 Environment Variables

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your-read-token

# Preview
SANITY_PREVIEW_SECRET=your-secret

# Stripe (if using payments)
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
```

## 📝 Content Management

See [CMS-GUIDE.md](./CMS-GUIDE.md) for detailed content editor documentation.

### Quick Start for Editors
1. Navigate to `/admin`
2. Log in with Google/GitHub/Email
3. Edit content in the Sanity Studio interface
4. Click "Publish" to make changes live

### Content Update Flow
```
Edit in Studio → Auto-save as Draft → Publish → Live in ~60s
```

## 🔄 Data Fetching Pattern

All pages use server-side data fetching with fallbacks:

```typescript
// Server Component
const data = await sanityFetch<PageType>({ query: PAGE_QUERY });
return <ClientComponent pageData={data} />;

// Client Component  
const content = pageData?.field ?? defaultValue;
```

## 📐 Icon Mapping

Section components use dynamic icon mapping for CMS-driven icons:

```typescript
const iconMap: Record<string, LucideIcon> = {
  TrendingUp, Activity, Shield, // ...
};
const IconComponent = iconMap[item.icon ?? ''] ?? DefaultIcon;
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Set environment variables
3. Deploy

### Manual
```bash
npm run build
npm start
```

## 📚 Documentation

- [CMS-GUIDE.md](./CMS-GUIDE.md) - Content editor guide
- [Sanity Docs](https://www.sanity.io/docs) - CMS documentation
- [Next.js Docs](https://nextjs.org/docs) - Framework documentation

## 📄 License

Private - All rights reserved.
