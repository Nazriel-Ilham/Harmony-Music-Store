<script setup></script>

<template>
  <section
    class="relative z-30 bg-gradient-to-r from-blue-700 to-indigo-700 py-20 text-white"
  >
    <div class="mx-auto max-w-5xl px-6 text-center">
      <h2 class="text-4xl font-bold">Siap Bermusik Bersama Kami?</h2>

      <p class="mx-auto mt-5 max-w-2xl text-lg text-blue-100">
        Temukan alat musik impianmu atau jual alat musik bekasmu dengan mudah
        hanya di Harmony Music Store.
      </p>

      <div class="mt-10 flex flex-col justify-center gap-5 sm:flex-row">
        <NuxtLink
          to="/produk"
          class="inline-block cursor-pointer rounded-xl bg-yellow-400 px-8 py-4 font-semibold text-black transition hover:bg-yellow-300"
        >
          Belanja Sekarang
        </NuxtLink>

        <NuxtLink
          to="/jual"
          class="inline-block cursor-pointer rounded-xl border border-white px-8 py-4 font-semibold transition hover:bg-white hover:text-blue-700"
        >
          Jual Alat Musik
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
