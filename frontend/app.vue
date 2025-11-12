<template>
  <div class="min-h-screen bg-gray-100">
    <aside class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-white border-r border-gray-300 shadow-sm">
      <div class="h-full px-3 py-4 overflow-y-auto">
        <div class="mb-6 px-3 py-2">
          <h1 class="text-2xl font-bold text-primary-600">Firebase Admin</h1>
          <p class="text-sm text-gray-500 mt-1">Nuxt 3 Dashboard</p>
        </div>

        <ul class="space-y-2 font-medium">
          <li>
            <NuxtLink
              to="/"
              class="flex items-center p-3 text-gray-900 rounded-lg hover:bg-gray-100 group"
              active-class="bg-primary-50 text-primary-600"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              <span class="ml-3">Dashboard</span>
            </NuxtLink>
          </li>
          
          <li>
            <NuxtLink
              to="/users"
              class="flex items-center p-3 text-gray-900 rounded-lg hover:bg-gray-100 group"
              active-class="bg-primary-50 text-primary-600"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
              <span class="ml-3">Users</span>
            </NuxtLink>
          </li>

          <li>
            <NuxtLink
              to="/companies"
              class="flex items-center p-3 text-gray-900 rounded-lg hover:bg-gray-100 group"
              active-class="bg-primary-50 text-primary-600"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd"/>
              </svg>
              <span class="ml-3">Companies</span>
            </NuxtLink>
          </li>
        </ul>

        <div class="absolute bottom-4 left-0 right-0 px-3">
          <div 
            :class="[
              'p-3 rounded-lg border transition-colors',
              firebaseConnected 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            ]"
          >
            <p 
              :class="[
                'text-xs font-semibold mb-1',
                firebaseConnected ? 'text-green-800' : 'text-red-800'
              ]"
            >
              Firebase Status
            </p>
            <div class="flex items-center">
              <span class="flex h-2 w-2 relative">
                <span 
                  v-if="firebaseConnected"
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                ></span>
                <span 
                  :class="[
                    'relative inline-flex rounded-full h-2 w-2',
                    firebaseConnected ? 'bg-green-500' : 'bg-red-500'
                  ]"
                ></span>
              </span>
              <span class="ml-2 text-xs text-gray-600">
                {{ firebaseConnected ? 'Emulator Connected' : 'Emulator Disconnected' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <div class="ml-64">
      <header class="bg-white border-b border-gray-300 sticky top-0 z-30 shadow-sm">
        <div class="px-6 py-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-semibold text-gray-800">{{ pageTitle }}</h2>
              <p class="text-sm text-gray-500 mt-1">Manage your data with Firebase RTDB</p>
            </div>
            <div class="flex items-center gap-3">
              <UBadge color="green" variant="subtle">Nuxt 3</UBadge>
              <UBadge color="blue" variant="subtle">Firebase</UBadge>
            </div>
          </div>
        </div>
      </header>

      <main class="p-6 min-h-screen">
        <NuxtPage />
      </main>
    </div>

    <UNotifications />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const pageTitle = computed(() => {
  switch (route.path) {
    case '/':
      return 'Dashboard'
    case '/users':
      return 'Users Management'
    case '/companies':
      return 'Companies Management'
    default:
      return 'Admin Panel'
  }
})

const firebaseConnected = ref(false)
let connectionCheckInterval: NodeJS.Timeout | null = null

const checkConnection = async () => {
  try {
    firebaseConnected.value = await checkFirebaseConnection()
  } catch (error) {
    firebaseConnected.value = false
  }
}

onMounted(() => {
  checkConnection()
  connectionCheckInterval = setInterval(checkConnection, 5000)
})

onUnmounted(() => {
  if (connectionCheckInterval) {
    clearInterval(connectionCheckInterval)
  }
})
</script>
