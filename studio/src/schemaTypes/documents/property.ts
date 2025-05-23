import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const property = defineType({
  name: 'property',
  title: 'Property',
  icon: HomeIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'geopoint',
      description: 'Geographic coordinates of the property.',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Planned', value: 'planned'},
          {title: 'Active Recovery', value: 'active_recovery'},
          {title: 'Under Development', value: 'under_development'},
          {title: 'Completed', value: 'completed'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          {title: 'Residential', value: 'residential'},
          {title: 'Commercial', value: 'commercial'},
          {title: 'Land', value: 'land'},
          {title: 'Mixed-Use', value: 'mixed_use'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'relatedProject',
      title: 'Related Project',
      type: 'reference',
      to: [{type: 'project'}], // Reference to the 'project' schema
      description: 'The BEAM project associated with this property.',
    }),
  ],
  preview: {
    select: {
      address: 'address',
      status: 'status',
      type: 'type',
      projectName: 'relatedProject.name',
    },
    prepare(selection) {
      const {address, status, type, projectName} = selection
      const subtitle = [
        type ? type.charAt(0).toUpperCase() + type.slice(1) : '',
        status ? `Status: ${status.charAt(0).toUpperCase() + status.slice(1)}` : '',
        projectName ? `Project: ${projectName}` : '',
      ].filter(Boolean).join(' | ')
      return {
        title: address || 'Untitled Property',
        subtitle: subtitle,
        media: HomeIcon,
      }
    },
  },
})