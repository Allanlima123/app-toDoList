<template>
  <main class="min-h-screen">
    <NavBar />
    <router-view />
  </main>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
</script>

<style scoped></style>
