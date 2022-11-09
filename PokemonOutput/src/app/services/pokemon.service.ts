import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponse } from '../interfaces/list.interface';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http : HttpClient) { }

  public getPokemonList(): Observable<ListResponse>{
    return this.http.get<ListResponse>(`${API_BASE_URL}/pokemon`);
  }
}
