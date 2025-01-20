<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})


</script>

<template>
  <ContentRenderer v-if="page" :value="page" />
  <div v-else>
    <div class="min-h-screen flex items-center justify-center bg-gray-200">
      Not found
    </div>
  </div>
</template>