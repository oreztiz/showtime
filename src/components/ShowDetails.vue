<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Show } from '../types/tvmaze';

const route = useRoute();
const showId = route.params.id;
const show = ref<Show | null>(null);

onMounted(async () => {
  const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
  show.value = await response.json();
});
</script>

<template>
  <div v-if="show" class="show-details">
    <div class="details-container">
      <img
        v-if="show.image"
        :src="show.image.original"
        :alt="`Image of ${show.name}`"
        class="show-image"
      />
      <div class="details-content">
        <h1 class="show-name">{{ show.name }}</h1>
        <p v-html="show.summary"></p>
        <div class="additional-details">
          <p><strong>Genres:</strong> {{ show.genres.join(', ') }}</p>
          <p><strong>Runtime:</strong> {{ show.runtime }} minutes</p>
          <p><strong>Premiered:</strong> {{ show.premiered }}</p>
          <p><strong>Rating:</strong> {{ show.rating.average || 'N/A' }}</p>
          <p v-if="show.officialSite">
            <strong>Official Site:</strong>
            <a
              :href="show.officialSite"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<style scoped>
.show-details {
  position: relative;
  padding: 48px 24px 24px 24px;
  border-radius: 8px;
  max-width: 1036px;
  margin: auto;
  text-align: left;
}
.details-container {
  display: flex;
  flex-direction: column-reverse;
}
.show-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  flex-shrink: 0;
}
.show-name {
  display: inline-block;
  margin-bottom: 16px;
  background-image: var(--brand-gradient);
  font-size: 48px;
  line-height: 1.2;
  color: transparent;
  background-clip: text;
}
.details-content {
  flex: 1;
  text-align: left;
  margin-bottom: 24px;
}

.additional-details {
  margin-top: 20px;
}

.additional-details p {
  margin: 5px 0;
}
@media screen and (min-width: 1037px) {
  .show-details {
    position: relative;
    padding-top: 96px;
  }
  .show-image {
    height: 720px;
    width: 480px;
  }
  .details-container {
    flex-direction: row;
    gap: 48px;
  }
  .details-content {
    text-align: left;
  }
}
</style>
