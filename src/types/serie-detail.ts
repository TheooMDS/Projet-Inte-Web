// src/types/serie-detail.ts

const API_KEY = 'b76e64f8cb3e2dd8275a0c5d101d5831';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_LARGE = 'https://image.tmdb.org/t/p/w780';


interface SerieDetail {
  id: number;
  name: string;
  poster_path: string | null;
  first_air_date: string;
  vote_average: number;
  overview: string;
  number_of_seasons: number | null;
  number_of_episodes: number | null;
  genres: { id: number; name: string }[];
}

function show(id: string): void {
  const el = document.getElementById(id);
  if (el) el.style.display = '';
}

function hide(id: string): void {
  const el = document.getElementById(id);
  if (el) el.style.display = 'none';
}

function setText(id: string, text: string): void {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setHtml(id: string, html: string): void {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function renderStars(score: number): string {
  const stars = Math.round(score / 2);
  let html = '';
  for (let i = 0; i < 5; i++) {
    if (i < stars) {
      html += '<i class="fas fa-star full"></i>';
    } else {
      html += '<div class="empty"><i class="fas fa-star"></i></div>';
    }
  }
  return html;
}

function afficherSerie(serie: SerieDetail): void {
  document.title = `${serie.name} — Visionary`;
  setText('nav-title', serie.name);
  setText('ariane-title', serie.name);
  setText('detail-title', serie.name);

  const poster = document.getElementById('detail-poster') as HTMLImageElement;
  poster.src = serie.poster_path ? `${IMAGE_LARGE}${serie.poster_path}` : '';
  poster.alt = serie.name;

  setText('detail-overview', serie.overview || 'Aucun synopsis disponible.');

  const year = serie.first_air_date ? serie.first_air_date.substring(0, 4) : '—';
  const genres = serie.genres ? serie.genres.map((g) => g.name).join(', ') : '';

  let meta = `Sortie : ${year}`;
  if (serie.number_of_seasons) meta += `<br>Saisons : ${serie.number_of_seasons}`;
  if (serie.number_of_episodes) meta += `<br>Épisodes : ${serie.number_of_episodes}`;
  if (genres) meta += `<br>Genres : ${genres}`;
  setHtml('detail-meta', meta);

  setHtml('detail-rating', renderStars(serie.vote_average));

  const link = document.getElementById('trailer-link') as HTMLAnchorElement;
  link.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(serie.name + ' bande annonce')}`;

  hide('detail-loading');
  show('detail-body');
}

async function chargerSerie(): Promise<void> {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    hide('detail-loading');
    setText('error-message', 'Aucune série spécifiée.');
    show('detail-error');
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=fr-FR`);
    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
    const serie = await response.json() as SerieDetail;
    afficherSerie(serie);
  } catch (error) {
    hide('detail-loading');
    setText('error-message', 'Impossible de charger cette série.');
    show('detail-error');
    console.error(error);
  }
}

document.getElementById('retry-btn')?.addEventListener('click', () => {
  hide('detail-error');
  show('detail-loading');
  chargerSerie();
});

document.addEventListener('DOMContentLoaded', chargerSerie);