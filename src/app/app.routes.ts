import { Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { LoginComponent } from './components/login/login.component';
import { HeroClassCreatorComponent } from './components/hero-class-creator/hero-class-creator.component';
import {LobbyComponent} from "./components/lobby/lobby.component";
import {HeroesComponent} from "./components/heroes/heroes.component";
import {HeroComponent} from "./components/hero/hero.component";
import {ItemsComponent} from "./components/items/items.component";

export const routes: Routes = [
  { path: 'board',  component: BoardComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'lobby',  component: LobbyComponent },
  { path: 'heroes',  component: HeroesComponent },
  { path: 'items',  component: ItemsComponent },
  { path: 'preparation',  component: HeroClassCreatorComponent },
  { path: 'edit/:id',  component: HeroClassCreatorComponent },
  { path: '**', component: LoginComponent }
];
