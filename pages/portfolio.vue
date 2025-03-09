<script setup>

// Get features from published content in projects folder
const { data: publishedFeatures } = await useAsyncData('projects', () => {
  return queryCollection("content")
    .where('publish', '=', 'true')
    .all()
})
// Transform content data into features format
const contentFeatures = computed(() => {
  if (!publishedFeatures.value) return []
  
  return publishedFeatures.value
    .filter(content => content.path.startsWith('/content/projects/'))
    .map(content => ({
      name: content.title,
      description: content.description,
      href: content.path,
      image: content.cover,
      tags: content.tags,
      cta: "Learn more",
      class: content.class || ""
    }))
})


</script>

<template>

    <!-- Hero Section -->
    <WavyBackground class="mx-auto max-w-4xl pb-40">
    <p class="inter-var text-center text-5xl font-bold text-white lg:text-7xl md:text-7xl flex items-center justify-center min-h-[10vh]">
      Portfolio
    </p>
    <p class="inter-var mt-4 text-center text-base font-normal text-white md:text-lg">
      Projetos concluidos ou em andamento avançado
    </p>
  </WavyBackground>

  <BentoGrid class="grid w-full auto-rows-[22rem] grid-cols-3 gap-4 lg:grid-rows-3">
    <BentoGridCard
      v-for="(feature, index) in contentFeatures"
      :key="index"
      v-bind="feature"
      :class="feature.class"
    >
      <template
        v-if="feature.image"
        #background
      >
        <div
          class="absolute right-0 top-0 size-full bg-center opacity-40 transition duration-150 ease-in-out group-hover:opacity-20"
          :style="`background-image: url('${feature.image}')`"
        ></div>
      </template>
    </BentoGridCard>
  </BentoGrid>

</template>

<style scoped>
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%;
}

.aspect-w-16 > img {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
