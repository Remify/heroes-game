import { Image } from './image';
import { Item } from './item';

export class HeroClass {
  key?: string;
  name: string;
  totalPoint: number;
  attaquePoint: number;
  defensePoint: number;
  movePoint: number;
  cost: number;
  hp: number;
  image?: Image;
  items: Item[];

  constructor(json :any) {
    this.key = json.$key || null;
    this.name = json.name || "";
    this.totalPoint = json.totalPoint || 40;
    this.attaquePoint = json.attaquePoint ||  0;
    this.defensePoint = json.defensePoint || 0;
    this.movePoint = json.movePoint || 0;
    this.cost = json.cost || 0;
    this.hp = json.hp || 0;
    this.image = json.image || {};
    this.items = json.items || [];
  }

  Attaque(): number {
    return this.attaquePoint
  }

  Defend(degat: number) {

    const damages = degat - this.defensePoint
    this.hp = damages;

    console.log(this.name + ' à perdu ' + + ' point de vie');

    if (this.hp < 0) {
      this.hp = 0;
    }
  }

  addItem(item :Item) {
    this.items.push(item);
  }

  calcStats() {
    let stats = {
      attaque: this.attaquePoint,
      defense: this.defensePoint,
      move: this.movePoint,
      hp: this.hp
    }

    this.items.forEach(item => {
      stats['attaque'] += item['attaque'];
      stats['defense'] += item['defense'];
      stats['move'] += item['move'];
      stats['hp'] += item['hp'];
    })

    return stats;
  }

}
