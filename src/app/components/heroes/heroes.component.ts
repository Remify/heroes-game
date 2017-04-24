import { Component, OnInit } from '@angular/core';
import {HeroClassService} from "../../services/hero-class.service";
import {HeroClass} from "../../models/hero-class";
import {AngularFire, AuthProviders, AuthMethods} from 'angularfire2';
import {PlayerService} from "../../services/player.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // Héro à ajouter à l'équipe
  selectedHero : HeroClass;
  search :string = "";
  // Liste des héros récupérer sur les services
  heroes : HeroClass[];

  // liste des héro (par clé) à cacher
  toHide : string[] = [];

  constructor(private heroClassService:HeroClassService, af:AngularFire, private playerService : PlayerService) {
    this.heroes = []

    // Abonnement à la liste des héros
    this.heroClassService.heroes.subscribe(
      (list) => this.heroes = list
    );

    // Abonnement à la liste des héro du joueurs courant
    this.playerService.currentPlayer.subscribe(
      player => {
        this.toHide = player.heroesKeys;
      }
    )

  }

  // Ajoute le héro courant
  selectHeroClass(hero) {
    this.selectedHero = hero;
  }

  // Vérifie si un héro est dans la liste des héro à cacher
  isInHide(key :string) :boolean{
    if (this.toHide.indexOf(key) < 0) {
      return false;
    } else {
      return true
    }
  }

  ngOnInit() {

  }

  // Ajoute un héro à la liste des héro du joueur courant
  addHeroToCurrentPlayer() {
    this.playerService.addHeroKeyToPlayer(this.selectedHero.key);
    console.log(this.selectedHero);
  }



}
