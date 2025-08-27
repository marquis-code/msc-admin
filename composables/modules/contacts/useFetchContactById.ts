import { contacts_api } from '@/api_factory/modules/contacts'
import { ref } from 'vue'

export const useContactById = () => {
  const contact = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchContactById = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await contacts_api.$_contact_by_id(id)
      contact.value = response.data
      return response.data
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to fetch contact'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    contact,
    loading,
    error,
    fetchContactById,
  }
}
