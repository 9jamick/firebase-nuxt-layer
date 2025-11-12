<template>
  <div class="space-y-6">
    <div class="bg-purple-100 border-l-4 border-purple-500 p-4 mb-4">
      <p class="text-sm text-purple-700">
        🎯 <strong>Source:</strong> module/pages/index.vue (OVERRIDES frontend/pages/index.vue)
      </p>
    </div>

    <div class="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
      <div class="flex items-center gap-4">
        <div class="p-3 bg-white/20 rounded-full">
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
          </svg>
        </div>
        <div class="flex-1">
          <h1 class="text-2xl font-bold">🎯 Module Layer - Page Override</h1>
          <p class="text-purple-100 mt-1">This entire page replaces frontend/pages/index.vue</p>
        </div>
      </div>
    </div>

    <UCard class="bg-white border border-gray-200 shadow-sm">
      <template #header>
        <h2 class="text-xl font-semibold text-gray-900">Page Override Example</h2>
      </template>
      <p class="text-gray-700">
        When the module has a page with the same name (<code class="bg-gray-100 px-2 py-1 rounded">pages/index.vue</code>),
        it completely <strong>overrides</strong> the frontend's version.
      </p>
      <p class="text-gray-700 mt-3">
        Navigate to <strong>/users</strong> to see component extension instead!
      </p>
    </UCard>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <NuxtLink to="/users" class="block">
        <UCard class="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-blue-200 rounded-full">
              <svg class="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-blue-900">Users (Component Extension)</h3>
              <p class="text-sm text-blue-700">See extended component example</p>
            </div>
          </div>
        </UCard>
      </NuxtLink>

      <NuxtLink to="/companies" class="block">
        <UCard class="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-green-200 rounded-full">
              <svg class="w-6 h-6 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-green-900">Companies (Original)</h3>
              <p class="text-sm text-green-700">No override or extension</p>
            </div>
          </div>
        </UCard>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
