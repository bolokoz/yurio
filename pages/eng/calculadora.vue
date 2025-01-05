<script setup>
import { ref, computed } from 'vue';

// State variables for length and height
const length = ref(0);
const height = ref(0);

// Computed property for the area
const area = computed(() => length.value * height.value);
</script>

<template>
  <div style="padding: 10px; border: 1px solid #ddd; border-radius: 5px; max-width: 300px;">
    <h3>Wall Area Calculator</h3>
    <div style="margin-bottom: 10px;">
      <label>
        Length (m):
        <input
          type="number"
          v-model="length"
          style="margin-left: 10px; padding: 5px;"
        />
      </label>
    </div>
    <div style="margin-bottom: 10px;">
      <label>
        Height (m):
        <input
          type="number"
          v-model="height"
          style="margin-left: 10px; padding: 5px;"
        />
      </label>
    </div>
    <div>
      <strong>Area:</strong> {{ area }} m²
    </div>
  </div>
</template>

<style scoped>
input {
  width: 100px;
}
</style>
