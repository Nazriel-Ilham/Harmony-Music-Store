<script setup>
const supabase = useSupabaseClient();

const categoryImages = {
  Gitar: "/images/categories/guitar.png",
  Keyboard: "/images/categories/keyboard.png",
  Drum: "/images/categories/drum-set.png",
  Biola: "/images/categories/violin.png",
};

const { data: categories } = await useAsyncData("categories", async () => {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) console.error("Error fetching categories:", error);
  return data || [];
});
</script>

<template>
  <section class="bg-white py-20">
    <div class="mx-auto max-w-7xl px-6">
      <h2 class="text-center text-4xl font-bold">Kategori Alat Musik</h2>

      <p class="mt-3 text-center text-gray-500">
        Pilih kategori alat musik favoritmu
      </p>

      <div class="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
        <!-- Menggunakan NuxtLink untuk mengarahkan ke /produk?category=NamaKategori -->
        <NuxtLink
          v-for="category in categories"
          :key="category.id"
          :to="`/produk?category=${encodeURIComponent(category.name)}`"
          class="rounded-2xl border bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl cursor-pointer block"
        >
          <img
            :src="
              categoryImages[category.name] || '/images/categories/guitar.png'
            "
            :alt="category.name"
            class="mx-auto h-24 object-contain"
          />

          <h3 class="mt-6 text-xl font-semibold text-gray-800">
            {{ category.name }}
          </h3>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
