<template>
  <div>
    <div class="border-2 border-green-200 rounded-lg p-3 bg-green-50">
      <div class="mb-3 pb-3 border-b border-green-200">
        <div class="text-xs text-green-700 font-semibold">
          📦 <strong>Source:</strong> module/components/ExtendedUserCard.vue
        </div>
        <div class="text-xs text-green-600 mt-1">
          <strong>Pattern:</strong> Extension (wraps UserCard component)
        </div>
      </div>

      <UserCard title="asd" description="qwe" v-bind="$attrs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserCard from "./UserCard.vue";

defineOptions({
  inheritAttrs: false
})
</script>
