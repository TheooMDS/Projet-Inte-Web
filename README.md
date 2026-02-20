# Visionary 🎬

Site de streaming fictif permettant de naviguer parmi des films et séries populaires, avec données récupérées en temps réel via l'API TMDB.

## Prérequis

Assurez-vous d'avoir installé **Node.js** et le gestionnaire de paquets **pnpm** sur votre appareil.

## Installation

1. Clonez ce dépôt sur votre appareil local.
2. Accédez au répertoire du projet cloné.
3. Installez les dépendances du projet :
   ```bash
   pnpm install
   ```

## Lancement du serveur

Lancer le serveur Vite du projet dans le terminal :
```bash
pnpm run dev
```
Accédez au site du projet grâce au lien qui vous est donné.

## API utilisée

**TMDB (The Movie Database)** — [themoviedb.org](https://www.themoviedb.org/)

Les données (affiches, titres, synopsis, notes...) sont chargées dynamiquement depuis l'API TMDB sur les pages Films, Séries, Détail et Recherche.

### Endpoints utilisés

- `GET /movie/now_playing` — Films à l'affiche (page d'accueil)
- `GET /movie/popular` — Films populaires (page d'accueil)
- `GET /discover/movie?with_genres={id}` — Films par genre
- `GET /movie/{id}` — Détail d'un film
- `GET /movie/{id}/videos` — Bande-annonce d'un film
- `GET /tv/popular` — Séries populaires (page d'accueil)
- `GET /discover/tv?with_genres={id}` — Séries par genre
- `GET /tv/{id}` — Détail d'une série
- `GET /tv/{id}/videos` — Bande-annonce d'une série
- `GET /search/multi` — Recherche multi (films + séries)

## Arborescence du projet

```
pages/
├── films/
│   ├── details/
│   │   ├── accueil/     (blade_runner_2049, django, f1_the_movie, fury, goodfellas, interstellar, prisoners, the_dark_knight, the_truman_show)
│   │   ├── action/      (bullet_train, extraction2, john_wick2, john_wick4, madmax, mission_impossible, ...)
│   │   ├── blockbuster/ (avatar, avengers_endgame, barbie, dune_part2, joker, oppenheimer, ...)
│   │   ├── policier/    (3_billboards, boston_strangler, nightcrawler, sicario, the_gentleman, ...)
│   │   └── science_fiction/ (dune_part1, matrix, ready_player_one, the_creator, the_martian, ...)
│   └── films.html
└── series/
    ├── details/
    │   ├── accueil/     (breaking_bad, drive_to_survive, get_gotti, narcos, the_wire)
    │   ├── documentaire/(arnold, beckham, chernobyl, fear_city, the_last_dance, senna, ...)
    │   ├── sport/       (all_or_nothing, break_point, quarterback, tour_de_france, ...)
    │   ├── thriller/    (bodyguard, dexter, la_casa_de_papel, lupin, mindhunter, ozark, ...)
    │   └── us/          (better_call_saul, euphoria, game_of_thrones, succession, the_boys, ...)
    └── series.html

public/
├── films/           (images par catégorie)
├── series/          (images par catégorie)
├── bannière_f1_the_movie.jpg
├── favicon.png
└── green_visionary.png

src/
├── sass/
│   ├── components/
│   │   ├── _components.scss
│   │   ├── _mixins.scss
│   │   └── _variables.scss
│   └── main.scss
├── services/
│   └── api.ts
└── types/
    ├── Movie.ts
    ├── cards.ts
    ├── series-cards.ts
    ├── movie-detail.ts
    ├── serie-detail.ts
    ├── compare.ts
    ├── favorites.ts
    ├── search.ts
    ├── storage.ts
    ├── theme.ts
    └── index-home.ts

index.html
search.html
compare.html
favorites.html
package.json
pnpm-lock.yaml
vite.config.js
```

## Liste des pages

- **Page d'accueil** : `index.html`
- **Page de recherche** : `search.html`
- **Page de comparaison** : `compare.html`
- **Page des favoris** : `favorites.html`
- **Films** : `pages/films/films.html` — grille dynamique (Action, Populaires, Policier, Science-Fiction)
- **Détail film générique** : `pages/films/details/movie-detail.html` via `?id=`
- **Séries** : `pages/series/series.html` — grille dynamique (Policier, Action, Documentaire, US)
- **Détail série générique** : `pages/series/details/serie-detail.html` via `?id=`

## Fonctionnalités

- Grille dynamique de films et séries chargées depuis l'API TMDB
- Page détail générique pour films et séries (une seule page pour tous via `?id=`)
- Recherche films + séries via la navbar, redirige vers `search.html`
- Système de favoris avec persistance via `localStorage` et affichage sur la page Coup de cœur
- Bandeau de statistiques dans la navbar affichant le nombre de favoris en temps réel
- Mode comparaison : sélectionner deux films ou séries et les comparer côte à côte
- Thème clair / sombre toggle dans la navbar avec persistance via `localStorage`
- Gestion des erreurs API avec message + bouton réessayer
- Interface responsive mobile et desktop

## Choix techniques

Dans ce projet, nous avons choisi d'utiliser plusieurs pages HTML afin de naviguer dans les différentes sections du site. Les pages Films, Séries, Recherche et Accueil sont alimentées dynamiquement par l'API TMDB via TypeScript. Le système de favoris et de comparaison utilise le `localStorage` pour persister les données entre les sessions. Les anciennes pages détail codées manuellement cohabitent avec les nouvelles pages génériques dynamiques.

## Captures d'écran

Disponibles dans `public/capture/`.

## Auteur

Mehdi Hammadou — Projet réalisé dans le cadre du module Front-End.