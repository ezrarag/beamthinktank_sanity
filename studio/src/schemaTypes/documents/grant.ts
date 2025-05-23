import {BillIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const grant = defineType({
  name: 'grant',
  title: 'Grant',
  icon: BillIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Grant Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fundraiser',
      title: 'Fundraiser/Source',
      type: 'reference',
      to: [{type: 'partner'}], // Reference to 'partner' schema
      description: 'The organization or individual providing the grant.',
    }),
    defineField({
      name: 'amount',
      title: 'Amount Awarded',
      type: 'number',
      description: 'Total amount of the grant.',
    }),
    defineField({
      name: 'awardDate',
      title: 'Award Date',
      type: 'date',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Applied', value: 'applied'},
          {title: 'Approved', value: 'approved'},
          {title: 'Awarded', value: 'awarded'},
          {title: 'Rejected', value: 'rejected'},
          {title: 'Closed', value: 'closed'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'associatedProjects',
      title: 'Associated Projects',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'project'}]}], // Reference to 'project' schema
      description: 'Projects funded by this grant.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      amount: 'amount',
      status: 'status',
      fundraiserName: 'fundraiser.name',
    },
    prepare(selection) {
      const {title, amount, status, fundraiserName} = selection
      const subtitle = [
        amount ? `$${amount}` : '',
        status ? status.charAt(0).toUpperCase() + status.slice(1) : '',
        fundraiserName ? `by ${fundraiserName}` : '',
      ].filter(Boolean).join(' | ')
      return {
        title: title || 'Untitled Grant',
        subtitle: subtitle,
        media: BillIcon,
      }
    },
  },
})