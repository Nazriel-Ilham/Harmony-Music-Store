<script setup>
const supabase = useSupabaseClient();
const orders = ref([]);
const pending = ref(true);

const fetchOrders = async () => {
  pending.value = true;
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
        products (
          name,
          image_url
        )
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (!error) orders.value = data || [];
  pending.value = false;
};

// Fungsi membatalkan/menghapus pesanan
const cancelOrder = async (orderId) => {
  if (!confirm("Apakah Anda yakin ingin membatalkan pesanan ini?")) return;

  // Hapus item pesanan terlebih dahulu (karena foreign key)
  await supabase.from("order_items").delete().eq("order_id", orderId);

  // Hapus header pesanan
  const { error } = await supabase.from("orders").delete().eq("id", orderId);

  if (error) {
    alert("Gagal membatalkan pesanan: " + error.message);
  } else {
    alert("Pesanan berhasil dibatalkan!");
    fetchOrders(); // Refresh data
  }
};

onMounted(() => {
  fetchOrders();
});

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
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
                  'bg-yellow-100 text-yellow-800': order.status === 'pending',
                  'bg-green-100 text-green-800':
                    order.status === 'completed' || order.status === 'selesai',
                  'bg-red-100 text-red-800': order.status === 'cancelled',
                }"
              >
                {{ order.status }}
              </span>

              <!-- Tombol Batalkan Pesanan (Hanya jika masih pending) -->
              <button
                v-if="order.status === 'pending'"
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
                :src="
                  item.products?.image_url || '/images/categories/guitar.png'
                "
                :alt="item.products?.name"
                class="w-16 h-16 object-contain rounded-lg border bg-gray-50 p-2"
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
