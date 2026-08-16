<script setup>
import { ref, watch, onMounted } from "vue";

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const orders = ref([]);
const pending = ref(true);

// Helper Format Tanggal
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Helper Gambar Produk (Mengambil dari tabel products)
const getProductImage = (item) => {
  return (
    item.products?.image_url ||
    item.products?.image ||
    "https://via.placeholder.com/150"
  );
};

// Fungsi Membatalkan Pesanan: LANGSUNG HAPUS DARI DATABASE
const cancelOrder = async (orderId) => {
  if (
    !confirm("Apakah Anda yakin ingin membatalkan dan menghapus pesanan ini?")
  )
    return;

  try {
    // 1. Hapus item terkait di order_items
    const { error: itemsError } = await supabase
      .from("order_items")
      .delete()
      .eq("order_id", orderId);

    if (itemsError) throw itemsError;

    // 2. Hapus data utama di orders
    const { error: orderError } = await supabase
      .from("orders")
      .delete()
      .eq("id", orderId);

    if (orderError) throw orderError;

    alert("Pesanan berhasil dihapus.");
    await fetchOrders();
  } catch (err) {
    alert("Gagal membatalkan pesanan: " + err.message);
  }
};

const fetchOrders = async () => {
  pending.value = true;

  // 1. Ambil session user aktif
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const activeUserId = session?.user?.id || user.value?.id;

  if (!activeUserId) {
    orders.value = [];
    pending.value = false;
    return;
  }

  // 2. Query Tanpa image_url di order_items (Kodingan Asli Kamu)
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      created_at,
      total_price,
      status,
      order_items (
        id,
        quantity,
        price,
        product_id,
        products (
          id,
          name,
          image_url,
          image
        )
      )
    `,
    )
    .eq("user_id", activeUserId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gagal Ambil Data Pesanan:", error.message);
    orders.value = [];
  } else {
    orders.value = data || [];
  }

  pending.value = false;
};

// Re-fetch otomatis saat status auth berubah
watch(
  user,
  () => {
    fetchOrders();
  },
  { immediate: true },
);

onMounted(() => {
  fetchOrders();
});
</script>

<template>
  <section class="bg-gray-50 py-16 min-h-screen">
    <div class="mx-auto max-w-5xl px-6">
      <h1 class="text-4xl font-bold mb-8">Riwayat Pesanan Saya</h1>

      <div v-if="pending" class="text-center py-12 text-gray-500">
        Memuat riwayat pesanan...
      </div>

      <div v-else-if="orders.length > 0" class="space-y-6">
        <div
          v-for="order in orders"
          :key="order.id"
          class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <!-- Header Pesanan -->
          <div
            class="flex flex-wrap justify-between items-center pb-4 mb-4 border-b gap-2"
          >
            <div>
              <span class="text-xs text-gray-500 block"
                >ID Pesanan: #{{ order.id }}</span
              >
              <span class="text-sm font-medium text-gray-700">{{
                formatDate(order.created_at)
              }}</span>
            </div>

            <div class="flex items-center gap-3">
              <span
                class="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                :class="{
                  'bg-yellow-100 text-yellow-800':
                    order.status?.toLowerCase() === 'pending',
                  'bg-green-100 text-green-800':
                    order.status?.toLowerCase() === 'completed' ||
                    order.status?.toLowerCase() === 'selesai',
                  'bg-red-100 text-red-800':
                    order.status?.toLowerCase() === 'cancelled',
                }"
              >
                {{ order.status }}
              </span>

              <button
                v-if="order.status?.toLowerCase() === 'pending'"
                @click="cancelOrder(order.id)"
                class="text-xs text-red-600 hover:text-red-800 font-semibold border border-red-200 hover:bg-red-50 px-3 py-1 rounded-lg transition"
              >
                Batalkan
              </button>
            </div>
          </div>

          <!-- Rincian Produk -->
          <div class="space-y-4">
            <div
              v-for="item in order.order_items"
              :key="item.id"
              class="flex items-center gap-4"
            >
              <img
                :src="getProductImage(item)"
                :alt="item.products?.name || 'Gambar Produk'"
                class="w-16 h-16 object-contain rounded-lg border bg-gray-50"
              />
              <div class="flex-1">
                <h3 class="font-semibold text-gray-800">
                  {{ item.products?.name || "Produk Alat Musik" }}
                </h3>
                <p class="text-sm text-gray-500">
                  {{ item.quantity }}x @ Rp
                  {{ item.price?.toLocaleString("id-ID") }}
                </p>
              </div>
              <div class="font-semibold text-gray-700">
                Rp {{ (item.price * item.quantity).toLocaleString("id-ID") }}
              </div>
            </div>
          </div>

          <!-- Total Harga -->
          <div class="mt-6 pt-4 border-t flex justify-between items-center">
            <span class="text-gray-600 font-medium">Total Pembayaran</span>
            <span class="text-xl font-bold text-blue-700">
              Rp {{ order.total_price?.toLocaleString("id-ID") }}
            </span>
          </div>
        </div>
      </div>

      <div
        v-else
        class="text-center py-16 bg-white rounded-2xl shadow-sm border"
      >
        <p class="text-gray-500 text-lg mb-4">Belum ada riwayat pesanan.</p>
        <NuxtLink
          to="/produk"
          class="inline-block bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-800 transition"
        >
          Mulai Belanja
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
