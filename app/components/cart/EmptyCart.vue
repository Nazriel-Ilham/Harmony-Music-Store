<script setup>
import { products } from "~/data/products";

const cart = [products[0]];

const subtotal = cart.reduce((total, item) => total + item.price, 0);
</script>

<template>
  <section class="bg-gray-50 py-20">
    <div class="mx-auto max-w-7xl px-6">
      <h1 class="text-5xl font-bold">Keranjang Belanja</h1>

      <p class="mt-4 text-gray-500">Periksa kembali produk sebelum checkout.</p>

      <div class="mt-12 grid gap-10 lg:grid-cols-3">
        <div class="space-y-6 lg:col-span-2">
          <CartItem v-for="item in cart" :key="item.id" :product="item" />
        </div>

        <CartSummary :subtotal="subtotal" />
      </div>
    </div>
  </section>
</template>
