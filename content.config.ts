import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: {
        include: '**/*.md',
        prefix: '/content/',
      },
      schema: z.object({
        tags: z.array(z.string()),
        cover: z.string(),
        date: z.date(),
        title: z.string(),
        description: z.string(),
        publish: z.union([
          z.literal('true').transform(() => true),
          z.literal('false').transform(() => false),
          z.boolean(),
        ]),
      })
    })
  }
})

    