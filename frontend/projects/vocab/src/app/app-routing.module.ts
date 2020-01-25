import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VocabListComponent } from "./vocab-list/vocab-list.component";
import { VocabCreateComponent } from "./vocab-create/vocab-create.component";
import { VocabEditComponent } from "./vocab-edit/vocab-edit.component";

const routes: Routes = [
  //{path: '', redirectTo: 'vocabs', pathMatch: 'full'},
  {path: 'vocab/list', component: VocabListComponent, data: {title: 'List Vocab'}},
  {path: 'vocab/add', component: VocabCreateComponent, data: {title: 'Create Vocab'}},
 {path: 'vocab/edit/:id', component: VocabEditComponent, data: {title: 'Edit Vocab'}},
 { path: 'vocab', redirectTo: '/vocab/list' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
