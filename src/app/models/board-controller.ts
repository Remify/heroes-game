import {BehaviorSubject} from "rxjs";
import {Board} from "./board";
import {HeroClass} from "./hero-class";
import {HeroClassService} from "../services/hero-class.service";
import {Case} from "./case";
import {Tour} from "./tour";

export class BoardController {

  board: BehaviorSubject<Board>;
  heroes: HeroClass[];
  tour: Tour;

  constructor(private heroesService: HeroClassService) {
    this.board = new BehaviorSubject(new Board(10, 10));
    this.heroes = [];

    // TODO tour joueurs
    this.tour = new Tour();

    this.heroesService.heroes.subscribe(
      (heroList) => this.heroes = heroList
    )
  }

  getBoard(): Board {
    return this.board.getValue()
  }

  setHeroes(heroes: HeroClass[]) {
    this.heroes = heroes
  }

  removeHeroFromBoard(hero: HeroClass) {
    const newBoard = this.board.getValue();
    newBoard.removeHero(hero);
    this.board.next(newBoard);
  }

  setHeroOn(hero: HeroClass, aCase: Case) {
    const board = this.board.getValue()
    board.setHeroOn(hero, aCase)
    this.board.next(board);
  }

  fight(attackHero: HeroClass, defenseHero :HeroClass) {
    const heroesList = this.heroes ;

    heroesList.map(function (hero) {
      if(hero.$key == defenseHero.$key) {
        // TODO attaque bug
        defenseHero.Defend(attackHero.Attaque())
      }
    })


  }

  getCase(x: number, y: number) {
    return this.getBoard().getCase(x, y);
  }

  changeHasMoveTour(value :boolean) {
    this.tour.hasMouved = value;
  }

}
