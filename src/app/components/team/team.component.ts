import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../../services/player.service";
import {HeroClass} from "../../models/hero-class";
import {HeroClassService} from "../../services/hero-class.service";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})

/**
 * Affiche la liste des héro du joueur courant
 */
export class TeamComponent implements OnInit {
  public heroes: HeroClass[];
  public deletedHeroes: HeroClass[];
  public message = "";

  constructor(private playerService: PlayerService, private heroService: HeroClassService) {
    this.deletedHeroes = [];
    this.heroes = [];

  }

  ngOnInit() {

    /**
     * Maj de la liste des héros du joueur courant
     */
    this.playerService.currentPlayer.subscribe(
      player => {
        console.log(player);
        this.heroes = []; // On vide la liste des héro pour la régénérer à chaque nouveau jeu de donnée
        if (player.heroesKeys) {
          if (player.heroesKeys.length > 0) {

            player.heroesKeys.forEach(
              key => {

                this.heroService.getHero(key).take(1).subscribe(hero => { // Take(1) désabonne après le premier set de donnée

                  // N'ajoute pas le héro si il existe déjà dans la liste
                  if (!this.heroes.find((hero) => hero.key === key)) {
                    // Mapping de l'object firebase en classe héro
                    this.heroes.push(new HeroClass(hero));
                  }
                });

              });

          }

        }

      });

  }

  /**
   * Unset des héro du joueur courant,
   * Event appelé par le drag n drop dans la poubelle
   * @param event
   */
  unsetHero(event: any) {
    let hero = event.dragData;
    if (this.heroes.length > 1) {
      this.playerService.unsetHeroToCurrentPlayer(hero.key);
      this.message = "";
    } else {
      this.message = "Il te faut au moins 1 Héro dans ton équipe !";
    }
  }

  getAttaque(hero) {
    return hero.calcStats().attaque;
  }
  getDefense(hero) {
    return hero.calcStats().defense;
  }
  getMove(hero) {
    return hero.calcStats().move;
  }
  getHp(hero) {
    return hero.calcStats().hp;
  }

}
