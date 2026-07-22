<script setup>
const steps = [
  {
    number: "01",
    title: "Hubungi Kami",
    description:
      "Klik tombol WhatsApp pada layanan yang Anda pilih dan jelaskan jenis alat musik serta keluhannya.",
  },
  {
    number: "02",
    title: "Konsultasi & Estimasi",
    description:
      "Tim kami akan memberikan konsultasi awal serta estimasi biaya dan waktu pengerjaan.",
  },
  {
    number: "03",
    title: "Kirim atau Datang ke Toko",
    description:
      "Anda dapat membawa alat musik langsung ke toko atau mengirimkannya melalui jasa ekspedisi.",
  },
  {
    number: "04",
    title: "Proses Servis",
    description:
      "Teknisi akan melakukan pemeriksaan, perbaikan, cleaning, tuning, atau penggantian sparepart bila diperlukan.",
  },
  {
    number: "05",
    title: "Selesai & Siap Digunakan",
    description:
      "Setelah selesai, alat musik akan diuji kembali sebelum diserahkan kepada pelanggan.",
  },
];
</script>

<template>
  <section class="bg-white py-24">
    <div class="mx-auto max-w-7xl px-6">
      <div class="text-center">
        <span
          class="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700"
        >
          Alur Servis
        </span>

        <h2 class="mt-6 text-4xl font-bold">Bagaimana Proses Servis?</h2>

        <p class="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
          Hanya lima langkah mudah untuk membuat alat musik Anda kembali prima.
        </p>
      </div>

      <div class="mt-16 space-y-8">
        <div
          v-for="step in steps"
          :key="step.number"
          class="flex flex-col gap-6 rounded-3xl bg-gray-50 p-8 shadow-md transition hover:shadow-lg md:flex-row md:items-center"
        >
          <div
            class="flex h-20 w-20 items-center justify-center rounded-full bg-blue-700 text-3xl font-bold text-white"
          >
            {{ step.number }}
          </div>

          <div>
            <h3 class="text-2xl font-bold">
              {{ step.title }}
            </h3>

            <p class="mt-3 leading-8 text-gray-600">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
