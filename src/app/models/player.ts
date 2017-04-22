import {HeroClass} from "./hero-class";
export class Player {
  key: string;
  pseudo: string;
  isPlaying: boolean
  isOnline: boolean
  heroesKeys: string[];
  heroes: HeroClass[];

  constructor(pseudo: string) {
    this.pseudo = pseudo;
    this.isPlaying = false;
    this.isOnline = true;
    this.heroes = [];
    this.heroesKeys = [];
  }

  addHeroKey(key:string) :Player {
    this.heroesKeys.push(key);

    return this
  }

  unsetHeroKey(key :string) {
    this.heroesKeys = this.heroesKeys.filter(element => element !== key);
    if(typeof this.heroesKeys == "undefined") {
      this.heroesKeys = [];
    }
  }

  mapFromFirebase(obj :any):Player {
    this.key = obj.$key;
    this.pseudo = obj.pseudo || '';
    this.isPlaying = obj.isPlaying || false;
    this.isOnline = obj.isOnline || false;
    this.heroesKeys = obj.heroesKeys || [];
    this.heroes = obj.key || []; // TODO : Ne fonctionnera pas

    return this;
  }

}
