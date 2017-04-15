import { Component, OnInit } from '@angular/core';
import { moveIn } from '../../router.animation';
import {Router} from "@angular/router";
import {AngularFire, AuthProviders, AuthMethods, FirebaseAuthState} from "angularfire2";
import {PlayerService} from "../../services/player.service";
import {Player} from "../../models/player";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {
  error : any;

  constructor(private router : Router, private af :AngularFire, private playerService :PlayerService) { }

  ngOnInit() {
  }


  onSubmit(formData) {
    if(formData.valid) {
      let pseudo = formData.value.pseudo.toString();

      this.af.auth.login({
        provider: AuthProviders.Anonymous,
        method: AuthMethods.Anonymous,
      }).then((auth: FirebaseAuthState) => {

        this.playerService.addPlayer(new Player(pseudo)).then(
          (state) => {
            this.router.navigate(['/preparation'])
          })

      });
    }
  }

}
