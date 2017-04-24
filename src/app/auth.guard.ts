import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {PlayerService} from "./services/player.service";
import {AngularFire, AngularFireAuth, FirebaseAuthState} from "angularfire2";


@Injectable()
/**
 *  Guard pour l'authentification. Vérifie que CurrentPlayer est bien instancié.
 *  Si non, redirige vers la page de login
 *  L'AuthGuard est défini dans les routes
 */
export class AuthGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth
      .take(1)
      .map((authState: FirebaseAuthState) => !!authState)
      .do(authenticated => {
        console.log(authenticated);
        if (!authenticated) this.router.navigate(['login']);
      });
  }
}
