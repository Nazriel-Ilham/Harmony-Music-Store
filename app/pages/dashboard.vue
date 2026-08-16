<script setup>
import { ref, onMounted } from "vue";

definePageMeta({
  middleware: "auth",
});

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const userRole = ref("user");
const allOrders = ref([]);
const myOrders = ref([]);
const notifications = ref([]);
const sellerProducts = ref([]);

const loadDashboardData = async () => {
  if (!user.value) return;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.value.id)
    .maybeSingle();

  if (profile) userRole.value = profile.role || "user";

  if (userRole.value === "admin") {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    allOrders.value = data || [];
  } else if (userRole.value === "seller" || userRole.value === "penjual") {
    const { data: notifData } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.value.id);
    notifications.value = notifData || [];

    const { data: productData } = await supabase
      .from("products")
      .select("*")
      .eq("seller_id", user.value.id);
    sellerProducts.value = productData || [];
  } else {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.value.id);
    myOrders.value = data || [];
  }
};

const updateStatus = async (orderId, newStatus) => {
  const { error } = await supabase
    .from("orders")
    .update({ status: newStatus })
    .eq("id", orderId);

  if (!error) {
    alert(`Status pesanan #${orderId} berhasil diubah ke ${newStatus}`);
    loadDashboardData();
  } else {
    alert("Gagal mengubah status: " + error.message);
  }
};

onMounted(() => {
  loadDashboardData();
});
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <span
        class="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full uppercase"
      >
        Role: {{ userRole }}
      </span>
    </div>

    <!-- TAMPILAN ADMIN -->
    <div v-if="userRole === 'admin'" class="space-y-6">
      <h2 class="text-lg font-semibold text-gray-800">
        Manajemen Seluruh Transaksi Toko
      </h2>
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead class="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th class="p-3 border-b">ID Order</th>
              <th class="p-3 border-b">No. WA</th>
              <th class="p-3 border-b">Alamat</th>
              <th class="p-3 border-b">Total</th>
              <th class="p-3 border-b">Status Pengiriman</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr
              v-for="order in allOrders"
              :key="order.id"
              class="border-b hover:bg-gray-50"
            >
              <td class="p-3 font-mono">#{{ order.id }}</td>
              <td class="p-3">{{ order.phone_number || "-" }}</td>
              <td class="p-3 truncate max-w-xs">
                {{ order.shipping_address || "-" }}
              </td>
              <td class="p-3 font-semibold">
                Rp {{ order.total_price?.toLocaleString() }}
              </td>
              <td class="p-3">
                <select
                  :value="order.status"
                  @change="updateStatus(order.id, $event.target.value)"
                  class="border rounded px-2 py-1 text-xs bg-white font-medium"
                >
                  <option value="Pending">Pending</option>
                  <option value="Diproses">Diproses</option>
                  <option value="Dikirim">Dikirim</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </td>
            </tr>
            <tr v-if="allOrders.length === 0">
              <td colspan="5" class="p-4 text-center text-gray-500">
                Belum ada pesanan masuk.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- TAMPILAN PENJUAL -->
    <div
      v-else-if="userRole === 'seller' || userRole === 'penjual'"
      class="space-y-6"
    >
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold">Katalog Produk Saya</h2>
        <NuxtLink
          to="/jual"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          + Tambah Produk
        </NuxtLink>
      </div>

      <div class="bg-white rounded-lg shadow overflow-hidden mb-6">
        <table class="w-full text-left border-collapse">
          <thead class="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th class="p-3 border-b">Nama Produk</th>
              <th class="p-3 border-b">Harga</th>
              <th class="p-3 border-b">Stok</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr
              v-for="product in sellerProducts"
              :key="product.id"
              class="border-b hover:bg-gray-50"
            >
              <td class="p-3 font-medium">{{ product.name }}</td>
              <td class="p-3">Rp {{ product.price?.toLocaleString() }}</td>
              <td class="p-3">{{ product.stock }}</td>
            </tr>
            <tr v-if="sellerProducts.length === 0">
              <td colspan="3" class="p-4 text-center text-gray-500">
                Belum ada produk jualan.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 class="font-bold text-blue-800 text-sm mb-2">
          Notifikasi Penjualan
        </h3>
        <ul class="text-xs text-blue-700 space-y-1">
          <li v-for="notif in notifications" :key="notif.id">
            • {{ notif.message }}
          </li>
          <li v-if="notifications.length === 0">
            Belum ada notifikasi penjualan baru.
          </li>
        </ul>
      </div>
    </div>

    <!-- TAMPILAN PEMBELI -->
    <div v-else class="space-y-6">
      <h2 class="text-lg font-semibold text-gray-800">Riwayat Pesanan Saya</h2>
      <div class="space-y-3">
        <div
          v-for="order in myOrders"
          :key="order.id"
          class="bg-white p-4 rounded-lg shadow border flex justify-between items-center"
        >
          <div>
            <p class="font-bold text-sm">Pesanan #{{ order.id }}</p>
            <p class="text-xs text-gray-500">
              Total: Rp {{ order.total_price?.toLocaleString() }}
            </p>
          </div>
          <span
            class="px-2.5 py-1 text-xs font-bold rounded-full bg-indigo-100 text-indigo-800"
          >
            {{ order.status }}
          </span>
        </div>
        <div
          v-if="myOrders.length === 0"
          class="text-center text-gray-500 py-6"
        >
          Belum ada riwayat pesanan.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
table {
  width: 100%;
}
select:focus {
  outline: 2px solid #4f46e5;
  outline-offset: 1px;
}
</style>
