<script setup lang="ts">
import { useShowStore } from '../stores/showStore';

const showStore = useShowStore();
</script>

<template>
  <div>
    <h1>TV Show Dashboard</h1>
    <div v-for="show in showStore.shows" :key="show.id">
      <router-link :to="`/show/${show.id}`">
        <h2>{{ show.name }}</h2>
        <img :src="show.image?.medium" :alt="`Image of ${show.name}`" />
      </router-link>
    </div>
  </div>
</template>

<style scoped></style>
