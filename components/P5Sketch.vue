<template>
    <div ref="sketchContainer"></div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import p5 from 'p5';
  
  const sketchContainer = ref(null);
  
  onMounted(() => {
    new p5((sketch) => {
      sketch.setup = () => {
        sketch.createCanvas(400, 400).parent(sketchContainer.value);
      };
  
      sketch.draw = () => {
        sketch.background(220);
        sketch.ellipse(200, 200, 100, 100);
      };
    });
  });
  </script>
  
  <style scoped>
  /* Add styles if needed */
  </style>