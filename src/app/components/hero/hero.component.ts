import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HeroClassService } from "../../services/hero-class.service";
import { HeroClass } from "../../models/hero-class";
import { PlayerService } from "../../services/player.service";
import {Item} from "../../models/item";

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
/**
 * Affiche els caractéristiques d'un héro
 *
 * Permet de gérer les items du héro
 */
export class HeroComponent implements OnInit {

  @Input() hero: HeroClass;

  // Héro utilisé par les joueurs,; appel playerService
  usedBy: string[] = [];

  // Gère les statistiques calculés du héro
  heroStats = {
    attaque: 0,
    defense: 0,
    move: 0,
    hp: 0
  };

  item = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private heroService: HeroClassService,
    private playerService: PlayerService) {

    if(this.hero) {
      this.heroStats = this.hero.calcStats();
    }
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.usedBy = [];

    this.heroStats = this.hero.calcStats();

    this.playerService.players.subscribe(
      players => {
        this.usedBy = [];

        players.forEach(
          player => {
            if (player.heroesKeys) {

              if (player.heroesKeys.indexOf(this.hero.key) >= 0 && this.usedBy.indexOf(this.hero.key) < 0) {
                this.usedBy.push(player.pseudo);
              }

            }
          });
      }
    );



  }

  editHero(hero: HeroClass) {
    this.router.navigate(['edit/' + this.hero.key]);
  }

  addItem() {
    this.item = true;
  }

  closeItems() {
    this.item = false;
    this.update();
  }

  addItemToHero(item) {

    if(this.hero.items.indexOf(item) < 0) {
      this.hero.addItem(item);
      this.heroStats = this.hero.calcStats();
      this.update();
    }

  }

  update() {
    this.heroService.updateHero(this.hero);
  }

  unsetItem(item :Item) {
    this.hero.items = this.hero.items.filter(i => i != item);
    this.update();
  }


}
