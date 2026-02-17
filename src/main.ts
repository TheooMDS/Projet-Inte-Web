import { fetchPopularMovies } from './services/api';
import type { Movie } from './types/Movie';
import './style.css';
 
const gridElement = document.getElementById('movie-grid');
 
function createMovieCard(movie: Movie): HTMLElement {
  const card = document.createElement('article');
  card.className = 'movie-card';
 
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
 
  card.innerHTML = `
    <img src="${imageBaseUrl}${movie.poster_path}" alt="${movie.title}">
    <div class="movie-info">
      <h3>${movie.title}</h3>
      <span class="rating">⭐ ${movie.vote_average.toFixed(1)}</span>
    </div>
  `;
 
  return card;
}
 
async function init() {
  if (!gridElement) return;
 
  try {
    const data = await fetchPopularMovies(1);
   
    gridElement.innerHTML = '';
    data.results.forEach((movie) => {
      const card = createMovieCard(movie);
      gridElement.appendChild(card);
    });
 
  } catch (error) {
    console.error("Erreur :", error);
    gridElement.innerHTML = '<p style="color: red; text-align:center">Erreur de chargement des films.</p>';
  }
}
 
init();