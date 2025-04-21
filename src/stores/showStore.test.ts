import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useShowStore } from './showStore';
import { fetchAllShows } from '../api/tvmaze';
import type { Show } from '../types/tvmaze';

vi.mock('../api/tvmaze', () => ({
  fetchAllShows: vi.fn(),
}));

const mockShows: Show[] = [
  {
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
  },
  {
    id: 82,
    name: 'Game of Thrones',
    genres: ['Drama', 'Adventure', 'Fantasy'],
    rating: { average: 8.9 },
    image: {
      medium:
        'https://static.tvmaze.com/uploads/images/medium_portrait/498/1245274.jpg',
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/498/1245274.jpg',
    },
    summary: `<p>Based on the bestselling book series <i>A Song of Ice and Fire</i> by George R.R. Martin, this sprawling new HBO drama is set in a world where summers span decades and winters can last a lifetime. From the scheming south and the savage eastern lands, to the frozen north and ancient Wall that protects the realm from the mysterious darkness beyond, the powerful families of the Seven Kingdoms are locked in a battle for the Iron Throne. This is a story of duplicity and treachery, nobility and honor, conquest and triumph. In the <b>Game of Thrones</b>, you either win or you die.</p>`,
    runtime: 60,
    premiered: '2011-04-17',
    officialSite: 'http://www.hbo.com/game-of-thrones',
  },
  {
    id: 112,
    name: 'South Park',
    genres: ['Comedy'],
    rating: { average: 8.4 },
    image: {
      medium:
        'https://static.tvmaze.com/uploads/images/medium_portrait/0/935.jpg',
      original:
        'https://static.tvmaze.com/uploads/images/original_untouched/0/935.jpg',
    },
    summary:
      '<p><b>South Park</b> is an adult comedy animation show centred around 4 children in the small town of south park. Its humour is often dark involving satirical elements and mocking current real-life events.</p>',
    runtime: 30,
    premiered: '1997-08-13',
    officialSite: 'https://www.cc.com/shows/south-park',
  },
];

describe('showStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    (fetchAllShows as vi.Mock).mockResolvedValue(mockShows);
  });

  it('should load shows using the loadShows action', async () => {
    const store = useShowStore();
    await store.loadShows();

    expect(fetchAllShows).toHaveBeenCalled();
    expect(store.shows).toEqual(mockShows);
  });

  it('should group shows by genre using showsByGenre getter', () => {
    const store = useShowStore();
    store.shows = mockShows;

    const grouped = store.showsByGenre;

    expect(grouped).toEqual({
      Adventure: [
        {
          id: 82,
          name: 'Game of Thrones',
          genres: ['Drama', 'Adventure', 'Fantasy'],
          rating: { average: 8.9 },
          image: {
            medium:
              'https://static.tvmaze.com/uploads/images/medium_portrait/498/1245274.jpg',
            original:
              'https://static.tvmaze.com/uploads/images/original_untouched/498/1245274.jpg',
          },
          summary: `<p>Based on the bestselling book series <i>A Song of Ice and Fire</i> by George R.R. Martin, this sprawling new HBO drama is set in a world where summers span decades and winters can last a lifetime. From the scheming south and the savage eastern lands, to the frozen north and ancient Wall that protects the realm from the mysterious darkness beyond, the powerful families of the Seven Kingdoms are locked in a battle for the Iron Throne. This is a story of duplicity and treachery, nobility and honor, conquest and triumph. In the <b>Game of Thrones</b>, you either win or you die.</p>`,
          runtime: 60,
          premiered: '2011-04-17',
          officialSite: 'http://www.hbo.com/game-of-thrones',
        },
      ],
      Comedy: [
        {
          id: 112,
          name: 'South Park',
          genres: ['Comedy'],
          rating: { average: 8.4 },
          image: {
            medium:
              'https://static.tvmaze.com/uploads/images/medium_portrait/0/935.jpg',
            original:
              'https://static.tvmaze.com/uploads/images/original_untouched/0/935.jpg',
          },
          summary:
            '<p><b>South Park</b> is an adult comedy animation show centred around 4 children in the small town of south park. Its humour is often dark involving satirical elements and mocking current real-life events.</p>',
          runtime: 30,
          premiered: '1997-08-13',
          officialSite: 'https://www.cc.com/shows/south-park',
        },
      ],
      Crime: [
        {
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
        },
      ],
      Drama: [
        {
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
        },
        {
          id: 82,
          name: 'Game of Thrones',
          genres: ['Drama', 'Adventure', 'Fantasy'],
          rating: { average: 8.9 },
          image: {
            medium:
              'https://static.tvmaze.com/uploads/images/medium_portrait/498/1245274.jpg',
            original:
              'https://static.tvmaze.com/uploads/images/original_untouched/498/1245274.jpg',
          },
          summary: `<p>Based on the bestselling book series <i>A Song of Ice and Fire</i> by George R.R. Martin, this sprawling new HBO drama is set in a world where summers span decades and winters can last a lifetime. From the scheming south and the savage eastern lands, to the frozen north and ancient Wall that protects the realm from the mysterious darkness beyond, the powerful families of the Seven Kingdoms are locked in a battle for the Iron Throne. This is a story of duplicity and treachery, nobility and honor, conquest and triumph. In the <b>Game of Thrones</b>, you either win or you die.</p>`,
          runtime: 60,
          premiered: '2011-04-17',
          officialSite: 'http://www.hbo.com/game-of-thrones',
        },
      ],
      Fantasy: [
        {
          id: 82,
          name: 'Game of Thrones',
          genres: ['Drama', 'Adventure', 'Fantasy'],
          rating: { average: 8.9 },
          image: {
            medium:
              'https://static.tvmaze.com/uploads/images/medium_portrait/498/1245274.jpg',
            original:
              'https://static.tvmaze.com/uploads/images/original_untouched/498/1245274.jpg',
          },
          summary: `<p>Based on the bestselling book series <i>A Song of Ice and Fire</i> by George R.R. Martin, this sprawling new HBO drama is set in a world where summers span decades and winters can last a lifetime. From the scheming south and the savage eastern lands, to the frozen north and ancient Wall that protects the realm from the mysterious darkness beyond, the powerful families of the Seven Kingdoms are locked in a battle for the Iron Throne. This is a story of duplicity and treachery, nobility and honor, conquest and triumph. In the <b>Game of Thrones</b>, you either win or you die.</p>`,
          runtime: 60,
          premiered: '2011-04-17',
          officialSite: 'http://www.hbo.com/game-of-thrones',
        },
      ],
      Thriller: [
        {
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
        },
      ],
    });
  });

  it('should search shows by name using searchShows getter', () => {
    const store = useShowStore();
    store.shows = mockShows;

    const results = store.searchShows('breaking');
    expect(results).toEqual([
      {
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
      },
    ]);
  });
});
