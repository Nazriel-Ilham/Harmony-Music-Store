<script setup>
import { computed } from "vue";
import { useCart } from "~/composables/useCart";

// Ambil data keranjang belanja
const { totalItems } = useCart();

// Ambil data Supabase Auth & Router
const user = useSupabaseUser();
const client = useSupabaseClient();
const router = useRouter();

// Mengambil username dari email (sebelum tanda @)
const username = computed(() => {
  if (!user.value?.email) return "";
  return user.value.email.split("@")[0];
});

// Fungsi Logout
const handleLogout = async () => {
  await client.auth.signOut();
  router.push("/login");
};
</script>

<template>
  <nav class="sticky top-0 z-50 bg-white shadow-md">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
      <!-- Logo Website (Arahkan ke Home) -->
      <NuxtLink to="/" class="text-2xl font-bold text-blue-900">
        🎵 Harmony Music Store
      </NuxtLink>

      <!-- Menu Navigasi -->
      <ul class="flex items-center gap-8 font-medium text-gray-700">
        <li>
          <NuxtLink
            to="/"
            class="transition hover:text-blue-700"
            active-class="text-blue-700 font-bold"
          >
            Home
          </NuxtLink>
        </li>

        <li>
          <NuxtLink
            to="/produk"
            class="transition hover:text-blue-700"
            active-class="text-blue-700 font-bold"
          >
            Produk
          </NuxtLink>
        </li>

        <li>
          <!-- Diperbaiki dari /service menjadi /servis -->
          <NuxtLink
            to="/servis"
            class="transition hover:text-blue-700"
            active-class="text-blue-700 font-bold"
          >
            Servis
          </NuxtLink>
        </li>

        <li>
          <NuxtLink
            to="/jual"
            class="transition hover:text-blue-700"
            active-class="text-blue-700 font-bold"
          >
            Jual
          </NuxtLink>
        </li>

        <!-- Keranjang Belanja -->
        <li>
          <NuxtLink to="/cart" class="relative block">
            <span class="text-2xl">🛒</span>
            <span
              v-if="totalItems > 0"
              class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
            >
              {{ totalItems }}
            </span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/pesanan"
            class="transition hover:text-blue-700"
            active-class="text-blue-700 font-bold"
          >
            Pesanan Saya
          </NuxtLink>
        </li>

        <!-- User Profile & Auth Button -->
        <li class="ml-2 flex items-center">
          <!-- Jika Belum Login -->
          <NuxtLink
            v-if="!user"
            to="/login"
            class="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Sign In
          </NuxtLink>

          <!-- Jika Sudah Login -->
          <div v-else class="flex items-center gap-3">
            <span
              class="rounded-full border border-gray-200 bg-gray-100 px-3 py-1.5 text-xs font-semibold capitalize text-gray-700"
            >
              👤 {{ username }}
            </span>
            <button
              @click="handleLogout"
              class="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>
