import {Injectable} from '@angular/core';
import {HeroClass} from "../models/hero-class";
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class HeroClassService {

  heroes: FirebaseListObservable<HeroClass[]>;

  constructor(private firebase: AngularFire) {
    this.heroes = firebase.database.list('/heroes', HeroClass);

  }

  createHero(hero: HeroClass): firebase.Promise<any> {

    const promise = this.heroes.push(hero);
    return promise
  }

  removeHero(hero: HeroClass): firebase.Promise<any> {
    return this.heroes.remove(hero.$key);
  }

  updateHero(hero: HeroClass, changes: any): firebase.Promise<any> {
    return this.heroes.update(hero.$key, hero);
  }
}
