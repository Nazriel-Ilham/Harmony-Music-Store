<script setup>
const route = useRoute();
const supabase = useSupabaseClient();

const selectedCategory = ref(route.query.category || "Semua");
const products = ref([]);
const pending = ref(true);

const fetchProducts = async () => {
  pending.value = true;
  let query = supabase.from("products").select("*");

  // Jika ada kategori terpilih dan bukan "Semua"
  if (selectedCategory.value && selectedCategory.value !== "Semua") {
    query = query.eq("category", selectedCategory.value);
  }

  const { data, error } = await query;
  if (!error) products.value = data || [];
  pending.value = false;
};

// Pantau perubahan query parameter di URL
watch(
  () => route.query.category,
  (newCategory) => {
    selectedCategory.value = newCategory || "Semua";
    fetchProducts();
  },
  { immediate: true },
);
</script>

<template>
  <section class="bg-gray-50 py-12">
    <div class="mx-auto max-w-7xl px-6">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold">
          Daftar Produk
          {{ selectedCategory !== "Semua" ? `- ${selectedCategory}` : "" }}
        </h1>

        <!-- Tombol Reset Filter jika sedang memfilter -->
        <NuxtLink
          v-if="selectedCategory !== 'Semua'"
          to="/produk"
          class="text-sm font-semibold text-blue-600 hover:underline"
        >
          Lihat Semua Produk
        </NuxtLink>
      </div>

      <div v-if="pending" class="text-center py-12 text-gray-500">
        Memuat produk...
      </div>

      <div
        v-else-if="products.length > 0"
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <ProductCard v-for="item in products" :key="item.id" :product="item" />
      </div>

      <div v-else class="text-center py-12 text-gray-500">
        Tidak ada produk untuk kategori {{ selectedCategory }}.
      </div>
    </div>
  </section>
</template>
