<script setup lang="ts">
import { useShowStore } from '../stores/showStore';

const showStore = useShowStore();

function handleImageLoad(event: Event) {
  const target = event.target as HTMLImageElement;
  target.closest('.show-card')?.classList.add('show-card--loaded');
}
</script>

<template>
  <div>
    <img src="../assets/logo.png" alt="Showtime logo" class="logo" />
    <div
      v-for="(shows, genre) in showStore.showsByGenre"
      :key="genre"
      class="genre-section"
    >
      <h2 class="genre-name">{{ genre }}</h2>
      <div class="show-list">
        <router-link
          v-for="show in shows"
          :key="show.id"
          :to="`/show/${show.id}`"
          class="show-card"
        >
          <div class="show-card__content">
            <h3 class="show-card__title">{{ show.name }}</h3>
            <img
              :src="show.image.medium"
              :alt="`Image of ${show.name}`"
              class="show-card__image"
              loading="lazy"
              @load="handleImageLoad"
            />
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  max-width: 50%;
}
.genre-section {
  margin-bottom: 32px;
}
.genre-name {
  display: inline-block;
  margin: 8px 0;
  background-image: var(--brand-gradient);
  color: transparent;
  background-clip: text;
  font-size: 32px;
  font-weight: 700;
}
.show-list {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  mask-image: radial-gradient(circle, #000, #000 65%, transparent 100%);
}
.show-card {
  display: block;
  scroll-snap-align: center;
  background: var(--brand-gradient);
  opacity: 0;
  transition: opacity 0.2s ease-in;
}
.show-card__content {
  padding: 16px;
  background: var(--brand-primary);
  transition: background 0.2s ease-in;
}
.show-card:hover .show-card__content {
  background: transparent;
}
.show-card__title {
  padding: 0 0 16px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 300;
}
.show-card__image {
  display: block;
  width: 200px;
  height: 300px;
  transition: border 0.2s ease-in;
  object-fit: cover;
}
.show-card--loaded {
  opacity: 1;
}
@media (min-width: 480px) {
  .show-list {
    mask-image: radial-gradient(circle, #000, #000 95%, transparent 100%);
  }
  .show-card {
    scroll-snap-align: start;
  }
  .show-card__image {
    width: 320px;
    height: 480px;
  }
}
</style>
