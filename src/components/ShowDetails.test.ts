import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import ShowDetails from './ShowDetails.vue';

global.fetch = vi.fn();

const mockShow = {
  id: 169,
  name: 'Breaking Bad',
  genres: ['Drama', 'Crime', 'Thriller'],
  rating: { average: 9.2 },
  image: {
    medium:
      'https://static.tvmaze.com/uploads/images/medium_portrait/501/1253519.jpg',
    original:
      'https://static.tvmaze.com/uploads/images/original_untouched/501/1253519.jpg',
  },
  summary: `<p><b>Breaking Bad</b> follows protagonist Walter White, a chemistry teacher who lives in New Mexico with his wife and teenage son who has cerebral palsy. White is diagnosed with Stage III cancer and given a prognosis of two years left to live. With a new sense of fearlessness based on his medical prognosis, and a desire to secure his family's financial security, White chooses to enter a dangerous world of drugs and crime and ascends to power in this world. The series explores how a fatal diagnosis such as White's releases a typical man from the daily concerns and constraints of normal society and follows his transformation from mild family man to a kingpin of the drug trade.</p>`,
  runtime: 60,
  premiered: '2008-01-20',
  officialSite: 'http://www.amc.com/shows/breaking-bad',
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/show/:id',
      name: 'ShowDetails',
      component: ShowDetails,
    },
  ],
});

describe('ShowDetails.vue', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    router.push('/show/169');
    await router.isReady();
  });

  it('renders loading state initially', () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(null),
    });

    const wrapper = mount(ShowDetails, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.text()).toContain('Loading...');
  });

  it('fetches and displays show details', async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockShow),
    });

    const wrapper = mount(ShowDetails, {
      global: {
        plugins: [router],
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(fetch).toHaveBeenCalledWith('https://api.tvmaze.com/shows/169');

    const showName = wrapper.find('.show-name');
    expect(showName.exists()).toBe(true);
    expect(showName.text()).toBe('Breaking Bad');

    const detailsContent = wrapper.find('.details-content');
    expect(detailsContent.exists()).toBe(true);
    expect(detailsContent.text()).toContain('Drama, Crime, Thriller');
    expect(detailsContent.text()).toContain('60 minutes');
    expect(detailsContent.text()).toContain('2008-01-20');
    expect(detailsContent.text()).toContain('9.2');

    const link = wrapper.find('a');
    expect(link.exists()).toBe(true);
    expect(link.attributes('href')).toBe(
      'http://www.amc.com/shows/breaking-bad',
    );

    const image = wrapper.find('img');
    expect(image.exists()).toBe(true);
    expect(image.attributes('src')).toBe(
      'https://static.tvmaze.com/uploads/images/original_untouched/501/1253519.jpg',
    );
  });

  it('handles missing data gracefully', async () => {
    const incompleteShow = {
      ...mockShow,
      genres: [],
      rating: { average: null },
      image: null,
      officialSite: null,
    };

    (fetch as vi.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(incompleteShow),
    });

    const wrapper = mount(ShowDetails, {
      global: {
        plugins: [router],
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 0));

    const detailsContent = wrapper.find('.details-content');
    expect(detailsContent.exists()).toBe(true);
    expect(detailsContent.text()).toContain('N/A');

    const image = wrapper.find('img');
    expect(image.exists()).toBe(false);

    const link = wrapper.find('a');
    expect(link.exists()).toBe(false);
  });
});
