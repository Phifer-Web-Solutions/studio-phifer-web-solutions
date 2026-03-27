import { defineType, defineField } from 'sanity';
import { HiQueueList } from 'react-icons/hi2';

const NAV_TYPES = [
  { title: 'Main Navigation', value: 'main' },
  { title: 'Footer Navigation', value: 'footer' },
  { title: 'Legal Navigation', value: 'legal' },
];

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: HiQueueList,
  fields: [
    defineField({
      name: 'navType',
      title: 'Navigation Type',
      description: 'Where these links appear on the site',
      type: 'string',
      options: {
        list: NAV_TYPES,
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: ' ',
      description: 'Links in this navigation menu',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'menuItem',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              description: 'e.g. /about, /contact, or https://...',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isExternal',
              title: 'External link?',
              description: 'Opens in a new tab',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: { label: 'label', url: 'url' },
            prepare({ label, url }) {
              return {
                title: label || 'Untitled',
                subtitle: url || 'No URL set',
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { navType: 'navType', items: 'items' },
    prepare({ navType, items }) {
      const label = NAV_TYPES.find((t) => t.value === navType)?.title || 'Navigation';
      const count = Array.isArray(items) ? items.length : 0;
      return {
        title: label,
        subtitle: count ? `${count} link${count === 1 ? '' : 's'}` : 'No links added',
      };
    },
  },
});
