import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'socialLinks',
  title: 'Social Links',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Social media links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            })
          ],
        }
      ],
    }),
  ],
});
