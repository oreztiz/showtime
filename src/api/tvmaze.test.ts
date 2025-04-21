import { describe, it, expect } from 'vitest';

describe('TVMaze API', () => {
  it('should return a valid response', async () => {
    const response = await fetch('https://api.tvmaze.com/shows');
    const data = await response.json();
    expect(response.ok).toBe(true);
    expect(data).toBeDefined();
  });
});
