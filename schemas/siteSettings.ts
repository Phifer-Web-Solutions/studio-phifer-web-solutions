import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site name displayed in header',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Site logo',
      type: 'image',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA button label (e.g. "Book Now")',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA button destination URL',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'authEnabled',
      title: 'Show login / account button in header',
      type: 'boolean',
    }),
    defineField({
      name: 'ctaHeadline',
      title: 'CTA headline in footer band',
      type: 'string',
    }),
    defineField({
      name: 'ctaSubtext',
      title: 'Supporting text beneath CTA headline',
      type: 'string',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright text in footer',
      type: 'string',
    }),
  ],
});
