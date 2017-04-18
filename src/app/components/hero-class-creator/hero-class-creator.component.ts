import {Component, OnInit, Input} from '@angular/core';
import {HeroClass} from '../../models/hero-class'
import {HeroClassService} from "../../services/hero-class.service";
import {moveIn} from "../../router.animation";
import {PlayerService} from "../../services/player.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-hero-class-creator',
  templateUrl: './hero-class-creator.component.html',
  styleUrls: ['./hero-class-creator.component.css'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''}
})

/**
 * Composant pour la création du héro
 */
export class HeroClassCreatorComponent implements OnInit {

  // héro créer
  hero: HeroClass;

  /**
   *
   * @param heroClassService : Service pour stocker le héro
   * @param playerService : Service relatif aux informations de l'utilisateur
   * @param router
   */
  constructor(private heroClassService: HeroClassService,
              private playerService: PlayerService,
              private router: Router) {

    if (!this.playerService.currentPlayer) {
      console.log('redirect')
      this.router.navigate(['login']);
    }

    // 10 nombre de points pour le héro
    this.hero = new HeroClass(10);

    // Init des points
    this.plusAttaque();
    this.plusDefense();
    this.plusMove();
  }

  ngOnInit() {


  }


  /**
   * Ajoute -1 à la propriété attaquePoint
   */
  minusAttaque() {
    this.changeStat("attaquePoint", -1);
  }

  /**
   * Ajoute +1 à la propriété attaquePoint
   */
  plusAttaque() {
    this.changeStat("attaquePoint", 1);
  }


  minusDefense() {
    this.changeStat("defensePoint", -1);
  }

  plusDefense() {
    this.changeStat("defensePoint", 1);
  }


  minusMove() {
    this.changeStat("movePoint", -1);
  }

  plusMove() {
    this.changeStat("movePoint", 1);
  }

  /**
   * Enregistre le Héro dans le service. Ici nous cherchons à récupérer l'ID du héro dans la base
   * Une fois l'enregistré, l'utilisateur et redirigé vers la création de son équipe
   */
  addHero():boolean {


      let name = this.hero.name;

      if(name.length > 0) {


        this.heroClassService.createHero(this.hero).then(
          (success) => {
            console.log('in', success)
            this.playerService.addHeroKeyToPlayer(success.key)
            this.router.navigate(['heroes'])
          }
        )

      }

    return false;
  }

  /**
   * Fonction générique pour modifier (ajouter supprimer des points) sur une propriété
   * @param property
   * @param value
   */
  private changeStat(property: string, value: number) {
    if (this.hero.totalPoint >= 0 && this.hero.hasOwnProperty(property)) {

      // Vérification du total selon si on ajoute ou enlève
      let newTotal = this.hero.totalPoint;
      if (value > 0) {
        newTotal--;
      } else {
        newTotal++;
      }

      if (this.hero[property] + value >= 1 && newTotal >= 0) {
        this.hero[property] += value;
        this.hero.totalPoint -= value;
      }
    }
  }

}
