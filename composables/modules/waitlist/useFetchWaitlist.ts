import { waitlist_api } from '@/api_factory/modules/waitlist'
import { ref } from 'vue'

export const useFetchWaitlist = () => {
  const waitlist = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchWaitlist = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await waitlist_api.$_fetch_waitlist()
      waitlist.value = response.data
      return response.data
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to fetch waitlist'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    waitlist,
    loading,
    error,
    fetchWaitlist,
  }
}
