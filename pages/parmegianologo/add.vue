<script setup lang="ts">

import { Form } from '@primevue/forms';

definePageMeta({
    middleware: 'auth'
});

const restaurantes = ref();
const selectedRestaurante = ref();
const filteredRestaurantes = ref();
const toast = useToast();

const initialValues = ref({
    country: { name: '' }
});

interface Restaurante {
    id: number
    nome: string;
}

const client = useSupabaseClient()
const { data: dbRestaurantes } = await useAsyncData('restaurantes', async () => {
  const { data } = await client.from('restaurantes').select('*')
  return data as Restaurante[]
})
onMounted(() => {
    restaurantes.value = dbRestaurantes;
});


const search = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            filteredRestaurantes.value = [...restaurantes.value];
        } else {
            filteredRestaurantes.value = restaurantes.value.filter((restaurante: { nome: string }) => {
                return restaurante.nome.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 250);
};

const onFormSubmit = ({ valid }) => {
    if (valid) {
        toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
    }
};


</script>

<template>
    <div class="card flex justify-center">
        <Form v-slot="$form" :initialValues="initialValues" @submit="onFormSubmit" class="flex justify-center flex-col gap-4 w-full md:w-56">
            <div class="flex flex-col gap-1">
                <AutoComplete name="Restaurante" optionLabel="name" :suggestions="filteredRestaurantes" @complete="search" />
                <Message v-if="$form.restaurante?.invalid" severity="error" size="small" variant="simple">{{ $form.restaurante.error?.message }}</Message>
            </div>
            <Button type="submit" severity="secondary" label="Submit" />
        </Form>
        <Toast />
    </div>
</template>
