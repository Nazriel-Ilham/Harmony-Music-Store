<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useCart } from "~/composables/useCart";

// Ambil data keranjang belanja
const { totalItems } = useCart();

// Ambil data Supabase Auth & Router
const user = useSupabaseUser();
const client = useSupabaseClient();
const router = useRouter();

// State Role (default: user)
const userRole = ref("user");

// Fungsi Mengambil Role User dari Supabase
const fetchRole = async () => {
  if (!user.value) {
    userRole.value = "user";
    return;
  }
  const { data } = await client
    .from("profiles")
    .select("role")
    .eq("id", user.value.id)
    .maybeSingle();

  if (data?.role) {
    userRole.value = data.role.toLowerCase();
  }
};

onMounted(fetchRole);
watch(user, fetchRole);

// Mengambil username dari email (teks sebelum tanda @)
const username = computed(() => {
  if (!user.value?.email) return "";
  return user.value.email.split("@")[0];
});

// Fungsi Logout
const handleLogout = async () => {
  await client.auth.signOut();
  userRole.value = "user";
  router.push("/login");
};
</script>

<template>
  <nav class="sticky top-0 z-50 bg-white shadow-md">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
      <!-- Logo Website -->
      <NuxtLink
        :to="userRole === 'admin' ? '/admin' : '/'"
        class="text-2xl font-bold text-blue-900"
      >
        🎵 Harmony Music Store
      </NuxtLink>

      <!-- Menu Navigasi -->
      <ul class="flex items-center gap-8 font-medium text-gray-700">
        <!-- ==================== 1. TAMPILAN KHUSUS ADMIN ==================== -->
        <!-- Jika Login Admin: HANYA TAMPILKAN KELOLA PESANAN & PRODUK -->
        <template v-if="userRole === 'admin'">
          <li>
            <NuxtLink
              to="/admin"
              class="font-bold text-blue-900 transition hover:text-blue-700"
              active-class="text-blue-700 underline"
            >
              🛠️ Dashboard Pengiriman & Kelola Produk
            </NuxtLink>
          </li>
        </template>

        <!-- ==================== 2. TAMPILAN KHUSUS USER BIASA ==================== -->
        <template v-else>
          <li>
            <NuxtLink to="/" class="transition hover:text-blue-700"
              >Home</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/produk" class="transition hover:text-blue-700"
              >Produk</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/servis" class="transition hover:text-blue-700"
              >Servis</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/jual" class="transition hover:text-blue-700"
              >Jual Barang</NuxtLink
            >
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
            <NuxtLink to="/pesanan" class="transition hover:text-blue-700"
              >Pesanan Saya</NuxtLink
            >
          </li>
        </template>

        <!-- ==================== 3. USER PROFILE & AUTH BUTTON ==================== -->
        <li class="ml-2 flex items-center">
          <NuxtLink
            v-if="!user"
            to="/login"
            class="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Sign In
          </NuxtLink>

          <div v-else class="flex items-center gap-3">
            <span
              class="rounded-full border border-gray-200 bg-gray-100 px-3 py-1.5 text-xs font-semibold capitalize text-gray-700"
            >
              👤 {{ username }} {{ userRole === "admin" ? "(Admin)" : "" }}
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
