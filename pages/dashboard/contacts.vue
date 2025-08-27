<template>
  <AdminLayout>
    <div class="space-y-8 text-white min-h-screen">
      <!-- Header -->
      <div class="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h1 class="text-xl font-bold text-gray-900">📬 Contacts Management</h1>
          <p class="mt-1 text-sm text-gray-600">Manage customer inquiries and contact requests in style 🚀</p>
        </div>

        <div class="flex items-center space-x-3">
          <!-- View Toggle -->
          <button
            @click="viewMode = 'grid'"
            class="p-2 rounded-lg transition-all"
            :class="viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'"
          >
            <GridIcon class="w-5 h-5" />
          </button>
          <button
            @click="viewMode = 'list'"
            class="p-2 rounded-lg transition-all"
            :class="viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'"
          >
            <ListIcon class="w-5 h-5" />
          </button>

          <!-- Refresh Button -->
          <button
            @click="refreshContacts"
            class="flex items-center text-sm bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl shadow-md transition-all duration-200"
          >
            <RefreshCwIcon class="w-5 h-5 mr-2 animate-spin" v-if="isLoading" />
            <RefreshCwIcon class="w-5 h-5 mr-2" v-else />
            Refresh
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="bg-gradient-to-r from-primary to-teal-500 p-6 rounded-2xl text-white shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium opacity-80">{{ stat.label }}</p>
              <p class="text-3xl font-bold mt-1">{{ stat.value }}</p>
            </div>
            <component :is="stat.icon" class="w-10 h-10 opacity-90" />
          </div>
        </div>
      </div>

      <!-- Contacts Section -->
      <div class="bg-white rounded-2xl  overflow-x-auto">
        <div v-if="isLoading" class="flex justify-center py-20">
          <div class="w-12 h-12 border-4 border-primary border-dashed rounded-full animate-spin"></div>
        </div>

        <transition name="fade" mode="out-in">
          <!-- Grid View -->
          <div v-if="viewMode === 'grid'" key="grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="contact in paginatedContacts"
              :key="contact.id"
              class="p-6 bg-gradient-to-br from-white to-gray-50 border rounded-2xl shadow hover:shadow-xl transition-all duration-300 cursor-pointer"
              @click="openContact(contact)"
            >
              <h3 class="font-semibold text-lg text-gray-800">{{ contact.full_name }}</h3>
              <p class="text-sm text-gray-500">{{ contact.email }}</p>
              <p class="text-sm text-gray-500">{{ contact.phone_number }}</p>
              <p class="text-sm text-gray-500">{{ contact.organization }}</p>
              <p class="text-sm font-medium text-gray-700 mt-2">{{ contact.subject }}</p>
              <p class="mt-1 text-gray-700 line-clamp-2">{{ contact.message }}</p>
            </div>
          </div>

          <!-- List View (Responsive Table) -->
          <div v-else key="list" class="overflow-x-auto">
            <table class="min-w-full hidden md:table divide-y divide-gray-200">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Phone</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Organization</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Subject</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-100">
                <tr v-for="contact in paginatedContacts" :key="contact.id" class="hover:bg-gray-50 transition">
                  <td class="px-6 text-sm py-4 font-medium text-gray-800">{{ contact.full_name }}</td>
                  <td class="px-6 text-sm py-4 text-gray-600">{{ contact.email }}</td>
                  <td class="px-6 text-sm py-4 text-gray-600">{{ contact.phone_number }}</td>
                  <td class="px-6 text-sm py-4 text-gray-600">{{ contact.organization }}</td>
                  <td class="px-6 text-sm py-4 text-gray-600">{{ contact.subject }}</td>
                  <td class="px-6 text-sm py-4 text-right space-x-3">
                    <button @click="openContact(contact)" class="text-primary hover:underline">View</button>
                    <button @click="markRead(contact)" class="text-green-600 hover:underline">Mark Read</button>
                    <button @click="confirmDelete(contact)" class="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Mobile Card Layout -->
            <div class="md:hidden space-y-4">
              <div
                v-for="contact in paginatedContacts"
                :key="contact.id"
                class="p-4 bg-gray-50 border rounded-xl shadow-sm"
              >
                <div class="flex justify-between items-center">
                  <h3 class="font-semibold text-gray-800">{{ contact.full_name }}</h3>
                  <button @click="openContact(contact)" class="text-primary text-sm font-medium">View</button>
                </div>
                <p class="text-sm text-gray-500">{{ contact.email }}</p>
                <p class="text-sm text-gray-500">{{ contact.phone_number }}</p>
                <p class="text-sm text-gray-500">{{ contact.organization }}</p>
                <p class="text-sm font-medium text-gray-700 mt-2">{{ contact.subject }}</p>
              </div>
            </div>
          </div>
        </transition>

        <!-- Pagination -->
        <div class="flex justify-between items-center mt-6">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span class="text-gray-600">Page {{ currentPage }} of {{ totalPages }}</span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Contact Modal -->
    <transition name="modal">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black bg-opacity-60" @click="closeModal"></div>
        <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative z-10 transform transition-all duration-300">
          <h2 class="text-xl font-bold text-gray-900">{{ selectedContact.full_name }}</h2>
          <p class="text-sm text-gray-500">
            {{ selectedContact.email }} | {{ selectedContact.phone_number }} | {{ selectedContact.organization }}
          </p>
          <p class="text-sm font-medium text-gray-700 mt-2">{{ selectedContact.subject }}</p>
          <p class="mt-4 text-gray-700 whitespace-pre-line">{{ selectedContact.message }}</p>

          <div class="mt-6 flex justify-end space-x-3">
            <button @click="markRead(selectedContact)" class="px-4 py-2 bg-green-500 text-white rounded-lg">Mark Read</button>
            <button @click="confirmDelete(selectedContact)" class="px-4 py-2 bg-red-500 text-white rounded-lg">Delete</button>
            <button @click="closeModal" class="px-4 py-2 bg-gray-300 rounded-lg">Close</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Delete Confirmation -->
    <transition name="modal">
      <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black bg-opacity-60" @click="showDeleteConfirm=false"></div>
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative z-10">
          <h3 class="text-lg font-bold text-gray-900">Are you sure?</h3>
          <p class="text-gray-600 mt-2">This action cannot be undone.</p>
          <div class="mt-6 flex justify-end space-x-3">
            <button @click="showDeleteConfirm=false" class="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
            <button @click="deleteContact" class="px-4 py-2 bg-red-500 text-white rounded-lg">Delete</button>
          </div>
        </div>
      </div>
    </transition>
  </AdminLayout>
</template>

<script setup lang="ts">
import {
  MailIcon,
  MailOpenIcon,
  CheckCircleIcon,
  ClockIcon,
  RefreshCwIcon,
  GridIcon,
  ListIcon,
} from "lucide-vue-next";

const contacts = ref([
  {
    id: 1,
    full_name: "John Doe",
    email: "john@example.com",
    phone_number: "123-456-7890",
    organization: "Acme Corp",
    subject: "Product Inquiry",
    message: "Hello, I'm interested in your product...",
    created_at: new Date(),
    is_read: false,
  },
  {
    id: 2,
    full_name: "Jane Smith",
    email: "jane@example.com",
    phone_number: "987-654-3210",
    organization: "Tech Inc",
    subject: "Support Request",
    message: "I need help with installation...",
    created_at: new Date(),
    is_read: true,
  },
]);

definePageMeta({
  layout: 'dashboard'
})

const isLoading = ref(false);
const viewMode = ref("grid");
const currentPage = ref(1);
const perPage = 6;

const showModal = ref(false);
const selectedContact = ref<any>({});
const showDeleteConfirm = ref(false);
const contactToDelete = ref<any>(null);

const totalPages = computed(() => Math.ceil(contacts.value.length / perPage));

const paginatedContacts = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return contacts.value.slice(start, start + perPage);
});

const stats = computed(() => [
  { label: "Total", value: contacts.value.length, icon: MailIcon },
  { label: "Unread", value: contacts.value.filter((c) => !c.is_read).length, icon: MailOpenIcon },
  { label: "Read", value: contacts.value.filter((c) => c.is_read).length, icon: CheckCircleIcon },
  {
    label: "Recent",
    value: contacts.value.filter(
      (c) => new Date(c.created_at) > new Date(new Date().setDate(new Date().getDate() - 7))
    ).length,
    icon: ClockIcon,
  },
]);

const refreshContacts = () => {
  isLoading.value = true;
  setTimeout(() => (isLoading.value = false), 1000);
};

const openContact = (contact: any) => {
  selectedContact.value = contact;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const markRead = (contact: any) => {
  contact.is_read = true;
};

const confirmDelete = (contact: any) => {
  contactToDelete.value = contact;
  showDeleteConfirm.value = true;
};

const deleteContact = () => {
  contacts.value = contacts.value.filter((c) => c.id !== contactToDelete.value.id);
  showDeleteConfirm.value = false;
  showModal.value = false;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
</script>

<style scoped>
.bg-primary {
  background-color: #00b8ae;
}
.text-primary {
  color: #00b8ae;
}
.bg-primary-dark {
  background-color: #00998f;
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

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}
.modal-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
