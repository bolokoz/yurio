<script setup>
import { ref } from "vue";

import AppMenuItem from "./AppMenuItem.vue";
import { PanelMenu } from "primevue";

const { data: contentNavigation } = await useAsyncData("navigation", () => {
  return queryCollectionNavigation("content");
});
const menuItens = computed(() => {
  //   console.log("value", contentNavigation.value[0]);
  // Ensure data is available and has the expected structure
  if (
    !contentNavigation.value[0] ||
    !Array.isArray(contentNavigation.value[0].children)
  )
    return null;


  let children = contentNavigation.value[0].children.map((item) => ({
    label: item.title,
    to: item.path, // Use a fallback to avoid accessing undefined
  }))

  return [{
    label: contentNavigation.value[0].title,
    items: children,
  }];
});

// const transformedData = data[0].map(({title, children}) => ({
//     label: title,
//     itens: children
// }))

const model = ref([
  {
    label: "Home",
    items: [
      { label: "Home", icon: "pi pi-fw pi-home", to: "/" },
      {
        label: "Notes", icon: "pi pi-fw pi-book",
        items: [
          { label: "Tags", icon: "pi pi-fw pi-book", to: "/content/tags" },
          { label: "Timeline", icon: "pi pi-fw pi-book", to: "/content/timeline" },
        ]
      },
      { label: "Portfolio", icon: "pi pi-fw pi-home", to: "/portfolio" },

    ],
  },
  {
    label: "Projetos atuais",

    items: [{
      label: "Parmegianologo",
      icon: "pi pi-fw pi-heart-fill",
      to: "/parmegianologo",
    },
    ]
  },
  {
    label: "Mini apps",
    items: [
      {
        label: "Engenharia",
        icon: "pi pi-fw pi-user",
        items: [
          {
            label: "Calculadora",
            icon: "pi pi-fw pi-sign-in",
            to: "/eng/calculadora",
          },
          {
            label: "teste",
            icon: "pi pi-fw pi-sign-in",
            to: "/eng/test",
          },
          {
            label: "Calculadora",
            icon: "pi pi-fw pi-sign-in",
            to: "/eng/estimativa_koeroga",
          },
        ],
      },
    ],
  },

]);
</script>

<template>
  <ul class="layout-menu">
    <!-- <PanelMenu :model="menuItens" class="w-full md:w-20rem">
        <template #item="{ item }">
                <NuxtLink :to="item.to">
                    <span class="ml-2 text-color">{{ item.label }}</span>
                </NuxtLink>
            </template>
</PanelMenu> -->
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
    <!-- <template v-for="(item, i) in menuItens" :key="item">
      <app-menu-item
        v-if="!item.separator"
        :item="item"
        :index="i"
      ></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template> -->
  </ul>
</template>

<style lang="scss" scoped></style>
