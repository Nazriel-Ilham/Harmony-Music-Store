<script setup>
defineProps({
  product: Object,
});
</script>

<template>
  <NuxtLink
    :to="`/produk/${product.id}`"
    class="block overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      :src="product.image"
      :alt="product.name"
      class="h-64 w-full object-cover"
    />

    <div class="p-5">
      <span class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
        {{ product.category }}
      </span>

      <h3 class="mt-4 text-xl font-bold">
        {{ product.name }}
      </h3>

      <p class="mt-2 text-2xl font-bold text-blue-700">
        Rp {{ product.price.toLocaleString("id-ID") }}
      </p>

      <div class="mt-4 flex text-yellow-400 text-lg">★★★★★</div>

      <button
        class="mt-6 w-full rounded-xl bg-blue-700 py-3 font-semibold text-white transition hover:bg-blue-800"
      >
        Tambah ke Keranjang
      </button>
    </div>
  </NuxtLink>
</template>
