<template>
    <nav class="bg-gray-800 shadow-lg">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button -->
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              aria-expanded="false"
            >
              <!-- Icon when menu is closed -->
              <svg
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                :class="{ 'hidden': mobileMenuOpen, 'block': !mobileMenuOpen }"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <!-- Icon when menu is open -->
              <svg
                class="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                :class="{ 'block': mobileMenuOpen, 'hidden': !mobileMenuOpen }"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <!-- Logo -->
            <div class="flex-shrink-0">
              <!-- Replace with your logo -->
              <a href="/" class="text-white text-2xl font-bold">Logo</a>
            </div>
            <!-- Menu items -->
            <div class="hidden sm:block sm:ml-6">
              <div class="flex space-x-4">
                <a
                  href="/"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  :class="{ 'bg-gray-900 text-white': activeTab === 'home' }"
                  @click.prevent="setActiveTab('home')"
                >
                  Home
                </a>
                <a
                  href="/about"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  :class="{ 'bg-gray-900 text-white': activeTab === 'about' }"
                  @click.prevent="setActiveTab('about')"
                >
                  About
                </a>
                <!-- Add more menu items as needed -->
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Mobile menu, show/hide based on menu state -->
      <div
        class="sm:hidden"
        :class="{ 'block': mobileMenuOpen, 'hidden': !mobileMenuOpen }"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a
            href="/"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            :class="{ 'bg-gray-900 text-white': activeTab === 'home' }"
            @click.prevent="setActiveTab('home')"
          >
            Home
          </a>
          <a
            href="/about"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            :class="{ 'bg-gray-900 text-white': activeTab === 'about' }"
            @click.prevent="setActiveTab('about')"
          >
            About
          </a>
          <!-- Add more menu items as needed -->
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeTab: 'home', // Initially set active tab
        mobileMenuOpen: false, // Mobile menu state
      };
    },
    methods: {
      setActiveTab(tab) {
        this.activeTab = tab;
        // Close mobile menu after selecting a menu item
        this.mobileMenuOpen = false;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Scoped styles */
  </style>
  