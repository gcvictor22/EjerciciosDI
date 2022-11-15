import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { FuelStation } from 'src/app/interfaces/fuelStation.interface';
import { Municipio, Province } from 'src/app/interfaces/provinces.interface';
import { FuelStationsService } from 'src/app/services/fuel-stations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fuel-stations',
  templateUrl: './fuel-stations.component.html',
  styleUrls: ['./fuel-stations.component.css'],
})
export class FuelStationsComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
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
  lat !: number;
  lng !: number;
  rotuloList: string[] = [];
  rotuloSelected: string[] = [];
  searchFuelStation = '';
  municipioSelected = '';
  cross = false;
  filterMunicipes = '';
  apiLoaded: Observable<boolean>;
  center: google.maps.LatLngLiteral = {lat: 40, lng: -4};
  zoom = 6;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];


  constructor(private fuelStationService: FuelStationsService, httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('http://maps.google.com/maps/api/js?sensor=false%22%3E', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;

  openInfoWindow(lat : number, lng : number) {

    let gasolineraToChana : FuelStation = {} as FuelStation;

    let lat2 = lat.toString();

    let lng2 = lng.toString();

    for (let it of this.fuelStationList) {
      if (it['Latitud'] == lat2.replace('.', ',') && it['Longitud (WGS84)'] == lng2.replace('.', ',')) {
        gasolineraToChana = it
      }
    }

    let el1 = '€/L';
    let el2 = '€/L';
    let el3 = '€/L';
    let el4 = '€/L';

    if (gasolineraToChana['Precio Gasolina 95 E5'] === '') {
      gasolineraToChana['Precio Gasolina 95 E5'] = 'No disponible';
      el1 = '';
    }
    if (gasolineraToChana['Precio Gasolina 98 E5'] === '') {
      gasolineraToChana['Precio Gasolina 98 E5'] = 'No disponible';
      el2 = '';
    }
    if (gasolineraToChana['Precio Gasoleo A'] === '') {
      gasolineraToChana['Precio Gasoleo A'] = 'No disponible';
      el3 = '';
    }
    if (gasolineraToChana['Precio Gasoleo B'] === '') {
      gasolineraToChana['Precio Gasoleo B'] = 'No disponible';
      el4 = '';
    }

    Swal.fire({
      html:
        `
      <div>
        <h2>${gasolineraToChana['Rótulo']}</h2>
        <p><b>Precio Gasolina 95:</b> ${gasolineraToChana['Precio Gasolina 95 E5']} ${el1}</p>
        <p><b>Precio Gasolina 98:</b> ${gasolineraToChana['Precio Gasolina 98 E5']} ${el2}</p>
        <p><b>Gasoleo A:</b> ${gasolineraToChana['Precio Gasoleo A']} ${el3}</p>
        <p><b>Gasoleo B:</b> ${gasolineraToChana['Precio Gasoleo B']} ${el4}</p>
        <p><b>Tipo de venta:</b> ${gasolineraToChana['Tipo Venta']}</p>
        <p><b>Horario:</b> ${gasolineraToChana['Horario']}</p>
      </div>
      `
    });
  }

  ngOnInit(): void {
    this.fuelStationService.getAllProvinces().subscribe(resp => {
      this.provincesList = resp;
    });

    this.fuelTypeValue = 'Precio Gasolina 95 E5'
    this.typeOfSort = 0;

    this.getLocation();
  }

  changeFuelType(type: keyof typeof this.fuelType = 'Precio Gasolina 95 E5') {

    this.options = [];
    this.markerPositions = [];

    console.log(this.municipioSelected);
    
    

    if (this.rotuloSelected.length === 0) {
      this.fuelStationService.getAllFuelStations().subscribe((resp) => {
        this.fuelStationList = resp.ListaEESSPrecio.filter(fuelS => fuelS[type] != '' && this.provincesSelected.includes(fuelS['Provincia']));

        for (let it of this.fuelStationList) {

          if (!this.rotuloList.includes(it['Rótulo'])) {
            this.rotuloList.push(it['Rótulo']);
          }
        }

        for (let it of this.fuelStationList) {

          if (!this.options.includes(it['Municipio'])) {
            this.options.push(it['Municipio']);
          }
        }

        console.log(this.rotuloList);


        this.sortBy(type, this.fuelStationList);

        this.minPrice = this.sortToFind(type, this.fuelStationList)[0].replace(',', '.');
        this.maxPrice = this.sortToFind(type, this.fuelStationList)[1].replace(',', '.');
        this.priceSelect = this.maxPrice;

        for (let it of this.fuelStationList) {
          if (this.municipioSelected.includes(it['Municipio'])) {
            this.markerPositions.push({lat: Number(this.changePriceToNumber(it['Latitud'])), lng: Number(this.changePriceToNumber(it['Longitud (WGS84)']))});
          }else if(this.municipioSelected === ''){
            this.markerPositions.push({lat: Number(this.changePriceToNumber(it['Latitud'])), lng: Number(this.changePriceToNumber(it['Longitud (WGS84)']))});
          }
        }
      });

    } else {
      this.fuelStationService.getAllFuelStations().subscribe((resp) => {
        this.fuelStationList = resp.ListaEESSPrecio.filter(fuelS => fuelS[type] != '' && this.provincesSelected.includes(fuelS['Provincia']) && this.rotuloSelected.includes(fuelS['Rótulo']));

        for (let it of this.fuelStationList) {

          if (!this.rotuloList.includes(it['Rótulo'])) {
            this.rotuloList.push(it['Rótulo']);
          }
        }

        for (let it of this.fuelStationList) {

          if (!this.options.includes(it['Municipio'])) {
            this.options.push(it['Municipio']);
          }
        }

        console.log(this.rotuloList);


        this.sortBy(type, this.fuelStationList);

        this.minPrice = this.sortToFind(type, this.fuelStationList)[0].replace(',', '.');
        this.maxPrice = this.sortToFind(type, this.fuelStationList)[1].replace(',', '.');
        this.priceSelect = this.maxPrice;

        for (let it of this.fuelStationList) {
          if (this.municipioSelected.includes(it['Municipio'])) {
            this.markerPositions.push({lat: Number(this.changePriceToNumber(it['Latitud'])), lng: Number(this.changePriceToNumber(it['Longitud (WGS84)']))});
          }else if(this.municipioSelected === '' || this.municipioSelected === 'all'){
            this.markerPositions.push({lat: Number(this.changePriceToNumber(it['Latitud'])), lng: Number(this.changePriceToNumber(it['Longitud (WGS84)']))});
          }
        }
      });

    }

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
            } else if (this.getDistanciaMetros(a['Latitud'], a['Longitud (WGS84)']) < this.getDistanciaMetros(b['Latitud'], b['Longitud (WGS84)'])) {
              return -1;
            } else {
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

    let R = 6378.137; //Radio de la tierra en km 
    let dLat = (lat2N - lat1);
    let dLong = (lon2N - lon1);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((lat1)) * Math.cos((lat2N)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    //aquí obtienes la distancia en metros por la conversion 1Km =1000m
    let d = R * c * 1000;
    return d;
  }


  gradosARadiantes(n: number) {
    return n * Math.PI / 180;
  }

  findFuelStation(lat2: string, lon2: string) {
    lat2 = this.changePriceToNumber(lat2);
    let lat2N = Number(lat2);

    lon2 = this.changePriceToNumber(lon2);
    let lon2N = Number(lon2);

    window.open(`https://www.google.es/maps/dir/${this.lat},${this.lng}/${lat2N},${lon2N}/`, `_blank`);
  }

  sortToFind(ty: keyof typeof this.fuelType = 'Precio Gasolina 95 E5', sss: FuelStation[]) {

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

  getBackImg(str: string) {

    if (str === 'REPSOL' || str.split(' ')[0] === 'REPSOL') {
      return 'https://companieslogo.com/img/orig/REP.MC-08c996b0.png';
    } else if (str === 'BP' || str.split(' ')[0] === 'BP') {
      return 'https://logos-world.net/wp-content/uploads/2020/08/BP-Emblem.png';
    } else if (str === 'PETROPRIX' || str === 'PERTROPRIX') {
      return 'https://www.cre100do.org/media/petroprix.png'
    } else if (str === 'CEPSA' || str.split(' ')[0] === 'CEPSA') {
      return 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Cepsa_Logo.png';
    } else if (str === 'GALP' || str.split(' ')[0] === 'GALP') {
      return 'https://seeklogo.com/images/G/Galp_Energia-logo-0F3DF7DF37-seeklogo.com.png';
    } else if (str === 'CARREFOUR' || str.split(' ')[0] === 'CARREFOUR') {
      return 'https://cdn.worldvectorlogo.com/logos/carrefour-c.svg';
    } else if (str === 'SHELL' || str.split(' ')[0] === 'SHELL') {
      return 'https://www.seekpng.com/png/full/141-1410342_shell-logo-royal-dutch-shell.png';
    } else {
      return 'https://cdn-icons-png.flaticon.com/512/1074/1074740.png'
    }
  }

  showMoreFuels(str: string, str2: string, str3: string, str4: string, str5: string, str6: string) {
    let el1 = '€/L';
    let el2 = '€/L';
    let el3 = '€/L';
    let el4 = '€/L';

    if (str === '') {
      str = 'No disponible';
      el1 = '';
    }
    if (str2 === '') {
      str2 = 'No disponible';
      el2 = '';
    }
    if (str5 === '') {
      str5 = 'No disponible';
      el3 = '';
    }
    if (str6 === '') {
      str6 = 'No disponible';
      el4 = '';
    }

    Swal.fire({
      html:
        `
      <div>
        <p><b>Precio Gasolina 95:</b> ${str} ${el1}</p>
        <p><b>Precio Gasolina 98:</b> ${str2} ${el2}</p>
        <p><b>Gasoleo A:</b> ${str5} ${el3}</p>
        <p><b>Gasoleo B:</b> ${str6} ${el4}</p>
        <p><b>Tipo de venta:</b> ${str3}</p>
        <p><b>Horario:</b> ${str4}</p>
      </div>
      `
    });
  }

  backToTop() {
    document.body.scrollIntoView();
  }

  reproducir() {
    const audio = new Audio();
    audio.src = '../../aud/lagasolina.mp3'
    audio.load();
    audio.play();
  }
}