import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuelStationsComponent } from './components/fuel-stations/fuel-stations.component';

const routes: Routes = [
  {path: 'all-fuel-station', component: FuelStationsComponent},
  {path: '', redirectTo: '/all-fuel-station', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
