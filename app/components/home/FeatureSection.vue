<script setup>
import { features } from "~/data/features.js";
</script>

<template>
  <section class="bg-gray-100 py-20">
    <div class="mx-auto max-w-7xl px-6">
      <h2 class="text-center text-4xl font-bold">
        Kenapa Memilih Harmony Music Store?
      </h2>

      <p class="mt-4 text-center text-gray-500">
        Kami hadir untuk memberikan pengalaman terbaik dalam jual, beli, dan
        servis alat musik.
      </p>

      <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <FeatureCard
          v-for="feature in features"
          :key="feature.id"
          :feature="feature"
        />
      </div>
    </div>
  </section>
</template>
