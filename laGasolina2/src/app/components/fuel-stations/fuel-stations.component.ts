import { Component, OnInit } from '@angular/core';
import { FuelStation } from 'src/app/interfaces/fuelStation.interface';
import { Province } from 'src/app/interfaces/provinces.interface';
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
  priceSelect = '';
  fuelType: FuelStation = {} as FuelStation;
  fuelTypeValue: keyof typeof this.fuelType = 'Precio Gasolina 95 E5'
  fuelName : string[] = ['Biodesel', 'Bioetanol', 'Gas Natural Comprimido', 'Gas Natural Licuado', 'Gases Licuados del Petróleo',
  'Gasóleo A', 'Gasóleo B', 'Gasóleo Premium', 'Gasolina 95 E10', 'Gasolina 95 E5', 'Gasolina 95 E5 Premium', 'Gasolina 98 E10', 'Gasolina 98 E5', 'Hidrógeno']
  provincesList: Province[] = [];

  constructor(private fuelStationService: FuelStationsService) {}

  ngOnInit(): void {
    this.fuelStationService.getAllProvinces().subscribe(resp => {
      this.provincesList = resp;
    });
  }

  changeFuelType(type: keyof typeof this.fuelType = 'Precio Gasolina 95 E5'){
    this.fuelStationService.getAllFuelStations().subscribe((resp) => {
      this.fuelStationList = resp.ListaEESSPrecio.filter(fuelS => fuelS[type] != '');

      this.fuelStationList.sort((a, b) => {
        if (a[type] > b[type]) {
          return 1;
        } else if (a[type] < b[type]) {
          return -1;
        } else {
          return 0;
        }
      });

      this.minPrice = this.fuelStationList[0][type].split(',')[0]+('.'+this.fuelStationList[0][type].split(',')[1]);
      this.maxPrice = this.fuelStationList.reverse()[0][type].split(',')[0]+('.'+this.fuelStationList[0][type].split(',')[1]);
      this.priceSelect = this.maxPrice;
      
      this.fuelStationList.reverse();
    });
  }

  selectTypeOfFuel(str:string){
    switch (str) {
      case 'Biodesel':
        this.fuelTypeValue = "Precio Biodiesel";
        this.changeFuelType(this.fuelTypeValue);
        break;
      case 'Bioetanol':
        this.fuelTypeValue = "Precio Bioetanol";
        this.changeFuelType(this.fuelTypeValue);
        break;
      case 'Gas Natural Comprimido':
        this.fuelTypeValue = "Precio Gas Natural Comprimido";
        this.changeFuelType(this.fuelTypeValue);
        break;
      case 'Gas Natural Licuado':
        this.fuelTypeValue = "Precio Gas Natural Licuado";
        this.changeFuelType(this.fuelTypeValue);
        break;
      case 'Gases Licuados del Petróleo':
        this.fuelTypeValue = "Precio Gases licuados del petróleo";
        this.changeFuelType(this.fuelTypeValue);
        break;
      case 'Gasóleo A':
        this.fuelTypeValue = "Precio Gasoleo A";
        this.changeFuelType(this.fuelTypeValue);
        break;
      case 'Gasóleo B':
        this.fuelTypeValue = "Precio Gasoleo B";
        this.changeFuelType(this.fuelTypeValue);
        break;
      case 'Gasóleo Premium':
        this.fuelTypeValue = "Precio Gasoleo Premium";
        this.changeFuelType(this.fuelTypeValue);
        break;
      case 'Gasolina 95 E10':
        this.fuelTypeValue = "Precio Gasolina 95 E10";
        this.changeFuelType(this.fuelTypeValue);
        break;
      case 'Gasolina 95 E5':
        this.fuelTypeValue = "Precio Gasolina 95 E5";
        this.changeFuelType(this.fuelTypeValue);
        break;
      case 'Gasolina 95 E5 Premium':
        this.fuelTypeValue = "Precio Gasolina 95 E5 Premium";
        this.changeFuelType(this.fuelTypeValue);
        break;
      case 'Gasolina 98 E10':
        this.fuelTypeValue = "Precio Gasolina 98 E10";
        this.changeFuelType(this.fuelTypeValue);
        break;
      case 'Gasolina 98 E5':
        this.fuelTypeValue = "Precio Gasolina 98 E5";
        this.changeFuelType(this.fuelTypeValue);
        break;
      case 'Hidrógeno':
        this.fuelTypeValue = "Precio Hidrogeno";
        this.changeFuelType(this.fuelTypeValue);
        break;
    }
  }

  changePriceToNumber(str : string){
    return str.split(',')[0]+('.'+str.split(',')[1])
  }
}