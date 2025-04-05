<template>
  <div
    class="flex flex-col items-center justify-center h-screen text-center bg-gray-100"
  >
    <img src="../assets/not-found.png" alt="Página não encontrada" class="w-64 mb-6" />
    <h1 class="text-4xl font-bold text-gray-800">Página não encontrada</h1>
    <p class="text-gray-600 mt-2">
      A página que você está procurando não existe ou foi movida.
    </p>
    <router-link
      to="/"
      class="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
    >
      Voltar para a Home
    </router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
