<script setup>
const { cart, subtotal, clearCart } = useCart();

const shippingCost = 20000;

const total = computed(() => subtotal.value + shippingCost);

const customer = reactive({
  name: "",
  email: "",
  phone: "",
  address: "",
});

const checkout = () => {
  clearCart();
  router.push("/order-success");
};
</script>

<template>
  <section class="bg-gray-50 py-20">
    <div class="mx-auto max-w-7xl px-6">
      <h1 class="text-5xl font-bold">Checkout</h1>

      <div class="mt-12 grid gap-10 lg:grid-cols-3">
        <!-- Form -->
        <div class="lg:col-span-2">
          <div class="rounded-2xl bg-white p-8 shadow">
            <h2 class="mb-6 text-2xl font-bold">Informasi Pengiriman</h2>

            <div class="space-y-5">
              <input
                v-model="customer.name"
                type="text"
                placeholder="Nama Lengkap"
                class="w-full rounded-xl border p-4"
              />

              <input
                v-model="customer.email"
                type="email"
                placeholder="Email"
                class="w-full rounded-xl border p-4"
              />

              <input
                v-model="customer.phone"
                type="text"
                placeholder="Nomor HP"
                class="w-full rounded-xl border p-4"
              />

              <textarea
                v-model="customer.address"
                rows="5"
                placeholder="Alamat Lengkap"
                class="w-full rounded-xl border p-4"
              />
            </div>
          </div>
        </div>

        <!-- Ringkasan -->
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

              <span> Rp {{ subtotal.toLocaleString("id-ID") }} </span>
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
              class="mt-8 w-full rounded-xl bg-blue-700 py-4 text-white transition hover:bg-blue-800"
              @click="checkout"
            >
              Bayar Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
