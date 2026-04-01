/**
 * Seeds legal page content into Sanity as portable text.
 *
 * Usage:
 *   cd studio
 *   node migrations/seed-legal-pages.mjs
 *
 * Requires SANITY_STUDIO_PROJECT_ID and SANITY_API_TOKEN env vars.
 * Safe to run multiple times — skips pages that already exist.
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

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false });

function key() { return randomUUID().replace(/-/g, '').slice(0, 12); }

/** Creates a portable text block (paragraph) */
function p(text, markDefs = [], children = null) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: markDefs,
    children: children || [{ _type: 'span', _key: key(), text, marks: [] }],
  };
}

/** Creates a heading block */
function h(level, text) {
  return {
    _type: 'block',
    _key: key(),
    style: `h${level}`,
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  };
}

/** Creates a bold + normal span paragraph */
function boldP(boldText, normalText) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: [
      { _type: 'span', _key: key(), text: boldText, marks: ['strong'] },
      { _type: 'span', _key: key(), text: normalText, marks: [] },
    ],
  };
}

const LEGAL_PAGES = [
  {
    _id: 'legalPage-privacy-policy',
    _type: 'legalPage',
    title: 'Privacy Policy',
    slug: { _type: 'slug', current: '/privacy-policy' },
    lastUpdated: '2026-01-01',
    body: [
      h(2, 'Overview'),
      p('Phifer Web Solutions ("we," "us," or "our") operates phiferwebsolutions.com and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.'),
      h(2, 'Information We Collect'),
      boldP('Information you provide directly: ', 'Contact form submissions (name, email, phone, message) and email newsletter sign-ups.'),
      boldP('Information collected automatically: ', 'Browser type and operating system, pages visited and time spent on site, IP address (anonymized where possible), and referring website.'),
      p('We use cookies and similar tracking technologies. See our Cookie Policy for details.'),
      h(2, 'How We Use Your Information'),
      p('We use collected information to respond to your inquiries and service requests, send relevant communications you have opted into, improve our website and services, and comply with legal obligations.'),
      p('We do not sell, trade, or rent your personal information to third parties.'),
      h(2, 'Data Retention'),
      p('We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy or as required by law.'),
      h(2, 'Your Rights'),
      p('You have the right to request access to your personal data, request correction of inaccurate data, request deletion of your data, and opt out of marketing communications at any time.'),
      p('To exercise these rights, contact us at eric@ericphiferllc.com.'),
      h(2, 'Third-Party Services'),
      p('Our website may use third-party services including analytics platforms, social media platforms, and embedded content. These services have their own privacy policies.'),
      h(2, 'Children\'s Privacy'),
      p('Our website is not directed at children under 13. We do not knowingly collect personal information from children under 13.'),
      h(2, 'Changes to This Policy'),
      p('We may update this Privacy Policy periodically. We will notify you of significant changes by posting a notice on our website.'),
      h(2, 'Contact Us'),
      p('If you have questions about this Privacy Policy, contact us at:'),
      boldP('Phifer Web Solutions', ''),
      p('Email: eric@ericphiferllc.com'),
      p('Website: phiferwebsolutions.com'),
    ],
  },
  {
    _id: 'legalPage-terms-and-conditions',
    _type: 'legalPage',
    title: 'Terms & Conditions',
    slug: { _type: 'slug', current: '/terms-and-conditions' },
    lastUpdated: '2026-01-01',
    body: [
      h(2, 'Agreement to Terms'),
      p('By accessing and using the website at phiferwebsolutions.com, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use this site.'),
      h(2, 'Use of This Website'),
      p('You may use this website for lawful purposes only. You agree not to use this site in any way that violates applicable local, state, or federal laws, attempt to gain unauthorized access to any part of the site, transmit harmful, offensive, or disruptive content, or use automated tools to scrape or harvest data from this site.'),
      h(2, 'Intellectual Property'),
      p('All content on this website — including text, images, logos, and design — is the property of Phifer Web Solutions and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use our content without prior written permission.'),
      h(2, 'Disclaimer of Warranties'),
      p('This website is provided "as is" without warranties of any kind, either express or implied. Phifer Web Solutions does not warrant that the site will be error-free, uninterrupted, or free of viruses or other harmful components.'),
      h(2, 'Limitation of Liability'),
      p('To the fullest extent permitted by law, Phifer Web Solutions shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website.'),
      h(2, 'Links to Third-Party Websites'),
      p('This site may contain links to external websites. Phifer Web Solutions is not responsible for the content or privacy practices of those sites.'),
      h(2, 'Changes to These Terms'),
      p('We reserve the right to update these Terms & Conditions at any time. Continued use of the site after changes are posted constitutes your acceptance of the revised terms.'),
      h(2, 'Governing Law'),
      p('These Terms are governed by the laws of the state in which Phifer Web Solutions operates, without regard to conflict of law provisions.'),
      h(2, 'Contact Us'),
      p('For questions about these Terms, contact us at:'),
      boldP('Phifer Web Solutions', ''),
      p('Email: eric@ericphiferllc.com'),
      p('Website: phiferwebsolutions.com'),
    ],
  },
  {
    _id: 'legalPage-accessibility',
    _type: 'legalPage',
    title: 'Accessibility Statement',
    slug: { _type: 'slug', current: '/accessibility' },
    lastUpdated: '2026-01-01',
    body: [
      h(2, 'Our Commitment'),
      p('Phifer Web Solutions is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards.'),
      h(2, 'Standards We Aim to Meet'),
      p('We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines explain how to make web content more accessible to people with disabilities.'),
      h(2, 'Measures We Take'),
      p('We take the following measures to ensure accessibility: use semantic HTML elements, provide text alternatives for non-text content, ensure keyboard navigability throughout the site, maintain sufficient color contrast, use descriptive link text, and provide visible focus indicators.'),
      h(2, 'Known Limitations'),
      p('While we strive for full accessibility, some content may not yet meet all standards. We are actively working to address these issues.'),
      h(2, 'Feedback'),
      p('We welcome your feedback on the accessibility of phiferwebsolutions.com. If you experience any barriers, please contact us:'),
      p('Email: eric@ericphiferllc.com'),
      p('We aim to respond to accessibility feedback within 2 business days.'),
      h(2, 'Formal Complaints'),
      p('If you are not satisfied with our response, you may contact the relevant accessibility enforcement body in your jurisdiction.'),
    ],
  },
];

async function seed() {
  console.log(`Seeding legal pages in ${dataset}...`);

  for (const doc of LEGAL_PAGES) {
    const existing = await client.fetch(`*[_type == "legalPage" && slug.current == "${doc.slug.current}"][0]{ _id, "hasBody": defined(body) }`);
    if (existing?.hasBody) {
      console.log(`  ✓ ${doc.slug.current} — already has content, skipping`);
      continue;
    }

    // Use existing _id if document exists but has no body
    if (existing) {
      doc._id = existing._id;
    }

    await client.createOrReplace(doc);
    console.log(`  ✓ ${doc.slug.current} — ${existing ? 'updated with content' : 'created'}`);
  }

  console.log('Done!');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
