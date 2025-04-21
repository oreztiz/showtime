import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import ShowDashboard from './ShowDashboard.vue';
import { useShowStore } from '../stores/showStore';
import { setActivePinia, createPinia } from 'pinia';

vi.mock('../stores/showStore', () => ({
  useShowStore: vi.fn(),
}));

const mockShowsByGenre = {
  Drama: [
    {
      id: 169,
      name: 'Breaking Bad',
      image: {
        medium:
          'https://static.tvmaze.com/uploads/images/medium_portrait/501/1253519.jpg',
      },
    },
    {
      id: 82,
      name: 'Game of Thrones',
      image: {
        medium:
          'https://static.tvmaze.com/uploads/images/medium_portrait/498/1245274.jpg',
      },
    },
  ],
  Comedy: [
    {
      id: 112,
      name: 'South Park',
      image: {
        medium:
          'https://static.tvmaze.com/uploads/images/medium_portrait/0/935.jpg',
      },
    },
  ],
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: ShowDashboard,
    },
    {
      path: '/show/:id',
      name: 'ShowDetails',
      component: { template: '<div>Show Details</div>' },
    },
  ],
});

describe('ShowDashboard.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    (useShowStore as vi.Mock).mockReturnValue({
      showsByGenre: mockShowsByGenre,
    });
    router.push('/');
    return router.isReady();
  });

  it('renders the logo and search bar', () => {
    const wrapper = mount(ShowDashboard, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('img.logo').exists()).toBe(true);
    expect(wrapper.find('input.search-input').exists()).toBe(true);
  });

  it('displays shows grouped by genre', () => {
    const wrapper = mount(ShowDashboard, {
      global: {
        plugins: [router],
      },
    });

    const genres = wrapper.findAll('.genre-name');
    expect(genres).toHaveLength(2);
    expect(genres[0].text()).toBe('Drama');
    expect(genres[1].text()).toBe('Comedy');

    const showCards = wrapper.findAll('.show-card');
    expect(showCards).toHaveLength(3);
  });

  it('filters shows based on search query', async () => {
    const wrapper = mount(ShowDashboard, {
      global: {
        plugins: [router],
      },
    });

    const searchInput = wrapper.find('input.search-input');
    await searchInput.setValue('Breaking');

    const genres = wrapper.findAll('.genre-name');
    expect(genres).toHaveLength(1);
    expect(genres[0].text()).toBe('Drama');

    const showCards = wrapper.findAll('.show-card');
    expect(showCards).toHaveLength(1);
    expect(showCards[0].text()).toContain('Breaking Bad');
  });

  it('displays no results message when no shows match the search query', async () => {
    const wrapper = mount(ShowDashboard, {
      global: {
        plugins: [router],
      },
    });

    const searchInput = wrapper.find('input.search-input');
    await searchInput.setValue('Non existent Show');

    expect(wrapper.find('.no-results').exists()).toBe(true);
    expect(wrapper.find('.no-results').text()).toContain(
      'No results found for "Non existent Show"',
    );
  });

  it('opens the modal for show details', async () => {
    const wrapper = mount(ShowDashboard, {
      global: {
        plugins: [router],
      },
    });

    await router.push('/show/1');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.modal-overlay').exists()).toBe(true);
  });
});
