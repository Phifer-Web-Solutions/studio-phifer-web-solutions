import { defineType, defineField } from 'sanity';
import { HiRocketLaunch } from 'react-icons/hi2';

export default defineType({
  name: 'caseStudy',
  title: 'Projects',
  type: 'document',
  icon: HiRocketLaunch,
  fields: [
    defineField({
      name: 'title',
      title: 'Project title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Project logo',
      description: 'Shown as the icon in the project list',
      type: 'image',
      options: { hotspot: true },
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
      title: 'Full project write-up (portable text)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: { title: 'title', category: 'category', logo: 'logo' },
    prepare({ title, category, logo }) {
      return {
        title: title || 'Untitled',
        subtitle: category || undefined,
        media: logo || HiRocketLaunch,
      };
    },
  },
});
