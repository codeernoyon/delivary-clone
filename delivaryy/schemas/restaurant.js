export default {
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
   {
    name: 'name',
    type: 'string',
    title: 'Restaurant name',
    validation: (Rule) => Rule.required(),
   },
   {
    name: 'short_description',
    type: 'string',
    title: 'Short description',
    validation: (Rule) => Rule.max(200),
   },
   {
    name: 'image',
    type: 'image',
    title: 'Image of the Restaurant',
   },
   {
    name: 'lat',
    type: 'number',
    title: 'Latitude of the Restaurant ',
   },
   {
    name: 'long',
    type: 'number',
    title: 'Long of the Restaurant',
   },
   {
    name: 'address',
    type: 'string',
    title: 'Address of the Restaurant',
    validation: (Rule) => Rule.required(),
   },
   {
    name: 'rating',
    type: 'number',
    title: 'Enter a Rating from (1-5 Stars)',
    validation: (Rule) =>
      Rule.required()
        .max(5)
        .min(1)
        .error('please enter a value between 1 and 5')
   },
   {
    name: 'genre',
    type: 'string',
    title: 'Genre',
    validation: (Rule) => Rule.required(),
   },
   {
    name: 'type',
    type: 'reference',
    title: 'Category',
    validation: (Rule) => Rule.required(),
    to: [{ type: 'category' }]
   },
   {
    name: 'dishes',
    type: 'array',
    title: 'Dishes',
    of:[{type: 'reference', to:[{type: "dish"}] }],
   },
  ],
  }

