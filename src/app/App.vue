<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Header } from '@/widgets/Header';
</script>

<template>
  <Header />
  <main>
    <RouterView />
  </main>

</template>

<style scoped></style>
