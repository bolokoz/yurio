import { Client } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({
  auth: process.env.NOTION_API_KEY
})

export default defineEventHandler(async () => {
  try {
    // First, get database schema
    const database = await notion.databases.retrieve({
      database_id: '51eefa6fc5f34e568d9905293d012bd7'
    })

    // Get all database properties
    const propertyTypes = {}
    Object.entries(database.properties).forEach(([propertyName, propertyValue]) => {
      propertyTypes[propertyName] = propertyValue.type
    })

    // Then get the actual data
    const response = await notion.databases.query({
      database_id: '51eefa6fc5f34e568d9905293d012bd7',
      sorts: [
        {
          property: 'Name',
          direction: 'ascending',
        },
      ],
    })

    return {
      schema: propertyTypes,
      items: response.results.map((page) => {
        const typedPage = page as PageObjectResponse
        if (!('properties' in typedPage)) return null
        
        return {
          properties: typedPage.properties,
          id: typedPage.id,
          createdTime: typedPage.created_time,
          lastEditedTime: typedPage.last_edited_time
        }
      }).filter(Boolean)
    }
  } catch (error) {
    console.error('Error fetching from Notion:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching wine data'
    })
  }
})