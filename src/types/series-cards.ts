// src/types/series-cards.ts

const API_KEY = 'b76e64f8cb3e2dd8275a0c5d101d5831';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';


interface Serie {
  id: number;
  name: string;
  poster_path: string | null;
}

interface SerieApiResponse {
  results: Serie[];
}


async function fetchSeriesByGenre(genreId: number): Promise<SerieApiResponse> {
  const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=fr-FR&with_genres=${genreId}&sort_by=popularity.desc`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
  return response.json() as Promise<SerieApiResponse>;
}


async function fetchSeriesUS(): Promise<SerieApiResponse> {
  const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=fr-FR&with_original_language=en&sort_by=popularity.desc`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
  return response.json() as Promise<SerieApiResponse>;
}


function createCard(serie: Serie): string {
  const poster = serie.poster_path
    ? `${IMAGE_BASE_URL}${serie.poster_path}`
    : '/placeholder.jpg';

  return `
    <div class="box-3">
      <a href="/pages/series/details/serie-detail.html?id=${serie.id}">
        <img class="cover" src="${poster}" alt="${serie.name}" loading="lazy">
      </a>
    </div>
  `;
}


async function remplirSection(containerId: string, fetcher: () => Promise<Serie[]>): Promise<void> {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const series = await fetcher();
    container.innerHTML = series.map(createCard).join('');
  } catch (error) {
    console.error(`Erreur chargement section #${containerId}:`, error);
    container.innerHTML = `<p style="color:red; padding:1rem">Erreur de chargement — <a href="" style="color:#51e351">Réessayer</a></p>`;
  }
}

document.addEventListener('DOMContentLoaded', async () => {

  await remplirSection('grid-policier', async () => {
    const data = await fetchSeriesByGenre(80);
    return data.results;
  });


  await remplirSection('grid-action', async () => {
    const data = await fetchSeriesByGenre(10759);
    return data.results;
  });


  await remplirSection('grid-documentaire', async () => {
    const data = await fetchSeriesByGenre(99);
    return data.results;
  });


  await remplirSection('grid-us', async () => {
    const data = await fetchSeriesUS();
    return data.results;
  });

});