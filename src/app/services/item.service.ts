import { Injectable } from '@angular/core';
import {Item} from "../models/item";
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";

@Injectable()
export class ItemService {
  items :FirebaseListObservable<Item[]>;

  constructor(private firebase: AngularFire) {
    this.items = firebase.database.list('/items', Item);
  }

  createItem(item: Item): firebase.Promise<any> {
    const promise = this.items.push(item);
    return promise
  }

  removeItem(item: Item): firebase.Promise<any> {
    return this.items.remove(item.key);
  }

  updateItem(item: Item): firebase.Promise<any> {
    return this.items.update(item.key, item);
  }

}
