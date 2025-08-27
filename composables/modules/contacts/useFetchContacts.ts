import { contacts_api } from '@/api_factory/modules/contacts'
import { ref } from 'vue'

export const useFetchContacts = () => {
  const contacts = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchContacts = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await contacts_api.$_fetch_contacts()
      contacts.value = response.data
      return response.data
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to fetch contacts'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    contacts,
    loading,
    error,
    fetchContacts,
  }
}
