import {PlayIcon} from '@sanity/icons' // Using PlayIcon, hoping it works, if not, use DocumentIcon again
import {defineField, defineType} from 'sanity'

export const videoAsset = defineType({
  name: 'videoAsset',
  title: 'Video Asset',
  icon: PlayIcon, // You can change this if PlayIcon doesn't work
  type: 'object', // This is an OBJECT type
  fields: [
    defineField({
      name: 'title',
      title: 'Video Title/Caption',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Video Source Type',
      type: 'string',
      options: {
        list: [
          {title: 'Uploaded File', value: 'file'},
          {title: 'External URL (YouTube/Vimeo)', value: 'url'},
        ],
        layout: 'radio', // Use radio buttons for clear selection
      },
      initialValue: 'url', // Default to URL as it's common
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*', // Only accept video files
      },
      hidden: ({parent}) => parent?.type !== 'file', // Only show if type is 'file'
    }),
    defineField({
      name: 'externalUrl',
      title: 'External Video URL',
      type: 'url',
      description: 'URL from YouTube, Vimeo, etc.',
      hidden: ({parent}) => parent?.type !== 'url', // Only show if type is 'url'
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      externalUrl: 'externalUrl',
      videoFile: 'videoFile.asset.originalFilename', // For file display
    },
    prepare(selection) {
      const {title, type, externalUrl, videoFile} = selection
      const subtitleParts = [
        type ? type.charAt(0).toUpperCase() + type.slice(1) : '',
        type === 'url' && externalUrl ? `URL: ${externalUrl}` : '',
        type === 'file' && videoFile ? `File: ${videoFile}` : '',
      ].filter(Boolean)
      return {
        title: title || 'Untitled Video Asset',
        subtitle: subtitleParts.join(' | '),
        media: PlayIcon,
      }
    },
  },
})