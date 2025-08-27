<template>
  <AdminLayout>
    <div class="space-y-8">
      <!-- Header -->
      <header class="bg-white rounded-2xl shadow p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p class="text-sm text-gray-500">Quick summary of your stats</p>
        </div>
        <!-- <Button
          variant="primary"
          @click="refreshStats"
          :loading="isLoading"
          class="flex items-center px-4 py-2 rounded-xl shadow hover:shadow-lg transition-all duration-200"
        >
          <RefreshCwIcon class="w-5 h-5 mr-2" :class="{ 'animate-spin': isLoading }" />
          Refresh
        </Button> -->
      </header>

      <!-- Stats Grid -->
      <section>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="(card, idx) in statsCards"
            :key="idx"
            :to="card.to"
            class="group bg-white rounded-2xl shadow p-6 flex items-center justify-between transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <div>
              <p class="text-sm text-gray-500">{{ card.title }}</p>
              <h2 class="text-3xl font-bold text-gray-900 mt-1">{{ card.value }}</h2>
              <p v-if="card.subtitle" class="text-xs text-gray-400 mt-1">{{ card.subtitle }}</p>
            </div>
            <div class="flex-shrink-0">
              <component
                :is="card.icon"
                class="w-10 h-10 text-white rounded-xl p-2 transition-transform group-hover:scale-110"
                :class="card.bg"
              />
            </div>
          </NuxtLink>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import {
  MailIcon,
  MailOpenIcon,
  CheckCircleIcon,
  ClockIcon,
  UsersIcon,
  UserPlusIcon,
  RefreshCwIcon
} from 'lucide-vue-next'

const isLoading = ref(false)

// Example mock stats with each count = 10
const stats = ref({
  totalContacts: 10,
  unreadContacts: 10,
  readContacts: 10,
  recentContacts: 10,
  totalWaitlist: 10,
  recentWaitlist: 10
})

const refreshStats = async () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
}

const statsCards = computed(() => [
  { title: 'Total Contacts', value: stats.value.totalContacts, icon: MailIcon, bg: 'bg-primary', to: '/admin/contacts' },
  { title: 'Unread Contacts', value: stats.value.unreadContacts, icon: MailOpenIcon, bg: 'bg-yellow-500', subtitle: 'Need attention', to: '/admin/contacts' },
  { title: 'Read Contacts', value: stats.value.readContacts, icon: CheckCircleIcon, bg: 'bg-green-500', to: '/admin/contacts' },
  { title: 'Recent Contacts', value: stats.value.recentContacts, icon: ClockIcon, bg: 'bg-blue-500', subtitle: 'Last 7 days', to: '/admin/contacts' },
  { title: 'Waitlist Total', value: stats.value.totalWaitlist, icon: UsersIcon, bg: 'bg-primary', to: '/admin/waitlist' },
  { title: 'Recent Waitlist', value: stats.value.recentWaitlist, icon: UserPlusIcon, bg: 'bg-indigo-500', subtitle: 'Last 7 days', to: '/admin/waitlist' }
])

definePageMeta({
  layout: 'dashboard'
})
</script>

<style scoped>
.bg-primary {
  background-color: #00B8AE;
}
</style>
