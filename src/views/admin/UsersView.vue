<template>
  <div class="min-h-screen bg-gray-100 p-6">
        <div class="flex justify-between items-center mb-6 border-b pb-4">
      <h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <span class="text-lg">👤 Users</span>
      </h1>
        </div>
    <!-- Filter -->
    <div class="flex flex-wrap items-center gap-4 mb-4">
      <input
        type="text"
        placeholder="SKU"
        class="border px-3 py-2 rounded w-40"
      />
      <select class="border px-3 py-2 rounded w-40">
        <option>Semua</option>
      </select>
      <input type="date" class="border px-3 py-2 rounded w-40" />
      <input type="date" class="border px-3 py-2 rounded w-40" />
      <select class="border px-3 py-2 rounded w-40">
        <option>Dari Terbaru</option>
        <option>Dari Terlama</option>
      </select>
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Cari
      </button>
    </div>

    <!-- Table -->
    <div class="bg-white shadow rounded-md overflow-x-auto">
      <table class="min-w-full table-auto text-sm border-collapse">
        <thead class="bg-blue-900 text-white">
          <tr>
            <th class="px-4 py-2 text-left">Tanggal / Eksekutor</th>
            <th class="px-4 py-2 text-left">Produk</th>
            <th class="px-4 py-2 text-left">Ukuran</th>
            <th class="px-4 py-2 text-left">Warna</th>
            <th class="px-4 py-2 text-left">Tipe</th>
            <th class="px-4 py-2 text-left">Jumlah</th>
            <th class="px-4 py-2 text-left">Stok Setelah</th>
            <th class="px-4 py-2 text-left">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in logs" :key="index" class="border-b">
            <td class="px-4 py-2 text-gray-700">{{ item.tanggal }}<br><span class="text-sm text-gray-500">{{ item.eksekutor }}</span></td>
            <td class="px-4 py-2">{{ item.produk }}</td>
            <td class="px-4 py-2">{{ item.ukuran }}</td>
            <td class="px-4 py-2">{{ item.warna }}</td>
            <td class="px-4 py-2">
              <span
                class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                {{ item.tipe }}
              </span>
            </td>
            <td class="px-4 py-2">{{ item.jumlah }}</td>
            <td class="px-4 py-2">{{ item.stokSetelah }}</td>
            <td class="px-4 py-2">{{ item.keterangan }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const logs = ref([])
</script>

<style scoped>
th, td {
  border-right: 1px solid #e5e7eb;
}
th:last-child, td:last-child {
  border-right: none;
}
</style>
