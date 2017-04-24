import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HeroClassService } from "../../services/hero-class.service";
import { HeroClass } from "../../models/hero-class";
import { PlayerService } from "../../services/player.service";

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  @Input() hero: HeroClass;
  usedBy: string[] = [];
  heroStats = {
    attaque: 0,
    defense: 0,
    move: 0,
    hp: 0
  };

  item = false;
  constructor(private router: Router, private route: ActivatedRoute, private heroService: HeroClassService, private playerService: PlayerService) {
    this.heroService.getHero('-KiQiXJT3rG9rFWTPiWL').subscribe(
      hero => {
        this.hero = new HeroClass(hero)
        this.heroStats = this.hero.calcStats()
      }
    );

  }

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges) {
    this.usedBy = [];


    this.playerService.players.subscribe(
      players => {
        this.usedBy = [];

        players.forEach(
          player => {
            if (player.heroesKeys) {
              console.log(this.hero.$key);
              if (player.heroesKeys.indexOf(this.hero.$key) >= 0 && this.usedBy.indexOf(this.hero.$key) < 0) {
                this.usedBy.push(player.pseudo)
              }

            }
          })
      }
    );
  }

  editHero(hero: HeroClass) {
    this.router.navigate(['edit/' + this.hero.$key])
    console.log('redirect to edit', hero);
  }

  addItem() {
    this.item = true;
  }

  closeItems() {
    this.item = false;
  }

  addItemToHero(item) {
    this.hero.addItem(item);
    this.heroStats = this.hero.calcStats()
  }


}
