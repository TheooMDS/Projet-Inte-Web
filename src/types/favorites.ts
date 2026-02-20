import { getFavorites, removeFavorite } from './storage';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function afficherFavoris() {
  const container = document.getElementById('grid-favoris');
  const favorites = getFavorites();

  if (!container) return;

  if (favorites.length === 0) {
    container.innerHTML = '<p style="color:#888; padding:3rem; text-align:center;">Aucun coup de cœur pour le moment</p>';
    return;
  }

  container.innerHTML = favorites.map(item => {
    const poster = item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : '/placeholder.jpg';
    const lien = item.type === 'Film'
      ? `/pages/films/details/movie-detail.html?id=${item.id}`
      : `/pages/series/details/serie-detail.html?id=${item.id}`;

    return `
      <div class="box-3">
        <a href="${lien}">
          <img class="cover" src="${poster}" alt="${item.title}" loading="lazy">
        </a>
        <button 
          onclick="supprimerFav(${item.id})"
          class="favorite-btn active">
          <i class="fas fa-heart"></i>
        </button>
      </div>
    `;
  }).join('');
}

function supprimerFav(id: number) {
  removeFavorite(id);
  afficherFavoris();
}

(window as any).supprimerFav = supprimerFav;

document.addEventListener('DOMContentLoaded', afficherFavoris);