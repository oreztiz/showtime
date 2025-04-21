<script setup lang="ts">
import { ref, computed } from 'vue';
import { useShowStore } from '../stores/showStore';
import { useRoute, useRouter } from 'vue-router';
import ShowDetails from './ShowDetails.vue';
import type { Show } from '../types/tvmaze';

const showStore = useShowStore();
const route = useRoute();
const router = useRouter();

const searchQuery = ref('');

const filteredShowsByGenre = computed(() => {
  if (!searchQuery.value.trim()) {
    return showStore.showsByGenre;
  }

  const query = searchQuery.value.toLowerCase();
  const filtered: Record<string, Show[]> = {};

  for (const [genre, shows] of Object.entries(showStore.showsByGenre)) {
    const matchingShows = shows.filter((show) =>
      show.name.toLowerCase().includes(query),
    );
    if (matchingShows.length) {
      filtered[genre] = matchingShows;
    }
  }

  return filtered;
});

function handleImageLoad(event: Event) {
  const target = event.target as HTMLImageElement;
  target.classList.add('show-card__image--loaded');
}

function closeModal() {
  router.push('/');
}
</script>

<template>
  <div>
    <img src="../assets/logo.png" alt="Showtime logo" class="logo" />
    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for a show..."
        class="search-input"
      />
    </div>
    <div
      v-if="Object.keys(filteredShowsByGenre).length === 0"
      class="no-results"
    >
      <p>No results found for "{{ searchQuery }}" ☹️</p>
    </div>
    <div
      v-else
      v-for="(shows, genre) in filteredShowsByGenre"
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
    <div v-if="route.name === 'ShowDetails'" class="modal-overlay">
      <div class="modal-content">
        <ShowDetails />
      </div>
      <button @click="closeModal" class="modal-close">
        &#10005;<span class="modal-close__text"> Close</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.logo {
  max-width: 50%;
}
.search-bar {
  margin-bottom: 16px;
  text-align: center;
}
.search-input {
  width: 80%;
  max-width: 400px;
  padding: 8px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
  border-radius: 8px;
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
  opacity: 0;
  transition: opacity 0.2s ease-in;
  border-radius: 8px;
}
.show-card__image--loaded {
  opacity: 1;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-close {
  position: absolute;
  top: 24px;
  right: 24px;
  border: none;
  background: none;
  font-family: var(--font-family);
  font-size: 24px;
  color: #fff;
  cursor: pointer;
}
.modal-content {
  position: absolute;
  top: 24px;
  right: 24px;
  bottom: 24px;
  left: 24px;
  overflow-y: auto;
}
.modal-close__text {
  display: none;
}
.no-results {
  text-align: center;
  margin: 16px 0;
  font-size: 18px;
  color: #666;
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
@media (min-width: 1037px) {
  .modal-close__text {
    display: inline;
  }
}
</style>
