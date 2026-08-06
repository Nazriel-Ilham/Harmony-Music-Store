<script setup>
const props = defineProps({
  productId: { type: Number, required: true },
});

const supabase = useSupabaseClient();
const reviews = ref([]);
const newComment = ref("");
const newRating = ref(5);

// Fetch Ulasan Produk (Read)
const fetchReviews = async () => {
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", props.productId)
    .order("created_at", { ascending: false });
  reviews.value = data || [];
};

// Tambah Ulasan Baru (Create)
const submitReview = async () => {
  if (!newComment.value) return;

  await supabase.from("reviews").insert({
    product_id: props.productId,
    rating: Number(newRating.value),
    comment: newComment.value,
  });

  newComment.value = "";
  await fetchReviews();
};

// Hapus Ulasan (Delete)
const deleteReview = async (id) => {
  await supabase.from("reviews").delete().eq("id", id);
  await fetchReviews();
};

onMounted(fetchReviews);
</script>

<template>
  <div class="mt-10 border-t pt-8">
    <h3 class="text-2xl font-bold mb-4">Ulasan Pembeli</h3>

    <!-- Form Tambah Ulasan -->
    <form
      @submit.prevent="submitReview"
      class="mb-8 space-y-3 bg-gray-50 p-4 rounded-xl"
    >
      <div>
        <label class="block text-sm font-medium mb-1">Rating</label>
        <select v-model="newRating" class="border rounded p-2">
          <option value="5">⭐⭐⭐⭐⭐ (5)</option>
          <option value="4">⭐⭐⭐⭐ (4)</option>
          <option value="3">⭐⭐⭐ (3)</option>
          <option value="2">⭐⭐ (2)</option>
          <option value="1">⭐ (1)</option>
        </select>
      </div>
      <div>
        <textarea
          v-model="newComment"
          placeholder="Tulis ulasan produk di sini..."
          class="w-full border rounded p-2 text-sm"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        class="bg-yellow-400 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-yellow-300"
      >
        Kirim Ulasan
      </button>
    </form>

    <!-- Daftar Ulasan -->
    <div class="space-y-4">
      <div
        v-for="rev in reviews"
        :key="rev.id"
        class="border-b pb-3 flex justify-between items-start"
      >
        <div>
          <div class="text-yellow-500 font-bold">★ {{ rev.rating }}/5</div>
          <p class="text-gray-700 text-sm mt-1">{{ rev.comment }}</p>
        </div>
        <button
          @click="deleteReview(rev.id)"
          class="text-red-500 text-xs hover:underline"
        >
          Hapus
        </button>
      </div>
    </div>
  </div>
</template>
