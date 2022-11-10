import { Component, OnInit } from '@angular/core';
import { FuelStation } from 'src/app/interfaces/fuelStation.interface';
import { FuelStationsService } from 'src/app/services/fuel-stations.service';

@Component({
  selector: 'app-fuel-stations',
  templateUrl: './fuel-stations.component.html',
  styleUrls: ['./fuel-stations.component.css'],
})
export class FuelStationsComponent implements OnInit {
  fuelStationList: FuelStation[] = [];
  minPrice = '';
  maxPrice = '';

  constructor(private fuelStationService: FuelStationsService) {}

  ngOnInit(): void {
    this.fuelStationService.getAllFuelStations().subscribe((resp) => {
      this.fuelStationList = resp.ListaEESSPrecio.filter(fuelS => fuelS['Precio Gasolina 95 E5'] != '' && fuelS['Precio Gasolina 98 E5'] != '')

      this.fuelStationList.sort((a, b) => {
        if (a['Precio Gasolina 95 E5'] > b['Precio Gasolina 95 E5']) {
          return 1;
        } else if (a['Precio Gasolina 95 E5'] < b['Precio Gasolina 95 E5']) {
          return -1;
        } else {
          return 0;
        }
      });

      this.minPrice = this.fuelStationList[0]['Precio Gasolina 95 E5']
      this.maxPrice = this.fuelStationList.reverse()[0]['Precio Gasolina 95 E5']
      
    });
  }
}
