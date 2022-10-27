import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Film, FilmResponse } from '../interfaces/film.interface';
import { PeopleResponse } from '../interfaces/people.interface';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http : HttpClient) { }

  public getFilms(): Observable<FilmResponse>{
    return this.http.get<FilmResponse>(`${environment.API_BASE_URL}/movie/popular?api_key=${environment.API_KEY}`);
  }

  public getFilmDetails(film : Film): Observable<Film>{
    return this.http.get<Film>(`${environment.API_BASE_URL}/movie/${film.id}?api_key=${environment.API_KEY}`)
  }
}
