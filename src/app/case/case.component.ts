import {Component, OnInit, Input, Output, EventEmitter, HostBinding, ViewChild, HostListener} from '@angular/core';
import {Case} from "../models/case";
import {BoardHeroComponent} from "../board-hero/board-hero.component";

@Component({
  selector: 'board-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css'],
})

export class CaseComponent implements OnInit {

  @Input()thisCase :Case;
  @Output() showUnitMoves :EventEmitter<Case> = new EventEmitter<Case>();
  @Output() selectedHero :EventEmitter<BoardHeroComponent> = new EventEmitter<BoardHeroComponent>();
  @Output() moveHero :EventEmitter<CaseComponent> = new EventEmitter<CaseComponent>();
  @Output() attackHeroOn :EventEmitter<CaseComponent> = new EventEmitter<CaseComponent>();
  @ViewChild(BoardHeroComponent) heroComponent :BoardHeroComponent;
  @HostBinding('class.mouvable') isCaseSelected: boolean = false;
  @HostBinding('class.attackable') isAttackable : boolean = false;
  constructor() {
  }

  changeIsCaseSelected( value:boolean ) {
    this.isCaseSelected = value;
  }

  clickHero() {
    console.log(this.heroComponent)
    this.selectedHero.emit(this.heroComponent);
    this.showUnitMoves.emit(this.thisCase);
  }

  changeIsCaseAttackable(value :boolean) {
    this.isAttackable = value;
  }

  @HostListener('click') actionCase() {

    console.log('click on case')
    if(this.isAttackable) {
        this.attackHeroOn.emit(this)
    }

    if(this.isCaseSelected && ! this.isAttackable) {
      this.moveHero.emit(this);
    }

  }


  ngOnInit() {
  }



}
