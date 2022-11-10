import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FuelStationResponse } from '../interfaces/fuelStation.interface';
import { Province } from '../interfaces/provinces.interface';

//https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/

const API_BASE_URL = 'https://raw.githubusercontent.com/gcvictor22/LohCangri/main/fuelstationlist4everyone.json'
const API_PROVINCES_URL = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/Provincias'

@Injectable({
  providedIn: 'root'
})
export class FuelStationsService {

  constructor(private http : HttpClient) { }

  public getAllFuelStations():Observable<FuelStationResponse>{
    return this.http.get<FuelStationResponse>(`${API_BASE_URL}`);
  }

  public getAllProvinces():Observable<Province[]>{
    return this.http.get<Province[]>(`${API_PROVINCES_URL}`);
  }

}