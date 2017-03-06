import {HeroClass} from "./hero-class";
export class Case {
  x: number;
  y: number;
  unit: HeroClass;

  constructor(x, y) {
    this.x = x
    this.y = y
  }

  toString() {
    return this.x + "/" + this.y
  }

  setUnit(hero: HeroClass) {
    this.unit = hero
  }

  isHeroIn(id: string): boolean {
    if (this.unit) {
      return this.unit.$key == id
    } else {
      return false
    }
  }

  unsetHero() {
    delete this.unit
  }

  positionTo(x, y) {
    return Math.abs(Math.abs(this.x) - Math.abs(x)) + Math.abs(Math.abs(this.y) - Math.abs(y))
  }

}
