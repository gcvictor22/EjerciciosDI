import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmResponse } from '../interfaces/film-list.interface';
import { People, PeopleResponse } from '../interfaces/people-list.interface';

const API_BASE_URL = 'https://swapi.dev/api'

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }

  public peopleList(numeroPagina : number): Observable<PeopleResponse>{
    return this.http.get<PeopleResponse>(`${API_BASE_URL}/people/?page=${numeroPagina}`)
  }

  public getPeople(id: string): Observable<People> {
    return this.http.get<People>(`${API_BASE_URL}/people/${id}`)
  }

  public filmList(): Observable<FilmResponse>{
    return this.http.get<FilmResponse>(`${API_BASE_URL}/films`)
  }
}