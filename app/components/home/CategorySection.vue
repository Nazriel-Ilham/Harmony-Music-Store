<script setup>
const categories = [
  {
    name: "Gitar",
    image: "/images/categories/guitar.png",
  },
  {
    name: "Keyboard",
    image: "/images/categories/keyboard.png",
  },
  {
    name: "Drum",
    image: "/images/categories/drum-set.png",
  },
  {
    name: "Biola",
    image: "/images/categories/violin.png",
  },
];
</script>

<template>
  <section class="bg-white py-20">
    <div class="mx-auto max-w-7xl px-6">
      <h2 class="text-4xl font-bold text-center">Kategori Alat Musik</h2>

      <p class="mt-3 text-center text-gray-500">
        Pilih kategori alat musik favoritmu
      </p>

      <div class="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
        <div
          v-for="category in categories"
          :key="category.name"
          class="rounded-2xl border bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
        >
          <img
            :src="category.image"
            :alt="category.name"
            class="mx-auto h-24"
          />

          <h3 class="mt-6 text-xl font-semibold">
            {{ category.name }}
          </h3>
        </div>
      </div>
    </div>
  </section>
</template>
