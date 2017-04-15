import { Injectable } from '@angular/core';
import {FirebaseListObservable, AngularFire, FirebaseObjectObservable} from "angularfire2";
import {Player} from "../models/player";

@Injectable()
export class PlayerService {

  currentPlayer : FirebaseObjectObservable<Player>;
  players: FirebaseListObservable<any>;

  constructor(private firebase: AngularFire) {
    this.players = firebase.database.list('/players');
    this.currentPlayer = new FirebaseObjectObservable();
  }

  // Todo : ref heroes
  addHero() {

  }
  addPlayer(player :Player) {
    const promise = this.players.push(player)
    promise.then(
      (item) =>
      {
        player.key = item.key;
        this.currentPlayer = this.firebase.database.object(player.key)
      }
    );

    return promise
  }

  disconnect() {
    return this.currentPlayer.remove()
  }



}
