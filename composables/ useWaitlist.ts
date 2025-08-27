export const useWaitlist = () => {
  const waitlist = ref<WaitlistEntry[]>([]);
  const isLoading = ref(false);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const total = ref(0);
  
  const { apiCall } = useApi();
  
  const fetchWaitlist = async (page = 1, limit = 10) => {
    isLoading.value = true;
    try {
      const response = await apiCall<PaginatedResponse<WaitlistEntry>>(
        `/admin/waitlist?page=${page}&limit=${limit}`
      );
      
      waitlist.value = response.data;
      currentPage.value = response.page;
      totalPages.value = response.totalPages;
      total.value = response.total;
    } catch (error: any) {
      console.error('Error fetching waitlist:', error);
    } finally {
      isLoading.value = false;
    }
  };
  
  const deleteWaitlistEntry = async (id: number) => {
    try {
      await apiCall(`/admin/waitlist/${id}`, {
        method: 'DELETE',
      });
      
      // Remove from local state
      waitlist.value = waitlist.value.filter(w => w.id !== id);
      total.value--;
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };
  
  return {
    waitlist: readonly(waitlist),
    isLoading: readonly(isLoading),
    currentPage: readonly(currentPage),
    totalPages: readonly(totalPages),
    total: readonly(total),
    fetchWaitlist,
    deleteWaitlistEntry,
  };
};