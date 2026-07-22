<script setup>
import { services } from "~/data/services.js";
</script>

<template>
  <section class="bg-white py-20">
    <div class="mx-auto max-w-7xl px-6">
      <h2 class="text-center text-4xl font-bold">Layanan Servis</h2>

      <p class="mt-3 text-center text-gray-500">
        Percayakan perawatan alat musik Anda kepada teknisi kami.
      </p>

      <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <ServiceCard
          v-for="service in services"
          :key="service.id"
          :service="service"
        />
      </div>
    </div>
  </section>
</template>
