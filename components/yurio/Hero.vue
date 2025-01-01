<script setup>

const props = defineProps({
    title: String,
    subtitle: String,
    title3: String,
    description: String,
    button1: String,
    image: String,
    changelog: Array
})


</script>

<template>
    <Card style="width: 25rem; overflow: hidden">
        <template v-if="image" #header>
            <img alt="user header" :src="image" />
        </template>
        <template #title>{{ title }}</template>
        <template #subtitle>{{ subtitle }}</template>
        <template #content>
            <p class="m-0">
                {{description}}
            </p>
        </template>
        <template #footer>
            <div class="flex gap-4 mt-1">
                <Button v-if="button1" :label="button1" severity="secondary" outlined class="w-full" />
                <Button v-if="button2" :label="button2" class="w-full" />
            </div>
            <div v-if="changelog">
                <Panel header="Changelogs" toggleable collapsed>
    <p class="m-0">
        <ul>
            <li v-for="item in changelog" :key="item.date">
                <strong>{{ item.date }}</strong> - {{ item.description }}
            </li>
        </ul>
    </p>
</Panel>
            </div>
        </template>
    </Card>
</template>



