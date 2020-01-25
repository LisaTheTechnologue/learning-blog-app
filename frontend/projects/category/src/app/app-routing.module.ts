import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CtgListComponent } from "./list/list.component";
import { CtgCreateComponent } from "./create/create.component";
import { CtgEditComponent } from "./edit/edit.component";

const routes: Routes = [
  //{path: '', redirectTo: 'ctgs', pathMatch: 'full'},
  {path: 'category/list', component: CtgListComponent, data: {title: 'List Category'}},
  {path: 'category/create', component: CtgCreateComponent, data: {title: 'Create Category'}},
 {path: 'category/edit/:id', component: CtgEditComponent, data: {title: 'Edit Category'}},
 { path: 'category', redirectTo: 'category/list' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
