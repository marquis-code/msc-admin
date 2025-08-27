export default defineNuxtRouteMiddleware((to) => {
  const { checkAuth } = useAuth();
  
  if (!checkAuth()) {
    return navigateTo('/admin/login');
  }
});