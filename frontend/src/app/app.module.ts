import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeSharedModule }
  from "../../projects/home/src/app/app.module";
import { MeSharedModule }
  from "../../projects/me/src/app/app.module";

import { VocabSharedModule }
  from "../../projects/vocab/src/app/app.module";
import { CategorySharedModule }
  from "../../projects/category/src/app/app.module";
import { NavComponent } from './nav/nav.component';
// import { PagerService } from 'projects/_services/pager.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NoteSharedModule } from '../../projects/note/src/app/app.module';
import { FootnavComponent } from './footnav/footnav.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FootnavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeSharedModule.forRoot(),
    VocabSharedModule.forRoot(),
    CategorySharedModule.forRoot(),
    NoteSharedModule.forRoot(),
    MeSharedModule.forRoot(),
    NgxPaginationModule,
    ReactiveFormsModule,
    FileUploadModule,
  ],
  providers: [
    Title,
    // PagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
