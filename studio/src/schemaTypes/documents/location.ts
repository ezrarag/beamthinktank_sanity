import {EarthGlobeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const location = defineType({
  name: 'location',
  title: 'Location',
  icon: EarthGlobeIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Location Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      description: 'Full street address of the location.',
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'geopoint', // Sanity's type for latitude/longitude
      description: 'Geographic coordinates for map-based display (e.g., Google Maps).',
    }),
    defineField({
      name: 'type',
      title: 'Type of Location',
      type: 'string',
      options: {
        list: [
          {title: 'BEAM Hub', value: 'beam_hub'},
          {title: 'Project Site', value: 'project_site'},
          {title: 'Property', value: 'property_location'},
          {title: 'Venue', value: 'venue'},
          {title: 'Office', value: 'office'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text', // Simple text field
    }),
  ],
  preview: {
    select: {
      name: 'name',
      address: 'address',
      type: 'type',
    },
    prepare(selection) {
      const {name, address, type} = selection
      const subtitleParts = []

      // Safely get the capitalized type string
      if (typeof type === 'string' && type) {
        subtitleParts.push(type.charAt(0).toUpperCase() + type.slice(1))
      }

      // Safely get the address string
      if (typeof address === 'string' && address) {
        subtitleParts.push(address)
      }

      return {
        title: name || 'Untitled Location',
        subtitle: subtitleParts.join(' | '), // Join only the valid parts with ' | '
        media: EarthGlobeIcon,
      }
    },
  },
})