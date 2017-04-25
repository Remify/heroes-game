import { Injectable } from '@angular/core';
import {FirebaseListObservable, AngularFire, FirebaseObjectObservable} from "angularfire2";
import {Player} from "../models/player";

/**
 * Gère l'accès aux données du joueur courant et de la liste des joueurs
 */
@Injectable()
export class PlayerService {
  currentPlayer : FirebaseObjectObservable<Player>;
  players: FirebaseListObservable<any>;
  isConnected = false;
  constructor(private firebase: AngularFire) {
    this.players = firebase.database.list('/players');
    this.currentPlayer = new FirebaseObjectObservable();
  }

  /**
   * Ajoute un joueur courant
   * @param player
   * @returns {firebase.database.ThenableReference}
   */
  addPlayer(player :Player) {
    const promise = this.players.push(player)
    promise.then(
      (item) =>
      {
        player.key = item.key;
        this.currentPlayer = this.firebase.database.object('players/' + player.key);
        this.isConnected = true;
      }
    );

    return promise
  }

  /**
   * Ajoute au joueur courant un hero
   * @param key
   */
  addHeroKeyToPlayer(key :string) {

    this.firebase.database.object('players/' + this.currentPlayer.$ref.key).take(1).subscribe(
      player => {
        // Mappage de l'object firebase en Player
        let p = new Player('').mapFromFirebase(player);
        // Ajout du nouvel héro
        p.addHeroKey(key);
        this.currentPlayer.update(p);
      }
    )

  }

  unsetHeroToCurrentPlayer(key :string) {

    this.firebase.database.object('players/' + this.currentPlayer.$ref.key).take(1).subscribe(
      player => {
        // Mappage de l'object firebase en Player
        let p = new Player('').mapFromFirebase(player);
        // suppression d'un nouvel héro
        p.unsetHeroKey(key);
        this.currentPlayer.update(p);
      }
    )

  }

  disconnect() {
    return this.currentPlayer.remove()
  }



}
