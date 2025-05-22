<template>
  <header class="w-full bg-white h-16 shadow flex items-center justify-between px-4">
    <!-- Left: Burger Icon -->
    <button @click="$emit('toggleNavbar')" class="text-gray-700 hover:text-blue-600 focus:outline-none mdshow">
      <font-awesome-icon icon="bars" size="lg" />
       <i class="fa fa-bars mr-2"></i>
    </button>
    <div class="text-xl text-blue-600">
        <font-awesome-icon icon="fa-solid fa-bars" />
    </div>
    <!-- Center: Logo  -->
    <div class="flex-1 flex justify-center">
      <div class="w-10 h-10">
        <img src="@/assets/logo.png" alt="Vue" class="h-full object-contain" />
      </div>
    </div>

    <!-- Right: User Info -->
    <div class="text-right text-sm">
      <div class="font-semibold">Guest</div>
      <div class="text-xs text-gray-500">Buyer</div>
    </div>
  </header>
</template>

<script setup>

</script>
