import {Injectable} from '@angular/core';
import {HeroClass} from "../models/hero-class";
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class HeroClassService {

  heroes: FirebaseListObservable<HeroClass[]>;

  constructor(firebase: AngularFire) {
    this.heroes = firebase.database.list('/heroes', HeroClass);
  }

  createHero(hero: HeroClass): firebase.Promise<any> {
    return this.heroes.push(hero);
  }

  removeHero(hero: HeroClass): firebase.Promise<any> {
    return this.heroes.remove(hero.$key);
  }

  updateHero(hero: HeroClass, changes: any): firebase.Promise<any> {
    return this.heroes.update(hero.$key, hero);
  }
    //
    // let isHeroNameInHeroes = this.heroes..filter(function (hero) {
    //     return hero.name == newHeroClass.name
    // })
    //
    //
    // if (isHeroNameInHeroes.size == 0) {
    //   this.heroes.next(
    //     this.heroes.getValue().push(newHeroClass)
    //   );
    // } else {
      //
      // let newHeroes = this.heroes.getValue();
      //
      // newHeroes.map(function (hero) {
      //   if (hero.name == newHeroClass.name) {
      //     console.log('in')
      //     return newHeroClass;
      //   } else {
      //     return hero
      //   }
      // });
      //
      // this.heroes.next(newHeroes);

  }
