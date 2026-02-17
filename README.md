Lancement du Projet Visionary : 
Prérequis : Assurez-vous d'avoir installé Node.js et le gestionnaire de paquet pnpm sur votre appareil. 

Installation : 
1) Clonez ce dépôt sur votre appareil local.
2) Accèdez au répertoire du projet cloné.
3) Installez les dépendances du projet grâce à pnpm :
  pnpm install

Lancement du serveur : 
1) Lancer le serveur Vite du projet dans le terminal : 
  pnpm run dev.
2) Accèdez au site du projet grâce au lien qui vous ai donnez.


Arborescence du Pojet : 

-css
-nodes_modules 
-pages
  -films
    -details
      -accueil
        *Présence de toutes les pages de la catégorie*
      -action
        *Présence de toutes les pages de la catégorie*
      -blockbuster
        *Présence de toutes les pages de la catégorie*
      -policier
        *Présence de toutes les pages de la catégorie*
      -science_fiction
        *Présence de toutes les pages de la catégorie*
    films.html
  -series
    -details
      -accueil
          *Présence de toutes les pages de la catégorie*
        -documentaire
          *Présence de toutes les pages de la catégorie*
        -sport
          *Présence de toutes les pages de la catégorie*
        -thriller
          *Présence de toutes les pages de la catégorie*
        -us
          *Présence de toutes les pages de la catégorie*
    series.html
-public
  -films
    -accueil
      *Présence de toutes les images des films de la bonne catégorie*
    -action
      *Présence de toutes les images des films de la bonne catégorie*
    -blockbuster
      *Présence de toutes les images des films de la bonne catégorie*
    -policier
      *Présence de toutes les images des films de la bonne catégorie*
    -science_fiction
      *Présence de toutes les images des films de la bonne catégorie*
  -series
    -accueil
      *Présence de toutes les images des films de la bonne catégorie*
    -Documentaire
      *Présence de toutes les images des films de la bonne catégorie*
    -sport
      *Présence de toutes les images des films de la bonne catégorie*
    -thriller
      *Présence de toutes les images des films de la bonne catégorie*
    -us
      *Présence de toutes les images des films de la bonne catégorie*
  bannière_f1_the_movie.jpg
  favicon.png
  green_visionary.png
-src
  -sass
    -components
    _components.scss
    _mixins.scss
    _variables.scss
    main.scss
  counter.js
  javascript.svg
  main.js
  style.css
.gitignore
index.html
package-lock.json
package.json
PATH.txt
pnpm-lock.yaml
settings.txt
vite.config.js


Liste des pages : 
pages d'accueil : 
index.html

pages regroupant les films :
pages/films/films.html 
Cette page n'est pas encore opérationnel, tout comme les liens vers les films présent sur cette page.

pages regroupant les series : 
pages/series/series.html
Cette page n'est pas encore opérationnel, tout comme les liens vers les séries présent sur cette page.

pages details de chaque films : 
pages/films/details/accueil/blade_runner_2049.html - blade_runner
pages/films/details/accueil/django.html
pages/films/details/accueil/f1_the_movie.html
pages/films/details/accueil/fury.html
pages/films/details/accueil/goodfellas.html
pages/films/details/accueil/interstellar.html
pages/films/details/accueil/prisoners.html
pages/films/details/accueil/the_dark_knight.html
pages/films/details/accueil/the_truman_show.html
pages/films/details/action/bullet_train.html
pages/films/details/action/extraction2.html
pages/films/details/action/john_wick2.html
pages/films/details/action/johnwick4.html
pages/films/details/action/madmax.html
pages/films/details/action/mission_impossible_dead_reckoning.html
pages/films/details/action/mission_impossible.html
pages/films/details/action/no_time_to_die.html
pages/films/details/action/road_house.html
pages/films/details/action/tenet.html
pages/films/details/action/the_beekeeper.html
pages/films/details/action/top_gun_maverik.html
pages/films/details/blockbuster/avatar.html
pages/films/details/blockbuster/avengers_endgame.html
pages/films/details/blockbuster/avengers_infinity_war.html
pages/films/details/blockbuster/barbie.html
pages/films/details/blockbuster/dune_part2.html
pages/films/details/blockbuster/joker.html
pages/films/details/blockbuster/jurassic_world.html
pages/films/details/blockbuster/oppenheimer.html
pages/films/details/blockbuster/spider_man_no_way_home.html
pages/films/details/blockbuster/star_wars_the_force_awakens.html
pages/films/details/blockbuster/the_batman.html
pages/films/details/policier/3_billboards.html
pages/films/details/policier/boston_strangler.html
pages/films/details/policier/couteaux_a_tires.html
pages/films/details/policier/les_veuves.html
pages/films/details/policier/nice_guy.html
pages/films/details/policier/nightcrawler.html
pages/films/details/policier/reptile.html
pages/films/details/policier/sicario.html
pages/films/details/policier/the_gentleman.html
pages/films/details/policier/the_killer.html
pages/films/details/policier/wind_river.html
pages/films/details/science_fiction/dune_part1.html
pages/films/details/science_fiction/hunger_games5.html
pages/films/details/science_fiction/madmax_fury_road.html
pages/films/details/science_fiction/matrix.htm
pages/films/details/science_fiction/ready_player_one.html
pages/films/details/science_fiction/spiderman.html
pages/films/details/science_fiction/the_creator.html
pages/films/details/science_fiction/the_martian.html
pages/series/details/accueil/breaking_bad.html
pages/series/details/accueil/drive_to_survive.html
pages/series/details/accueil/get_gotti.html
pages/series/details/accueil/narcos.html
pages/series/details/accueil/the_wire.html
pages/series/details/documentaire/arnold.html
pages/series/details/documentaire/beckham.html
pages/series/details/documentaire/chernobyl.html
pages/series/details/documentaire/dont_fk_with_cats.html
pages/series/details/documentaire/fear_city.html
pages/series/details/documentaire/full_swing.html
pages/series/details/documentaire/making_a_murderer.html
pages/series/details/documentaire/mcgregor_forever.html
pages/series/details/documentaire/our_planet.html
pages/series/details/documentaire/senna.html
pages/series/details/documentaire/the_last_dance.html
pages/series/details/sport/all_or_nothing.html
pages/series/details/sport/break_point.html
pages/series/details/sport/quaterback.html
pages/series/details/sport/swagger.html
pages/series/details/sport/tour_de_france.html
pages/series/details/sport/welcome_to_wrexham.html
pages/series/details/thriller/bodyguard.html
pages/series/details/thriller/dexter.html
pages/series/details/thriller/la_casa_de_papel.html
pages/series/details/thriller/lupin.html
pages/series/details/thriller/mindhunter.html
pages/series/details/thriller/mr_robot.html
pages/series/details/thriller/ozark.html
pages/series/details/thriller/ripley.html
pages/series/details/thriller/the_night_of.html
pages/series/details/thriller/the_sinner.html
pages/series/details/us/better_call_saul.html
pages/series/details/us/euphoria.html
pages/series/details/us/game_of_thrones.html
pages/series/details/us/house_of_cards.html
pages/series/details/us/sopranos.html
pages/series/details/us/stranger_things.html
pages/series/details/us/succession.html
pages/series/details/us/the_boys.html
pages/series/details/us/the_last_of_us.html
pages/series/details/us/the_mandalorian.html
pages/series/details/us/the_walking_dead.html
pages/series/details/us/true_detective.html


Choix pour l'affichage des éléments : 
Dans ce projet, nous avons choisi d'utiliser plusieurs pages HTML afin de se déplacer et naviguer dans les différentes pages du site. 

Capture d'écran du projet à retrouver dans le dossier public -> capture 
