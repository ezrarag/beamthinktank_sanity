import {UsersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const partner = defineType({
  name: 'partner',
  title: 'Partner',
  icon: UsersIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Partner Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type of Partner',
      type: 'string',
      options: {
        list: [
          {title: 'Government', value: 'government'},
          {title: 'Education', value: 'education'},
          {title: 'Non-profit', value: 'non_profit'},
          {title: 'For-profit', value: 'for_profit'},
          {title: 'Community Organization', value: 'community_org'},
          {title: 'Individual', value: 'individual'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
      description: 'Partner organization logo.',
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'associatedProjects',
      title: 'Associated Projects',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'project'}]}], // Reference to 'project' schema
      description: 'Projects collaborated on with this partner.',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      type: 'type',
      logo: 'logo',
    },
    prepare(selection) {
      const {name, type, logo} = selection
      return {
        title: name || 'Untitled Partner',
        subtitle: type ? type.charAt(0).toUpperCase() + type.slice(1) : '',
        media: logo || UsersIcon,
      }
    },
  },
})