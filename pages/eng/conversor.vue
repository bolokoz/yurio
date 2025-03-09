<template>
  <div class="max-w-2xl mx-auto p-6">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <!-- Unit Type Selection -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Choose Physical Quantity
        </label>
        <select
          v-model="grandezaEscolhida"
          class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
        >
          <option v-for="item in property" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>

      <div class="border-t border-gray-200 dark:border-gray-700 my-6"></div>

      <!-- Unit Selection -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            From Unit
          </label>
          <select
            v-model="unidadeEscolhida"
            class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
          >
            <option v-for="item in unidades" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            To Unit
          </label>
          <select
            v-model="unidadeConvertida"
            class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
          >
            <option v-for="item in unidades" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
      </div>

      <!-- Value Input/Output -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Value to Convert
          </label>
          <input
            type="number"
            v-model="valorEscolhido"
            @input="convert1"
            class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter value"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Converted Value
          </label>
          <input
            type="number"
            v-model="valorConvertidoManual"
            @input="convert2"
            class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Result"
            readonly
          >
        </div>
      </div>

      <!-- Temperature Warning -->
      <div v-if="sheet" 
        class="mt-6 bg-red-50 dark:bg-red-900/50 border-l-4 border-red-500 p-4 rounded">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700 dark:text-red-200">
              Temperature conversion may have errors. Please verify results.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Import the unit conversion data
import { property, unit, factor } from '~/utils/conversion-data'

const sheet = ref(false)
const grandezaEscolhida = ref('Acceleration')
const unidadeEscolhida = ref(null)
const unidadeConvertida = ref(null)
const valorEscolhido = ref(null)
const valorConvertidoManual = ref(null)

// Watch for temperature selection to show warning
watch(grandezaEscolhida, (newValue) => {
  if (newValue === 'Temperature') {
    sheet.value = true
  }
})

// Computed properties
const indexGrandeza = computed(() => {
  return property.indexOf(grandezaEscolhida.value)
})

const unidades = computed(() => {
  return unit[indexGrandeza.value]
})

const fatorEscolhido = computed(() => {
  const index = unit[indexGrandeza.value].indexOf(unidadeEscolhida.value)
  return factor[indexGrandeza.value][index]
})

const fatorConvertido = computed(() => {
  const index = unit[indexGrandeza.value].indexOf(unidadeConvertida.value)
  return factor[indexGrandeza.value][index]
})

const valorConvertido = computed(() => {
  if (!valorEscolhido.value || !fatorEscolhido.value || !fatorConvertido.value) return null
  return (valorEscolhido.value * fatorConvertido.value) / fatorEscolhido.value
})

// Methods
const convert1 = () => {
  valorConvertidoManual.value = (valorEscolhido.value * fatorConvertido.value) / fatorEscolhido.value
}

const convert2 = () => {
  valorEscolhido.value = (valorConvertidoManual.value * fatorEscolhido.value) / fatorConvertido.value
}
  </script>
  
  