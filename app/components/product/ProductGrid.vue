<script setup>
const props = defineProps({
  products: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
    <ProductCard
      v-for="product in props.products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>
