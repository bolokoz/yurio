
<script setup>
const { data: posts } = await useAsyncData('timeline-posts', () => {
  return queryCollection("content")
    .where('publish', '=', true)
    .order('date', 'DESC')
    .all()
});

const events = computed(() => {
  return posts.value?.map(post => ({
    date: new Date(post.date).toLocaleDateString('pt-BR'),
    icon: 'pi pi-calendar',
    color: '#673AB7',
    content: {
      title: post.title,
      description: post.description,
      path: post.path,
      tags: post.tags
    }
  })) || [];
});
</script>

<template>
  <div class="card">
    <Timeline :value="events" class="w-full md:w-20rem">
      <template #content="slotProps">
        <NuxtLink :to="slotProps.item.content.path" class="no-underline">
          <Card class="mb-3 cursor-pointer hover:shadow-lg transition-shadow">
            <template #title>
              <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
                {{ slotProps.item.content.title }}
              </h3>
            </template>
            <template #content>
              <p class="text-surface-600 dark:text-surface-400">
                {{ slotProps.item.content.description }}
              </p>
              <div class="flex gap-2 mt-2">
                <Tag v-for="tag in slotProps.item.content.tags" 
                     :key="tag" 
                     :value="tag"
                     severity="info"
                     rounded />
              </div>
            </template>
          </Card>
        </NuxtLink>
      </template>
      <template #opposite="slotProps">
        <small class="text-surface-500 dark:text-surface-400">
                {{ slotProps.item.date }}
              </small>
      </template>
    </Timeline>
  </div>
</template>