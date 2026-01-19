# Content Management Guide

Welcome to the Gamma Capital content management system. This guide will help you manage all content on your website without any coding knowledge.

---

## Quick Start (5 minutes)

### Step 1: Access the Admin Panel

1. Open your browser and go to: `https://gammacap.ch/admin`
2. Click **"Log in"**
3. Choose your login method (Google, GitHub, or Email)
4. You're in! You'll see the content management dashboard

### Step 2: Make Your First Edit

1. Click **"Site Settings"** in the left sidebar
2. Find any text field you want to change
3. Edit the text
4. Click the green **"Publish"** button (bottom right corner)
5. Wait about 60 seconds - your changes are now live!

---

## Understanding the Dashboard

When you log in, you'll see a left sidebar with all your content sections:

| Menu Item | What It Controls |
|-----------|------------------|
| **Site Settings** | Logo, navigation menu, footer, SEO settings |
| **Solutions Page** | The main solutions/services overview page |
| **Network Page** | Network services page content |
| **Real Estate Page** | Real estate services page content |
| **Strategy Page** | Strategy insights page content |
| **Memberships Page** | Membership plans, pricing, FAQs |
| **Consulting Page** | Consulting services and features |
| **Contact Page** | Contact form and related content |
| **UI Strings** | Error messages, 404 page text |
| **Pages** | Custom pages you can create |

---

## Editing Each Section

### 1. Site Settings

**What it controls:** Everything that appears on every page (header, footer, branding)

Click **"Site Settings"** and you'll see 4 tabs:

#### Navigation Tab
| Field | What It Does |
|-------|--------------|
| Site Name | Your company name (appears in browser tab) |
| Logo | Upload your logo image |
| Logo Text | Fallback text if no logo (default: "Γ") |
| Navigation Menu Items | Links in your top menu |
| Navigation CTA Button | The main button in your header (e.g., "Join Now") |

**To add a menu item:**
1. Scroll to "Navigation Menu Items"
2. Click **"Add item"**
3. Fill in the text and URL (e.g., `/contact` for internal pages, `https://...` for external)
4. For dropdown menus: check "Has Dropdown" and add sub-items

#### Mobile Menu Tab
| Field | What It Does |
|-------|--------------|
| Mobile Secondary Links | Extra links shown on mobile menu |
| Mobile Footer Text | Text at bottom of mobile menu |

#### Footer Tab
| Field | What It Does |
|-------|--------------|
| Footer Description | Short text about your company |
| Social Media Links | Your social media profiles |
| Footer Link Columns | Organized link groups (e.g., "Company", "Legal") |
| Contact Email | Your support email |
| Copyright Text | The © notice at the bottom |
| Disclaimer | Legal disclaimer text |

**To add social media links:**
1. Click **"Add item"** under Social Media Links
2. Select the platform (Twitter, LinkedIn, etc.)
3. Paste your profile URL
4. Publish changes

#### SEO & Meta Tab
| Field | What It Does | Tip |
|-------|--------------|-----|
| Default SEO Title | Title shown in Google searches | Include your brand name |
| Default Meta Description | Description in Google results | Keep under 160 characters |
| Default OG Image | Image when shared on social media | Use 1200x630 pixels |

---

### 2. Solutions Page

**What it controls:** The main page showcasing your solutions/services

Click **"Solutions Page"** to edit:

| Section | Fields |
|---------|--------|
| **Hero** | Badge text, main title, description |
| **Cards** | Service cards with icons, titles, descriptions |
| **CTA** | Call-to-action section at the bottom |

---

### 3. Service Pages (Network, Real Estate, Strategy)

Each service page has the same structure:

| Section | What to Edit |
|---------|--------------|
| **Hero Section** | Page title, subtitle, background description |
| **Why Choose Us** | Benefits and differentiators |
| **Features** | List of features with icons |
| **CTA Section** | Final call-to-action |
| **SEO** | Page-specific SEO settings |

---

### 4. Memberships Page

**What it controls:** Your membership plans and pricing

| Section | What to Edit |
|---------|--------------|
| **Hero** | Badge, title, subtitle, description |
| **Inside Features** | What's included in membership |
| **Benefits** | Key benefits with icons |
| **Pricing Plans** | Plan names, prices, features, buttons |
| **FAQs** | Frequently asked questions |
| **Final CTA** | Bottom call-to-action |

**To edit pricing:**
1. Find the "Plans" section
2. Click on a plan to expand it
3. Edit name, price, description
4. Toggle "Popular" to highlight a plan
5. Add or remove features in the list

---

### 5. Consulting Page

**What it controls:** Your consulting services page

| Section | What to Edit |
|---------|--------------|
| **Hero** | Main headline and description |
| **Service Navigation** | Quick nav cards at the top |
| **Service Sections** | Detailed descriptions of each service |
| **CTA** | Final call-to-action |

---

### 6. Contact Page

**What it controls:** Your contact form page

| Section | What to Edit |
|---------|--------------|
| **Hero** | Page title and description |
| **Intro** | Heading, description, email |
| **Form** | Title, labels, success/error messages |
| **Expectations** | What visitors can expect after contact |
| **Disclaimer** | Legal text below form |

---

### 7. UI Strings

**What it controls:** System messages and labels

| Field | What It Controls |
|-------|-----------------|
| 404 Badge Text | Error label on not-found page |
| 404 Title | Main headline when page not found |
| 404 Description | Explanation text |
| Home Button Text | Button to go home |
| Contact Button Text | Button to contact page |
| Quick Links | Helpful links on 404 page |

---

### 8. Custom Pages

**What it controls:** Additional pages you create

**To create a new page:**
1. Click **"Pages"** in the sidebar
2. Click **"+ Create new"** at the top
3. Fill in:
   - **Page Title**: Name of your page
   - **Slug**: URL path (e.g., "about-us" creates `/about-us`)
   - **Is Homepage**: Check if this should be your homepage
4. Add sections using **"Page Sections"**

**Available Sections:**
| Section Type | Best For |
|--------------|----------|
| Hero Section | Page banners with CTAs and stats |
| What We Do | Services grid layout |
| CTA Section | Call-to-action blocks |
| Three Cards | Feature highlights |
| Rich Text | Long-form content |
| Multi-Asset Section | Asset class displays |
| Why Gamma Section | Bullet point lists |

---

## Working with Images

### Uploading Images

1. Click the image field
2. Click **"Upload"** or drag & drop your image
3. Add **Alt Text** (description for accessibility)
4. Click **"Save"**

### Image Recommendations

| Image Type | Recommended Size |
|------------|------------------|
| Logo | 200x50 pixels (PNG with transparency) |
| OG/Social Image | 1200x630 pixels |
| Hero Background | 1920x1080 pixels |
| Icons | Use the built-in icon picker |

---

## Publishing Your Changes

### The Publishing Process

1. **Edit** - Make your changes (auto-saved as draft)
2. **Preview** - See changes before going live
3. **Publish** - Click the green button to make it live
4. **Wait** - Changes appear on website within 60 seconds

### The Publish Button

- **Blue dot** next to a field = unsaved changes
- **Green "Publish" button** = ready to publish
- **Gray "Published" text** = no pending changes

### Version History

Made a mistake? You can restore previous versions:

1. Click the **"..."** menu (top right)
2. Select **"History"**
3. Browse previous versions
4. Click **"Restore"** on the version you want

---

## Working with Links

### Internal Links (pages on your site)
Use relative paths starting with `/`:
- `/contact` - Contact page
- `/memberships` - Memberships page
- `/consulting` - Consulting page
- `/solutions` - Solutions page

### External Links (other websites)
Use full URLs starting with `https://`:
- `https://twitter.com/yourhandle`
- `https://linkedin.com/company/yourcompany`

---

## Icons Reference

When editing service cards or features, you can choose from these icons:

| Icon Name | Description |
|-----------|-------------|
| BarChart3 | Chart/analytics |
| TrendingUp | Growth arrow |
| Users | People/team |
| Building2 | Building/corporate |
| Shield | Security/protection |
| Target | Goal/precision |
| Rocket | Launch/fast |
| Network | Connections |
| Layers | Multi-level |
| Globe | International |

---

## Common Tasks

### Change Your Logo

1. Go to **Site Settings** > **Navigation** tab
2. Click on the Logo field
3. Upload your new logo
4. Add alt text (e.g., "Gamma Capital Logo")
5. Publish

### Update Footer Links

1. Go to **Site Settings** > **Footer** tab
2. Find **Footer Link Columns**
3. Click on a column to expand
4. Add, edit, or remove links
5. Publish

### Add a New Membership Plan

1. Go to **Memberships Page**
2. Find the **Plans** section
3. Click **"Add item"**
4. Fill in all plan details
5. Publish

### Update SEO for a Page

1. Go to the page you want to update
2. Find the **SEO** section (usually at the bottom)
3. Update title and description
4. Upload an OG image if needed
5. Publish

---

## Troubleshooting

### My changes aren't showing on the website

1. Did you click **"Publish"**? (green button)
2. Wait 60 seconds after publishing
3. Hard refresh your browser: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
4. Try opening in an incognito/private window

### I'm getting validation errors

| Error | How to Fix |
|-------|-----------|
| "SEO Description too long" | Keep under 160 characters |
| "Invalid URL" | Use `/path` for internal or `https://...` for external |
| "Only one homepage allowed" | Uncheck "Is Homepage" on other pages first |

### I accidentally deleted something

1. Click **"..."** menu > **"History"**
2. Find the version before your deletion
3. Click **"Restore"**
4. Publish the restored version

### I can't log in

1. Make sure you're using the correct email
2. Try a different login method (Google, GitHub)
3. Clear your browser cookies
4. Contact your administrator

---

## Best Practices

1. **Always add alt text to images** - Helps with SEO and accessibility
2. **Keep descriptions concise** - Under 160 characters for SEO fields
3. **Use consistent formatting** - Maintain the same style across pages
4. **Test on mobile** - Check how your changes look on phones
5. **Publish during low-traffic hours** - If making major changes
6. **Review before publishing** - Double-check spelling and links

---

## Need Help?

- **Sanity Documentation**: https://www.sanity.io/docs
- **Video Tutorials**: Available in Sanity Studio (Help menu)
- **Technical Issues**: Contact your development team

---

*Last updated: January 2026*
