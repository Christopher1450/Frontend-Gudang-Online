<template>
  <div class="flex min-h-screen">
    <main class="flex-1 p-6 bg-gray-100">
      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-semibold text-gray-800">📁 Category</h1>
      </div>

      <!-- Filter + Button sejajar horizontal -->
      <div class="flex justify-between items-center gap-4 mb-4">
        <input
          v-model="filter"
          type="text"
          placeholder="Cari nama kategori"
          class="border px-4 py-2 rounded w-full max-w-md"
        />
        <button
          @click="openModal('create')"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 whitespace-nowrap">
          Buat Kategori Baru
        </button>
      </div>

      <!-- Table View -->
      <div class="bg-white shadow rounded-md overflow-x-auto">
        <table class="table-auto w-full text-sm">
          <thead class="bg-blue-900 text-white">
            <tr>
              <th class="px-4 py-2 text-left">Nama Kategori</th>
              <th class="px-4 py-2 text-left w-32">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredCategories.length === 0">
              <td colspan="2" class="text-center py-4 text-gray-500">Tidak ada kategori ditemukan.</td>
            </tr>
            <tr
              v-for="(kategori, index) in filteredCategories"
              :key="kategori.id"
              class="border-b">
              <td class="px-4 py-2">{{ kategori.nama }}</td>
              <td class="px-4 py-2 flex gap-2">
                <button
                  @click="openModal('edit', kategori)"
                  class="bg-blue-500 text-white p-2 rounded">
                  <i class="fas fa-pen"></i>
                </button>
                <button
                  @click="deleteCategory(kategori.id)"
                  class="bg-red-500 text-white p-2 rounded">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer class="text-xs text-center text-gray-400 mt-6">© 2025 Mega Mulia</footer>

      <!-- Modal Form -->
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-96">
          <h2 class="text-lg font-semibold mb-4">
            {{ modalType === 'create' ? 'Tambah' : 'Edit' }} Kategori
          </h2>
          <form @submit.prevent="submitForm">
            <input
              v-model="form.nama"
              type="text"
              placeholder="Nama Kategori"
              class="w-full border px-3 py-2 rounded mb-4"
              required
            />
            <div class="flex justify-end gap-2">
              <button
                type="button"
                @click="showModal = false"
                class="text-gray-500 px-4 py-2">
                Batal
              </button>
              <button
                type="submit"
                class="bg-blue-600 text-white px-4 py-2 rounded">
                {{ modalType === 'create' ? 'Simpan' : 'Update' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const categories = ref([])
const filter = ref('')
const showModal = ref(false)
const modalType = ref('create')
const form = ref({ id: null, nama: '' })

const filteredCategories = computed(() => {
  return categories.value.filter(c =>
    c.nama.toLowerCase().includes(filter.value.toLowerCase())
  )
})

const fetchCategories = async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/categories')
    categories.value = res.data.data || res.data
  } catch (err) {
    console.error('Gagal ambil data kategori:', err)
  }
}

const openModal = (type, kategori = null) => {
  modalType.value = type
  if (type === 'edit' && kategori) {
    form.value = { id: kategori.id, nama: kategori.nama }
  } else {
    form.value = { id: null, nama: '' }
  }
  showModal.value = true
}

const submitForm = async () => {
  try {
    if (modalType.value === 'create') {
      await axios.post('http://localhost:8000/api/categories', {
        nama: form.value.nama,
      })
    } else {
      await axios.put(`http://localhost:8000/api/categories/${form.value.id}`, {
        nama: form.value.nama,
      })
    }
    showModal.value = false
    await fetchCategories()
  } catch (err) {
    console.error('Gagal simpan data:', err)
  }
}

const deleteCategory = async (id) => {
  if (confirm('Yakin ingin menghapus kategori ini?')) {
    try {
      await axios.delete(`http://localhost:8000/api/categories/${id}`)
      await fetchCategories()
    } catch (err) {
      console.error('Gagal hapus:', err)
    }
  }
}

onMounted(() => {
  fetchCategories()
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
