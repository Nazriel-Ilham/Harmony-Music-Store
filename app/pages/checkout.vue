<script setup>
import { ref, computed, onMounted } from "vue";

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

// Gunakan useCart agar terhubung dengan state global keranjang
const { cart, subtotal: cartSubtotal, clearCart } = useCart();

const shippingDetails = ref({ name: "", phone: "", address: "" });
const phoneError = ref("");
const isSubmitting = ref(false);

// Menggunakan data dari useCart()
const cartItems = computed(() => cart.value);

onMounted(() => {
  // Cek autentikasi saat komponen dimuat
  if (!user.value) {
    alert("Silakan login terlebih dahulu untuk melakukan checkout.");
    router.push("/login");
    return;
  }

  // Set default nama dari metadata user (opsional)
  if (user.value?.user_metadata?.full_name) {
    shippingDetails.value.name = user.value.user_metadata.full_name;
  }
});

// Mengambil subtotal langsung dari composable useCart
const subtotal = computed(() => cartSubtotal.value);

const validatePhone = (phone) => {
  const phoneRegex = /^(^\+62|62|^08)(\d{8,11})$/;
  return phoneRegex.test(phone);
};

const handleCheckout = async () => {
  phoneError.value = "";

  // Ambil data user aktif secara presisi langsung dari Supabase Client
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();
  const activeUserId = currentUser?.id || user.value?.id;

  if (!activeUserId) {
    alert(
      "Sesi login Anda tidak terdeteksi. Silakan logout lalu login kembali.",
    );
    router.push("/login");
    return;
  }

  if (cartItems.value.length === 0) {
    alert("Keranjang belanja Anda kosong!");
    return;
  }

  if (!shippingDetails.value.name) {
    alert("Nama lengkap wajib diisi!");
    return;
  }

  if (!shippingDetails.value.phone) {
    phoneError.value = "Nomor WhatsApp wajib diisi.";
    return;
  }

  if (!validatePhone(shippingDetails.value.phone)) {
    phoneError.value =
      "Nomor WA tidak valid! Gunakan awalan 08 atau 628 (10-13 digit).";
    return;
  }

  if (!shippingDetails.value.address) {
    alert("Alamat pengiriman wajib diisi!");
    return;
  }

  try {
    isSubmitting.value = true;

    const totalBayar = subtotal.value + 20000;

    // Header cookie agar token/sesi autentikasi login ikut terkirim ke Nuxt API Server
    const headers = useRequestHeaders(["cookie"]);

    const response = await $fetch("/api/checkout", {
      method: "POST",
      headers,
      body: {
        user_id: activeUserId,
        userId: activeUserId,
        shippingName: shippingDetails.value.name,
        shippingPhone: shippingDetails.value.phone,
        shippingAddress: shippingDetails.value.address,
        totalPrice: totalBayar,
        items: cartItems.value.map((item) => ({
          productId: item.id,
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
          image_url: item.image_url || item.image || item.image_path || null,
        })),
        paymentMethod: "QRIS",
      },
    });

    if (response && response.success) {
      // Bersihkan keranjang belanja via useCart
      clearCart();
      alert("Pesanan berhasil dibuat!");
      navigateTo("/pesanan");
    }
  } catch (error) {
    const errorMsg =
      error.data?.statusMessage || error.message || "Terjadi kesalahan";
    alert("Gagal Checkout: " + errorMsg);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="checkout-container">
    <h1 class="page-title">Formulir Checkout Pesanan</h1>

    <div class="checkout-grid">
      <!-- Form Informasi Pengiriman -->
      <div class="form-section">
        <h2 class="section-title">Informasi Pengiriman</h2>

        <div class="form-group">
          <label>Nama Lengkap Penerima</label>
          <input
            v-model="shippingDetails.name"
            type="text"
            placeholder="Masukkan nama lengkap"
          />
        </div>

        <div class="form-group">
          <label>Nomor WhatsApp (Aktif)</label>
          <input
            v-model="shippingDetails.phone"
            type="tel"
            placeholder="Contoh: 08123456789 atau 628123456789"
          />
          <p v-if="phoneError" class="error-text">{{ phoneError }}</p>
        </div>

        <div class="form-group">
          <label>Alamat Lengkap Pengiriman</label>
          <textarea
            v-model="shippingDetails.address"
            rows="3"
            placeholder="Jl. Raya No. 123, Kota, Kode Pos"
          ></textarea>
        </div>

        <!-- Opsi Pembayaran QRIS -->
        <div class="payment-section">
          <h2 class="section-title">Metode Pembayaran</h2>
          <div class="qris-card">
            <p class="qris-title">Pembayaran via QRIS Statis Toko</p>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=HARMONY_MUSIC_STORE_PAYMENT"
              alt="QRIS Code"
              class="qris-image"
            />
            <p class="qris-desc">
              Pindai QRIS di atas untuk melakukan transfer pembayaran.
            </p>
          </div>
        </div>
      </div>

      <!-- Ringkasan Pesanan -->
      <div class="summary-card">
        <h2 class="section-title">Ringkasan Pesanan</h2>

        <div v-if="cartItems.length === 0" class="empty-cart-text">
          Keranjang belanja Anda kosong.
        </div>

        <div v-for="item in cartItems" :key="item.id" class="summary-item">
          <span>{{ item.name }} (x{{ item.quantity }})</span>
          <span
            >Rp {{ (item.price * item.quantity).toLocaleString("id-ID") }}</span
          >
        </div>

        <div class="summary-details">
          <div class="summary-row">
            <span>Subtotal</span>
            <span>Rp {{ subtotal.toLocaleString("id-ID") }}</span>
          </div>
          <div class="summary-row">
            <span>Ongkos Kirim</span>
            <span>Rp 20.000</span>
          </div>
          <div class="summary-row total-row">
            <span>Total Bayar</span>
            <span>Rp {{ (subtotal + 20000).toLocaleString("id-ID") }}</span>
          </div>
        </div>

        <button
          @click="handleCheckout"
          :disabled="isSubmitting || cartItems.length === 0"
          class="btn-submit"
        >
          {{
            isSubmitting
              ? "Memproses Pesanan..."
              : "Konfirmasi & Memproses Pesanan"
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-container {
  max-width: 56rem;
  margin: 0 auto;
  padding: 1.5rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.checkout-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .checkout-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem;
}

.error-text {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.payment-section {
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.qris-card {
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background-color: #f9fafb;
  text-align: center;
}

.qris-title {
  font-weight: 700;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.qris-image {
  margin: 0 auto 0.5rem auto;
  border-radius: 0.25rem;
  border: 1px solid #e5e7eb;
  padding: 0.5rem;
  background-color: #ffffff;
}

.qris-desc {
  font-size: 0.75rem;
  color: #6b7280;
}

.summary-card {
  background-color: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  height: fit-content;
}

.empty-cart-text {
  font-size: 0.875rem;
  color: #9ca3af;
  margin-bottom: 1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.summary-details {
  border-top: 1px solid #e5e7eb;
  margin-top: 1rem;
  padding-top: 0.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.total-row {
  font-weight: 700;
  font-size: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e5e7eb;
  margin-top: 0.5rem;
}

.btn-submit {
  width: 100%;
  background-color: #2563eb;
  color: #ffffff;
  font-weight: 700;
  padding: 0.75rem 0;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
}

.btn-submit:hover {
  background-color: #1d4ed8;
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
