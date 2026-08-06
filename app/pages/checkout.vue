<script setup>
definePageMeta({
  middleware: ["auth"],
});

const router = useRouter();
const supabase = useSupabaseClient();
const { cart, subtotal, clearCart } = useCart();

const shippingCost = 20000;
const total = computed(() => (subtotal.value || 0) + shippingCost);
const isLoading = ref(false);

const customer = reactive({
  name: "",
  email: "",
  phone: "",
  address: "",
});

const checkout = async () => {
  // Validasi input sederhana
  if (!customer.name || !customer.phone || !customer.address) {
    return alert("Harap lengkapi semua data pengiriman!");
  }

  if (!cart.value || cart.value.length === 0) {
    return alert("Keranjang belanja kamu masih kosong!");
  }

  isLoading.value = true;

  try {
    // 1. Simpan/Buat Data Profil Pengguna (Tabel profiles)
    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .insert({
        id: crypto.randomUUID(),
        full_name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
      })
      .select()
      .single();

    if (profileErr) throw profileErr;

    // 2. Simpan Transaksi Utama (Tabel orders)
    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert({
        user_id: profile.id,
        total_price: total.value,
        status: "pending",
      })
      .select()
      .single();

    if (orderErr) throw orderErr;

    // 3. Simpan Rincian Produk Pesanan (Tabel order_items)
    const orderItems = cart.value.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsErr } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsErr) throw itemsErr;

    // Kosongkan keranjang & arahkan ke halaman sukses
    clearCart();
    router.push("/order-success");
  } catch (err) {
    console.error("Gagal melakukan checkout:", err.message);
    alert("Terjadi kesalahan saat memproses pesanan: " + err.message);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <section class="bg-gray-50 py-20">
    <div class="mx-auto max-w-7xl px-6">
      <h1 class="text-5xl font-bold">Checkout</h1>

      <div class="mt-12 grid gap-10 lg:grid-cols-3">
        <!-- Form Pengiriman -->
        <div class="lg:col-span-2">
          <div class="rounded-2xl bg-white p-8 shadow">
            <h2 class="mb-6 text-2xl font-bold">Informasi Pengiriman</h2>

            <div class="space-y-5">
              <input
                v-model="customer.name"
                type="text"
                placeholder="Nama Lengkap"
                class="w-full rounded-xl border p-4"
                required
              />

              <input
                v-model="customer.email"
                type="email"
                placeholder="Email"
                class="w-full rounded-xl border p-4"
                required
              />

              <input
                v-model="customer.phone"
                type="text"
                placeholder="Nomor HP"
                class="w-full rounded-xl border p-4"
                required
              />

              <textarea
                v-model="customer.address"
                rows="5"
                placeholder="Alamat Lengkap"
                class="w-full rounded-xl border p-4"
                required
              />
            </div>
          </div>
        </div>

        <!-- Ringkasan Pesanan -->
        <div>
          <div class="rounded-2xl bg-white p-8 shadow">
            <h2 class="text-2xl font-bold">Ringkasan Pesanan</h2>

            <div class="mt-6 space-y-3">
              <div
                v-for="item in cart"
                :key="item.id"
                class="flex justify-between"
              >
                <span> {{ item.name }} x{{ item.quantity }} </span>

                <span>
                  Rp {{ (item.price * item.quantity).toLocaleString("id-ID") }}
                </span>
              </div>
            </div>

            <hr class="my-6" />

            <div class="flex justify-between">
              <span>Subtotal</span>
              <span> Rp {{ (subtotal || 0).toLocaleString("id-ID") }} </span>
            </div>

            <div class="mt-3 flex justify-between">
              <span>Ongkir</span>
              <span> Rp {{ shippingCost.toLocaleString("id-ID") }} </span>
            </div>

            <div class="mt-6 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span> Rp {{ total.toLocaleString("id-ID") }} </span>
            </div>

            <button
              :disabled="isLoading"
              class="mt-8 w-full rounded-xl bg-blue-700 py-4 font-semibold text-white transition hover:bg-blue-800 disabled:bg-gray-400"
              @click="checkout"
            >
              {{ isLoading ? "Memproses..." : "Bayar Sekarang" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
