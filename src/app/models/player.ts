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

}
