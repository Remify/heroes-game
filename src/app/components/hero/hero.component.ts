import {Component, OnInit, Input, SimpleChanges} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {HeroClassService} from "../../services/hero-class.service";
import {HeroClass} from "../../models/hero-class";
import {PlayerService} from "../../services/player.service";

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  @Input() hero : HeroClass;
  usedBy : string[] = [];
  item = true;
  constructor(private router :Router, private route: ActivatedRoute, private heroService :HeroClassService, private playerService :PlayerService) {
    this.heroService.getHero('-KiQiXJT3rG9rFWTPiWL').subscribe(
      hero => this.hero = hero
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
            if(player.heroesKeys) {
              console.log(this.hero.$key);
              if(player.heroesKeys.indexOf(this.hero.$key) >= 0 && this.usedBy.indexOf(this.hero.$key) < 0) {
                this.usedBy.push(player.pseudo)
              }

            }
          })
      }
    )
  }

  editHero(hero :HeroClass) {
    this.router.navigate(['edit/' + this.hero.$key])
    console.log('redirect to edit', hero);
  }

  addItem() {
    this.item = true;
  }


}
