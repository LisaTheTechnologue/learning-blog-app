import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';


const routes: Routes =  [
  { path: 'home/', component: ViewComponent, data: {title: 'Home'} },
  { path: 'home', redirectTo: 'home/' }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
