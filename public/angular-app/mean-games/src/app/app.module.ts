import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { JwtHelperService, JwtModuleOptions, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GameComponent } from './game/game.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterReactiveComponent } from './register-reactive/register-reactive.component';
import { RegisterTemplateComponent } from './register-template/register-template.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ErrorPageComponent,
    GamesListComponent,
    GameComponent,
    FooterComponent,
    NavigationComponent,
    RegisterReactiveComponent,
    RegisterTemplateComponent,
    ParentComponent,
    ChildComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path:"",
        component:WelcomeComponent
      },
      {
        path:"games",
        component:GamesListComponent
      },
      {
        path:"game/:gameId",
        component:GameComponent
      },
      {
        path:"register",
        component:RegisterTemplateComponent
      },
      {
        path:"parent",
        component:ParentComponent
      },
        {
        path:"**",
        component:ErrorPageComponent
      },

    ])
  ],
  providers: [{provide:JWT_OPTIONS, useValue:JWT_OPTIONS}, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
