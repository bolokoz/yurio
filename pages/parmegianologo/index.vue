<script setup lang="ts">
import { Fluid } from 'primevue';
const user = useSupabaseUser()

</script>

<template>
    <div>
        <Fluid>
            <div class="card">
                <div class="font-semibold text-xl mb-4 primary text-primary">Parmegianologo</div>
                <p>Avaliação de parmegianas</p>
            </div>

            <div v-if="user">
                <Button label="Adicionar">
                    <NuxtLink to="/parmegianologo/add">

                        <i class="pi pi-plus"></i>
                        <span class="ml-2">Adicionar</span>
                    </NuxtLink>
                </Button>   
            </div>
        </Fluid>
    </div>
</template>
