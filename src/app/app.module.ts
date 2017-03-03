import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes }   from '@angular/router';
import { AppComponent } from './app.component';
import { HeroClassCreatorComponent } from './hero-class-creator/hero-class-creator.component';
import { HeroClassService } from './services/hero-class.service';
import { AlertModule } from 'ng2-bootstrap';
import { routes } from './app.routes';


import { AngularFireModule } from 'angularfire2';
import { BoardComponent } from './board/board.component';
import { LoginComponent } from './login/login.component';
import { HeroesComponent } from './heroes/heroes.component';
import { CaseComponent } from './case/case.component';
import { BoardHeroComponent } from './board-hero/board-hero.component';
import { firebaseConfig } from './app.firebase.config'


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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AlertModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [HeroClassService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
