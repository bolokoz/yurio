<script setup lang="ts">
import { TextareaStyle } from 'primevue';


interface Restaurante {
    id?: number;
    nome: string;
}

definePageMeta({
    middleware: 'auth'
});

const restaurantes = ref<any[]>([]);
const selectedRestaurante = ref<Restaurante | null>({ nome: '' });
const filteredRestaurantes = ref<Restaurante[]>([]);
const toast = useToast();


// const initialValues = ref({
//     restaurante: { id:'',name: '' }
// });

interface Restaurante {
    id?: number;
    nome: string;
}

const client = useSupabaseClient<{
    restaurantes: Restaurante;
}>()
// function getRestaurants() {
//     return client.from('restaurantes').select('*')
// }
async function fetchRestaurants() {
    const { data, error } = await client.from('restaurantes').select('*');
    if (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
    } else {
        restaurantes.value = data || [];
    }
    return data;
}

// const {data: dbRestaurantes, error} = await useAsyncData('restaurants', async () => getRestaurants().then(res => res.data))

onMounted(() => {
    fetchRestaurants()
});

const search = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            filteredRestaurantes.value = [...restaurantes.value];
        } else {
            filteredRestaurantes.value = restaurantes.value.filter((restaurante) => {
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

const onAdvancedUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

const addRestaurantModal = ref(false);

const addRestaurant = async () => {
    if (selectedRestaurante.value) {
        const { data, error } = await client
        .from('restaurantes')
        .insert({ nome: selectedRestaurante.value }).select();
        if (error) {
            toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        } else {
            console.log(data)
            fetchRestaurants()
            selectedRestaurante.value = data[0]
            toast.add({ severity: 'success', summary: 'Success', detail: `Restaurante ${data[0]}com sucesso`, life: 3000 });
        }
    }
    addRestaurantModal.value = false;
}

</script>

<template>
    <div class="card flex justify-center">
        
        <Form v-slot="$form" @submit="onFormSubmit" class="flex justify-center flex-col gap-4 w-full md:w-56">
            <div class="flex flex-col gap-1">
                <AutoComplete name="restaurante" optionLabel="nome" dropdown :suggestions="filteredRestaurantes" v-model="selectedRestaurante" @complete="search">
                    <template #footer>
        <div class="px-3 py-3">
            <Button label="Add New" fluid severity="secondary" text size="small" icon="pi pi-plus" @click="addRestaurantModal = true"/>
        </div>
    </template>
                </AutoComplete>
                <Dialog v-model:visible="addRestaurantModal" header="Edit Profile" :style="{ width: '25rem' }">
            <div class="flex items-center gap-4 mb-4">
                <label for="username" class="font-semibold w-24">Nome do restaurante</label>
                <InputText id="nome" class="flex-auto" v-model="selectedRestaurante" />
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="addRestaurantModal = false"></Button>
                <Button type="button" label="Save" @click="addRestaurant"></Button>
            </div>
        </Dialog>
                <Message v-if="$form.restaurante?.invalid" severity="error" size="small" variant="simple">{{ $form.restaurante.error?.message }}</Message>


                <FileUpload name="demo[]" url="/api/upload" @upload="onAdvancedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000">
                    <template #empty>
                        <span>Drag and drop files to here to upload.</span>
                    </template>
                </FileUpload>

            </div>
            <Button type="submit" severity="secondary" label="Submit" />
        </Form>
        <Toast />
    </div>
</template>
