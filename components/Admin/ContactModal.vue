<template>
  <Modal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    title="Contact Details"
    size="lg"
  >
    <div v-if="isLoading" class="p-8">
      <LoadingSpinner text="Loading contact details..." />
    </div>
    
    <div v-else-if="contact" class="space-y-6">
      <!-- Contact Header -->
      <div class="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <UserIcon class="w-6 h-6 text-primary" />
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-medium text-gray-900">{{ contact.full_name }}</h3>
            <p class="text-sm text-gray-600">{{ contact.email }}</p>
          </div>
        </div>
        <span
          class="inline-flex px-3 py-1 text-sm font-semibold rounded-full"
          :class="contact.is_read ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
        >
          {{ contact.is_read ? 'Read' : 'Unread' }}
        </span>
      </div>
      
      <!-- Contact Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <p class="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
            {{ contact.phone_number || 'Not provided' }}
          </p>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Organization</label>
          <p class="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
            {{ contact.organisation || 'Not provided' }}
          </p>
        </div>
        
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
          <p class="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
            {{ contact.subject }}
          </p>
        </div>
        
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
          <div class="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md min-h-[100px] whitespace-pre-wrap">
            {{ contact.message }}
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Submitted At</label>
          <p class="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
            {{ formatDate(contact.created_at) }}
          </p>
        </div>
      </div>
      
      <!-- Actions -->
      <div class="flex justify-between items-center pt-4 border-t border-gray-200">
        <div class="flex items-center space-x-3">
          <Button
            v-if="!contact.is_read"
            variant="primary"
            @click="$emit('mark-read', contact.id)"
          >
            <CheckIcon class="w-4 h-4 mr-2" />
            Mark as Read
          </Button>
          
          <Button
            variant="secondary"
            @click="copyToClipboard"
          >
            <CopyIcon class="w-4 h-4 mr-2" />
            Copy Details
          </Button>
        </div>
        
        <Button
          variant="danger"
          @click="$emit('delete-contact', contact.id)"
        >
          <TrashIcon class="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { UserIcon, CheckIcon, TrashIcon, CopyIcon } from 'lucide-vue-next';

interface Props {
  modelValue: boolean;
  contact: Contact | null;
  isLoading: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'mark-read': [id: number];
  'delete-contact': [id: number];
}>();

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
};

const copyToClipboard = async () => {
  if (!props.contact) return;
  
  const text = `
Contact Details:
Name: ${props.contact.full_name}
Email: ${props.contact.email}
Phone: ${props.contact.phone_number || 'Not provided'}
Organization: ${props.contact.organisation || 'Not provided'}
Subject: ${props.contact.subject}
Message: ${props.contact.message}
Submitted: ${formatDate(props.contact.created_at)}
  `.trim();
  
  try {
    await navigator.clipboard.writeText(text);
    // You might want to show a toast notification here
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
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
</style>