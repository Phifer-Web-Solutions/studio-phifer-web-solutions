// Seed script — pre-populate Sanity with initial content
// Run: npx sanity exec seed.ts --with-user-token
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const documents: any[] = [
  {
    "_type": "siteSettings",
    "_id": "siteSettings",
    "siteName": "Phifer Web Solutions",
    "ctaLabel": "Get Started",
    "ctaUrl": "/contact",
    "contactEmail": "eric@ericphiferllc.com",
    "contactPhone": "",
    "contactAddress": "",
    "copyrightText": "© 2026 Phifer Web Solutions. All rights reserved."
  },
  {
    "_type": "page",
    "_id": "page-home",
    "title": "Home",
    "slug": {
      "_type": "slug",
      "current": "/"
    },
    "heroTitle": "Phifer Web Solutions",
    "heroSubtitle": "",
    "heroCta": {
      "label": "Get Started",
      "url": "/contact"
    },
    "ctaHeadline": "Ready to Get Started?",
    "ctaText": "Let us help you achieve your goals.",
    "ctaButtonLabel": "Get Started",
    "ctaButtonUrl": "/contact",
    "contactEmail": "eric@ericphiferllc.com"
  },
  {
    "_type": "page",
    "_id": "page-about",
    "title": "About",
    "slug": {
      "_type": "slug",
      "current": "/about"
    },
    "ctaHeadline": "Ready to Get Started?",
    "ctaText": "Let us help you achieve your goals.",
    "ctaButtonLabel": "Get Started",
    "ctaButtonUrl": "/contact",
    "contactEmail": "eric@ericphiferllc.com"
  },
  {
    "_type": "page",
    "_id": "page-contact",
    "title": "Contact",
    "slug": {
      "_type": "slug",
      "current": "/contact"
    },
    "ctaHeadline": "Ready to Get Started?",
    "ctaText": "Let us help you achieve your goals.",
    "ctaButtonLabel": "Get Started",
    "ctaButtonUrl": "/contact",
    "contactEmail": "eric@ericphiferllc.com"
  },
  {
    "_type": "page",
    "_id": "page-services",
    "title": "Services",
    "slug": {
      "_type": "slug",
      "current": "/services"
    },
    "ctaHeadline": "Ready to Get Started?",
    "ctaText": "Let us help you achieve your goals.",
    "ctaButtonLabel": "Get Started",
    "ctaButtonUrl": "/contact",
    "contactEmail": "eric@ericphiferllc.com"
  },
  {
    "_type": "page",
    "_id": "page-portfolio",
    "title": "Portfolio",
    "slug": {
      "_type": "slug",
      "current": "/portfolio"
    },
    "ctaHeadline": "Ready to Get Started?",
    "ctaText": "Let us help you achieve your goals.",
    "ctaButtonLabel": "Get Started",
    "ctaButtonUrl": "/contact",
    "contactEmail": "eric@ericphiferllc.com"
  },
  {
    "_type": "page",
    "_id": "page-process",
    "title": "Process",
    "slug": {
      "_type": "slug",
      "current": "/process"
    },
    "ctaHeadline": "Ready to Get Started?",
    "ctaText": "Let us help you achieve your goals.",
    "ctaButtonLabel": "Get Started",
    "ctaButtonUrl": "/contact",
    "contactEmail": "eric@ericphiferllc.com"
  },
  {
    "_type": "page",
    "_id": "page-support",
    "title": "Support",
    "slug": {
      "_type": "slug",
      "current": "/support"
    },
    "ctaHeadline": "Ready to Get Started?",
    "ctaText": "Let us help you achieve your goals.",
    "ctaButtonLabel": "Get Started",
    "ctaButtonUrl": "/contact",
    "contactEmail": "eric@ericphiferllc.com"
  },
  {
    "_type": "legalPage",
    "_id": "legal-privacy-policy",
    "title": "Privacy Policy",
    "slug": {
      "_type": "slug",
      "current": "/privacy-policy"
    }
  },
  {
    "_type": "legalPage",
    "_id": "legal-terms-and-conditions",
    "title": "Terms & Conditions",
    "slug": {
      "_type": "slug",
      "current": "/terms-and-conditions"
    }
  },
  {
    "_type": "legalPage",
    "_id": "legal-accessibility",
    "title": "Accessibility Statement",
    "slug": {
      "_type": "slug",
      "current": "/accessibility"
    }
  },
  {
    "_type": "navigation",
    "_id": "nav-main",
    "navType": "main",
    "items": [
      { "_key": "home", "label": "Home", "url": "/" },
      { "_key": "about", "label": "About", "url": "/about" },
      { "_key": "services", "label": "Services", "url": "/services" },
      { "_key": "portfolio", "label": "Portfolio", "url": "/portfolio" },
      { "_key": "process", "label": "Process", "url": "/process" },
      { "_key": "contact", "label": "Contact", "url": "/contact" }
    ]
  },
  {
    "_type": "navigation",
    "_id": "nav-footer",
    "navType": "footer",
    "items": [
      { "_key": "support", "label": "Support", "url": "/support" }
    ]
  },
  {
    "_type": "navigation",
    "_id": "nav-legal",
    "navType": "legal",
    "items": [
      { "_key": "privacy-policy", "label": "Privacy Policy", "url": "/privacy-policy" },
      { "_key": "terms-and-conditions", "label": "Terms & Conditions", "url": "/terms-and-conditions" },
      { "_key": "accessibility", "label": "Accessibility Statement", "url": "/accessibility" }
    ]
  }
]

async function seed() {
  console.log(`Seeding ${documents.length} document(s)...`)
  const transaction = client.transaction()
  for (const doc of documents) {
    transaction.createIfNotExists(doc)
  }
  await transaction.commit()
  console.log('Seed complete!')
}

seed().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
