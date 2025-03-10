<script setup lang="ts">
import { ref } from 'vue'
import { useSquare, useCircle, useHexagon, useDistributePoints, usePointOnPrimitive } from 'vuexyz'

import { Mesh, BoxGeometry, MeshBasicMaterial } from 'three'

// Beam dimensions
const beamLength = 16
const beamHeight = 2
const beamWidth = 1
const rotation: Ref<number> = ref(0)
  let RAF = null;
const circle = useCircle({radius: 50, position: {x: -200, y: 0}})

//useSquare
const square = useSquare({sideLength: 12, position: {x: 0, y: 0}, rotation})

// useHexagon
const hexagon = useHexagon({size: 100, position: {x: 200, y: 0}})

const { vertices, percentages } = useDistributePoints(square, 6)

// Extract x,y,z coordinates from first vertex
const firstVertex = vertices.value[0]
const geometry = new BoxGeometry(firstVertex.x, firstVertex.y, 322)
const material = new MeshBasicMaterial({ color: 0x00ff00 })

  // Create a mesh with the geometry and material
  const meshWithMaterial = new Mesh(geometry, material)

  const meshRef = shallowRef()

onMounted(() => {
  // Constantly rotate the octagon
  const rotationInterval = () => {
    rotation.value += 0.5
    RAF = requestAnimationFrame(rotationInterval)
  }
  rotationInterval()
});

onUnmounted(() => {
  cancelAnimationFrame(RAF)
})
const percentage: Ref<number> = ref(0)
const { point } = usePointOnPrimitive(square, percentage)

</script>

<template>
    <TresCanvas clear-color="black">
      <OrbitControls/>
      <TresPerspectiveCamera
          :position="[0, 0, 600]"
          :look-at="[0, 0, 0]"
          :fov="35"
      />

      <TresMesh>
        <!-- <TresSquareGeometry :args="[vertices]"/> -->
        <TresMeshStandardMaterial color="#FFFFFF"/>
      </TresMesh>
      <primitive :object="meshWithMaterial" />
      <TresMesh v-for="primitive in [circle, square, hexagon]">
        <TresExtrudeGeometry :args="[primitive.threeShape.value, {
          steps: 2,
          depth: 30,
          bevelEnabled: true,
          bevelThickness: 1,
          bevelSize: 2,
          bevelOffset: 0,
          bevelSegments: 3
        }]"/>
        <TresMeshStandardMaterial color="#FFFFFF"/>
      </TresMesh>
      <TresDirectionalLight :intensity="2" :position="[500, 500, 500]" :look-at="[0,0,0]"/>
      <TresDirectionalLight :intensity="2" :position="[-500, 500, 500]" :look-at="[0,0,0]"/>
      <TresAmbientLight :intensity="0.5"/>
    </TresCanvas>
</template>

<style scoped>
canvas {
  width: 100%;
  height: 100vh;
}
</style>