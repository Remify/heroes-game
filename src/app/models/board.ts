import {Case} from './case'
import {HeroClass} from "./hero-class";

export class Board {
  cols : number;
  rows : number
  matrice: Case[][];

  constructor(cols: number, rows: number) {
    this.cols = cols;
    this.rows = rows;

    this.matrice = [];

    for (let i = 0; i < rows; i++) {
      this.matrice[i] = [];
      for (let j = 0; j < cols; j++) {
        this.matrice[i][j] = new Case(i, j);
      }
    }

  }

  getCase(x, y) {
    return this.matrice[x][y];
  }

  setCase(aCase : Case) {
    const x = aCase.x;
    const y = aCase.y;
    this.matrice[x][y] = aCase;
  }

  setHeroOn(hero :HeroClass, aCase :Case) {
      aCase.setUnit(hero);
      this.setCase(aCase);
  }

  getAllCase() :Case[] {
    let cases :Case[] = new Array();

    for(let i = 0; i < this.rows; i++) {
      for(let j = 0; j < this.cols; j++) {
          cases.push(this.matrice[i][j])
      }
    }
    return cases;
  }

}
