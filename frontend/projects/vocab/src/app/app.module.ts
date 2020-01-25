import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { VocabListComponent } from './vocab-list/vocab-list.component';
import { VocabCreateComponent } from './vocab-create/vocab-create.component';
import { VocabEditComponent } from './vocab-edit/vocab-edit.component';
import { NavComponent } from './nav/nav.component';
import { NgxPaginationModule } from 'ngx-pagination';
// import { PagerService } from 'projects/_services/pager.service';
@NgModule({
  declarations: [
    AppComponent,
    VocabListComponent,
    VocabCreateComponent,
    VocabEditComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
@NgModule({})
export class VocabSharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: []
    }
  }
}