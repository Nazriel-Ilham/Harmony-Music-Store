<script setup>
import { computed, ref, onMounted } from "vue";

// Mengaktifkan proteksi middleware auth
definePageMeta({
  middleware: ["auth"],
});

// Integrasi Supabase
const client = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

const products = ref([]);
const pending = ref(true);

// Mengambil data produk dari database Supabase
const fetchProducts = async () => {
  pending.value = true;
  // Menambahkan .order() agar produk terbaru berada di posisi paling atas
  const { data, error } = await client
    .from("products")
    .select("*")
    .order("id", { ascending: false });

  if (!error && data) {
    products.value = data;
  }
  pending.value = false;
};

onMounted(() => {
  fetchProducts();
});

// Fitur Logout
const logout = async () => {
  await client.auth.signOut();
  router.push("/login");
};

// Logika Search, Sort & Filter kamu sebelumnya
const search = ref("");
const sortBy = ref("default");
const selectedCategory = ref("Semua");

const categories = ["Semua", "Gitar", "Keyboard", "Drum", "Biola"];

const filteredProducts = computed(() => {
  let result = [...products.value];

  if (search.value.trim()) {
    result = result.filter((product) =>
      product.name.toLowerCase().includes(search.value.toLowerCase()),
    );
  }

  if (selectedCategory.value !== "Semua") {
    result = result.filter(
      (product) => product.category === selectedCategory.value,
    );
  }

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
  <section class="bg-gray-50 py-10 min-h-screen">
    <div class="mx-auto max-w-7xl px-6">
      <!-- Topbar Info User & Logout -->
      <div
        class="flex justify-between items-center mb-8 pb-4 border-b border-gray-200"
      >
        <div>
          <p v-if="user" class="text-sm text-gray-600">
            Selamat datang,
            <span class="font-bold text-indigo-600">{{ user.email }}</span>
          </p>
        </div>
        <div>
          <button
            @click="logout"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>

      <h1 class="text-5xl font-bold">Produk Kami</h1>
      <p class="mt-4 text-gray-500">
        Temukan alat musik favoritmu dari Database Supabase.
      </p>

      <!-- Component Search, Sort & Filter milikmu -->
      <ProductSearch v-model="search" />
      <ProductSort v-model="sortBy" />
      <ProductFilter v-model="selectedCategory" :categories="categories" />

      <!-- Daftar Produk dari Database -->
      <div class="mt-10">
        <div v-if="pending" class="text-center py-10 text-gray-500">
          Memuat data dari database Supabase...
        </div>
        <ProductGrid v-else :products="filteredProducts" />
      </div>
    </div>
  </section>
</template>
