import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { FuelStation } from 'src/app/interfaces/fuelStation.interface';
import { Province } from 'src/app/interfaces/provinces.interface';
import { FuelStationsService } from 'src/app/services/fuel-stations.service';

const RADIO_TIERRA_EN_KILOMETROS = 6371;
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
  fuelName: string[] = ['Biodesel', 'Bioetanol', 'Gas Natural Comprimido', 'Gas Natural Licuado', 'Gases Licuados del Petróleo',
    'Gasóleo A', 'Gasóleo B', 'Gasóleo Premium', 'Gasolina 95 E10', 'Gasolina 95 E5', 'Gasolina 95 E5 Premium', 'Gasolina 98 E10', 'Gasolina 98 E5', 'Hidrógeno'];
  provincesList: Province[] = [];
  provincesSelected: string[] = [];
  typeOfSort !: number;
  successCallback!: PositionCallback;
  lat !: number;
  lng !: number;

  constructor(private fuelStationService: FuelStationsService) { }

  ngOnInit(): void {
    this.fuelStationService.getAllProvinces().subscribe(resp => {
      this.provincesList = resp;
    });

    this.fuelTypeValue = 'Precio Gasolina 95 E5'
    this.typeOfSort = 0;

    this.getLocation();
  }

  changeFuelType(type: keyof typeof this.fuelType = 'Precio Gasolina 95 E5') {
    this.fuelStationService.getAllFuelStations().subscribe((resp) => {
      this.fuelStationList = resp.ListaEESSPrecio.filter(fuelS => fuelS[type] != '' && this.provincesSelected.includes(fuelS['Provincia']));

      this.sortBy(type, this.fuelStationList);

      this.minPrice = this.sortToFind(type, this.fuelStationList)[0].replace(',','.');
      this.maxPrice = this.sortToFind(type, this.fuelStationList)[1].replace(',','.');
      this.priceSelect = this.maxPrice;
    });
  }

  selectTypeOfFuel(str: string) {
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

  sortBy(t: keyof typeof this.fuelType = 'Precio Gasolina 95 E5', fSL: FuelStation[]) {
    switch (this.typeOfSort) {
      case 0:
        fSL
        break;

      case 1:
        fSL.sort((a, b) => {
          if (a[t] > b[t]) {
            return 1;
          } else if (a[t] < b[t]) {
            return -1;
          } else {
            return 0;
          }
        });
        break;

      case 2:
        if (this.lat != undefined && this.lng != undefined) {
          fSL.sort((a, b) => {
            if (this.getDistanciaMetros(a['Latitud'], a['Longitud (WGS84)']) > this.getDistanciaMetros(b['Latitud'], b['Longitud (WGS84)'])) {
              return 1;
            }else if (this.getDistanciaMetros(a['Latitud'], a['Longitud (WGS84)']) < this.getDistanciaMetros( b['Latitud'],b['Longitud (WGS84)'])) {
              return -1;
            }else{
              return 0;
            }
          })
        } else {
          alert('cargando ubicación, vuelva a intentarlo en unos segundos')
        }
        break;
    }
  }

  changePriceToNumber(str: string) {
    return str.split(',')[0] + ('.' + str.split(',')[1]);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat);
          console.log(this.lng);
        }
      },
        (error) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getDistanciaMetros(lat2: string, lon2: string) {
    lat2 = this.changePriceToNumber(lat2);
    let lat2N = Number(lat2);

    lon2 = this.changePriceToNumber(lon2);
    let lon2N = Number(lon2);

    let lat1 = this.gradosARadiantes(this.lat);
    lat2N = this.gradosARadiantes(lat2N);
    let lon1 = this.gradosARadiantes(this.lng);
    lon2N = this.gradosARadiantes(lon2N);

    var R = 6378.137; //Radio de la tierra en km 
    var dLat = (lat2N - lat1);
    var dLong = (lon2N - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((lat1)) *
      Math.cos((lat2N)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    //aquí obtienes la distancia en metros por la conversion 1Km =1000m
    var d = R * c * 1000;
    return d;
  }


  gradosARadiantes(n: number) {
    return n * Math.PI / 180;
  }

  findFuelStation(lat2 : string, lon2 : string){
    lat2 = this.changePriceToNumber(lat2);
    let lat2N = Number(lat2);

    lon2 = this.changePriceToNumber(lon2);
    let lon2N = Number(lon2);

    window.open(`https://www.google.es/maps/dir/${this.lat},${this.lng}/${lat2N},${lon2N}/`, `_blank`);
  }

  sortToFind(ty: keyof typeof this.fuelType = 'Precio Gasolina 95 E5', sss : FuelStation[]){

    let mayor = sss[0][ty];
    let menor = sss[0][ty];

    let aux: string[] = [];

    for (let i = 0; i < sss.length; i++) {
      if (sss[i][ty] > mayor) {
        mayor = sss[i][ty];
      }
      if (sss[i][ty] < menor) {
        menor = sss[i][ty]
      }
    }

    aux.push(menor);
    aux.push(mayor);

    return aux;
  }
  
}