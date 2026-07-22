<script setup>
const services = [
  {
    icon: "🎸",
    title: "Servis Gitar",
    description:
      "Setup, cleaning, penggantian senar, fret polishing, serta perbaikan gitar akustik maupun elektrik.",
    whatsapp: "https://wa.me/6288210490879",
  },
  {
    icon: "🎹",
    title: "Servis Keyboard",
    description:
      "Perbaikan tuts, cleaning, pengecekan elektronik, dan penggantian komponen keyboard.",
    whatsapp: "https://wa.me/6288210490879",
  },
  {
    icon: "🥁",
    title: "Servis Drum",
    description:
      "Penggantian drum head, tuning, cleaning, serta pengecekan hardware drum.",
    whatsapp: "https://wa.me/6288210490879",
  },
  {
    icon: "🎻",
    title: "Servis Biola",
    description:
      "Setup bridge, bow, penggantian senar, cleaning, dan tuning biola.",
    whatsapp: "https://wa.me/6288210490879",
  },
];

const createWhatsAppLink = (service) => {
  const message = `Permisi Harmony Music Store,

Saya ingin melakukan ${service}.

Nama Alat Musik :
Merek/Tipe :
Keluhan :

Terima kasih.`;

  return `https://wa.me/6288210490879?text=${encodeURIComponent(message)}`;
};
</script>

<template>
  <section class="bg-white py-20">
    <div class="mx-auto max-w-7xl px-6">
      <div class="text-center">
        <h2 class="text-4xl font-bold">Layanan Servis</h2>

        <p class="mt-4 text-lg text-gray-600">
          Percayakan perawatan alat musik Anda kepada teknisi kami.
        </p>
      </div>

      <div class="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="service in services"
          :key="service.title"
          class="rounded-2xl bg-white p-8 shadow transition hover:-translate-y-2 hover:shadow-xl"
        >
          <div class="text-6xl">
            {{ service.icon }}
          </div>

          <h3 class="mt-6 text-2xl font-bold">
            {{ service.title }}
          </h3>

          <p class="mt-4 leading-7 text-gray-600">
            {{ service.description }}
          </p>

          <a
            :href="createWhatsAppLink(service.title)"
            target="_blank"
            class="mt-8 block rounded-xl bg-green-500 py-3 text-center font-semibold text-white transition hover:bg-green-600"
          >
            Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
