import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
@NgModule({})
export class MeSharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: []
    }
  }
}