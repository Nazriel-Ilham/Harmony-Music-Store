<script setup>
defineProps({
  subtotal: Number,
});
</script>

<template>
  <div class="rounded-2xl bg-white p-8 shadow-sm">
    <h2 class="text-2xl font-bold">Ringkasan Belanja</h2>

    <div class="mt-8 flex justify-between">
      <span>Subtotal</span>

      <span class="font-semibold">
        Rp {{ subtotal.toLocaleString("id-ID") }}
      </span>
    </div>

    <div class="mt-4 flex justify-between">
      <span>Ongkir</span>

      <span>Gratis</span>
    </div>

    <hr class="my-8" />

    <div class="flex justify-between text-xl font-bold">
      <span>Total</span>

      <span> Rp {{ subtotal.toLocaleString("id-ID") }} </span>
    </div>

    <NuxtLink
      to="/checkout"
      class="block w-full rounded-xl bg-blue-700 py-4 text-center font-semibold text-white transition hover:bg-blue-800"
    >
      Checkout
    </NuxtLink>
  </div>
</template>
