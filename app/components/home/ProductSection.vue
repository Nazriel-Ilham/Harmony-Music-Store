<script setup>
import { ref, onMounted } from "vue";

const client = useSupabaseClient();
const products = ref([]);
const loading = ref(true);

const fetchRecommendedProducts = async () => {
  try {
    loading.value = true;
    // Mengambil 5 produk pertama dari Supabase
    const { data, error } = await client.from("products").select("*").limit(5);

    if (error) throw error;
    products.value = data || [];
  } catch (err) {
    console.error("Gagal mengambil produk rekomendasi:", err.message);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchRecommendedProducts();
});
</script>

<template>
  <section class="bg-gray-100 py-20">
    <div class="mx-auto max-w-7xl px-6">
      <div class="text-center">
        <h2 class="text-4xl font-bold">Produk Rekomendasi</h2>

        <p class="mt-3 text-gray-500">
          Rekomendasi alat musik pilihan terbaik untuk Anda di Harmony Music
          Store.
        </p>
      </div>

      <div class="mt-12">
        <!-- Tampilan Loading -->
        <div v-if="loading" class="text-center py-8 text-gray-500 font-medium">
          Memuat produk rekomendasi...
        </div>

        <!-- Tampilkan Grid Produk Jika Ada -->
        <ProductGrid v-else-if="products.length > 0" :products="products" />

        <!-- Jika Belum Ada Produk -->
        <div v-else class="text-center py-8 text-gray-500">
          Belum ada produk yang tersedia saat ini.
        </div>
      </div>
    </div>
  </section>
</template>
