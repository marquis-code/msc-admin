<template>
  <div class="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
    <div class="p-6">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <div
            class="w-12 h-12 rounded-full flex items-center justify-center"
            :class="iconBgClass"
          >
            <component :is="icon" class="w-6 h-6" :class="iconClass" />
          </div>
        </div>
        <div class="ml-4 w-full">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-gray-600 truncate">
              {{ title }}
            </p>
            <div
              v-if="trend"
              class="flex items-center text-sm"
              :class="trendClass"
            >
              <component :is="trendIcon" class="w-4 h-4 mr-1" />
              {{ trend }}%
            </div>
          </div>
          <div class="flex items-baseline">
            <p class="text-2xl font-semibold text-gray-900">
              {{ formattedValue }}
            </p>
            <p v-if="subtitle" class="ml-2 text-sm text-gray-500">
              {{ subtitle }}
            </p>
          </div>
        </div>
      </div>
      
      <!-- Progress bar if percentage is provided -->
      <div v-if="percentage !== undefined" class="mt-4">
        <div class="bg-gray-200 rounded-full h-2">
          <div
            class="bg-primary rounded-full h-2 transition-all duration-500 ease-out"
            :style="{ width: `${Math.min(percentage, 100)}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  value: number;
  icon: any;
  color?: 'primary' | 'success' | 'warning' | 'danger';
  subtitle?: string;
  trend?: number;
  percentage?: number;
}

const {
  title,
  value,
  icon,
  color = 'primary',
  subtitle,
  trend,
  percentage
} = defineProps<Props>();

const formattedValue = computed(() => {
  return new Intl.NumberFormat().format(value);
});

const iconBgClass = computed(() => {
  switch (color) {
    case 'success': return 'bg-green-100';
    case 'warning': return 'bg-yellow-100';
    case 'danger': return 'bg-red-100';
    default: return 'bg-primary/10';
  }
});

const iconClass = computed(() => {
  switch (color) {
    case 'success': return 'text-green-600';
    case 'warning': return 'text-yellow-600';
    case 'danger': return 'text-red-600';
    default: return 'text-primary';
  }
});

const trendIcon = computed(() => {
  return trend && trend > 0 ? 'TrendingUpIcon' : 'TrendingDownIcon';
});

const trendClass = computed(() => {
  if (!trend) return '';
  return trend > 0 ? 'text-green-600' : 'text-red-600';
});
</script>

<style scoped>
.text-primary {
  color: #00b8AE;
}
.bg-primary\\/10 {
  background-color: rgba(0, 184, 174, 0.1);
}
.bg-primary {
  background-color: #00b8AE;
}
</style>