<script setup>
import { ref, computed } from 'vue'

// Constants
const titleCard = {
  title: "Máximo momento resistente de Vigas",
  subtitle: "Baseado no exemplo 3 do capítulo 3 do livro Cálculo e Detalhamento de Estruturas Usuais de Concreto Armado de Roberto Chust Carvalho",
  source: "https://gitlab.com/yurifbeck/engcivil/blob/laje2/pages/engcivil/viga.vue"
}

const warnings = ref([])
const activeStep = ref(1)
const showDialog = ref(false)

// Steel types
const acos = [
  { nome: "CA50", e: 0.00207, fyd: 50 / 1.15 },
  { nome: "CA60", e: 0.00248, fyd: 60 / 1.15 },
  { nome: "CA25", e: 0.00104, fyd: 25 / 1.15 }
]

const selectedAco = ref(acos[0])

// Input fields
const inputs = ref({
  bw: {
    name: "bw",
    value: 0.12,
    suffix: "m",
    hint: "Largura"
  },
  d: {
    name: "d",
    value: 0.1765,
    suffix: "m",
    hint: "Altura útil"
  },
  fck: {
    name: "f_ck",
    value: 20000,
    suffix: "kN/m2",
    hint: "F_ck"
  }
})

// Computed values
const alphaC = computed(() => {
  const fck = inputs.value.fck.value
  if (fck < 50000) {
    warnings.value = []
    return 0.85
  } else {
    warnings.value = ["Para Fck > 50 MPa, AlphaC do concreto não é 0.85 como usualmente (valor utilizado por considerar uma parábola a tensão de compressão), utilizar a fórmula 0.85 * (1 - ((fck - 50) /200)"]
    return 0.85 * (1 - (fck - 50) / 200)
  }
})

const x34 = computed(() => {
  const a = 0.0035
  const b = a + selectedAco.value.e
  const c = a / b
  const result = c * inputs.value.d.value
  return { a, b, c, result }
})

const md = computed(() => {
  const fcd = inputs.value.fck.value / 1.4
  const bw = inputs.value.bw.value
  const lambda = 0.8
  const x34Value = x34.value.result
  const fc = alphaC.value * fcd * bw * lambda * x34Value
  const d = inputs.value.d.value
  const z = d - 0.5 * lambda * x34Value
  const result = fc * z
  const m = result / 1.4
  return { fcd, lambda, fc, z, result, m }
})

const as = computed(() => {
  return md.value.result / (md.value.z * selectedAco.value.fyd)
})

const x = computed(() => {
  const x = inputs.value.d.value * 0.45
  const fcd = inputs.value.fck.value / 1.4
  const bw = inputs.value.bw.value
  const lambda = 0.8
  const fc = alphaC.value * fcd * bw * lambda * x
  const d = inputs.value.d.value
  const z = d - 0.5 * lambda * x
  const md = fc * z
  const m = md / 1.4
  const as = md / (z * selectedAco.value.fyd)
  return { x, fcd, lambda, fc, z, md, m, as }
})

// Steps items for Steps component
const steps = [
  { label: 'Inputs' },
  { label: 'Opção 1) Cálculo para limite entre os domínios 3 e 4' },
  { label: 'Opção 2) Cálculo para x/4 =0.45' }
]
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <!-- Title Card -->
    <div class="bg-surface-0 dark:bg-surface-900 p-6 rounded-xl shadow-lg mb-8">
      <h1 class="text-2xl font-bold mb-2">{{ titleCard.title }}</h1>
      <p class="text-surface-600 dark:text-surface-400 mb-2">{{ titleCard.subtitle }}</p>
      <a :href="titleCard.source" class="text-primary-500 hover:underline" target="_blank">Source</a>
    </div>

    <!-- Main Content -->
    <Steps :model="steps" :activeIndex="activeStep - 1" class="mb-8" />

    <div class="card">
      <!-- Step 1: Inputs -->
      <div v-if="activeStep === 1" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-6">
          <div v-for="(prop, key) in inputs" :key="key">
            <span class="p-float-label">
              <InputNumber 
                v-model="prop.value" 
                :min="0"
                :step="0.0001"
                :maxFractionDigits="4"
              />
              <label>{{ prop.hint }} ({{ prop.suffix }})</label>
            </span>
          </div>
          
          <Dropdown
            v-model="selectedAco"
            :options="acos"
            optionLabel="nome"
            placeholder="Selecione o tipo de aço"
            class="w-full"
          />
        </div>

        <div v-if="warnings.length > 0">
          <Message v-for="(warning, index) in warnings" 
            :key="index"
            severity="warn"
            :text="warning"
          />
        </div>
      </div>

      <!-- Step 2: Domain 3-4 Calculation -->
      <div v-if="activeStep === 2" class="space-y-6">
        <div class="card">
          <h2 class="text-xl font-bold mb-4">Momento Resistente</h2>
          
          <div class="space-y-4">
            <p>O limite entre os dominios 3 e 4 para {{ selectedAco.nome }} que tem εyd = {{ selectedAco.e }}:</p>
            <div class="bg-surface-50 dark:bg-surface-800 p-4 rounded">
              <Mathjax :mdData="`$ x_{34} = \\frac{0.0035}{0.0035 + \\epsilon_{yd}} \\cdot d $`" />
              <Mathjax :mdData="`$ x_{34} = \\frac{0.0035}{0.0035 + ${selectedAco.e}} \\cdot ${inputs.d.value} $`" />
              <Mathjax :mdData="`$ x_{34} = ${x34.c.toFixed(4)} \\cdot ${inputs.d.value} = ${x34.result.toFixed(4)} \\ m$`" />
            </div>
          </div>

          <!-- More math content... -->
        </div>

        <Dialog v-model:visible="showDialog" header="Valores" class="w-[90vw] md:w-[600px]">
          <div class="space-y-2">
            <!-- Variables display -->
          </div>
        </Dialog>

        <div class="flex gap-4">
          <Button label="Ver todas variáveis" @click="showDialog = true" />
          <Button label="Próxima opção" severity="success" @click="activeStep = 3" />
        </div>
      </div>

      <!-- Step 3: x/d = 0.45 Calculation -->
      <div v-if="activeStep === 3" class="space-y-6">
        <!-- Similar structure to Step 2 -->
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-between mt-8">
      <Button 
        v-if="activeStep > 1"
        label="Anterior" 
        @click="activeStep--" 
        outlined
      />
      <Button 
        v-if="activeStep < 3"
        label="Próximo" 
        @click="activeStep++"
        severity="primary"
      />
    </div>
  </div>
</template>

<style scoped>
.p-steps-item {
  flex: 1;
}

:deep(.p-inputnumber-input) {
  width: 100%;
}
</style>