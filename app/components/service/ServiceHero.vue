<script setup></script>

<template>
  <section
    class="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 py-24 text-white"
  >
    <div class="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
      <!-- Kiri -->
      <div>
        <span class="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
          🎵 Harmony Music Store
        </span>

        <h1 class="mt-6 text-5xl font-bold leading-tight">
          Servis Alat Musik
          <br />
          Cepat, Aman & Profesional
        </h1>

        <p class="mt-6 text-lg leading-8 text-blue-100">
          Percayakan perawatan dan perbaikan alat musik Anda kepada teknisi
          berpengalaman kami. Mulai dari gitar, keyboard, drum hingga biola,
          semuanya ditangani dengan teliti agar kembali menghasilkan suara
          terbaik.
        </p>

        <div class="mt-10 flex flex-wrap gap-4">
          <a
            href="https://wa.me/6288210490879?text=Permisi%20Harmony%20Music%20Store,%0A%0ASaya%20ingin%20bertanya%20mengenai%20layanan%20servis%20alat%20musik.%0A%0ATerima%20kasih."
            target="_blank"
            class="rounded-xl bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600"
          >
            Hubungi via WhatsApp
          </a>

          <NuxtLink
            to="/produk"
            class="rounded-xl border border-white px-6 py-3 font-semibold transition hover:bg-white hover:text-blue-700"
          >
            Lihat Produk
          </NuxtLink>
        </div>
      </div>

      <!-- Kanan -->
      <div class="flex justify-center">
        <div class="rounded-3xl bg-white/10 p-10 backdrop-blur-md shadow-2xl">
          <div class="grid grid-cols-2 gap-6 text-center">
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
