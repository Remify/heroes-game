import { Component, OnInit, Input  } from '@angular/core';
import { HeroClass } from '../models/hero-class'
import {HeroClassService} from "../services/hero-class.service";

@Component({
  selector: 'app-hero-class-creator',
  templateUrl: './hero-class-creator.component.html',
  styleUrls: ['./hero-class-creator.component.css']
})
export class HeroClassCreatorComponent implements OnInit {
  @Input() hero :HeroClass;
  constructor(private heroClassService:HeroClassService) {
  }

  ngOnInit() {
  }

  minusAttaque() {
    this.changeStat("attaquePoint", -1);
  }

  plusAttaque() {
    this.changeStat("attaquePoint", 1);
  }


  minusDefense() {
    this.changeStat("defensePoint", -1);
  }

  plusDefense() {
    this.changeStat("defensePoint", 1);
  }


  minusMove() {
    this.changeStat("movePoint", -1);
  }

  plusMove() {
    this.changeStat("movePoint", 1);
  }

  addHeroClass(){
    if(this.hero.name.length > 0) {

      if(this.hero.$key == 'undefined') {

        this.heroClassService.createHero(this.hero)
      } else {
        this.heroClassService.updateHero(this.hero, '')
      }
    }
  }

  private changeStat(property :string, value:number) {
    if(this.hero.totalPoint >= 0 && this.hero.hasOwnProperty(property)) {

      // Vérification du total selon si on ajoute ou enlève
      let newTotal = this.hero.totalPoint;
      if(value > 0) {
        newTotal--;
      } else {
        newTotal++;
      }

      if(this.hero[property] +  value >= 1 && newTotal >= 0) {
        this.hero[property] += value;
        this.hero.totalPoint -= value;
      }
    }
  }

}
