<script setup>
const route = useRoute();

// Cek apakah halaman saat ini adalah route admin
const isAdminRoute = computed(() => route.path.startsWith("/admin"));
</script>

<template>
  <div>
    <Navbar v-if="!isAdminRoute" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
