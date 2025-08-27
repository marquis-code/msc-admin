import { contacts_api } from '@/api_factory/modules/contacts'
import { ref } from 'vue'

export const useDeleteContact = () => {
  const success = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const deleteContact = async (id: string) => {
    loading.value = true
    error.value = null
    success.value = false
    try {
      const response = await contacts_api.$_delete_contact(id)
      success.value = true
      return response.data
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to delete contact'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    success,
    loading,
    error,
    deleteContact,
  }
}
