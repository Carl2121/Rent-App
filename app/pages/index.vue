<script setup lang="ts">
const { data: admins, pending, error } = useFetch('/api/admin')
</script>

<template>
  <div class="p-8 max-w-6xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-base-content">Admin Management</h1>
      <div class="badge badge-primary">{{ admins?.length || 0 }} Admins</div>
    </div>

    <div v-if="pending" class="flex justify-center py-20">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <div v-else-if="error" class="alert alert-error shadow-lg">
      <Icon name="lucide:circle-alert" />
      <div>
        <h3 class="font-bold">Error fetching data</h3>
        <div class="text-xs">{{ error.message }}</div>
      </div>
    </div>

    <div v-else-if="!admins || admins.length === 0" class="card bg-base-100 shadow-xl">
      <div class="card-body items-center text-center py-20">
        <Icon name="lucide:users" class="text-6xl text-base-300 mb-4" />
        <h2 class="card-title">No admins found</h2>
        <p>The admin table is currently empty.</p>
      </div>
    </div>

    <div v-else class="card bg-base-100 shadow-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr class="bg-base-200">
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created</th>
              <th>Last Login</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="admin in (admins as any[])" :key="admin.id" class="hover">
              <th class="text-base-content/60">{{ admin.id }}</th>
              <td>
                <div class="font-bold">{{ admin.first_name }} {{ admin.last_name }}</div>
              </td>
              <td class="text-sm">{{ admin.email }}</td>
              <td>
                <span 
                  class="badge badge-sm font-semibold"
                  :class="admin.role === 'super_admin' ? 'badge-secondary' : 'badge-ghost'"
                >
                  {{ admin.role }}
                </span>
              </td>
              <td>
                <div 
                  class="badge badge-sm"
                  :class="admin.status === 'active' ? 'badge-success' : 'badge-error'"
                >
                  {{ admin.status }}
                </div>
              </td>
              <td class="text-xs opacity-70">
                {{ admin.created_at ? new Date(admin.created_at).toLocaleDateString() : 'N/A' }}
              </td>
              <td class="text-xs opacity-70">
                {{ admin.last_login ? new Date(admin.last_login).toLocaleString() : 'Never' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
