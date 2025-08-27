export const useContacts = () => {
  const contacts = ref<Contact[]>([]);
  const currentContact = ref<Contact | null>(null);
  const isLoading = ref(false);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const total = ref(0);
  
  const { apiCall } = useApi();
  
  const fetchContacts = async (page = 1, limit = 10) => {
    isLoading.value = true;
    try {
      const response = await apiCall<PaginatedResponse<Contact>>(
        `/admin/contacts?page=${page}&limit=${limit}`
      );
      
      contacts.value = response.data;
      currentPage.value = response.page;
      totalPages.value = response.totalPages;
      total.value = response.total;
    } catch (error: any) {
      console.error('Error fetching contacts:', error);
    } finally {
      isLoading.value = false;
    }
  };
  
  const fetchContact = async (id: number) => {
    isLoading.value = true;
    try {
      const response = await apiCall<Contact>(`/admin/contacts/${id}`);
      currentContact.value = response;
      return response;
    } catch (error: any) {
      console.error('Error fetching contact:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };
  
  const markAsRead = async (id: number) => {
    try {
      await apiCall(`/admin/contacts/${id}/mark-read`, {
        method: 'PUT',
      });
      
      // Update local state
      const contactIndex = contacts.value.findIndex(c => c.id === id);
      if (contactIndex !== -1) {
        contacts.value[contactIndex].is_read = true;
      }
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };
  
  const deleteContact = async (id: number) => {
    try {
      await apiCall(`/admin/contacts/${id}`, {
        method: 'DELETE',
      });
      
      // Remove from local state
      contacts.value = contacts.value.filter(c => c.id !== id);
      total.value--;
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };
  
  return {
    contacts: readonly(contacts),
    currentContact: readonly(currentContact),
    isLoading: readonly(isLoading),
    currentPage: readonly(currentPage),
    totalPages: readonly(totalPages),
    total: readonly(total),
    fetchContacts,
    fetchContact,
    markAsRead,
    deleteContact,
  };
};