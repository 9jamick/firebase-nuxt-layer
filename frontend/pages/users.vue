<template>
  <div class="space-y-6">
    <div class="bg-blue-100 border-l-4 border-blue-500 p-4 mb-4">
      <p class="text-sm text-blue-700">
        📄 <strong>Page Extension Demo:</strong> This page combines content from TWO sources:
      </p>
      <div class="mt-2 text-xs text-blue-600 space-y-1">
        <div>• <strong>50% Frontend:</strong> frontend/pages/users.vue (CRUD operations below)</div>
        <div>• <strong>50% Module:</strong> module/components/UsersExtension.vue (Analytics & Activity above)</div>
      </div>
    </div>

    <div class="space-y-6">
      <div class="bg-purple-100 border-l-4 border-purple-500 p-4">
        <p class="text-sm text-purple-700">
          🎯 <strong>Source:</strong> Inline content representing module extension (50%)
        </p>
      </div>

      <UCard class="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-sm">
        <template #header>
          <h2 class="text-xl font-semibold text-purple-900">📊 User Analytics (Module Extension)</h2>
        </template>
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white p-4 rounded-lg border border-purple-200">
              <p class="text-sm text-purple-600 font-medium">Active Users</p>
              <p class="text-2xl font-bold text-purple-900 mt-1">{{ moduleStats.activeUsers }}</p>
            </div>
            <div class="bg-white p-4 rounded-lg border border-purple-200">
              <p class="text-sm text-purple-600 font-medium">New This Week</p>
              <p class="text-2xl font-bold text-purple-900 mt-1">{{ moduleStats.newUsers }}</p>
            </div>
            <div class="bg-white p-4 rounded-lg border border-purple-200">
              <p class="text-sm text-purple-600 font-medium">Total Contacts</p>
              <p class="text-2xl font-bold text-purple-900 mt-1">{{ moduleStats.totalContacts }}</p>
            </div>
          </div>
        </div>
      </UCard>

      <UCard class="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 shadow-sm">
        <template #header>
          <h2 class="text-xl font-semibold text-indigo-900">🔔 Recent Activity (Module Extension)</h2>
        </template>
        <div class="space-y-3">
          <div v-for="activity in moduleActivities" :key="activity.id" class="flex items-center gap-3 p-3 bg-white rounded-lg border border-indigo-200">
            <div class="p-2 bg-indigo-100 rounded-full">
              <svg class="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">{{ activity.action }}</p>
              <p class="text-xs text-gray-500">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <div class="border-t-4 border-green-500 my-8"></div>

    <div class="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
      <p class="text-sm text-green-700">
        ✅ <strong>Source:</strong> frontend/pages/users.vue (Base CRUD functionality - 50%)
      </p>
    </div>

    <UCard class="bg-white border border-gray-200 shadow-sm">
      <template #header>
        <h2 class="text-xl font-semibold text-gray-900">Add New User</h2>
      </template>
      <div class="flex gap-4">
        <UInput v-model="newUser.name" placeholder="Name" class="flex-1" />
        <UInput v-model="newUser.email" placeholder="Email" class="flex-1" />
        <UButton @click="handleAddUser" color="primary">Add User</UButton>
      </div>
    </UCard>

    <UCard class="bg-white border border-gray-200 shadow-sm">
      <template #header>
        <h2 class="text-xl font-semibold text-gray-900">Users List</h2>
      </template>
      <div v-if="loading" class="text-center p-4">Loading...</div>
      <div v-else-if="Object.keys(users).length === 0" class="text-center p-4 text-gray-500">
        No users yet. Add one above!
      </div>
        <div v-else class="space-y-2">
          <div v-for="(user, id) in users" :key="id" class="flex items-center justify-between p-4 border border-gray-200 rounded bg-white">
            <div v-if="editingId === id" class="flex gap-2 flex-1">
              <UInput v-model="editData.name" placeholder="Name" class="flex-1" />
              <UInput v-model="editData.email" placeholder="Email" class="flex-1" />
              <UButton @click="handleSaveEdit(id)" color="green" size="sm">Save</UButton>
              <UButton @click="editingId = null" color="gray" size="sm">Cancel</UButton>
            </div>
            <div v-else class="flex items-center justify-between flex-1">
              <div>
                <p class="font-semibold text-gray-900">{{ user.name }}</p>
                <p class="text-sm text-gray-600">{{ user.email }}</p>
              </div>
            <div class="flex gap-2">
              <UButton @click="viewContacts(id)" color="blue" size="sm">Contacts</UButton>
              <UButton @click="startEdit(id, user)" color="yellow" size="sm">Edit</UButton>
              <UButton @click="handleDeleteUser(id)" color="red" size="sm">Delete</UButton>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <UModal v-model="showContactsModal">
      <UCard class="bg-white">
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900">Contacts for {{ selectedUserName }}</h3>
        </template>
        <div class="space-y-4">
          <div class="flex gap-2">
            <UInput v-model="newContact.type" placeholder="Type (phone, email)" class="flex-1" />
            <UInput v-model="newContact.value" placeholder="Value" class="flex-1" />
            <UButton @click="handleAddContact" color="primary" size="sm">Add</UButton>
          </div>

          <div v-if="Object.keys(contacts).length === 0" class="text-center text-gray-500 py-4">
            No contacts yet
          </div>
          <div v-else class="space-y-2">
            <div v-for="(contact, cid) in contacts" :key="cid" class="flex items-center justify-between p-3 border border-gray-200 rounded bg-white">
              <div>
                <p class="font-semibold text-gray-900">{{ contact.type }}</p>
                <p class="text-sm text-gray-600">{{ contact.value }}</p>
              </div>
              <UButton @click="handleDeleteContact(cid)" color="red" size="sm">Delete</UButton>
            </div>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const moduleStats = ref({
  activeUsers: 24,
  newUsers: 8,
  totalContacts: 142
})

const moduleActivities = ref([
  { id: 1, action: 'John Doe updated profile', time: '2 minutes ago' },
  { id: 2, action: 'Jane Smith added contact', time: '15 minutes ago' },
  { id: 3, action: 'New user registered', time: '1 hour ago' },
  { id: 4, action: 'Mike Johnson deleted contact', time: '3 hours ago' }
])

const users = ref<Record<string, { name: string; email: string }>>({})
const contacts = ref<Record<string, { type: string; value: string }>>({})
const loading = ref(true)
const newUser = ref({ name: '', email: '' })
const newContact = ref({ type: '', value: '' })
const editingId = ref<string | null>(null)
const editData = ref({ name: '', email: '' })
const showContactsModal = ref(false)
const selectedUserId = ref<string | null>(null)
const selectedUserName = ref('')
const toast = useToast()

const loadUsers = async () => {
  loading.value = true
  users.value = await getUsers()
  loading.value = false
}

const handleAddUser = async () => {
  if (!newUser.value.name || !newUser.value.email) return
  await createUser(newUser.value)
  toast.add({
    title: 'Success',
    description: 'User created successfully',
    color: 'green',
    timeout: 4000
  })
  newUser.value = { name: '', email: '' }
  await loadUsers()
}

const startEdit = (id: string, user: { name: string; email: string }) => {
  editingId.value = id
  editData.value = { ...user }
}

const handleSaveEdit = async (id: string) => {
  await updateUser(id, editData.value)
  toast.add({
    title: 'Success',
    description: 'User updated successfully',
    color: 'blue',
    timeout: 4000
  })
  editingId.value = null
  await loadUsers()
}

const handleDeleteUser = async (id: string) => {
  await deleteUser(id)
  toast.add({
    title: 'Deleted',
    description: 'User deleted successfully',
    color: 'red',
    timeout: 4000
  })
  await loadUsers()
}

const viewContacts = async (userId: string) => {
  selectedUserId.value = userId
  selectedUserName.value = users.value[userId]?.name || 'User'
  contacts.value = await getContacts(userId)
  showContactsModal.value = true
}

const handleAddContact = async () => {
  if (!selectedUserId.value || !newContact.value.type || !newContact.value.value) return
  await createContact(selectedUserId.value, newContact.value)
  toast.add({
    title: 'Success',
    description: 'Contact created successfully',
    color: 'green',
    timeout: 4000
  })
  newContact.value = { type: '', value: '' }
  contacts.value = await getContacts(selectedUserId.value)
}

const handleDeleteContact = async (contactId: string) => {
  if (!selectedUserId.value) return
  await deleteContact(selectedUserId.value, contactId)
  toast.add({
    title: 'Deleted',
    description: 'Contact deleted successfully',
    color: 'red',
    timeout: 4000
  })
  contacts.value = await getContacts(selectedUserId.value)
}

onMounted(loadUsers)
</script>

