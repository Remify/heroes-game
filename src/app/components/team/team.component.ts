import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../../services/player.service";
import {HeroClass} from "../../models/hero-class";
import {HeroClassService} from "../../services/hero-class.service";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  public heroes: HeroClass[];
  public deletedHeroes: HeroClass[];

  constructor(private playerService: PlayerService, private heroService: HeroClassService) {
    this.deletedHeroes = [];

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
                if (!this.heroes.find(hero => hero.$key === key)) {
                  console.log(hero)
                  this.heroes.push(hero)
                }
              });

            });

        }

      });

  }


  unsetHero(event: any) {
    let hero = event.dragData;
    this.playerService.unsetHeroToCurrentPlayer(hero.$key);
  }

}
