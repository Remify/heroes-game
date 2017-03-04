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
  currentHeroSelected :BoardHeroComponent;
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

  changeCurrentHeroSelected(heroComponent: BoardHeroComponent) {
    console.log('change current hero');
    this.currentHeroSelected = heroComponent;
    console.log()
  }

  displayHeroes(heroes: HeroClass[]) {
    for (let i = 0; i < heroes.length; i++) {
      const hero = heroes[i];

      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      this.boardCtrl.setHeroOn(hero, this.boardCtrl.getCase(x, y));
    }
  }


  moveHeroTo($event : CaseComponent) {
    console.log('moveHeroTo')
    this.boardCtrl.setHeroOn(this.currentHeroSelected.hero, $event.thisCase);
    //this.cases.toArray()[this.cases.toArray().indexOf($caseComponent)].heroComponent = this.currentHeroSelected
  }

  isCaseComponent(aCase :CaseComponent) {

  }

  showUnitMoves(event: Case) {
    console.log('showUnitMoves')
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
