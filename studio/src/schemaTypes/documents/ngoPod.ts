import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {blockContent} from '../objects/blockContent' // Adjust path if needed

export const ngoPod = defineType({
  name: 'ngoPod',
  title: 'NGO Pod',
  icon: DocumentIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Pod Name',
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
      type: 'blockContent',
      description: 'Detailed description of the NGO Pod and its mission.',
    }),
    defineField({
      name: 'location',
      title: 'Primary Location',
      type: 'reference',
      to: [{type: 'location'}], // Reference to 'location' schema
      description: 'Main physical location of the NGO Pod.',
    }),
    defineField({
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'person'}]}], // References the 'person' schema
      description: 'People associated with this NGO Pod.',
    }),
    defineField({
      name: 'associatedProjects',
      title: 'Associated Projects',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'project'}]}], // References the 'project' schema
      description: 'Projects managed or directly supported by this NGO Pod.',
    }),
    defineField({
      name: 'governanceModel',
      title: 'Governance Model',
      type: 'text', // Can be expanded to a custom object type later if complex
      description: 'Description of the pod\'s governance structure (e.g., DAO, consensus-based).',
    }),
    defineField({
      name: 'universalLedger',
      title: 'Universal Ledger (Contributions)',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'walletTransaction'}]}], // References 'walletTransaction' schema
      readOnly: true, // Typically managed by system, not manually in Studio
      description: 'Transactions and contributions tracked in the Universal Ledger for this pod.',
    }),
    // Add fields for sovereignty protection concepts if tangible
  ],
  preview: {
    select: {
      name: 'name',
      locationName: 'location.name',
    },
    prepare(selection) {
      const {name, locationName} = selection
      const subtitle = locationName ? `Location: ${locationName}` : ''
      return {
        title: name || 'Untitled NGO Pod',
        subtitle: subtitle,
        media: DocumentIcon,
      }
    },
  },
})