<script setup>
import { onMounted, ref, watch } from 'vue';
import { useLayout } from "~~/layouts/composables/layout.js";
import { Motion } from "motion-v";

const route = useRoute();


const { getPrimary, getSurface, isDarkTheme } = useLayout();

// Replace the static timelinePosts with dynamic content

const { data: timelinePosts } = await useAsyncData('latest', () => {
  return queryCollection("content").where('publish', '=', true).order('date', 'DESC').limit(5).all()
});

const { data: featuredPosts2 } = await useAsyncData('featured', () => {
  return queryCollection("content").where('featured', '=', true).order('date', 'DESC').limit(3).all()
});


// Floating shapes animation
const shapes = ref([]);
onMounted(() => {
  createShapes();
});

function createShapes() {
  const shapeTypes = ['circle', 'triangle', 'square', 'pentagon'];
  const colorClasses = {
    primary: 'bg-primary-500/20 dark:bg-primary-400/10',
    secondary: 'bg-secondary-500/20 dark:bg-secondary-400/10',
    success: 'bg-green-500/20 dark:bg-green-400/10',
    info: 'bg-blue-500/20 dark:bg-blue-400/10',
    warning: 'bg-orange-500/20 dark:bg-orange-400/10'
  };

  shapes.value = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
    colorClass: Object.values(colorClasses)[Math.floor(Math.random() * Object.keys(colorClasses).length)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 20 + Math.random() * 40,
    speed: 0.5 + Math.random() * 2,
    direction: Math.random() * Math.PI * 2
  }));
}

watch([getPrimary, getSurface, isDarkTheme], () => {
  // Update theme-dependent styles if needed
});
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-surface-0 dark:bg-surface-900">
    <!-- Floating Shapes -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div v-for="shape in shapes" :key="shape.id" :class="[
        'absolute transform transition-transform ease-linear animate-float blur-sm',
        shape.colorClass,
        shape.type === 'circle' ? 'rounded-full' :
          shape.type === 'triangle' ? 'clip-triangle' :
            shape.type === 'square' ? 'rounded-lg' : 'clip-pentagon'
      ]" :style="{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            animationDelay: `${shape.id * -2}s`,
            opacity: '0.5'
          }">
      </div>
    </div>

    <div class="relative flex h-96 flex-col items-center justify-center">
      <FallingStarsBg class="dark:bg-black" />
      <div class="z-[1] flex items-center">
        <span class="text-6xl font-bold bg-gradient-to-r from-primary-500 to-secondary-200 animate-fade-in">Boloko
          blog</span>
      </div>
    </div>


    <div class="relative z-10 container mx-auto px-4 py-16">
      <!-- <div class="text-center mb-16">
        <h1 class="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent animate-fade-in">
          Boloko blog
        </h1>
        <p class="text-xl text-surface-600 dark:text-surface-400 animate-slide-up">
          Tentando evitar meu alzheimer
        </p>
      </div> -->

      <!-- Featured Posts -->
      <div class="mb-20">
        <h2 class="text-3xl font-bold mb-8 text-surface-900 dark:text-surface-0">Featured Posts</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- <YurioCardRotation
            v-for="(post, index) in featuredPosts2"
            :key="index"
            :post="post"
          /> -->
          <NuxtLink v-for="(post, index) in featuredPosts2" :key="index" :to="post.path"
            class="group bg-surface-50 dark:bg-surface-800 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div class="relative h-48 overflow-hidden">
              <img :src="post.cover" :alt="post.title"
                class="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110">
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div class="p-6">
              <Tag v-for="(tag, index) in post.tags" value="Primary" rounded> {{ tag }}</Tag>
              <h3 class="text-xl font-bold mb-2 text-surface-900 dark:text-surface-0">{{ post.title }}</h3>
              <p class="text-surface-600 dark:text-surface-400 mb-4">{{ post.description }}</p>
              <div class="flex items-center text-sm text-surface-500 dark:text-surface-400">
                <i class="pi pi-calendar mr-2"></i>
                {{ new Date(post.date).toLocaleDateString() }}
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <h2 class="text-3xl font-bold mb-8 text-surface-900 dark:text-surface-0">Latest Posts</h2>
        <div class="relative pl-8 border-l-2 border-primary-500 space-y-10">
          <div v-for="post in timelinePosts" :key="post.path"
            class="relative transform transition-all duration-300 hover:-translate-y-1">
            <div
              class="absolute -left-10 mt-1.5 h-4 w-4 rounded-full border-2 border-primary-500 bg-surface-0 dark:bg-surface-900">
            </div>
            <NuxtLink :to="post.path"
              class="block bg-surface-50 dark:bg-surface-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <span
                class="inline-block bg-secondary-500/20 dark:bg-secondary-400/10 text-secondary-700 dark:text-secondary-400 text-sm font-medium px-3 py-1 rounded-full mb-2">
                {{ post.tags[0] || '' }}
              </span>
              <h3 class="text-lg font-semibold mb-2 text-surface-900 dark:text-surface-0">{{ post.title }}</h3>
              <p v-if="post.description" class="text-surface-600 dark:text-surface-400 mb-2 line-clamp-2">
                {{ post.description }}
              </p>
              <div class="flex items-center text-sm text-surface-500 dark:text-surface-400">
                <i class="pi pi-calendar mr-2"></i>
                {{ new Date(post.date).toLocaleDateString("pt-BR") }}
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-float {
  animation: float 20s linear infinite;
  will-change: transform;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-slide-up {
  animation: slideUp 1s ease-out;
}

.clip-triangle {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.clip-pentagon {
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }

  25% {
    transform: translate(50px, 50px) rotate(90deg) scale(1.1);
  }

  50% {
    transform: translate(100px, 0px) rotate(180deg) scale(1);
  }

  75% {
    transform: translate(50px, -50px) rotate(270deg) scale(0.9);
  }

  100% {
    transform: translate(0, 0) rotate(360deg) scale(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
