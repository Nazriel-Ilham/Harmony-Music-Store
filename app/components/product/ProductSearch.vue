<script setup>
const model = defineModel();
</script>

<template>
  <div class="mt-10">
    <input
      v-model="model"
      type="text"
      placeholder="Cari alat musik..."
      class="w-full rounded-xl border border-gray-300 px-5 py-4 transition focus:border-blue-600 focus:outline-none"
    />
  </div>
</template>
