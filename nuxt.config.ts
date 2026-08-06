import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["@nuxtjs/supabase"],

  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/",
      exclude: ["/register"], // <--- TAMBAHKAN INI agar /register tidak dicegat oleh Supabase
    },
    types: false,
  },
});
