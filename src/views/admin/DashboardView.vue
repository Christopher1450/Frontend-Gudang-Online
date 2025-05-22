<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="flex justify-between items-center mb-6 border-b pb-4">
      <h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <span class="text-lg">📦</span> Dashboard Inventori
      </h1>
    </div>

    <div class="flex flex-wrap gap-4 mb-6">
      <input v-model="filters.sku" type="text" placeholder="SKU" class="border px-3 py-2 rounded w-40" />
      <input v-model="filters.model" type="text" placeholder="Model" class="border px-3 py-2 rounded w-40" />
      <input v-model="filters.ukuran" type="text" placeholder="Ukuran" class="border px-3 py-2 rounded w-40" />
      <button @click="getData" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">🔍 Cari</button>
    </div>

    <div class="overflow-x-auto bg-white rounded-lg shadow">
      <table class="min-w-full text-sm table-auto">
        <thead class="bg-blue-900 text-white">
          <tr>
            <th class="px-4 py-3 text-left">Foto</th>
            <th class="px-4 py-3 text-left">SKU</th>
            <th class="px-4 py-3 text-left">Model</th>
            <th class="px-4 py-3 text-left">Ukuran</th>
            <th class="px-4 py-3 text-left">Warna</th>
            <th class="px-4 py-3 text-left">Harga</th>
            <th class="px-4 py-3 text-left">Stok</th>
            <th class="px-4 py-3 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in inventory" :key="index" class="border-b hover:bg-gray-50">
            <td class="px-4 py-2">
              <img :src="item.foto" alt="Foto" class="w-14 h-auto rounded-md shadow" />
            </td>
            <td class="px-4 py-2 text-sm">{{ item.sku }}</td>
            <td class="px-4 py-2 text-sm">
              <div class="font-semibold">{{ item.model }}</div>
              <div class="text-gray-500 text-xs">{{ item.keterangan }}</div>
            </td>
            <td class="px-4 py-2 text-sm">{{ item.ukuran }}</td>
            <td class="px-4 py-2 text-sm">{{ item.warna }}</td>
            <td class="px-4 py-2 text-sm">Rp. {{ formatRupiah(item.harga) }}</td>
            <td class="px-4 py-2 text-sm">{{ item.stok }}</td>
            <td class="px-4 py-2 text-sm flex gap-2">
              <button class="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded" title="Detail">📄</button>
              <button class="bg-green-500 hover:bg-green-600 text-white p-2 rounded" title="Tambah">➕</button>
              <button class="bg-red-500 hover:bg-red-600 text-white p-2 rounded" title="Kurang">➖</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import axios from 'axios'

const inventory = ref([])
const filters = ref({
  sku: '',
  model: '',
  ukuran: ''
})

const formatRupiah = (angka) => {
  return angka.toLocaleString('id-ID')
}

const getData = async () => {
  try {
    const { data } = await axios.get('/api/inventory', {
      params: filters.value
    })
    inventory.value = data
  } catch (error) {
    console.error('Gagal mengambil data:', error)
  }
}

onMounted(getData)
</script>

<style scoped>
th, td {
  border-right: 1px solid #e5e7eb;
}
th:last-child, td:last-child {
  border-right: none;
}
</style>
