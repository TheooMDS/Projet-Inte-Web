// src/types/cards.ts
import { fetchMoviesByGenre, fetchTopRatedMovies, IMAGE_BASE_URL } from '../services/api';
import type { Movie } from './Movie';
function createCard(movie: Movie): string {
  const poster = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : '/placeholder.jpg';

  return `
    <div class="box-3">
      <a href="/pages/films/details/movie-detail.html?id=${movie.id}">
        <img class="cover" src="${poster}" alt="${movie.title}" loading="lazy">
      </a>
    </div>
  `;
}

async function remplirSection(containerId: string, fetcher: () => Promise<Movie[]>): Promise<void> {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const movies = await fetcher();
    container.innerHTML = movies.map(createCard).join('');
  } catch (error) {
    console.error(`Erreur chargement section #${containerId}:`, error);
    container.innerHTML = `<p style="color:red; padding:1rem">Erreur de chargement — <a href="" style="color:#51e351">Réessayer</a></p>`;
  }
}

document.addEventListener('DOMContentLoaded', async () => {

  await remplirSection('grid-action', async () => {
    const data = await fetchMoviesByGenre(28);
    return data.results;
  });

  await remplirSection('grid-blockbuster', async () => {
    const data = await fetchTopRatedMovies();
    return data.results;
  });

  await remplirSection('grid-policier', async () => {
    const data = await fetchMoviesByGenre(80);
    return data.results;
  });

  await remplirSection('grid-scifi', async () => {
    const data = await fetchMoviesByGenre(878);
    return data.results;
  });

});