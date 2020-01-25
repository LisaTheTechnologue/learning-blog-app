import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';


const routes: Routes =  [
  { path: 'me/contact', component: ContactComponent, data: {title: 'Contact'} },
  { path: 'me/about', component: AboutComponent, data: {title: 'About'} },
  { path: 'me', redirectTo: 'me/about' }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
