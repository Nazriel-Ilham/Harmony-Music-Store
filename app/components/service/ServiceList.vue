<script setup>
import { ref, onMounted } from "vue";

const client = useSupabaseClient();
const services = ref([]);
const loading = ref(true);

const fetchServices = async () => {
  try {
    loading.value = true;
    const { data, error } = await client.from("services").select("*");

    if (error) throw error;
    services.value = data || [];
  } catch (err) {
    console.error("Gagal mengambil data layanan servis:", err.message);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchServices();
});
</script>

<template>
  <section class="bg-white py-20">
    <div class="mx-auto max-w-7xl px-6">
      <h2 class="text-center text-4xl font-bold">Layanan Servis</h2>

      <p class="mt-3 text-center text-gray-500">
        Percayakan perawatan dan perbaikan alat musik Anda kepada teknisi
        berpengalaman kami.
      </p>

      <div class="mt-12">
        <div v-if="loading" class="text-center py-8 text-gray-500">
          Memuat daftar layanan...
        </div>

        <div
          v-else-if="services.length > 0"
          class="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          <ServiceCard
            v-for="service in services"
            :key="service.id"
            :service="service"
          />
        </div>

        <div v-else class="text-center py-8 text-gray-500">
          Belum ada layanan servis yang tersedia.
        </div>
      </div>
    </div>
  </section>
</template>
