import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JuegoView } from './views/juego/juego.view';


const routes: Routes = [
  { path: "juego", component: JuegoView }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
