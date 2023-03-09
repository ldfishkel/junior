import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './views/app.component';
import { JuegoView } from './views/juego/juego.view';
import { Grilla } from './views/juego/grilla/grilla';

@NgModule({
  declarations: [
    AppComponent,
    JuegoView,
    Grilla
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
