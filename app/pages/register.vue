<script setup>
// Memberitahu Nuxt untuk TIDAK menjalankan middleware auth pada halaman ini
definePageMeta({
  middleware: [],
});

const client = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const successMessage = ref("");
const loading = ref(false);

// Jika user sudah terlanjur login, lempar ke /
watchEffect(() => {
  if (user.value) {
    router.push("/");
  }
});

const handleRegister = async () => {
  try {
    loading.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    const { data, error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error) throw error;

    if (data.session) {
      router.push("/");
    } else {
      successMessage.value = "Pendaftaran berhasil! Silakan coba login.";
    }
  } catch (err) {
    errorMessage.value = err.message || "Gagal mendaftar, coba lagi.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
      <div>
        <h2 class="text-center text-3xl font-extrabold text-gray-900">
          Buat Akun Baru
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Daftar untuk menikmati layanan Harmony Music Store
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div
          v-if="errorMessage"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm text-center"
        >
          {{ errorMessage }}
        </div>
        <div
          v-if="successMessage"
          class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-sm text-center"
        >
          {{ successMessage }}
        </div>

        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="email"
              type="email"
              required
              class="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="nama@email.com"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              v-model="password"
              type="password"
              required
              minlength="6"
              class="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Minimal 6 karakter"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:bg-gray-400 transition"
          >
            {{ loading ? "Memproses..." : "Daftar Akun" }}
          </button>
        </div>

        <div class="text-center text-sm text-gray-600">
          Sudah punya akun?
          <NuxtLink
            to="/login"
            class="text-blue-600 hover:underline font-semibold"
          >
            Masuk di sini
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>
