export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();

  // Jika mencoba akses selain /login dan /register saat belum login
  if (!user.value && to.path !== "/login" && to.path !== "/register") {
    return navigateTo("/login");
  }
});
