<script setup>
import { ref } from "vue";

const nomorWAAdmin = "6288210490879"; // Ganti dengan nomor WhatsApp Admin kamu (gunakan format 62)

const productName = ref("");
const productPrice = ref("");
const productQty = ref("");
const productCondition = ref("Baru"); // 'Baru' atau 'Bekas'
const productDescription = ref("");
const productImageLink = ref("");

const sendToWhatsApp = () => {
  if (!productName.value || !productPrice.value || !productQty.value) {
    alert("Harap isi Nama Barang, Harga, dan Quantity terlebih dahulu!");
    return;
  }

  // Merakit teks pesan WhatsApp
  const message = `Halo Admin Harmony Music, saya ingin menjual barang dengan detail berikut:

*Nama Barang:* ${productName.value}
*Harga:* Rp ${Number(productPrice.value).toLocaleString("id-ID")}
*Jumlah (Qty):* ${productQty.value}
*Kualitas/Kondisi:* ${productCondition.value}
*Link Gambar Barang:* ${productImageLink.value || "Saya lampirkan gambar di WA ini"}
*Deskripsi:* 
${productDescription.value}

Mohon bantuannya untuk dipublish ke website. Terima kasih!`;

  // Buka WhatsApp Web / App
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${nomorWAAdmin}?text=${encodedMessage}`, "_blank");
};
</script>

<template>
  <div class="max-w-2xl mx-auto py-10 px-6">
    <div
      class="bg-white p-8 rounded-xl shadow-md border border-gray-100 space-y-6"
    >
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900">
          Form Pengajuan Jual Barang
        </h1>
        <p class="text-sm text-gray-600 mt-1">
          Isi detail barang kamu di bawah ini, lalu kirim ke WhatsApp Admin
          untuk diverifikasi dan dipublish.
        </p>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1"
            >Nama Barang</label
          >
          <input
            v-model="productName"
            type="text"
            placeholder="Contoh: Gitar Akustik Yamaha FG800"
            class="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1"
              >Harga (Rp)</label
            >
            <input
              v-model="productPrice"
              type="number"
              placeholder="2500000"
              class="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1"
              >Quantity (Jumlah)</label
            >
            <input
              v-model="productQty"
              type="number"
              placeholder="1"
              class="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1"
            >Kualitas / Kondisi Produk</label
          >
          <select
            v-model="productCondition"
            class="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-600 bg-white"
          >
            <option value="Baru">Baru (New)</option>
            <option value="Bekas - Seperti Baru">
              Bekas - Seperti Baru (Like New)
            </option>
            <option value="Bekas - Kondisi Baik">Bekas - Kondisi Baik</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1"
            >Link Gambar / Foto Produk (Opsional)</label
          >
          <input
            v-model="productImageLink"
            type="text"
            placeholder="https://..."
            class="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-600"
          />
          <p class="text-[11px] text-gray-500 mt-1">
            *Bisa dikosongkan dan kirim foto langsung di chat WhatsApp.
          </p>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1"
            >Deskripsi Produk</label
          >
          <textarea
            v-model="productDescription"
            rows="4"
            placeholder="Jelaskan kondisi, kelengkapan, dan spesifikasi barang..."
            class="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>
        </div>

        <button
          @click="sendToWhatsApp"
          class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg text-sm transition flex items-center justify-center gap-2"
        >
          <span>💬 Kirim Detail Barang ke WhatsApp Admin</span>
        </button>
      </div>
    </div>
  </div>
</template>
