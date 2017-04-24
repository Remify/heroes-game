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
     * Maj de la liste des héros
     */
    this.playerService.currentPlayer.subscribe(
      player => {

        this.heroes = []; // On vide la liste des héro pour la régénérer à chaque nouveau jeu de donnée
        if (player.heroesKeys.length > 0) {

          player.heroesKeys.forEach(
            key => {

              this.heroService.getHero(key).take(1).subscribe(hero => { // Take(1) désabonne après le premier set de donnée

                // N'ajoute pas le héro si il existe déjà dans la liste
                if (!this.heroes.find(hero => hero.key === key)) {
                  this.message = "";
                  this.heroes.push(hero)
                }
              });

            });

        }

      });

  }


  unsetHero(event: any) {
    let hero = event.dragData;
    if(this.heroes.length > 1 ) {
      this.playerService.unsetHeroToCurrentPlayer(hero.key);
      this.message = "";
    } else {
      this.message = "Il te faut au moins 1 Héro dans ton équipe !";
    }
  }

}
