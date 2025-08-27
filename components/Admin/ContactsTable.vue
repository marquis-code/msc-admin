<template>
  <div class="bg-white shadow-lg rounded-lg overflow-hidden">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-900">
          Contacts ({{ total }})
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
      <LoadingSpinner text="Loading contacts..." />
    </div>
    
    <!-- Empty State -->
    <div v-else-if="contacts.length === 0" class="p-8 text-center">
      <MailIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <p class="text-gray-500">No contacts found</p>
    </div>
    
    <!-- List View -->
    <div v-else-if="viewMode === 'list'" class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Organization
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subject
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th class="relative px-6 py-3">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="contact in contacts"
            :key="contact.id"
            class="hover:bg-gray-50 transition-colors duration-150"
            :class="{ 'bg-blue-50': !contact.is_read }"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <UserIcon class="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ contact.full_name }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ contact.email }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ contact.organisation }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ contact.subject }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                :class="contact.is_read ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
              >
                {{ contact.is_read ? 'Read' : 'Unread' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(contact.created_at) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex items-center space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  @click="viewContact(contact.id)"
                >
                  <EyeIcon class="w-4 h-4" />
                </Button>
                <Button
                  v-if="!contact.is_read"
                  variant="primary"
                  size="sm"
                  @click="markAsRead(contact.id)"
                >
                  <CheckIcon class="w-4 h-4" />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  @click="confirmDelete(contact)"
                >
                  <TrashIcon class="w-4 h-4" />
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Grid View -->
    <div v-else class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="contact in contacts"
          :key="contact.id"
          class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          :class="{ 'border-primary bg-primary/5': !contact.is_read }"
        >
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <UserIcon class="w-5 h-5 text-primary" />
              </div>
              <div class="ml-3">
                <h4 class="text-sm font-medium text-gray-900">{{ contact.full_name }}</h4>
                <p class="text-xs text-gray-500">{{ contact.email }}</p>
              </div>
            </div>
            <span
              class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
              :class="contact.is_read ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
            >
              {{ contact.is_read ? 'Read' : 'Unread' }}
            </span>
          </div>
          
          <div class="mb-3">
            <p class="text-sm text-gray-600 mb-1">
              <span class="font-medium">Organization:</span> {{ contact.organisation }}
            </p>
            <p class="text-sm text-gray-600 mb-1">
              <span class="font-medium">Subject:</span> {{ contact.subject }}
            </p>
            <p class="text-xs text-gray-500">{{ formatDate(contact.created_at) }}</p>
          </div>
          
          <p class="text-sm text-gray-700 mb-4 line-clamp-2">
            {{ contact.message }}
          </p>
          
          <div class="flex items-center justify-between">
            <Button
              variant="secondary"
              size="sm"
              @click="viewContact(contact.id)"
              class="flex items-center"
            >
              <EyeIcon class="w-4 h-4 mr-1" />
              View
            </Button>
            <div class="flex items-center space-x-2">
              <Button
                v-if="!contact.is_read"
                variant="primary"
                size="sm"
                @click="markAsRead(contact.id)"
              >
                <CheckIcon class="w-4 h-4" />
              </Button>
              <Button
                variant="danger"
                size="sm"
                @click="confirmDelete(contact)"
              >
                <TrashIcon class="w-4 h-4" />
              </Button>
            </div>
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
      title="Delete Contact"
      :message="`Are you sure you want to delete the contact from ${contactToDelete?.full_name}? This action cannot be undone.`"
      confirm-text="Delete"
      :loading="deleteLoading"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import {
  UserIcon,
  EyeIcon,
  CheckIcon,
  TrashIcon,
  MailIcon,
  ListIcon,
  GridIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-vue-next';

interface Props {
  contacts: Contact[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  total: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'view-contact': [id: number];
  'mark-read': [id: number];
  'delete-contact': [id: number];
  'page-change': [page: number];
}>();

const viewMode = ref<ViewMode>('list');
const showDeleteConfirm = ref(false);
const contactToDelete = ref<Contact | null>(null);
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
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const viewContact = (id: number) => {
  emit('view-contact', id);
};

const markAsRead = (id: number) => {
  emit('mark-read', id);
};

const confirmDelete = (contact: Contact) => {
  contactToDelete.value = contact;
  showDeleteConfirm.value = true;
};

const handleDelete = async () => {
  if (!contactToDelete.value) return;
  
  deleteLoading.value = true;
  try {
    emit('delete-contact', contactToDelete.value.id);
    showDeleteConfirm.value = false;
    contactToDelete.value = null;
  } finally {
    deleteLoading.value = false;
  }
};
</script>

<style scoped>
.text-primary {
  color: #00b8AE;
}

.border-primary {
  border-color: #00b8AE;
}
.bg-primary {
  background-color: #00b8AE;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>