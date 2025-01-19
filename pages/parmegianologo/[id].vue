<template>
  <div
    v-if="parmegiana"
    class="min-h-screen flex flex-col items-center justify-center"
  >
    <Card class="w-full md:w-1/2">
      <template #header>
        <h1
          class="text-lg font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl p-6"
        >
          <span class="block font-light">
            Restaurante:
            <span
              class="text-transparent bg-clip-text bg-gradient-to-tr to-red-500 from-yellow-600"
            >
              {{ parmegiana?.restaurantes.nome }}
            </span>
          </span>
        </h1>
        <img alt="user header" class="rounded-xl" :src="parmegiana?.files" />
      </template>
      <!-- <template #title>
    Prato: {{ parmegiana?.prato }}
    </template> -->
      <template #subtitle> </template>
      <template #content>
        <p class="m-0 whitespace-pre-line">
          {{ parmegiana.obs }}
        </p>
        
                      <div class="font-semibold text-xl mb-4">Radar</div>
                      <Chart type="radar" :data="radarData" :options="radarOptions"></Chart>

      </template>

      
            <template #footer>
        <div class="flex gap-3 mt-1">
          <Button
            label="Voltar"
            severity="secondary"
            outlined
            class="w-full"
            @click="$router.back()"
          />
          <!-- <Button label="Postar" class="w-full" /> -->
        </div>
      </template>
    </Card>
    </div>
  <div v-else>
    <div class="min-h-screen flex items-center justify-center bg-gray-200">
      Not found
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient();
const route = useRoute();
const id = route.params.id;
const { data: parmegiana } = await useAsyncData("restaurant", async () => {
  const { data } = await client
    .from("parmegianas")
    .select("*, restaurantes (nome)")
    .eq("id", id)
    .single();
  return data;
});

const radarData = ref(null);

const radarOptions = {
  plugins: {
    legend: {
    },
  },
  scales: {
    r: {
        suggestedMin: 0,
            suggestedMax: 5,
      grid: {
      },
    },
  },
};

watch(parmegiana, (parme) => {
  radarData.value = {
    labels: [
      "Carne e crosta",
      "Molho",
      "Acompanhamentos",
      "Restaurante",
    ],
    datasets: [
      {
        label: parme?.restaurantes?.nome,
        data: [
          parme.carne,
          parme.molho,
          parme.acompanhamentos,
          parme.restaurante,
        ],
      },
    ],
  };
}, {immediate: true});

</script>
