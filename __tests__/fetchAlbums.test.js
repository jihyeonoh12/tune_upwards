import { fetchTopItuneAlbums } from '../src/utils/api';

jest.mock('../src/utils/api', () => ({
  fetchTopItuneAlbums: jest.fn(),
  fetchSongs: jest.fn(),
}));

test('fetches top albums successfully', async () => {
  const mockAlbums = { feed: { entry: [{ /* album data */ }] } };
  fetchTopItuneAlbums.mockResolvedValue(mockAlbums);

  const albums = await fetchTopItuneAlbums();
  expect(albums).toBeDefined();
  expect(albums).toHaveProperty('feed');
  expect(albums.feed.entry.length).toBeGreaterThan(0);
});
