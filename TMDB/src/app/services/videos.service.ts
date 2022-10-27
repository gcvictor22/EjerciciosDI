import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Film } from '../interfaces/film.interface';
import { FilmDetailsResponse } from '../interfaces/filmDetails.interface';
import { VideoResponse } from '../interfaces/filmVideos.interface';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(private http : HttpClient) { }

  public getVideos(p : Film): Observable<VideoResponse>{
    return this.http.get<VideoResponse>(`${environment.API_BASE_URL}/movie/${p.id}/videos?api_key=${environment.API_KEY}`)
  }
}
