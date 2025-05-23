import {BookIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {blockContent} from '../objects/blockContent' // Adjust path if needed

export const module = defineType({
  name: 'module',
  title: 'Learning Module',
  icon: BookIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Module Title',
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
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: 'Detailed description of the learning module.',
    }),
    defineField({
      name: 'discipline',
      title: 'Discipline',
      type: 'string',
      options: {
        list: [
          {title: 'Coding & Tech', value: 'coding_tech'},
          {title: 'Music & Performance', value: 'music_performance'},
          {title: 'History & Culture', value: 'history_culture'},
          {title: 'Culinary Arts', value: 'culinary_arts'},
          {title: 'Community Development', value: 'community_development'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ageGroups',
      title: 'Target Age Groups',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Children (0-12)', value: 'children'},
          {title: 'Teens (13-18)', value: 'teens'},
          {title: 'Young Adults (19-25)', value: 'young_adults'},
          {title: 'Adults (26+)', value: 'adults'},
        ],
        layout: 'tags', // Display as tags in the Studio
      },
      description: 'Age groups this module is designed for.',
    }),
    defineField({
      name: 'skillsTaught',
      title: 'Skills Taught',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description: 'Key skills acquired from this module.',
    }),
    defineField({
      name: 'content',
      title: 'Module Content',
      type: 'array',
      of: [
        {type: 'blockContent'},
        {type: 'image'},
        {type: 'file'},
        // You can add custom object types for specific lesson components later
        // {type: 'lessonPart'}
      ],
      description: 'The actual content of the module (text, images, files).',
    }),
    defineField({
      name: 'credentialsAwarded',
      title: 'Credentials Awarded',
      type: 'string', // Or an array of strings if multiple credentials
      description: 'Description of any credentials or certifications awarded upon completion.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      discipline: 'discipline',
      ageGroups: 'ageGroups',
    },
    prepare(selection) {
      const {title, discipline, ageGroups} = selection
      const subtitleParts = [
        discipline ? discipline.charAt(0).toUpperCase() + discipline.slice(1) : '',
        ageGroups && ageGroups.length > 0 ? `Ages: ${ageGroups.join(', ')}` : '',
      ].filter(Boolean)
      return {
        title: title || 'Untitled Module',
        subtitle: subtitleParts.join(' | '),
        media: BookIcon,
      }
    },
  },
})