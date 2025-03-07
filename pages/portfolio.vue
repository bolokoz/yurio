<script setup>
const projects = [
  {
    title: "Parmegianologo",
    description: "A platform for discovering and rating the best parmegiana dishes",
    image: "/images/parmegianologo.jpg",
    tags: ["Vue.js", "Nuxt", "Supabase"],
    link: "/parmegianologo"
  },
  {
    title: "Engineering Calculator", 
    description: "Collection of specialized engineering calculation tools",
    image: "/images/calculator.jpg",
    tags: ["Vue.js", "Mathematics", "Engineering"],
    link: "/eng/calculadora"
  }
  // Add more projects as needed
]

const features = [
  {
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "/",
    image:
      "https://images.pexels.com/photos/2762083/pexels-photo-2762083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    cta: "Learn more",
    class: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    name: "Full text search",
    description: "Search through all your files in one place.",
    href: "/",
    image:
      "https://images.pexels.com/photos/1309766/pexels-photo-1309766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    cta: "Learn more",
    class: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    name: "Multilingual",
    description: "Supports 100+ languages and counting.",
    href: "/",
    cta: "Learn more",
    class: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    href: "/",
    cta: "Learn more",
    class: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    name: "Notifications",
    description: "Get notified when someone shares a file or mentions you in a comment.",
    href: "/",
    image:
      "https://images.pexels.com/photos/1682821/pexels-photo-1682821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    cta: "Learn more",
    class: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
]

</script>

<template>

    <!-- Hero Section -->
        <WavyBackground class="mx-auto max-w-4xl pb-40">
    <p class="inter-var text-center text-2xl font-bold text-white lg:text-7xl md:text-4xl">
      Portfolio
    </p>
    <p class="inter-var mt-4 text-center text-base font-normal text-white md:text-lg">
      Projetos concluidos e em andamento avançado
    </p>
  </WavyBackground>

  <BentoGrid class="grid w-full auto-rows-[22rem] grid-cols-3 gap-4 lg:grid-rows-3">
    <BentoGridCard
      v-for="(feature, index) in features"
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


    <!-- Projects Grid -->
    <div class="max-w-7xl mx-auto mt-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="project in projects" :key="project.title" 
             class="bg-gray-800/50 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-700">
          <div class="aspect-w-16 aspect-h-9">
            <img :src="project.image" :alt="project.title" class="object-cover w-full h-48" 
                 onerror="this.src='https://via.placeholder.com/400x225'"/>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">{{ project.title }}</h3>
            <p class="text-gray-400 mb-4">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="tag in project.tags" :key="tag" 
                    class="px-3 py-1 text-sm bg-gray-700 rounded-full text-gray-300">
                {{ tag }}
              </span>
            </div>
            <NuxtLink :to="project.link" 
                     class="inline-block px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors duration-200">
              View Project
            </NuxtLink>
          </div>
        </div>
      </div>


  </div>
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
