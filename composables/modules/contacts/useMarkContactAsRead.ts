import { contacts_api } from '@/api_factory/modules/contacts'
import { ref } from 'vue'

export const useMarkContactAsRead = () => {
  const success = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const markContactAsRead = async (id: string) => {
    loading.value = true
    error.value = null
    success.value = false
    try {
      const response = await contacts_api.$_mark_contact_as_read(id, { read: true })
      success.value = true
      return response.data
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to mark contact as read'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    success,
    loading,
    error,
    markContactAsRead,
  }
}
