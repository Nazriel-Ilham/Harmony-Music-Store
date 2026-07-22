<script setup>
const steps = [
  {
    number: "01",
    title: "Isi Form Penjualan",
    description:
      "Lengkapi data diri serta informasi mengenai alat musik yang ingin Anda jual.",
  },
  {
    number: "02",
    title: "Unggah Foto Alat Musik",
    description:
      "Lampirkan beberapa foto dari berbagai sudut agar kami dapat melakukan penilaian awal.",
  },
  {
    number: "03",
    title: "Evaluasi oleh Tim",
    description:
      "Tim Harmony Music Store akan mengevaluasi kondisi alat musik berdasarkan informasi yang Anda berikan.",
  },
  {
    number: "04",
    title: "Penawaran Harga",
    description:
      "Kami akan menghubungi Anda untuk memberikan penawaran harga yang kompetitif dan transparan.",
  },
  {
    number: "05",
    title: "Pembayaran & Serah Terima",
    description:
      "Jika penawaran disetujui, proses pembayaran dan serah terima alat musik akan segera dilakukan.",
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
          Cara Kerjanya
        </span>

        <h2 class="mt-6 text-4xl font-bold">Proses Menjual Alat Musik</h2>

        <p class="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
          Hanya lima langkah sederhana untuk menjual alat musik Anda kepada
          Harmony Music Store.
        </p>
      </div>

      <div class="relative mx-auto mt-16 max-w-4xl">
        <!-- Garis Timeline -->
        <div
          class="absolute left-8 top-0 hidden h-full w-1 rounded-full bg-green-200 md:block"
        ></div>

        <div
          v-for="step in steps"
          :key="step.number"
          class="relative mb-10 flex gap-6"
        >
          <!-- Nomor -->
          <div
            class="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white shadow-lg"
          >
            {{ step.number }}
          </div>

          <!-- Card -->
          <div
            class="flex-1 rounded-3xl bg-white p-8 shadow-md transition duration-300 hover:shadow-xl"
          >
            <h3 class="text-2xl font-bold">
              {{ step.title }}
            </h3>

            <p class="mt-4 leading-8 text-gray-600">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
