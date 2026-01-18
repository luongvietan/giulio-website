# Sanity CMS Guide - Gamma Capital

Comprehensive guide for managing content through the Sanity CMS integration.

---

## 📋 Table of Contents

1. [Getting Started](#1-getting-started)
2. [Content Architecture](#2-content-architecture)
3. [Site Settings](#3-site-settings)
4. [Page Builder](#4-page-builder)
5. [Singleton Pages](#5-singleton-pages)
6. [UI Strings](#6-ui-strings)
7. [Preview & Publishing](#7-preview--publishing)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Getting Started

### Accessing Sanity Studio
- **Production**: `https://your-domain.com/admin`
- **Local Development**: Run `npm run dev` → Access `http://localhost:3000/admin`

### Authentication
1. Click **"Log in"**
2. Choose login method (Google, GitHub, or Email)
3. You'll see the content management interface

---

## 2. Content Architecture

### Schema Overview

| Type | Purpose | Location in Studio |
|------|---------|-------------------|
| **Site Settings** | Global navigation, footer, SEO | Singleton |
| **Pages** | Dynamic pages with page builder | Document list |
| **Contact Page** | Contact form page content | Singleton |
| **Memberships Page** | Membership plans & FAQs | Singleton |
| **Consulting Page** | Consulting services | Singleton |
| **UI Strings** | System messages (404, labels) | Singleton |

### Data Flow

```
Sanity CMS → GROQ Query → Server Component → Client Component → Rendered Page
                              ↓
                        Fallback Data (if CMS empty)
```

---

## 3. Site Settings

Access via **"Site Settings"** (⚙️ icon) in the sidebar.

### Navigation Group

| Field | Description | Required |
|-------|-------------|----------|
| Site Name | Brand name displayed in header | ✓ |
| Logo | Logo image with alt text | |
| Logo Text | Fallback text if no logo (default: "Γ") | |
| Navigation Menu Items | Main nav links (max 8 recommended) | |
| Navigation CTA Button | Primary action button in header | |

### Footer Group

| Field | Description |
|-------|-------------|
| Footer Description | Short brand description |
| Social Media Links | Platform + URL pairs |
| Footer Link Columns | Grouped links (e.g., "Company", "Legal") |
| Contact Email | Support email address |
| Copyright Text | © notice text |
| Disclaimer | Legal disclaimer text |

### SEO Group

| Field | Description | Best Practice |
|-------|-------------|---------------|
| Default SEO Title | Fallback page title | Include brand name |
| Default Meta Description | Fallback description | Keep under 160 chars |
| Default OG Image | Social sharing image | 1200x630px recommended |

---

## 4. Page Builder

### Creating a Page
1. Click **"Pages"** in sidebar
2. Click **"+ Create new"**
3. Fill in: Page Title, Slug, Homepage checkbox
4. Add sections in **"Page Sections"**

### Available Sections

| Section | Use Case | Key Fields |
|---------|----------|------------|
| **Hero Section** | Page header/banner | Title, description, CTAs, bullet points, stats |
| **What We Do** | Services grid | Badge, title, service cards |
| **CTA Section** | Call-to-action block | Title, description, buttons |
| **Three Cards** | Feature highlights | 3 service cards |
| **Rich Text** | Long-form content | Portable text editor |
| **Multi-Asset Section** | Asset class display | Badge, title, asset pills |
| **Why Gamma Section** | Differentiators list | Badge, title, reasons |

### Hero Section Fields

| Field | Description |
|-------|-------------|
| Badge Text | Small label above title |
| Title Line 1 | First line of headline |
| Title Line 2 (Highlighted) | Second line with gradient styling |
| Description | Paragraph text |
| Primary CTA | Main action button |
| Secondary CTA | Secondary action button |
| Bullet Points | Icon + text feature list |
| Supporting Tagline | Italic text below CTAs |
| Feature Cards | Service preview cards |
| Statistics | Number + label pairs |

---

## 5. Singleton Pages

These are single-instance documents for specific pages.

### Contact Page

Access: **"Contact Page"** in sidebar

| Group | Fields |
|-------|--------|
| Hero | Badge, title (supports `{brand}` placeholder), subtitle |
| Intro | Icon, subtitle, description |
| Form | Title, subtitle, submit button text, success/error messages |
| Expectations | List of { icon, title, description } |
| Disclaimer | Text below form |
| SEO | Title, description |

### Memberships Page

Access: **"Memberships Page"** in sidebar

| Group | Fields |
|-------|--------|
| Hero | Badge, title, subtitle, stats |
| Inside | Section title, feature list with icons |
| Benefits | Section title, benefit list with icons |
| Pricing | Plans array with price, features, CTA |
| FAQs | Question/answer pairs |
| CTA | Final call-to-action section |
| SEO | Title, description |

### Consulting Page

Access: **"Consulting Page"** in sidebar

| Field | Description |
|-------|-------------|
| Hero Badge | Small label (e.g., "Advisory Services") |
| Hero Title | Main headline |
| Hero Subtitle | Description paragraph |
| Service Nav Items | Quick navigation cards |
| Service Sections | Detailed service descriptions with features |
| CTA Section | Final call-to-action |

---

## 6. UI Strings

Access: **"UI Strings"** in sidebar

System messages and labels that appear across the site.

### 404 Page Group

| Field | Description |
|-------|-------------|
| 404 Badge Text | Error label (default: "Error 404") |
| 404 Title | Main headline |
| 404 Description | Explanation text |
| Home Button Text | CTA to homepage |
| Contact Button Text | CTA to contact page |
| Quick Links Title | Section label |
| Quick Links | Array of { label, href } |

### General Group

| Field | Description |
|-------|-------------|
| Draft Mode Label | Preview mode indicator |
| Draft Mode Exit Text | Exit button label |

---

## 7. Preview & Publishing

### Draft Mode (Preview)
- **Access**: `/api/draft?slug=PAGE_SLUG&secret=YOUR_SECRET`
- **Indicator**: Blue "Draft Mode" banner at bottom
- **Exit**: Click "Exit" or visit `/api/disable-draft`

### Publishing Workflow
1. **Create/Edit**: All changes save as drafts automatically
2. **Preview**: Use draft mode to see unpublished changes
3. **Publish**: Click green **"Publish"** button (bottom right)
4. **Live**: Website updates within **60 seconds**

### Version History
1. Click **"..."** menu → **"History"**
2. Browse previous versions
3. Click **"Restore"** to revert

---

## 8. Troubleshooting

### Content Not Updating?
- Wait 60 seconds after publishing
- Hard refresh: `Ctrl/Cmd + Shift + R`
- Verify you clicked "Publish" (green button)

### Validation Errors?
| Error | Solution |
|-------|----------|
| SEO Description too long | Keep under 160 characters |
| Invalid URL | Use `/path` (internal) or `https://...` (external) |
| Homepage conflict | Only one page can be homepage |

### Accidentally Deleted Content?
1. Go to document's History
2. Find previous version
3. Click "Restore"
4. Publish restored version

---

## 📞 Support

- **Sanity Documentation**: https://www.sanity.io/docs
- **Project Issues**: Contact development team