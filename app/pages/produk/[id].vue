<script setup>
import { ref, computed, onMounted } from "vue";
import ProductReview from "~/components/product/ProductReview.vue";

definePageMeta({
  middleware: ["auth"],
});

const route = useRoute();
const client = useSupabaseClient();
const { addToCart } = useCart();

const product = ref(null);
const allProducts = ref([]);
const pending = ref(true);
const quantity = ref(1);

// Ambil data detail produk & daftar produk terkait dari Supabase
const fetchProductDetail = async () => {
  try {
    pending.value = true;

    // 1. Ambil detail produk berdasarkan ID di URL
    const { data: currentProduct, error } = await client
      .from("products")
      .select("*")
      .eq("id", route.params.id)
      .single();

    if (error) throw error;
    product.value = currentProduct;

    // 2. Ambil produk lain untuk bagian 'Produk Terkait'
    const { data: otherProducts } = await client
      .from("products")
      .select("*")
      .neq("id", route.params.id)
      .limit(4);

    if (otherProducts) {
      allProducts.value = otherProducts;
    }
  } catch (err) {
    console.error("Gagal mengambil detail produk:", err.message);
  } finally {
    pending.value = false;
  }
};

onMounted(() => {
  fetchProductDetail();
});

// Quantity Control
const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

// Tambah ke Keranjang
const handleAddToCart = () => {
  if (!product.value) return;
  addToCart(product.value, quantity.value);
};

// Related Products dari Supabase
const relatedProducts = computed(() => allProducts.value);
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

      <!-- Status Loading -->
      <div v-if="pending" class="py-20 text-center text-gray-500">
        Memuat detail produk...
      </div>

      <!-- Jika Produk Ditemukan -->
      <div v-else-if="product">
        <div class="grid gap-12 lg:grid-cols-2">
          <!-- Gambar Produk dari Supabase Storage -->
          <div
            class="rounded-2xl bg-white p-8 shadow flex items-center justify-center"
          >
            <img
              :src="product.image_url || product.image || '/placeholder.png'"
              :alt="product.name"
              class="mx-auto h-96 object-contain"
            />
          </div>

          <!-- Informasi Produk -->
          <div>
            <span
              class="rounded-full bg-blue-100 px-4 py-2 text-blue-700 font-medium"
            >
              {{ product.category || "Alat Musik" }}
            </span>

            <h1 class="mt-6 text-5xl font-bold">
              {{ product.name }}
            </h1>

            <div class="mt-6 flex items-center gap-2">
              <span class="text-xl text-yellow-500"> ★★★★★ </span>
              <span class="text-gray-600">
                ({{ product.rating || "5.0" }})
              </span>
            </div>

            <p class="mt-6 text-4xl font-bold text-blue-700">
              Rp {{ Number(product.price || 0).toLocaleString("id-ID") }}
            </p>

            <div class="mt-8 space-y-3 text-gray-700">
              <p>
                <span class="font-semibold"> Stok : </span>
                {{ product.stock ?? 1 }} Unit
              </p>
              <p>
                <span class="font-semibold"> Kondisi : </span>
                {{ product.condition || "Sangat Baik" }}
              </p>
              <p>
                <span class="font-semibold"> Garansi : </span>
                {{ product.warranty || "1 Bulan Toko" }}
              </p>
            </div>

            <div class="mt-8">
              <h3 class="mb-2 text-xl font-semibold">Deskripsi</h3>
              <p class="leading-8 text-gray-600">
                {{ product.description || "Tidak ada deskripsi tersedia." }}
              </p>
            </div>

            <!-- Quantity Counter -->
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

            <!-- Action Buttons -->
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

        <!-- FITUR PRODUCT REVIEW (Interaksi CRUD ke tabel reviews) -->
        <ProductReview :product-id="Number(route.params.id)" />
      </div>

      <!-- Jika Produk Tidak Ditemukan -->
      <div v-else class="py-20 text-center text-red-500 font-semibold">
        Produk tidak ditemukan.
      </div>

      <!-- Produk Terkait dari Database Supabase -->
      <div v-if="relatedProducts.length > 0" class="mt-24">
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
    </div>
  </section>
</template>
