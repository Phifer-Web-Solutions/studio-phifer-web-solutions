import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
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
      name: 'heroTitle',
      title: 'Hero headline text',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero subtitle or tagline',
      type: 'text',
    }),
    defineField({
      name: 'heroImage',
      title: 'Full-width background image',
      type: 'image',
    }),
    defineField({
      name: 'heroCta',
      title: 'Call-to-action button',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'string',
        })
      ],
    }),
    defineField({
      name: 'features',
      title: 'Feature cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'featureItem',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
            })
          ],
        }
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'statsHeading',
      title: 'Optional section heading',
      type: 'string',
    }),
    defineField({
      name: 'stats',
      title: 'Key metrics to display',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'statItem',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'prefix',
              title: 'Prefix',
              type: 'string',
            }),
            defineField({
              name: 'suffix',
              title: 'Suffix',
              type: 'string',
            })
          ],
        }
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'processHeading',
      title: 'Section heading',
      type: 'string',
    }),
    defineField({
      name: 'processSubheading',
      title: 'Section subheading',
      type: 'string',
    }),
    defineField({
      name: 'steps',
      title: 'Ordered steps',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'processStep',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
            })
          ],
        }
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'testimonialsHeading',
      title: 'Section heading',
      type: 'string',
    }),
    defineField({
      name: 'testimonials',
      title: 'Customer testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'testimonialItem',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
            }),
            defineField({
              name: 'author',
              title: 'Author',
              type: 'string',
            }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
            }),
            defineField({
              name: 'rating',
              title: 'Rating',
              type: 'number',
            })
          ],
        }
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'pricingHeading',
      title: 'Section heading',
      type: 'string',
    }),
    defineField({
      name: 'pricingSubheading',
      title: 'Section subheading',
      type: 'string',
    }),
    defineField({
      name: 'plans',
      title: 'Pricing tiers',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'pricingPlan',
          fields: [
            defineField({
              name: 'name',
              title: 'Plan Name',
              type: 'string',
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string',
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'highlighted',
              title: 'Highlighted',
              type: 'boolean',
            }),
            defineField({
              name: 'ctaLabel',
              title: 'CTA Label',
              type: 'string',
            }),
            defineField({
              name: 'ctaUrl',
              title: 'CTA URL',
              type: 'string',
            })
          ],
        }
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'faqHeading',
      title: 'Section heading',
      type: 'string',
    }),
    defineField({
      name: 'faqSubheading',
      title: 'Section subheading',
      type: 'string',
    }),
    defineField({
      name: 'faqs',
      title: 'Question and answer pairs',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
            })
          ],
        }
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'splitEyebrow',
      title: 'Small text above heading',
      type: 'string',
    }),
    defineField({
      name: 'splitHeading',
      title: 'Section heading',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'splitBody',
      title: 'Paragraph below heading',
      type: 'text',
    }),
    defineField({
      name: 'splitCtaLabel',
      title: 'splitCtaLabel',
      type: 'string',
    }),
    defineField({
      name: 'splitCtaUrl',
      title: 'splitCtaUrl',
      type: 'url',
    }),
    defineField({
      name: 'splitImage',
      title: 'Section image',
      type: 'image',
    }),
    defineField({
      name: 'splitImageRight',
      title: 'Place image on the right side',
      type: 'boolean',
    }),
    defineField({
      name: 'splitFeatures',
      title: 'Optional feature bullet points',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'contactHeading',
      title: 'Section heading',
      type: 'string',
    }),
    defineField({
      name: 'contactSubheading',
      title: 'Section subheading',
      type: 'string',
    }),
    defineField({
      name: 'contactAddress',
      title: 'Physical address (multiline)',
      type: 'text',
    }),
    defineField({
      name: 'contactPhone',
      title: 'contactPhone',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: 'contactEmail',
      type: 'string',
    }),
    defineField({
      name: 'contactHours',
      title: 'Operating hours (multiline)',
      type: 'text',
    }),
    defineField({
      name: 'textHeading',
      title: 'Heading above the text block',
      type: 'string',
    }),
    defineField({
      name: 'bodyContent',
      title: 'Rich text content (portable text)',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'portfolioHeading',
      title: 'Portfolio section heading',
      type: 'string',
    }),
    defineField({
      name: 'portfolioSubheading',
      title: 'Portfolio section subheading',
      type: 'string',
    }),
  ],
});
