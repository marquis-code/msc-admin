<template>
  <div class="fixed top-4 right-4 space-y-2 z-[999999]">
    <TransitionGroup name="toast" tag="div" class="space-y-2">
      <div v-for="toast in toasts" :key="toast.id" :class="[
        'flex items-center p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300',
        getToastClasses(toast.type)
      ]" @mouseenter="pauseToast(toast.id)" @mouseleave="resumeToast(toast.id)">
        <!-- Icon -->
        <div class="flex-shrink-0 mr-3">
          <component :is="getToastIcon(toast.type)" class="w-5 h-5" />
        </div>

        <!-- Message -->
        <div class="flex-1 text-sm font-medium">
          {{ toast.message }}
        </div>

        <!-- Close Button -->
        <button @click="removeToast(toast.id)"
          class="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/composables/useToast'
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/outline'

const { toasts, removeToast, pauseToast, resumeToast } = useToast()

const getToastClasses = (type: string) => {
  const baseClasses = 'border-l-4'

  switch (type) {
    case 'success':
      return `${baseClasses} bg-green-50 border-green-400 text-green-800`
    case 'error':
      return `${baseClasses} bg-red-50 border-red-400 text-red-800`
    case 'warning':
      return `${baseClasses} bg-yellow-50 border-yellow-400 text-yellow-800`
    case 'info':
      return `${baseClasses} bg-blue-50 border-blue-400 text-blue-800`
    default:
      return `${baseClasses} bg-gray-50 border-gray-400 text-gray-800`
  }
}

const getToastIcon = (type: string) => {
  switch (type) {
    case 'success':
      return CheckCircleIcon
    case 'error':
      return XCircleIcon
    case 'warning':
      return ExclamationTriangleIcon
    case 'info':
      return InformationCircleIcon
    default:
      return InformationCircleIcon
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
