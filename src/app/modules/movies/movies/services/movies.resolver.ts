import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {IMovie} from '../interfaces/IMovie';
import {MoviesListService} from './movies-list.service';
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class MoviesResolver implements Resolve<Observable<IMovie[]>> {
  constructor(private http: HttpClient) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${environment.api}/movies`, {
      params: new HttpParams({
        fromObject: {
          _page: String(1),
          _limit: String(50)
        }
      })
    });
  }
}
