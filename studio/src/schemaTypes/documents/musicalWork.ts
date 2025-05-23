import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {blockContent} from '../objects/blockContent' // Adjust path if needed
import {PlayIcon} from '@sanity/icons'
import {videoAsset} from '../objects/videoAsset'

export const musicalWork = defineType({
  name: 'musicalWork',
  title: 'Musical Work',
  icon: DocumentIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Work Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'composer',
      title: 'Composer',
      type: 'reference',
      to: [{type: 'composerProfile'}], // Reference to 'composerProfile' schema
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'historicalContext',
      title: 'Historical Context',
      type: 'blockContent',
      description: 'Historical context and background of the musical work.',
    }),
    defineField({
      name: 'era',
      title: 'Era/Period',
      type: 'string',
      options: {
        list: [
          {title: 'Baroque', value: 'baroque'},
          {title: 'Classical', value: 'classical'},
          {title: 'Romantic', value: 'romantic'},
          {title: '20th Century', value: '20th_century'},
          {title: 'Contemporary', value: 'contemporary'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'filterOptions',
      title: 'Filter Options/Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description: 'Keywords or categories for filtering and searching (e.g., concerto, opera, chamber music).',
    }),
    defineField({
      name: 'performanceVideos',
      title: 'Performance Videos',
      type: 'array',
      of: [{type: 'videoAsset'}],
      description: 'Associated performance videos.',
    }),
    defineField({
      name: 'locationTracking',
      title: 'Location Tracking',
      type: 'array',
      of: [{type: 'geopoint', title: 'Performance Location'}], // Store geo-points for performances
      description: 'Geographic locations where this work has been performed.',
    }),
    defineField({
      name: 'scoreFiles',
      title: 'Score Files',
      type: 'array',
      of: [{type: 'file', title: 'Score PDF/Image'}],
      description: 'Digital score files (e.g., PDF).',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      composerName: 'composer.name',
      era: 'era',
    },
    prepare(selection) {
      const {title, composerName, era} = selection
      const subtitleParts = [
        composerName ? `by ${composerName}` : '',
        era ? `Era: ${era}` : '',
      ].filter(Boolean)
      return {
        title: title || 'Untitled Work',
        subtitle: subtitleParts.join(' | '),
        media: DocumentIcon,
      }
    },
  },
})