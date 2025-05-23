import {ComposeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {blockContent} from '../objects/blockContent' // Adjust path if needed

export const composerProfile = defineType({
  name: 'composerProfile',
  title: 'Composer Profile',
  icon: ComposeIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Composer Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'blockContent',
      description: 'Biographical information about the composer.',
    }),
    defineField({
      name: 'period',
      title: 'Musical Period',
      type: 'string',
      options: {
        list: [
          {title: 'Baroque', value: 'baroque'},
          {title: 'Classical', value: 'classical'},
          {title: 'Romantic', value: 'romantic'},
          {title: '20th Century', value: '20th_century'},
          {title: 'Contemporary', value: 'contemporary'},
          // Add other periods as relevant
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        }),
      ],
    }),
    defineField({
      name: 'works',
      title: 'Works',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'musicalWork'}]}], // Reference to 'musicalWork' schema (to be defined)
      description: 'Musical works by this composer.',
    }),
    // Add other fields like influences, styles, etc.
  ],
  preview: {
    select: {
      name: 'name',
      period: 'period',
      portrait: 'portrait',
    },
    prepare(selection) {
      const {name, period, portrait} = selection
      const subtitle = period ? `Period: ${period}` : ''
      return {
        title: name || 'Untitled Composer',
        subtitle: subtitle,
        media: portrait || ComposeIcon,
      }
    },
  },
})