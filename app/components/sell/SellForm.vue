<script setup>
import { ref } from "vue";

const client = useSupabaseClient();

const form = ref({
  name: "", // Nama Barang
  phone: "",
  instrument: "Gitar",
  condition: "Sangat Baik",
  expectedPrice: "",
  description: "",
});

const file = ref(null);
const loading = ref(false);
const errorMessage = ref("");
const showSuccessModal = ref(false);

// Menangkap file gambar dari input
const handleFileChange = (e) => {
  if (e.target.files && e.target.files[0]) {
    file.value = e.target.files[0];
  }
};

const handleSubmit = async () => {
  if (!file.value) {
    errorMessage.value = "Silakan pilih foto alat musik terlebih dahulu!";
    return;
  }

  try {
    loading.value = true;
    errorMessage.value = "";

    // 1. Unggah foto ke Supabase Storage (Bucket 'products')
    const fileExt = file.value.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: storageError } = await client.storage
      .from("products")
      .upload(fileName, file.value);

    if (storageError) {
      throw new Error(`Gagal upload gambar: ${storageError.message}`);
    }

    // 2. Dapatkan URL Publik Gambar
    const { data: publicUrlData } = client.storage
      .from("products")
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;

    // 3. Konversi harga ke angka murni
    const priceValue = parseInt(form.value.expectedPrice, 10) || 0;

    // 4. Masukkan Data Produk Baru ke Tabel 'products'
    const { error: productError } = await client.from("products").insert({
      name: form.value.name,
      category: form.value.instrument,
      price: priceValue,
      image_url: imageUrl, // Sesuaikan ke image_url
      description: form.value.description,
      condition: form.value.condition,
    });

    if (productError) {
      throw new Error(`Gagal menyimpan produk: ${productError.message}`);
    }

    // 5. Simpan ke tabel 'sell_submissions' jika ada
    try {
      await client.from("sell_submissions").insert({
        name: form.value.name,
        phone: form.value.phone,
        instrument: form.value.instrument,
        condition: form.value.condition,
        expected_price: priceValue,
        description: form.value.description,
        image_url: imageUrl,
      });
    } catch (e) {
      console.warn("Pencatatan ke sell_submissions dilewati:", e);
    }

    // 6. Tampilkan Modal Pop-up Sukses & Reset Form
    showSuccessModal.value = true;
    form.value = {
      name: "",
      phone: "",
      instrument: "Gitar",
      condition: "Sangat Baik",
      expectedPrice: "",
      description: "",
    };
    file.value = null;
  } catch (err) {
    errorMessage.value =
      err.message || "Terjadi kesalahan saat mengunggah produk.";
  } finally {
    loading.value = false;
  }
};
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
          Isi formulir berikut untuk memasukkan produk Anda secara langsung ke
          katalog toko.
        </p>
      </div>

      <div class="mt-16 rounded-3xl bg-gray-50 p-8 shadow-lg">
        <form @submit.prevent="handleSubmit">
          <!-- Pesan Error -->
          <div
            v-if="errorMessage"
            class="mb-6 rounded-xl bg-red-100 p-4 text-center text-sm font-medium text-red-700"
          >
            {{ errorMessage }}
          </div>

          <div class="grid gap-6 md:grid-cols-2">
            <!-- Nama Barang (Menggantikan Nama Penjual & Merek) -->
            <div class="md:col-span-2">
              <label class="mb-2 block font-semibold">
                Nama Barang / Alat Musik
              </label>
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full rounded-xl border p-3 focus:border-green-500 focus:outline-none"
                placeholder="Contoh: Drum Set Akustik Rolling Blue"
              />
            </div>

            <div>
              <label class="mb-2 block font-semibold"> Nomor WhatsApp </label>
              <input
                v-model="form.phone"
                type="text"
                required
                class="w-full rounded-xl border p-3 focus:border-green-500 focus:outline-none"
                placeholder="08xxxxxxxxxx"
              />
            </div>

            <div>
              <label class="mb-2 block font-semibold"> Kategori </label>
              <select
                v-model="form.instrument"
                required
                class="w-full rounded-xl border p-3 focus:border-green-500 focus:outline-none"
              >
                <option value="Gitar">Gitar</option>
                <option value="Keyboard">Keyboard</option>
                <option value="Drum">Drum</option>
                <option value="Biola">Biola</option>
              </select>
            </div>

            <div>
              <label class="mb-2 block font-semibold"> Kondisi </label>
              <select
                v-model="form.condition"
                required
                class="w-full rounded-xl border p-3 focus:border-green-500 focus:outline-none"
              >
                <option value="Seperti Baru">Seperti Baru</option>
                <option value="Sangat Baik">Sangat Baik</option>
                <option value="Baik">Baik</option>
                <option value="Cukup">Cukup</option>
                <option value="Perlu Perbaikan">Perlu Perbaikan</option>
              </select>
            </div>

            <div>
              <label class="mb-2 block font-semibold"> Harga (Rp) </label>
              <input
                v-model="form.expectedPrice"
                type="number"
                required
                class="w-full rounded-xl border p-3 focus:border-green-500 focus:outline-none"
                placeholder="Contoh: 1500000"
              />
            </div>
          </div>

          <!-- Input File Foto -->
          <div class="mt-6">
            <label class="mb-2 block font-semibold"> Foto Produk </label>
            <input
              type="file"
              accept="image/*"
              @change="handleFileChange"
              required
              class="w-full rounded-xl border bg-white p-3 focus:border-green-500 focus:outline-none"
            />
          </div>

          <div class="mt-6">
            <label class="mb-2 block font-semibold"> Deskripsi Produk </label>
            <textarea
              v-model="form.description"
              rows="4"
              class="w-full rounded-xl border p-3 focus:border-green-500 focus:outline-none"
              placeholder="Jelaskan spesifikasi dan kondisi detail produk..."
            />
          </div>

          <div class="mt-10 text-center">
            <button
              type="submit"
              :disabled="loading"
              class="w-full rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400 md:w-auto"
            >
              {{ loading ? "Mengunggah Produk..." : "Upload & Jual Produk" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- POP-UP / MODAL SUKSES -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div
        class="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl"
      >
        <div
          class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600"
        >
          ✓
        </div>
        <h3 class="text-2xl font-bold text-gray-800">Berhasil Mengunggah!</h3>
        <p class="mt-2 text-gray-600">
          Produk Anda telah berhasil disimpan dan langsung tampil di katalog
          toko.
        </p>

        <div class="mt-6 flex justify-center gap-3">
          <button
            @click="showSuccessModal = false"
            class="rounded-xl border border-gray-300 px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
          >
            Tutup
          </button>
          <NuxtLink
            to="/produk"
            class="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
          >
            Lihat di Halaman Produk
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
