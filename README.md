Visionary 🎬
Site de streaming fictif permettant de naviguer parmi des films et séries populaires, avec données récupérées en temps réel via l'API TMDB.

Prérequis
Assurez-vous d'avoir installé Node.js et le gestionnaire de paquets pnpm sur votre appareil.

Installation
Clonez ce dépôt sur votre appareil local.
Accédez au répertoire du projet cloné.
Installez les dépendances du projet grâce à pnpm :
bashpnpm install
Lancement du serveur
Lancer le serveur Vite du projet dans le terminal :
bashpnpm run dev
Accédez au site du projet grâce au lien qui vous est donné.

API utilisée
TMDB (The Movie Database) — themoviedb.org
Les données (affiches, titres, synopsis, notes...) sont chargées dynamiquement depuis l'API TMDB sur les pages Films, Séries, Détail et Recherche.

Arborescence du projet

pages

films

details

accueil Présence de toutes les pages de la catégorie
action Présence de toutes les pages de la catégorie
blockbuster Présence de toutes les pages de la catégorie
policier Présence de toutes les pages de la catégorie
science_fiction Présence de toutes les pages de la catégorie


films.html


series

details

accueil Présence de toutes les pages de la catégorie
documentaire Présence de toutes les pages de la catégorie
sport Présence de toutes les pages de la catégorie
thriller Présence de toutes les pages de la catégorie
us Présence de toutes les pages de la catégorie


series.html




public

films

accueil Présence de toutes les images de la catégorie
action Présence de toutes les images de la catégorie
blockbuster Présence de toutes les images de la catégorie
policier Présence de toutes les images de la catégorie
science_fiction Présence de toutes les images de la catégorie


series

accueil Présence de toutes les images de la catégorie
documentaire Présence de toutes les images de la catégorie
sport Présence de toutes les images de la catégorie
thriller Présence de toutes les images de la catégorie
us Présence de toutes les images de la catégorie


bannière_f1_the_movie.jpg
favicon.png
green_visionary.png


src

sass

components

_components.scss
_mixins.scss
_variables.scss


main.scss


services

api.ts


types

Movie.ts
cards.ts
series-cards.ts
movie-detail.ts
serie-detail.ts
search.ts




index.html
search.html
package.json
pnpm-lock.yaml
vite.config.js


Liste des pages
Page d'accueil
index.html
Page de recherche
search.html
Films
pages/films/films.html — grille dynamique (Action, Populaires, Policier, Science-Fiction)
pages/films/details/movie-detail.html — page détail générique via ?id=
Pages détail films (accueil) : blade_runner_2049 - django - f1_the_movie - fury - goodfellas - interstellar - prisoners - the_dark_knight - the_truman_show
Pages détail films (action) : bullet_train - extraction2 - john_wick2 - john_wick4 - madmax - mission_impossible - mission_impossible_dead_reckoning - no_time_to_die - road_house - tenet - the_beekeeper - top_gun_maverick
Pages détail films (blockbuster) : avatar - avengers_endgame - avengers_infinity_war - barbie - dune_part2 - joker - jurassic_world - oppenheimer - spider_man_no_way_home - star_wars_the_force_awakens - the_batman
Pages détail films (policier) : 3_billboards - boston_strangler - couteaux_a_tires - les_veuves - nice_guy - nightcrawler - reptile - sicario - the_gentleman - the_killer - wind_river
Pages détail films (science-fiction) : dune_part1 - hunger_games5 - madmax_fury_road - matrix - ready_player_one - spiderman - the_creator - the_martian
Séries
pages/series/series.html — grille dynamique (Policier, Action, Documentaire, US)
pages/series/details/serie-detail.html — page détail générique via ?id=
Pages détail séries (accueil) : breaking_bad - drive_to_survive - get_gotti - narcos - the_wire
Pages détail séries (documentaire) : arnold - beckham - chernobyl - dont_fk_with_cats - fear_city - full_swing - making_a_murderer - mcgregor_forever - our_planet - senna - the_last_dance
Pages détail séries (sport) : all_or_nothing - break_point - quarterback - swagger - tour_de_france - welcome_to_wrexham
Pages détail séries (thriller) : bodyguard - dexter - la_casa_de_papel - lupin - mindhunter - mr_robot - ozark - ripley - the_night_of - the_sinner
Pages détail séries (US) : better_call_saul - euphoria - game_of_thrones - house_of_cards - sopranos - stranger_things - succession - the_boys - the_last_of_us - the_mandalorian - the_walking_dead - true_detective

Fonctionnalités

Grille dynamique de films et séries chargées depuis l'API TMDB
Page détail générique pour films et séries (une seule page pour tous via ?id=)
Recherche films + séries via la navbar, redirige vers search.html
Thème clair / sombre toggle dans la navbar (icône lune/soleil)
Gestion des erreurs API avec message + bouton réessayer


Choix techniques
Dans ce projet, nous avons choisi d'utiliser plusieurs pages HTML afin de se déplacer et naviguer dans les différentes pages du site. Les pages Films, Séries et Recherche sont alimentées dynamiquement par l'API TMDB via TypeScript. Les anciennes pages détail codées manuellement cohabitent avec les nouvelles pages génériques dynamiques.

Captures d'écran
Disponibles dans public/capture/.