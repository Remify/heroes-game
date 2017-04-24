import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PlayerService} from "../../services/player.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public login = "";
  constructor(private router :Router, private playerService :PlayerService) {
    this.playerService.currentPlayer.subscribe(
      player => this.login = player.pseudo
    )
  }

  ngOnInit() {
  }

  gotoNewHero() {
    this.router.navigate(['preparation']);
  }

  gotoTeam(){
    this.router.navigate(['heroes']);
  }

}
