import { fetchPopularMovies } from './services/api';
import type { Movie } from './types/Movie';
import './style.css';
 
const gridElement = document.getElementById('movie-grid');
 
// Cette fonction fabrique le HTML pour UN seul film
function createMovieCard(movie: Movie): HTMLElement {
  const card = document.createElement('article');
  card.className = 'movie-card';
 
  // URL officielle de TMDB pour les images (w500 = largeur moyenne)
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
    // 1. On récupère les films
    const data = await fetchPopularMovies(1);
   
    // 2. On vide la grille (au cas où)
    gridElement.innerHTML = '';
 
    // 3. Pour chaque film, on crée la carte et on l'ajoute
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