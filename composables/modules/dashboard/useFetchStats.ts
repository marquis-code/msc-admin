import { stats_api } from '@/api_factory/modules/dashboard'
import { ref } from 'vue'

export const useFetchDashboardStats = () => {
  const stats = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchDashboardStats = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await stats_api.$_fetch_dashboard_stats()
      stats.value = response.data
      return response.data
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to fetch dashboard stats'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    stats,
    loading,
    error,
    fetchDashboardStats,
  }
}
