<template>
  <header class="bg-gray-100">
    <nav class="bg-white shadow-lg">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <router-link to="/" class="text-2xl font-semibold text-blue-600">
            App ToDo
          </router-link>

          <!-- Menu Desktop -->
          <div class="hidden md:flex items-center gap-8">
            <router-link
              to="/"
              class="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-300"
              active-class="text-blue-600 font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="w-6 h-6 mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              Home
            </router-link>
            <router-link
              to="/tasksFavorites"
              class="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-300"
              active-class="text-blue-600 font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="w-6 h-6 mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 11l4 4L19 7"
                />
              </svg>
              Favoritos
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
</script>
