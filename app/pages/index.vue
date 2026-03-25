<script setup lang="ts">
const { data: admins, pending, error } = useFetch('/api/admin')
</script>

<template>
  <div class="p-8 max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-base-content tracking-tight">Admin Management</h1>
        <p class="text-base-content/60 mt-1 text-sm">Manage system administrators and their access levels.</p>
      </div>
      <div v-if="!pending && admins" class="badge badge-primary badge-lg gap-2">
        {{ admins.length }} Admins
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="alert alert-error shadow-lg mb-8">
      <Icon name="lucide:circle-alert" class="text-2xl" />
      <div>
        <h3 class="font-bold">Error fetching data</h3>
        <div class="text-xs opacity-90">{{ error.message }}</div>
      </div>
    </div>

    <!-- Skeleton Loading State -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="card bg-base-100 shadow-sm border border-base-200">
        <div class="card-body gap-4">
          <div class="flex items-center gap-4">
            <div class="skeleton h-12 w-12 shrink-0 rounded-full"></div>
            <div class="flex flex-col gap-2 w-full">
              <div class="skeleton h-4 w-3/4"></div>
              <div class="skeleton h-3 w-1/2"></div>
            </div>
          </div>
          <div class="skeleton h-4 w-full"></div>
          <div class="flex justify-between mt-2">
            <div class="skeleton h-6 w-16"></div>
            <div class="skeleton h-6 w-20"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!admins || admins.length === 0" class="card bg-base-100 shadow-xl border-2 border-dashed border-base-300">
      <div class="card-body items-center text-center py-24">
        <div class="bg-base-200 p-6 rounded-full mb-4">
          <Icon name="lucide:users" class="text-6xl text-base-content/20" />
        </div>
        <h2 class="card-title text-2xl">No admins found</h2>
        <p class="text-base-content/60 max-w-sm">The admin list is currently empty. Start by adding a new administrator to the system.</p>
        <div class="card-actions mt-6">
          <button class="btn btn-primary">Add First Admin</button>
        </div>
      </div>
    </div>

    <!-- Data Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="admin in (admins as any[])" :key="admin.id" 
           class="card bg-base-100 shadow-sm hover:shadow-md transition-all duration-300 border border-base-200 group">
        <div class="card-body p-6">
          <div class="flex justify-between items-start mb-4">
            <div class="avatar placeholder">
              <div class="bg-primary text-primary-content rounded-full w-12 ring ring-offset-base-100 ring-offset-2 ring-primary/10">
                <span class="text-xl font-bold">{{ admin.first_name[0] }}{{ admin.last_name[0] }}</span>
              </div>
            </div>
            <div class="flex flex-col items-end gap-1">
              <span class="badge badge-sm font-medium" 
                    :class="admin.role === 'super_admin' ? 'badge-secondary' : 'badge-ghost border-base-300'">
                {{ admin.role }}
              </span>
              <div class="badge badge-xs" 
                   :class="admin.status === 'active' ? 'badge-success' : 'badge-error'">
                {{ admin.status }}
              </div>
            </div>
          </div>

          <h2 class="card-title text-lg group-hover:text-primary transition-colors">
            {{ admin.first_name }} {{ admin.last_name }}
          </h2>
          
          <div class="flex items-center gap-2 text-sm text-base-content/70 mt-1">
            <Icon name="lucide:mail" class="text-base-content/40" />
            <span class="truncate">{{ admin.email }}</span>
          </div>

          <div class="divider my-2 opacity-50"></div>

          <div class="flex flex-col gap-2">
            <div class="flex justify-between text-xs items-center">
              <span class="text-base-content/50 flex items-center gap-1">
                <Icon name="lucide:calendar" />
                Joined
              </span>
              <span class="font-medium italic">{{ admin.created_at ? new Date(admin.created_at).toLocaleDateString() : 'N/A' }}</span>
            </div>
            <div class="flex justify-between text-xs items-center">
              <span class="text-base-content/50 flex items-center gap-1">
                <Icon name="lucide:log-in" />
                Last Seen
              </span>
              <span class="font-medium italic">{{ admin.last_login ? new Date(admin.last_login).toLocaleDateString() : 'Never' }}</span>
            </div>
          </div>

          <div class="card-actions justify-end mt-4 pt-2 border-t border-base-100">
            <button class="btn btn-ghost btn-xs text-base-content/40 hover:text-primary">
              <Icon name="lucide:settings-2" class="text-lg" />
              Manage
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
