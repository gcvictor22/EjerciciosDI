import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { PeopleListComponent } from "./components/people-list-component/people-list-component.component";
import { HttpClientModule } from "@angular/common/http";
import { FormComponent } from './components/form/form.component';
import { MaterialImportsModule } from "./material-imports/material-imports.module";
import { AppRoutingModule } from "./app-routing.module";



@NgModule({
  declarations: [
    AppComponent,
    PeopleListComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialImportsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
