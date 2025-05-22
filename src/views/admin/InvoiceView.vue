<template>
  <div class="flex min-h-screen">
    <main class="flex-1 p-6 bg-gray-100">
      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-semibold text-gray-800">🧾 Invoice</h1>
      </div>

      <!-- Filter -->
      <div class="bg-white rounded-lg shadow p-4 mb-4 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between">
        <div class="flex flex-wrap gap-2 items-center">
          <input type="text" v-model="filters.invoice" placeholder="No. Invoice" class="border px-3 py-2 rounded w-44" />
          <select v-model="filters.status" class="border px-3 py-2 rounded w-32">
            <option value="">Semua</option>
            <option value="LUNAS">Lunas</option>
            <option value="Belum">Belum Lunas</option>
          </select>
          <select v-model="filters.buyer" class="border px-3 py-2 rounded w-32">
            <option value="">Pembeli</option>
            <option v-for="b in buyers" :key="b" :value="b">{{ b }}</option>
          </select>
          <button @click="fetchInvoices" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Cari
          </button>
        </div>
        <div class="flex gap-2">
          <button class="bg-black text-white px-4 py-2 rounded text-sm">Daftar Piutang</button>
          <button class="bg-green-500 text-white px-4 py-2 rounded text-sm">Export Excel Bulanan</button>
        </div>
      </div>

      <!-- Tabel -->
      <div class="bg-white rounded shadow overflow-auto">
        <table class="min-w-full text-sm text-left">
          <thead class="bg-blue-900 text-white">
            <tr>
              <th class="px-4 py-3">No. Invoice</th>
              <th class="px-4 py-3">Pembeli</th>
              <th class="px-4 py-3">Status</th>
              <th class="px-4 py-3">Jumlah Item</th>
              <th class="px-4 py-3">Total Pembayaran</th>
              <th class="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filtered.length === 0">
              <td colspan="6" class="text-center py-4 text-gray-500">Tidak ada data.</td>
            </tr>
            <tr v-for="invoice in filtered" :key="invoice.id" class="border-b hover:bg-gray-50">
              <td class="px-4 py-3">
                {{ invoice.no_invoice }}<br />
                <span class="text-xs text-gray-500">{{ invoice.tanggal }}</span>
              </td>
              <td class="px-4 py-3">{{ invoice.pembeli }}</td>
              <td class="px-4 py-3">
                <span :class="statusClass(invoice.status)" class="px-2 py-1 rounded text-xs font-medium">
                  {{ invoice.status }}
                </span>
              </td>
              <td class="px-4 py-3">{{ invoice.jumlah }}</td>
              <td class="px-4 py-3">Rp. {{ formatRupiah(invoice.total) }}</td>
              <td class="px-4 py-3 text-center">
                <button class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                  <i class="fas fa-search"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const invoices = ref([]) // <- nanti diisi dari API
const buyers = ref([]) // <- ini juga nanti dari API e commers kalau free tarik api nya

const filters = ref({
  invoice: '',
  status: '',
  buyer: ''
})

const fetchInvoices = async () => {
  try {
    const res = await fetch('http://localhost:8000/api/invoices')
    invoices.value = await res.json()

    invoices.value = [] // iget isi dulu
    buyers.value = [] // iget isi juga

    //Cek simulasikan respons dulu
  } catch (error) {
    console.error('Gagal mengambil data invoice:', error)
  }
}

const filtered = computed(() => {
  return invoices.value.filter((item) => {
    return (
      (filters.value.invoice === '' || item.no_invoice.includes(filters.value.invoice)) &&
      (filters.value.status === '' || item.status === filters.value.status) &&
      (filters.value.buyer === '' || item.pembeli === filters.value.buyer)
    )
  })
})

const formatRupiah = (val) =>
  new Intl.NumberFormat('id-ID').format(val)

const statusClass = (status) =>
  status === 'Lunas'
    ? 'bg-green-100 text-green-700'
    : 'bg-red-100 text-red-700'
</script>

<style scoped>
th, td {
  border-right: 1px solid #e5e7eb;
}
th:last-child, td:last-child {
  border-right: none;
}
</style>
