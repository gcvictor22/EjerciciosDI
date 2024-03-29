import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { HttpClientModule } from "@angular/common/http";
import { MaterialImportsModule } from './material-imports/material-imports.module';
import { FormsModule } from '@angular/forms';
import { IntroComponent } from './components/intro/intro.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { PeopleDialogComponent } from './components/people-dialog/people-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PeopleListComponent,
    IntroComponent,
    FilmListComponent,
    DialogComponent,
    PeopleDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialImportsModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
