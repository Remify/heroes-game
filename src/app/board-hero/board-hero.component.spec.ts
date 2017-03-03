/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BoardHeroComponent } from './board-hero.component';

describe('BoardHeroComponent', () => {
  let component: BoardHeroComponent;
  let fixture: ComponentFixture<BoardHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
