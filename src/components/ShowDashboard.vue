<script setup lang="ts">
import { useShowStore } from '../stores/showStore';

const showStore = useShowStore();

function handleImageLoad(event: Event) {
  const target = event.target as HTMLImageElement;
  target.classList.add('show-card__image--loaded');
}
</script>

<template>
  <div>
    <h1>TV Show Dashboard</h1>
    <div v-for="(shows, genre) in showStore.showsByGenre" :key="genre">
      <h2>{{ genre }}</h2>
      <div class="show-list">
        <router-link
          v-for="show in shows"
          :key="show.id"
          :to="`/show/${show.id}`"
          class="show-card"
        >
          <h3>{{ show.name }}</h3>
          <img
            :src="show.image.medium"
            :alt="`Image of ${show.name}`"
            class="show-card__image"
            loading="lazy"
            @load="handleImageLoad"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.show-list {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}
.show-card {
  display: block;
  scroll-snap-align: center;
}
.show-card__image {
  width: 200px;
  height: 300px;
  border: 3px solid transparent;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.2s ease-in;
}
.show-card__image--loaded {
  opacity: 1;
}
.show-card:hover .show-card__image {
  border-color: #fff;
  transition: border-color 0.2s ease-in;
}
@media (min-width: 480px) {
  .show-card {
    scroll-snap-align: start;
  }
  .show-card__image {
    width: 320px;
    height: 480px;
  }
}
</style>
