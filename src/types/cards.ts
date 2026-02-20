import { fetchMoviesByGenre, fetchTopRatedMovies, IMAGE_BASE_URL } from '../services/api';
import type { Movie } from './Movie';
import { toggleFavorite, isFavorite, type FavoriteItem } from './storage';

function ajouterCompare(id: number, title: string, poster: string, type: string, year: string, overview: string, rating: number) {
  const item1 = localStorage.getItem('compare-item-1');
  const item2 = localStorage.getItem('compare-item-2');
  
  const item = { id, title, poster, type, year, overview, rating };
  
  if (!item1) {
    localStorage.setItem('compare-item-1', JSON.stringify(item));
    alert('1/2 sélectionné. Choisis un autre film.');
  } else if (!item2) {
    localStorage.setItem('compare-item-2', JSON.stringify(item));
    window.location.href = '/compare.html';
  } else {
    alert('Comparaison déjà en cours. Réinitialise depuis la page Comparaison.');
  }
}

(window as any).ajouterCompare = ajouterCompare;

function toggleFav(id: number, title: string, poster: string, rating: number, year: string) {
  const item: FavoriteItem = {
    id,
    title,
    poster_path: poster,
    vote_average: rating,
    type: 'Film',
    year
  };
  
  const isNowFav = toggleFavorite(item);
  const btn = document.querySelector(`[data-fav-id="${id}"]`);
  if (btn) {
    if (isNowFav) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  }
}

(window as any).toggleFav = toggleFav;

function createCard(movie: Movie): string {
  const poster = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : '/placeholder.jpg';
  
  const year = movie.release_date ? movie.release_date.substring(0, 4) : '—';
  const titleEscaped = movie.title.replace(/'/g, "\\'");
  const overviewEscaped = (movie.overview || '').replace(/'/g, "\\'");
  const posterPath = movie.poster_path || '';
  const isFav = isFavorite(movie.id);

  return `
    <div class="box-3">
      <a href="/pages/films/details/movie-detail.html?id=${movie.id}">
        <img class="cover" src="${poster}" alt="${movie.title}" loading="lazy">
      </a>
      <button 
        onclick="event.stopPropagation(); ajouterCompare(${movie.id}, '${titleEscaped}', '${posterPath}', 'Film', '${year}', '${overviewEscaped}', ${movie.vote_average})"
        class="compare-btn">
        <i class="fas fa-bars"></i>
      </button>
      <button 
        onclick="event.stopPropagation(); toggleFav(${movie.id}, '${titleEscaped}', '${posterPath}', ${movie.vote_average}, '${year}')"
        class="favorite-btn ${isFav ? 'active' : ''}"
        data-fav-id="${movie.id}">
        <i class="fas fa-heart"></i>
      </button>
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