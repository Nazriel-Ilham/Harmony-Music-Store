<script setup>
import { ref, computed, onMounted } from "vue";

// Sembunyikan layout default customer
definePageMeta({
  layout: false,
});

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const orders = ref([]);
const categories = ref([]);
const pending = ref(true);

// State Modal, File, dan Form Tambah Produk
const showModal = ref(false);
const isUploading = ref(false);
const selectedFile = ref(null);

const newProduct = ref({
  name: "",
  price: null,
  stock: 1,
  category_id: "",
  description: "",
});

const logout = async () => {
  await supabase.auth.signOut();
  navigateTo("/login");
};

// Fetch Data Kategori dari Database Supabase
const fetchCategories = async () => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name");

    if (error) throw error;

    if (data && data.length > 0) {
      categories.value = data;
      // Set default value ke kategori pertama
      newProduct.value.category_id = data[0].id;
    }
  } catch (err) {
    console.error("Gagal mengambil data kategori:", err.message);
  }
};

// Handle Pemilihan File Gambar
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
  }
};

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

// Helper Gambar Produk
const getProductImage = (item) => {
  return (
    item.products?.image_url ||
    item.products?.image ||
    "https://via.placeholder.com/150"
  );
};

// Ringkasan Notifikasi Status
const stats = computed(() => {
  const count = { pending: 0, diproses: 0, dikirim: 0, selesai: 0 };
  orders.value.forEach((order) => {
    const status = order.status?.toLowerCase();
    if (status === "pending") count.pending++;
    else if (status === "diproses") count.diproses++;
    else if (status === "dikirim") count.dikirim++;
    else if (status === "selesai" || status === "completed") count.selesai++;
  });
  return count;
});

const fetchAllOrders = async () => {
  pending.value = true;
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      created_at,
      total_price,
      status,
      user_id,
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
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gagal mengambil data admin:", error.message);
    orders.value = [];
  } else {
    orders.value = data || [];
  }
  pending.value = false;
};

const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) throw error;
    await fetchAllOrders();
  } catch (err) {
    alert("Gagal mengubah status: " + err.message);
  }
};

const deleteOrder = async (orderId) => {
  if (!confirm(`Hapus pesanan #${orderId} secara permanen?`)) return;
  try {
    await supabase.from("order_items").delete().eq("order_id", orderId);
    const { error } = await supabase.from("orders").delete().eq("id", orderId);
    if (error) throw error;
    await fetchAllOrders();
  } catch (err) {
    alert("Gagal menghapus pesanan: " + err.message);
  }
};

// Fungsi Tambah Produk + Upload File Gambar ke Supabase Storage
const handleAddProduct = async () => {
  if (!newProduct.value.name || !newProduct.value.price) {
    alert("Nama dan Harga produk wajib diisi!");
    return;
  }

  isUploading.value = true;

  try {
    let imageUrl = "";

    // Unggah file ke bucket 'products' di Supabase jika ada file yang dipilih
    if (selectedFile.value) {
      const fileExt = selectedFile.value.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `product-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(filePath, selectedFile.value);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("products")
        .getPublicUrl(filePath);

      imageUrl = publicUrlData.publicUrl;
    }

    // Ambil nama kategori yang dipilih berdasarkan category_id
    const selectedCategoryObj = categories.value.find(
      (c) => c.id === newProduct.value.category_id,
    );
    const categoryName = selectedCategoryObj
      ? selectedCategoryObj.name
      : "Alat Musik";

    // Simpan ke Database
    const { error: insertError } = await supabase.from("products").insert([
      {
        name: newProduct.value.name,
        price: newProduct.value.price,
        stock: newProduct.value.stock,
        image_url: imageUrl,
        description: newProduct.value.description,
        category: categoryName, // Menyimpan teks nama kategori ke kolom 'category'
      },
    ]);

    if (insertError) throw insertError;

    alert("Produk dan gambar berhasil ditambahkan!");

    // Reset Form & State
    newProduct.value = {
      name: "",
      price: null,
      stock: 1,
      category_id: categories.value[0]?.id || "",
      description: "",
    };
    selectedFile.value = null;
    showModal.value = false;
  } catch (err) {
    alert("Gagal menambah produk: " + err.message);
  } finally {
    isUploading.value = false;
  }
};

onMounted(() => {
  fetchAllOrders();
  fetchCategories();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Navbar Khusus Admin -->
    <header
      class="bg-white border-b border-gray-200 py-4 px-8 flex justify-between items-center shadow-sm"
    >
      <div class="flex items-center gap-3">
        <span class="text-2xl">🎵</span>
        <div>
          <h1 class="font-bold text-gray-900 leading-none">
            Harmony Music Store
          </h1>
          <span
            class="text-xs text-purple-600 font-semibold uppercase tracking-wider"
            >Admin Panel</span
          >
        </div>
      </div>

      <div class="flex items-center gap-4">
        <button
          @click="showModal = true"
          class="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-sm"
        >
          ➕ Tambah Produk
        </button>
        <span
          class="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full"
        >
          👤 {{ user?.email }}
        </span>
        <button
          @click="logout"
          class="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-semibold px-4 py-1.5 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </header>

    <!-- Content Halaman Admin -->
    <main class="flex-1 py-10 max-w-6xl mx-auto px-6 w-full">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">
            Kelola Status Pesanan
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            Pantau dan perbarui status pesanan dari pembeli
          </p>
        </div>
        <button
          @click="fetchAllOrders"
          class="bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition flex items-center gap-2"
        >
          🔄 Refresh Data
        </button>
      </div>

      <!-- DASHBOARD NOTIFIKASI STATUS -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div
          class="bg-white p-5 rounded-2xl border shadow-sm flex justify-between items-center"
        >
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase">
              Perlu Diproses
            </p>
            <p class="text-2xl font-bold text-yellow-600 mt-1">
              {{ stats.pending }}
            </p>
          </div>
          <span class="p-3 bg-yellow-50 text-yellow-600 rounded-xl text-xl"
            >⏳</span
          >
        </div>

        <div
          class="bg-white p-5 rounded-2xl border shadow-sm flex justify-between items-center"
        >
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase">
              Diproses Admin
            </p>
            <p class="text-2xl font-bold text-blue-600 mt-1">
              {{ stats.diproses }}
            </p>
          </div>
          <span class="p-3 bg-blue-50 text-blue-600 rounded-xl text-xl"
            >📦</span
          >
        </div>

        <div
          class="bg-white p-5 rounded-2xl border shadow-sm flex justify-between items-center"
        >
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase">
              Sedang Dikirim
            </p>
            <p class="text-2xl font-bold text-purple-600 mt-1">
              {{ stats.dikirim }}
            </p>
          </div>
          <span class="p-3 bg-purple-50 text-purple-600 rounded-xl text-xl"
            >🚚</span
          >
        </div>

        <div
          class="bg-white p-5 rounded-2xl border shadow-sm flex justify-between items-center"
        >
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase">Selesai</p>
            <p class="text-2xl font-bold text-green-600 mt-1">
              {{ stats.selesai }}
            </p>
          </div>
          <span class="p-3 bg-green-50 text-green-600 rounded-xl text-xl"
            >✅</span
          >
        </div>
      </div>

      <!-- DAFTAR PESANAN -->
      <div
        v-if="pending"
        class="text-center py-12 text-gray-500 bg-white rounded-2xl border shadow-sm"
      >
        Memuat data pesanan...
      </div>

      <div v-else-if="orders.length > 0" class="space-y-6">
        <div
          v-for="order in orders"
          :key="order.id"
          class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div
            class="flex flex-wrap justify-between items-center pb-4 mb-4 border-b gap-4"
          >
            <div>
              <span class="text-xs font-bold text-blue-600 block"
                >ID Pesanan: #{{ order.id }}</span
              >
              <span class="text-xs text-gray-400 block"
                >User ID: {{ order.user_id }}</span
              >
              <span class="text-xs text-gray-600 font-medium mt-1 block">{{
                formatDate(order.created_at)
              }}</span>
            </div>

            <div class="flex items-center gap-3">
              <span class="text-xs font-bold text-gray-500">STATUS:</span>
              <select
                :value="order.status"
                @change="updateOrderStatus(order.id, $event.target.value)"
                class="text-xs font-bold px-3 py-2 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-500"
              >
                <option value="Pending">PENDING</option>
                <option value="Diproses">DIPROSES</option>
                <option value="Dikirim">DIKIRIM</option>
                <option value="Selesai">SELESAI</option>
              </select>

              <button
                @click="deleteOrder(order.id)"
                class="text-xs text-red-600 hover:text-red-800 font-semibold border border-red-200 hover:bg-red-50 px-3 py-2 rounded-xl transition"
              >
                Hapus
              </button>
            </div>
          </div>

          <div class="space-y-4">
            <div
              v-for="item in order.order_items"
              :key="item.id"
              class="flex items-center gap-4"
            >
              <img
                :src="getProductImage(item)"
                :alt="item.products?.name || 'Produk'"
                class="w-16 h-16 object-contain rounded-lg border bg-gray-50"
              />
              <div class="flex-1">
                <h3 class="font-semibold text-gray-800 text-sm">
                  {{ item.products?.name || "Produk Alat Musik" }}
                </h3>
                <p class="text-xs text-gray-500">
                  {{ item.quantity }}x @ Rp
                  {{ item.price?.toLocaleString("id-ID") }}
                </p>
              </div>
              <div class="font-semibold text-gray-700 text-sm">
                Rp {{ (item.price * item.quantity).toLocaleString("id-ID") }}
              </div>
            </div>
          </div>

          <div class="mt-6 pt-4 border-t flex justify-between items-center">
            <span class="text-xs text-gray-500 font-medium"
              >Total Pembayaran Customer</span
            >
            <span class="text-lg font-bold text-blue-700">
              Rp {{ order.total_price?.toLocaleString("id-ID") }}
            </span>
          </div>
        </div>
      </div>

      <div
        v-else
        class="text-center py-16 bg-white rounded-2xl border shadow-sm"
      >
        <p class="text-gray-500 text-sm">Belum ada pesanan masuk.</p>
      </div>
    </main>

    <!-- MODAL FORM TAMBAH PRODUK -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Tambah Produk Baru</h2>

        <form @submit.prevent="handleAddProduct" class="space-y-4">
          <div>
            <label class="text-xs font-semibold text-gray-600 block mb-1"
              >Nama Produk</label
            >
            <input
              v-model="newProduct.name"
              type="text"
              placeholder="Contoh: Gitar Akustik Yamaha"
              required
              class="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <!-- INPUT DROPDOWN KATEGORI -->
          <div>
            <label class="text-xs font-semibold text-gray-600 block mb-1"
              >Kategori Produk</label
            >
            <select
              v-model="newProduct.category_id"
              required
              class="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white"
            >
              <option value="" disabled>Pilih Kategori</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs font-semibold text-gray-600 block mb-1"
                >Harga (Rp)</label
              >
              <input
                v-model.number="newProduct.price"
                type="number"
                placeholder="1000000"
                required
                class="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div>
              <label class="text-xs font-semibold text-gray-600 block mb-1"
                >Stok Awal</label
              >
              <input
                v-model.number="newProduct.stock"
                type="number"
                min="1"
                required
                class="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label class="text-xs font-semibold text-gray-600 block mb-1"
              >Foto Produk (File Gambar)</label
            >
            <input
              type="file"
              accept="image/*"
              @change="handleFileChange"
              class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 border rounded-xl p-1 cursor-pointer"
            />
          </div>

          <div>
            <label class="text-xs font-semibold text-gray-600 block mb-1"
              >Deskripsi Produk</label
            >
            <textarea
              v-model="newProduct.description"
              rows="3"
              placeholder="Deskripsi singkat produk..."
              class="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
            ></textarea>
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button
              type="button"
              @click="showModal = false"
              class="px-4 py-2 border rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="isUploading"
              class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold disabled:opacity-50"
            >
              {{ isUploading ? "Mengunggah..." : "Simpan Produk" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
