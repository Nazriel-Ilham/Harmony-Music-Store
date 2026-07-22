<script setup>
import { ref } from "vue";

const activeIndex = ref(null);

const faqs = [
  {
    question: "Apakah semua merek alat musik diterima?",
    answer:
      "Ya. Kami menerima berbagai merek alat musik, baik lokal maupun internasional, selama kondisinya masih layak untuk dilakukan evaluasi.",
  },
  {
    question: "Apakah alat musik yang rusak masih bisa dijual?",
    answer:
      "Bisa. Tim kami akan melakukan penilaian terlebih dahulu untuk menentukan apakah alat musik masih memiliki nilai jual.",
  },
  {
    question: "Berapa lama proses penawaran harga?",
    answer:
      "Biasanya proses evaluasi dan penawaran dilakukan dalam waktu 1×24 jam setelah kami menerima informasi lengkap mengenai alat musik Anda.",
  },
  {
    question: "Bagaimana metode pembayarannya?",
    answer:
      "Pembayaran dapat dilakukan melalui transfer bank atau metode lain yang disepakati bersama setelah transaksi selesai.",
  },
  {
    question: "Apakah saya harus datang ke toko?",
    answer:
      "Tidak selalu. Anda dapat berkonsultasi terlebih dahulu melalui WhatsApp. Jika diperlukan, tim kami akan mengarahkan proses selanjutnya.",
  },
];

const toggleFAQ = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<template>
  <section class="bg-gray-50 py-24">
    <div class="mx-auto max-w-4xl px-6">
      <div class="text-center">
        <span
          class="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700"
        >
          FAQ
        </span>

        <h2 class="mt-6 text-4xl font-bold">Pertanyaan yang Sering Diajukan</h2>

        <p class="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
          Masih memiliki pertanyaan? Berikut beberapa pertanyaan yang sering
          diajukan oleh pelanggan sebelum menjual alat musiknya.
        </p>
      </div>

      <div class="mt-16 space-y-4">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          <button
            class="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-gray-50"
            @click="toggleFAQ(index)"
          >
            <span class="text-lg font-semibold">
              {{ faq.question }}
            </span>

            <span
              class="text-2xl font-bold text-green-600 transition-transform duration-300"
              :class="{
                'rotate-45': activeIndex === index,
              }"
            >
              +
            </span>
          </button>

          <transition
            enter-active-class="transition-all duration-300"
            leave-active-class="transition-all duration-300"
          >
            <div
              v-if="activeIndex === index"
              class="border-t border-gray-200 px-6 py-5"
            >
              <p class="leading-8 text-gray-600">
                {{ faq.answer }}
              </p>
            </div>
          </transition>
        </div>
      </div>

      <div class="mt-16 rounded-3xl bg-green-600 p-10 text-center text-white">
        <h3 class="text-3xl font-bold">Masih Ada Pertanyaan?</h3>

        <p class="mt-4 text-lg leading-8 text-green-100">
          Tim Harmony Music Store siap membantu Anda. Hubungi kami melalui
          WhatsApp untuk mendapatkan informasi lebih lanjut.
        </p>

        <a
          href="https://wa.me/6288210490879"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-8 inline-block rounded-xl bg-white px-8 py-3 font-semibold text-green-700 transition hover:bg-gray-100"
        >
          Hubungi Kami
        </a>
      </div>
    </div>
  </section>
</template>
