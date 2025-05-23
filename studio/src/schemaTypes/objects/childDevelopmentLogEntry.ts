import {defineField, defineType} from 'sanity'

export const childDevelopmentLogEntry = defineType({
  name: 'childDevelopmentLogEntry',
  title: 'Child Development Log Entry',
  type: 'object', // This is an OBJECT type, not a DOCUMENT type
  fields: [
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'activity',
      title: 'Activity',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Observations or details about the activity.',
    }),
    defineField({
      name: 'milestone',
      title: 'Milestone Achieved',
      type: 'string',
      description: 'Specific milestone related to the activity.',
    }),
  ],
  preview: {
    select: {
      date: 'date',
      activity: 'activity',
    },
    prepare(selection) {
      const {date, activity} = selection
      const dateDisplay = date ? new Date(date).toLocaleDateString() : 'No Date';
      return {
        title: activity || 'Untitled Activity',
        subtitle: `Date: ${dateDisplay}`,
      }
    },
  },
})