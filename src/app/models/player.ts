import {HeroClass} from "./hero-class";
export class Player  {
  key :string;
  pseudo :string;
  isPlaying :boolean
  isOnline :boolean
  heroes : HeroClass[];

  constructor(pseudo:string){
    this.pseudo = pseudo;
    this.isPlaying = false;
    this.isOnline = true;
    this.heroes = [];
  }

}
