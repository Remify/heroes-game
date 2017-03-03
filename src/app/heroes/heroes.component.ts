import { Component, OnInit } from '@angular/core';
import {HeroClassService} from "../services/hero-class.service";
import {HeroClass} from "../models/hero-class";
import {AngularFire, AuthProviders, AuthMethods} from 'angularfire2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  currentHeroClass : HeroClass;
  heroes : HeroClass[];
  constructor(private heroClassService:HeroClassService, af:AngularFire) {
    this.initHeroCreator();

    this.heroClassService.heroes.subscribe(
      (list) => this.heroes= list
    )

    af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous,
    });

  }


  initHeroCreator() {
    this.currentHeroClass = new HeroClass(10);
  }
  selectHeroClass(hero) {
    this.currentHeroClass = hero;
  }

  ngOnInit() {

  }


}
