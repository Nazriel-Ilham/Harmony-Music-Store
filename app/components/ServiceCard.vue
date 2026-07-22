<script setup>
defineProps({
  service: Object,
});
</script>

<template>
  <div
    class="rounded-2xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
  >
    <div class="text-6xl">
      {{ service.icon }}
    </div>

    <h3 class="mt-4 text-2xl font-bold">
      {{ service.title }}
    </h3>

    <p class="mt-3 text-gray-500">
      {{ service.description }}
    </p>

    <a
      :href="service.whatsapp"
      target="_blank"
      class="mt-6 inline-block w-full rounded-xl bg-green-500 py-3 text-center font-semibold text-white transition hover:bg-green-600"
    >
      Hubungi via WhatsApp
    </a>
  </div>
</template>
