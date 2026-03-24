import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Project category',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Short project description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Project cover image',
      type: 'image',
    }),
    defineField({
      name: 'body',
      title: 'Full case study content (portable text)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
});
