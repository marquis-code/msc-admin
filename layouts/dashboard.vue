<script setup lang="ts">
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const links = [
  { to: '/dashboard', label: 'Home', icon: 'M3 12h18M12 3v18' },
  { to: '/dashboard/contacts', label: 'Contacts', icon: 'M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12M16 10a4 4 0 1 1-8 0' },
  { to: '/dashboard/waitlist', label: 'Waitlist', icon: 'M4 6h16M6 10h12M8 14h8M10 18h4' },
]
</script>

<template>
  <div class="flex h-screen overflow-hidden  text-white">
    <!-- Sidebar -->
    <aside class="hidden md:flex md:flex-col fixed inset-y-0 left-0 w-64 bg-slate-900/90 backdrop-blur-xl border-r border-white/10">
      <!-- Logo -->
      <div class="p-5 border-b border-white/10 flex items-center gap-3">
        <div class="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#00B8AE] to-emerald-500 shadow-lg"></div>
        <div>
          <p class="font-semibold tracking-wide">PulseDash</p>
          <p class="text-xs text-slate-400">Nuxt 3 × Tailwind</p>
        </div>
      </div>

      <!-- Nav links -->
      <nav class="p-4 space-y-2 flex-1">
        <NuxtLink
          v-for="l in links" :key="l.to" :to="l.to"
          class="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all duration-300 hover:bg-[#00B8AE]/20 hover:text-[#00B8AE]"
          exact-active-class="bg-[#00B8AE]/20 text-[#00B8AE]"
        >
          <svg viewBox="0 0 24 24" class="h-5 w-5 opacity-80 group-hover:opacity-100">
            <path :d="l.icon" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>{{ l.label }}</span>
        </NuxtLink>
      </nav>

      <!-- User -->
      <div class="p-4 border-t border-white/10">
        <div class="flex items-center gap-3">
          <img class="h-9 w-9 rounded-xl object-cover ring-1 ring-white/10" src="https://i.pravatar.cc/80?img=32" alt="avatar">
          <div>
            <p class="truncate text-sm font-medium">you@company.dev</p>
            <p class="truncate text-xs text-slate-400">Admin</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Mobile Sidebar -->
    <transition name="slide">
      <aside v-if="isMobileMenuOpen" class="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900/95 backdrop-blur-xl border-r border-white/10 flex flex-col md:hidden">
        <div class="p-5 border-b border-white/10 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="h-8 w-8 rounded-xl bg-gradient-to-br from-[#00B8AE] to-emerald-500"></div>
            <p class="font-semibold">PulseDash</p>
          </div>
          <button @click="isMobileMenuOpen = false" class="p-2 hover:bg-white/10 rounded-lg">
            <svg viewBox="0 0 24 24" class="h-5 w-5">
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <nav class="p-4 space-y-2 flex-1">
          <NuxtLink
            v-for="l in links" :key="l.to" :to="l.to"
            @click="isMobileMenuOpen = false"
            class="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-[#00B8AE]/20 hover:text-[#00B8AE] transition"
            exact-active-class="bg-[#00B8AE]/20 text-[#00B8AE]"
          >
            <svg viewBox="0 0 24 24" class="h-5 w-5 opacity-80 group-hover:opacity-100">
              <path :d="l.icon" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ l.label }}</span>
          </NuxtLink>
        </nav>
      </aside>
    </transition>

    <!-- Overlay for mobile -->
    <transition name="fade">
      <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-black/50 z-40 md:hidden" @click="isMobileMenuOpen = false"></div>
    </transition>

    <!-- Main area -->
    <div class="flex-1 flex flex-col md:ml-64">
      <!-- Header -->
      <header class="sticky top-0 z-30 h-14 flex items-center justify-between bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-4 md:px-6">
        <!-- Left -->
        <div class="flex items-center gap-3">
          <button @click="isMobileMenuOpen = true" class="p-2 rounded-lg hover:bg-white/10 transition md:hidden">
            <svg viewBox="0 0 24 24" class="h-6 w-6">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <h1 class="font-semibold tracking-wide text-[#00B8AE]">Dashboard</h1>
        </div>

        <!-- Right -->
        <div class="flex items-center gap-3">
          <button class="p-2 rounded-lg hover:bg-[#00B8AE]/20 transition">
            <svg viewBox="0 0 24 24" class="h-5 w-5">
              <path d="M15 17h5l-1.4-1.4a9 9 0 1 0-2.6 2.6L20 17h-5z" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
            </svg>
          </button>
          <img class="h-8 w-8 rounded-full ring-1 ring-white/10" src="https://i.pravatar.cc/80?img=5" alt="user">
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto p-4 md:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Sidebar + overlay animations */
.slide-enter-from { transform: translateX(-100%); }
.slide-enter-to { transform: translateX(0); }
.slide-leave-from { transform: translateX(0); }
.slide-leave-to { transform: translateX(-100%); }
.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease; }

.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-to, .fade-leave-from { opacity: 1; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
</style>
