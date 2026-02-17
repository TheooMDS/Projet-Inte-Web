// src/types/movie-detail.ts

import type { MovieDetail } from './Movie';

const API_KEY = 'b76e64f8cb3e2dd8275a0c5d101d5831';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_LARGE = 'https://image.tmdb.org/t/p/w780';

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

function afficherFilm(movie: MovieDetail): void {
  document.title = `${movie.title} — Visionary`;
  setText('nav-title', movie.title);
  setText('ariane-title', movie.title);
  setText('detail-title', movie.title);

  const poster = document.getElementById('detail-poster') as HTMLImageElement;
  poster.src = movie.poster_path ? `${IMAGE_LARGE}${movie.poster_path}` : '';
  poster.alt = movie.title;

  setText('detail-overview', movie.overview || 'Aucun synopsis disponible.');

  const year = movie.release_date ? movie.release_date.substring(0, 4) : '—';
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min`
    : null;
  const genres = movie.genres ? movie.genres.map((g) => g.name).join(', ') : '';

  let meta = `Sortie : ${year}`;
  if (runtime) meta += `<br>Durée : ${runtime}`;
  if (genres) meta += `<br>Genres : ${genres}`;
  setHtml('detail-meta', meta);

  setHtml('detail-rating', renderStars(movie.vote_average));

  const link = document.getElementById('trailer-link') as HTMLAnchorElement;
  link.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' bande annonce')}`;

  hide('detail-loading');
  show('detail-body');
}

async function chargerFilm(): Promise<void> {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    hide('detail-loading');
    setText('error-message', 'Aucun film spécifié.');
    show('detail-error');
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`);
    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
    const movie = await response.json() as MovieDetail;
    afficherFilm(movie);
  } catch (error) {
    hide('detail-loading');
    setText('error-message', 'Impossible de charger ce film.');
    show('detail-error');
    console.error(error);
  }
}

document.getElementById('retry-btn')?.addEventListener('click', () => {
  hide('detail-error');
  show('detail-loading');
  chargerFilm();
});

document.addEventListener('DOMContentLoaded', chargerFilm);