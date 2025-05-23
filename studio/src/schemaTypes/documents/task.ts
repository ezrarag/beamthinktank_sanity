import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const task = defineType({
  name: 'task',
  title: 'Task',
  icon: DocumentIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Task Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'assignedTo',
      title: 'Assigned To',
      type: 'reference',
      to: [{type: 'person'}], // Reference to 'person' schema
      description: 'The person responsible for this task.',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'To Do', value: 'todo'},
          {title: 'In Progress', value: 'in_progress'},
          {title: 'Blocked', value: 'blocked'},
          {title: 'Done', value: 'done'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'dueDate',
      title: 'Due Date',
      type: 'datetime',
    }),
    defineField({
      name: 'relatedProject',
      title: 'Related Project',
      type: 'reference',
      to: [{type: 'project'}], // Reference to 'project' schema
      description: 'The project this task is associated with.',
    }),
    defineField({
      name: 'smsStatus',
      title: 'SMS Status',
      type: 'string',
      options: {
        list: [
          {title: 'Not Sent', value: 'not_sent'},
          {title: 'Sent', value: 'sent'},
          {title: 'Delivered', value: 'delivered'},
          {title: 'Failed', value: 'failed'},
        ],
        layout: 'dropdown',
      },
      readOnly: true, // Typically updated by backend integration, not manually
      description: 'Status of SMS notification via Apple Business Chat or similar.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      assignedToFirstName: 'assignedTo.firstName',
      assignedToLastName: 'assignedTo.lastName',
    },
    prepare(selection) {
      const {title, status, assignedToFirstName, assignedToLastName} = selection
      const subtitle = [
        status ? status.charAt(0).toUpperCase() + status.slice(1) : '',
        assignedToFirstName && assignedToLastName ? `Assigned to: ${assignedToFirstName} ${assignedToLastName}` : '',
      ].filter(Boolean).join(' | ')
      return {
        title: title || 'Untitled Task',
        subtitle: subtitle,
        media: DocumentIcon,
      }
    },
  },
})