<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="flex justify-between items-center mb-4 border-b pb-4">
      <h1 class="text-2xl font-bold text-gray-800">📋 Log Stock</h1>
      <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Download Excel History Stock
      </button>
    </div>

    <div class="flex flex-wrap items-center gap-4 mb-4">
      <input type="text" placeholder="SKU" class="border px-3 py-2 rounded w-40" />
      <select class="border px-3 py-2 rounded w-40">
        <option>Semua</option>
      </select>
      <input type="date" class="border px-3 py-2 rounded w-40" />
      <input type="date" class="border px-3 py-2 rounded w-40" />
      <select class="border px-3 py-2 rounded w-40">
        <option>Dari Terbaru</option>
      </select>
      <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Cari
      </button>
    </div>

    <div class="overflow-x-auto bg-white rounded-md shadow">
      <table class="min-w-full table-auto border-collapse">
        <thead class="bg-blue-900 text-white text-left">
          <tr>
            <th class="px-4 py-2">Tanggal / Eksekutor</th>
            <th class="px-4 py-2">Produk</th>
            <th class="px-4 py-2">Ukuran</th>
            <th class="px-4 py-2">Warna</th>
            <th class="px-4 py-2">Tipe</th>
            <th class="px-4 py-2">Jumlah</th>
            <th class="px-4 py-2">Stok Setelah</th>
            <th class="px-4 py-2">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in logs" :key="index" class="border-b hover:bg-gray-50">
            <td class="px-4 py-2 text-sm text-gray-700">{{ item.tanggal }}<br />{{ item.eksekutor }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ item.produk }}<br /><span class="text-gray-500 text-xs">{{ item.detail }}</span></td>
            <td class="px-4 py-2 text-sm">{{ item.ukuran }}</td>
            <td class="px-4 py-2 text-sm">{{ item.warna }}</td>
            <td class="px-4 py-2">
              <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{{ item.tipe }}</span>
            </td>
            <td class="px-4 py-2 text-sm">{{ item.jumlah }}</td>
            <td class="px-4 py-2 text-sm">{{ item.stok }}</td>
            <td class="px-4 py-2 text-sm">{{ item.keterangan }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import axios from 'axios'

const logs = ref([])

const getLogs = async () => {
  try {
    const response = await axios.get('/api/logs') // ganti sesuai endpoint Laravel kamu
    logs.value = response.data
  } catch (error) {
    console.error('Gagal mengambil data log stok:', error)
  }
}

onMounted(() => {
  getLogs()
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
