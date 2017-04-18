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

  addHeroKeyToPlayer(key :string) {
    console.log('addHeroKey', key);
    console.log('current player ref', this.currentPlayer.$ref);

    this.firebase.database.object('players/' + this.currentPlayer.$ref.key).take(1).subscribe(
      player => {
        console.log(player);
        //this.currentPlayer.update(player.addHeroKey(key));
      }
    )

  }

  disconnect() {
    return this.currentPlayer.remove()
  }



}
