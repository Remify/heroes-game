import { Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { LoginComponent } from './components/login/login.component';
import { HeroClassCreatorComponent } from './components/hero-class-creator/hero-class-creator.component';
import {LobbyComponent} from "./components/lobby/lobby.component";
import {HeroesComponent} from "./components/heroes/heroes.component";
import {HeroComponent} from "./components/hero/hero.component";
import {ItemsComponent} from "./components/items/items.component";
import {AuthGuard} from "./auth.guard";

export const routes: Routes = [
  { path: 'board',  component: BoardComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'heroes',  component: HeroesComponent, canActivate: [AuthGuard]},
  { path: 'preparation',  component: HeroClassCreatorComponent, canActivate: [AuthGuard]},
  { path: 'edit/:id',  component: HeroClassCreatorComponent, canActivate: [AuthGuard]},
  { path: '**', component: LoginComponent }
];
