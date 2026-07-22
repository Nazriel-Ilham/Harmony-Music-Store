<script setup>
import { computed, ref } from "vue";
import { products } from "~/data/products.js";

const search = ref("");
const sortBy = ref("default");
const selectedCategory = ref("Semua");

const categories = ["Semua", "Gitar", "Keyboard", "Drum", "Biola"];

const filteredProducts = computed(() => {
  let result = [...products];

  // Search
  if (search.value.trim()) {
    result = result.filter((product) =>
      product.name.toLowerCase().includes(search.value.toLowerCase()),
    );
  }

  // Filter kategori
  if (selectedCategory.value !== "Semua") {
    result = result.filter(
      (product) => product.category === selectedCategory.value,
    );
  }

  // Sorting
  switch (sortBy.value) {
    case "name":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case "low":
      result.sort((a, b) => a.price - b.price);
      break;

    case "high":
      result.sort((a, b) => b.price - a.price);
      break;
  }

  return result;
});
</script>

<template>
  <section class="bg-gray-50 py-20">
    <div class="mx-auto max-w-7xl px-6">
      <h1 class="text-5xl font-bold">Produk Kami</h1>

      <p class="mt-4 text-gray-500">Temukan alat musik favoritmu.</p>

      <!-- Search -->
      <ProductSearch v-model="search" />

      <!-- Sort -->
      <ProductSort v-model="sortBy" />

      <!-- Filter -->
      <ProductFilter v-model="selectedCategory" :categories="categories" />

      <!-- Product -->
      <div class="mt-10">
        <ProductGrid :products="filteredProducts" />
      </div>
    </div>
  </section>
</template>
