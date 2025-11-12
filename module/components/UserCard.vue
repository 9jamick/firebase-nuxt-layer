<script setup lang="ts">
interface Props {
   title: string
   description: string
}

defineProps<Props>()
</script>

<template>
  <div>
    <UCard class="bg-white border border-blue-200 shadow-sm">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
          <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">ACTIVE</span>
        </div>
      </template>
      <div class="space-y-2">
        <p class="text-gray-700">{{ description }}</p>
        <div class="text-sm text-blue-600 bg-blue-50 p-2 rounded">
          <strong>Source:</strong> module/components/UserCard.vue<br>
          <strong>Pattern:</strong> Override (replaces frontend/components/UserCard.vue)
        </div>
      </div>
    </UCard>
  </div>
</template>
