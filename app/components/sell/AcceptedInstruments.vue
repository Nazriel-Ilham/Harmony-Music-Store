<script setup>
const instruments = [
  {
    icon: "🎸",
    name: "Gitar",
    description: "Gitar akustik, elektrik, bass, maupun klasik.",
  },
  {
    icon: "🎹",
    name: "Keyboard",
    description: "Keyboard, digital piano, arranger, dan synthesizer.",
  },
  {
    icon: "🥁",
    name: "Drum",
    description: "Drum akustik maupun drum elektrik.",
  },
  {
    icon: "🎻",
    name: "Biola",
    description: "Biola untuk pemula hingga profesional.",
  },
  {
    icon: "🎺",
    name: "Alat Musik Tiup",
    description: "Saxophone, trumpet, trombone, flute, dan sejenisnya.",
  },
  {
    icon: "🎤",
    name: "Peralatan Audio",
    description: "Microphone, mixer, amplifier, speaker, dan aksesorinya.",
  },
];
</script>

<template>
  <section class="bg-white py-24">
    <div class="mx-auto max-w-7xl px-6">
      <div class="text-center">
        <span
          class="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700"
        >
          Alat Musik yang Diterima
        </span>

        <h2 class="mt-6 text-4xl font-bold">
          Kami Menerima Berbagai Jenis Alat Musik
        </h2>

        <p class="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
          Tidak hanya gitar, Harmony Music Store menerima berbagai alat musik
          dan perlengkapan audio yang masih dalam kondisi layak untuk digunakan.
        </p>
      </div>

      <div class="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="instrument in instruments"
          :key="instrument.name"
          class="group rounded-3xl border border-gray-100 bg-white p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:border-green-500 hover:shadow-xl"
        >
          <div
            class="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-4xl transition duration-300 group-hover:scale-110"
          >
            {{ instrument.icon }}
          </div>

          <h3 class="mt-6 text-2xl font-bold">
            {{ instrument.name }}
          </h3>

          <p class="mt-4 leading-7 text-gray-600">
            {{ instrument.description }}
          </p>
        </div>
      </div>

      <div class="mt-16 rounded-3xl bg-green-50 p-8 text-center shadow-sm">
        <h3 class="text-2xl font-bold text-green-700">
          Tidak Menemukan Alat Musik Anda?
        </h3>

        <p class="mx-auto mt-4 max-w-2xl leading-8 text-gray-600">
          Jangan khawatir. Anda tetap dapat menghubungi kami untuk melakukan
          konsultasi. Tim Harmony Music Store akan membantu mengecek apakah alat
          musik Anda dapat kami terima.
        </p>

        <a
          href="https://wa.me/6288210490879?text=Halo%20Harmony%20Music%20Store,%20saya%20ingin%20bertanya%20apakah%20alat%20musik%20saya%20dapat%20dijual."
          target="_blank"
          rel="noopener noreferrer"
          class="mt-8 inline-block rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          Konsultasi via WhatsApp
        </a>
      </div>
    </div>
  </section>
</template>
