<script setup lang="ts">
const { data } = await useAsyncData("navigation", async () => {
  const res = await queryCollectionNavigation("content");
  console.log(res);
  return transformData(res[0].children);
});

type TreeNode = {
  title?: string;
  label?: string;
  children?: TreeNode[];
};


function transformData(data) {
    return data.map(item => {
        const menuItem = {
            label: item.title,
            route: item.path
        };

        if (item.children) {
            menuItem.items = transformData(item.children);
            menuItem.icon = 'pi pi-folder'; // Example icon for folders
        } else {
            menuItem.route = item.path;
            menuItem.icon = 'pi pi-file'; // Example icon for files
        }
        return menuItem;
    });
}

function transformMenu(item) {
  // Create the base object with label
  const output = { label: item.title };

  // Check if the item has children; if so, transform them recursively.
  if (item.children && Array.isArray(item.children) && item.children.length > 0) {
    output.icon = 'pi pi-folder'; // default icon for container items
    // output.items = item.children.map(child => transformMenu(child));
  } else {
    // Leaf item; add the route property using the item's path.
    output.route = item.path;
  }

  return output;
}

const route = useRoute();
const home = ref({
  icon: "pi pi-home",
  route: "/",
});
</script>

<template>
  <div class="bg-surface-0 dark:bg-surface-950 px-6 py-8 md:px-12 lg:px-20">

    <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Anotações</h1>
<p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Bando de coisa</p>
<!-- <a href="#" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
    Learn more
    <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
  </svg>
</a> -->

<Divider class="py-8" />

  <TieredMenu :model="data">
    <template #item="{ item, props, hasSubmenu }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                    <span v-if="hasSubmenu" class="pi pi-angle-right ml-auto" />
                </a>
            </template>
  </TieredMenu>

    <!-- <Tree :value="dataTree" /> -->
  </div>
</template>
