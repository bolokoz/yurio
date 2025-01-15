<script setup>

definePageMeta({
    middleware: 'auth'
});

const user = useSupabaseUser()
</script>

<template>
    {{ user }}
</template>