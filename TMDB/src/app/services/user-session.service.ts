import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserSessionResponse } from '../interfaces/user-session.interface';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  constructor(private http : HttpClient) { }

  getUserSession(id : string):Observable<UserSessionResponse>{
    return this.http.get<UserSessionResponse>(`${environment.API_BASE_URL}/account?api_key=${environment.API_KEY}&session_id=${id}`)
  }
}
