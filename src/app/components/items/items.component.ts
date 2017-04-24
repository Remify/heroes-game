import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {ItemService} from "../../services/item.service";
import {Item} from "../../models/item";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items :Item[] = [];
  @Output() close = new EventEmitter();
  @Output() addItem = new EventEmitter();
  selected :Item;
  constructor(private itemService :ItemService) {
    this.itemService.items.subscribe(
      items => this.items = items
    )
  }

  ngOnInit() {
  }

  select(item :Item) {
    this.selected = new Item(item); // Map valeur item à une classe
  }

  closeItem() {
    this.selected = null;
  }
  createItem() {
    this.selected = new Item({});
  }

  addItemToHero(item :Item) {
    this.selected = null;
    this.addItem.next(item);
  }

  closeItems() {
      this.close.next(true);
  }


}
