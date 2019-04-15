import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {IMovie} from '../interfaces/IMovie';
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {switchMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class MoviesResolver implements Resolve<Observable<[IMovie[], IMovie]>> {
  constructor(private http: HttpClient) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[IMovie[], IMovie]> {
    return this.http.get<IMovie[]>(`${environment.api}/movies`, {
      params: new HttpParams({
        fromObject: {
          _page: String(1),
          _limit: String(50)
        }
      })
    }).pipe(
      switchMap((items) => forkJoin([of(items), this.http.get<IMovie>(`${environment.api}/movies/${items[0].id}`)]))
    );
  }
}
