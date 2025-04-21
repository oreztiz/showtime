import { defineStore } from 'pinia';
import { fetchAllShows } from '../api/tvmaze';
import type { Show } from '../types/tvmaze';

export const useShowStore = defineStore('showStore', {
  state: () => ({
    shows: [] as Show[],
  }),
  actions: {
    async loadShows() {
      this.shows = await fetchAllShows();
    },
  },
  getters: {
    showsByGenre: (state) => {
      const grouped: Record<string, Show[]> = {};
      state.shows.forEach((show) => {
        show.genres.forEach((genre) => {
          if (!grouped[genre]) {
            grouped[genre] = [];
          }
          grouped[genre].push(show);
        });
      });
      return grouped;
    },
    searchShows: (state) => {
      return (query: string): Show[] => {
        return state.shows.filter((show) =>
          show.name.toLowerCase().includes(query.toLowerCase()),
        );
      };
    },
  },
});
