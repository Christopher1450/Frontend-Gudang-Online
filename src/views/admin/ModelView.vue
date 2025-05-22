<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-800 flex items-center gap-2">
        🧥 Model
      </h1>
    </div>

    <!-- Filter -->
    <div class="flex flex-wrap items-center gap-2 mb-4">
      <input
        type="text"
        placeholder="Nama"
        class="border px-3 py-2 rounded w-40"
        v-model="filters.nama"
      />
      <select v-model="filters.kategori" class="border px-3 py-2 rounded w-40">
        <option value="">Kategori</option>
        <option v-for="kategori in kategoriList" :key="kategori">{{ kategori }}</option>
      </select>
      <select v-model="filters.sort" class="border px-3 py-2 rounded w-40">
        <option value="asc">Nama A - Z</option>
        <option value="desc">Nama Z - A</option>
      </select>
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        @click="searchModels"
      >
        🔍
      </button>
      <button
        class="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded ml-auto"
      >
        Buat Model Baru
      </button>
    </div>

    <!-- Table -->
    <div class="bg-white shadow rounded-md overflow-x-auto">
      <table class="min-w-full table-auto text-sm">
        <thead class="bg-blue-900 text-white">
          <tr>
            <th class="px-4 py-2 text-left">Foto</th>
            <th class="px-4 py-2 text-left">Nama</th>
            <th class="px-4 py-2 text-left">Kategori</th>
            <th class="px-4 py-2 text-left">Range Harga</th>
            <th class="px-4 py-2 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(model, index) in filteredModels"
            :key="index"
            class="border-b hover:bg-gray-50"
          >
            <td class="px-4 py-2">
              <img
                :src="model.foto"
                alt="Foto"
                class="w-12 h-16 object-cover rounded shadow"
              />
            </td>
            <td class="px-4 py-2">{{ model.nama }}</td>
            <td class="px-4 py-2">{{ model.kategori }}</td>
            <td class="px-4 py-2">
              Rp. {{ model.hargaMin.toLocaleString('id-ID') }} -
              Rp. {{ model.hargaMax.toLocaleString('id-ID') }}
            </td>
            <td class="px-4 py-2 flex gap-2">
              <button class="bg-green-500 text-white p-2 rounded" title="Lihat">
                🔍
              </button>
              <button class="bg-blue-500 text-white p-2 rounded" title="Edit">
                ✏️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
      <div class="flex items-center justify-between p-4 text-sm">
        <div>
          Tampilkan
          <select class="border rounded px-2 py-1 ml-1">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          Menampilkan {{ models.length }} dari {{ models.length }} entri
        </div>
        <div class="flex gap-1">
          <button class="border px-2 py-1 rounded bg-white">«</button>
          <button class="border px-2 py-1 rounded bg-blue-500 text-white">1</button>
          <button class="border px-2 py-1 rounded bg-white">2</button>
          <button class="border px-2 py-1 rounded bg-white">»</button>
        </div>
      </div>
    <footer class="text-xs text-center text-gray-400 mt-6">
      © 2025 Mega Mulia
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const filters = ref({})

const kategoriList = []

const models = ref([])

const filteredModels = computed(() => {
  let result = models.value

  if (filters.value.nama) {
    result = result.filter(m =>
      m.nama.toLowerCase().includes(filters.value.nama.toLowerCase())
    )
  }

  if (filters.value.kategori) {
    result = result.filter(m => m.kategori === filters.value.kategori)
  }

  if (filters.value.sort === 'asc') {
    result = result.sort((a, b) => a.nama.localeCompare(b.nama))
  } else {
    result = result.sort((a, b) => b.nama.localeCompare(a.nama))
  }

  return result
})

function searchModels() {
  // Function ini sudah otomatis dipanggil karena pakai computed
}
</script>

