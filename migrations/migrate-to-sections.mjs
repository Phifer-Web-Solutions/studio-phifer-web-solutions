/**
 * One-time migration: moves flat page fields into the new sections[] array.
 *
 * Usage:
 *   cd studio
 *   node migrations/migrate-to-sections.mjs
 *
 * Set SANITY_STUDIO_PROJECT_ID and SANITY_STUDIO_DATASET in .env or as env vars.
 * Add SANITY_API_TOKEN with write access.
 *
 * This script is safe to run multiple times — it skips pages that already have sections.
 */

import 'dotenv/config';
import { createClient } from '@sanity/client';
import { randomUUID } from 'crypto';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error('Missing SANITY_STUDIO_PROJECT_ID or SANITY_API_TOKEN');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

function key() {
  return randomUUID().replace(/-/g, '').slice(0, 12);
}

function buildSections(doc) {
  const sections = [];

  // Hero
  if (doc.heroTitle || doc.heroSubtitle || doc.heroImage) {
    sections.push({
      _type: 'heroSection',
      _key: key(),
      title: doc.heroTitle || undefined,
      subtitle: doc.heroSubtitle || undefined,
      image: doc.heroImage || undefined,
      cta: doc.heroCta || undefined,
    });
  }

  // Split
  if (doc.splitHeading || doc.splitBody || doc.splitImage) {
    sections.push({
      _type: 'splitSection',
      _key: key(),
      eyebrow: doc.splitEyebrow || undefined,
      heading: doc.splitHeading || undefined,
      body: doc.splitBody || undefined,
      ctaLabel: doc.splitCtaLabel || undefined,
      ctaUrl: doc.splitCtaUrl || undefined,
      image: doc.splitImage || undefined,
      imageRight: doc.splitImageRight || undefined,
      bulletPoints: doc.splitFeatures || undefined,
    });
  }

  // Features
  if (doc.features?.length || doc.featuresHeading) {
    sections.push({
      _type: 'featureGrid',
      _key: key(),
      heading: doc.featuresHeading || undefined,
      items: doc.features || undefined,
    });
  }

  // Stats
  if (doc.stats?.length || doc.statsHeading) {
    sections.push({
      _type: 'statsSection',
      _key: key(),
      heading: doc.statsHeading || undefined,
      items: doc.stats || undefined,
    });
  }

  // Process
  if (doc.steps?.length || doc.processHeading) {
    sections.push({
      _type: 'processSteps',
      _key: key(),
      heading: doc.processHeading || undefined,
      subheading: doc.processSubheading || undefined,
      steps: doc.steps || undefined,
    });
  }

  // Testimonials
  if (doc.testimonials?.length || doc.testimonialsHeading) {
    sections.push({
      _type: 'testimonialsSection',
      _key: key(),
      heading: doc.testimonialsHeading || undefined,
      items: doc.testimonials || undefined,
    });
  }

  // Pricing
  if (doc.plans?.length || doc.pricingHeading) {
    sections.push({
      _type: 'pricingSection',
      _key: key(),
      heading: doc.pricingHeading || undefined,
      subheading: doc.pricingSubheading || undefined,
      plans: doc.plans || undefined,
    });
  }

  // Pricing CTA
  if (doc.pricingCtaHeading || doc.pricingCtaBody) {
    sections.push({
      _type: 'pricingCtaSection',
      _key: key(),
      heading: doc.pricingCtaHeading || undefined,
      body: doc.pricingCtaBody || undefined,
      ctaLabel: doc.pricingCtaLabel || undefined,
      ctaUrl: doc.pricingCtaUrl || undefined,
    });
  }

  // FAQ
  if (doc.faqs?.length || doc.faqHeading) {
    sections.push({
      _type: 'faqSection',
      _key: key(),
      heading: doc.faqHeading || undefined,
      subheading: doc.faqSubheading || undefined,
      items: doc.faqs || undefined,
    });
  }

  // Contact
  if (doc.contactEmail || doc.contactPhone || doc.contactHeading || doc.contactPreferenceNotes) {
    sections.push({
      _type: 'contactSection',
      _key: key(),
      heading: doc.contactHeading || undefined,
      subheading: doc.contactSubheading || undefined,
      preferenceNotes: doc.contactPreferenceNotes || doc.contactIntroText || undefined,
      email: doc.contactEmail || undefined,
      phone: doc.contactPhone || undefined,
      showPhone: doc.contactShowPhone,
      responseTime: doc.contactResponseTime || undefined,
      address: doc.contactAddress || undefined,
      hours: doc.contactHours || undefined,
    });
  }

  // Text Content
  if (doc.textHeading || doc.bodyContent) {
    sections.push({
      _type: 'textContent',
      _key: key(),
      heading: doc.textHeading || undefined,
      body: doc.bodyContent || undefined,
    });
  }

  // Portfolio
  if (doc.portfolioHeading || doc.portfolioSubheading) {
    sections.push({
      _type: 'portfolioSection',
      _key: key(),
      heading: doc.portfolioHeading || undefined,
      subheading: doc.portfolioSubheading || undefined,
    });
  }

  return sections;
}

async function migrate() {
  console.log(`Migrating pages in ${dataset}...`);

  const pages = await client.fetch('*[_type == "page"]');
  console.log(`Found ${pages.length} page(s)`);

  for (const doc of pages) {
    const slug = doc.slug?.current || '(no slug)';

    // Skip if already migrated
    if (doc.sections?.length) {
      console.log(`  ✓ ${slug} — already has ${doc.sections.length} sections, skipping`);
      continue;
    }

    const sections = buildSections(doc);

    if (sections.length === 0) {
      console.log(`  - ${slug} — no legacy fields to migrate`);
      continue;
    }

    // Respect enabledSections order if it exists
    if (doc.enabledSections?.length) {
      const typeMap = {
        hero: 'heroSection',
        features: 'featureGrid',
        stats: 'statsSection',
        process: 'processSteps',
        testimonials: 'testimonialsSection',
        pricing: 'pricingSection',
        pricingCta: 'pricingCtaSection',
        faq: 'faqSection',
        split: 'splitSection',
        contact: 'contactSection',
        text: 'textContent',
        portfolio: 'portfolioSection',
      };

      const ordered = [];
      for (const key of doc.enabledSections) {
        const sType = typeMap[key];
        const found = sections.find((s) => s._type === sType);
        if (found) ordered.push(found);
      }
      // Add any sections not in enabledSections at the end
      for (const s of sections) {
        if (!ordered.includes(s)) ordered.push(s);
      }
      sections.length = 0;
      sections.push(...ordered);
    }

    await client
      .patch(doc._id)
      .set({ sections })
      .commit();

    console.log(`  ✓ ${slug} — migrated ${sections.length} section(s)`);
  }

  console.log('Done!');
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
