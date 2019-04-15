import { Injectable } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IMovie} from '../interfaces/IMovie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  url = `${environment.api}/movies`;
  constructor(private http: HttpClient) { }

  get(id): Observable<IMovie> {
    return this.http.get<IMovie>(`${this.url}/${id}`);
  }
}
