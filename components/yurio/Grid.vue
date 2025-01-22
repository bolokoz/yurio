<template>
    <div class="bg-surface-0 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20 text-center">
        <div class="mb-4 font-bold text-3xl">
            <span class="text-surface-900 capitalize dark:text-surface-0">{{ route.path.split('/')[1] }}: </span>
            <span class="text-primary-600  capitalize dark:text-primary-400">{{ route.path.split('/')[2] }}</span>
        </div>
        <!-- <div class="text-surface-700 dark:text-surface-0/70 mb-[3rem]">Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna.</div> -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3.5 gap-y-6">
            <div v-for="item in props" class="w-full p-4">
                <div class="text-surface-900 dark:text-surface-0 text-xl mb-2 font-medium">{{ item[0].title }}</div>
                <p class="text-surface-700 dark:text-surface-0/70 leading-normal max-w-sm mx-auto text-center">{{ item[0].title }}</p>
            </div>
            
        </div>
    </div>
</template>
<script setup>

const route = useRoute()

const props = defineProps(['items'])

</script>
