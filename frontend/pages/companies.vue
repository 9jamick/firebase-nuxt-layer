<template>
  <div class="space-y-6">
    <div class="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
      <p class="text-sm text-green-700">
        ✅ <strong>Source:</strong> frontend/pages/companies.vue (Active page)
      </p>
    </div>

    <UCard class="bg-white border border-gray-200 shadow-sm">
      <template #header>
        <h2 class="text-xl font-semibold text-gray-900">Add New Company</h2>
      </template>
      <div class="flex gap-4">
        <UInput v-model="newCompany.name" placeholder="Company Name" class="flex-1" />
        <UInput v-model="newCompany.industry" placeholder="Industry" class="flex-1" />
        <UButton @click="handleAddCompany" color="primary">Add Company</UButton>
      </div>
    </UCard>

    <UCard class="bg-white border border-gray-200 shadow-sm">
      <template #header>
        <h2 class="text-xl font-semibold text-gray-900">Companies List</h2>
      </template>
      <div v-if="loading" class="text-center p-4">Loading...</div>
      <div v-else-if="Object.keys(companies).length === 0" class="text-center p-4 text-gray-500">
        No companies yet. Add one above!
      </div>
      <div v-else class="space-y-2">
        <div v-for="(company, id) in companies" :key="id" class="flex items-center justify-between p-4 border border-gray-200 rounded bg-white">
          <div v-if="editingId === id" class="flex gap-2 flex-1">
            <UInput v-model="editData.name" placeholder="Company Name" class="flex-1" />
            <UInput v-model="editData.industry" placeholder="Industry" class="flex-1" />
            <UButton @click="handleSaveEdit(id)" color="green" size="sm">Save</UButton>
            <UButton @click="editingId = null" color="gray" size="sm">Cancel</UButton>
          </div>
          <div v-else class="flex items-center justify-between flex-1">
            <div>
              <p class="font-semibold text-gray-900">{{ company.name }}</p>
              <p class="text-sm text-gray-600">{{ company.industry }}</p>
            </div>
            <div class="flex gap-2">
              <UButton @click="startEdit(id, company)" color="yellow" size="sm">Edit</UButton>
              <UButton @click="handleDeleteCompany(id)" color="red" size="sm">Delete</UButton>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const companies = ref<Record<string, { name: string; industry: string }>>({})
const loading = ref(true)
const newCompany = ref({ name: '', industry: '' })
const editingId = ref<string | null>(null)
const editData = ref({ name: '', industry: '' })
const toast = useToast()

const loadCompanies = async () => {
  loading.value = true
  companies.value = await getCompanies()
  loading.value = false
}

const handleAddCompany = async () => {
  if (!newCompany.value.name || !newCompany.value.industry) return
  await createCompany(newCompany.value)
  toast.add({
    title: 'Success',
    description: 'Company created successfully',
    color: 'green',
    timeout: 4000
  })
  newCompany.value = { name: '', industry: '' }
  await loadCompanies()
}

const startEdit = (id: string, company: { name: string; industry: string }) => {
  editingId.value = id
  editData.value = { ...company }
}

const handleSaveEdit = async (id: string) => {
  await updateCompany(id, editData.value)
  toast.add({
    title: 'Success',
    description: 'Company updated successfully',
    color: 'blue',
    timeout: 4000
  })
  editingId.value = null
  await loadCompanies()
}

const handleDeleteCompany = async (id: string) => {
  await deleteCompany(id)
  toast.add({
    title: 'Deleted',
    description: 'Company deleted successfully',
    color: 'red',
    timeout: 4000
  })
  await loadCompanies()
}

onMounted(loadCompanies)
</script>

