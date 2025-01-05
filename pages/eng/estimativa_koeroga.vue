<script setup lang="ts">
// State variables for length and height
import { templates } from "./koeroga.js";

// dropdown de templates
const selectedEstruturaOption = ref(null);
const estruturaOptions = ref([
  { name: "v1 3x8x3", value: "v1" },
  { name: "novo", value: "novo" },
]);
// atualiza quando seleciona dropdown
function updateEstrutura() {
  if (selectedEstruturaOption.value === "v1") {
    estrutura.value = templates.v1().estrutura2d;
  }
}

const estrutura = ref([
  { name: "altura", value: 2 },
  { name: "largura", value: 2 },
  { name: "comprimento", value: 8 },
]);

// para tabela
const columns_estrutura = ref([
  { field: "name", header: "Nome" },
  { field: "value", header: "Valor" },
]);

// para poder editar tabela
function onCellEditComplete(event: any) {
  let { data, newValue, field } = event;

  if (newValue.trim().length > 0) data[field] = newValue;
  else event.preventDefault();
}

const calculos = computed(() => {
  const altura =
    estrutura.value.find((item) => item.name === "altura")?.value ?? 1;
  const largura =
    estrutura.value.find((item) => item.name === "largura")?.value ?? 1;
  const comprimento =
    estrutura.value.find((item) => item.name === "comprimento")?.value ?? 1;

  return {
    area: altura * largura * 2 + largura * altura * 2,
    piso: largura * comprimento,
  };
});
</script>

<template>

    <YurioHero
        title="Calculadora wood frame"
        subtitle="Estimativa de gastos"
        description="Preencha a tabela com as medidas e obtenha estimativa de custos de diversos itens"
        :changelog= "[
            { date: '2021-10-01', description: 'Versão inicial' },
            { date: '2021-10-02', description: 'Adicionado calculo de area' }
        ]"
        />

      <div class="card">
        <Select
          v-model="selectedEstruturaOption"
          :options="estruturaOptions"
          optionLabel="name"
          placeholder="Select"
          optionValue="value"
          @change="updateEstrutura"
        />

        <DataTable
          :value="estrutura"
          size="small"
          showGridlines
          stripedRows
          editMode="cell"
          @cell-edit-complete="onCellEditComplete"
        >
          <Column
            v-for="col of columns_estrutura"
            :key="col.field"
            :field="col.field"
            :header="col.header"
            style="width: 25%"
          >
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" autofocus fluid />
            </template>
          </Column>
        </DataTable>
      </div>


      <div class="font-medium text-500 mb-3">
        Area externa aproximada = {{ calculos.area }} m2
        <br />
        Area piso e teto aproximada = {{ calculos.piso }} m2
      </div>
  
</template>
