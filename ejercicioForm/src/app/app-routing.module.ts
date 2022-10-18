import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { PeopleListComponent } from './components/people-list-component/people-list-component.component';

const routes: Routes = [
  {path:'listado', component: PeopleListComponent},
  {path:'anhadir-editar/:id', component: FormComponent},
  {path:'anhadir-editar', component: FormComponent},
  {path:'', redirectTo:'/listado', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
