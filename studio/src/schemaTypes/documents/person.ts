import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {blockContent} from '../objects/blockContent'

/**
 * Person schema.  Define and edit the fields for the 'person' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const person = defineType({
  name: 'person',
  title: 'Person',
  icon: UserIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'firstName', // Automatically generate slug from first name
        maxLength: 96,
        // Optionally add a custom slugify function if needed
        // slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      // validation: (rule) => rule.email(), // Optional: if you want email format validation
      // You can also add hidden: true if this is an internal-only field.
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [ // Define the dropdown options
          {title: 'Student', value: 'student'},
          {title: 'Alumni', value: 'alumni'},
          {title: 'Operator', value: 'operator'},
          {title: 'Musician', value: 'musician'},
          {title: 'Researcher', value: 'researcher'},
          {title: 'Educator', value: 'educator'},
          {title: 'Artist', value: 'artist'},
          {title: 'Learner', value: 'learner'},
          {title: 'Participant', value: 'participant'},
          {title: 'Admin', value: 'admin'}, // Keep this for internal admin roles
        ],
        layout: 'dropdown', // Display as a dropdown
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'blockContent', // Use the imported blockContent type
    }),
    defineField({
      name: 'associatedProjects',
      title: 'Associated Projects',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'project'}]}], // 'project' refers to the 'name' of your Project schema
      description: 'Projects this person is involved in.',
    }),
    defineField({
      name: 'learningPaths',
      title: 'Learning Paths',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'module'}]}], // 'module' refers to the 'name' of your Module schema
      description: 'Learning modules or credentials this person has completed or is pursuing.',
    }),
    defineField({
      name: 'readyAimGoProfileId',
      title: 'ReadyAimGo Profile ID',
      type: 'string',
      // hidden: true, // You might want this to be hidden in the Studio if only used programmatically
      description: 'Internal ID for ReadyAimGo SSO integration.',
    }),
    defineField({
      name: 'composerProfile',
      title: 'Composer Profile',
      type: 'reference',
      to: [{type: 'composerProfile'}], // 'composerProfile' refers to the 'name' of your ComposerProfile schema
      description: 'Link to a Composer Profile if this person is a composer.',
    }),
    defineField({
      name: 'walletAddress',
      title: 'Wallet Address',
      type: 'string',
      description: 'Blockchain wallet address for BEAM Wallet contributions.',
      // validation: (rule) => rule.regex(/^0x[a-fA-F0-9]{40}$/, {name: 'Ethereum address'}).optional(), // Example for Ethereum format
    }),
    defineField({
      name: 'reputationScore',
      title: 'Reputation Score',
      type: 'number',
      description: 'Calculated score based on contributions and activities.',
      readOnly: true, // Typically set by backend/system, not manually in Studio
      initialValue: 0,
    }),
    defineField({
      name: 'childDevelopmentLogs',
      title: 'Child Development Logs',
      type: 'array',
      of: [{type: 'childDevelopmentLogEntry'}], // This refers to the object type you'd create
      description: 'Log entries for child development tracking related to learning paths.',
    }),
    defineField({
      name: 'picture',
      title: 'Picture',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            // Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
            return rule.custom((alt, context) => {
              if ((context.document?.picture as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        }),
      ],
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      validation: (rule) => rule.required(),
    }),
  ],
  // List preview configuration. https://www.sanity.io/docs/previews-list-views
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      picture: 'picture',
      email: 'email',
      role: 'role',
    },
    prepare(selection) {
    const title = `${selection.firstName || ''} ${selection.lastName || ''}`.trim();
    const subtitle = selection.role ? `${selection.role} | ${selection.email || 'No Email'}` : selection.email || 'Person';
    return {
      title: title || 'Untitled Person', // Handle cases where names might be empty
      subtitle: subtitle,
      media: selection.picture,
    }
  },
},
})
