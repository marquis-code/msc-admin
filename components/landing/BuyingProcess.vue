
<template>
  <div class="bg-gray-50 dark:bg-slate-800 py-16 px-4">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
          <Icon icon="mdi:package-variant-closed" class="w-4 h-4 mr-2" />
          How It Works
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          How it works
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Simple 4-step process to get the pharmaceutical products you need
        </p>
      </div>

      <!-- Timeline Layout -->
      <div class="flex">
        <!-- Left Timeline Column -->
        <div class="relative mr-8 md:mr-12">
          <!-- Continuous Vertical Line -->
          <div class="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-100 dark:bg-gray-600"></div>
          
          <!-- Progress Line -->
          <div class="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-teal-500 transition-all duration-500 ease-out z-10"
            :style="{ height: progressLineHeight + 'px' }"></div>

          <div class="space-y-20 md:space-y-24">
            <div v-for="(step, index) in steps" :key="step.id" 
              :ref="el => { if (el) stepRefs[index] = el }"
              class="relative flex flex-col items-center">
              
              <!-- Step Number Circle -->
              <div
                class="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full font-bold text-lg md:text-xl transition-all duration-300 mb-6 relative z-20"
                :class="getStepBadgeClasses(step.id)">
                {{ step.id }}
              </div>

              <!-- Step Icon Circle - positioned in the line -->
              <div
                class="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full transition-all duration-300 relative z-20"
                :class="getIconClasses(step.id)">
                <Icon :icon="step.icon" class="w-6 h-6  md:w-7 md:h-7" />
              </div>
            </div>
          </div>
        </div>

        <!-- Right Content Column -->
        <div class="flex-1 space-y-20 md:space-y-24">
          <div v-for="(step, index) in steps" :key="step.id + '-content'"
            class="bg-white dark:bg-slate-700 rounded-2xl p-6 md:p-8 shadow-sm dark:shadow-none border border-gray-200 dark:border-slate-600 transition-all duration-300"
            :class="{ 'transform scale-[1.02] shadow-lg': isStepActive(step.id) }">
            
            <div class="mb-2">
              <h3 class="text-lg md:text-xl dark:hover:text-primary font-bold text-gray-900 dark:text-white mb-1">
                {{ step.title }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Step {{ step.id }}
              </p>
            </div>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-base">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

interface Step {
  id: number
  icon: string
  title: string
  description: string
}

const steps = ref<Step[]>([
  {
    id: 1,
    icon: 'mdi:magnify',
    title: 'Browse & Search',
    description: 'Quickly explore a wide range of products using our smart search and easy to navigate categories'
  },
  {
    id: 2,
    icon: 'mdi:cart-plus',
    title: 'Add to Cart',
    description: 'Select the product you need and add them to cart with clear product details and pricing'
  },
  {
    id: 3,
    icon: 'mdi:credit-card',
    title: 'Checkout',
    description: 'Complete purchase securely with secure payment'
  },
  {
    id: 4,
    icon: 'mdi:truck-delivery',
    title: 'Fast & Safe Delivery',
    description: 'Enjoy peace of mind as your order is carefully packed and delivered swiftly to your doorstep'
  }
])

const activeStep = ref<number>(1)
const stepRefs = ref<HTMLElement[]>([])
const progressLineHeight = ref<number>(0)

const isStepActive = (stepId: number): boolean => {
  return activeStep.value === stepId
}

const isStepCompleted = (stepId: number): boolean => {
  return activeStep.value > stepId
}

const getStepBadgeClasses = (stepId: number): string => {
  if (isStepActive(stepId)) {
    return 'bg-teal-500 text-white shadow-lg transform scale-110'
  } else if (isStepCompleted(stepId)) {
    return 'bg-teal-500 text-white shadow-md'
  } else {
    return 'bg-white dark:bg-slate-700 text-gray-400 dark:text-gray-500 shadow-sm border-2 border-gray-300 dark:border-slate-600'
  }
}

const getIconClasses = (stepId: number): string => {
  if (isStepActive(stepId) || isStepCompleted(stepId)) {
    return 'dark:bg-primary/25 text-primary'
  } else {
    return 'dark:bg-primary/25 text-primary'
  }
}

const updateActiveStep = (): void => {
  const scrollY = window.scrollY
  const windowHeight = window.innerHeight
  const offset = windowHeight * 0.5

  for (let i = stepRefs.value.length - 1; i >= 0; i--) {
    const stepElement = stepRefs.value[i]
    if (stepElement) {
      const rect = stepElement.getBoundingClientRect()
      const elementTop = rect.top + scrollY

      if (scrollY + offset >= elementTop) {
        const newActiveStep = i + 1
        if (newActiveStep !== activeStep.value) {
          activeStep.value = newActiveStep
          updateProgressHeight()
        }
        break
      }
    }
  }
}

const updateProgressHeight = (): void => {
  if (stepRefs.value.length === 0) return
  
  // Calculate progress based on active step
  const stepSpacing = 160 // spacing between steps (20 * 4 = 80 + some padding)
  if (activeStep.value === 1) {
    progressLineHeight.value = 80 // Up to first icon
  } else {
    progressLineHeight.value = 80 + ((activeStep.value - 1) * stepSpacing)
  }
}

const handleScroll = (): void => {
  requestAnimationFrame(updateActiveStep)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  setTimeout(() => {
    updateActiveStep()
    updateProgressHeight()
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-slate-700;
}

::-webkit-scrollbar-thumb {
  @apply bg-teal-500 rounded;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-teal-600;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>