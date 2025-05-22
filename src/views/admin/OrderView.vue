<template>
  <div class="flex min-h-screen">
    <!-- Main Content -->
    <main class="flex-1 p-6 bg-gray-100">
      <div class="flex justify-between items-center border-b pb-6 mb-4">
        <h1 class="text-2xl font-semibold text-gray-800">🛍️ Order</h1>
      </div>

      <div class="bg-white shadow rounded-md overflow-auto">
        <!-- Filter Bar -->
        <div class="flex flex-wrap items-center gap-4 p-4 border-b">
          <input v-model="search" type="text" placeholder="Nomor Order" class="border px-3 py-2 rounded w-40" />
          <select v-model="filterStatus" class="border px-3 py-2 rounded">
            <option value="">Semua</option>
            <option value="Packing">📦Packing</option>
            <option value="Pengiriman">🚛Dalam Pengiriman</option>
            <option value="Sampai">🏠Telah Sampai Tujuan</option>
          </select>
          <select v-model="filterBuyer" class="border px-3 py-2 rounded">
            <option value="">Pembeli</option>
            <option value="Reseller">Reseller</option>
            <option value=""></option>
          </select>
        </div>

        <!-- Table -->
        <table class="table-auto w-full text-sm">
          <thead class="bg-blue-900 text-white">
            <tr>
              <th class="px-4 py-2 text-left">Nomor Order</th>
              <th class="px-4 py-2 text-left">Pembeli</th>
              <th class="px-4 py-2 text-left">Status</th>
              <th class="px-4 py-2 text-left">Jumlah Item</th>
              <th class="px-4 py-2 text-left">Total Harga</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="orders.length === 0">
              <td colspan="5" class="text-center py-6 text-gray-500">Tidak ada data.</td>
            </tr>
            <tr v-for="order in filteredOrders" :key="order.id" class="border-b">
              <td class="px-4 py-2">{{ order.nomor_order }}</td>
              <td class="px-4 py-2">
                {{ order.pembeli }}<br />
                <span class="text-xs text-gray-500">{{ order.tanggal }}</span>
              </td>
              <td class="px-4 py-2">
                <span class="text-xs px-2 py-1 rounded text-white"
                      :class="{
                        'bg-blue-500': order.status === 'Packing',
                        'bg-gray-800': order.status === 'Dalam Pengiriman',
                        'bg-green-600': order.status === 'Telah Sampai Tujuan'
                      }">
                  {{ order.status }}
                </span>
              </td>
              <td class="px-4 py-2">{{ order.jumlah_item }}</td>
              <td class="px-4 py-2">Rp {{ order.total_harga.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
// import axios from 'axios' // aktifkan saat sudah ada endpoint backend

const orders = ref([])
const search = ref('')
const filterStatus = ref('')
const filterBuyer = ref('')

// Dummy untuk testing (hapus saat API sudah siap)
onMounted(() => {
  orders.value = [] // <- data kosong dari backend nanti
})

// Filtered orders
const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    return (
      (!search.value || order.nomor_order.includes(search.value)) &&
      (!filterStatus.value || order.status === filterStatus.value) &&
      (!filterBuyer.value || order.pembeli === filterBuyer.value)
    )
  })
})
</script>

<style scoped>
th, td {
  border-right: 1px solid #e5e7eb;
}
th:last-child, td:last-child {
  border-right: none;
}
</style>
