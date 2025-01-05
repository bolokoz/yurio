<script setup lang="ts">
const { data } = await useAsyncData("navigation", () => {
  return queryCollectionNavigation("content");
});

type TreeNode = {
  title?: string;
  label?: string;
  children?: TreeNode[];
};

function renameKeyRecursive(node: TreeNode): TreeNode {
  // Rename the title key to label
  const { title, ...rest } = node;
  const newNode: TreeNode = { ...rest, label: title };

  // Process children recursively if they exist
  if (newNode.children && Array.isArray(newNode.children)) {
    newNode.children = newNode.children.map(renameKeyRecursive);
  }

  return newNode;
}

const dataTree = renameKeyRecursive(data);

const route = useRoute();
const home = ref({
  icon: "pi pi-home",
  route: "/",
});
</script>

<template>
  <div class="bg-surface-0 dark:bg-surface-950 px-6 py-8 md:px-12 lg:px-20">

    <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We invest in the world’s potential</h1>
<p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
<a href="#" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
    Learn more
    <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
  </svg>
</a>

<Divider class="py-8" />

    <Tree :value="data"  class="w-full md:w-[30rem]">
      <template #default="slotProps">
        <NuxtLink
          :to="slotProps.node.path" 
          rel="noopener noreferrer"
          class="text-surface-700 dark:text-surface-0 hover:text-primary"
          >{{ slotProps.node.title }}</NuxtLink
        >
      </template>
    </Tree>

    <Tree :value="dataTree" />
  </div>
</template>
