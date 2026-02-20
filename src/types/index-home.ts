import { toggleFavorite, isFavorite, type FavoriteItem } from './storage';

const API_KEY = 'b76e64f8cb3e2dd8275a0c5d101d5831';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function ajouterCompare(id: number, title: string, poster: string, type: string, year: string, overview: string, rating: number) {
  const item1 = localStorage.getItem('compare-item-1');
  const item2 = localStorage.getItem('compare-item-2');
  const item = { id, title, poster, type, year, overview, rating };
  if (!item1) {
    localStorage.setItem('compare-item-1', JSON.stringify(item));
    alert('1/2 sélectionné. Choisis un autre élément.');
  } else if (!item2) {
    localStorage.setItem('compare-item-2', JSON.stringify(item));
    window.location.href = '/compare.html';
  } else {
    localStorage.removeItem('compare-item-1');
    localStorage.removeItem('compare-item-2');
    localStorage.setItem('compare-item-1', JSON.stringify(item));
    alert('Comparaison réinitialisée. Choisis un deuxième élément.');
  }
}

(window as any).ajouterCompare = ajouterCompare;

function toggleFav(id: number, title: string, poster: string, rating: number, year: string, type: 'Film' | 'Série') {
  const item: FavoriteItem = {
    id,
    title,
    poster_path: poster,
    vote_average: rating,
    type,
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

async function remplirGrid() {
  const url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=fr-FR&page=1`;
  const response = await fetch(url);
  const data = await response.json();
  const films = data.results.slice(0, 7);
  const boxes = ['box-1', 'box-2', 'box-2', 'box-2', 'box-2', 'box-2', 'box-2'];
  const grid = document.querySelector('.grid');
  if (!grid) return;

  grid.innerHTML = films.map((film: any, i: number) => {
    const poster = film.poster_path ? IMAGE_BASE_URL + film.poster_path : '/placeholder.jpg';
    const year = film.release_date ? film.release_date.substring(0, 4) : '—';
    const titleEsc = film.title.replace(/'/g, "\\'");
    const overviewEsc = (film.overview || '').replace(/'/g, "\\'");
    const posterPath = film.poster_path || '';
    const isFav = isFavorite(film.id);
    return `
      <div class="${boxes[i]}" style="position:relative;">
        <a href="/pages/films/details/movie-detail.html?id=${film.id}">
          <img class="cover" src="${poster}" alt="${film.title}" loading="lazy">
        </a>
        <button onclick="event.stopPropagation(); ajouterCompare(${film.id}, '${titleEsc}', '${posterPath}', 'Film', '${year}', '${overviewEsc}', ${film.vote_average})" class="compare-btn">
          <i class="fas fa-bars"></i>
        </button>
        <button onclick="event.stopPropagation(); toggleFav(${film.id}, '${titleEsc}', '${posterPath}', ${film.vote_average}, '${year}', 'Film')" class="favorite-btn ${isFav ? 'active' : ''}" data-fav-id="${film.id}">
          <i class="fas fa-heart"></i>
        </button>
      </div>`;
  }).join('');
}

function remplirMaListe() {
  const container = document.querySelector('.defilement');
  if (!container) return;
  const data = localStorage.getItem('visionary-favorites');
  const favoris = data ? JSON.parse(data) : [];
  if (favoris.length === 0) {
    container.innerHTML = '<p style="color:#888; padding:1rem">Aucun favori pour le moment.</p>';
    return;
  }
  container.innerHTML = favoris.map((item: any) => {
    const poster = item.poster_path ? IMAGE_BASE_URL + item.poster_path : '/placeholder.jpg';
    const detailUrl = item.type === 'Film'
      ? `/pages/films/details/movie-detail.html?id=${item.id}`
      : `/pages/series/details/serie-detail.html?id=${item.id}`;
    return `
      <div class="box-3" style="position:relative;">
        <a href="${detailUrl}">
          <img class="cover" src="${poster}" alt="${item.title}" loading="lazy">
        </a>
      </div>`;
  }).join('');
}

async function remplirFilms() {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`;
  const response = await fetch(url);
  const data = await response.json();
  const films = data.results.slice(0, 8);
  const containers = document.querySelectorAll('.defilement');
  const container = containers[1];
  if (!container) return;

  container.innerHTML = films.map((film: any) => {
    const poster = film.poster_path ? IMAGE_BASE_URL + film.poster_path : '/placeholder.jpg';
    const year = film.release_date ? film.release_date.substring(0, 4) : '—';
    const titleEsc = film.title.replace(/'/g, "\\'");
    const overviewEsc = (film.overview || '').replace(/'/g, "\\'");
    const posterPath = film.poster_path || '';
    const isFav = isFavorite(film.id);
    return `
      <div class="box-3" style="position:relative;">
        <a href="/pages/films/details/movie-detail.html?id=${film.id}">
          <img class="cover" src="${poster}" alt="${film.title}" loading="lazy">
        </a>
        <button onclick="event.stopPropagation(); ajouterCompare(${film.id}, '${titleEsc}', '${posterPath}', 'Film', '${year}', '${overviewEsc}', ${film.vote_average})" class="compare-btn">
          <i class="fas fa-bars"></i>
        </button>
        <button onclick="event.stopPropagation(); toggleFav(${film.id}, '${titleEsc}', '${posterPath}', ${film.vote_average}, '${year}', 'Film')" class="favorite-btn ${isFav ? 'active' : ''}" data-fav-id="${film.id}">
          <i class="fas fa-heart"></i>
        </button>
      </div>`;
  }).join('');
}

async function remplirSeries() {
  const url = `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=fr-FR&page=1`;
  const response = await fetch(url);
  const data = await response.json();
  const series = data.results.slice(0, 8);
  const containers = document.querySelectorAll('.defilement');
  const container = containers[2];
  if (!container) return;

  container.innerHTML = series.map((serie: any) => {
    const poster = serie.poster_path ? IMAGE_BASE_URL + serie.poster_path : '/placeholder.jpg';
    const year = serie.first_air_date ? serie.first_air_date.substring(0, 4) : '—';
    const titleEsc = serie.name.replace(/'/g, "\\'");
    const overviewEsc = (serie.overview || '').replace(/'/g, "\\'");
    const posterPath = serie.poster_path || '';
    const isFav = isFavorite(serie.id);
    return `
      <div class="box-3" style="position:relative;">
        <a href="/pages/series/details/serie-detail.html?id=${serie.id}">
          <img class="cover" src="${poster}" alt="${serie.name}" loading="lazy">
        </a>
        <button onclick="event.stopPropagation(); ajouterCompare(${serie.id}, '${titleEsc}', '${posterPath}', 'Série', '${year}', '${overviewEsc}', ${serie.vote_average ?? 0})" class="compare-btn">
          <i class="fas fa-bars"></i>
        </button>
        <button onclick="event.stopPropagation(); toggleFav(${serie.id}, '${titleEsc}', '${posterPath}', ${serie.vote_average ?? 0}, '${year}', 'Série')" class="favorite-btn ${isFav ? 'active' : ''}" data-fav-id="${serie.id}">
          <i class="fas fa-heart"></i>
        </button>
      </div>`;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  remplirGrid();
  remplirMaListe();
  remplirFilms();
  remplirSeries();
});