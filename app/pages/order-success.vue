<script setup>
const router = useRouter();
</script>

<template>
  <section
    class="bg-gray-50 py-20 min-h-[80vh] flex items-center justify-center"
  >
    <div
      class="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center mx-4"
    >
      <!-- Icon Sukses -->
      <div
        class="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6"
      >
        <svg
          class="h-10 w-10 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 class="text-3xl font-bold text-gray-900 mb-2">Pesanan Berhasil!</h1>
      <p class="text-gray-600 mb-8">
        Terima kasih telah berbelanja di Harmony Music Store. Pesanan Anda
        sedang diproses oleh tim kami.
      </p>

      <div class="space-y-3">
        <NuxtLink
          to="/pesanan"
          class="block w-full bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl hover:bg-blue-800 transition"
        >
          Lihat Riwayat Pesanan
        </NuxtLink>

        <NuxtLink
          to="/produk"
          class="block w-full border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-50 transition"
        >
          Lanjut Belanja
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
