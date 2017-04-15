import { Component, OnInit } from '@angular/core';
import {Player} from "../../models/player";
import {PlayerService} from "../../services/player.service";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  connectedPlayers : Player[];

  constructor(private playerService :PlayerService) {
    playerService.players.subscribe(
      list => this.connectedPlayers = list.filter(player => player.isOnline ),
      err => console.log(err)
    )
  }

  ngOnInit() {
  }

}
