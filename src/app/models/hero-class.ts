import { Image } from './image';

export class HeroClass {
  $key?: string;
  name: string;
  totalPoint: number;
  attaquePoint: number;
  defensePoint: number;
  movePoint: number;
  cost: number;
  hp: number;
  image? : Image;

  constructor(totalPoint: number) {
    this.name = "";
    this.totalPoint = totalPoint;
    this.attaquePoint = 0;
    this.defensePoint = 0;
    this.movePoint = 0;
    this.cost = 0;
    this.hp = 0;
  }

  Attaque() :number{
    return this.attaquePoint
  }

  Defend(degat:number) {

    const damages = degat - this.defensePoint
    this.hp = damages;

    console.log(this.name + ' à perdu ' +  + ' point de vie');

    if(this.hp < 0) {
      this.hp = 0;
    }
  }

}
