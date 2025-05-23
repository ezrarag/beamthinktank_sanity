import {BoltIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {blockContent} from '../objects/blockContent' // Adjust path if needed

export const resource = defineType({
  name: 'resource',
  title: 'Resource',
  icon: BoltIcon, // Or choose a more specific icon like `ToolsIcon`, `HouseIcon`
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Resource Name',
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
      name: 'type',
      title: 'Type of Resource',
      type: 'string',
      options: {
        list: [
          {title: 'Equipment', value: 'equipment'},
          {title: 'Performance Space', value: 'performance_space'},
          {title: 'Meeting Room', value: 'meeting_room'},
          {title: 'Vehicle', value: 'vehicle'},
          {title: 'Curriculum Material', value: 'curriculum_material'},
          {title: 'Tool', value: 'tool'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string', // Could be boolean 'isAvailable' or string 'status'
      options: {
        list: [
          {title: 'Available', value: 'available'},
          {title: 'Booked', value: 'booked'},
          {title: 'Under Maintenance', value: 'maintenance'},
          {title: 'Unavailable', value: 'unavailable'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'available',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{type: 'location'}], // References the 'location' schema
      description: 'Physical location where this resource is stored or used.',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'bookingLink',
      title: 'Booking Link',
      type: 'url',
      description: 'External link for booking this resource, if applicable.',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      type: 'type',
      availability: 'availability',
      locationName: 'location.name',
    },
    prepare(selection) {
      const {name, type, availability, locationName} = selection
      const subtitleParts = [
        type ? type.charAt(0).toUpperCase() + type.slice(1) : '',
        availability ? `Status: ${availability.charAt(0).toUpperCase() + availability.slice(1)}` : '',
        locationName ? `Location: ${locationName}` : '',
      ].filter(Boolean)
      return {
        title: name || 'Untitled Resource',
        subtitle: subtitleParts.join(' | '),
        media: BoltIcon,
      }
    },
  },
})