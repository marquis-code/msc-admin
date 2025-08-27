<template>
  <nav class="bg-white shadow-lg">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <h1 class="text-xl font-bold text-primary">Admin Dashboard</h1>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200"
              :class="isActive(item.href) ? activeClass : inactiveClass"
            >
              <component :is="item.icon" class="w-5 h-5 mr-2" />
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>
        
        <div class="flex items-center">
          <Button
            variant="secondary"
            @click="logout"
            class="flex items-center"
          >
            <LogOutIcon class="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
        
        <!-- Mobile menu button -->
        <div class="sm:hidden flex items-center">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition-colors duration-200"
          >
            <MenuIcon v-if="!mobileMenuOpen" class="w-6 h-6" />
            <XIcon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile menu -->
    <Transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="mobileMenuOpen" class="sm:hidden bg-white border-t border-gray-200">
        <div class="pt-2 pb-3 space-y-1">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="flex items-center pl-3 pr-4 py-2 text-base font-medium transition-colors duration-200"
            :class="isActive(item.href) ? 'text-primary bg-primary/10 border-r-2 border-primary' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'"
            @click="mobileMenuOpen = false"
          >
            <component :is="item.icon" class="w-5 h-5 mr-3" />
            {{ item.name }}
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { HomeIcon, UsersIcon, MailIcon, LogOutIcon, MenuIcon, XIcon } from 'lucide-vue-next';

const route = useRoute();
const { logout } = useAuth();

const mobileMenuOpen = ref(false);

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Contacts', href: '/admin/contacts', icon: MailIcon },
  { name: 'Waitlist', href: '/admin/waitlist', icon: UsersIcon },
];

const isActive = (href: string) => {
  if (href === '/admin') {
    return route.path === '/admin';
  }
  return route.path.startsWith(href);
};

const activeClass = 'border-primary text-primary border-b-2';
const inactiveClass = 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 border-b-2';
</script>

<style scoped>
.text-primary {
  color: #00b8AE;
}
.border-primary {
  border-color: #00b8AE;
}
.bg-primary\\/10 {
  background-color: rgba(0, 184, 174, 0.1);
}
</style>