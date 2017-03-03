import {Component, OnInit, Input, Output, EventEmitter, HostBinding, ViewChild} from '@angular/core';
import {Case} from "../models/case";
import {HeroClass} from "../models/hero-class";
import {HeroesComponent} from "../heroes/heroes.component";

@Component({
  selector: 'board-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css'],
})

export class CaseComponent implements OnInit {
  isCaseSelected :boolean;

  @Input()thisCase :Case;
  @Output() showUnitMoves :EventEmitter<Case> = new EventEmitter<Case>();
  @ViewChild(HeroesComponent) heroComponent :HeroesComponent;

  constructor() {

      this.isCaseSelected = false;
  }

  changeIsCaseSelected( value:boolean ) {
    this.isCaseSelected = value;
  }

  clickCase(aCase:Case) {
    this.showUnitMoves.emit(aCase);
  }

  ngOnInit() {
  }


}
