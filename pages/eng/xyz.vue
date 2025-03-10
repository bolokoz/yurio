<script setup lang="ts">
import { ref } from 'vue'

// Beam dimensions
const beamLength = 16
const beamHeight = 2
const beamWidth = 1

// x y z
let viga = ref([16,2,1])

// forcas2d(intensidade, x, direcao  )
let f1 = ref([0,0,0])

// Force position (at center by default)
const forcePosition = beamLength / 2
</script>

<template>
  <TresCanvas window-size clear-color="black">
    <!-- Camera -->
    <TresPerspectiveCamera :position="[10, 5, 10]" />
    <OrbitControls />
    
    <!-- Lighting -->
    <TresAmbientLight :intensity="0.5" /> -->
    <TresDirectionalLight :position="[5, 5, 5]" :intensity="1" cast-shadow />

    <!-- Eixo -->
    <TresAxesHelper :scale="20" />

    <Align top right back>


    <!-- Main Beam -->
    <TresMesh>
      <TresBoxGeometry :args="[beamLength, beamHeight, beamWidth]" />
      <TresMeshStandardMaterial color="#64748b00" />
    </TresMesh>

    <!-- Left Support (Triangle) -->
    <TresMesh :position="[-beamLength/2, -beamHeight, 0]" cast-shadow>
      <TresConeGeometry :args="[1, 1.5, 4, 3]" :rotation="[0, 0, Math.PI]" />
      <TresMeshStandardMaterial color="#475569" />
    </TresMesh>

    <!-- Right Support (Triangle) -->
    <TresMesh :position="[beamLength/2, -beamHeight, 0]" cast-shadow>
      <TresConeGeometry :args="[1, 1.5, 4, 3]" :rotation="[0, 0, Math.PI]" />
      <TresMeshStandardMaterial color="#475569" />
    </TresMesh>

    <!-- Vertical Force Arrow -->
    <TresMesh :position="[0, beamHeight + 1, 0]" cast-shadow>
      <TresCylinderGeometry :args="[0.1, 0.1, 2, 32]" />
      <TresMeshStandardMaterial color="#ef4444" />
    </TresMesh>
    <!-- Arrow Head -->
    <TresMesh :position="[0, beamHeight, 0]">
      <TresConeGeometry :args="[0.2, 0.4, 32]" :rotation="[Math.PI, 0, 0]" />
      <TresMeshStandardMaterial color="#ef4444" />
    </TresMesh>

</Align>

    <!-- Helpers -->
    <!-- <TresGridHelper :args="[20, 20]" /> -->
  </TresCanvas>
</template>

<style scoped>
canvas {
  width: 100%;
  height: 100vh;
}
</style>