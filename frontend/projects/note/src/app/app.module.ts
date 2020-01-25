import { BrowserModule } from '@angular/platform-browser';
import { NgModule , ModuleWithProviders} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnglishListComponent } from './english-list/english-list.component';
import { FrenchListComponent } from './french-list/french-list.component';
import { CreateNewComponent } from './create-new/create-new.component';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { NavComponent } from './nav/nav.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { MiscListComponent } from './misc-list/misc-list.component';
import { UploadphotoComponent,SafePipe } from './uploadphoto/uploadphoto.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    EnglishListComponent,
    FrenchListComponent,
    CreateNewComponent,
    NoteEditComponent,
    NavComponent,
    MiscListComponent,
    UploadphotoComponent,
    // SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    FileUploadModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
@NgModule({})
export class NoteSharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: []
    }
  }
}
