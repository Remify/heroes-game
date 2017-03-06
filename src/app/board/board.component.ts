import {Component, OnInit, Input, ViewChildren, QueryList} from '@angular/core';
import {HeroClassService} from '../services/hero-class.service';
import {Board} from "../models/board";
import {Case} from "../models/case";
import {HeroClass} from "../models/hero-class";
import {BoardController} from "../models/board-controller";
import {CaseComponent} from "../case/case.component";
import {HeroesComponent} from "../heroes/heroes.component";
import {BoardHeroComponent} from "../board-hero/board-hero.component";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
  @Input() heroes: HeroClass[];
  @ViewChildren(CaseComponent) cases: QueryList<CaseComponent>;
  @ViewChildren(BoardHeroComponent) heroComponents: QueryList<BoardHeroComponent>;
  currentHeroSelected: BoardHeroComponent;
  board: Board;
  boardCtrl: BoardController;


  constructor(private heroesService: HeroClassService) {

    this.boardCtrl = new BoardController(this.heroesService);

    this.boardCtrl.board.subscribe(
      (newBoard) => this.board = newBoard
    );

    this.heroesService.heroes.subscribe(
      (list) => this.displayHeroes(list)
    );


  }

  ngAfterViewInit() {

  }

  ngOnInit() {
  }

  changeCurrentHeroSelected($event: BoardHeroComponent) {
    this.currentHeroSelected = $event;
    this.currentHeroSelected.changeIsSelectedHero(true)
  }

  displayHeroes(heroes: HeroClass[]) {
    for (let i = 0; i < heroes.length; i++) {
      const hero = heroes[i];

      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      this.boardCtrl.setHeroOn(hero, this.boardCtrl.getCase(x, y));
    }
  }


  moveHeroTo($event: CaseComponent) {
    if(this.boardCtrl.tour.hasMouved) {

    } else {
      const heroToMove = this.currentHeroSelected.hero;
      this.boardCtrl.removeHeroFromBoard(heroToMove);
      this.boardCtrl.setHeroOn(heroToMove, $event.thisCase);
      //this.boardCtrl.changeHasMoveTour(true);
      this.unSelectAll();
      this.showAttackPossibilities($event);
    }
  }

  unSelectAll() {
    this.cases.map(function (aCase) {
      aCase.changeIsCaseSelected(false)
    })
  }

  showAttackPossibilities(caseComponent :CaseComponent) {

    console.log('show possible attacks from', caseComponent.thisCase)

    let attackables = this.cases.filter(function(thatCaseComponent) {
      return ((thatCaseComponent.thisCase.positionTo(caseComponent.thisCase.x, caseComponent.thisCase.y) == 1) && (typeof thatCaseComponent.thisCase.unit !== 'undefined'))
    })

    attackables.map(function (thatCaseComponent) {
        thatCaseComponent.changeIsCaseAttackable(true)
    })

    console.log(attackables)
  }

  attackHero(event: CaseComponent) {

    this.boardCtrl.fight(this.currentHeroSelected.hero, event.thisCase.unit)
  }

  showUnitMoves(event: Case) {
    // Si le joueur à déjà joué, on ne montre pas les mouvements possibles
    if(! this.boardCtrl.tour.hasMouved) {
      let hero = event.unit;

      let mouvableCases: Case[] = [];

      this.board.getAllCase().forEach(function (anotherCase) {

        if (anotherCase.positionTo(event.x, event.y) <= hero.movePoint && anotherCase.positionTo(event.x, event.y) != 0) {
          mouvableCases.push(anotherCase);
        }

      })

      var selected = this.cases.filter(function (compCase: CaseComponent) {
        return mouvableCases.indexOf(compCase.thisCase) >= 0
      });


      selected.forEach(function (element) {
        //element.heroComponent.selectHeroClass(true);

        element.changeIsCaseSelected(true);
      })

    }


  }


}
