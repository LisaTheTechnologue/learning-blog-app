import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrenchListComponent } from "./french-list/french-list.component";
import { EnglishListComponent } from "./english-list/english-list.component";
import { CreateNewComponent } from "./create-new/create-new.component";
import { NoteEditComponent } from "./note-edit/note-edit.component";
import { UploadphotoComponent } from './uploadphoto/uploadphoto.component';

const routes: Routes = [
  {path: 'note/french', component: FrenchListComponent, data: {title: 'List French Note'}},
  {path: 'note/english', component: EnglishListComponent, data: {title: 'List English Note'}},
  {path: 'note/edit/:id', component: NoteEditComponent, data: {title: 'Edit Note'}},
  { path: 'note/create', component: CreateNewComponent, data: {title: 'Create Note'}},
  { path: 'note/image/upload', component: UploadphotoComponent, data: {title: 'Upload Img Note'}},
  { path: 'note',redirectTo: 'note/french' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
