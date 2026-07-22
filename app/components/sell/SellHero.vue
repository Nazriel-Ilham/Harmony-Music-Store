<script setup></script>

<template>
  <section
    class="bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600 py-24 text-white"
  >
    <div class="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
      <!-- Kiri -->
      <div>
        <span class="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
          🎸 Harmony Music Store
        </span>

        <h1 class="mt-6 text-5xl font-bold leading-tight">
          Jual Alat Musik
          <br />
          Bekas Anda
        </h1>

        <p class="mt-6 text-lg leading-8 text-green-100">
          Harmony Music Store siap membeli alat musik bekas Anda dengan proses
          cepat, harga yang kompetitif, dan pembayaran yang aman. Kami menerima
          berbagai jenis alat musik dengan kondisi yang masih layak pakai.
        </p>

        <div class="mt-10 flex flex-wrap gap-4">
          <a
            href="#sell-form"
            class="rounded-xl bg-white px-6 py-3 font-semibold text-green-700 transition hover:bg-gray-100"
          >
            Jual Sekarang
          </a>

          <NuxtLink
            to="/produk"
            class="rounded-xl border border-white px-6 py-3 font-semibold transition hover:bg-white hover:text-green-700"
          >
            Lihat Produk
          </NuxtLink>
        </div>
      </div>

      <!-- Kanan -->
      <div class="flex justify-center">
        <div class="rounded-3xl bg-white/10 p-10 shadow-2xl backdrop-blur-md">
          <div class="grid grid-cols-2 gap-8 text-center">
            <div>
              <div class="text-6xl">🎸</div>
              <p class="mt-3 font-semibold">Gitar</p>
            </div>

            <div>
              <div class="text-6xl">🎹</div>
              <p class="mt-3 font-semibold">Keyboard</p>
            </div>

            <div>
              <div class="text-6xl">🥁</div>
              <p class="mt-3 font-semibold">Drum</p>
            </div>

            <div>
              <div class="text-6xl">🎻</div>
              <p class="mt-3 font-semibold">Biola</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
