export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();
  const supabase = useSupabaseClient() as any;

  if (!user.value) {
    return navigateTo("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.value.id)
    .single();

  const userRole = profile?.role || "user";

  // Proteksi Halaman Admin: Hanya bisa dibuka oleh role 'admin'
  if (to.path.startsWith("/admin") && userRole !== "admin") {
    return navigateTo("/");
  }
});
