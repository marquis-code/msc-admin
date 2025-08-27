export const useAuth = () => {
  const isAuthenticated = ref(false);
  const isLoading = ref(false);
  
  const login = async (credentials: { username: string; password: string }) => {
    isLoading.value = true;
    try {
      const { apiCall } = useApi();
      await apiCall('/admin/login', {
        method: 'POST',
        body: credentials,
      });
      
      isAuthenticated.value = true;
      await navigateTo('/admin');
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };
  
  const logout = async () => {
    isAuthenticated.value = false;
    await navigateTo('/admin/login');
  };
  
  const checkAuth = () => {
    // In a real app, check token validity
    const token = useCookie('admin-token');
    isAuthenticated.value = !!token.value;
    return isAuthenticated.value;
  };
  
  return {
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),
    login,
    logout,
    checkAuth,
  };
};