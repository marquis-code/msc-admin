<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Header -->
      <header class="flex justify-between items-center bg-white shadow rounded-2xl p-5">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Waitlist</h1>
          <p class="text-sm text-gray-500">Manage users waiting for product access</p>
        </div>
        <button
          @click="refreshWaitlist"
          :disabled="isLoading"
          class="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl shadow hover:shadow-md transition"
        >
          <RefreshCwIcon class="w-4 h-4" :class="{ 'animate-spin': isLoading }" />
          <span>Refresh</span>
        </button>
      </header>

      <!-- Waitlist Table -->
      <div class="bg-white rounded-2xl shadow overflow-hidden">
        <!-- Table Header (Desktop) -->
        <div class="hidden md:grid grid-cols-3 bg-gray-50 px-6 py-3 text-sm font-semibold text-gray-600">
          <div>Email</div>
          <div>Joined</div>
          <div class="text-right">Actions</div>
        </div>

        <!-- Table Body -->
        <div v-if="waitlist.length > 0" class="divide-y divide-gray-100">
          <div
            v-for="entry in waitlist"
            :key="entry.id"
            class="grid grid-cols-1 md:grid-cols-3 items-center px-6 py-4 hover:bg-gray-50 transition"
          >
            <!-- Email -->
            <div class="text-gray-900 font-medium truncate">{{ entry.email }}</div>
            
            <!-- Date -->
            <div class="text-gray-500 text-sm mt-1 md:mt-0">
              {{ formatDate(entry.created_at) }}
            </div>

            <!-- Actions -->
            <div class="mt-3 md:mt-0 flex justify-end">
              <button
                @click="openDeleteModal(entry)"
                class="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
              >
                <TrashIcon class="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12 text-gray-500 text-sm">
          No entries found in the waitlist.
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <transition name="scale">
          <div
            v-if="showModal"
            class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4"
          >
            <h2 class="text-xl font-bold text-gray-900 mb-2">Confirm Deletion</h2>
            <p class="text-gray-600 mb-6">
              Are you sure you want to delete 
              <span class="font-medium text-gray-900">{{ selectedEntry?.email }}</span> 
              from the waitlist?
            </p>
            <div class="flex justify-end gap-3">
              <button
                @click="closeModal"
                class="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                @click="confirmDelete"
                class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow transition"
              >
                Delete
              </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RefreshCwIcon, TrashIcon } from 'lucide-vue-next'

// ✅ Mock Waitlist Data
const waitlist = ref([
  { id: 1, email: "john.doe@example.com", created_at: "2025-08-20T12:30:00Z" },
  { id: 2, email: "jane.smith@example.com", created_at: "2025-08-21T09:15:00Z" },
  { id: 3, email: "alex.brown@example.com", created_at: "2025-08-23T18:45:00Z" },
  { id: 4, email: "sara.wilson@example.com", created_at: "2025-08-25T10:05:00Z" }
])

const isLoading = ref(false)
const showModal = ref(false)
const selectedEntry = ref<{ id: number; email: string } | null>(null)

// Refresh
const refreshWaitlist = async () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    console.log("Waitlist refreshed")
  }, 1000)
}

// Modal functions
const openDeleteModal = (entry: { id: number; email: string }) => {
  selectedEntry.value = entry
  showModal.value = true
}
const closeModal = () => {
  showModal.value = false
  selectedEntry.value = null
}
const confirmDelete = () => {
  if (selectedEntry.value) {
    waitlist.value = waitlist.value.filter(e => e.id !== selectedEntry.value?.id)
    console.log("Deleted entry:", selectedEntry.value)
  }
  closeModal()
}

// Date formatter
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  })
}

onMounted(() => {
  console.log("Loaded waitlist:", waitlist.value)
})

definePageMeta({
  layout: 'dashboard'
})
</script>

<style scoped>
.bg-primary {
  background-color: #00B8AE;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.scale-enter-from,
.scale-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
</style>
