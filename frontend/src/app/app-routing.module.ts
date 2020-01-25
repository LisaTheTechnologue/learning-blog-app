import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VocabSharedModule } from 'projects/vocab/src/app/app.module';
import { CategorySharedModule } from 'projects/category/src/app/app.module';
import { HomeSharedModule } from 'projects/home/src/app/app.module';
import { NoteSharedModule } from 'projects/note/src/app/app.module';
import { MeSharedModule } from 'projects/me/src/app/app.module';

const routes: Routes = [
  {path: 'home', 
   loadChildren: '../../projects/home/src/app/app.module#HomeSharedModule'},
   {path: 'me', 
   loadChildren: '../../projects/me/src/app/app.module#MeSharedModule'},
  {path: 'vocab', 
   loadChildren: '../../projects/vocab/src/app/app.module#VocabSharedModule'},
  {path: 'category', 
   loadChildren: '../../projects/category/src/app/app.module#CategorySharedModule'},
   {path: 'note', 
   loadChildren: '../../projects/note/src/app/app.module#NoteSharedModule'},
  { path: '**', redirectTo: '/me/about'}
 ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeSharedModule.forRoot(),
    VocabSharedModule.forRoot(),
    CategorySharedModule.forRoot(),
    NoteSharedModule.forRoot(),
    MeSharedModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
