<script setup>
import { useCart } from "~/composables/useCart";

const { totalItems } = useCart();
</script>

<template>
  <nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">
      <!-- Logo -->
      <NuxtLink to="/" class="text-2xl font-bold text-blue-900">
        🎵 Harmony Music Store
      </NuxtLink>

      <!-- Menu -->
      <ul class="flex gap-8 text-gray-700 font-medium">
        <li>
          <NuxtLink to="/" class="hover:text-blue-700 transition">
            Home
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/produk" class="hover:text-blue-700 transition">
            Produk
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/service" class="hover:text-blue-700 transition">
            Servis
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/jual" class="hover:text-blue-700 transition">
            Jual
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/cart" class="relative">
            <span class="text-2xl">🛒</span>

            <span
              v-if="totalItems > 0"
              class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
            >
              {{ totalItems }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
