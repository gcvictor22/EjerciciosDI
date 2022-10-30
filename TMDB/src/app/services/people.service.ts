import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PeopleResponse, Result } from '../interfaces/people.interface';
import { PeopleDetailsResponse } from '../interfaces/peopleDetails.interface';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http : HttpClient) { }

  public getPeople():Observable<PeopleResponse>{
    return this.http.get<PeopleResponse>(`${environment.API_BASE_URL}/person/popular?api_key=${environment.API_KEY}`);
  }

  public getPeopleDetails(p : Result):Observable<PeopleDetailsResponse>{
    return this.http.get<PeopleDetailsResponse>(`${environment.API_BASE_URL}/person/${p.id}?api_key=${environment.API_KEY}`)
  }
}
