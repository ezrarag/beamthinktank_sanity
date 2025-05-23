import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const walletTransaction = defineType({
  name: 'walletTransaction',
  title: 'Wallet Transaction',
  icon: DocumentIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'Transaction Type',
      type: 'string',
      options: {
        list: [
          {title: 'Contribution', value: 'contribution'},
          {title: 'Distribution', value: 'distribution'},
          {title: 'Payment', value: 'payment'},
          {title: 'Refund', value: 'refund'},
          // Add other types as needed
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      options: {
        list: [
          {title: 'USD', value: 'usd'},
          {title: 'RGB Coin', value: 'rgb'},
          // Add other currencies as needed
        ],
        layout: 'dropdown',
      },
      initialValue: 'usd',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'timestamp',
      title: 'Timestamp',
      type: 'datetime',
      initialValue: (new Date()).toISOString(), // Defaults to current time
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'fromPerson',
      title: 'From (Person)',
      type: 'reference',
      to: [{type: 'person'}], // Reference to 'person' schema
      description: 'The person initiating the transaction.',
    }),
    defineField({
      name: 'toPerson',
      title: 'To (Person)',
      type: 'reference',
      to: [{type: 'person'}], // Reference to 'person' schema
      description: 'The person receiving the transaction.',
    }),
    defineField({
      name: 'relatedProject',
      title: 'Related Project',
      type: 'reference',
      to: [{type: 'project'}], // Reference to 'project' schema
      description: 'The project this transaction is associated with.',
    }),
    defineField({
      name: 'isPublic',
      title: 'Is Public',
      type: 'boolean',
      initialValue: false,
      description: 'Whether this transaction should be visible on a public ledger.',
    }),
  ],
  preview: {
    select: {
      type: 'type',
      amount: 'amount',
      currency: 'currency',
      timestamp: 'timestamp',
      fromPersonName: 'fromPerson.firstName',
      toPersonName: 'toPerson.firstName',
    },
    prepare(selection) {
      const {type, amount, currency, timestamp, fromPersonName, toPersonName} = selection
      const title = `${type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Untitled Transaction'}`
      const subtitle = [
        amount ? `${amount} ${currency ? currency.toUpperCase() : ''}` : '',
        timestamp ? new Date(timestamp).toLocaleDateString() : '',
        fromPersonName && toPersonName ? `from ${fromPersonName} to ${toPersonName}` : '',
      ].filter(Boolean).join(' | ')
      return {
        title: title,
        subtitle: subtitle,
        media: DocumentIcon,
      }
    },
  },
})