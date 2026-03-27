import { defineType, defineField } from 'sanity';
import { GoLaw } from 'react-icons/go';

export default defineType({
  name: 'legalPage',
  title: 'Legal Pages',
  type: 'document',
  icon: GoLaw,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'lastUpdated' },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled',
        subtitle: subtitle ? `Last updated: ${subtitle}` : undefined,
      };
    },
  },
});
