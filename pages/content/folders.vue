<script setup>
const { data: posts } = await useAsyncData('all-posts', () => {
  return queryCollection("content")
    .where('publish', '=', 'true')
    .all()
});

const folderGroups = computed(() => {
  if (!posts.value) return [];
  
  // Create map of folders with their posts
  const folderMap = new Map();
  
  posts.value.forEach(post => {
    // Extract folder from path (everything before the last slash)
    const folder = post.path.split('/').slice(0, -1).join('/');
    const folderName = folder.split('/').pop() || 'root'; // Get last folder name
    
    if (!folderMap.has(folderName)) {
      folderMap.set(folderName, []);
    }
    folderMap.get(folderName).push(post);
  });

  // Convert to array and sort by folder name
  return Array.from(folderMap.entries())
    .map(([folder, posts]) => ({
      folder,
      posts,
      count: posts.length
    }))
    .sort((a, b) => a.folder.localeCompare(b.folder));
});

const selectedFolder = ref(null);

const toggleFolder = (folder) => {
  selectedFolder.value = selectedFolder.value === folder ? null : folder;
};

// Get folder icon based on name
const getFolderIcon = (folderName) => {
  const iconMap = {
    vinhos: 'pi pi-glass',
    parmegianologo: 'pi pi-star',
    dev: 'pi pi-code',
    ideas: 'pi pi-lightbulb',
    projects: 'pi pi-folder',
    blogs: 'pi pi-pencil',
    linguagens: 'pi pi-globe',
    default: 'pi pi-folder'
  };
  
  return iconMap[folderName.toLowerCase()] || iconMap.default;
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Folder Buttons -->
    <div class="mb-12 my-12">
      <h2 class="text-2xl font-bold mb-6 text-surface-900 dark:text-surface-0">Content Folders</h2>
      <div class="flex flex-wrap gap-3">
        <Button 
          v-for="group in folderGroups" 
          :key="group.folder"
          :label="`${group.folder} (${group.count})`"
          :severity="selectedFolder === group.folder ? 'primary' : 'secondary'"
          :outlined="selectedFolder !== group.folder"
          class="transition-all"
          @click="toggleFolder(group.folder)"
        >
          <template #icon>
            <i :class="getFolderIcon(group.folder)" class="mr-2"></i>
          </template>
        </Button>
      </div>
    </div>

    <!-- Posts by Folder -->
    <div v-if="selectedFolder" class="space-y-6 my-12">
      <h3 class="text-xl font-semibold mb-4 text-surface-900 dark:text-surface-0">
        <i :class="getFolderIcon(selectedFolder)" class="mr-2"></i>
        Content in "{{ selectedFolder }}"
      </h3>
      
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLink 
          v-for="post in folderGroups.find(g => g.folder === selectedFolder).posts"
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
          <div class="flex items-center justify-between text-sm text-surface-500">
            <div class="flex items-center">
              <i class="pi pi-calendar mr-2"></i>
              {{ new Date(post.date).toLocaleDateString("pt-BR") }}
            </div>
            <div class="flex gap-1">
              <Tag 
                v-for="tag in post.tags" 
                :key="tag" 
                :value="tag" 
                severity="info" 
                rounded
              />
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- All Folders List -->
    <div v-else class="space-y-12">
      <div v-for="group in folderGroups" :key="group.folder" class="border-b border-surface-200 dark:border-surface-700 pb-8">
        <div class="flex items-center justify-between my-12">
          <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
            <i :class="getFolderIcon(group.folder)" class="mr-2"></i>
            {{ group.folder }}
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
            <div class="flex items-center justify-between text-sm text-surface-500">
              <div class="flex items-center">
                <i class="pi pi-calendar mr-2"></i>
                {{ new Date(post.date).toLocaleDateString("pt-BR") }}
              </div>
              <div class="flex gap-1">
                <Tag 
                  v-for="tag in post.tags" 
                  :key="tag" 
                  :value="tag" 
                  severity="info" 
                  rounded
                />
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
