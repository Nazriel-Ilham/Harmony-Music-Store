<script setup>
const advantages = [
  {
    icon: "🛡️",
    title: "Garansi Servis",
    description:
      "Setiap pengerjaan servis mendapatkan garansi sehingga pelanggan merasa lebih tenang.",
  },
  {
    icon: "👨‍🔧",
    title: "Teknisi Profesional",
    description:
      "Teknisi kami berpengalaman menangani berbagai jenis alat musik dengan standar pengerjaan yang tinggi.",
  },
  {
    icon: "⚙️",
    title: "Sparepart Berkualitas",
    description:
      "Kami menggunakan sparepart original dan berkualitas agar performa alat musik tetap optimal.",
  },
  {
    icon: "💬",
    title: "Konsultasi Gratis",
    description:
      "Belum yakin dengan kerusakan alat musik Anda? Konsultasikan terlebih dahulu tanpa biaya.",
  },
];
</script>

<template>
  <section class="bg-slate-50 py-24">
    <div class="mx-auto max-w-7xl px-6">
      <div class="text-center">
        <span
          class="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700"
        >
          Mengapa Memilih Kami
        </span>

        <h2 class="mt-6 text-4xl font-bold">Mengapa Memilih Servis Kami?</h2>

        <p class="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
          Harmony Music Store selalu mengutamakan kualitas servis dan kepuasan
          pelanggan dengan teknisi profesional serta sparepart terbaik.
        </p>
      </div>

      <div class="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="item in advantages"
          :key="item.title"
          class="group flex h-full flex-col rounded-3xl bg-white p-8 text-center shadow-md transition duration-300 hover:-translate-y-3 hover:shadow-xl"
        >
          <div
            class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-5xl transition group-hover:scale-110"
          >
            {{ item.icon }}
          </div>

          <h3 class="mt-6 text-2xl font-bold">
            {{ item.title }}
          </h3>

          <p class="mt-5 flex-grow leading-8 text-gray-600">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
