import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeopleResponse } from '../interfaces/people-list.interface';

const API_BASE_URL = 'https://swapi.dev/api'

@Injectable({
  providedIn: 'root'
})
export class PeopleServiceService {

  constructor(private http: HttpClient) { }

  public peopleList(): Observable<PeopleResponse>{
    return this.http.get<PeopleResponse>(`${API_BASE_URL}/people`)
  }

  public getPeople(id: string) {
    return this.http.get(`${API_BASE_URL}/people`)
  }
}
