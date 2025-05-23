import {BlockContentIcon} from '@sanity/icons' // Using a generic icon for now
import {defineField, defineType} from 'sanity'
import {blockContent} from '../objects/blockContent' // Adjust path if needed

/**
 * Project schema. Defines the structure for various BEAM projects.
 */

export const project = defineType({
  name: 'project',
  title: 'Project',
  icon: BlockContentIcon, // You can choose a more suitable icon later (e.g., of an actual project/calendar/map)
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Project Name',
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
      name: 'description',
      title: 'Description',
      type: 'blockContent', // Rich text field for detailed description
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Planned', value: 'planned'},
          {title: 'Active', value: 'active'},
          {title: 'Completed', value: 'completed'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          {title: 'Performance Series', value: 'performance'},
          {title: 'Community Revitalization', value: 'community_revitalization'},
          {title: 'Culinary & Tech Pod', value: 'culinary_tech_pod'},
          {title: 'Research Initiative', value: 'research'},
          {title: 'Artist Collaboration', value: 'artist_collaboration'},
          {title: 'Media & Documentary', value: 'media_documentary'},
          // Add more types as needed
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'multimedia',
      title: 'Multimedia',
      type: 'array',
      of: [
        {type: 'image', options: {hotspot: true}},
        {type: 'file'},
        // We can define a custom 'youtubeVideo' object type later if needed
        // {type: 'youtubeVideo'}
      ],
      description: 'Images, videos, or audio files related to the project.',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
    }),
    defineField({
      name: 'leadPerson',
      title: 'Project Lead',
      type: 'reference',
      to: [{type: 'person'}], // References the 'person' schema we just modified
    }),
    defineField({
      name: 'participants',
      title: 'Participants',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'person'}]}],
      description: 'People involved in the project.',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{type: 'location'}], // Reference to 'location' schema (to be defined)
      description: 'Primary physical location of the project.',
    }),
    defineField({
      name: 'geographicData',
      title: 'Geographic Data',
      type: 'geopoint', // For latitude/longitude
      description: 'Specific geographic coordinates for map-based display.',
    }),
    defineField({
      name: 'associatedProperties',
      title: 'Associated Properties',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'property'}]}], // Reference to 'property' schema (to be defined)
      description: 'Properties linked to community revitalization projects.',
    }),
    defineField({
      name: 'fundingSources',
      title: 'Funding Sources',
      type: 'array',
      of: [
        {type: 'reference', name: 'partnerReference', to: [{type: 'partner'}]}, // Added unique name 'partnerReference'
        {type: 'reference', name: 'grantReference', to: [{type: 'grant'}]}     // Added unique name 'grantReference'
      ],
      description: 'Partners or grants contributing to the project.',
    }),
    defineField({
      name: 'pipelineStatus',
      title: 'Pipeline Status',
      type: 'string',
      options: {
        list: [
          {title: 'Discovery', value: 'discovery'},
          {title: 'Internship', value: 'internship'},
          {title: 'Paid Internship', value: 'paid_internship'},
          {title: 'Full-time', value: 'full_time'},
          {title: 'Alumni', value: 'alumni'},
        ],
        layout: 'dropdown',
      },
      description: 'Current status in the career pipeline.',
    }),
    defineField({
      name: 'researchTopics',
      title: 'Research Topics',
      type: 'array',
      of: [{type: 'string'}], // Can be simple strings, or reference a 'ResearchTag' object later
      options: {
        layout: 'tags',
      },
      description: 'Relevant topics for research initiatives (e.g., colonization, music history).',
    }),
    defineField({
      name: 'tasks',
      title: 'Associated Tasks',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'task'}]}], // Reference to 'task' schema (to be defined)
      description: 'Tasks related to this project (for internal management).',
    }),
    defineField({
      name: 'walletTransactions', // For contribution tracking in universal ledger
      title: 'Wallet Transactions',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'walletTransaction'}]}], // Reference to 'walletTransaction' (to be defined)
      readOnly: true, // Typically managed by system, not manually in Studio
      description: 'Financial transactions linked to this project.',
    }),
  ],
  // List preview configuration
  preview: {
    select: {
      name: 'name',
      status: 'status',
      type: 'type',
      leadPersonFirstName: 'leadPerson.firstName',
      leadPersonLastName: 'leadPerson.lastName',
    },
    prepare(selection) {
      const {name, status, type, leadPersonFirstName, leadPersonLastName} = selection
      const subtitle = [
        type ? `${type.charAt(0).toUpperCase() + type.slice(1)}` : '', // Capitalize type
        status ? `Status: ${status.charAt(0).toUpperCase() + status.slice(1)}` : '', // Capitalize status
        leadPersonFirstName && leadPersonLastName ? `Lead: ${leadPersonFirstName} ${leadPersonLastName}` : '',
      ].filter(Boolean).join(' | ')

      return {
        title: name || 'Untitled Project',
        subtitle: subtitle,
        media: BlockContentIcon, // Or a more suitable icon/image later
      }
    },
  },
})