import { waitlist_api } from '@/api_factory/modules/waitlist'
import { ref } from 'vue'

export const useDeleteWaitlist = () => {
  const success = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const deleteWaitlist = async (id: string) => {
    loading.value = true
    error.value = null
    success.value = false
    try {
      const response = await waitlist_api.$_delete_waitlist(id)
      success.value = true
      return response.data
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to delete waitlist entry'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    success,
    loading,
    error,
    deleteWaitlist,
  }
}
