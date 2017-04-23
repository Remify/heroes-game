import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Item} from "../../models/item";
import {ItemService} from "../../services/item.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Output() closeItem = new EventEmitter();
  @Input() item : Item;
  constructor(private itemService: ItemService) {
    if(! this.item) {
      this.item = new Item({});
    }
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.item);
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

  close() {
    this.closeItem.next(true)
  }

}
