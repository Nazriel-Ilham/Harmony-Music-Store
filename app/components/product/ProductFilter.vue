<script setup>
defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

const model = defineModel();
</script>

<template>
  <div class="mt-8 flex flex-wrap gap-4">
    <button
      v-for="category in categories"
      :key="category"
      @click="model = category"
      class="rounded-full border px-6 py-3 transition"
      :class="
        model === category
          ? 'bg-blue-700 text-white'
          : 'bg-white hover:bg-gray-100'
      "
    >
      {{ category }}
    </button>
  </div>
</template>
