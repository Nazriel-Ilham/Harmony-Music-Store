<script setup></script>
<template>
  <section
    class="flex min-h-screen items-center justify-center bg-gray-50 px-6"
  >
    <div class="max-w-lg rounded-2xl bg-white p-10 text-center shadow-lg">
      <div
        class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100"
      >
        <span class="text-5xl text-green-600">✓</span>
      </div>

      <h1 class="mt-8 text-4xl font-bold">Pesanan Berhasil!</h1>

      <p class="mt-4 leading-7 text-gray-600">
        Terima kasih telah berbelanja di Harmony Music Store. Pesanan Anda
        sedang diproses dan akan segera kami kirim.
      </p>

      <div class="mt-10 flex flex-col gap-4">
        <NuxtLink
          to="/produk"
          class="rounded-xl bg-blue-700 py-4 font-semibold text-white transition hover:bg-blue-800"
        >
          Belanja Lagi
        </NuxtLink>

        <NuxtLink
          to="/"
          class="rounded-xl border border-gray-300 py-4 font-semibold transition hover:bg-gray-100"
        >
          Kembali ke Beranda
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
