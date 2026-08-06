<script setup>
const client = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const loading = ref(false);

// Jika user sudah login, otomatis pindah ke halaman utama /
watchEffect(() => {
  if (user.value) {
    router.push("/");
  }
});

const handleLogin = async () => {
  try {
    loading.value = true;
    errorMessage.value = "";

    const { error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) throw error;

    router.push("/");
  } catch (err) {
    errorMessage.value =
      err.message || "Gagal login, periksa email dan password.";
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
          Login ke Store Music
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Masuk dengan akun Supabase kamu
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div
          v-if="errorMessage"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm text-center"
        >
          {{ errorMessage }}
        </div>

        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="email"
              type="email"
              required
              class="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
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
              class="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div class="text-center text-sm text-gray-600">
          Belum punya akun?
          <NuxtLink
            to="/register"
            class="text-blue-600 hover:underline font-semibold"
          >
            Daftar di sini
          </NuxtLink>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:bg-gray-400 transition"
          >
            {{ loading ? "Memproses..." : "Masuk" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
