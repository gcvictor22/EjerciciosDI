import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ActivatedRoute } from '@angular/router';
import { Objeto } from "src/app/interface/objeto.interface";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  center: google.maps.LatLngLiteral = { lat: 40.416729, lng: -3.703339 };
  markerVisibility: boolean = false;
  markerPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  category: number = 0;
  description: string = "";
  anyMatch: boolean = false;
  found: boolean = false;
  zoom = 6;
  nombreObjeto = '';
  LatLngObjeto = '';
  fechaDeEncuentro = '';
  objetosList : Objeto[] = [];
  buscador = '';

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  display: any;

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  placeMarker(position: google.maps.MapMouseEvent) {
    this.markerVisibility = true;
    if (position != null) {
      this.markerPosition = position.latLng!.toJSON();
    }
  }

  openInfoWindow(marker : MapMarker){
    this.infoWindow.open(marker)
  }

  addToList(){
    if (this.nombreObjeto != null && this.markerPosition.lat != 0 && this.markerPosition.lng != 0 && this.fechaDeEncuentro != null) {
      this.objetosList.push({
        nombre : this.nombreObjeto,
        latlng: "Lat: "+this.markerPosition.lat+", Lon: "+this.markerPosition.lng,
        fechaDeEncuentro: this.fechaDeEncuentro,
      })

      this.nombreObjeto = '';
    }else{
      alert ("Rellena todos los datos y marca en el mapa la ubicación donde has encontrado el objeto")
    }
  }

}

