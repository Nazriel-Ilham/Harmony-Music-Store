<script setup>
definePageMeta({
  middleware: [],
});

const client = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

// State Form & UI
const mode = ref("login"); // 'login' atau 'register'
const email = ref("");
const password = ref("");
const fullName = ref("");
const errorMessage = ref("");
const successMessage = ref("");
const loading = ref(false);

// Fungsi untuk mengarahkan pengguna berdasarkan role
const redirectByRole = (userData) => {
  if (!userData) return;

  // Supabase JS membaca raw_user_meta_data sebagai user_metadata
  const role = userData.user_metadata?.role;

  if (role === "admin") {
    router.push("/admin");
  } else {
    router.push("/");
  }
};

// Pengalihan otomatis jika pengguna sudah memiliki sesi login aktif
watchEffect(() => {
  if (user.value) {
    redirectByRole(user.value);
  }
});

// Fungsi berpindah antara mode Login dan Register
const switchMode = (newMode) => {
  mode.value = newMode;
  errorMessage.value = "";
  successMessage.value = "";
};

// Fungsi Submit Form (Menangani Login & Registrasi)
const handleSubmit = async () => {
  loading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    if (mode.value === "login") {
      // --- PROSES LOGIN ---
      const { data, error } = await client.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      });

      if (error) throw error;

      // Arahkan sesuai role
      redirectByRole(data.user);
    } else {
      // --- PROSES REGISTRASI ---
      const { data, error } = await client.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
          data: {
            full_name: fullName.value || email.value.split("@")[0],
            role: "user", // Default role untuk pendaftaran baru
          },
        },
      });

      if (error) throw error;

      if (data.session) {
        redirectByRole(data.user);
      } else {
        successMessage.value =
          "Pendaftaran berhasil! Silakan masuk dengan akun baru Anda.";
        switchMode("login");
      }
    }
  } catch (err) {
    console.error("Auth error:", err);
    errorMessage.value =
      err.message || "Terjadi kesalahan. Periksa data Anda dan coba lagi.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-md">
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900">
          {{ mode === "login" ? "Masuk ke Akun" : "Buat Akun Baru" }}
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          {{
            mode === "login"
              ? "Selamat datang kembali di Harmony Music Store"
              : "Daftar untuk menikmati layanan Harmony Music Store"
          }}
        </p>
      </div>

      <!-- Tab Switcher (Login / Register) -->
      <div class="flex border-b border-gray-200">
        <button
          type="button"
          @click="switchMode('login')"
          :class="[
            'w-1/2 py-2 text-center font-medium text-sm border-b-2 transition-colors',
            mode === 'login'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700',
          ]"
        >
          Masuk
        </button>
        <button
          type="button"
          @click="switchMode('register')"
          :class="[
            'w-1/2 py-2 text-center font-medium text-sm border-b-2 transition-colors',
            mode === 'register'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700',
          ]"
        >
          Daftar Baru
        </button>
      </div>

      <!-- Alert Message -->
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

      <!-- Form -->
      <form class="space-y-4" @submit.prevent="handleSubmit">
        <!-- Input Nama Lengkap (Mode Register) -->
        <div v-if="mode === 'register'">
          <label class="block text-sm font-medium text-gray-700"
            >Nama Lengkap</label
          >
          <input
            v-model="fullName"
            type="text"
            required
            class="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="Masukkan nama Anda"
          />
        </div>

        <!-- Input Email -->
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

        <!-- Input Password -->
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

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:bg-gray-400 transition"
        >
          <template v-if="loading">Memproses...</template>
          <template v-else>
            {{ mode === "login" ? "Masuk" : "Daftar Akun" }}
          </template>
        </button>
      </form>

      <!-- Toggle Link Alternatif -->
      <div class="text-center text-sm text-gray-600 pt-2">
        <template v-if="mode === 'login'">
          Belum punya akun?
          <button
            type="button"
            @click="switchMode('register')"
            class="text-blue-600 hover:underline font-semibold ml-1"
          >
            Daftar di sini
          </button>
        </template>
        <template v-else>
          Sudah punya akun?
          <button
            type="button"
            @click="switchMode('login')"
            class="text-blue-600 hover:underline font-semibold ml-1"
          >
            Masuk di sini
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
