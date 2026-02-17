// src/types/search.ts

const API_KEY = 'b76e64f8cb3e2dd8275a0c5d101d5831';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const params = new URLSearchParams(window.location.search);
const query = params.get('q');

const container = document.getElementById('grid-recherche');
const titre = document.getElementById('search-titre');

if (!query) {
  if (titre) titre.textContent = 'Recherche';
} else {
  if (titre) titre.textContent = `Recherche`;
  chercher(query);
}

async function chercher(q: string) {
  if (!container) return;
  container.innerHTML = '<p style="color:#888; padding:1rem">Chargement...</p>';

  const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=fr-FR&query=${encodeURIComponent(q)}`);
  const data = await response.json();

  const resultats = data.results.filter((r: any) => r.media_type === 'movie' || r.media_type === 'tv');

  if (resultats.length === 0) {
    container.innerHTML = '<p style="color:#888; padding:1rem">Aucun résultat trouvé</p>';
    return;
  }

  container.innerHTML = resultats.map((r: any) => {
    const nom = r.title || r.name || '—';
    const poster = r.poster_path ? `${IMAGE_URL}${r.poster_path}` : '/placeholder.jpg';
    const lien = r.media_type === 'movie'
      ? `/pages/films/details/movie-detail.html?id=${r.id}`
      : `/pages/series/details/serie-detail.html?id=${r.id}`;

    return `
      <div class="box-3">
        <a href="${lien}">
          <img class="cover" src="${poster}" alt="${nom}" loading="lazy">
        </a>
      </div>
    `;
  }).join('');
}