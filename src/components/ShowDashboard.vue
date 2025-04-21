<script setup lang="ts">
import { useShowStore } from '../stores/showStore';

const showStore = useShowStore();
</script>

<template>
  <div>
    <h1>TV Show Dashboard</h1>
    <div v-for="(shows, genre) in showStore.showsByGenre" :key="genre">
      <h2>{{ genre }}</h2>
      <div class="show-list">
        <div v-for="show in shows" :key="show.id">
          <router-link :to="`/show/${show.id}`">
            <h3>{{ show.name }}</h3>
            <img :src="show.image?.medium" :alt="`Image of ${show.name}`" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
