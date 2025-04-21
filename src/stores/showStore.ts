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
      return Object.entries(
        state.shows.reduce((grouped: Record<string, Show[]>, show) => {
          show.genres.forEach((genre) => {
            if (!grouped[genre]) {
              grouped[genre] = [];
            }
            grouped[genre].push(show);
          });
          return grouped;
        }, {}),
      )
        .sort(([genreA], [genreB]) => genreA.localeCompare(genreB))
        .reduce((sortedGrouped: Record<string, Show[]>, [genre, shows]) => {
          sortedGrouped[genre] = shows.sort(
            (a, b) => (b.rating.average || 0) - (a.rating.average || 0),
          );
          return sortedGrouped;
        }, {});
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
