import { defineType, defineField } from 'sanity';
import { HiDocumentText } from 'react-icons/hi2';

export default defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  icon: HiDocumentText,
  groups: [
    { name: 'page', title: 'Page Info', default: true },
    { name: 'hero', title: 'Hero Section' },
    { name: 'features', title: 'Features' },
    { name: 'stats', title: 'Stats' },
    { name: 'process', title: 'Process' },
    { name: 'testimonials', title: 'Testimonials' },
    { name: 'pricing', title: 'Pricing' },
    { name: 'faq', title: 'FAQ' },
    { name: 'split', title: 'Split Section' },
    { name: 'contact', title: 'Contact' },
    { name: 'text', title: 'Text Content' },
    { name: 'portfolio', title: 'Portfolio' },
  ],
  fields: [
    // ─── Page Info ─────────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      description: 'The page URL path (e.g. /about, /services)',
      type: 'slug',
      group: 'page',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    // ─── Hero Section ──────────────────────────────────────────────────────────
    // The full-width banner at the top of the page with headline, subtitle, background image, and CTA button.
    defineField({
      name: 'heroTitle',
      title: 'Headline',
      description: 'The large text visitors see first',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Subtitle',
      description: 'Supporting text below the headline — a tagline or brief description',
      type: 'text',
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Background Image',
      description: 'Full-width image behind the hero content (optional — gradient is used if empty)',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroCta',
      title: 'Call-to-Action Button',
      description: 'The main action button in the hero',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'label', title: 'Button Text', type: 'string' }),
        defineField({ name: 'url', title: 'Button Link', description: 'Internal path (/contact) or external URL (https://...)', type: 'string' }),
      ],
    }),

    // ─── Features ──────────────────────────────────────────────────────────────
    // Grid of feature cards highlighting key benefits or capabilities.
    defineField({
      name: 'features',
      title: 'Feature Cards',
      description: 'Each card has an icon, title, and short description',
      type: 'array',
      group: 'features',
      of: [
        {
          type: 'object',
          name: 'featureItem',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'icon', title: 'Icon', description: 'Emoji or icon name', type: 'string' }),
          ],
          preview: {
            select: { title: 'title', icon: 'icon' },
            prepare({ title, icon }) {
              return { title: title || 'Untitled', subtitle: icon || '' };
            },
          },
        },
      ],
    }),

    // ─── Stats ─────────────────────────────────────────────────────────────────
    // Key numbers that build credibility — years in business, clients served, etc.
    defineField({
      name: 'statsHeading',
      title: 'Section Heading',
      description: 'Optional heading above the stats (leave empty to hide)',
      type: 'string',
      group: 'stats',
    }),
    defineField({
      name: 'stats',
      title: 'Key Metrics',
      description: 'Each stat has a number, label, and optional prefix/suffix (e.g. "$" prefix, "+" suffix)',
      type: 'array',
      group: 'stats',
      of: [
        {
          type: 'object',
          name: 'statItem',
          fields: [
            defineField({ name: 'value', title: 'Number', type: 'string' }),
            defineField({ name: 'label', title: 'Label', description: 'e.g. "Years in Business"', type: 'string' }),
            defineField({ name: 'prefix', title: 'Prefix', description: 'e.g. "$"', type: 'string' }),
            defineField({ name: 'suffix', title: 'Suffix', description: 'e.g. "+" or "%"', type: 'string' }),
          ],
          preview: {
            select: { value: 'value', label: 'label', prefix: 'prefix', suffix: 'suffix' },
            prepare({ value, label, prefix, suffix }) {
              return { title: `${prefix || ''}${value || '?'}${suffix || ''}`, subtitle: label || '' };
            },
          },
        },
      ],
    }),

    // ─── Process ───────────────────────────────────────────────────────────────
    // Step-by-step breakdown of how you work — builds trust and sets expectations.
    defineField({
      name: 'processHeading',
      title: 'Section Heading',
      description: 'e.g. "How It Works"',
      type: 'string',
      group: 'process',
    }),
    defineField({
      name: 'processSubheading',
      title: 'Section Subheading',
      description: 'Brief supporting text below the heading',
      type: 'string',
      group: 'process',
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      description: 'Ordered steps in your process — each with an icon, title, and description',
      type: 'array',
      group: 'process',
      of: [
        {
          type: 'object',
          name: 'processStep',
          fields: [
            defineField({ name: 'title', title: 'Step Title', type: 'string' }),
            defineField({ name: 'description', title: 'Step Description', type: 'text' }),
            defineField({ name: 'icon', title: 'Icon', description: 'Emoji or icon name', type: 'string' }),
          ],
          preview: {
            select: { title: 'title', icon: 'icon' },
            prepare({ title, icon }) {
              return { title: title || 'Untitled Step', subtitle: icon || '' };
            },
          },
        },
      ],
    }),

    // ─── Testimonials ──────────────────────────────────────────────────────────
    // Social proof — quotes from happy clients that build trust with new visitors.
    defineField({
      name: 'testimonialsHeading',
      title: 'Section Heading',
      description: 'e.g. "What Our Clients Say"',
      type: 'string',
      group: 'testimonials',
    }),
    defineField({
      name: 'testimonials',
      title: 'Client Testimonials',
      description: 'Each testimonial has a quote, author name, their role, and a star rating',
      type: 'array',
      group: 'testimonials',
      of: [
        {
          type: 'object',
          name: 'testimonialItem',
          fields: [
            defineField({ name: 'quote', title: 'Quote', type: 'text' }),
            defineField({ name: 'author', title: 'Author Name', type: 'string' }),
            defineField({ name: 'role', title: 'Role / Company', type: 'string' }),
            defineField({ name: 'rating', title: 'Star Rating', description: '1–5', type: 'number', validation: (Rule) => Rule.min(1).max(5) }),
          ],
          preview: {
            select: { quote: 'quote', author: 'author' },
            prepare({ quote, author }) {
              return { title: author || 'Anonymous', subtitle: quote ? `"${quote.slice(0, 60)}..."` : '' };
            },
          },
        },
      ],
    }),

    // ─── Pricing ───────────────────────────────────────────────────────────────
    // Pricing tiers that make it easy for visitors to compare options and take action.
    defineField({
      name: 'pricingHeading',
      title: 'Section Heading',
      description: 'e.g. "Simple, Transparent Pricing"',
      type: 'string',
      group: 'pricing',
    }),
    defineField({
      name: 'pricingSubheading',
      title: 'Section Subheading',
      type: 'string',
      group: 'pricing',
    }),
    defineField({
      name: 'plans',
      title: 'Pricing Plans',
      description: 'Each plan has a name, price, feature list, and CTA button',
      type: 'array',
      group: 'pricing',
      of: [
        {
          type: 'object',
          name: 'pricingPlan',
          fields: [
            defineField({ name: 'name', title: 'Plan Name', type: 'string' }),
            defineField({ name: 'price', title: 'Price', description: 'e.g. "$999" or "Custom"', type: 'string' }),
            defineField({ name: 'period', title: 'Period', description: 'e.g. "one-time" or "/month"', type: 'string' }),
            defineField({ name: 'description', title: 'Short Description', type: 'string' }),
            defineField({ name: 'features', title: 'Included Features', type: 'array', of: [{ type: 'string' }] }),
            defineField({ name: 'highlighted', title: 'Highlight This Plan', description: 'Makes this plan visually prominent', type: 'boolean' }),
            defineField({ name: 'ctaLabel', title: 'Button Text', type: 'string' }),
            defineField({ name: 'ctaUrl', title: 'Button Link', type: 'string' }),
          ],
          preview: {
            select: { name: 'name', price: 'price', highlighted: 'highlighted' },
            prepare({ name, price, highlighted }) {
              return { title: `${highlighted ? '⭐ ' : ''}${name || 'Untitled'}`, subtitle: price || '' };
            },
          },
        },
      ],
    }),

    // ─── FAQ ───────────────────────────────────────────────────────────────────
    // Frequently asked questions — reduces support inquiries and builds confidence.
    defineField({
      name: 'faqHeading',
      title: 'Section Heading',
      description: 'e.g. "Frequently Asked Questions"',
      type: 'string',
      group: 'faq',
    }),
    defineField({
      name: 'faqSubheading',
      title: 'Section Subheading',
      type: 'string',
      group: 'faq',
    }),
    defineField({
      name: 'faqs',
      title: 'Questions & Answers',
      description: 'Each FAQ expands as an accordion on the page',
      type: 'array',
      group: 'faq',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Answer', type: 'text' }),
          ],
          preview: {
            select: { question: 'question' },
            prepare({ question }) {
              return { title: question || 'Untitled Question' };
            },
          },
        },
      ],
    }),

    // ─── Split Section ─────────────────────────────────────────────────────────
    // Two-column layout with text on one side and an image on the other — great for "About" content.
    defineField({
      name: 'splitEyebrow',
      title: 'Eyebrow Text',
      description: 'Small uppercase text above the heading (e.g. "About Us")',
      type: 'string',
      group: 'split',
    }),
    defineField({
      name: 'splitHeading',
      title: 'Heading',
      type: 'string',
      group: 'split',
    }),
    defineField({
      name: 'splitBody',
      title: 'Body Text',
      description: 'One or two paragraphs of supporting content',
      type: 'text',
      group: 'split',
    }),
    defineField({
      name: 'splitCtaLabel',
      title: 'Button Text',
      type: 'string',
      group: 'split',
    }),
    defineField({
      name: 'splitCtaUrl',
      title: 'Button Link',
      type: 'string',
      group: 'split',
    }),
    defineField({
      name: 'splitImage',
      title: 'Image',
      type: 'image',
      group: 'split',
      options: { hotspot: true },
    }),
    defineField({
      name: 'splitImageRight',
      title: 'Image on Right Side',
      description: 'When enabled, the image appears on the right and text on the left',
      type: 'boolean',
      group: 'split',
    }),
    defineField({
      name: 'splitFeatures',
      title: 'Bullet Points',
      description: 'Optional feature list shown below the body text',
      type: 'array',
      group: 'split',
      of: [{ type: 'string' }],
    }),

    // ─── Contact ───────────────────────────────────────────────────────────────
    // Contact information and form — how visitors reach you.
    defineField({
      name: 'contactHeading',
      title: 'Section Heading',
      description: 'e.g. "Get In Touch"',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactSubheading',
      title: 'Section Subheading',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Phone Number',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Email Address',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactAddress',
      title: 'Physical Address',
      description: 'Can be multiline',
      type: 'text',
      group: 'contact',
    }),
    defineField({
      name: 'contactHours',
      title: 'Business Hours',
      description: 'e.g. "Mon–Fri, 9am–5pm"',
      type: 'text',
      group: 'contact',
    }),

    // ─── Text Content ──────────────────────────────────────────────────────────
    // A general-purpose rich text section for long-form content.
    defineField({
      name: 'textHeading',
      title: 'Heading',
      description: 'Heading above the text block',
      type: 'string',
      group: 'text',
    }),
    defineField({
      name: 'bodyContent',
      title: 'Body Content',
      description: 'Rich text — supports headings, bold, italic, lists, and links',
      type: 'array',
      group: 'text',
      of: [{ type: 'block' }],
    }),

    // ─── Portfolio ─────────────────────────────────────────────────────────────
    // Showcase of past work or projects.
    defineField({
      name: 'portfolioHeading',
      title: 'Section Heading',
      description: 'e.g. "Our Work"',
      type: 'string',
      group: 'portfolio',
    }),
    defineField({
      name: 'portfolioSubheading',
      title: 'Section Subheading',
      type: 'string',
      group: 'portfolio',
    }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare({ title, slug }) {
      return {
        title: title || 'Untitled',
        subtitle: slug || '/',
      };
    },
  },
});
