export const useStats = () => {
  const stats = ref<AdminStats>({
    totalContacts: 0,
    unreadContacts: 0,
    readContacts: 0,
    recentContacts: 0,
    totalWaitlist: 0,
    recentWaitlist: 0,
  });
  const isLoading = ref(false);
  
  const { apiCall } = useApi();
  
  const fetchStats = async () => {
    isLoading.value = true;
    try {
      const response = await apiCall<AdminStats>('/admin/stats');
      stats.value = response;
    } catch (error: any) {
      console.error('Error fetching stats:', error);
    } finally {
      isLoading.value = false;
    }
  };
  
  return {
    stats: readonly(stats),
    isLoading: readonly(isLoading),
    fetchStats,
  };
};