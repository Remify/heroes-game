import { Component, OnInit } from '@angular/core';
import {Item} from "../../models/item";
import {ItemService} from "../../services/item.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  public item : Item;
  constructor(private itemService: ItemService) {
    this.item = new Item({});
  }

  ngOnInit() {
  }

  submit(){
    if(this.item.key) {
      this.update();
    } else {
      this.add();
    }

    return false
  }


  add() {
    console.log('add');
    this.itemService.createItem(this.item);
  }

  update() {
    console.log('update');
    this.itemService.updateItem(this.item);
  }
}
