import axios from 'axios';
import type { Show } from '../types/tvmaze';

const BASE_URL = 'https://api.tvmaze.com';

export async function fetchAllShows(): Promise<Show[]> {
  const response = await axios.get<Show[]>(`${BASE_URL}/shows`);
  return response.data;
}
