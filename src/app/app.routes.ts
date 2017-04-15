import { Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { LoginComponent } from './components/login/login.component';
import { HeroClassCreatorComponent } from './components/hero-class-creator/hero-class-creator.component';
import {LobbyComponent} from "./components/lobby/lobby.component";
import {HeroesComponent} from "./components/heroes/heroes.component";

export const routes: Routes = [
  { path: 'board',  component: BoardComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'lobby',  component: LobbyComponent },
  { path: 'heroes',  component: HeroesComponent },
  { path: 'preparation',  component: HeroClassCreatorComponent },
  { path: '**', component: LoginComponent }
];
