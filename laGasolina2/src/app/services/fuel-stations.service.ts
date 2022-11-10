import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FuelStationResponse } from '../interfaces/fuelStation.interface';

const API_BASE_URL = 'https://raw.githubusercontent.com/gcvictor22/LohCangri/main/fuelstationlist4everyone.json'

@Injectable({
  providedIn: 'root'
})
export class FuelStationsService {

  constructor(private http : HttpClient) { }

  public getAllFuelStations():Observable<FuelStationResponse>{
    return this.http.get<FuelStationResponse>(`${API_BASE_URL}`)
  }
}
