<script setup lang="ts">
// Get data from API
const { data: wineData } = await useFetch('/api/wines')

// Log schema to create interface
console.log('Wine Schema:', wineData.value?.schema)

// Define Wine interface based on Notion properties
interface NotionText {
  plain_text: string
  annotations?: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  href?: string | null
}

interface NotionFile {
  file: {
    url: string
    expiry_time?: string
  }
  name: string
  type: 'file'
}

interface Wine {
  id: string
  properties: {
    Name: {
      type: 'title'
      title: NotionText[]
    }
    'Year do lote': {
      type: 'number'
      number: number
    }
    Description: {
      type: 'rich_text'
      rich_text: NotionText[]
    }
    'Data consumida': {
      type: 'date'
      date: {
        start: string
        end?: string
      }
    }
    Uva: {
      type: 'multi_select'
      select: {
        name: string
        color?: string
      }
    }
    Foto: {
      type: 'files'
      files: NotionFile[]
    }
    'Mais valia': {
      type: 'select'
      select: {
        name: string
        color?: string
      }
    }
    'Valor no local': {
      type: 'number'
      number: number
    }
    Country: {
      type: 'select'
      select: {
        name: string
        color?: string
      }
    }
    Producer: {
      type: 'select'
      select: {
        name: string
        color?: string
      }
    }
    Rating: {
      type: 'select'
      select: {
        name: string
        color?: string
      }
    }
  }
}

// Computed property for schema
const schema = computed(() => {
  if (!wineData.value?.schema) return {}
  return wineData.value.schema
})

// Computed property for items with type
const wines = computed((): Wine[] => {
  if (!wineData.value?.items) return []
  return wineData.value.items as unknown as Wine[]
})

// Helper function to get property value based on type
const getPropertyValue = (property: any, type: string): string => {
  if (!property) return '-'
  
  switch (type) {
    case 'title':
      return property.title[0]?.plain_text || '-'
    case 'rich_text':
      return property.rich_text[0]?.plain_text || '-'
    case 'number':
      return property.number?.toString() || '0'
    case 'select':
      return property.select?.name || '-'
    case 'multi_select':
      return property.multi_select?.map((tag: { name: string }) => tag.name).join(', ') || '-'
    case 'url':
      return property.url || '-'
    case 'date':
      return property.date?.start || '-'
    default:
      return property[type] || '-'
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-purple-900 to-purple-700">
    <!-- Hero Section -->
    <WavyBackground class="mx-auto max-w-4xl pb-20">
      <h1 class="inter-var text-center text-5xl font-bold text-white lg:text-7xl md:text-7xl">
        Wine Ratings
      </h1>
      <p class="inter-var mt-4 text-center text-base font-normal text-white/80 md:text-lg">
        My personal wine tasting journey and ratings
      </p>
    </WavyBackground>

    <!-- Wine Grid -->
    <div class="container mx-auto px-4 py-8">
      <BentoGrid>
        <BentoGridItem 
          v-for="wine in wines" 
          :key="wine.id"
          class="md:col-span-1"
        >
          <!-- Header with Rating -->
          <template #header>
            <div class="flex items-center justify-between">
              <!-- Rating Stars -->
              <div class="flex gap-1">
                <span v-for="i in Number(getPropertyValue(wine.properties.Rating, 'number'))" :key="i"
                  class="text-yellow-400">★</span>
                <span v-for="i in 3 - Number(getPropertyValue(wine.properties.Rating, 'number'))" :key="i"
                  class="text-gray-400">★</span>
              </div>
              <!-- Price -->
              <span class="text-sm font-medium">
                R$ {{ getPropertyValue(wine.properties['Valor no local'], 'number') }}
              </span>
            </div>
          </template>

          <!-- Wine Icon -->
          <template #icon>
            <div class="flex items-center gap-2">
              <span class="text-2xl">🍷</span>
              <span class="text-xs px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-200">
                {{ getPropertyValue(wine.properties.Uva, 'select') }}
              </span>
            </div>
          </template>

          <!-- Wine Name -->
          <template #title>
            {{ getPropertyValue(wine.properties.Name, 'title') }}
          </template>

          <!-- Wine Description -->
          <template #description>
            <div class="space-y-3">
              <p class="line-clamp-2 text-sm">
                {{ getPropertyValue(wine.properties.Producer, 'rich_text') }}
              </p>
              <!-- Tags -->
              <div class="flex flex-wrap gap-1">
                <p class="line-clamp-2 text-sm">
                {{ getPropertyValue(wine.properties['Year do lote'], 'rich_text') }}
              </p>
              </div>
            </div>
          </template>
        </BentoGridItem>
      </BentoGrid>
    </div>
  </div>
</template>

<style scoped>
.inter-var {
  font-variation-settings: 'wght' 400;
}
</style>
