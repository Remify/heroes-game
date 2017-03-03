import { Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { LoginComponent } from './login/login.component';
import { HeroClassCreatorComponent } from './hero-class-creator/hero-class-creator.component';

export const routes: Routes = [
  { path: 'heroes', component: HeroClassCreatorComponent },
  { path: 'board',  component: BoardComponent },
  { path: 'board',
    redirectTo: '/board',
    pathMatch: 'full'
  },
  { path: '**', component: BoardComponent }
];
