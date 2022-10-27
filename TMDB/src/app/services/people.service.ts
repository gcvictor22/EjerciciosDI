import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeopleResponse } from '../interfaces/people.interface';

const API_URL_BASE = 'https://api.themoviedb.org/3'
const API_KEY = '0ba0b777730807c26c3194f77131d60f'

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http : HttpClient) { }

  public getPeople():Observable<PeopleResponse>{
    return this.http.get<PeopleResponse>(`${API_URL_BASE}/person/popular?api_key=${API_KEY}`);
  }
}
