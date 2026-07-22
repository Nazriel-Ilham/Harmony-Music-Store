<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { products } from "~/data/products.js";

const route = useRoute();

const { addToCart } = useCart();

const product = computed(() =>
  products.find((item) => item.id === Number(route.params.id)),
);

// Quantity
const quantity = ref(1);

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const handleAddToCart = () => {
  if (!product.value) return;

  addToCart(product.value, quantity.value);
};

const relatedProducts = computed(() => {
  return products.filter((item) => item.id !== product.value?.id).slice(0, 4);
});
</script>

<template>
  <section class="bg-gray-50 py-20">
    <div class="mx-auto max-w-7xl px-6">
      <NuxtLink
        to="/produk"
        class="mb-8 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700 transition hover:bg-gray-100"
      >
        <span class="text-xl">←</span>
        <span class="font-medium">Kembali ke Produk</span>
      </NuxtLink>

      <div v-if="product" class="grid gap-12 lg:grid-cols-2">
        <!-- Gambar -->
        <div class="rounded-2xl bg-white p-8 shadow">
          <img
            :src="product.image"
            :alt="product.name"
            class="mx-auto h-96 object-contain"
          />
        </div>

        <!-- Informasi -->
        <div>
          <span class="rounded-full bg-blue-100 px-4 py-2 text-blue-700">
            {{ product.category }}
          </span>

          <h1 class="mt-6 text-5xl font-bold">
            {{ product.name }}
          </h1>

          <div class="mt-6 flex items-center gap-2">
            <span class="text-yellow-500 text-xl"> ★★★★★ </span>

            <span class="text-gray-600"> ({{ product.rating }}) </span>
          </div>

          <p class="mt-6 text-4xl font-bold text-blue-700">
            Rp {{ product.price.toLocaleString("id-ID") }}
          </p>

          <div class="mt-8 space-y-3 text-gray-700">
            <p>
              <span class="font-semibold"> Stok : </span>

              {{ product.stock }} Unit
            </p>

            <p>
              <span class="font-semibold"> Kondisi : </span>

              {{ product.condition }}
            </p>

            <p>
              <span class="font-semibold"> Garansi : </span>

              {{ product.warranty }}
            </p>
          </div>

          <div class="mt-8">
            <h3 class="mb-2 text-xl font-semibold">Deskripsi</h3>

            <p class="leading-8 text-gray-600">
              {{ product.description }}
            </p>
          </div>

          <div class="mt-8">
            <h3 class="mb-3 text-lg font-semibold">Jumlah</h3>

            <div class="flex items-center gap-4">
              <button
                @click="decreaseQuantity"
                class="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-xl hover:bg-gray-100"
              >
                −
              </button>

              <span class="w-8 text-center text-xl font-semibold">
                {{ quantity }}
              </span>

              <button
                @click="increaseQuantity"
                class="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-xl hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div class="mt-8 flex gap-4">
            <button
              class="rounded-xl bg-blue-700 px-8 py-4 font-semibold text-white transition hover:bg-blue-800"
              @click="handleAddToCart"
            >
              Tambah ke Keranjang
            </button>

            <button
              class="rounded-xl border border-blue-700 px-8 py-4 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-24">
      <h2 class="text-3xl font-bold">Produk Terkait</h2>

      <p class="mt-2 text-gray-500">Produk lain yang mungkin Anda sukai.</p>

      <div class="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <ProductCard
          v-for="item in relatedProducts"
          :key="item.id"
          :product="item"
        />
      </div>
    </div>
  </section>
</template>
