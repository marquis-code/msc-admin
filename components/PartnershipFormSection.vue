<template>
  <section class="py-16">
    <div class="max-w-7xl dark:bg-dark-gray border-[0.5px] border-gray-100 dark:border-0 rounded-2xl p-6 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <!-- Image Section -->
          <div class="relative h-64 lg:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Professional handshake"
              class="w-full h-full rounded-xl object-cover"
            />
          </div>
          
          <!-- Form Section -->
          <div class="p-8 dark:bg-dark-gray lg:p-12">
            <div class="mb-8">
              <h2 class="text-3xl md:text-4xl text-center font-semibold text-primary-gray mb-4">
                Ready to Partner with Us?
              </h2>
              <p class="text-primary-gray2 dark:text-light-gray text-center">
                Fill out the form below and let's start building the future of pharmaceutical distribution together.
              </p>
            </div>
            
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-primary-gray mb-2">
                    Full Name <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.fullName"
                    type="text"
                    placeholder="Enter your full name"
                    class="w-full px-4 dark:bg-dark dark:text-light-gray text-sm py-3 border dark:border-0 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-primary-gray mb-2">
                    Organization <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.organization"
                    type="text"
                    placeholder="Company or organization name"
                    class="w-full px-4 dark:bg-dark dark:text-light-gray text-sm py-3 border dark:border-0 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-primary-gray mb-2">
                    Email Address <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="your.email@example.com"
                    class="w-full px-4 dark:bg-dark dark:text-light-gray text-sm py-3 border dark:border-0 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-primary-gray mb-2">
                    Phone Number <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    class="w-full px-4 dark:bg-dark dark:text-light-gray text-sm py-3 border dark:border-0 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-primary-gray mb-2">Message</label>
                <textarea
                  v-model="form.message"
                  rows="4"
                  placeholder="Tell us about your business and partnership interests..."
                  class="w-full px-4 dark:bg-dark dark:text-light-gray text-sm py-3 border dark:border-0 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                ></textarea>
              </div>
              
              <div class="text-center">
                <button
                  type="submit"
                  class="inline-flex items-center px-8 py-3 bg-primary  text-white font-medium rounded-full transition-colors duration-200"
                >
                  Become a Partner
                </button>
              </div>
            </form>
          </div>
        </div>
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

const form = ref<PartnershipForm>({
  fullName: '',
  organization: '',
  email: '',
  phone: '',
  message: ''
})

const submitForm = () => {
  console.log('Partnership form submitted:', form.value)
  // Add your form submission logic here
}
</script>