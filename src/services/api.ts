// src/services/api.ts

import type { MovieApiResponse } from '../types/Movie';

const API_KEY = 'b76e64f8cb3e2dd8275a0c5d101d5831';
const BASE_URL = 'https://api.themoviedb.org/3';

// URL de base pour construire les liens des affiches TMDB
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export async function fetchPopularMovies(page: number = 1): Promise<MovieApiResponse> {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR&page=${page}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
    const data = await response.json() as MovieApiResponse;
    return data;
  } catch (error) {
    console.error("Erreur dans fetchPopularMovies:", error);
    throw error;
  }
}

export async function fetchMoviesByGenre(genreId: number): Promise<MovieApiResponse> {
  const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=fr-FR&with_genres=${genreId}&sort_by=popularity.desc`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
    const data = await response.json() as MovieApiResponse;
    return data;
  } catch (error) {
    console.error("Erreur dans fetchMoviesByGenre:", error);
    throw error;
  }
}

export async function fetchTopRatedMovies(): Promise<MovieApiResponse> {
  const url = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=fr-FR`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
    const data = await response.json() as MovieApiResponse;
    return data;
  } catch (error) {
    console.error("Erreur dans fetchTopRatedMovies:", error);
    throw error;
  }
}