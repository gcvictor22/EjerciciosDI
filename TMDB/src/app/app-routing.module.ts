import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmListComponent } from './components/film-list/film-list.component';
import { IntroComponent } from './components/intro/intro.component';
import { PeopleListComponent } from './components/people-list/people-list.component';

const routes: Routes = [
  {path: 'intro', component: IntroComponent},
  {path: 'people', component: PeopleListComponent},
  {path: 'films', component: FilmListComponent},
  {path: '', redirectTo: '/intro', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
