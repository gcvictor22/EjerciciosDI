import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DesplegableComponent } from './components/desplegable/desplegable.component';

@NgModule({
  declarations: [
    AppComponent,
    DesplegableComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
