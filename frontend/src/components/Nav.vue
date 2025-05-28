<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

interface NavLink {
  label: string;
  to?: string;
  href?: string;
  external?: boolean;
}

export default defineComponent({
  name: 'NavComponent',
  setup() {
    const isSidebarOpen = ref(false);
    const windowWidth = ref(window.innerWidth);

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    const closeSidebar = () => {
      isSidebarOpen.value = false;
    };

    const navLinks: NavLink[] = [
      { label: 'Dashboard', to: '/' },
      { label: 'About', to: '/about' },
      {
        label: 'GitHub Repository',
        href: 'https://github.com/natelandrum/internship-challenge',
        external: true
      }
    ];    // Add a flag to disable transitions during resize
    const isResizing = ref(false);
    
    const handleResize = () => {
      // Set resizing flag to prevent transitions
      isResizing.value = true;
      
      windowWidth.value = window.innerWidth;
      if (windowWidth.value >= 640 && isSidebarOpen.value) {
        isSidebarOpen.value = false;
      }
      
      // Clear the resizing flag after a short delay
      setTimeout(() => {
        isResizing.value = false;
      }, 100);
    };

    onMounted(() => {
      window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });

    const appName = 'CryptoDashboard';    return {
      isSidebarOpen,
      toggleSidebar,
      closeSidebar,
      navLinks,
      appName,
      windowWidth,
      isResizing
    };
  }
});
</script>

<template>
  <nav class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="w-full py-4 flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center">
            <img src="/crypto-logo.png" alt="Crypto Dashboard Logo" class="h-10 w-10 rounded-full" />
            <span class="ml-2 text-xl font-bold text-blue-800">{{ appName }}</span>
          </router-link>
        </div>
        
        <!-- Hamburger (Mobile Only) -->
        <button
          @click="toggleSidebar"
          class="sm:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
          <!-- Navigation Links (Responsive) -->
        <div
          :class="[
            'fixed sm:static top-0 right-0 z-50 h-full sm:h-auto w-64 sm:w-auto bg-white sm:bg-transparent shadow-lg sm:shadow-none transform sm:transform-none',
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full sm:translate-x-0',
            'flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 p-4 sm:p-0',
            !isResizing ? 'transition-transform duration-300 ease-in-out' : ''
          ]"
        >
          <!-- Close Button (Mobile Only) -->
          <div class="flex z-50 justify-end sm:hidden mb-2">
            <button
              @click="closeSidebar"
              class="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close menu"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <template v-for="link in navLinks" :key="link.label">
            <component
              :is="link.to ? 'router-link' : 'a'"
              :to="link.to"
              :href="link.href"
              :target="link.external ? '_blank' : null"
              class="text-gray-600 hover:text-gray-900 block z-50 sm:inline px-4 py-2 rounded-md hover:bg-gray-100 sm:hover:bg-transparent cursor-pointer"
              @click="closeSidebar"
            >
              {{ link.label }}
            </component>
          </template>
        </div>
      </div>
    </div>

    <!-- Backdrop (Mobile Only) -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-40 bg-black opacity-50 sm:hidden"
      @click="closeSidebar"
    ></div>
  </nav>
</template>


