import { defineType, defineField } from 'sanity';
import { IoSettingsSharp } from 'react-icons/io5';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: IoSettingsSharp,
  groups: [
    { name: 'branding', title: '🎨 Branding', default: true },
    { name: 'headerCta', title: '📢 Header CTA' },
    { name: 'footerCta', title: '📣 Footer CTA' },
    { name: 'footer', title: '🦶 Footer' },
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      description: 'Displayed in the header and browser tab',
      type: 'string',
      group: 'branding',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo (Light Mode)',
      description: 'Used on light backgrounds — replaces the text name in the header',
      type: 'image',
      group: 'branding',
      options: { hotspot: true },
    }),
    defineField({
      name: 'darkLogo',
      title: 'Site Logo (Dark Mode)',
      description: 'Used on dark backgrounds — if empty, the light logo is used',
      type: 'image',
      group: 'branding',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button Label',
      description: 'e.g. "Get Started", "Book Now" — shown in the site header',
      type: 'string',
      group: 'headerCta',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaUrl',
      title: 'Button Destination',
      description: 'Where the header CTA links to (e.g. /contact or https://...)',
      type: 'string',
      group: 'headerCta',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authEnabled',
      title: 'Show Login Button',
      description: 'Display a login / account button in the header',
      type: 'boolean',
      group: 'branding',
    }),
    defineField({
      name: 'ctaHeadline',
      title: 'Headline',
      description: 'Headline text in the footer CTA band',
      type: 'string',
      group: 'footerCta',
    }),
    defineField({
      name: 'ctaSubtext',
      title: 'Subtext',
      description: 'Supporting text beneath the headline',
      type: 'string',
      group: 'footerCta',
    }),
    defineField({
      name: 'ctaFooterLabel',
      title: 'Button Label',
      description: 'Footer CTA button text — falls back to header CTA label if empty',
      type: 'string',
      group: 'footerCta',
    }),
    defineField({
      name: 'ctaFooterUrl',
      title: 'Button Destination',
      description: 'Footer CTA link — falls back to header CTA URL if empty',
      type: 'string',
      group: 'footerCta',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      description: 'Shown in the footer bottom bar',
      type: 'string',
      group: 'footer',
    }),
  ],
  preview: {
    select: { title: 'siteName' },
    prepare({ title }) {
      return { title: title || 'Site Settings' };
    },
  },
});
