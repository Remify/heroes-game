import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes }   from '@angular/router';
import { AppComponent } from './app.component';
import { HeroClassCreatorComponent } from './components/hero-class-creator/hero-class-creator.component';
import { HeroClassService } from './services/hero-class.service';
import { AlertModule } from 'ng2-bootstrap';
import { DataTableModule } from "ng2-data-table";
import { routes } from './app.routes';


import { AngularFireModule } from 'angularfire2';
import { BoardComponent } from './board/board.component';
import { LoginComponent } from './components/login/login.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { CaseComponent } from './case/case.component';
import { BoardHeroComponent } from './board-hero/board-hero.component';
import { firebaseConfig } from './app.firebase.config';
import { SignupComponent } from './components/signup/signup.component'
import {PlayerService} from "./services/player.service";
import { LobbyComponent } from './components/lobby/lobby.component';
import { CapitalizeFirstPipe } from './capitalize-first.pipe';
import { TeamComponent } from './components/team/team.component';
import { DataFilterPipe } from './data-filter.pipe';

// Router
RouterModule.forRoot([
  {
    path: 'heroes',
    component: HeroClassCreatorComponent
  }
])

@NgModule({
  declarations: [
    AppComponent,
    HeroClassCreatorComponent,
    BoardComponent,
    LoginComponent,
    HeroesComponent,
    CaseComponent,
    BoardHeroComponent,
    SignupComponent,
    LobbyComponent,
    CapitalizeFirstPipe,
    TeamComponent,
    DataFilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    DataTableModule,
    RouterModule.forRoot(routes),
    AlertModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [HeroClassService, PlayerService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
