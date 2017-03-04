import {Component, OnInit, Input, Output, EventEmitter, HostBinding} from '@angular/core';
import {Case} from "../models/case";
import {HeroClass} from "../models/hero-class";
import {CaseComponent} from "../case/case.component";

@Component({
  selector: 'board-hero',
  templateUrl: './board-hero.component.html',
  styleUrls: ['./board-hero.component.css']
})
export class BoardHeroComponent implements OnInit {
  @Input() hero :HeroClass;
  @Output() heroSelected = new EventEmitter();

  @HostBinding('class.mouvable') isSelectedHero: boolean = false;

  constructor() {

    this.isSelectedHero = false;
  }

  ngOnInit() {
  }

  changeIsSelectedHero(value : boolean) {
    this.isSelectedHero = value;
  }

  clickHero(aCase :CaseComponent) {
    this.heroSelected.emit(this.hero)
  }




}
