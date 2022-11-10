import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootObject } from '../interfaces/gasolinera.interface';

const API_BASE_URL = 'https://raw.githubusercontent.com/gcvictor22/LohCangri/main/fuelstationlist4everyone.json'

@Injectable({
  providedIn: 'root'
})
export class ListadoService {

  constructor(private http : HttpClient) { }

  public getAllGasolineras(): Observable<RootObject>{
    return this.http.get<RootObject>(`${API_BASE_URL}`)
  }
}