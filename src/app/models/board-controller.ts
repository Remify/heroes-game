import {BehaviorSubject} from "rxjs";
import {Board} from "./board";
import {HeroClass} from "./hero-class";
import {HeroClassService} from "../services/hero-class.service";
import {Case} from "./case";

export class BoardController {

  board: BehaviorSubject<Board>;
  heroes: BehaviorSubject<HeroClass[]>;

  constructor(private heroesService: HeroClassService) {
    this.board = new BehaviorSubject(new Board(10, 10));
    this.heroes = new BehaviorSubject([]);


    this.heroesService.heroes.subscribe(
      (heroList) => this.heroes.next(heroList)
    )
  }

  getBoard(): Board {
    return this.board.getValue()
  }

  setHeroes(heroes: HeroClass[]) {
    this.heroes.next(heroes)
  }

  setHeroOn(hero: HeroClass, aCase: Case) {
    console.log('setHeroOn ctrl')
    console.log(hero, aCase)
    // TODO moveg serve
    const board = this.board.getValue()
    board.setHeroOn(hero, aCase)
    this.board.next(board);
  }

  getCase(x :number, y:number) {
    return this.getBoard().getCase(x, y);
  }

}
