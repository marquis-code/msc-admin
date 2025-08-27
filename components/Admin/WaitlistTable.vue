<template>
  <div class="bg-white shadow-lg rounded-lg overflow-hidden">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-900">
          Waitlist ({{ total }})
        </h3>
        <div class="flex items-center space-x-4">
          <!-- View Toggle -->
          <div class="flex rounded-md shadow-sm">
            <button
              @click="viewMode = 'list'"
              class="px-3 py-2 text-sm font-medium transition-colors duration-200"
              :class="viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
            >
              <ListIcon class="w-4 h-4" />
            </button>
            <button
              @click="viewMode = 'grid'"
              class="px-3 py-2 text-sm font-medium transition-colors duration-200"
              :class="viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
            >
              <GridIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Loading State -->
    <div v-if="isLoading" class="p-8">
      <LoadingSpinner text="Loading waitlist..." />
    </div>
    
    <!-- Empty State -->
    <div v-else-if="waitlist.length === 0" class="p-8 text-center">
      <UsersIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <p class="text-gray-500">No waitlist entries found</p>
    </div>
    
    <!-- List View -->
    <div v-else-if="viewMode === 'list'" class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              #
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email Address
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Join Date
            </th>
            <th class="relative px-6 py-3">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="(entry, index) in waitlist"
            :key="entry.id"
            class="hover:bg-gray-50 transition-colors duration-150"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ ((currentPage - 1) * 10) + index + 1 }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <MailIcon class="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ entry.email }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(entry.created_at) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <Button
                variant="danger"
                size="sm"
                @click="confirmDelete(entry)"
              >
                <TrashIcon class="w-4 h-4" />
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Grid View -->
    <div v-else class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(entry, index) in waitlist"
          :key="entry.id"
          class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <MailIcon class="w-5 h-5 text-primary" />
              </div>
              <div class="ml-3">
                <span class="text-xs text-gray-500">
                  #{{ ((currentPage - 1) * 10) + index + 1 }}
                </span>
              </div>
            </div>
            <Button
              variant="danger"
              size="sm"
              @click="confirmDelete(entry)"
            >
              <TrashIcon class="w-4 h-4" />
            </Button>
          </div>
          
          <div class="mb-3">
            <p class="text-sm font-medium text-gray-900 break-all">
              {{ entry.email }}
            </p>
            <p class="text-xs text-gray-500 mt-1">
              Joined {{ formatDate(entry.created_at) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Pagination -->
    <div v-if="totalPages > 1" class="px-6 py-3 bg-gray-50 border-t border-gray-200">
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-700">
          Showing {{ ((currentPage - 1) * 10) + 1 }} to {{ Math.min(currentPage * 10, total) }} of {{ total }} results
        </div>
        <div class="flex items-center space-x-2">
          <Button
            variant="secondary"
            size="sm"
            :disabled="currentPage === 1"
            @click="$emit('page-change', currentPage - 1)"
          >
            <ChevronLeftIcon class="w-4 h-4" />
          </Button>
          
          <template v-for="page in visiblePages" :key="page">
            <Button
              :variant="page === currentPage ? 'primary' : 'secondary'"
              size="sm"
              @click="$emit('page-change', page)"
            >
              {{ page }}
            </Button>
          </template>
          
          <Button
            variant="secondary"
            size="sm"
            :disabled="currentPage === totalPages"
            @click="$emit('page-change', currentPage + 1)"
          >
            <ChevronRightIcon class="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
    
    <!-- Confirmation Dialog -->
    <ConfirmDialog
      v-model="showDeleteConfirm"
      title="Remove from Waitlist"
      :message="`Are you sure you want to remove ${entryToDelete?.email} from the waitlist?`"
      confirm-text="Remove"
      :loading="deleteLoading"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import {
  MailIcon,
  TrashIcon,
  UsersIcon,
  ListIcon,
  GridIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-vue-next';

interface Props {
  waitlist: WaitlistEntry[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  total: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'delete-entry': [id: number];
  'page-change': [page: number];
}>();

const viewMode = ref<ViewMode>('list');
const showDeleteConfirm = ref(false);
const entryToDelete = ref<WaitlistEntry | null>(null);
const deleteLoading = ref(false);

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, props.currentPage - 2);
  const end = Math.min(props.totalPages, props.currentPage + 2);
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  return pages;
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const confirmDelete = (entry: WaitlistEntry) => {
  entryToDelete.value = entry;
  showDeleteConfirm.value = true;
};

const handleDelete = async () => {
  if (!entryToDelete.value) return;
  
  deleteLoading.value = true;
  try {
    emit('delete-entry', entryToDelete.value.id);
    showDeleteConfirm.value = false;
    entryToDelete.value = null;
  } finally {
    deleteLoading.value = false;
  }
};
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