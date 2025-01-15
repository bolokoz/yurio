<template>
    <div>
        id = {{ id }}
        {{ review }}
        
            <Card>
                <template #header>
                    <h2>{{ review?.prato }}</h2>
                </template>
                <template #content>
                    <p><strong>ID:</strong> {{ id }}</p>
                    <p><strong>Review:</strong> {{ review?.restaurante }}</p>
                </template>
            </Card>


    </div>
</template>

<script setup>

const client = useSupabaseClient()
const route = useRoute();
const id = route.params.id;
const review = ref()

onMounted(async () => {
    // Fetch the review data from your API or data source
    review.value = await client.from('parmegianas').select('*').eq('id', id).data
});
</script>

<style scoped>
/* Add your styles here */
</style>