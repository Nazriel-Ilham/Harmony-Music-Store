<template>
  <section
    class="bg-gradient-to-r from-indigo-900 via-blue-800 to-blue-900 text-white"
  >
    <div
      class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-16 px-6 py-20 lg:flex-row"
    >
      <!-- LEFT -->
      <div class="max-w-xl">
        <!-- Badge -->
        <span
          class="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm"
        >
          🎵 Trusted Music Marketplace
        </span>

        <!-- Heading -->
        <h1 class="mt-6 text-5xl font-extrabold leading-tight lg:text-6xl">
          Temukan Harmoni
          <span class="block text-yellow-300"> dalam Setiap Nada </span>
        </h1>

        <!-- Description -->
        <p class="mt-8 text-lg leading-8 text-blue-100">
          Harmony Music Store merupakan marketplace yang menyediakan layanan
          jual, beli, dan servis alat musik dengan pengalaman belanja yang
          mudah, aman, dan terpercaya.
        </p>

        <!-- Button -->
        <div class="mt-10 flex flex-wrap gap-5 relative z-30">
          <!-- Mengarahkan langsung ke ID produk-section -->
          <NuxtLink
            to="/produk"
            class="inline-block cursor-pointer rounded-xl bg-yellow-400 px-8 py-4 font-semibold text-black transition hover:bg-yellow-300"
          >
            Belanja Sekarang
          </NuxtLink>

          <NuxtLink
            to="/jual"
            class="inline-block cursor-pointer rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:scale-105 hover:bg-white hover:text-blue-900"
          >
            Jual Alat Musik
          </NuxtLink>
        </div>

        <!-- Statistics -->
        <div class="mt-12 flex gap-12">
          <div>
            <h2 class="text-3xl font-bold">500+</h2>
            <p class="text-blue-200">Produk</p>
          </div>

          <div>
            <h2 class="text-3xl font-bold">100+</h2>
            <p class="text-blue-200">Servis</p>
          </div>

          <div>
            <h2 class="text-3xl font-bold">4.9★</h2>
            <p class="text-blue-200">Rating</p>
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="flex justify-center">
        <img
          src="/images/hero/studio-musik.jpg"
          alt="Harmony Music Store"
          class="w-full max-w-xl rounded-3xl shadow-2xl"
        />
      </div>
    </div>
  </section>
</template>
