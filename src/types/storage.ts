export interface FavoriteItem {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  type: 'Film' | 'Série';
  year?: string;
}

const STORAGE_KEY = 'visionary-favorites';

export function getFavorites(): FavoriteItem[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function isFavorite(id: number): boolean {
  const favorites = getFavorites();
  return favorites.some(item => item.id === id);
}

export function addFavorite(item: FavoriteItem): void {
  const favorites = getFavorites();
  if (!favorites.some(fav => fav.id === item.id)) {
    favorites.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(id: number): void {
  const favorites = getFavorites();
  const filtered = favorites.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function toggleFavorite(item: FavoriteItem): boolean {
  if (isFavorite(item.id)) {
    removeFavorite(item.id);
    return false;
  } else {
    addFavorite(item);
    return true;
  }
}

const THEME_KEY = 'visionary-theme';

export function getTheme(): 'dark' | 'light' {
  return (localStorage.getItem(THEME_KEY) as 'dark' | 'light') ?? 'dark';
}

export function setTheme(theme: 'dark' | 'light'): void {
  localStorage.setItem(THEME_KEY, theme);
}

export function applyTheme(): void {
  const theme = getTheme();
  document.documentElement.setAttribute('data-theme', theme);
}
