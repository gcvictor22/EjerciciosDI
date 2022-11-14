import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FuelStationResponse } from '../interfaces/fuelStation.interface';
import { Municipio, Province } from '../interfaces/provinces.interface';

//https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/

const API_BASE_URL = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/'
const API_PROVINCES_URL = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/Provincias'
const API_MUNICIPES_URL = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/Municipios/'

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

  public getAllMunicipes():Observable<Municipio[]>{
    return this.http.get<Municipio[]>(`${API_MUNICIPES_URL}`);
  }

}