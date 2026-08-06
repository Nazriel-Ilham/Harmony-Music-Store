<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
});

// Mengakses cart composable untuk fungsi tombol
const { addToCart } = useCart();

const handleAddToCart = (product) => {
  addToCart(product);
};
</script>

<template>
  <NuxtLink
    :to="`/produk/${product.id}`"
    class="block overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
  >
    <!-- Perbaikan 1: Mendukung image_url dari Supabase & fallback jika gambar kosong -->
    <img
      :src="product.image_url || product.image || '/placeholder.png'"
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

      <!-- Perbaikan 2: Aman dari error jika price null/undefined -->
      <p class="mt-2 text-2xl font-bold text-blue-700">
        Rp {{ Number(product.price || 0).toLocaleString("id-ID") }}
      </p>

      <div class="mt-4 flex text-lg text-yellow-400">★★★★★</div>

      <!-- Perbaikan 3: Added @click.stop.prevent agar tombol keranjang tidak membuka halaman detail -->
      <button
        @click.stop.prevent="handleAddToCart(product)"
        class="mt-6 w-full rounded-xl bg-blue-700 py-3 font-semibold text-white transition hover:bg-blue-800"
      >
        Tambah ke Keranjang
      </button>
    </div>
  </NuxtLink>
</template>
