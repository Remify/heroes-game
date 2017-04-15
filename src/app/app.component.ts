import {Component, HostListener} from '@angular/core';
import {PlayerService} from "./services/player.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hero creator';

  constructor(private playerService :PlayerService) {

  }

  // @HostListener('window:beforeunload', ['$event'])
  // beforeunloadHandler(event) {
  //   this.playerService.disconnect()
  //
  //   var e = e || window.event;
  //
  //   //IE & Firefox
  //   if (e) {
  //     e.returnValue = 'Are you sure?';
  //   }
  //
  //   // For Safari
  //   return 'Are you sure?';
  //
  // }

}
