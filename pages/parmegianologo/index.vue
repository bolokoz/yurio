<script setup lang="ts">
import { Fluid } from 'primevue';
const user = useSupabaseUser()
const client = useSupabaseClient()

const parmegianas = await client.from('parmegianas').select('*,restaurantes( nome)')

const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const nota = (value) => {
    const total = value.carne+ value.molho + value.acompanhamentos + value.restaurante;
    return total / 4;
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR');
};

const goToPage = async (data) => {
    await navigateTo(`/parmegianologo/${data.id}`);
};
</script>

<template>
    <div>
        <div v-if="user">
            <Button label="Adicionar">
                <NuxtLink to="/admin/parmegianologo/add">

                    <i class="pi pi-plus"></i>
                    <span class="ml-2">Adicionar</span>
                </NuxtLink>
            </Button>   
        </div>
        <Fluid>
            <div class="card">
                <div class="font-semibold text-xl mb-4 primary text-primary">Parmegianologo</div>
                <p>Avaliação de parmegianas</p>
            </div>
            {{ parmegianas.data }}

            <DataTable :value="parmegianas.data" tableStyle="min-width: 50rem">
            <template #header>
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <span class="text-xl font-bold">Reviews Parmegianas</span>
                </div>
            </template>
            <Column field="restaurantes.nome" header="Name" sortable></Column>
            <Column header="Actions">
        <template #body="slotProps">
            <Button icon="pi pi-window-maximize" outlined rounded class="mr-2" @click="goToPage(slotProps.data)" />
        </template>
    </Column>
            <Column field="date" header="Data" sortable>
                <template #body="slotProps">
                    {{ formatDate(slotProps.data.date) }}
                </template>
            </Column>
            <Column header="Image">
                <template #body="slotProps">
                    <img :src="`${slotProps.data.files}`" :alt="slotProps.data.nome" class="w-24 rounded" />
                </template>
            </Column>
            <Column field="preco" header="Preço" sortable>
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.preco) }}
                </template>
            </Column>
            <Column header="Nota" sortable>
                <template #body="slotProps">
                    {{ nota(slotProps.data) }}
                </template>
            </Column>
            <Column field="carne" header="Carne">
                <template #body="slotProps">
                    <Rating :modelValue="slotProps.data.carne" readonly />
                </template>
            </Column>
            <Column field="molho" header="molho">
                <template #body="slotProps">
                    <Rating :modelValue="slotProps.data.molho" readonly />
                </template>
            </Column>
            <Column field="acompanhamentos" header="acompanhamentos">
                <template #body="slotProps">
                    <Rating :modelValue="slotProps.data.acompanhamentos" readonly />
                </template>
            </Column>
            <Column field="restaurante" header="Outros">
                <template #body="slotProps">
                    <Rating :modelValue="slotProps.data.restaurante" readonly />
                </template>
            </Column>
            <template #footer> Total de {{ parmegianas.data ? parmegianas.data.length : 0 }} Reviews. </template>
        </DataTable>

        </Fluid>
    </div>
</template>

<style>
.p-rating-color {
    color: #f0ad4e;
}

</style>
