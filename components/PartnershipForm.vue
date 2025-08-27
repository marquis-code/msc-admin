<template>
  <section class="relative py-16 bg-gray-900 overflow-hidden">
    <div class="absolute inset-0 bg-black/70 z-10"></div>
    <div class="absolute inset-0">
      <img 
        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1926&q=80"
        alt="Warehouse and logistics"
        class="w-full h-full object-cover"
      />
    </div>
    
    <div class="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center text-white mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Partner with Us?</h2>
        <p class="text-lg text-gray-200">
          Fill out the form below and let's start building the future of pharmaceutical distribution together.
        </p>
      </div>
      
      <div class="bg-white/10 backdrop-blur-sm rounded-lg p-8">
        <form @submit.prevent="submitPartnershipForm" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-white text-sm font-medium mb-2">
                Full Name <span class="text-red-400">*</span>
              </label>
              <input
                v-model="partnershipForm.fullName"
                type="text"
                placeholder="Enter your full name"
                class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-white text-sm font-medium mb-2">
                Organization <span class="text-red-400">*</span>
              </label>
              <input
                v-model="partnershipForm.organization"
                type="text"
                placeholder="Company or organization name"
                class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-white text-sm font-medium mb-2">
                Email Address <span class="text-red-400">*</span>
              </label>
              <input
                v-model="partnershipForm.email"
                type="email"
                placeholder="your.email@example.com"
                class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-white text-sm font-medium mb-2">
                Phone Number <span class="text-red-400">*</span>
              </label>
              <input
                v-model="partnershipForm.phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          
          <div>
            <label class="block text-white text-sm font-medium mb-2">Message</label>
            <textarea
              v-model="partnershipForm.message"
              rows="4"
              placeholder="Tell us about your business and partnership interests..."
              class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
            ></textarea>
          </div>
          
          <div class="text-center">
            <button
              type="submit"
              class="inline-flex items-center px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition-colors duration-200"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              Become a Partner
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface PartnershipForm {
  fullName: string
  organization: string
  email: string
  phone: string
  message: string
}

const partnershipForm = ref<PartnershipForm>({
  fullName: '',
  organization: '',
  email: '',
  phone: '',
  message: ''
})

const submitPartnershipForm = () => {
  // Handle partnership form submission
  console.log('Partnership form submitted:', partnershipForm.value)
  // Add your form submission logic here
}
</script>