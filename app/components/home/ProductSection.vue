<script setup>
import { products } from "~/data/products.js";
</script>

<template>
  <section class="bg-gray-100 py-20">
    <div class="mx-auto max-w-7xl px-6">
      <div class="text-center">
        <h2 class="text-4xl font-bold">Produk Unggulan</h2>

        <p class="mt-3 text-gray-500">
          Produk favorit pelanggan Harmony Music Store.
        </p>
      </div>

      <div class="mt-12">
        <ProductGrid :products="products" />
      </div>
    </div>
  </section>
</template>
