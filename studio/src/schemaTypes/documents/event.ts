import {CalendarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {blockContent} from '../objects/blockContent' // Adjust path if needed

export const event = defineType({
  name: 'event',
  title: 'Event',
  icon: CalendarIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
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
    }),
    defineField({
      name: 'dateTime',
      title: 'Date and Time',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{type: 'location'}], // References the 'location' schema
      description: 'Physical location where the event takes place.',
    }),
    defineField({
      name: 'associatedProjects',
      title: 'Associated Projects',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'project'}]}], // References the 'project' schema
      description: 'Projects this event is part of.',
    }),
    defineField({
      name: 'performers',
      title: 'Performers/Speakers',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'person'}]}], // References the 'person' schema
      description: 'People participating in the event.',
    }),
    defineField({
      name: 'resourcesUsed',
      title: 'Resources Used',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'resource'}]}], // References the 'resource' schema (to be defined next)
      description: 'Equipment or spaces utilized for the event.',
    }),
    defineField({
      name: 'isPublic',
      title: 'Is Public Event',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this event should be visible on the public calendar.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      dateTime: 'dateTime',
      locationName: 'location.name',
    },
    prepare(selection) {
      const {title, dateTime, locationName} = selection
      const dateDisplay = dateTime ? new Date(dateTime).toLocaleDateString() : 'No Date';
      const timeDisplay = dateTime ? new Date(dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
      const subtitleParts = [
        dateDisplay,
        timeDisplay,
        locationName,
      ].filter(Boolean)
      return {
        title: title || 'Untitled Event',
        subtitle: subtitleParts.join(' | '),
        media: CalendarIcon,
      }
    },
  },
})