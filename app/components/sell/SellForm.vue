<script setup>
import { computed, ref } from "vue";

const form = ref({
  name: "",
  phone: "",
  instrument: "",
  brand: "",
  condition: "",
  expectedPrice: "",
  description: "",
});

const whatsappLink = computed(() => {
  const message = `Halo Harmony Music Store,

Saya ingin menjual alat musik saya.

Nama : ${form.value.name}
No. WhatsApp : ${form.value.phone}
Jenis Alat Musik : ${form.value.instrument}
Merek : ${form.value.brand}
Kondisi : ${form.value.condition}
Harga yang Diinginkan : ${form.value.expectedPrice}

Deskripsi :
${form.value.description}

Terima kasih.`;

  return `https://wa.me/6288210490879?text=${encodeURIComponent(message)}`;
});
</script>

<template>
  <section id="sell-form" class="bg-white py-24">
    <div class="mx-auto max-w-4xl px-6">
      <div class="text-center">
        <span
          class="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700"
        >
          Form Penjualan
        </span>

        <h2 class="mt-6 text-4xl font-bold">Jual Alat Musik Anda</h2>

        <p class="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
          Isi formulir berikut agar tim Harmony Music Store dapat memberikan
          penawaran terbaik untuk alat musik Anda.
        </p>
      </div>

      <div class="mt-16 rounded-3xl bg-gray-50 p-8 shadow-lg">
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <label class="mb-2 block font-semibold"> Nama Lengkap </label>

            <input
              v-model="form.name"
              type="text"
              class="w-full rounded-xl border p-3 focus:border-green-500 focus:outline-none"
              placeholder="Masukkan nama"
            />
          </div>

          <div>
            <label class="mb-2 block font-semibold"> Nomor WhatsApp </label>

            <input
              v-model="form.phone"
              type="text"
              class="w-full rounded-xl border p-3 focus:border-green-500 focus:outline-none"
              placeholder="08xxxxxxxxxx"
            />
          </div>

          <div>
            <label class="mb-2 block font-semibold"> Jenis Alat Musik </label>

            <input
              v-model="form.instrument"
              type="text"
              class="w-full rounded-xl border p-3 focus:border-green-500 focus:outline-none"
              placeholder="Contoh: Gitar"
            />
          </div>

          <div>
            <label class="mb-2 block font-semibold"> Merek </label>

            <input
              v-model="form.brand"
              type="text"
              class="w-full rounded-xl border p-3 focus:border-green-500 focus:outline-none"
              placeholder="Contoh: Yamaha"
            />
          </div>

          <div>
            <label class="mb-2 block font-semibold"> Kondisi </label>

            <select
              v-model="form.condition"
              class="w-full rounded-xl border p-3 focus:border-green-500 focus:outline-none"
            >
              <option value="">Pilih Kondisi</option>
              <option>Seperti Baru</option>
              <option>Sangat Baik</option>
              <option>Baik</option>
              <option>Cukup</option>
              <option>Perlu Perbaikan</option>
            </select>
          </div>

          <div>
            <label class="mb-2 block font-semibold">
              Harga yang Diinginkan
            </label>

            <input
              v-model="form.expectedPrice"
              type="text"
              class="w-full rounded-xl border p-3 focus:border-green-500 focus:outline-none"
              placeholder="Rp..."
            />
          </div>
        </div>

        <div class="mt-6">
          <label class="mb-2 block font-semibold"> Deskripsi </label>

          <textarea
            v-model="form.description"
            rows="5"
            class="w-full rounded-xl border p-3 focus:border-green-500 focus:outline-none"
            placeholder="Jelaskan kondisi alat musik Anda..."
          />
        </div>

        <div class="mt-10 text-center">
          <a
            :href="whatsappLink"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
          >
            Kirim Penawaran via WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
