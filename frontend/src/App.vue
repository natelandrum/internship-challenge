<script setup lang="ts">
import { RouterView } from 'vue-router'
import Nav from '@/components/Nav.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Nav />
    <RouterView />
  </div>
</template>
