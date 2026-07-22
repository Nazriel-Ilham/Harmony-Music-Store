<script setup>
const model = defineModel({
  default: "default",
});
</script>

<template>
  <div class="mt-6 flex justify-end">
    <select
      v-model="model"
      class="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 focus:border-blue-600 focus:outline-none"
    >
      <option value="default">Urutkan</option>

      <option value="name">Nama A-Z</option>

      <option value="low">Harga Terendah</option>

      <option value="high">Harga Tertinggi</option>
    </select>
  </div>
</template>
