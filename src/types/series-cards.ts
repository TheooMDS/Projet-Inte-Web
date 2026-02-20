const API_KEY = 'b76e64f8cb3e2dd8275a0c5d101d5831';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';


interface Serie {
  id: number;
  name: string;
  poster_path: string | null;
  first_air_date?: string;
  overview?: string;
  vote_average?: number;
}

interface SerieApiResponse {
  results: Serie[];
}


function ajouterCompare(id: number, title: string, poster: string, type: string, year: string, overview: string, rating: number) {
  const item1 = localStorage.getItem('compare-item-1');
  const item2 = localStorage.getItem('compare-item-2');

  const item = { id, title, poster, type, year, overview, rating };

  if (!item1) {
    localStorage.setItem('compare-item-1', JSON.stringify(item));
    alert('1/2 sélectionné. Choisis une autre série.');
  } else if (!item2) {
    localStorage.setItem('compare-item-2', JSON.stringify(item));
    window.location.href = '/compare.html';
  } else {
    alert('Comparaison déjà en cours. Réinitialise depuis la page Comparaison.');
  }
}

(window as any).ajouterCompare = ajouterCompare;


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

  const year = serie.first_air_date ? serie.first_air_date.substring(0, 4) : '—';
  const titleEscaped = serie.name.replace(/'/g, "\\'");
  const overviewEscaped = (serie.overview || '').replace(/'/g, "\\'");
  const posterPath = serie.poster_path || '';

  return `
    <div class="box-3">
      <a href="/pages/series/details/serie-detail.html?id=${serie.id}">
        <img class="cover" src="${poster}" alt="${serie.name}" loading="lazy">
      </a>
      <button 
        onclick="event.stopPropagation(); ajouterCompare(${serie.id}, '${titleEscaped}', '${posterPath}', 'Série', '${year}', '${overviewEscaped}', ${serie.vote_average ?? 0})"
        class="compare-btn">
        <i class="fas fa-bars"></i>
      </button>
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