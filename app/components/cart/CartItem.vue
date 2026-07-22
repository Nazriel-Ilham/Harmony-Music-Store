<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["increase", "decrease", "remove"]);
</script>

<template>
  <div class="flex items-center gap-6 rounded-2xl bg-white p-6 shadow-sm">
    <img
      :src="product.image"
      :alt="product.name"
      class="h-28 w-28 object-contain"
    />

    <div class="flex-1">
      <span class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
        {{ product.category }}
      </span>

      <h2 class="mt-3 text-2xl font-bold">
        {{ product.name }}
      </h2>

      <p class="mt-2 text-2xl font-bold text-blue-700">
        Rp {{ product.price.toLocaleString("id-ID") }}
      </p>
      <div class="mt-6 flex items-center gap-4">
        <button
          class="flex h-10 w-10 items-center justify-center rounded-lg border hover:bg-gray-100"
          @click="emit('decrease', product.id)"
        >
          −
        </button>

        <span class="w-8 text-center text-lg font-semibold">
          {{ product.quantity }}
        </span>

        <button
          class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 text-white hover:bg-blue-800"
          @click="emit('increase', product.id)"
        >
          +
        </button>
      </div>
    </div>
    <button
      class="rounded-lg bg-red-100 px-4 py-2 text-red-600 transition hover:bg-red-200"
      @click="emit('remove', product.id)"
    >
      Hapus
    </button>
  </div>
</template>
