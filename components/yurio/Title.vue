<template>
    <div class="bg-surface-0 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
        <div class="text-surface-700 dark:text-surface-100 text-center">
            <div class="text-primary font-bold mb-4"><i class="pi pi-info" />&nbsp;{{ subtitle }}</div>
            <div class="text-surface-900 capitalize dark:text-surface-0 font-bold text-5xl mb-4">{{title}}</div>
            <!-- <div class="text-surface-700 dark:text-surface-100 text-2xl mb-8">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</div> -->
            <NuxtLink :to="`https://github.com/bolokoz/yurio/tree/main/${route.fullPath}`"  target="_blank" rel="noopener">
            <Button label="Edit in Github" icon="pi pi-github" raised rounded class="font-bold px-8 py-4 whitespace-nowrap" />
            </NuxtLink> 
        </div>
    </div>
</template>
<!-- :to=`github.com/bolokoz/yurio/${path}` -->
<script setup lang="ts">
const route = useRoute()
const { title = 'Categoria', subtitle } = defineProps<{title?:string,subtitle?:string}>()
</script>
