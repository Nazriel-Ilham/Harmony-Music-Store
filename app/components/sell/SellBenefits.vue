<script setup>
const benefits = [
  {
    icon: "💰",
    title: "Harga Kompetitif",
    description:
      "Kami memberikan penawaran harga yang kompetitif berdasarkan kondisi dan nilai pasar alat musik Anda.",
  },
  {
    icon: "⚡",
    title: "Proses Cepat",
    description:
      "Proses penawaran hingga pembayaran dilakukan dengan cepat tanpa prosedur yang berbelit.",
  },
  {
    icon: "🔒",
    title: "Pembayaran Aman",
    description:
      "Pembayaran dilakukan secara aman melalui metode yang telah disepakati bersama.",
  },
  {
    icon: "🤝",
    title: "Penawaran Transparan",
    description:
      "Setiap penawaran disampaikan secara terbuka disertai penjelasan mengenai kondisi alat musik.",
  },
];
</script>

<template>
  <section class="bg-gray-50 py-24">
    <div class="mx-auto max-w-7xl px-6">
      <div class="text-center">
        <span
          class="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700"
        >
          Keuntungan
        </span>

        <h2 class="mt-6 text-4xl font-bold">
          Mengapa Menjual di Harmony Music Store?
        </h2>

        <p class="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
          Kami memberikan proses jual beli alat musik bekas yang mudah,
          transparan, dan terpercaya.
        </p>
      </div>

      <div class="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="benefit in benefits"
          :key="benefit.title"
          class="group flex h-full flex-col rounded-3xl bg-white p-8 text-center shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
          <div
            class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-5xl transition duration-300 group-hover:scale-110"
          >
            {{ benefit.icon }}
          </div>

          <h3 class="mt-6 text-2xl font-bold">
            {{ benefit.title }}
          </h3>

          <p class="mt-5 flex-grow leading-8 text-gray-600">
            {{ benefit.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
