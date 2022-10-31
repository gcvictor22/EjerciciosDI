import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateSessionDto } from '../dto/createSession.dto';
import { DeleteSessionDto } from '../dto/deleteSession.dto';
import { CreateSessionResponse } from '../interfaces/create-session.interface';
import { DeleteSessionResponse } from '../interfaces/delete-session.interface';
import { RequestTokenResponse } from '../interfaces/request-token.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthServicesService {
  constructor(private http: HttpClient) {}

  createRequestToken(): Observable<RequestTokenResponse> {
    return this.http.get<RequestTokenResponse>(
      `${environment.API_BASE_URL}/authentication/token/new?api_key=${environment.API_KEY}`
    );
  }

  createSession(
    sessionDto: CreateSessionDto
  ): Observable<CreateSessionResponse> {
    return this.http.post<CreateSessionResponse>(
      `${environment.API_BASE_URL}/authentication/session/new?api_key=${environment.API_KEY}`,
      sessionDto
    );
  }

  logOutSession(deleteDto : DeleteSessionDto):Observable<DeleteSessionResponse>{
    return this.http.delete<DeleteSessionResponse>(`${environment.API_BASE_URL}/authentication/session?api_key=${environment.API_KEY}`,  {
      body: deleteDto
    });
  }
}
