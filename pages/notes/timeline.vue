<script setup>

function smoothScroll(id) {
    document.body.click();
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
    });
}

const visibleRight = ref(false);
</script>

<template>
    <div className="card">
      <Drawer v-model:visible="visibleRight" header="Drawer" position="right">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                    </p>
                </Drawer>
                <div class="flex flex-col lg:flex-row-reverse">
  <!-- Table of Contents -->
  <div class="w-full lg:w-1/4 p-4 bg-gray-100 border-b lg:border-b-0 lg:border-l border-gray-300">
    <h2 class="text-lg font-semibold">Table of Contents</h2>
    <ul class="mt-4 space-y-2">
      <li><a href="#section1" class="text-blue-600 hover:underline">Section 1</a></li>
      <li><a href="#section2" class="text-blue-600 hover:underline">Section 2</a></li>
      <li><a href="#section3" class="text-blue-600 hover:underline">Section 3</a></li>
      <li><a href="#section4" class="text-blue-600 hover:underline">Section 4</a></li>
    </ul>
  </div>

  <!-- Main Content -->
  <div class="flex-1 p-4">
    <h1 class="text-2xl font-bold">Main Content</h1>
    <p class="mt-4">This is where your main content goes. Add your text, articles, or other elements here.</p>
    <p class="mt-2">Additional content or paragraphs can go here to fill the space.</p>
  </div>
</div>

    </div>
  </template>
  