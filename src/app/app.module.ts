import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
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
import {DndModule} from "ng2-dnd";
import {UploadComponent} from "./components/upload/upload.component";
import { HeroComponent } from './components/hero/hero.component';

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
    UploadComponent,
    CapitalizeFirstPipe,
    TeamComponent,
    DataFilterPipe,
    HeroComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    DataTableModule,
    CommonModule,
    RouterModule.forRoot(routes),
    DndModule.forRoot(),
    AlertModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [HeroClassService, PlayerService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
