<template>
  <div class="min-h-screen wflex items-center justify-center">
    <div class="container max-w-6xl mx-auto px-4 py-12">
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch"
        aria-live="polite"
      >
        <!-- LEFT: Animated Form Card -->
        <section
          class="relative bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl p-8 shadow-lg overflow-hidden"
        >
          <!-- subtle animated blobs -->
          <div class="absolute -left-20 -top-20 w-56 h-56 bg-[radial-gradient(ellipse_at_center,#00b8ae33,transparent)] rounded-full blur-3xl opacity-40 animate-slow-spin pointer-events-none"></div>
          <div class="absolute -right-24 -bottom-24 w-72 h-72 bg-[radial-gradient(ellipse_at_center,#7c4dff22,transparent)] rounded-full blur-3xl opacity-40 animate-slow-pulse pointer-events-none"></div>

          <div class="relative z-10">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 flex items-center justify-center text-white text-xl font-bold transform -rotate-6">
                <img  src="@/assets/img/msc-logo.png" />
              </div>
              <div>
                <h1 class="text-2xl font-extrabold text-slate-900">Welcome back</h1>
                <p class="text-sm text-slate-500">Sign in to access the admin dashboard</p>
              </div>
            </div>

            <form class="mt-8 space-y-6" @submit.prevent="handleLogin" novalidate>
              <div class="grid gap-4">
                <!-- username -->
                <label class="relative group">
                  <input
                    id="username"
                    v-model="credentials.username"
                    type="text"
                    required
                    autocomplete="username"
                    class="peer w-full rounded-xl border border-gray-200 px-4 py-3 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#00B8AE]/30 focus:border-[#00B8AE] transition"
                    placeholder="Username"
                    aria-label="Username"
                  />
                  <span class="absolute left-4 -top-3 px-1 text-xs text-[#00B8AE] bg-white rounded-sm opacity-0 peer-focus:opacity-100 peer-valid:opacity-100 transition">
                    Username
                  </span>
                  <span class="absolute left-4 top-3 text-sm text-gray-400 peer-placeholder-shown:opacity-100 peer-focus:opacity-0 transition">
                    Username
                  </span>
                </label>

                <!-- password -->
                <label class="relative group">
                  <input
                    id="password"
                    v-model="credentials.password"
                    type="password"
                    required
                    autocomplete="current-password"
                    class="peer w-full rounded-xl border border-gray-200 px-4 py-3 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#00B8AE]/30 focus:border-[#00B8AE] transition"
                    placeholder="Password"
                    aria-label="Password"
                  />
                  <span class="absolute left-4 -top-3 px-1 text-xs text-[#00B8AE] bg-white rounded-sm opacity-0 peer-focus:opacity-100 peer-valid:opacity-100 transition">
                    Password
                  </span>
                  <div class="absolute right-3 top-3 text-sm text-gray-400 select-none">
                    <button type="button" @click="toggleShowPassword" class="opacity-80 hover:opacity-100">
                      <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.98 9.98 0 012.85-4.172M6.1 6.1L18 18M9.88 9.88a3 3 0 104.24 4.24" />
                      </svg>
                    </button>
                  </div>
                </label>

              </div>

              <!-- error -->
              <div v-if="error" class="rounded-md bg-red-50 p-3 text-sm text-red-700">
                {{ error }}
              </div>

              <!-- submit -->
              <div>
                <button
                  type="submit"
                  :disabled="isLoading"
                  class="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#00B8AE] to-[#00b89f] px-4 py-3 text-white font-semibold shadow-lg hover:scale-[1.01] active:scale-[0.99] transition"
                >
                  <svg v-if="isLoading" class="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.4)" stroke-width="4"></circle>
                  </svg>
                  <span>Sign in</span>
                </button>
              </div>
            </form>

          </div>
        </section>

        <!-- RIGHT: Visual / Ecommerce Image with floating product cards -->
        <aside class="hidden lg:flex items-center justify-center">
          <div class="relative w-full max-w-lg">
            <img
              src="@/assets/img/admin.jpg"
              alt="ecommerce hero"
              class="rounded-3xl shadow-2xl object-cover w-full h-[520px]"
            />

            <!-- floating product cards -->
            <div class="absolute -left-6 -top-6 w-44 p-3 rounded-2xl bg-white/90 shadow-lg transform animate-float-1">
              <div class="text-xs text-slate-500">New</div>
              <div class="font-semibold text-slate-900">Smart Lamp</div>
              <div class="mt-2 flex items-center gap-2">
                <div class="w-9 h-9 rounded-md bg-gradient-to-tr from-[#00B8AE] to-[#7C4DFF]"></div>
                <div class="text-sm text-slate-600">$49</div>
              </div>
            </div>

            <div class="absolute -right-6 bottom-8 w-40 p-3 rounded-2xl bg-white/95 shadow-lg transform animate-float-2">
              <div class="text-xs text-slate-500">Bestseller</div>
              <div class="font-semibold text-slate-900">Wireless Buds</div>
              <div class="mt-2 text-sm text-slate-600">$99</div>
            </div>

            <div class="absolute right-8 top-8 w-28 h-28 rounded-xl bg-white/90 grid place-items-center shadow transform animate-rotate-slow">
              <svg class="w-10 h-10 text-[#00B8AE]" viewBox="0 0 24 24" fill="none">
                <path d="M12 2v4M12 18v4M4 12h4M16 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </aside>
      </div>

      <!-- bottom subtle footer -->
      <div class="mt-8 text-center text-xs text-gray-400">
        © <span class="font-medium">MSC</span> — powered by Unicure
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({ layout: false })

const { login, isLoading } = useAuth()

const credentials = ref({ username: '', password: '' })
const error = ref('')
const remember = ref(false)
const showPassword = ref(false)

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
  const pwd = document.getElementById('password') as HTMLInputElement | null
  if (pwd) pwd.type = showPassword.value ? 'text' : 'password'
}

const handleLogin = async () => {
  error.value = ''
  if (!credentials.value.username || !credentials.value.password) {
    error.value = 'Please enter both username and password'
    return
  }

  try {
    const res = await login(credentials.value)
    if (!res.success) {
      error.value = res.error || 'Login failed — check credentials'
    }
    // successful login will redirect via useAuth implementation
  } catch (err: any) {
    error.value = err?.message || 'Login failed'
  }
}
</script>

<style scoped>
/* small helpers */
.focus\:ring-primary:focus { box-shadow: 0 0 0 4px rgba(0,184,174,0.12); border-color: #00B8AE; }

/* animations */
@keyframes float1 {
  0% { transform: translateY(0px) translateX(0px) }
  50% { transform: translateY(-8px) translateX(4px) }
  100% { transform: translateY(0px) translateX(0px) }
}
@keyframes float2 {
  0% { transform: translateY(0px) translateX(0px) rotate(-2deg) }
  50% { transform: translateY(-6px) translateX(-6px) rotate(2deg) }
  100% { transform: translateY(0px) translateX(0px) rotate(-2deg) }
}
@keyframes slowSpin {
  from { transform: rotate(0deg) }
  to { transform: rotate(360deg) }
}

.animate-float-1 { animation: float1 4.5s ease-in-out infinite; }
.animate-float-2 { animation: float2 5s ease-in-out infinite; }
.animate-rotate-slow { animation: slowSpin 18s linear infinite; }
.animate-slow-spin { animation: slowSpin 28s linear infinite; }
.animate-slow-pulse { animation: float2 8s ease-in-out infinite; }

/* small responsive tweaks */
@media (max-width: 1024px) {
  .animate-float-1, .animate-float-2, .animate-rotate-slow { display: none; }
}

/* glass card contrast */
[aria-live] section { background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.9)); }

/* accessibility */
button:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
