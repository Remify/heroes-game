import { Component, OnInit } from '@angular/core';
import {HeroClassService} from "../../services/hero-class.service";
import {HeroClass} from "../../models/hero-class";
import {AngularFire, AuthProviders, AuthMethods} from 'angularfire2';

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
  constructor(private heroClassService:HeroClassService, af:AngularFire) {
    this.heroes = []
    this.heroClassService.heroes.subscribe(
      (list) => this.heroes = list.filter( hero => typeof hero.playerRef == 'undefined')
    )
  }

  // Ajoute le héro courant
  selectHeroClass(hero) {
    this.selectedHero = hero;
  }

  ngOnInit() {

  }



}
