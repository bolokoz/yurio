
<script setup>
const { data: posts } = await useAsyncData('all-posts', () => {
  return queryCollection("content")
    .where('publish', '=', 'true')
    .all()
});

const tagGroups = computed(() => {
  if (!posts.value) return [];
  
  // Create map of tags with their posts
  const tagMap = new Map();
  
  posts.value.forEach(post => {
    post.tags?.forEach(tag => {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, []);
      }
      tagMap.get(tag).push(post);
    });
  });

  // Convert to array and sort by number of posts
  return Array.from(tagMap.entries())
    .map(([tag, posts]) => ({
      tag,
      posts,
      count: posts.length
    }))
    .sort((a, b) => b.count - a.count);
});

const selectedTag = ref(null);

const toggleTag = (tag) => {
  selectedTag.value = selectedTag.value === tag ? null : tag;
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Tag Cloud -->
    <div class="mb-12">
      <h2 class="text-2xl font-bold mb-6 text-surface-900 dark:text-surface-0">Popular Tags</h2>
      <div class="flex flex-wrap gap-3">
        <Button 
          v-for="group in tagGroups" 
          :key="group.tag"
          :label="`${group.tag} (${group.count})`"
          :severity="selectedTag === group.tag ? 'primary' : 'secondary'"
          :outlined="selectedTag !== group.tag"
          class="transition-all"
          @click="toggleTag(group.tag)"
        />
      </div>
    </div>

    <!-- Posts by Tag -->
    <div v-if="selectedTag" class="space-y-6">
      <h3 class="text-xl font-semibold mb-4 text-surface-900 dark:text-surface-0">
        Posts tagged with "{{ selectedTag }}"
      </h3>
      
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLink 
          v-for="post in tagGroups.find(g => g.tag === selectedTag).posts"
          :key="post.path"
          :to="post.path"
          class="block bg-surface-50 dark:bg-surface-800 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h4 class="text-lg font-semibold mb-2 text-surface-900 dark:text-surface-0">
            {{ post.title }}
          </h4>
          <p class="text-surface-600 dark:text-surface-400 text-sm mb-3 line-clamp-2">
            {{ post.description }}
          </p>
          <div class="flex items-center text-sm text-surface-500">
            <i class="pi pi-calendar mr-2"></i>
            {{ new Date(post.date).toLocaleDateString("pt-BR") }}
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- All Tags List -->
    <div v-else class="space-y-12">
      <div v-for="group in tagGroups" :key="group.tag" class="border-b border-surface-200 dark:border-surface-700 pb-8">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
            {{ group.tag }}
          </h3>
          <Badge :value="group.count" severity="info" />
        </div>
        
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <NuxtLink 
            v-for="post in group.posts"
            :key="post.path"
            :to="post.path"
            class="block bg-surface-50 dark:bg-surface-800 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h4 class="text-lg font-semibold mb-2 text-surface-900 dark:text-surface-0">
              {{ post.title }}
            </h4>
            <p class="text-surface-600 dark:text-surface-400 text-sm mb-3 line-clamp-2">
              {{ post.description }}
            </p>
            <div class="flex items-center text-sm text-surface-500">
              <i class="pi pi-calendar mr-2"></i>
              {{ new Date(post.date).toLocaleDateString("pt-BR") }}
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>