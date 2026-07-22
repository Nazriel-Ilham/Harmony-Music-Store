<script setup>
defineProps({
  feature: Object,
});
</script>

<template>
  <div
    class="rounded-2xl bg-white p-6 text-center shadow-md transition hover:-translate-y-2 hover:shadow-xl"
  >
    <div class="text-5xl">
      {{ feature.icon }}
    </div>

    <h3 class="mt-5 text-xl font-bold">
      {{ feature.title }}
    </h3>

    <p class="mt-3 text-gray-500">
      {{ feature.description }}
    </p>
  </div>
</template>
