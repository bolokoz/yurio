<script lang="ts" setup>
const route = useRoute();

//recupera unico arquivo
const { data: content } = await useAsyncData(route.path, () => {
  return queryCollection("content").path(route.path).first()
});

//recupera todos artigos INCLUINDO SUBFOLDERS
const { data: all } = await useAsyncData('all', () => {
  return queryCollection("content")
  .where('path', 'LIKE', `${route.path}%`)
  // .andWhere(query => query.where('path', '<>', `${route.path}/%`))
  .all()
});

//elimina artigos em subfolders
const filtered = computed (() => {
  const regex = new RegExp(`^${route.path}\/[^/]+$`);
  return all.value ? all.value.filter(item => regex.test(item.path)) : []
})

const { data: surround } = await useAsyncData('documents-list', () => {
  return queryCollectionItemSurroundings('content', route.path)
})

</script>

<template>
  <div v-if="content">
    <YurioTitle 
      :title="content.title"
      :subtitle="content.description"
    ></YurioTitle>

    <ContentRenderer v-if="content" :value="content">
      
      <h2>{{ content.title }}</h2>
      <p>{{ content.description }}</p>
      
      
      <div class="flex justify-between">
        <NuxtLink v-if="surround?.[0]" :to="surround[0].path">
          ← {{ surround[0].title }}
        </NuxtLink>
        <NuxtLink v-if="surround?.[1]" :to="surround[1].path">
        {{ surround[1].title }} →
      </NuxtLink>
      
    </div>
  </ContentRenderer>
</div>
  <!-- if multiple found -> its a folder -->
  <div v-if="filtered.length > 1">
    <YurioTitle :title="route.path.split('/')[2]" subtitle="Notas" :path="route.fullPath"></YurioTitle>
    <Menu :model="filtered">
    <template #item="{ item, props }">
        <NuxtLink v-if="item.path" v-slot="{ href, navigate }" :to="item.path" custom>
            <a v-ripple :href="href" v-bind="props.action">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.title }}</span>
            </a>
        </NuxtLink>
    </template>
</Menu>
  </div>
  <div v-else-if="!content">
    <div class="min-h-screen flex items-center justify-center bg-gray-200">
      Not found
    </div>
  </div>
</template>
